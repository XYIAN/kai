# Changelog

## [1.2.0] - 2024-12-19

### 🎭 KAI Personality & Personal Information Update

- **Complete Personality Overhaul**: Updated KAI to properly identify as an AI assistant created to help Kyle
- **Personal Information Integration**: Added comprehensive personal details about Kyle including family background
- **Dad's Information**: Added specific response about Kyle's dad: "The man, the myth, the legend, Airdog - he's probably working hard or partying even harder"
- **Contact Information**: Integrated all social links (GitHub: github.com/xyian, LinkedIn: linkedin.com/in/kxdilbeck, Website: kyledilbeck.com)
- **Personality Traits**: Added detailed personality information including work ethic, curiosity, and learning style
- **Tech Stack Details**: Updated with favorite technologies (Next.js, TypeScript, Node.js, Expo for mobile)
- **Professional Boundaries**: Added response for inappropriate questions: "Although I know everything about Kyle, this website is for professional and behavioral questions only"
- **Location Information**: Confirmed Irvine, CA location and US citizenship for recruiter questions
- **API Updates**: Updated both Netlify function and local development API route with consistent personality data

### 🎨 Background Image Fix

- **Aspect Ratio Fix**: Changed background from `contain` to `cover` to ensure full viewport coverage
- **No More Gaps**: Background now properly covers the entire x-axis without leaving edges exposed
- **Maintained Quality**: Background maintains proper scaling while ensuring full screen coverage

### 🦶 GitHub Footer Addition

- **New Footer Component**: Created `Footer` component with GitHub link
- **GitHub Integration**: Added link to github.com/xyian with proper styling
- **Positioning**: Fixed positioning at bottom center of the page
- **PrimeReact Styling**: Uses PrimeReact Button with GitHub icon and glassmorphism effects
- **Responsive Design**: Footer adapts to different screen sizes

### 🔧 Linter Fixes

- **ES Module Syntax**: Fixed Netlify function to use ES module `import` syntax instead of `require()`
- **Unused Parameter**: Removed unused `context` parameter from Netlify function handler
- **Build Verification**: Confirmed all linter errors resolved and build passes successfully

### 🔧 API Endpoint Fix for Development & Production

- **Environment Detection**: Created smart API utility that detects localhost vs production environment
- **Dual API Support**: Added support for both Next.js API routes (development) and Netlify Functions (production)
- **API Utility**: Created `src/utils/api.ts` with `sendChatMessage` function for centralized API calls
- **Browser Detection**: Uses `window.location.hostname` to determine correct API endpoint
- **Development**: Uses `/api/chat` on localhost for Next.js dev server
- **Production**: Uses `/.netlify/functions/chat` on Netlify for serverless functions
- **Debugging**: Added console logging to track which API endpoint is being used
- **Chat Component**: Updated to use new API utility instead of hardcoded fetch calls

### 🏗️ Provider Architecture Reorganization

- **Provider Directory Structure**: Moved all providers to `src/lib/providers/` for better organization
- **Main AppProvider**: Created centralized `AppProvider` that composes all individual providers
- **Provider Composition**: Implemented proper provider hierarchy with correct nesting order
- **Clean Architecture**: Separated providers from components for better code organization
- **Provider Structure**:
  - `AppProvider.tsx` - Main provider that composes all others
  - `PrimeReactProvider.tsx` - Base UI library provider
  - `KaiThemeProvider.tsx` - Custom theme provider
  - `index.ts` - Centralized exports
- **Layout Update**: Root layout now uses single `AppProvider` instead of individual providers
- **Component Cleanup**: Removed provider imports from individual components

### 🎭 Themed Error Messages & Enhanced Logging

- **Wizard-Themed Error Messages**: Replaced technical error messages with fun, magic-themed messages for better UX
- **Error Message Utility**: Created `src/utils/errorMessages.ts` with comprehensive error mapping and themed messages
- **Enhanced Error Logging**: Added detailed console logging with timestamps, context, and full error details
- **Netlify Function Logging**: Improved server-side logging with structured error information and request tracking
- **Error Message Examples**:
  - "🧙‍♂️ The wizard's spell fizzled!" (generic errors)
  - "💰 The wizard ran out of magical coins!" (quota exceeded)
  - "🌐 The magical network is having a moment!" (network errors)
  - "🔮 The AI crystal ball is malfunctioning!" (OpenAI errors)
