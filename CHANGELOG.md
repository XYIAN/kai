# Changelog

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

## [0.1.0] - 2024-06-25

### Added

- Initial implementation of KAI (Kyle AI) chatbot web app
  - Next.js 15 App Router, TypeScript, TailwindCSS, PrimeReact, OpenAI API
  - Mobile-first chat UI with animated background, PrimeReact components, and daily usage limit (tracked in localStorage)
  - Kyle's personality injected from `data/kyleProfile.ts` for every chat
  - Streaming OpenAI responses via `/api/chat`
  - Light/dark support via PrimeReact Lara Dark Teal theme
  - Comprehensive README and environment setup

### Changed

- **Project structure flattened:** Removed nested `kai/` directory, moved all files to the root for a clean, standard Next.js project layout.
