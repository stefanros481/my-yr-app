# Car Trip Weather App

A React application for planning car trips with weather forecasts along the route. Users can input starting and destination points, view routes on an interactive map, and see weather conditions along their journey.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/stefanros481/my-yr-app.git
cd my-yr-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (to be added)
- **UI Components**: shadcn/ui (to be added)
- **Maps**: Google Maps API or Mapbox (to be added)
- **Weather**: yr.no API (to be added)

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── map/             # Map-related components
│   ├── trip/            # Trip planning components
│   ├── weather/         # Weather display components
│   └── layout/          # Layout components
├── hooks/               # Custom React hooks
├── services/
│   ├── api/            # API integration services
│   └── utils/          # Utility functions
├── types/              # TypeScript type definitions
└── store/              # State management
```

## 🎯 Development Status

Currently in **Phase 1: Basic Setup**

See [Milestone Plan](./docs/milestone-plan.md) for detailed progress tracking.

## 📚 Documentation

- [App Specification](./docs/app-specification.md) - Complete technical specification
- [Milestone Plan](./docs/milestone-plan.md) - Development roadmap and progress tracking

## 🤝 Contributing

This is a personal project, but contributions are welcome! Please read the specification documents before contributing.

## 📄 License

This project is private and not currently licensed for public use.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
