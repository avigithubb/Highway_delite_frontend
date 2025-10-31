import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PricePallete = (props) => {
    const [quantity, setQuantity] = useState(1);
    const navigateTo = useNavigate();
    const {bookingData, setBookingData} = useAuth();

    function handleClick(){
        setBookingData(prevValues=>({
            ...prevValues,
            quantity: quantity,
            price: (Number(props.total) + Number(props.tax)) * quantity,
        }))
        navigateTo("/checkout");
    }

    function handleDecrease(){
        if(quantity > 1){
            setQuantity(quantity - 1);
        }
    }
     
    function handleIncrease(){
        setQuantity(quantity + 1);
    }

    return (
        <>
            <div className='bg-gray-200 text-black p-5 rounded-lg w-[300px] flex flex-col gap-3'>
                <div className='flex justify-between text-gray-500'>
                    <span>Starts at</span>
                    <span>₹{props.start}</span>
                </div>
                <div className='flex justify-between text-gray-500'>
                    <span>Quantity</span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleDecrease}
                            className="bg-gray-300 px-2 py-0 rounded text-lg font-bold hover:bg-gray-400"
                        >
                            -
                        </button>

                        <span className="text-md font-semibold">{quantity}</span>

                        <button
                            onClick={handleIncrease}
                            className="bg-gray-300 px-2 py-0 rounded text-lg font-bold hover:bg-gray-400"
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className='flex justify-between text-gray-500'>
                    <span>Subtotal</span>
                    <span>₹{props.subtotal}</span>
                </div>
                <div className='flex justify-between text-gray-500'>
                    <span>Taxes</span>
                    <span>₹{props.tax}</span>
                </div>
                <div className='h-[1px] bg-gray-400 w-100'></div>
                <div className='flex justify-between'>
                    <h2><b>Total</b></h2>
                    <h2><b>₹{(Number(props.total) + Number(props.tax)) * quantity}</b></h2>
                </div>
                <button onClick={handleClick} disabled={!props.isSelected} className={`${props.isSelected ? "bg-yellow-400 text-black" : "bg-gray-300 text-gray-500"}`}>confirm</button>
            </div>
        </>
    )
}

export default PricePallete;