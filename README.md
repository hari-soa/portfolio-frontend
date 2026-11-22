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
git clone <repository-url>
cd portfolio-lala-zarasoa
npm install
cp .env.example .env
```
