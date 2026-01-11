# Quizzzy: AI-Powered Quiz App

An interactive quiz application built with React that leverages AI to generate dynamic questions and provide explanations.

## Features

*   **Dynamic Question Generation**: Never run out of content. Questions are generated on-the-fly using the Gemini API.
*   **Interactive Interface**: Clean and responsive UI for a smooth user experience.
*   **Gamification**: Visual rewards (confetti) for successful completions.
*   **Fast Performance**: Optimized build and development experience using Vite.

## Tech Stack & Libraries

This project uses a modern stack to ensure performance and maintainability:

### Core Framework
*   **React**: The library for web and native user interfaces. Used here to create reusable components and manage the state of the quiz (current question, score, user answers).
*   **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects. It is used for its instant server start and lightning-fast Hot Module Replacement (HMR).

### AI Integration
*   **@google/generative-ai**: The official Google AI SDK for JavaScript. This is the core engine of the app, allowing us to fetch generated quiz data (questions, options, and correct answers) directly from Google's Gemini models.

### UI & Effects
*   **canvas-confetti**: A lightweight library to display confetti. It is used to create a celebratory effect when the user completes a quiz or achieves a high score, enhancing the user experience.

## Getting Started

### Prerequisites

*   Node.js installed.
*   A Google Gemini API Key.

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd quiz-app
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```
