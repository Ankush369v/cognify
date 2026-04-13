# ⚡ Cognify Frontend – Student Dashboard

> Modern React application delivering a premium learning experience with AI-powered tools and interactive data visualizations.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📖 Overview

The Cognify frontend is a cutting-edge React application built as part of an Academic PBL project (2026). It prioritizes performance, aesthetics, and user experience, featuring a sophisticated Bento Box design system, premium animations, and intelligent data visualizations to provide students with an immersive, high-fidelity learning environment.

---

## ✨ Key Features

### 🎨 Design Excellence
- **Bento Box Layouts**: Modern card-based interfaces inspired by Apple's design language
- **Dark Mode First**: Sleek, eye-friendly dark theme with vibrant accents
- **Glassmorphism**: Frosted glass effects for depth and premium feel
- **Micro-Animations**: Framer Motion-powered transitions for delightful interactions
- **Responsive Design**: Flawless experience across desktop, tablet, and mobile

### 🎓 Learning Tools
- **MCQ Generator**: Create and practice multiple-choice questions with instant feedback
- **Flashcard Viewer**: Interactive flip cards with spaced repetition support

- **AI Summaries**: Expandable summary cards with copy-to-clipboard functionality
- **Code Analyzer**: Syntax-highlighted code review with AI insights

### 📊 Data Visualization
- **Exploratory Data Analysis (EDA)**: Fully optimized focus on extracting statistical insight from datasets
- **Interactive Charts**: Recharts-powered visualizations (bar, line, pie, scatter)
- **Live Data Exploration**: Comprehensive data snap-shotting and hover interactions
- **Export Capabilities**: Download charts and data reports
- **AI Insights**: Natural language explanations of patterns, outliers, and trends

### 🔐 User Experience
- **Secure Authentication**: JWT-based login with protected routes
- **Personal Library**: Organized content history with filtering and search
- **Profile Management**: Customizable user settings and preferences
- **Real-Time Feedback**: Loading states, progress indicators, and error handling
- **Keyboard Shortcuts**: Power user features for efficiency

---

## 🏗️ Project Structure

```
frontend/
├── public/                 # Static assets
│   └── assets/             # Images, icons, etc.
│
├── src/
│   ├── api/                # API configuration
│   │   └── axios.js        # Axios instance with interceptors
│   │
│   ├── components/         # Reusable components
│   │   ├── layout/         # Layout components
│   │   │   ├── Navbar.jsx      # Navigation bar
│   │   │   └── Footer.jsx      # Page footer
│   │   ├── dashboard/      # Dashboard components
│   │   │   ├── Library.jsx     # Content library
│   │   │   ├── Results.jsx     # Analysis results
│   │   │   └── Profile.jsx     # User profile
│   │   └── forms/          # Form components
│   │       ├── DataVisualizeForm.jsx
│   │       ├── MCQForm.jsx
│   │       └── ...
│   │
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   └── Models.jsx
│   │
│   ├── constants/          # Application constants
│   │   └── models.js       # AI model configurations
│   │
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
│
├── .eslintrc.cjs           # ESLint configuration
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── package.json            # Project dependencies
```

---

## 🛠️ Tech Stack

### Core Framework
- **React 19**: Latest React with concurrent features
- **React Router Dom 7**: Client-side routing with data loading
- **Vite**: Next-generation frontend tooling (10x faster than CRA)

### Styling
- **Tailwind CSS 3**: Utility-first CSS framework
- **PostCSS**: CSS processing and optimization
- **Custom Design System**: Consistent colors, spacing, and typography

### UI Libraries
- **Framer Motion**: Production-ready animation library
- **Lucide React**: Beautiful, consistent icon set (1000+ icons)
- **Recharts**: Composable charting library built on D3

### State & Data
- **React Hooks**: useState, useEffect, useContext, useRef
- **Axios**: Promise-based HTTP client with interceptors
- **LocalStorage**: Client-side persistence for auth tokens

### Development Tools
- **ESLint**: Code linting and quality enforcement
- **Prettier**: Code formatting (recommended)
- **Vite HMR**: Hot Module Replacement for instant feedback

---

## ⚙️ Environment Configuration

Create a `.env` file in the frontend root (optional, for overrides):

