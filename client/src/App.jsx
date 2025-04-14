import React from 'react';
import './App.css';
import Signup from './pages/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

function AppRoutes() {
    const { user } = useAuth();
    return (
        <Routes>
            <Route
                path="/"
                element={<Home key={user ? 'logged-in' : 'logged-out'} />}
            />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
}

export default App;
