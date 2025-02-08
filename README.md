# Gemini Chat Application

A modern, responsive chat interface for the Gemini AI model, built with React, TypeScript, and Tailwind CSS.

## Features

- 🤖 Real-time chat with Google's Gemini AI model
- 💅 Modern and responsive UI design
- 🎨 Clean and intuitive user interface
- 📱 Mobile-first approach
- ⚡ Fast and lightweight
- 🔒 Secure API key handling

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/gemini-chat.git
cd gemini-chat
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint to check code quality

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Google Generative AI SDK
- Lucide React Icons
- React Markdown

## Project Structure

```
src/
├── lib/
│   └── gemini.ts      # Gemini API integration
├── App.tsx            # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Google Gemini AI](https://deepmind.google/technologies/gemini/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)