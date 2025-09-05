# To Do Web Application Frontend

Built with React.js + Vite + Typescript + Tailwind CSS. This project is connected to node js backend application.

## Features

- 🔐 **Authentication & Authorization**
- 📝 **To-Do Management** - CRUD operations for tasks


## Tech Stack

- **Framework**: React.js
- **Language**: TypeScript
- **Build Tool**: Vite

## Prerequisites

- Node.js (v14 or higher)
- Tailwind CSS v4.x.xx
- npm
- Vite: v7.x
- React: v19.x
- Tailwind CSS: v4.x
- TypeScript: v5.x

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd to-do-fe
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with the following variables: (or your configured PORT for backend).


```env
VITE_API_URL=http://localhost:3000/api
```


## Scripts

- `npm run dev` - Start development server with ts-node

## Unit Test

- `npm test DashboardPage.crud` - Run tests to check CRUD operations work properly
  

---

## 📖 Project Story

### 1. The Problem
User want to manage daily tasks easily in a simple and minimal way 

### 2. The Goal
Build a **lightweight To-Do app** where users can:
- Create an account and securely log in  
- Manage tasks with basic CRUD (Create, Read, Update, Delete) operations
- Mark tasks as completed

### 3. The Solution
Designed a **full-stack To-Do application**:
- **Frontend**: React (with Vite) + Tailwind CSS + DaisyUI for fast and responsive UI  
- **Backend**: Node.js + Express.js for RESTful APIs and authentication  
- **Auth**: User registration and login functionality to protect tasks per user  
 

---