- **Better Error Styling**: Enhanced error message display with themed styling and better visual hierarchy

### 🔧 Critical API Fix for Netlify Deployment

- **Netlify Functions Implementation**: Replaced Next.js API routes with Netlify Functions for static hosting compatibility
- **Chat API Migration**: Moved from `/api/chat` route to `netlify/functions/chat.js`
- **Static Export Compatibility**: Fixed 404 errors by implementing serverless functions instead of server-side API routes
- **CORS Support**: Added proper CORS headers for cross-origin requests
- **Error Handling**: Improved error handling and response formatting for Netlify Functions
- **Build Optimization**: Removed API routes from build output for cleaner static export

### 🚀 Netlify Deployment Setup

- **Static Export Configuration**: Updated Next.js config for static export with `output: 'export'`
- **Netlify Configuration**: Added `netlify.toml` with proper build settings and redirects
- **Build Optimization**: Configured for static hosting with `trailingSlash: true` and `images.unoptimized: true`
- **Deployment Documentation**: Comprehensive README with Netlify deployment instructions
- **Environment Variables**: Proper setup for OpenAI API key in Netlify environment
- **Security Headers**: Added security headers for production deployment

### 🎨 Major UI Overhaul & Cleanup

- **Complete CSS Rewrite**: Removed all conflicting styles and created specific, targeted CSS classes
- **Darker Theme**: Changed background from slate/purple to pure black/gray for a more sophisticated look
- **Floating Effects**: Added proper floating animations with subtle rotation for a more dynamic feel
- **Glassmorphism**: Implemented consistent glassmorphism effects throughout the interface
- **Responsive Layout**: Fixed desktop layout issues - chat no longer snaps to bottom
- **Specific Styling**: All CSS classes now target specific elements instead of global styles
- **PrimeReact Integration**: Proper integration with PrimeReact theming system

### 🧹 Cleanup & Maintenance

- **Removed Unused Assets**: Deleted all Next.js setup files (file.svg, globe.svg, next.svg, vercel.svg, window.svg)
- **CSS Conflicts**: Eliminated all conflicting CSS rules that were causing display issues
- **Unused Styles**: Removed all unused CSS classes and global styles
- **Header Fix**: Replaced random "K" with proper bolt icon in portfolio header
- **Scrollbar**: Made scrollbar styling specific to chat container only

### 🎯 UI Improvements

- **Chat Container**: Now uses proper glassmorphism with rounded corners and shadows
- **Input Styling**: Enhanced input field with better focus states and glassmorphism
- **Button Effects**: Improved button hover effects with proper elevation
- **Message Bubbles**: Better styling for chat messages with proper gradients and shadows
- **Loading States**: Enhanced loading indicators with better animations
- **Error Handling**: Improved error message styling with better contrast

### 🔧 Technical Improvements

- **CSS Variables**: Implemented custom CSS variables for consistent theming
- **Animation Performance**: Optimized animations for better performance
- **Mobile-First**: Ensured all improvements work well on mobile devices
- **Accessibility**: Maintained proper contrast ratios and focus states

### 🎨 Background Update

- **KAI Background Image**: Updated background to use `kai-bg-1.png` from the public folder
- **Image Optimization**: Added proper Next.js Image component with priority loading and quality optimization
- **Overlay Enhancement**: Added black overlay (40% opacity) for better text readability over the background image
- **Simplified Elements**: Removed unnecessary grid pattern and excessive floating elements
- **Performance**: Optimized background loading with proper image attributes

### 🐛 Critical Fixes

- **Chat Message Visibility**: Fixed critical issue where chat messages were not displaying due to overcomplicated PrimeReact Message component styling
- **Simplified Message Component**: Replaced complex PrimeReact Message overrides with simple, custom div-based chat bubbles
- **KAI Logo Integration**: Added KAI logo (kai-logo-4.png) for AI messages and avatars throughout the interface
- **Input Container Fix**: Fixed chat input to properly fill parent container width
- **Reduced Wobbling**: Made floating animation much more subtle (4px instead of 12px) and removed from main chat container

### 🎨 UI Improvements

