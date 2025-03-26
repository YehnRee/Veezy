import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import { setUserInfo } from "../actions/userActions";

const PaymentScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userLogin);

    const handlePayment = async () => {
        try {
            // Simulate payment process
            alert("Payment successful! You now have access to the site.");

            // Update user role to IsAdmin
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(
                "/users/update-role/",
                { isAdmin: true },
                config
            );

            // Update Redux store
            // dispatch(setUserInfo(data));

            navigate("/home"); // Redirect to home page after payment
        } catch (error) {
            console.error("Error updating user role", error);
            alert("An error occurred while updating your access. Please try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4" style={{ width: "400px" }}>
                <h2 className="text-center">One-Time Access Payment</h2>
                <p className="text-center">Pay once and enjoy full access to the site.</p>
                <h4 className="text-center mb-4">$19.99</h4>
                <Button 
                    className="w-100" 
                    variant="success" 
                    onClick={handlePayment}
                >
                    Proceed to Payment
                </Button>
            </Card>
        </div>
    );
};

export default PaymentScreen;
