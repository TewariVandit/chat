import React, { useEffect, useState } from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id);

    return (
        <>

            {
                selectedUser !== null ? (
                    <div className='w-[80%] dsp2 flex flex-col min-h-[100vh] bg-[#F0F2F5]'>
                        <div className='flex gap-2 items-center bg-[#F0F2F5] text-black px-4 py-2 mb-2'>
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-12 rounded-full'>
                                    <img src={selectedUser?.profilePhoto} alt="user-profile" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p>{selectedUser?.fullName}</p>
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className='w-[80%]  min-h-[100vh] flex flex-col justify-center items-center'>
                        <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.fullName} </h1>
                        <h1 className='text-2xl text-white'>Let's start conversation</h1>

                    </div>
                )
            }
        </>

    )
}

export default MessageContainer