- **Custom Chat Bubbles**: Created simple, effective chat message bubbles with proper text visibility
- **Loading States**: Simplified loading indicators to use custom styling instead of PrimeReact Message
- **Error Messages**: Streamlined error message display with better visibility
- **Avatar System**: Implemented proper avatar system with KAI logo for AI and user icon for user messages
- **Responsive Input**: Fixed input field to properly expand and fill available space

### 🔧 Technical Improvements

- **Removed CSS Conflicts**: Eliminated all PrimeReact Message component CSS overrides that were causing display issues
- **Simplified Styling**: Used direct Tailwind classes instead of complex CSS overrides
- **Better Component Structure**: Improved component hierarchy and styling approach
- **Image Optimization**: Added proper Next.js Image component usage for KAI logos

### 🎯 Visual Enhancements

- **KAI Branding**: Integrated KAI logo throughout the interface for consistent branding
- **Message Layout**: Improved message layout with proper spacing and visual hierarchy
- **Input Styling**: Enhanced input field with better padding and visual feedback
- **Subtle Animations**: Reduced animation intensity for better user experience

### 🎯 QuestionsLeft Component Extraction

- **New Component**: Created dedicated `QuestionsLeft` component with proper TypeScript interface
- **Better Styling**: Improved spacing using PrimeFlex classes (`gap-2`, `align-items-center`)
- **Enhanced Padding**: Increased horizontal padding (`px-6`) for better visual balance
- **Subtle Positioning**: Moved to bottom of chat container with 50% opacity for subtlety
- **Clean Architecture**: Extracted reusable component with single responsibility

### 🧹 Major CSS Cleanup & PrimeReact Integration

- **Removed All Leftover Next.js Styles**: Completely cleaned up global CSS, removing all leftover styles from npx setup
- **Background Fix**: Removed body background override that was preventing the KAI background image from showing
- **PrimeReact Component Integration**: Now using proper PrimeReact components (Card, Button, InputText) throughout
- **Removed Hard-Coded Borders**: Eliminated all hard-coded border colors and styles, letting PrimeReact theme handle styling
- **Subtle Styling**: Reduced border contrast and made all corners slightly rounded (rounded-lg instead of rounded-2xl)
- **Less Boxy Design**: Replaced harsh borders and shadows with subtle, elegant styling

### 🎨 UI Refinements

- **Chat Container**: Now uses PrimeReact Card component with subtle rounded corners
- **Input Container**: Uses PrimeReact Card with proper theming
- **Message Bubbles**: Simplified styling with subtle backgrounds and rounded corners
- **Loading States**: Cleaner loading indicators with reduced opacity
- **Error Messages**: Streamlined error display without harsh borders
- **Usage Counter**: Simplified styling with subtle background

### 🔧 Technical Improvements

- **CSS Architecture**: Removed all custom CSS variables and complex overrides
- **PrimeReact Theming**: Let PrimeReact handle all component styling and theming
- **Performance**: Reduced CSS complexity for better performance
- **Maintainability**: Much cleaner codebase with fewer custom styles

### 🎯 Visual Enhancements

- **Consistent Theming**: All components now follow PrimeReact's Lara Dark Teal theme
- **Subtle Effects**: Reduced visual noise with softer shadows and backgrounds
- **Better Contrast**: Improved readability while maintaining elegant design
- **Professional Look**: More polished and professional appearance

## [1.1.0] - 2024-12-19

### 🎭 KAI Personality & Personal Information Update

- **Complete Personality Overhaul**: Updated KAI to properly identify as an AI assistant created to help Kyle
- **Personal Information Integration**: Added comprehensive personal details about Kyle including family background
- **Dad's Information**: Added specific response about Kyle's dad: "The man, the myth, the legend, Airdog - he's probably working hard or partying even harder"
- **Contact Information**: Integrated all social links (GitHub: github.com/xyian, LinkedIn: linkedin.com/in/kxdilbeck, Website: kyledilbeck.com)
- **Personality Traits**: Added detailed personality information including work ethic, curiosity, and learning style
- **Tech Stack Details**: Updated with favorite technologies (Next.js, TypeScript, Node.js, Expo for mobile)
- **Professional Boundaries**: Added response for inappropriate questions: "Although I know everything about Kyle, this website is for professional and behavioral questions only"
- **Location Information**: Confirmed Irvine, CA location and US citizenship for recruiter questions
- **API Updates**: Updated both Netlify function and local development API route with consistent personality data

### 🎨 Background Image Fix

