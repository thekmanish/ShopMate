import React from "react";
import useCartStore from "../store/useCartStore";
import useCheckoutStore from "../store/useCheckoutStore";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const Summary = () => {

    const { shippingDetails, paymentMethod } = useCheckoutStore();
    return (
        <div>
            <CheckoutSteps currentStep={3}/>
            <h1>This is Summary Page</h1>

        </div>
    )
}

export default Summary;