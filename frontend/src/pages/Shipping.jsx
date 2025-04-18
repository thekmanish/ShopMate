import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useCartStore from '../store/useCartStore';
import useCheckoutStore from "../store/useCheckoutStore";
import CheckoutSteps from '../components/CheckoutSteps';


const Shipping = () => {
  const { shippingDetails, setShippingDetails, allowPaymentAccess } = useCheckoutStore();
  const [formData, setFormData] = useState(shippingDetails);
  const [errors, setErrors] = useState({});
  const { cart } = useCartStore(); 
  const { proceedToShipping, allowShippingAccess } = useCheckoutStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0 || !proceedToShipping) {
      navigate("/cart");
    }
    // return () => allowShippingAccess(false);
  }, [cart, proceedToShipping, navigate, allowShippingAccess]);

  useEffect(() => {
    setFormData(shippingDetails);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validation = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation()) return;
    console.log(formData); 
    setShippingDetails(formData);
    allowPaymentAccess(true);
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black px-4 py-8 md:px-10 md:py-10">
      <CheckoutSteps currentStep={1} />

      <div className="flex justify-center mt-8 mb-16">
        <div className="w-full max-w-2xl bg-white bg-opacity-5 backdrop-blur-xl rounded-2xl p-10 shadow-2xl text-white">
          <h2 className="text-4xl font-bold mb-10 text-center">Shipping Information</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Full Name", name: "fullName" },
              { label: "Address", name: "address" },
              { label: "City", name: "city" },
              { label: "Postal Code", name: "postalCode" },
              { label: "Country", name: "country" },
              { label: "Phone", name: "phone" },
            ].map((field) => (
              <div key={field.name} className="col-span-1">
                <label className="block mb-2 text-sm font-semibold tracking-wide text-gray-200">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.label}
                  className="w-full px-4 py-2 rounded-xl border border-gray-500 bg-white bg-opacity-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
                />
                {errors[field.name] && (
                  <p className="text-red-400 text-xs mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}

            <div className="col-span-full">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
