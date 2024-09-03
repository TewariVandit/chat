import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '..';
import "../WhatsAppConnect.css";


const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: ""
    })
  }
  return (
    <div className="whatsapp-connect">
      <header className="header">
        <div className="header-content">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp Logo"
            className="logo"
          />
          <h1 className="title">WHATSAPP WEB</h1>
        </div>
      </header>

      <div className="content flex justify-center items-center">
        <form onSubmit={onSubmitHandler} action="" className='w-[50%] fffd'>
        <h1 className='text-3xl font-bold text-center'>Login</h1>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full input input-bordered h-10 bg-white'
              type="text"
              placeholder='Username' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-black'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input input-bordered h-10 bg-white'
              type="password"
              placeholder='Password' />
          </div>
          <p className='text-center my-2'>Don't have an account? <Link to="/signup"> signup </Link></p>
          <div>
            <button type="submit" className='btn btn-block btn-sm mt-2 bg-[#00A884] text-white'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login