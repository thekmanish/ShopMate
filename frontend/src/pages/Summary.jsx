import React from "react";
import CheckoutSteps from "../components/CheckoutSteps";

const Summary = () => {
    return (
        <div>
            <CheckoutSteps currentStep={3}/>
            <h1>This is Summary Page</h1>

        </div>
    )
}

export default Summary;