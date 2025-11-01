import React, {useState} from 'react';
import Navbar from './layout/Navbar';
import success from '../assets/success.png';
import failure from '../assets/failure2.png';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const Result = () => {
    const {bookingData, setBookingData} = useAuth();
    console.log(bookingData.bookingStatus);
    return (
        <>
            <Navbar />
            {bookingData.bookingStatus === "success" ? 
            <div className='text-black m-auto mt-20 w-[100vw] flex flex-col items-center'>
                <img src={success} alt="status-img" className='m-auto w-14 mb-10' />
                <p className='text-xl mb-3'><b>Booking Confirmed</b></p>
                <span className='text-gray-500 mb-5'>Ref ID: </span>
                <Link to="/" className='bg-gray-300 text-gray-400 rounded px-5 py-1'>
                    Back to Home
                </Link>
            </div>:
            <div className='text-black m-auto mt-20 w-[100vw] flex flex-col items-center'>
                <img src={failure} alt="status-img" className='m-auto w-14 mb-10' />
                <p className='text-xl mb-3'><b>Booking Failed</b></p>
                <span className='text-gray-500 mb-5'>Ref ID: </span>
                <Link to="/" className='bg-gray-300 text-gray-400 rounded px-5 py-1'>
                    Back to Home
                </Link>
            </div>
            }
        </>
    )
}

export default Result;