```env
# API Endpoint
VITE_API_URL=http://localhost:5050

# Feature Flags (optional)
VITE_ENABLE_ANALYTICS=false
VITE_DEBUG_MODE=true
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher (or yarn/pnpm)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

Serves the production build locally for testing.

---

## 🔗 Backend Integration

The frontend communicates with the backend API through a configured Axios instance located at `src/api/axios.js`.

### Configuration
```javascript
// src/api/axios.js
const API = axios.create({
  baseURL: 'http://localhost:5050',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### Authentication Flow
1. User logs in via `/login` page
2. JWT token received and stored in `localStorage`
3. Axios interceptor adds token to all requests:
   ```javascript
   Authorization: Bearer <token>
   ```
4. Protected routes check for token before rendering
5. Invalid/expired tokens redirect to login

### API Endpoints Used
- **Auth**: `/signup`, `/login`, `/logout`
- **Content**: `/user/generate/*` (mcq, flashcards, summary, etc.)
- **Dashboard**: `/dashboard`, `/dashboard/profile`, `/dashboard/delete/*`

---

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--indigo-500: #6366f1
--purple-600: #9333ea
--slate-950: #020617

/* Gradients */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
```

### Typography
- **Font**: Inter, Outfit (Google Fonts)
- **Headings**: 700 weight, tight tracking
- **Body**: 400-500 weight, relaxed line-height

### Spacing System
- Uses Tailwind's 4px base scale (0.5, 1, 2, 4, 8, 16, etc.)
- Consistent padding/margin across components

### Components
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Gradient backgrounds, loading states, disabled states
- **Inputs**: Focus rings, validation states, error messages
- **Modals**: Backdrop blur, smooth animations

---

## 📱 Responsive Breakpoints

```javascript
// Tailwind breakpoints
sm: '640px'   // Mobile landscape
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
2xl: '1536px' // Ultra-wide
```

---

## 🧪 Available Scripts

```json
{
  "dev": "vite",                    // Start dev server
  "build": "vite build",            // Build for production
  "preview": "vite preview",        // Preview production build
  "lint": "eslint . --ext js,jsx"   // Run ESLint
}
```

---

## 🚀 Performance Optimizations

### Code Splitting
- Automatic route-based code splitting via Vite
- Lazy loading for heavy components
- Dynamic imports for modals and dialogs

### Asset Optimization
- Image compression and lazy loading
- Icon tree-shaking with Lucide
- CSS purging via Tailwind (removes unused styles)

### Bundle Size
- Production builds are minified and optimized
- Typical bundle size: ~200-300 KB (gzipped)

### Caching Strategy
- Vite generates hashed filenames for cache busting
- Service workers can be added for offline support

---

## 🎯 Key Components Guide

### Navbar (`components/layout/Navbar.jsx`)
- Responsive navigation with mobile menu
- Gradient logo with animations
- Authentication state-aware links
- User profile dropdown

### DataVisualizeForm (`components/forms/DataVisualizeForm.jsx`)
- Multi-step file upload wizard
- Real-time validation
- Progress indicators
- Error handling with retry logic

### Results (`components/dashboard/Results.jsx`)
- Dynamic chart rendering based on type
- Recharts integration for all visualizations
- Expandable insight cards
- Export functionality

### Library (`components/dashboard/Library.jsx`)
- Content filtering (All, MCQ, Flashcards, etc.)
- Search functionality
- Delete confirmations
- Empty state illustrations

---

## 🔐 Authentication & Protected Routes

### Route Protection
```javascript
// Example: Protected Dashboard Route
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### Token Management
- Stored in `localStorage` as `user` object
- Auto-refresh on app reload
- Cleared on logout or token expiration

---

## 🐛 Debugging

### Development Tools
1. **React DevTools**: Inspect component tree and state
2. **Network Tab**: Monitor API calls and responses
3. **Console Logs**: Detailed error messages in dev mode

### Common Issues

**Backend Connection Failed**:
- Ensure backend is running on port 5050
- Check CORS configuration in backend
- Verify API endpoint in axios.js

**Authentication Errors**:
- Clear localStorage and try logging in again
- Check token format in Network tab
- Verify JWT_SECRET matches backend

**Build Errors**:
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear Vite cache: `rm -rf node_modules/.vite`

---

## 🎨 Customization Guide

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color'
    }
  }
}
```

### Add New Routes
1. Create component in `src/pages/`
2. Add route in `App.jsx`
3. Update Navbar links if needed

### Custom Fonts
1. Import in `index.css`:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=YourFont');
   ```
2. Update Tailwind config:
   ```javascript
   fontFamily: {
     sans: ['YourFont', 'sans-serif']
   }
   ```

---

## 🚢 Deployment

### Build Process
```bash
npm run build
# Creates optimized build in /dist
```

### Recommended Platforms
- **Vercel**: Zero-config deployment, automatic HTTPS
- **Netlify**: Build optimization, form handling, redirects
- **GitHub Pages**: Free static hosting
- **Cloudflare Pages**: Fast global CDN

### Environment Variables
Set `VITE_API_URL` to your production backend URL in deployment settings.

### Pre-Deployment Checklist
- [ ] Update API endpoint to production URL
- [ ] Test build locally with `npm run preview`
- [ ] Verify all routes work correctly
- [ ] Check mobile responsiveness
- [ ] Ensure all assets load properly
- [ ] Configure redirects for SPA routing
- [ ] Set up analytics (optional)

---

## 📊 Bundle Analysis

Analyze bundle size:
```bash
npm run build -- --mode analyze
```

View the generated report to identify large dependencies.

---

## 🤝 Contributing

When contributing to the frontend:
- Follow React best practices and hooks patterns
- Use Tailwind classes instead of custom CSS
- Add PropTypes for component props (optional)
- Write descriptive component names
- Keep components under 300 lines
- Extract reusable logic into custom hooks

---

## 📄 License

Formal Final Year PBL Project (2026) by **Ankush Verma** (Lead Developer).
Affiliation: **Manipal University Jaipur (MUJ)**.
Project Guide: **Dr. Tapan Kumar Dey**.

---

## 🆘 Support

For frontend-specific issues:
- Check browser console for errors
- Review component tree in React DevTools
- Verify API responses in Network tab
- Refer to [backend README](../backend/README.md) for API issues

---

**Built with React + Vite + Tailwind CSS + ❤️**
