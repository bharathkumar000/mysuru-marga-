# Mysuru Marga - srinivas - Soulful Heritage Explorer

A premium, state-of-the-art web application dedicated to exploring the rich heritage, hidden gems, and local artisans of Mysuru.

![Mysuru Marga](https://img.shields.io/badge/Status-Premium-gold?style=for-the-badge)

## Technology Stack

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />

  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</div>

## Project Structure

The project follows a clean separation of concerns between the client-side experience and the server-side logic.

```text
/
├── client/                 # Frontend (React + Vite)
│   ├── src/                # Soul of the application
│   │   ├── App.jsx         # Unified application engine (Consolidated)
│   │   └── index.css       # Unified design system
│   ├── public/             # Static heritage assets
│   ├── vite.config.js      # Build configuration
│   └── tailwind.config.js  # Theme / Color tokens
│
├── server/                 # Backend (Vercel Serverless)
│   └── api/                # API Endpoints

│
└── package.json            # Root configuration & scripts
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- Supabase Project (for live heritage data)


### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the `client/` directory based on `.env.example`.

### Development

Run the unified development server:
```bash
npm run dev
```

## Features

- **Unified Heritage Engine**: All components and pages are consolidated for lightning-fast performance and easier maintenance.
- **Sovereign Dark Mode**: A custom-crafted dark theme inspired by the royalty of Mysuru.
- **Interactive Heritage Map**: Real-time spatial exploration of monuments and hidden spots.
- **AI Heritage Guide**: Interactive chat interface providing heritage information.
- **Partner Dashboard**: A dedicated interface for local business owners to manage their spots and events.
- **Admin Command Center**: Complete oversight of users, invitations, and system security.

## Security

- **Supabase Auth**: Secure authentication and identity management.
- **Input Sanitization**: Using DOMPurify to protect against XSS in dynamic traveler echoes.

---

*Crafted with soul for the Heritage City of Mysuru.*