- **Aspect Ratio Fix**: Changed background from `contain` to `cover` to ensure full viewport coverage
- **No More Gaps**: Background now properly covers the entire x-axis without leaving edges exposed
- **Maintained Quality**: Background maintains proper scaling while ensuring full screen coverage

### 🦶 GitHub Footer Addition

- **New Footer Component**: Created `Footer` component with GitHub link
- **GitHub Integration**: Added link to github.com/xyian with proper styling
- **Positioning**: Fixed positioning at bottom center of the page
- **PrimeReact Styling**: Uses PrimeReact Button with GitHub icon and glassmorphism effects
- **Responsive Design**: Footer adapts to different screen sizes

### 🔧 Linter Fixes

- **ES Module Syntax**: Fixed Netlify function to use ES module `import` syntax instead of `require()`
- **Unused Parameter**: Removed unused `context` parameter from Netlify function handler
- **Build Verification**: Confirmed all linter errors resolved and build passes successfully

### 🔧 API Endpoint Fix for Development & Production

- **Environment Detection**: Created smart API utility that detects localhost vs production environment
- **Dual API Support**: Added support for both Next.js API routes (development) and Netlify Functions (production)
- **API Utility**: Created `src/utils/api.ts` with `sendChatMessage` function for centralized API calls
- **Browser Detection**: Uses `window.location.hostname` to determine correct API endpoint
- **Development**: Uses `/api/chat` on localhost for Next.js dev server
- **Production**: Uses `/.netlify/functions/chat` on Netlify for serverless functions
- **Debugging**: Added console logging to track which API endpoint is being used
- **Chat Component**: Updated to use new API utility instead of hardcoded fetch calls

### 🏗️ Provider Architecture Reorganization

- **Provider Directory Structure**: Moved all providers to `src/lib/providers/` for better organization
- **Main AppProvider**: Created centralized `AppProvider` that composes all individual providers
- **Provider Composition**: Implemented proper provider hierarchy with correct nesting order
- **Clean Architecture**: Separated providers from components for better code organization
- **Provider Structure**:
  - `AppProvider.tsx` - Main provider that composes all others
  - `PrimeReactProvider.tsx` - Base UI library provider
  - `KaiThemeProvider.tsx` - Custom theme provider
  - `index.ts` - Centralized exports
- **Layout Update**: Root layout now uses single `AppProvider` instead of individual providers
- **Component Cleanup**: Removed provider imports from individual components

### 🎭 Themed Error Messages & Enhanced Logging

- **Wizard-Themed Error Messages**: Replaced technical error messages with fun, magic-themed messages for better UX
- **Error Message Utility**: Created `src/utils/errorMessages.ts` with comprehensive error mapping and themed messages
- **Enhanced Error Logging**: Added detailed console logging with timestamps, context, and full error details
- **Netlify Function Logging**: Improved server-side logging with structured error information and request tracking
- **Error Message Examples**:
  - "🧙‍♂️ The wizard's spell fizzled!" (generic errors)
  - "💰 The wizard ran out of magical coins!" (quota exceeded)
  - "🌐 The magical network is having a moment!" (network errors)
  - "🔮 The AI crystal ball is malfunctioning!" (OpenAI errors)
- **Better Error Styling**: Enhanced error message display with themed styling and better visual hierarchy

### 🔧 Critical API Fix for Netlify Deployment

- **Netlify Functions Implementation**: Replaced Next.js API routes with Netlify Functions for static hosting compatibility
- **Chat API Migration**: Moved from `/api/chat` route to `netlify/functions/chat.js`
- **Static Export Compatibility**: Fixed 404 errors by implementing serverless functions instead of server-side API routes
- **CORS Support**: Added proper CORS headers for cross-origin requests
- **Error Handling**: Improved error handling and response formatting for Netlify Functions
- **Build Optimization**: Removed API routes from build output for cleaner static export

### 🚀 Netlify Deployment Setup

- **Static Export Configuration**: Updated Next.js config for static export with `output: 'export'`
- **Netlify Configuration**: Added `netlify.toml` with proper build settings and redirects
- **Build Optimization**: Configured for static hosting with `trailingSlash: true` and `images.unoptimized: true`
- **Deployment Documentation**: Comprehensive README with Netlify deployment instructions
- **Environment Variables**: Proper setup for OpenAI API key in Netlify environment
- **Security Headers**: Added security headers for production deployment

