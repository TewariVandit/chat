import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import { FaBars } from "react-icons/fa"; // Importing the hamburger icon
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const Sidebar = () => {
    const [search, setSearch] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to closed on small screens
    const { otherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    };

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));
        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]));
        } else {
            toast.error("User not found!");
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
    };

    return (
        <div className="relative w-[20%] bg-white z-50">
            {/* Hamburger menu button for small screens */}
            <button
                className="fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-full md:hidden"
                onClick={toggleSidebar}
            >
                <FaBars className="w-6 h-6" />
            </button>

            {/* Sidebar for larger screens and toggleable on small screens */}
            <div 
                className={`fixed inset-0 md:relative md:w-64  h-[100%] border-r border-slate-500 p-4 flex flex-col bg-white transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
                style={{ top: '0' }}
            >
                <h1 className='text-2xl font-bold mb-4 text-black'>Chats</h1>
                <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2 '>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='input input-bordered rounded-md bg-white' type="text"
                        placeholder='Search...'
                    />
                    
                </form>
                <div className="divider px-3"></div>
                <OtherUsers />
                <div className='mt-2'>
                    <button onClick={logoutHandler} className='btn btn-sm bg-[#009688] text-white'>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
