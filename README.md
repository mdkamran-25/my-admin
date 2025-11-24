# A23 Admin Panel

A clean, scalable, and professional admin panel built with React, TypeScript, and Vite.

## 🎯 Project Overview

This admin panel is designed for managing a gaming platform with features for:

- Dashboard with real-time statistics
- User management
- Withdrawal request handling
- Game status control
- Play and win statistics tracking

## ✨ Features

- ✅ **TypeScript** - Full type safety
- ✅ **Modern React** - Hooks and functional components
- ✅ **Clean Architecture** - Organized folder structure
- ✅ **Reusable Components** - DRY principles
- ✅ **Custom Hooks** - Separated business logic
- ✅ **Service Layer** - Centralized API management
- ✅ **Responsive Design** - Mobile-friendly UI
- ✅ **Professional UI** - Modern gradient designs

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   └── StatCard/     # Statistics display card
│   ├── layout/           # Layout components
│   │   └── Header/       # App header with title and refresh
│   └── dashboard/        # Dashboard-specific components
│       ├── GameStatsCard/    # Play/Win statistics card
│       └── GameControl/      # Game status and date control
├── pages/
│   └── Dashboard/        # Main dashboard page
├── services/
│   └── api.ts           # API service layer
├── hooks/
│   └── useDashboard.ts  # Dashboard data management hook
├── utils/
│   └── formatters.ts    # Formatting utilities
├── types/
│   └── index.ts         # TypeScript type definitions
├── constants/
│   └── index.ts         # App constants
└── assets/              # Static files
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mdkamran-25/my-admin.git

# Navigate to project directory
cd my-admin

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

## 🏗️ Architecture Principles

### 1. Component-Based Architecture

Each component is self-contained with its own:

- TypeScript file (`.tsx`)
- Styles (`.css`)
- Index file for clean imports

### 2. Separation of Concerns

- **Components**: Pure UI and presentation
- **Hooks**: State and data fetching logic
- **Services**: API communication
- **Utils**: Helper functions
- **Types**: TypeScript definitions

### 3. Type Safety

- All components have TypeScript interfaces
- Proper typing for props, state, and API responses
- Type-only imports for better optimization

### 4. Clean Code Standards

- Meaningful and descriptive names
- Single Responsibility Principle
- DRY (Don't Repeat Yourself)
- Proper code organization
- Consistent naming conventions

## 🎨 Design System

### Color Scheme

- **Primary**: Gradient blues and purples
- **Success**: Green gradients
- **Warning**: Orange/red gradients
- **Neutral**: Gray scales

### Component Guidelines

- Use StatCard for displaying key metrics
- GameStatsCard for detailed statistics
- Consistent spacing and border radius
- Hover effects for interactivity

## 📝 Code Quality

### Naming Conventions

- **Components**: PascalCase (`StatCard`)
- **Functions**: camelCase (`formatCurrency`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types**: PascalCase (`DashboardStats`)

### Best Practices

- ✅ Functional components with hooks
- ✅ Props destructuring
- ✅ Optional chaining for safe access
- ✅ Loading and error states
- ✅ Responsive design
- ✅ Accessibility attributes

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🚀 Next Steps

Ready to extend? Here's how:

1. **Add New Pages**: Create in `src/pages/`
2. **Add Components**: Create in appropriate `src/components/` subfolder
3. **Add API Endpoints**: Update `src/services/api.ts`
4. **Add Types**: Define in `src/types/index.ts`
5. **Add Routes**: Use React Router (to be added)

## 📚 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **CSS3** - Styling

## 👨‍💻 Developer Notes

### Code Review Checklist

- ✅ Clear and meaningful variable names
- ✅ Proper TypeScript typing
- ✅ Component separation and reusability
- ✅ Clean folder structure
- ✅ No code duplication
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive design

### Scalability Considerations

- Easy to add new features
- Modular component structure
- Centralized API management
- Type-safe data flow
- Consistent patterns throughout

## 📄 License

This project is private and proprietary.

## 👥 Author

Mohammad Kamran - [@mdkamran-25](https://github.com/mdkamran-25)

---

**Note**: This project follows industry best practices and is designed to be easily understandable, maintainable, and scalable.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
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

```
