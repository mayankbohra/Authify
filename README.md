# Authify

Authify is a secure, scalable authentication system designed for modern applications. It incorporates **React**, **Node.js**, **Express.js**, and **MongoDB** to provide robust user management with Role-Based Access Control (RBAC).

**Important:** To manage roles like Admin or Manager, at least one admin must exist in the system. By default, an admin is pre-configured:

- Email: `mayankbohra.dev@gmail.com`
- Password: `admin`

---

## Backend

The backend is built with **Node.js** and **Express.js**. It handles authentication, user management, and serves the frontend in production.

### Key Files and Directories
- **index.js**: Entry point for the backend server.
- **connectDB.js**: Database connection setup.
- **auth.route.js**: Routes for authentication.
- **user.route.js**: Routes for user management.
- **auth.controllers.js**: Controllers for authentication logic.
- **verifyToken.js**: Middleware for verifying JWT tokens.
- **generateTokenAndSetCookie.js**: Utility for generating tokens and setting cookies.
- **mailtrap**: Configuration and templates for Mailtrap email service.

### Environment Variables
- `PORT`: Port number for the server.
- `NODE_ENV`: Environment mode (development or production).
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT.
- `MAILTRAP_USER`: Mailtrap username.
- `MAILTRAP_PASS`: Mailtrap password.

### Scripts
- `dev`: Start the backend server in development mode.
- `start`: Start the backend server in production mode.
- `build`: Install dependencies and build the frontend.

---

## Frontend

The frontend is built with **React** and uses **Vite** as the build tool.

### Key Files and Directories
- **App.jsx**: Main application component.
- **components**: React components.
- **pages**: React pages.
- **authStore.js**: Authentication store using Zustand.
- **index.html**: Main HTML file.
- **vite.config.js**: Vite configuration.

### Routes
- `/`: Protected route for the dashboard.
- `/signup`: User sign-up page.
- `/login`: User login page.
- `/verify-email`: Email verification page.
- `/forgot-password`: Forgot password page.
- `/reset-password/:token`: Reset password page.
- `/admin-panel`: Admin panel page (protected route).

### Components
- **FloatingShape**: Animated floating shapes.
- **LoadingSpinner**: Loading spinner component.
- **ProtectedRoute**: Higher-order component to protect routes.
- **RedirectAuthenticatedUser**: Higher-order component to redirect authenticated users.

---

## Running the Project

1. Clone the repository.
2. Create a `.env` file in the root directory and add the required environment variables.
3. Install dependencies:
   ```bash
   npm install
   npm install --prefix frontend
4. Start the development server:
   ```bash
   npm run dev
5. Build the project:
   ```bash
   npm run build
6. Start the production server:
   ```bash
   npm start

---

## Workflow of the Authify Project

1. User Signup
   - **Frontend:** User navigates to the `UserSignUpPage` and submits the signup form.
   - **Backend:** The signup request is handled by the `signup` controller.
   - **Database:** A new user is created in the database with a verification token.
   - **Email:** A verification email is sent to the user using the `sendVerificationEmail` function.
   - **Frontend:** User is redirected to the `EmailVerificationPage`.

2. Email Verification
   - **Frontend:** User enters the verification code on the `EmailVerificationPage`.
   - **Backend:** The verification request is handled by the `verifyEmail` controller.
   - **Database:** The user's `isVerified` status is updated.
   - **Email:** A welcome email is sent to the user using the `sendWelcomeEmail` function.
   - **Frontend:** User is redirected to the `DashboardPage`.

3. User Login
   - **Frontend:** User navigates to the `LoginPage` and submits the login form.
   - **Backend:** The login request is handled by the `login` controller.
   - **Database:** User's last login time is updated.
   - **Frontend:** User is redirected to the DashboardPage.
  
4. Password Reset
   Request Password Reset
     - **Frontend:** User navigates to the `ForgotPasswordPage` and submits the email form.
     - **Backend:** The request is handled by the `forgotPassword` controller.
     - **Database:** A reset token is generated and saved to the user's record.
     - **Email:** A password reset email is sent using the `sendResetPasswordEmail` function.
     - **Frontend:** User is notified that a reset link has been sent.
   
   Reset Password
     -  **Frontend:** User navigates to the `ResetPasswordPage` using the email link.
     -  **Backend:** The request is handled by the `resetPassword` controller.
     -  **Database:** User's password is updated, and the reset token is cleared.
     -  **Email:** A success email is sent using the `sendResetSuccessEmail` function.
     -  **Frontend:** User is redirected to the `LoginPage`.
  
5. User Dashboard
   - **Frontend:** User navigates to the `DashboardPage`.
   - **Backend:** User data is fetched from the `fetchUserProfile` function.
   - **Frontend:** User's profile and role-based data are displayed.
  
6. Admin Panel
   - **Frontend:** Admin navigates to the `AdminPanelPage`.
   - **Backend:** Admin data is fetched from the `fetchUsers` function.
   - **Frontend:** Admin can create new managers/admins and manage users.
  
7. Logout
   - **Frontend:** On app load, the `checkAuth` function is called.
   - **Backend:** The request is handled by the `checkAuth` controller.
   - **Frontend:** User's authentication status is updated based on the response.
  
This workflow ensures a secure and seamless user experience for authentication and user management in the Authify project.
