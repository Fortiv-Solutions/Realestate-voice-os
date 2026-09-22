# Fortiv AI - Real Estate AI Calling Dashboard

A production-grade web dashboard for managing and analyzing AI-powered voice calling agents specialized in real estate acquisition, lead qualification, and property management outreach.

## 🚀 Key Features

- **Dashboard & Performance Overview**: Real-time KPI metrics, active campaign tracking, conversion rates, and live activity streams.
- **AI Agent Management**: Configure, test, and manage voice calling agents with customizable prompts, voices, and workflows.
- **Campaign Management**: Multi-channel cold/warm calling campaigns with customizable scheduling, pacing, and lead targeting.
- **Call Logs & Deep Intelligence**: Detailed transcripts, sentiment analysis, audio playback simulation, qualification tagging, and objection tracking.
- **Lead & Property Pipeline**: Comprehensive contact lists, owner records, property attributes, and status tracking.
- **Analytics & AI Insights**: Conversion funnels, peak calling hours heatmaps, sentiment trends, and optimization suggestions.
- **Integrations**: Webhooks, CRM synchronizations, telephony provider settings, and export tools.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [PostCSS](https://postcss.org/) and [Autoprefixer](https://github.com/postcss/autoprefixer)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utility**: [clsx](https://github.com/lukeed/clsx)

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd "Realestate ai dashboard"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the URL shown in terminal).

### Available Scripts

- `npm run dev`: Runs the app in development mode with hot-module reloading.
- `npm run build`: Compiles TypeScript and builds the app for production in the `dist/` directory.
- `npm run preview`: Locally previews the production build.

## 📂 Project Structure

```
├── previous context/       # AI prompt references & context docs
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components & modals
│   ├── context/            # React context providers (App state)
│   ├── pages/              # Dashboard pages & views
│   ├── services/           # Mock data and mock API services
│   ├── types/              # TypeScript interfaces and type definitions
│   ├── App.tsx             # Root component & page routing
│   ├── index.css           # Global stylesheet & Tailwind directives
│   └── main.tsx            # Application entry point
├── index.html              # HTML shell
├── package.json            # Dependencies & scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

## 📄 License

Private & Proprietary. All rights reserved.
