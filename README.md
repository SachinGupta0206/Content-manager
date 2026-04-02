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

## Getting Started

### Prerequisites

- Node.js v18+

### Installation

```bash
cd backend
npm install
```

### Run

```bash
npm start
```

Then open [http://localhost:3001](http://localhost:3001) in your browser.

## API

### `POST /api/content`

**Request body:**

```json
{
  "heading": "My Heading",
  "paragraph": "<p>Some text</p>",
  "backgroundImage": "https://example.com/image.jpg",
  "textColor": "#ffffff"
}
```

**Success response (`200`):**

```json
{
  "success": true,
  "message": "Content submitted successfully.",
  "data": { ... }
}
```

**Validation error response (`400`):**

```json
{
  "success": false,
  "errors": {
    "heading": "Heading is required."
  }
}
```

## Project Structure

```
├── backend/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── index.html
    ├── app.js
    └── style.css
```