### 🎨 Major UI Overhaul & Cleanup

- **Complete CSS Rewrite**: Removed all conflicting styles and created specific, targeted CSS classes
- **Darker Theme**: Changed background from slate/purple to pure black/gray for a more sophisticated look
- **Floating Effects**: Added proper floating animations with subtle rotation for a more dynamic feel
- **Glassmorphism**: Implemented consistent glassmorphism effects throughout the interface
- **Responsive Layout**: Fixed desktop layout issues - chat no longer snaps to bottom
- **Specific Styling**: All CSS classes now target specific elements instead of global styles
- **PrimeReact Integration**: Proper integration with PrimeReact theming system

### 🧹 Cleanup & Maintenance

- **Removed Unused Assets**: Deleted all Next.js setup files (file.svg, globe.svg, next.svg, vercel.svg, window.svg)
- **CSS Conflicts**: Eliminated all conflicting CSS rules that were causing display issues
- **Unused Styles**: Removed all unused CSS classes and global styles
- **Header Fix**: Replaced random "K" with proper bolt icon in portfolio header
- **Scrollbar**: Made scrollbar styling specific to chat container only

### 🎯 UI Improvements

- **Chat Container**: Now uses proper glassmorphism with rounded corners and shadows
- **Input Styling**: Enhanced input field with better focus states and glassmorphism
- **Button Effects**: Improved button hover effects with proper elevation
- **Message Bubbles**: Better styling for chat messages with proper gradients and shadows
- **Loading States**: Enhanced loading indicators with better animations
- **Error Handling**: Improved error message styling with better contrast

### 🔧 Technical Improvements

- **CSS Variables**: Implemented custom CSS variables for consistent theming
- **Animation Performance**: Optimized animations for better performance
- **Mobile-First**: Ensured all improvements work well on mobile devices
- **Accessibility**: Maintained proper contrast ratios and focus states

### 🎨 Background Update

- **KAI Background Image**: Updated background to use `kai-bg-1.png` from the public folder
- **Image Optimization**: Added proper Next.js Image component with priority loading and quality optimization
- **Overlay Enhancement**: Added black overlay (40% opacity) for better text readability over the background image
- **Simplified Elements**: Removed unnecessary grid pattern and excessive floating elements
- **Performance**: Optimized background loading with proper image attributes

### 🐛 Critical Fixes

- **Chat Message Visibility**: Fixed critical issue where chat messages were not displaying due to overcomplicated PrimeReact Message component styling
- **Simplified Message Component**: Replaced complex PrimeReact Message overrides with simple, custom div-based chat bubbles
- **KAI Logo Integration**: Added KAI logo (kai-logo-4.png) for AI messages and avatars throughout the interface
- **Input Container Fix**: Fixed chat input to properly fill parent container width
- **Reduced Wobbling**: Made floating animation much more subtle (4px instead of 12px) and removed from main chat container

### 🎨 UI Improvements

- **Custom Chat Bubbles**: Created simple, effective chat message bubbles with proper text visibility
- **Loading States**: Simplified loading indicators to use custom styling instead of PrimeReact Message
- **Error Messages**: Streamlined error message display with better visibility
- **Avatar System**: Implemented proper avatar system with KAI logo for AI and user icon for user messages
- **Responsive Input**: Fixed input field to properly expand and fill available space

### 🔧 Technical Improvements

- **Removed CSS Conflicts**: Eliminated all PrimeReact Message component CSS overrides that were causing display issues
- **Simplified Styling**: Used direct Tailwind classes instead of complex CSS overrides
- **Better Component Structure**: Improved component hierarchy and styling approach
- **Image Optimization**: Added proper Next.js Image component usage for KAI logos

### 🎯 Visual Enhancements

- **KAI Branding**: Integrated KAI logo throughout the interface for consistent branding
- **Message Layout**: Improved message layout with proper spacing and visual hierarchy
- **Input Styling**: Enhanced input field with better padding and visual feedback
- **Subtle Animations**: Reduced animation intensity for better user experience

### 🎯 QuestionsLeft Component Extraction

