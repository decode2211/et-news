# 📰 AI-Native News App (Monorepo)

An autonomous, end-to-end news platform featuring a **Next.js** frontend and a **FastAPI** backend. This project is designed for high-performance news ingestion, vector storage, and an AI-driven user experience.

---

## 🏗️ Project Structure

The project follows a **flat monorepo** architecture to keep the frontend and backend concerns separate while allowing unified management.

```text
/
├── frontend/             # Next.js 14 (App Router, Tailwind, TypeScript)
│   ├── app/              # Main application pages
│   ├── components/       # Reusable UI components
│   ├── services/         # API fetch logic
│   └── package.json      # Frontend-specific dependencies
├── backend/              # FastAPI (Python 3.10+, Scraper, ChromaDB)
│   ├── app/
│   │   ├── main.py       # API Entry point & Lifespan manager
│   │   └── api/          # Route definitions
│   ├── requirements.txt  # Python dependencies
│   └── venv/             # Local virtual environment (ignored)
├── package.json          # Root scripts for monorepo management
└── .gitignore            # Unified rules for Node & Python environments
🚀 Quick Start (Windows)
1. Prerequisites
Node.js (v18 or higher)

Python (3.10 or higher)

Git.
Initial Installation
From the root directory (E:\ai-news), install the unified dependencies:
Install Node Dependencies:
npm run install:all
Set up Python Virtual Environment:
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
cd ..
💻 Development Workflow
You can run the entire stack with a single command. Note: Ensure your virtual environment is active in your terminal before starting.
PowerShell
# 1. Activate venv
.\backend\venv\Scripts\activate

# 2. Launch both servers concurrently
npm run dev
🔗 Access PointsFrontend UI: http://localhost:3000
Backend API: http://localhost:8000
Interactive API Docs: http://localhost:8000/docs
🤖 Features
Autonomous Scraper: Periodically scrapes Economic Times (ET) news every 2 hours using background tasks and updates ChromaDB.
Vector Database: Integrates ChromaDB for RAG-based search and high-performance retrieval.
CORS Ready: Pre-configured middleware in the FastAPI backend for seamless browser-to-server communication.
Modern UI: Built with Next.js 14, Tailwind CSS, and TypeScript for a fluid, responsive experience.
🛠️ Root Scripts Reference
Command,Description
npm run dev,Starts Frontend (3000) and Backend (8000) concurrently with color-coded logs.
npm run frontend,Starts only the Next.js development server.
npm run backend,Starts only the FastAPI server via Uvicorn.
npm run install:all,Installs dependencies for both the root and the frontend folder.
