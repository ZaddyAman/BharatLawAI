# BharatLawAI - Indian Legal Assistant

A modern, AI-powered web application that provides assistance with Indian laws, legal procedures, and acts. Built with React, TypeScript, and Tailwind CSS.

## Features

- **AI Chat Interface**: Ask legal questions and get intelligent responses
- **Legal Section Explorer**: Browse through Indian legal acts, chapters, and sections
- **Source Attribution**: See whether answers come from legal database or AI reasoning
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Backend API**: FastAPI (separate service)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:8000`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bharatlawai
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## API Integration

The frontend integrates with a FastAPI backend that provides:

- **Endpoint**: `POST /chat`
- **Payload**: `{ "question": "Your legal question" }`
- **Response**: `{ "answer": "AI response", "source": "vector_db" | "fallback_llm" }`

Make sure your backend API is running on `http://localhost:8000` or update the `VITE_API_URL` in your `.env` file.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with navigation
│   └── ChatMessage.tsx # Chat message component
├── pages/              # Page components
│   ├── HomePage.tsx    # Main chat interface
│   ├── SectionExplorerPage.tsx # Legal sections browser
│   └── AboutPage.tsx   # About and information page
├── utils/              # Utility functions
│   ├── api.ts         # API integration
│   └── cn.ts          # Class name utility
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Disclaimer

This application is for educational and informational purposes only. It does not provide legal advice. Always consult with qualified legal professionals for specific legal matters.

## License

MIT License - see LICENSE file for details