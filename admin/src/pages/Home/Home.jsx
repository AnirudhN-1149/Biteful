import React from 'react'
import './Home.css'
import { NavLink } from 'react-router-dom'

const Home = () => {
    return (
        <div className='home add'>
            <h1>Admin Panel</h1>
            <p className='desc'>Your all-in-one dashboard to manage orders, update statuses, and spice up the menu with new tasty additions!</p>
            <div className='home-content'>
                <div className="admin-options">
                    <h3>Manage All Orders</h3>
                    <p>Effortlessly update and manage all customer orders in real-time.</p>
                    <NavLink to="/orders">
                        <button>Manage Orders</button>
                    </NavLink>
                </div>
                <div className="admin-options">
                    <h3>View Food Items List</h3>
                    <p>Browse and manage your entire menu with ease, all in one place.</p>
                    <NavLink to="/list">
                        <button>List Items</button>
                    </NavLink>
                </div>
                <div className="admin-options">
                    <h3>Add New Food Items</h3>
                    <p>Quickly add new delicious items to your menu with just a few clicks!</p>
                    <NavLink to="/add">
                        <button>Add Items</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Home
