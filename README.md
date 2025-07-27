<p align = "center" draggable=”false” ><img src="https://github.com/AI-Maker-Space/LLM-Dev-101/assets/37101144/d1343317-fa2f-41e1-8af1-1dbb18399719" 
     width="200px"
     height="auto"/>
</p>


# 🚀 AI Engineer Challenge

Welcome to the **AI Engineer Challenge** - a full-stack application featuring a modern frontend and a powerful AI-powered backend! This project demonstrates the integration of cutting-edge web technologies with AI capabilities.

## 🏗️ Architecture

This project consists of two main components:

- **Frontend**: A modern Next.js application with TypeScript and Tailwind CSS
- **Backend**: A FastAPI server with OpenAI integration for AI chat functionality

## ✨ Features

### Frontend
- **⚡ Lightning Fast**: Built with Next.js 14 for optimal performance
- **🎨 Modern Design**: Beautiful UI with Tailwind CSS and professional styling
- **🔒 Type Safe**: Full TypeScript support for robust development
- **📱 Responsive**: Works perfectly on all devices
- **💬 AI Chat**: Integrated chat interface with streaming responses
- **🛡️ Secure**: Built with security best practices

### Backend
- **🤖 AI Integration**: OpenAI API integration for intelligent responses
- **📡 Streaming**: Real-time streaming responses for better UX
- **🔧 FastAPI**: Modern, fast web framework for building APIs
- **📚 Auto Documentation**: Interactive API documentation with Swagger
- **🔒 CORS Ready**: Configured for cross-origin requests

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Vercel** - Deployment platform

### Backend
- **FastAPI** - Modern Python web framework
- **OpenAI** - AI language model integration
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 18 or higher)
- **Python** (version 3.8 or higher)
- **npm** (comes with Node.js)
- **pip** (comes with Python)

### Option 1: Run Both Services (Recommended)

1. **Clone and navigate to the project:**
   ```bash
   cd The-AI-Engineer-Challenge
   ```

2. **Start the backend API:**
   ```bash
   ./start-backend.sh
   ```
   The backend will start on `http://localhost:8000`

3. **In a new terminal, start the frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will start on `http://localhost:3000`

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application!

### Option 2: Manual Setup

#### Backend Setup
```bash
cd api
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🎯 Using the AI Chat

1. **Navigate to the Chat page** from the main menu
2. **Click Settings** to enter your OpenAI API key
3. **Start chatting** with the AI assistant!

### Getting an OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste it into the chat settings

## 📝 Available Scripts

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend Scripts
- `python app.py` - Start the FastAPI server
- `./start-backend.sh` - Automated backend startup

## 🌐 API Endpoints

### Chat Endpoint
- **URL**: `POST /api/chat`
- **Request Body**:
  ```json
  {
    "developer_message": "string",
    "user_message": "string", 
    "model": "gpt-4.1-mini",
    "api_key": "your-openai-api-key"
  }
  ```
- **Response**: Streaming text response

### Health Check
- **URL**: `GET /api/health`
- **Response**: `{"status": "ok"}`

## 📚 API Documentation

Once the backend is running, you can access:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🎨 Customization

### Frontend Styling
The application uses Tailwind CSS with a custom color palette:
- Primary colors: Blue gradient (`primary-600`, `primary-700`)
- Secondary colors: Gray scale (`secondary-50` to `secondary-900`)

### Backend Configuration
- CORS is configured to accept requests from any origin
- OpenAI model can be changed in the chat request
- Error handling is implemented for various scenarios

## 🌐 Deployment

### Frontend (Vercel)
1. Connect your repository to Vercel
2. Deploy automatically - Vercel will detect Next.js
3. Add custom domain in Vercel dashboard

### Backend (Vercel)
The backend is configured for Vercel deployment with `vercel.json`

## 📁 Project Structure

```
The-AI-Engineer-Challenge/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # Next.js app directory
│   ├── lib/                 # Utility functions
│   ├── package.json         # Frontend dependencies
│   └── README.md           # Frontend documentation
├── api/                     # FastAPI backend application
│   ├── app.py              # Main FastAPI application
│   ├── requirements.txt    # Python dependencies
│   └── README.md          # Backend documentation
├── start-backend.sh        # Backend startup script
└── README.md              # This file
```

## 🔧 Development

### Adding New Features
- **Frontend**: Create new pages in `frontend/app/`
- **Backend**: Add new endpoints in `api/app.py`

### Environment Variables
- `NEXT_PUBLIC_API_URL`: Backend API URL (defaults to localhost:8000)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the AI Engineer Challenge.

---

**Happy coding! 🎉**

*Built with ❤️ using Next.js, FastAPI, and OpenAI*
