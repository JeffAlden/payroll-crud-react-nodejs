
# payroll-crud-react-nodejs

A full-stack application for managing payroll data with a React frontend and a Node.js/Express/MySQL backend.

## Setup Instructions

### Backend
The backend is a Node.js/Express server that provides a REST API for payroll CRUD operations, connected to a MySQL database.

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/JeffAlden/payroll-crud-react-nodejs.git
   ```

2. **Navigate to the Backend Folder**:
   ```bash
   cd backend
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

The current dependencies in package.json are:
<<<<<<< HEAD
- `axios`: For making HTTP requests (though not currently used in the backend).
=======
- `axios`: For making HTTP requests 
>>>>>>> cbcfb84ce78d4b34b32bd227b277ab3ce619f7e0
- `cors`: Enables CORS for frontend-backend communication.
- `dotenv`: Manages environment variables.
- `express`: Web framework for Node.js.
- `morgan`: HTTP request logger middleware.
- `mysql`: MySQL driver for Node.js.
- `rotating-file-stream`: Rotates log files for morgan.
- `compression`: Compresses HTTP responses.
- `helmet`: Adds security headers.
- `cookie-parser`: Parses cookies (not currently used).
- `node-toobusy`: Rejects requests when the server is overloaded.
- `winston`: Structured logging for errors.
- `nodemon` (devDependency): Auto-restarts the server during development.

4. **Create the MySQL Database**:
Ensure MySQL is installed and running on your machine.
Create the database named `mysqldb`:
```sql
CREATE DATABASE mysqldb;
```
The backend automatically creates the `employees` table in `mysqldb` on startup (defined in `dbconfig.js`).

5. **Start the Backend Server**:
For production:
```bash
npm start
```
For development 
```bash
npm run dev
```

You should see output like:
```
Server running on port 3000
MySQL DB Connection established
Connection <id> acquired
MySQL Connected...
Employees table created or exists
Connection <id> released
```

### Frontend
The frontend is a React application that interacts with the backend API to perform CRUD operations on employee payroll data.

1. **Navigate to the Frontend Folder**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Frontend App**:
   ```bash
   npm start
   ```

The React app typically runs on port 3000 by default, but since the backend is using port 3000, you may be prompted to use a different port (e.g., 3001). 

Open your browser to http://localhost:3001 (or the port you configured) to view the app.

## Using the Application

  ```

### Frontend Usage
The React frontend provides a UI to interact with the backend API.
Use the UI to:
- Add: Create a new employee.
- Edit: Update employee details.
- View: View employee details.
- Delete: Remove an employee.

Ensure the frontend API calls point to server endpoints.

## Removed Dependencies
List of removed dependencies, their purpose, and reasons for removal:
- `debug`: Not actively used.
- `event-loop-stats`: Development tool, unnecessary.
- `express-handlebars`, `hbs`: Not needed; React handles UI.
- `express-status-monitor`: Development tool with vulnerabilities.
- `portfinder`: Fixed port used.
- `request`: Deprecated.
- `serve-favicon`: Not needed for API backend.
- `death`: Not essential; basic error handlers suffice.

