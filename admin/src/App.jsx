import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Sidebar from './components/Sidebar/Sidebar'
import AdminLogin from './components/AdminLogin/AdminLogin';
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

    const url = import.meta.env.VITE_API_URL || "http://localhost:4000";

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const adminAuth = localStorage.getItem('adminAuth');
        if (adminAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        setIsAuthenticated(false);
    };

    if (!isAuthenticated) {
        return <AdminLogin setIsAuthenticated={setIsAuthenticated} />;
    }

    return (
        <div>
            <ToastContainer />
            <Navbar handleLogout={handleLogout}/>
            <hr />
            <div className="app-content">
                <Sidebar />
                <Routes>
                    <Route path='/' element={<Home url={url} />} />
                    <Route path='/add' element={<Add url={url} />} />
                    <Route path='/list' element={<List url={url} />} />
                    <Route path='/orders' element={<Orders url={url} />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
