# Contest Game

This repository contains the source code for a **Contest Game** application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. The game involves a series of questions, and players can submit their scores and time for a leaderboard.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The **Contest Game** is a full-stack web application where users participate in a timed question game. Their performance (score and time) is stored in a database for future retrieval. 

The game requires users to register or log in to access the contest. After completing the game, results are sent to the backend API, and scores are saved in the database. Users can view their score history, leaderboard, and other contest-related details.

## Features

- User registration and authentication (JWT-based)
- Timed question-based game
- Save game score and time to the database
- Leaderboard with top scores
- Responsive design and mobile-friendly UI
- Secure contest pages (requires login)
- Auto logout after 1 hour of inactivity or on browser close

## Tech Stack

**Frontend**:
- React.js
- Styled Components
- HTML5/CSS3

**Backend**:
- Node.js
- Express.js
- MongoDB (Atlas)

**Other Tools**:
- JWT for authentication
- Axios for API requests
- MongoDB for database management
- Git for version control
- VS Code for development

## Installation

Follow these steps to run the project locally:

1. Clone this repository:
    ```bash
    git clone https://github.com/<your-username>/contest-game.git
    ```

2. Navigate to the project directory:
    ```bash
    cd contest-game
    ```

3. Install dependencies for both frontend and backend:

    **For the backend**:
    ```bash
    cd server
    npm install
    ```

    **For the frontend**:
    ```bash
    cd ../client
    npm install
    ```

4. Set up environment variables:
   - Create a `.env` file in the backend directory and add the following:
     ```bash
     PORT=5000
     MONGO_URI=<Your MongoDB connection string>
     JWT_SECRET=<Your JWT secret>
     ```

5. Run the development servers:

    **Backend**:
    ```bash
    cd server
    npm start
    ```

    **Frontend**:
    ```bash
    cd ../client
    npm start
    ```

6. Open your browser and go to:
    ```
    http://localhost:3000
    ```

## Usage

- Register or log in with an existing account.
- Access the contest page.
- Start the game and answer the questions.
- Once finished, your score and time will be automatically submitted.
- Check your score in the leaderboard.

## API Endpoints

### Authentication Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Log in with existing credentials

### Game Routes
- `POST /api/game/submit` - Submit score and time after completing the game
- `GET /api/game/leaderboard` - Get the leaderboard of top scores

### User Routes
- `GET /api/users/profile` - Get logged-in user's data

## Contributing

Contributions are welcome! Feel free to open a pull request or submit an issue.

## License

This project is licensed under the MIT License.
