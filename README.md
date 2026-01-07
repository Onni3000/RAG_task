# RAG Demo Application

A simple frontend application for interacting with a RAG API. Upload files, manage them, and ask questions based on the uploaded content.

## Features

- **File Upload** — Upload `.txt` and `.pdf` files to the RAG system
- **File Management** — View the list of uploaded files and delete uploaded files
- **Chat Interface** — Ask questions and get answers based on your uploaded files
- **Flexible Configuration** — Use environment variables or manually enter API credentials

## Prerequisites

- Node.js
- npm
- Access to a RAG API endpoint

## Setup

### 1. Clone and Install

```bash
cd demo
npm install
```

### 2. Configure Environment Variables (Optional)

Create a `.env.local` file in the `demo` directory:

```env
BASE_URL=https://
API_KEY=your-api-key-here
```

> **Note:** You can also enter these values directly in the UI, which will override the environment variables.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Setting API Credentials

You have two options:

1. **Environment Variables** — Set `BASE_URL` and `API_KEY` in `.env.local`
2. **Manual Input** — Enter values in the input fields at the top of the page

Manual input takes priority over environment variables.

### Uploading Files

1. Click **Browse** to select a file (`.txt` or `.pdf`)
2. Click **Upload** to send the file to the RAG system

### Managing Files

1. Click **Fetch Files** to load the list of uploaded files
2. Click **Delete** on any file to remove it

### Asking Questions

1. Type your question in the chat input
2. Click **Send** or press Enter
3. The system will respond based on your uploaded files

## Project Structure

```
demo/
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   ├── chat.ts        # Chat server action
│   │   │   └── files.ts       # File management server actions
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Main page component
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── chat.tsx           # Chat interface
│   │   ├── delete-dialog.tsx  # Delete confirmation dialog
│   │   ├── file-list.tsx      # File list display
│   │   └── file-upload.tsx    # File upload controls
│   └── lib/
│       └── utils.ts           # Utility functions
├── .env.local                 # Environment variables (create this)
├── package.json
└── README.md
```
