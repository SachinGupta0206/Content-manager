# Content Manager

A full-stack web app to manage and preview dynamic content blocks.

## Tech Stack

- **Frontend:** React 19, Vite, Quill.js
- **Backend:** Node.js, Express.js, CORS

---

## Project Structure

```
├── backend/
│   ├── server.js        # Express server + API
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContentForm.jsx
│   │   │   └── Preview.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── vercel.json
└── README.md
```

---

## Features

- Rich text editor (Quill.js) for paragraph input
- HEX color picker with live sync
- Background image URL with server-side accessibility check
- Client-side + server-side validation with inline error messages
- Live content preview updates on successful submit
- Responsive two-column layout

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/SachinGupta0206/Content-manager.git
cd Content-manager
```

---

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

### 4. Run the App

Backend (Terminal 1):

```bash
cd backend
npm start
```

Frontend (Terminal 2):

```bash
cd frontend
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`

---

## API Reference

### `POST /api/content`

**Request Body:**

```json
{
  "heading": "My Heading",
  "paragraph": "<p>Some text</p>",
  "backgroundImage": "https://example.com/image.jpg",
  "textColor": "#ffffff"
}
```

**Success `200`:**

```json
{
  "success": true,
  "message": "Content submitted successfully.",
  "data": { ... }
}
```

**Validation Error `400`:**

```json
{
  "success": false,
  "errors": {
    "heading": "Heading is required."
  }
}
```

---

## Deployment

Deployed on Vercel using `vercel.json` config for both static frontend and Node.js API.

Live URL: https://content-manager-theta.vercel.app/
