import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Card = (props) => {
    const navigate = useNavigate();
    const {bookingData, setBookingData} = useAuth();
    function handleClick(){
        setBookingData(prevValues=>({
            ...prevValues,
            img: props.img,
            destination: props.destination,
            price: props.price
        }))

        navigate(`/details`);
    }
    return (
        <>
            <div className="flex flex-col border border-gray-300 rounded-lg overflow-hidden shadow-lg w-[100%] h-[100%] ">
                <div className="hover:border-purple-500 h-[200px] w-full overflow-hidden">
                    <img src={props.img} alt="card-img" />
                </div>
                <div className="flex flex-col hover:border-purple-500 text-black">
                    <div className="flex justify-between items-center p-5">
                        <h3>{props.destination}</h3>
                        <div className="bg-gray-200 px-3 py-1 rounded text-xs">{props.location}</div>
                    </div>
                    <p className="text-left p-3 text-sm text-gray-500">Curated small-group experience. Certified guide. Safety first with gear included.</p>
                    <div className="flex justify-between items-center p-5">
                        <p><span className="text-sm">From</span> <span className="text-xl">₹{props.price}</span></p>
                        <button onClick={handleClick} className="bg-yellow-400 rounded px-3 py-1">View Details</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;