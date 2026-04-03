# Content Manager

A full-stack web app to manage and preview dynamic content blocks — built with **Node.js + Express** on the backend and vanilla **JavaScript** on the frontend.

## Features

- Rich text editor (Quill.js) for paragraph input
- HEX color picker with live sync
- Background image URL with server-side accessibility check
- Client-side + server-side validation with inline error messages
- Live content preview that updates on successful submit
- Responsive two-column layout

## Tech Stack

- **Frontend:** HTML, CSS, Vanilla JS, Quill.js
- **Backend:** Node.js, Express, CORS

---

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/SachinGupta0206/Content-manager.git
cd Content-manager
```

---

### 2. Install Dependencies

```bash
cd backend
npm install
```

---

### 3. Run the Server

```bash
npm start
```

Server will start at: `http://localhost:3001`

---

### 4. Open the App

Open your browser and go to:

```
http://localhost:3001
```

---

### 5. Using the App

1. Enter a **Heading**
2. Write a **Paragraph** using the rich text editor
3. Paste a valid **Background Image URL** (must start with `https://`)
4. Pick a **Text Color** using the color picker or type a HEX code (e.g. `#ffffff`)
5. Click **Submit**
6. The **Preview** on the right will update with your content

---

## Deployment (Vercel)

This project is deployed on Vercel with a `vercel.json` config that handles both the static frontend and the Node.js API.

Live URL: https://content-manager-theta.vercel.app/

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

## Project Structure

```
├── backend/
│   ├── server.js        # Express server + API
│   └── package.json
├── frontend/
│   ├── index.html       # Main UI
│   ├── app.js           # Form logic + API calls
│   └── style.css        # Styling
├── vercel.json          # Vercel deployment config
└── README.md
```
