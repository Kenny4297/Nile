import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import Loading from '../Loading'

const ThankYou = () => {
    const { userId } = useParams();
    const [order, setOrder] = useState(null);
    const [user,] = useContext(UserContext);

    const [isReceiptRequested, setIsReceiptRequested] = useState(false);

    const handleReceiptRequest = () => {
        setIsReceiptRequested(true);
    };

    useEffect(() => {
        const fetchOrder = async () => {
            const response = await axios.get(
                `/api/orders/order/${userId}/last`
            );
            setOrder(response.data);
        };
        fetchOrder();
    }, [user, userId]);

    if (!order) {
        return <Loading />;
    }

    return (
        <section
            className="thank-you-container"
            aria-label="Thank you for your order"
        >
            <h2>Thank you for your order!</h2>
            <h3>
                Order Number: <span>{order._id}</span>
            </h3>
            {isReceiptRequested ? (
                <>
                    <p className="send-me-receipt-desc">
                        Thank you for your mock purchase! If this were a real
                        e-commerce site, a receipt would be sent to your email.
                        However, for the purpose of this demonstration and to
                        protect your privacy, no email will be sent.
                    </p>

                    <Link
                        className="send-me-receipt-button"
                        to="/"
                        aria-label="Back to Home"
                    >
                        Back to Home
                    </Link>
                </>
            ) : (
                <button
                    className="send-me-receipt-button"
                    onClick={handleReceiptRequest}
                    aria-label="Request receipt"
                >
                    "Send" me an email receipt (but not really)
                </button>
            )}
        </section>
    );
};

export default ThankYou;
