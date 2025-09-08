# Resume Builder

A fullstack Resume Builder app using **Next.js (frontend)**, **NestJS (backend)**, **MongoDB Atlas**, and **Docker Compose**.

---

## 🚀 Tech Stack
- **Frontend:** Next.js + TailwindCSS + React-PDF
- **Backend:** NestJS + Mongoose (MongoDB Atlas)
- **Database:** MongoDB Atlas
- **Deployment:** Docker Compose

---

## 📂 Project Structure
frontend/ → Next.js UI (resume builder + live PDF preview)
backend/ → NestJS API (resumes CRUD, MongoDB)
docker-compose.yml → Orchestrates frontend + backend + database


---

## 🛠️ Setup

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/resume-builder.git
cd resume-builder
```
### 2. Install dependencies
```bash
cd frontend && npm install
cd ../backend && npm install
```

### 3. Run with Docker
```bash
docker-compose up --build
```

## Environment Variables

### Create .env files in frontend/ and backend/. Example:
backend/.env
```bash
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net
PORT=5000
```

frontend/.env
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```