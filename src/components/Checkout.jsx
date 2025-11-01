import React, { useState, useEffect } from 'react';
import Navbar from './layout/Navbar';
import PricePallete from './PricePallete';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Checkout = () => {
    const [mypromo, setPromo] = useState(null);
    const [applyPromo, setApply] = useState(false);
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    })
    const [order, setOrder] = useState(false);
    const [discount, setDiscount] = useState(0);
    const {bookingData, setBookingData} = useAuth();
    const [promoFailed, setPromoFailed] = useState(false);

    function handleSubmit(event) { 
        event.preventDefault();
    }

    function handleChange(e){
        const {name, value} = e.target;

        setFormData(prevValues=>({
            ...prevValues,
            [name]: value
        }))
    }

    function handlePromo(e){
        e.preventDefault();
        setApply(true);

    }

    function handleClick(e){
        setOrder(true);
    }

    console.log(bookingData.date);

    useEffect(()=>{
        if(order){
            fetch("https://highway-delite-backend-3n56.onrender.com/bookings", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    destination: bookingData.destination,
                    date: bookingData.date,
                    price: bookingData.price,
                    month: bookingData.month,
                    time: bookingData.time
                })
                })
            .then(res => res.json())
            .then(data=>{
                setBookingData(prevValues=>({
                    ...prevValues,
                    bookingStatus: data.message
                }))
                navigateTo("/result");
            })
            
        }
    }, [order])

    useEffect(()=>{
        const queryParams = new URLSearchParams({
            code: mypromo,
        }).toString();
        if(applyPromo){
            fetch(`https://highway-delite-backend-3n56.onrender.com/promo/validate?${queryParams}`)
            .then(res => res.json())
            .then(data =>{
                if(data.message == "failure"){
                    setPromoFailed(true);
                }
                else{
                    setDiscount(data.discount);
                }
            })
        }
    }, [])
    return (
        <>
            <Navbar />
            <div className='grid lg:grid-cols-2 lg:gap-20 m-auto px-0 lg:px-20 py-5 w-[100vw] flex flex-col lg:flex-row'>
                <div className='flex flex-col text-left'>
                    <Link to="/details" className='float-left text-black mb-5'>← Checkout</Link>
                    <form onSubmit={handleSubmit} className='rounded bg-gray-200 text-gray-500 text-sm p-10 w-[75%] lg:w-[40vw] '>
                        <div className='flex flex-col lg:flex-row mb-3'>
                            <div className='flex flex-col'>
                                <label htmlFor="name">Full Name</label>
                                <input onChange={handleChange} type="text" name='name' className='bg-gray-300 rounded px-2 py-1 w-25 lg:w-[140%]' placeholder='Your name' required />
                            </div>
                            <div className='flex flex-col ml-0 lg:ml-20'>
                                <label htmlFor="email">Email</label>
                                <input onChange={handleChange} type="text" name='email' className='bg-gray-300 rounded px-2 py-1 w-25 lg:w-[160%]' placeholder='Email' required />
                            </div>
                            
                        </div>
                        <div className='flex justify-between'>
                            <input type="text" onChange={(e)=> setPromo(e.target.value)} name="promo" className='bg-gray-300 w-[80%] rounded px-2' placeholder='Promo code' />
                            <button onClick={handlePromo} className='bg-black text-white px-4 py-1'>Apply</button>
                        </div>
                        {promoFailed ? <><span className='text-red-500'>Please enter valid promo code.</span></>: ""}
                        <input type="checkbox" className='bg-black mt-3'/>
                        <span className='text-xs'>I agree to the terms and safety policy</span>
                    </form>
                </div>
                <div className='pt-5'>
                    <div className='bg-gray-200 text-black p-5 rounded-lg w-[300px] flex flex-col gap-3'>
                        <div className='flex justify-between text-gray-500'>
                            <span>Experience</span>
                            <span>something</span>
                        </div>
                        <div className='flex justify-between text-gray-500'>
                            <span>Date</span>
                            <span>{bookingData.date}</span>
                        </div>
                        <div className='flex justify-between text-gray-500'>
                            <span>Time</span>
                            <span>{bookingData.time}</span>
                        </div>
                        <div className='flex justify-between text-gray-500'>
                            <span>Qty</span>
                            <span>{bookingData.quantity}</span>
                        </div>
                        <div className='flex justify-between text-gray-500'>
                            <span>Subtotal</span>
                            <span>₹{bookingData.price}</span>
                        </div>
                        <div className='flex justify-between text-gray-500'>
                            <span>Taxes</span>
                            <span>₹59</span>
                        </div>
                        <div className='h-[1px] bg-gray-400 w-100'></div>
                        <div className='flex justify-between'>
                            <h2><b>Total</b></h2>
                            <h2><b>₹{discount != 0 ? bookingData.price * (Number(discount)/ 100) : bookingData.price}</b></h2>
                        </div>
                        <button onClick={(handleClick)} className='bg-yellow-400 text-black'>Pay and Confirm</button>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Checkout;