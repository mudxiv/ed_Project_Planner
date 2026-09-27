# ED1 Project Planner

## Description

ED1 Project Planner is a simple web application designed to help users create and manage project tasks. Users can create an account, log in, and manage their tasks through a web-based dashboard.

The application was developed as a prototype for an Engineering Design 1 (ED1) project while demonstrating the use of a web frontend, database, user authentication, and CRUD operations.

## Features

* User registration
* User login and logout
* Authenticated user sessions
* Create tasks
* View tasks
* Edit existing tasks
* Delete tasks
* Task status
* Task priority
* Task due dates
* Task descriptions
* User-specific task data

## Technologies Used

* HTML
* CSS
* JavaScript
* Supabase

  * Authentication
  * PostgreSQL database
* Git and GitHub
* Netlify for deployment

## Database

The application uses Supabase as its backend database.

Tasks are stored in a `tasks` table. Each task contains information including:

* Task ID
* User ID
* Title
* Description
* Status
* Priority
* Due date
* Creation date

Tasks are associated with the authenticated user through the `user_id` field.

## Authentication

User authentication is handled through Supabase Authentication.

Users can:

1. Register for an account
2. Log in to their account
3. Access the project dashboard
4. Create and manage their tasks
5. Log out of their account

The application checks for an authenticated user before allowing access to the project dashboard and user-specific task data.

## Project Structure

```text
ed_Project_Planner/
│
├── css/
│   └── Application stylesheets
│
├── js/
│   └── JavaScript application logic
│
├── index.html
│   └── Main landing page
│
├── login.html
│   └── User login page
│
├── register.html
│   └── User registration page
│
├── dashboard.html
│   └── Main task management dashboard
│
└── README.md
    └── Project documentation
```

## CRUD Operations

The application implements all four basic CRUD operations:

| Operation | Function                                                  |
| --------- | --------------------------------------------------------- |
| Create    | Users can create new tasks                                |
| Read      | Users can view their existing tasks                       |
| Update    | Users can edit task information directly in the dashboard |
| Delete    | Users can delete existing tasks                           |

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/mudxiv/ed_Project_Planner.git
```

### 2. Open the project

Open the project folder in a code editor such as Visual Studio Code.

### 3. Configure Supabase

The application requires a Supabase project with authentication enabled and a `tasks` table containing the required database columns and security policies.

The JavaScript application files must be configured with the appropriate Supabase project information.

### 4. Run the application

Use a local development server such as the Live Server extension in Visual Studio Code.

Open `index.html` through the development server to access the application.

## Deployed Application

[Open ED1 Project Planner](https://harmonious-rolypoly-5202b3.netlify.app/)

The application is deployed using Netlify.

## Demo Video

[Watch the ED1 Project Planner Demo](https://youtu.be/MfwrnYgDfmM)

The demonstration shows user registration and login, task creation, viewing, editing, database persistence, task deletion, Supabase database functionality, and the project's GitHub structure.

## GitHub Repository

[ED1 Project Planner](https://github.com/mudxiv/ed_Project_Planner)

## What the Application Does

ED1 Project Planner provides users with a simple way to organize and manage engineering project tasks. Users can create, view, update, and delete tasks while using Supabase for database storage and authentication.

The project was developed incrementally using Git and GitHub, with AI tools used throughout development to assist with implementation and troubleshooting.

