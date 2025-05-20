# Med AI Platform

The Med AI Platform is a web-based healthcare system that connects patients with doctors and provides AI-powered assistance for health-related queries. Built using the MERN stack (MongoDB, Express.js, React, Node.js), this application streamlines the process of medical consultations and enhances accessibility to healthcare.

## Features

### For Patients

* Sign up and log in securely
* Chat with an AI assistant for basic health queries
* Book appointments with available doctors
* Receive follow-ups via email or phone

### For Doctors

* Register and log in to manage appointments
* View incoming appointment requests
* Follow up with patients via provided contact details
* Delete or mark appointments as completed after consultation

## Technologies Used

* **Frontend**: React.js, Tailwind CSS (or your preferred styling solution)
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **AI Assistant**: Gemini

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js and npm
* MongoDB

### Installation

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Backend

```bash
cd backend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in the backend folder and include necessary configurations such as:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Add similar configurations for any AI or third-party APIs you’re using.

## Folder Structure

```
med-ai-project/
├── frontend/          # React frontend
├── backend/          # Express backend
├── README.md
```

## Happy Coding
