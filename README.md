# RAVELOARIMANANA Lala Zarasoa — One-Page Developer Portfolio

Personal one-page portfolio built in React.js for **RAVELOARIMANANA Lala Zarasoa** (Full-Stack Developer and AI Engineer), structured with a clear Model-View-Controller (MVC) separation and an owner-only content management workspace.

## Features

- **One-Page Editorial Layout**: Smooth section navigation across Home, About, Education & Pathways, Skills & Stack, Certifications, Projects, and Contact.
- **Theme Support**: Light, Dark, and System theme modes with persistent preference and respect for `prefers-reduced-motion`.
- **Interactive Project Showcase**: Filterable projects by status (`In Progress`, `Completed`, `Upcoming`), graceful screenshot placeholders, and an accessible project detail modal.
- **Certifications & PDF Links**: Displays certificate title, issuer, date, optional credential ID, and links/downloads for uploaded PDF files.
- **Owner Content Management**: Authenticated owner workspace for managing profile details, optional portrait, education, learning pathways, categorized skills, certifications, and projects with file type/size validation.
- **Placeholder Discipline**: Unconfirmed personal details, credentials, and URLs are marked as explicit placeholders rather than fabricated.

## Technology Stack

- **Frontend**: React.js, Vite, plain CSS / CSS Modules with design tokens.
- **Admin Architecture**: Owner CRUD workspace and React-Admin dependency ready for backend data-provider integration.
- **Persistence & Security**: Client storage for local preview mode; server-side authentication, role checks, and object storage required for production.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)
- Git

## Installation

```bash
git clone https://github.com/hari-soa/portfolio-frontend.git
cd portfolio-lala-zarasoa
npm install
cp .env.example .env
```

## Scripts

- `npm run dev` — Start the local Vite development server.
- `npm run build` — Build the production bundle.
- `npm run preview` — Preview the production build locally.
- `npm run lint` — Run ESLint across `src`.

## Environment Variables

See `.env.example` for placeholder keys (never commit real secrets):

- `VITE_APP_TITLE` — Browser title for the portfolio application.
- `VITE_API_BASE_URL` — Base URL of the authenticated backend REST API.
- `VITE_AUTH_PROVIDER_URL` — Authentication provider endpoint or issuer URL.
- `VITE_ADMIN_EMAIL_PLACEHOLDER` — Placeholder reference for the owner account.

## Folder Structure (MVC)

```Plaintext
src/
├── config/        # Theme modes, project statuses, storage keys, routes
├── models/        # Initial portfolio schema and placeholder definitions
├── services/      # Storage persistence, file validation, API client
├── controllers/   # Theme and portfolio state controllers (hooks)
├── styles/        # Design tokens, global styles, CSS Modules
├── components/    # Reusable UI components and modals
├── layouts/       # Public layout shell
├── pages/         # One-page public view and owner admin view
├── App.jsx
└── main.jsx
```

## Architecture Overview

- Model (`src/models/`, `src/services/`): Holds the portfolio data structure, file type/size checks, local persistence, and backend API requests.
- Controller (`src/controllers/`): Coordinates theme resolution, project status filtering, modal/admin state, notifications, and CRUD mutations.
- View (`src/pages/`, `src/components/`, `src/layouts/`, `src/styles/`): Renders semantic English UI sections and modular CSS styles without embedding business logic.

## Authentication, Authorization & File Uploads

- Public visitors have read-only access to portfolio sections.
- Client-side guards or UI hiding are not sufficient for production security.
- Connect a backend or trusted auth provider (such as Supabase, Auth0, Firebase Auth, or a custom JWT/session API) that enforces the `owner`/`admin` role on every write endpoint.
- Store uploaded portraits, project screenshots, and certificate PDFs in validated object storage (such as S3, Cloudflare R2, or Supabase Storage) and return stable URLs.

## Deployment

1. Configure production environment variables in your hosting platform (such as Vercel or Render) and deploy your backend API and storage bucket.

2. Run `npm run build` and deploy the generated `dist` output.

3. Verify responsive behavior, theme switching, keyboard navigation, PDF links, and owner-only write protection.

## Owner Admin Usage

1. Click **Owner Sign** In in the navigation bar to open the management drawer.

2. Authenticate with your owner credentials.

3. Switch between **Profile, Education, Skills, Certifications**, and **Projects** tabs to create, edit, upload files, or delete entries with confirmation prompts.

4. Click **Sign Out** when finished.
