# LOOP – AI Customer Feedback Intelligence Platform

An AI-powered customer feedback management system built with **Next.js**, **TypeScript**, **Prisma**, **PostgreSQL**, **NextAuth**, and **OpenAI**.

The platform enables businesses to collect customer feedback, analyse sentiment using AI, visualise insights through dashboards and charts, and manage feedback efficiently.

---

## 🚀 Live Demo

🔗 https://loop-ai-feedback-platform-ten.vercel.app

---

## 📸 Screenshots

> Add screenshots of your application here.

Suggested screenshots:

- Home Page
- Login Page
- Dashboard
- Feedback Form
- Analytics Page
- Reports Page

---

## ✨ Features

### Authentication

- User Registration
- Secure Login
- Logout
- Password hashing using bcrypt
- Protected user sessions with NextAuth

### Dashboard

- Total Feedback
- Positive Feedback
- Neutral Feedback
- Negative Feedback
- Feedback statistics cards
- Interactive charts

### Feedback Management

- Add Feedback
- Edit Feedback
- Delete Feedback
- Search Feedback
- Filter by Sentiment

### AI Integration

- AI-powered Sentiment Analysis
- Automatic classification into:
  - Positive
  - Neutral
  - Negative

### Reports

- View reports
- Export report functionality

### Settings

- User settings page
- Profile management interface

---

## 🛠 Tech Stack

### Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes
- Prisma ORM
- PostgreSQL (Neon)

### Authentication

- NextAuth.js
- bcrypt

### AI

- OpenAI API

### Deployment

- Vercel

---

## 📂 Project Structure

```
app/
components/
lib/
prisma/
public/

README.md
package.json
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/mubashirasheikh-24/loop-ai-feedback-platform.git
```

Go inside the project

```bash
cd loop-ai-feedback-platform
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## 🔑 Environment Variables

Create a `.env` file.

```env
DATABASE_URL=

NEXTAUTH_SECRET=

NEXTAUTH_URL=

OPENAI_API_KEY=
```

---

## 📊 Database

Database is managed using:

- Prisma ORM
- PostgreSQL (Neon)

Run migrations

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

---

## 📈 Future Improvements

- Email notifications
- Role-based access control
- Advanced analytics
- CSV/PDF exports
- Dark mode
- AI-generated business insights

---

## 👩‍💻 Author

**Mubashira Sheikh**

Software Engineer

LinkedIn:
(https://www.linkedin.com/in/mubashira-sheikh-413423205/)

GitHub:
(https://github.com/mubashirasheikh-24#-lets-connect)

---

## 📄 License

This project is developed for educational and internship purposes.