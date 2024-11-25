import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import FloatingShape from './components/FloatingShape';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import EmailVerificationPage from './pages/EmailVerificationPage';

function App() {
    return (
        <>
            <div className='overflow-hidden min-h-screen bg-gradient-to-br from-indigo-800 via-black to-gray-900 flex items-center justify-center relative'>
                <FloatingShape color='bg-cyan-400' size='w-64 h-64' top='-5%' left='10%' delay={0} />
                <FloatingShape color='bg-pink-400' size='w-48 h-48' top='70%' left='80%' delay={5} />
                <FloatingShape color='bg-lime-400' size='w-32 h-32' top='40%' left='-10%' delay={2} />

                <Routes>
                    <Route path='/' element={"Home"} />
                    <Route path='/signup' element={<SignUpPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='verify-email' element={<EmailVerificationPage />} />
                </Routes>
                <Toaster />
            </div>
        </>
    )
}

export default App
