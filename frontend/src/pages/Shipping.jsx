import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useCheckoutStore from "../store/useCheckoutStore";
import CheckoutSteps from '../components/CheckoutSteps';

const Shipping = () => {
  const { shippingDetails, setShippingDetails } = useCheckoutStore();
  const [formData, setFormData] = useState(shippingDetails);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(shippingDetails);
  }, [shippingDetails]);

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
    setShippingDetails(formData);
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8 md:px-10 md:py-10">
      
      {/* ✅ Checkout Steps ABOVE the card */}
      <CheckoutSteps currentStep={1} />

      <div className="flex justify-center mt-8">
        <div className="w-full max-w-2xl bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-10 shadow-xl text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Shipping Information</h2>

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
                <label className="block mb-1 text-sm font-medium">{field.label}</label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-opacity-20 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder={field.label}
                />
                {errors[field.name] && (
                  <p className="text-red-400 text-sm mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}

            <div className="col-span-full">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
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
