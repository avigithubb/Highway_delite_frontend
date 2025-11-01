import React, {useEffect, useState} from 'react';
import PricePallete from './PricePallete';
import Navbar from './layout/Navbar';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const Details = () => {
    const {bookingData, setBookingData} = useAuth();
    const [bothSelected, setSelected] = useState(false)
    const [for_date, setDate] = useState({
        month: "",
        day: 0,
    });
    const [for_time, setTime] = useState(null);
    const [slots, setSlots] = useState({})
    const days = []
    const date = new Date();

    for(var i = 0; i < 5; i++){
        var new_day = new Date(date);
        new_day.setDate(date.getDate()+i);
        
        var new_month = new_day.toLocaleString('default', {month: "short"});

        days.push({day: new_day.getDate(), month: new_month});
    }

    useEffect(()=>{
        if(for_time != null && for_date.day != 0){
            setSelected(true);
            console.log(for_date.day);
            setBookingData(prevValues=> ({
                ...prevValues,
                time: for_time,
                date: for_date.day,
                month: for_date.month
            }))
        }
    }, [for_date, for_time])

    useEffect(()=>{
        if(for_date.day != 0){
            fetch(`https://highway-delite-backend-3n56.onrender.com/slots/${for_date.day}`)
            .then(res => res.json())
            .then(data => {
                setSlots(data);
            })
        }
    }, [for_date])

    function handleDateClick(date){
        setDate(date);
    }

    function handleTimeClick(time){
        setTime(time);
    }
    
    return (
        <>
            <Navbar />
            <div className='flex flex-col lg:flex-row justify-between px-0 lg:px-20 py-5 m-auto w-[90%] lg:w-[100%]'>
                <div className='text-black text-left flex flex-col gap-5 '>
                    <Link to="/" className='float-left text-black'>← Details</Link>
                    <img src={bookingData.img} alt="detail-img" className='w-[50vw] h-[50vh] rounded' />
                    <h2 className='text-lg'><b>{bookingData.destination}</b></h2>
                    <p className='text-gray-500'>Curated small-group experience. Certified guide. Safety first with gear included. Helmet and life jackets along with an expert with accompany in kayaking.</p>
                    <h3><b>Choose date</b></h3>
                    <div className='flex gap-3'>
                        {days.map((element)=>(
                            <button onClick={()=>handleDateClick({month: element.month, day: element.day})} className={`w-20 px-1 py-2 text-xs border-gray-400 ${for_date.day === element.day ? `bg-yellow-400 text-black-500`: `bg-white text-gray-500`}`}>{element.month} {element.day}</button>
                        ))}
                    </div>
                    <h3><b>Choose time</b></h3>
                    <div className='flex gap-3'>
                        <button disabled={slots["07:00 am"] === 0} onClick={()=>handleTimeClick("07:00 am")} className={`w-30 px-2 py-2 text-xs border-gray-400 ${for_time === "07:00 am"? "bg-yellow-400 text-black-500": "bg-white text-gray-500"}`}>07:00 am <span className='text-red-500 text-[10px]'>{slots["07:00 am"] === 0 ? "Sold out": slots["07:00 am"]+" left"}</span></button>
                        <button disabled={slots["09:00 am"] === 0} onClick={()=>handleTimeClick("09:00 am")} className={`w-30 px-2 py-2 text-xs border-gray-400 ${for_time === "09:00 am"? "bg-yellow-400 text-black-500": "bg-white text-gray-500"}`}>09:00 am <span className='text-red-500 text-[10px]'>{slots["09:00 am"] === 0 ? "Sold out": slots["09:00 am"]+" left"}</span></button>
                        <button disabled={slots["11:00 am"] === 0} onClick={()=>handleTimeClick("11:00 am")} className={`w-30 px-2 py-2 text-xs border-gray-400 ${for_time === "11:00 am"? "bg-yellow-400 text-black-500": "bg-white text-gray-500"}`}>11:00 am <span className='text-red-500 text-[10px]'>{slots["11:00 am"] === 0 ? "Sold out": slots["11:00 am"]+" left"}</span></button>
                        <button disabled={slots["01:00 pm"] === 0} onClick={()=>handleTimeClick("01:00 pm")} className={`w-30 px-2 py-2 text-xs border-gray-400 ${for_time === "01:00 pm"? "bg-yellow-400 text-black-500": "bg-white text-gray-500"}`}>01:00 pm <span className='text-red-500 text-[10px]'>{slots["01:00 pm"] === 0 ? "Sold out": slots["01:00 pm"]+" left"}</span></button>
                    </div>
                    <h3><b>About</b></h3>
                    <span className='bg-gray-200 text-gray-400 px-4 py-1 rounded'>Scenic Routes, trained guids, and safety briefing, Minimum age 10.</span>
                </div>
                <div className='py-10'>
                    <PricePallete start={bookingData.price} subtotal="999" tax="59" total={bookingData.price} isSelected = {bothSelected} />
                </div>
            </div>
        </>
    )
}

export default Details;