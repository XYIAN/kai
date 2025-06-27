# KAI - Kyle's AI Assistant

A Next.js 15 chatbot application featuring Kyle, a frontend engineer, built with modern web technologies and PrimeReact UI components.

## 🚀 Features

- **AI Chatbot**: Powered by OpenAI API with Kyle's personality
- **Modern UI**: Built with PrimeReact components and TailwindCSS
- **Responsive Design**: Mobile-first approach with glassmorphism effects
- **Theme Support**: Light/dark theme with custom styling
- **Usage Limits**: Daily chat limit tracking via localStorage
- **Real-time Responses**: AI responses via Netlify Functions
- **Portfolio Integration**: Social links and professional information

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.4 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + PrimeReact + PrimeFlex
- **UI Components**: PrimeReact
- **Icons**: PrimeIcons + React Icons
- **AI**: OpenAI Chat API
- **Backend**: Netlify Functions
- **Deployment**: Netlify

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd kai
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment to Netlify

### Option 1: Deploy via Netlify UI

1. **Push your code to GitHub**

   ```bash
   git add .
   git commit -m "Add Netlify Functions setup"
   git push origin main
   ```

2. **Connect to Netlify**

   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Select the repository

3. **Configure build settings**

   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: 18

4. **Set environment variables**

   - Go to Site settings > Environment variables
   - Add `OPENAI_API_KEY` with your OpenAI API key

5. **Deploy**
   - Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**

   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**

   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=out
   ```

## 🔧 Configuration

### Environment Variables

| Variable         | Description         | Required |
| ---------------- | ------------------- | -------- |
| `OPENAI_API_KEY` | Your OpenAI API key | Yes      |

### Build Configuration

The project is configured for static export with:

- `output: 'export'` in `next.config.ts`
- `trailingSlash: true` for Netlify compatibility
- `images.unoptimized: true` for static export

### Netlify Functions

The chat API is implemented as a Netlify Function:

- **Location**: `netlify/functions/chat.js`
- **Endpoint**: `/api/chat` (automatically redirected to `/.netlify/functions/chat`)
- **Features**: CORS support, error handling, Kyle's personality prompt

## 📁 Project Structure

```
kai/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── Chat.tsx        # Main chat component
│   │   ├── ChatInput.tsx   # Chat input component
│   │   ├── ChatMessage.tsx # Individual message component
│   │   ├── PortfolioHeader.tsx # Portfolio header
│   │   ├── QuestionsLeft.tsx # Usage limit display
│   │   └── WelcomeHero.tsx # Welcome section
│   ├── lib/                # Library code and utilities
│   │   └── providers/      # Application providers
│   │       ├── AppProvider.tsx      # Main provider composition
│   │       ├── PrimeReactProvider.tsx # PrimeReact provider
│   │       ├── KaiThemeProvider.tsx # Custom theme provider
│   │       └── index.ts    # Provider exports
│   ├── utils/              # Utility functions
│   │   └── errorMessages.ts # Error handling utilities
│   ├── constants/          # Constants and config
│   ├── data/              # Static data
│   ├── hooks/             # Custom React hooks
│   └── types/             # TypeScript type definitions
├── netlify/
│   └── functions/         # Netlify Functions
│       └── chat.js        # Chat API function
├── public/                # Static assets
├── netlify.toml          # Netlify configuration
├── next.config.ts        # Next.js configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Customization

### Styling

- Global styles are in `src/app/globals.css`
- PrimeReact theme customization in `src/components/KaiThemeProvider.tsx`
- Component-specific styles use TailwindCSS classes

### Kyle's Profile

- Update Kyle's information in `src/data/kyleProfile.ts`
- Modify the AI personality prompt in `netlify/functions/chat.js`

### Theme

- Custom theme colors and styling in the theme provider
- Dark/light mode support built-in

## 🐛 Troubleshooting

### Common Issues

1. **Build fails on Netlify**

   - Ensure Node.js version is 18 or higher
   - Check that all environment variables are set
   - Verify the build command is `npm run build`

2. **OpenAI API errors**

   - Verify your API key is correct
   - Check your OpenAI account quota
   - Ensure the API key is set in Netlify environment variables

3. **Chat API 404 errors**

   - Make sure Netlify Functions are properly configured
   - Check that the `netlify.toml` file includes the functions directory
   - Verify the API redirect rule is in place

4. **Styling issues**
   - Clear browser cache
   - Check that PrimeReact CSS is properly imported
   - Verify TailwindCSS configuration

### Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a personal project for Kyle's portfolio. For questions or suggestions, please reach out directly.

---

Built with ❤️ by Kyle using Next.js, PrimeReact, and OpenAI
