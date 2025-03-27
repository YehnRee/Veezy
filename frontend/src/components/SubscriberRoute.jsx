import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function SubscriberRoute({ children }) {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!userInfo.isAdmin) {
            setShowModal(true);
        }
    }, [userInfo]);

    const handleClose = () => {
        setShowModal(false);
        navigate("/subscription");  // Redirect to subscription page
    };

    return (
        <>
            {/* Show the protected content if the user is an admin */}
            {userInfo.isAdmin ? children : null}

            {/* Modal for non-admin users */}
            <Modal show={showModal} backdrop="static" centered>
                <Modal.Header>
                    <Modal.Title>Subscription Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>You need to subscribe for full access to this site.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Subscribe Now
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SubscriberRoute;
