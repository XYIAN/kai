# KAI – Kyle AI 🤖🧙‍♂️

KAI is a fun, interactive AI chatbot that answers questions as if it were Kyle — a frontend wizard who turns coffee into code. It's a mobile-friendly web app built with Next.js 15, PrimeReact, and TailwindCSS.

---

## 🚀 Tech Stack
- **Next.js 15 (App Router)**
- **TypeScript**
- **TailwindCSS**
- **PrimeReact**
- **OpenAI Chat API (gpt-3.5-turbo)**

---

## ✨ Features
- Mobile-first chat interface
- Streamed AI responses via `/api/chat`
- Public profile knowledge:
  - Citizenship, job skills, location, GitHub, projects
  - College, stack, interests (without private info)
- Usage-limited (10 questions per user per day)
- Personality-aware prompt styling
- Subtle animated background
- Dark theme with PrimeReact Lara Dark Teal

---

## 🛡 Usage Limits
Each visitor can ask up to **10 questions per day**. Limits are tracked via `localStorage` and reset every 24 hours.

---

## 🧠 How it Works
- Sends prompt + user message to OpenAI API
- Injects Kyle's profile from `/data/kyleProfile.ts`
- Streams response back to chat UI
- Responds in Kyle's tone with helpful info

---

## 🛠 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone & Install
```bash
git clone <repository-url>
cd kai
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure
```
src/
├── app/
│   ├── api/chat/route.ts    # OpenAI API integration
│   ├── globals.css          # PrimeReact theme + custom styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main chat page
├── components/
│   ├── AnimatedBackground.tsx  # Subtle animated background
│   ├── Chat.tsx                # Main chat component
│   ├── ChatInput.tsx           # Message input
│   └── ChatMessage.tsx         # Individual message display
├── data/
│   └── kyleProfile.ts       # Kyle's personality & knowledge
├── hooks/
│   └── useUsageLimit.ts     # Daily usage limit management
└── types/
    └── chat.ts              # TypeScript interfaces
```

---

## 🎨 UI Components
- **PrimeReact**: InputText, Button components
- **TailwindCSS**: Responsive design & styling
- **Custom**: Chat bubbles, animated background
- **Mobile-first**: Optimized for all screen sizes

---

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Run Production Build
```bash
npm start
```

### Lint & Type Check
```bash
npm run lint
npm run type-check
```

---

## 🌟 Key Features Explained

### Personality Injection
The AI receives Kyle's profile data including:
- Professional background (frontend engineer)
- Location (Irvine, CA)
- Skills & tech stack
- Communication style
- What can/cannot be shared

### Usage Tracking
- `localStorage` stores daily usage count
- Resets automatically at midnight
- Prevents abuse while allowing daily interaction

### Streaming Responses
- Real-time AI response streaming
- Smooth typing animation
- Better user experience

---

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments
- Built with Next.js 15 and PrimeReact
- Powered by OpenAI GPT-3.5 Turbo
- Styled with TailwindCSS
- Animated with CSS animations

---

**KAI** - Where coffee meets code, and AI meets personality! ☕💻
