import { BotMessageSquare } from "lucide-react";
import { useState } from "react";
import ChatBox from "@/components/ChatBox";

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const metaDescriptionEl = document.querySelector("meta[name=description]");
  const problemStatement = metaDescriptionEl?.getAttribute("content") as string;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors focus:outline-none border-none"
          aria-label="Chat with Tutor"
          onClick={() => setIsChatOpen((open) => !open)}
        >
          <BotMessageSquare size={28} />
        </button>
        {isChatOpen && (
          <ChatBox
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
            context={problemStatement}
          />
        )}
      </div>
      {/* Other content for ContentPage can go here */}
    </>
  );
}
