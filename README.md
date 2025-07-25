# Wild Code Media V2
> The social network that breaks the code 🚀

Wild Code Media is a modern social network dedicated to developers and digital creatives. This project is a complete modernization of my Project 1 with the Wild Code School, built with a robust React-Express-MySQL architecture as part of Checkpoint 3.

**V1**: https://github.com/sadnxssdlm/wild-code-media

## ✨ Features

- 🔐 **User Authentication** - Register, login, and secure sessions
- 📝 **Post Management** - Create, read, and delete posts with code snippets
- 💪 **Password Strength** - Real-time password validation
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Modern UI** - Beautiful gradients and animations with Framer Motion
- 🔔 **Error Handling** - Global error management with toast notifications

## 🛠️ Tech Stack

### Frontend
- **React** + **TypeScript** - Component-based UI
- **Vite** - Fast build tool
- **Material-UI** - Component library
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing

### Backend
- **Node.js** + **Express** - Server framework
- **TypeScript** - Type safety
- **MySQL** - Database
- **JWT** - Authentication tokens

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MySQL 8+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sadnxssdlm/wild-code-media-v2.git
   cd wild-code-media-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup database**
   ```bash
   cd server && npm run build
   ```

4. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd server && npm start
   
   # Terminal 2 - Frontend  
   cd client && npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
wild-code-media-v2/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
├── server/          # Express backend
│   ├── src/
│   │   ├── modules/       # Feature modules
│   │   ├── middlewares/   # Express middlewares
│   │   └── types/         # TypeScript types
│   └── database/          # Database setup & fixtures
└── docs/            # Documentation
```

## 🤝 Contributing

This is a school project, but feel free to explore the code and suggest improvements!

## 📄 License

This project is for educational purposes as part of Wild Code School training.

---

**Made with ❤️ by [Sadness](https://github.com/sadnxssdlm) at Wild Code School**
