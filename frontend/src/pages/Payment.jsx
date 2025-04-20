import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps"
import useCheckoutStore from "../store/useCheckoutStore";
import useCartStore from "../store/useCartStore";

const Payment = () => {
    const { shippingDetails, proceedToPayment, allowPaymentAccess, paymentMethod, setPaymentMethod} = useCheckoutStore();
    const { cart } = useCartStore();
    const navigate = useNavigate();
    
    const [selectedMethod, setSelectedMethod] = useState(paymentMethod || "");
    const [error, setError] = useState('');

    const paymentOptions = {
        "Cash on delivery" : "cash_on_delivery",
        "Net Banking" : "net_banking",
        "UPI" : "upi",
        "Paypal" : "paypal"
    }

    useEffect(() => {
        if (!proceedToPayment || !shippingDetails.fullName) {
          navigate("/shipping");
        }
        // return () => allowPaymentAccess(false);
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!selectedMethod){
            setError("Please select a payment method");
            return;
        }

        const backendValue = paymentOptions[selectedMethod];
        setPaymentMethod(backendValue);
        navigate('/summary');
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black px-4 py-8  md:px-10 md:py-10">
            <CheckoutSteps currentStep={2}/>
            <div className="flex justify-center mt-8">
                <div className="w-full max-w-xl bg-white bg-opacity-5 backdrop-blur-xl rounded-2xl mb-8 p-10 shadow-2xl text-white">
                    <h2 className="text-4xl font-bold mb-10 text-center">Payment method</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                    {Object.keys(paymentOptions).map((method) => (
                        <label key={method} className="flex items-center gap-4 bg-white bg-opacity-10 p-3 rounded-xl cursor-pointer transition hover:bg-opacity-20">
                            <input 
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={selectedMethod === method}
                            onChange={(e) => {
                                setSelectedMethod(e.target.value);
                                setError('');
                            }}
                            className="accent-yellow-400"
                            />
                             <span className="text-lg">{method}</span>
                        </label>
                    ))}
                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                    type="submit"
                    className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                    >
                        Continue to Summary 
                    </button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Payment;