- **New Component**: Created dedicated `QuestionsLeft` component with proper TypeScript interface
- **Better Styling**: Improved spacing using PrimeFlex classes (`gap-2`, `align-items-center`)
- **Enhanced Padding**: Increased horizontal padding (`px-6`) for better visual balance
- **Subtle Positioning**: Moved to bottom of chat container with 50% opacity for subtlety
- **Clean Architecture**: Extracted reusable component with single responsibility

### 🧹 Major CSS Cleanup & PrimeReact Integration

- **Removed All Leftover Next.js Styles**: Completely cleaned up global CSS, removing all leftover styles from npx setup
- **Background Fix**: Removed body background override that was preventing the KAI background image from showing
- **PrimeReact Component Integration**: Now using proper PrimeReact components (Card, Button, InputText) throughout
- **Removed Hard-Coded Borders**: Eliminated all hard-coded border colors and styles, letting PrimeReact theme handle styling
- **Subtle Styling**: Reduced border contrast and made all corners slightly rounded (rounded-lg instead of rounded-2xl)
- **Less Boxy Design**: Replaced harsh borders and shadows with subtle, elegant styling

### 🎨 UI Refinements

- **Chat Container**: Now uses PrimeReact Card component with subtle rounded corners
- **Input Container**: Uses PrimeReact Card with proper theming
- **Message Bubbles**: Simplified styling with subtle backgrounds and rounded corners
- **Loading States**: Cleaner loading indicators with reduced opacity
- **Error Messages**: Streamlined error display without harsh borders
- **Usage Counter**: Simplified styling with subtle background

### 🔧 Technical Improvements

- **CSS Architecture**: Removed all custom CSS variables and complex overrides
- **PrimeReact Theming**: Let PrimeReact handle all component styling and theming
- **Performance**: Reduced CSS complexity for better performance
- **Maintainability**: Much cleaner codebase with fewer custom styles

### 🎯 Visual Enhancements

- **Consistent Theming**: All components now follow PrimeReact's Lara Dark Teal theme
- **Subtle Effects**: Reduced visual noise with softer shadows and backgrounds
- **Better Contrast**: Improved readability while maintaining elegant design
- **Professional Look**: More polished and professional appearance

## [0.1.0] - 2024-12-19

### ✨ Initial Release

- **Next.js 15 App**: Built with Next.js 15 App Router and TypeScript
- **Kyle AI Chatbot**: AI-powered chatbot that responds as Kyle, a frontend engineer
- **OpenAI Integration**: Streaming chat responses using OpenAI GPT-3.5-turbo
- **PrimeReact UI**: Modern UI components with PrimeReact and TailwindCSS
- **Responsive Design**: Mobile-first responsive design with glassmorphism effects
- **Usage Limits**: Daily usage tracking with localStorage (10 questions per day)
- **Theme Support**: Dark theme with animated background
- **Portfolio Header**: Professional header with social links and branding

### 🎨 UI Features

- **Animated Background**: Subtle animated background with floating elements
- **Chat Interface**: Scrollable chat thread with user/AI message bubbles
- **Input System**: Real-time chat input with send button and keyboard shortcuts
- **Loading States**: Animated loading indicators during AI responses
- **Error Handling**: Comprehensive error handling for API failures
- **Usage Counter**: Visual indicator of remaining daily questions

### 🔧 Technical Features

- **TypeScript**: Full TypeScript implementation with proper type definitions
- **API Routes**: Next.js API routes for chat functionality
- **Streaming**: Real-time streaming of AI responses
- **State Management**: React hooks for chat state and usage limits
- **Error Boundaries**: Proper error handling and user feedback
- **Performance**: Optimized for fast loading and smooth interactions

### 📱 Responsive Design

- **Mobile-First**: Designed primarily for mobile devices
- **Desktop Support**: Full desktop experience with proper scaling
- **Touch-Friendly**: Optimized for touch interactions
- **Accessibility**: Proper ARIA labels and keyboard navigation

### 🎯 Kyle's Personality

- **Professional Background**: Frontend engineer from Irvine, CA
- **Technical Expertise**: React, Next.js, TypeScript, and modern web technologies
- **Personal Touch**: Includes family background, interests, and fun facts
- **Work Experience**: Current role at XYIAN Software and previous positions
- **Skills & Tools**: Comprehensive list of technical skills and tools
- **Contact Information**: Professional contact details and social links

## [0.4.0] - 2024-06-25

### Added

