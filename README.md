# Exam Platform

## Overview

This project is an exam platform where users can register, log in, take tests, and check their scores. The platform includes features for security and data management, utilizing modern web technologies.

## Features

- **User Registration and Login**: Users can create an account and log in to access the platform.
- **Test Taking**: Users can take exams and submit their answers directly through the platform.
- **Score Notification**: Scores are sent to the registered email address and are also viewable on the platform.
- **Webcam Security**: Integrated webcam functionality to ensure secure test-taking.
- **Password Encryption**: Passwords are encrypted using secure hashing techniques to protect user data.
- **JSON Web Tokens (JWT)**: JWT is used for secure authentication and session management.
- **Express Backend**: The server is built with Express for handling requests and managing server-side logic.
- **MongoDB Storage**: Data is stored in MongoDB for scalability and security, including user profiles and exam details.
- **Middleware**: Implemented middleware for efficient data retrieval from the server.

## Email Sending

The platform uses [EmailJS](https://www.emailjs.com/) for sending emails to users. EmailJS provides a simple way to send emails directly from client-side JavaScript without needing a backend server for this functionality.

- **Email Template**
  Here is a visual representation of the email template used in the project:
  ![Email Template](assets/Email_template.png)

- \*\* Screenshort of Email Received:
  ![Email Screenshot](assets/Email_screenshort.png)

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/12106457/cipher-schools-assignment.git
   ```
2. **Navigate to the project directory::**
   cd cipher-schools-assignment
3. **Go to client file**
   cd client
4. **Install dependencies**
   npm install
5. **Now take new terminal**
   cd server
6. **npm install**
   nodemon index
