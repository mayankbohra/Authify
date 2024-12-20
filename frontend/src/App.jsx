import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

import FloatingShape from './components/FloatingShape';
import UserSignUpPage from './pages/UserSignUpPage';
import AdminPanelPage from './pages/AdminPanelPage';
import LoginPage from './pages/LoginPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import DashboardPage from './pages/DashboardPage';
import LoadingSpinner from './components/LoadingSpinner';
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { useAuthStore } from './store/authStore';


// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

    if (isCheckingAuth) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    if (!user.isVerified) {
        return <Navigate to='/verify-email' replace />;
    }

    return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated && user.isVerified) {
        return <Navigate to='/' replace />;
    }

    return children;
};

// protect routes that require admin role
const AdminGuard = ({ children }) => {
    const { user } = useAuthStore();

    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" />;
    }

    return children;
};

function App() {
    const { isCheckingAuth, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) return <LoadingSpinner />;
    return (
        <>
            <div className='overflow-hidden min-h-screen bg-gradient-to-br from-indigo-800 via-black to-gray-900 flex items-center justify-center relative'>
                <FloatingShape color='bg-cyan-400' size='w-64 h-64' top='-5%' left='10%' delay={0} />
                <FloatingShape color='bg-pink-400' size='w-48 h-48' top='70%' left='80%' delay={5} />
                <FloatingShape color='bg-lime-400' size='w-32 h-32' top='40%' left='-10%' delay={2} />

                <Routes>
                    <Route
                        path='/'
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        } />
                    <Route
                        path='/signup'
                        element={
                            <RedirectAuthenticatedUser>
                                <UserSignUpPage />
                            </RedirectAuthenticatedUser>
                        } />
                    <Route
                        path="/admin-panel"
                        element={
                            <AdminGuard>
                                <AdminPanelPage />
                            </AdminGuard>
                        }
                    />
                    <Route
                        path='/login'
                        element={
                            <RedirectAuthenticatedUser>
                                <LoginPage />
                            </RedirectAuthenticatedUser>
                        } />
                    <Route path='verify-email' element={<EmailVerificationPage />} />
                    <Route
                        path='/forgot-password'
                        element={
                            <RedirectAuthenticatedUser>
                                <ForgotPasswordPage />
                            </RedirectAuthenticatedUser>
                        }
                    />
                    <Route
                        path='/reset-password/:token'
                        element={
                            <RedirectAuthenticatedUser>
                                <ResetPasswordPage />
                            </RedirectAuthenticatedUser>
                        }
                    />
                    <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>
                <Toaster />
            </div>
        </>
    )
}

export default App
