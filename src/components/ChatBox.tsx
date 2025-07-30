import { SYSTEM_PROMPT } from "@/constants/prompt";
import { GoogleGenAI } from "@google/genai";
import { BotMessageSquare, Send, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
interface Message {
  role: string;
  content: string;
}

interface ChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
  context: string;
}

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
});

export default function ChatBox({ isOpen, onClose, context }: ChatBoxProps) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("leetcode-tutor-messages");
    if (stored) {
      try {
        setMessages(JSON.parse(stored as string));
      } catch (e) {
        sessionStorage.removeItem("leetcode-tutor-messages");
      }
    }
  }, []);

  // Save messages to SessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem(
      "leetcode-tutor-messages",
      JSON.stringify(messages, null, 2)
    );
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (text.trim() === "") return;

    // Add user message
    const userMessage = { role: "user", content: text };
    setMessages([...messages, userMessage]);
    setText("");

    // Collect code and context information
    let programmingLanguage = "UNKNOWN";
    const changeLanguageButton = document.querySelector(
      "button.rounded.items-center.whitespace-nowrap.inline-flex.bg-transparent.dark\\:bg-dark-transparent.text-text-secondary.group"
    );
    if (changeLanguageButton) {
      if (changeLanguageButton.textContent)
        programmingLanguage = changeLanguageButton.textContent;
    }

    const userCurrentCodeContainer = document.querySelectorAll(".view-line");
    const extractedCode = extractCode(userCurrentCodeContainer);

    // For now, just echo back the user's message as a mock response
    // In a real implementation, this would be replaced with AI logic
    const promptTemplate = SYSTEM_PROMPT.replace(
      /{{problem_statement}}/gi,
      context
    )
      .replace(/{{programming_language}}/g, programmingLanguage)
      .replace(/{{user_code}}/g, extractedCode)
      .replace(
        /{{user_history}}/g,
        messages.map((message) => message.content).join("\n")
      );

    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: text,
      config: {
        systemInstruction: promptTemplate,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        responseMimeType: "text/plain",
      },
    });

    // Add initial assistant message
    const assistantMessage = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMessage]);

    // Accumulate chunks into the last message
    for await (const chunk of response) {
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.role === "assistant") {
          lastMessage.content += chunk.text || "";
        }
        return newMessages;
      });
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-16 right-0 w-[500px] h-[600px] bg-white/10 backdrop-blur-md rounded-xl p-0 border border-white/20 flex flex-col transition-all duration-300 text-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/20 bg-white/5 backdrop-blur-sm rounded-t-xl">
        <span className="font-semibold text-base text-white">
          LeetCode Tutor
        </span>
        <button
          className="text-white/60 hover:text-white p-1 rounded-full focus:outline-none transition-colors"
          onClick={onClose}
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-hide">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-3 flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" && (
              <span className="flex items-end mr-2">
                <BotMessageSquare size={20} className="text-white/60" />
              </span>
            )}
            <div
              className={`rounded-2xl px-4 py-3 max-w-[75%] break-words text-sm leading-relaxed shadow-md backdrop-blur-sm ${
                message.role === "user"
                  ? "bg-white/15 text-white rounded-br-md border border-white/20"
                  : "bg-white/10 text-white rounded-bl-md border border-white/15"
              }`}
            >
              <MarkdownRenderer content={message.content} />
            </div>
            {message.role === "user" && (
              <span className="flex items-end ml-2">
                <User size={20} className="text-white/60" />
              </span>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div className="px-3 py-3 border-t border-white/20 bg-white/5 backdrop-blur-sm rounded-b-xl flex items-center gap-2">
        <input
          type="text"
          className="flex-1 border border-white/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 text-white bg-white/10 placeholder:text-white/60 shadow-sm backdrop-blur-sm"
          placeholder="Type your message..."
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={handleInputKeyDown}
        />
        <button
          className="ml-1 px-3 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors focus:outline-none disabled:opacity-50 shadow-md backdrop-blur-sm border border-white/30"
          onClick={handleSendMessage}
          disabled={text.trim() === ""}
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

// Simple code extraction function
function extractCode(codeContainer: NodeListOf<Element>): string {
  let code = "";
  codeContainer.forEach((line) => {
    if (line.textContent) {
      code += line.textContent + "\n";
    }
  });
  return code.trim();
}
