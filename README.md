# ✈️ AviationLines

**AviationLines** is an aviation-themed web application built with modern frontend and backend technologies. The project aims to combine web development with aviation by providing a foundation for an interactive aviation platform.

The application is currently under active development, with plans to expand its functionality, improve the user experience, and introduce new aviation-related features.

## 🚀 Overview

AviationLines is designed to provide a modern and responsive web experience with a focus on aviation, user authentication, and future scalability.

The project serves as both a practical full-stack development project and an opportunity to explore software engineering concepts through a real-world aviation application.

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Security
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- Email verification
- Environment variables for configuration

## ✨ Features

- **User Authentication** — Registration and login functionality.
- **Email Verification** — Account verification workflow.
- **Responsive Design** — An interface designed to adapt to different screen sizes.
- **Full-Stack Architecture** — Separate frontend and backend components.
- **REST API** — Backend endpoints for communication between the client and server.
- **Aviation-Focused Design** — An interface inspired by the aviation industry.
- **Scalable Structure** — A foundation for future features and improvements.

## 📂 Project Structure

```text
AviationLines/
├── src/                  # Frontend source code
├── backend-part/         # Backend application
├── img/                  # Images and visual assets
├── index.html            # Main HTML entry point
├── vite.config.ts        # Vite configuration
├── package.json          # Project scripts and dependencies
├── README.md             # Project documentation
└── ...
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- MongoDB or a MongoDB Atlas connection

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/MaximNikolaevv/AviationLines.git
```

**2. Navigate to the project directory**

```bash
cd AviationLines
```

**3. Install the dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create the appropriate `.env` file for the backend and configure the required environment variables, such as your MongoDB connection string, JWT secret, and email credentials.

Never commit your `.env` files or expose private credentials in the repository.

**5. Start the development server**

```bash
npm run dev
```

If the backend has its own `package.json`, install its dependencies and start it separately using the scripts defined in `backend-part/package.json`.

## 🔐 Security

Security is an important part of the application's development.

- Passwords are hashed using bcrypt.
- JWT is used for authentication.
- Email verification helps establish account ownership.
- Environment variables are used to manage sensitive configuration.
- Authentication and authorization are intended to be handled on the backend.

## 🗺️ Roadmap

Planned areas of development include:

- [ ] Improve the user interface and overall user experience.
- [ ] Expand aviation-related functionality.
- [ ] Develop additional features for registered users.
- [ ] Improve API structure and backend architecture.
- [ ] Strengthen authentication and application security.
- [ ] Optimize performance and responsiveness.
- [ ] Explore mobile application development.

## 🎯 Project Goals

AviationLines is an ongoing project focused on combining aviation interests with practical software development.

The long-term goal is to build a more complete aviation platform while continuing to improve code quality, maintainability, scalability, and technical skills.
