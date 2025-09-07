# 📝 Todo App

A simple and modern **Todo application** built with:

- ⚡ **TypeScript** (for both server & client)
- 🖥️ **React + Vite** (frontend)
- 🎨 **Shadcn UI + TailwindCSS** (UI components & styling)
- 🚀 **Express.js / Node.js / MongoDB** (backend server in TypeScript)
- 📦 **REST API** for managing todos

---

## ✨ Features

- ➕ Add new todos
- ✏️ Edit todos (title, content, priority)
- 🗑️ Delete todos
- 🎯 Set **priority levels** (Low, Medium, High)
- ⏳ Show **relative time** (e.g., _"2 hours ago"_ using Moment.js)
- 🖼️ Clean UI with **Shadcn UI components**
- 🔒 Type-safe code with **TypeScript**

---

## 📂 Project Structure

```bash
├── server/             # Backend (Node + Express + TS)
│   ├── src/
│   │   ├── app.ts      # Express app
│   │   ├── server.ts   # Entry point
│   │   ├── routes/     # API routes
│   │   ├── models/     # Todo model (TypeScript interface)
│   │   └── controllers/
│   └── tsconfig.json
│
├── client/             # Frontend (React + TS + Vite)
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # App pages
│   │   ├── context/    # App context (state management)
│   │   └── types/      # Shared types
│   └── tsconfig.json
│
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Arijit-mondal099/todo-app.git
   cd todo-app
   ```

2. **Install dependencies for both client and server**

   ```bash
   # Install server dependencies
   cd toto-server
   npm install

   # Install client dependencies
   cd ../todo-client
   npm install
   ```

### Development

1. **Start the backend server**

   ```bash
   cd todo-server
   npm run dev
   ```

   Server will run on `http://localhost:4000`

2. **Start the frontend (in a new terminal)**

   ```bash
   cd todo-client
   npm run dev
   ```

   Client will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

---

## 🔧 Available Scripts

### Server (Backend)

```bash
npm run dev          # Start development server with nodemon
npm run build        # Compile TypeScript to JavaScript
npm start            # Start production server
```

### Client (Frontend)

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 🌐 API Endpoints

| Method   | Endpoint         | Description         |
| -------- | ---------------- | ------------------- |
| `GET`    | `/api/todos`     | Get all todos       |
| `POST`   | `/api/todos`     | Create a new todo   |
| `PUT`    | `/api/todos/:id` | Update a todo by ID |
| `DELETE` | `/api/todos/:id` | Delete a todo by ID |
| `POST`   | `/api/users`     | Login an user       |
| `POST`   | `/api/users`     | Register an user    |

### Example API Usage

**Create a new todo:**

```bash
curl -X POST http://localhost:4000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "content": "Milk, bread, eggs",
    "priority": "medium"
  }'
```

**Get all todos:**

```bash
curl http://localhost:4000/api/todos
```

## 🏗️ Tech Stack Details

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Shadcn UI** - Component library
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Moment.js** - Date/time formatting

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development auto-restart
- **MongoDB** - Data base

---

## 🎨 UI Components

This project uses **Shadcn UI** components including:

- `Button` - Interactive buttons
- `Card` - Content containers
- `Input` - Form inputs
- `Select` - Dropdown selectors
- `Dialog` - Modal dialogs
- `Badge` - Priority indicators
- `Separator` - Visual dividers

---

## 📊 Data Model

### Todo Interface

```typescript
interface Todo {
  _id: string;
  title: string;
  content: string;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Add JSDoc comments for functions
- Ensure all tests pass before submitting
- Follow the existing code style

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@Arijit-mondal099](https://github.com/Arijit-mondal099)
- LinkedIn: [arijit-mondal](https://linkedin.com/in/arijit-mondal-211217287)
- Email: arijitm717@gmail.com

---

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the amazing component library
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://react.dev/) team for the excellent documentation
- [Vite](https://vitejs.dev/) for the lightning-fast build tool

---

## 📈 Project Status

**Current Version:** v1.0.0

**Status:** ✅ Active Development

**Last Updated:** September 2025

---

_Happy coding! 🚀_
