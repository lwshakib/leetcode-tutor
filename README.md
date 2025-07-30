# LeetCode Tutor Chrome Extension 🚀

A powerful Chrome extension that provides AI-powered tutoring assistance while solving LeetCode problems. Get instant help, explanations, and step-by-step guidance directly on LeetCode's problem pages.

## ✨ Features

- **🤖 AI-Powered Tutoring**: Get intelligent assistance using Google's Gemini AI
- **📝 Context-Aware**: Automatically extracts problem statements and your code
- **💬 Interactive Chat**: Real-time conversation with the AI tutor
- **🎯 Beginner-Friendly**: Explains concepts in simple, easy-to-understand language
- **💾 Session Persistence**: Your chat history is saved during the session
- **🎨 Modern UI**: Beautiful, responsive interface with glassmorphism design
- **⚡ Real-time Streaming**: See AI responses as they're generated

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **AI Integration**: Google Gemini AI (Gemini 2.5 Flash)
- **Build Tool**: Vite
- **Chrome Extension**: @crxjs/vite-plugin
- **Icons**: Lucide React
- **Markdown**: React Markdown

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google AI API key

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/lwshakib/leetcode-tutor.git
   cd leetcode-tutor
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   VITE_GOOGLE_API_KEY=your_google_ai_api_key_here
   ```

4. **Build the extension**

   ```bash
   npm run build
   ```

5. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder from your project

## 🚀 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
leetcode-tutor/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ChatBox.tsx     # Main chat interface
│   │   └── MarkdownRenderer.tsx
│   ├── constants/
│   │   └── prompt.ts       # AI system prompts
│   ├── content/            # Content script files
│   │   ├── main.tsx       # Entry point for content script
│   │   └── views/
│   │       └── App.tsx    # Main app component
│   ├── popup/             # Extension popup (if needed)
│   └── assets/            # Static assets
├── public/                # Extension icons
├── manifest.config.ts     # Chrome extension manifest
└── vite.config.ts        # Vite configuration
```

## 🎯 How It Works

1. **Content Script Injection**: The extension automatically injects into LeetCode problem pages
2. **Context Extraction**: Extracts problem statements, user code, and programming language
3. **AI Integration**: Sends context to Google Gemini AI with custom system prompts
4. **Interactive Chat**: Provides a floating chat interface for real-time assistance
5. **Session Management**: Maintains conversation history during the session

## 🔧 Configuration

### Manifest Configuration

The extension is configured to work on LeetCode problem pages:

- **Target URLs**: `https://leetcode.com/problems/*`
- **Permissions**: Content script injection
- **Icons**: Multiple sizes for different contexts

### AI Prompt System

The extension uses a sophisticated prompt system that:

- Provides beginner-friendly explanations
- Uses real-life analogies
- Maintains teaching context
- Formats responses with Markdown

## 🎨 UI Components

### ChatBox Component

- **Floating Interface**: Positioned at bottom-right of the page
- **Glassmorphism Design**: Modern, translucent appearance
- **Real-time Streaming**: Shows AI responses as they generate
- **Message Persistence**: Saves chat history in session storage

### Features

- Responsive design that adapts to different screen sizes
- Smooth animations and transitions
- Accessible with proper ARIA labels
- Keyboard navigation support

## 🔒 Privacy & Security

- **Local Storage**: Chat history is stored locally in session storage
- **API Key**: Google AI API key is stored in environment variables
- **No Data Collection**: The extension doesn't collect or transmit personal data
- **Secure Communication**: All AI requests are made over HTTPS

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

This creates:

- `dist/` folder with the extension files
- `release/crx-leetcode-tutor-1.0.0.zip` for distribution

### Publishing to Chrome Web Store

1. Build the extension: `npm run build`
2. Zip the `dist` folder contents
3. Upload to the Chrome Web Store Developer Dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain component reusability
- Add proper error handling
- Include TypeScript types for all functions

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for AI capabilities
- [LeetCode](https://leetcode.com/) for the platform
- [@crxjs/vite-plugin](https://github.com/crxjs/crx) for Chrome extension tooling
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include browser version and extension version

---

**Happy coding! 🎉**

_Built with ❤️ for the LeetCode community_