- **PrimeReact Integration**: Refactored chat components to use PrimeReact Message component
- **Custom Theme Provider**: Created KaiThemeProvider with JSDoc documentation for theme management
- **Custom CSS Classes**: Added kai-user-message and kai-ai-message classes for consistent styling

### Changed

- **ChatMessage Component**: Now uses PrimeReact Message component with custom theming
- **Loading States**: Improved loading and error states using PrimeReact Message components
- **Code Organization**: Added proper JSDoc documentation for all custom components
- **Theme Management**: Centralized theme customizations in global CSS with proper class naming

### Fixed

- **Spacing Issues**: Resolved uneven spacing and boxy appearance in chat messages
- **Component Consistency**: All chat elements now use PrimeReact components with custom theming
- **Code Maintainability**: Better organization with documented custom theme components

## [0.3.0] - 2024-06-25

### Added

- **Comprehensive Personal Profile**: Added extensive personal information to make KAI more authentic
  - Personal background: Monterey, CA upbringing, ranch life, construction and drone experience
  - Family details: Dad "Airdog" and sister Kas (holistic health doctor with website link)
  - Complete work history: XYIAN Software, Yamaha, Bluon Inc, and previous positions
  - Technical skills: Comprehensive list of 40+ technologies and tools
  - Fun facts: Soccer career, fitness interests, dog Nala, personal stories
  - Contact information: Phone, email, website, LinkedIn, GitHub

### Changed

- **Enhanced AI Personality**: Updated prompt to include personal stories and authentic responses
- **Portfolio Header**: Added personal website link (kyledilbeck.com) alongside LinkedIn and GitHub
- **Professional Title**: Updated from "Frontend Engineer" to "Senior Software Developer"
- **Authentic Responses**: AI now shares relevant personal details and stories when appropriate

### Fixed

- **Personalization**: KAI now feels like talking to the real Kyle with authentic personality and experiences

## [0.2.0] - 2024-06-25

### Added

- **Portfolio Header**: Added responsive header with LinkedIn and GitHub links using official icons
- **Star Wars-style Chat Fade**: Messages fade out at the top with smooth transitions
- **Responsive Design**: Optimized layout for mobile, tablet, and desktop with proper spacing
- **Beautiful UI Overhaul**: Complete redesign with glassmorphism effects, gradients, and animations
- **Proper Icons**: Replaced weird characters with PrimeIcons for user avatars and UI elements

### Changed

- **Desktop Layout**: Chat is now centered with proper max-width constraints
- **Background**: Enhanced animated background with subtle grid pattern and floating elements
- **Chat Container**: Added glassmorphism container with Star Wars-style fade overlays
- **Message Styling**: Improved chat bubbles with gradients, shadows, and better typography
- **Input Design**: Redesigned input field with glassmorphism and gradient send button
- **Color Scheme**: Updated to dark theme with teal/blue accent colors
- **Typography**: Added gradient text effects and improved font hierarchy

### Fixed

- **Icon Issues**: Replaced emoji/character placeholders with proper PrimeIcons
- **Responsive Issues**: Fixed layout problems on different screen sizes
- **Visual Polish**: Enhanced overall visual appeal with professional design standards

## [0.1.2] - 2024-06-25

### Changed

- Improved error handling for OpenAI API errors
  - Added specific error messages for quota exceeded (429), invalid API key (401), and invalid requests (400)
  - Enhanced error display in UI with better formatting and helpful messages
  - Usage count no longer increments when API errors occur

## [0.1.1] - 2024-06-25

### Changed

- Fixed Next.js viewport warning by moving viewport to its own export in layout.tsx
- Updated metadata: name is now 'KAI', description is 'The KyleAI chatbot'
- Added .prettierrc with project formatting rules

## [1.1.0] - 2024-06-25

### 🎨 Avatar & Chat Icon Improvements

- **Avatar Sizing**: Updated all chat avatars for a more balanced, professional look
  - Small "Kyle AI" icon is now 25x25px
  - Main chat icon (edge of bubble) is now 50x50px (scales to 40x40 on small screens)
- **Icon Update**: Main chat icon for KAI AI now uses `public/kai-logo-2.png` for a more distinct look
- **Responsive**: Avatar sizes scale down on mobile for better usability
- **Consistent UI**: All avatar and icon sizes are now consistent across chat, loading, and message states
- **Version Bump**: Updated app version to 1.1.0
