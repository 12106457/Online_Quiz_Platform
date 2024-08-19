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
  
  <img src="https://github.com/user-attachments/assets/c116d378-e2f6-46ba-b28b-d99d63fea404" alt="Screenshot 2024-08-19 224603" width="600" height="auto">



- Screenshort of Email Received:
  
  <img src="https://github.com/user-attachments/assets/2446f933-6afb-4b80-b77a-e2e5bc7a6334" alt="Screenshot 2024-08-19 225107" width="600" height="auto">


## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/12106457/cipher-schools-assignment.git
   ```
2. **Navigate to the project directory::**
  
   ```sh
    cd cipher-schools-assignment
   ```
4. **Go to client file**
   ```sh
    cd client
   ```
   
5. **Install dependencies**
   ```sh
    npm install
   ```
   
6. **Now open new terminal**
  ```sh
    cd server
   ```
   
8. **To start server **
   ```sh
    nodemon index
   ```

Project Output:

Login page :

<img src="https://github.com/user-attachments/assets/33d972e0-44be-4361-9f55-946062809646" alt="Screenshot 2024-08-19 231447" width="400" height="auto">


Login Page Validation:

<img src="https://github.com/user-attachments/assets/008d403e-780c-45b2-a1d7-40df4dc89b97" alt="Screenshot 2024-08-19 231523" width="400" height="auto">

Register Page:

<img src="https://github.com/user-attachments/assets/080a74f9-9787-4270-98ca-b34e1087cc5a" alt="Screenshot 2024-08-19 231500" width="400" height="auto">

Register Page Validation

<img src="https://github.com/user-attachments/assets/ad43037b-88c3-4312-b6ac-75cf82e9ae9c" alt="Screenshot 2024-08-19 231537" width="400" height="auto">

Test Environment: 

<img src="https://github.com/user-attachments/assets/04bb5758-4dec-4b58-abad-b6f932498eeb" alt="Screenshot 2024-08-19 231607" width="400" height="auto">

Test Interface:

<img src="https://github.com/user-attachments/assets/4f0647f6-55ba-4e0c-bec2-f96a4da14dd6" alt="Screenshot 2024-08-19 231624" width="400" height="auto">

Test Finish Page:

<img src="https://github.com/user-attachments/assets/f5ee1501-716d-4754-9ebd-61fd4e09792c" alt="Screenshot 2024-08-19 231647" width="400" height="auto">

