import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { updateUserProfile } from "../actions/userActions"; 
import { useNavigate } from "react-router-dom";
import { Card, Button, Container, Spinner } from "react-bootstrap";

const SubscriptionScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.userLogin);
    const [{ isPending }] = usePayPalScriptReducer();

    // Redirect if already an admin
    useEffect(() => {
        if (userInfo?.isAdmin) {
            navigate("/");
        }
    }, [userInfo, navigate]);

    const handleApprove = async (data, actions) => {
        return actions.order.capture().then(() => {
            const updatedUser = { ...userInfo, isAdmin: true };
            dispatch(updateUserProfile(updatedUser)); // Update Redux state
            localStorage.setItem("userInfo", JSON.stringify(updatedUser)); // Persist in localStorage
            navigate("/"); // Redirect to homepage
        });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 text-center shadow" style={{ width: "400px" }}>
                <h2 className="mb-3">Subscribe for Full Access</h2>
                <p className="text-muted">Pay once to unlock all content.</p>

                {isPending ? (
                    <Spinner animation="border" variant="primary" />
                ) : (
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [{ amount: { value: "49.99" } }],
                            });
                        }}
                        onApprove={handleApprove}
                    />
                )}

                <Button 
                    variant="secondary" 
                    className="mt-3"
                    onClick={() => navigate("/")}
                >
                    Cancel
                </Button>
            </Card>
        </Container>
    );
};

export default SubscriptionScreen;
