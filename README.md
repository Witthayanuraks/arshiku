# Arshiku Blog 📑

[![Website](https://img.shields.io/badge/website-live-green)](https://your-deployed-url.com)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2+-61DAFB)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-4.0+-646CFF)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.3+-06B6D4)](https://tailwindcss.com)

A modern blog about history, tips & tricks, built with React Vite and styled with Tailwind CSS for peak performance.


## Features ✨

- ⚡ **Blazing Fast** - Vite-powered React application
- 🎨 **Tailwind CSS** - Utility-first styling with easy customization
- 📱 **Fully Responsive** - Works flawlessly on all devices
- 🌗 **Dark/Light Mode** - Automatic theme detection with manual toggle
- 🔍 **Search Functionality** - Find articles quickly
- 📂 **Category Filtering** - Organized content browsing

## Tech Stack 🛠️

**Frontend:**
- React 18 (JSX )
- Vite 4
- Tailwind CSS 3 / 4
- React Router (for navigation)
- React Icons (for beautiful icons)

**Optional Enhancements:**
- Framer Motion (for animations)
- React Markdown (for content rendering)
- Date-fns (for date formatting)

## Getting Started  ? 

### Prerequisites
- Node.js ≥16.0.0
- npm/yarn/pnpm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Witthayanuraks/arshiku.git
   cd arshiku
   ```
2. Install dependencies:
   ```bash
   npm install  # or yarn/pnpm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure 📂 [UNFINISHED]

```
arshiku/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom hooks
│   ├── styles/        # Global styles
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main app component
│   └── main.tsx       # Entry point
├── tailwind.config.js # Tailwind configuration
├── vite.config.ts     # Vite configuration
└── ...                # Other config files
```

## Building for Production 🏗️

```bash
npm run build
```

This will create an optimized production build in the `dist/` directory.

## Deployment 🚀

The project can be deployed to:
- Vercel ([Guide](https://vercel.com/docs))
- Netlify ([Guide](https://docs.netlify.com))
- GitHub Pages ([Guide](https://pages.github.com))
- Any static hosting service

## Adding Content 📝

1. Create new Markdown/MDX files in your content directory
2. Use the frontmatter format:
   ```markdown
   ---
   title: "Post Title"
   date: "2023-08-20"
   category: "history"
   tags: ["tag1", "tag2"]
   coverImage: "/images/post-cover.jpg"
   ---
   ```
3. Import and render in your React components

## Contribute pls
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

