# Fonij React Base Project

A production-ready Vite + React starter template with all modern essentials pre-configured.

## ✨ **What's Included**

✅ **Core Stack**

- Vite + React 19 + TypeScript
- React Router v7 (file-based routing)
- shadcn/ui + Tailwind CSS v4
- Theme Provider (Light/Dark/System)

✅ **Internationalization**

- react-i18next with namespace support
- Language detection + localStorage persistence
- RTL support (Persian/Arabic)
- Multi-language JSON structure

✅ **Production Ready**

- Path aliases (`@/`)
- CSS variables theming
- Mobile-responsive
- Accessible components

## 🚀 **Quick Start**

```bash
# 1. Create new repo from this template
# GitHub: "Use this template" button → New repository

# 2. Clone your new project
git clone https://github.com/YOUR_USERNAME/YOUR_NEW_PROJECT.git
cd YOUR_NEW_PROJECT

# 3. Install dependencies
npm install

# 4. Run dev server
npm run dev
```

📁 Folder Structure

src/
├── routes/ # File-based routing
├── components/ui/ # shadcn components
├── i18n/ # Translation config
├── lib/ # Theme provider + utils
├── locales/ # JSON translation files (en/fa)
└── App.tsx

🌐 Built-in Features

| Feature | Status   | Usage                           |
| ------- | -------- | ------------------------------- |
| Routing | ✅ Ready | Edit src/routes/ files          |
| Theming | ✅ Ready | <ThemeToggle /> component       |
| i18n    | ✅ Ready | useTranslation('namespace')     |
| shadcn  | ✅ Ready | npx shadcn-ui@latest add button |

🔧 Available Commands

npm run dev # Start dev server (localhost:5173)
npm run build # Build for production
npm run lint # Run ESLint
npm run preview # Preview production build

📚 Customization
Add new routes: Create files in src/routes/

Add languages: Add folders in public/locales/

Install shadcn components:

```bash
npx shadcn-ui@latest add button card dialog
```

Toggle theme: Use <ThemeToggle /> anywhere

👥 Perfect For
SaaS dashboards

Marketing sites

Multilingual apps

Enterprise projects

🎯 License
MIT - Use it anywhere, modify freely!

# component structure

| Component        | Location                                         | Why                                 |
| ---------------- | ------------------------------------------------ | ----------------------------------- |
| Navbar           | components/layout/main-navbar.tsx                | Layout component, used across pages |
| LanguageSwitcher | components/shared/language-switcher.tsx          | Reusable across app                 |
| ThemeToggle      | components/ui-custom/mode-toggle.tsx             | Custom shadcn variant               |
| Page-specific    | routes/your-page/\_components/your-component.tsx | Page-only, co-located               |
| Form components  | components/forms/                                | Group by domain                     |

# Component Customization

## Layout

[Navbar](./docs/customized-components/nabbar.md)
[Footer](./docs/customized-components/footer.md)

## Landing

[Hero](./docs/customized-components/hero.md)
