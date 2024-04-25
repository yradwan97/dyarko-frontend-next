import React, { useEffect } from "react";

const PaymentButton = (props) => {
    const { variant = "primary", to, className, children, setPaymentStatus, disabled = false } = props;

    const style =
        "font-bold btn px-2 py-2 md:px-5  tracking-tight rounded-lg transition-all duration-500 border-2";
    const variantClasses = {
        "primary": `${style} bg-main-600 text-white border-main-600 ${!disabled &&
            "hover:border-main-200 hover:bg-white hover:text-main-600"}`
    };

    const btnClasses = `text-base btn no-underline ${variantClasses[variant]} ${className || ""}`.trimEnd();

    useEffect(() => {
        const paymentChannel = new BroadcastChannel('paymentChannel');
        // TODO: find a way to close the new tab as soon as the api reponse is sent back
        paymentChannel.onmessage = (event) => {
            if (event.data === 'paymentSuccess') {
                setPaymentStatus('success');
                paymentChannel.close();
            }
        };

        return () => {
            paymentChannel.close();
        };
    }, [setPaymentStatus]);

    const openPaymentLink = () => {
        const paymentWindow = window.open(to, '_blank');

        if (paymentWindow) {
            const checkClosed = setInterval(() => {
                if (paymentWindow.closed) {
                    const paymentChannel = new BroadcastChannel('paymentChannel');
                    paymentChannel.postMessage('paymentSuccess');
                    clearInterval(checkClosed);
                }
            }, 1000);
        } else {
            // Handle the case when paymentWindow is null or undefined
            console.error("Unable to access paymentWindow");
        }
    };

    return (
        <button type="button" className={btnClasses} onClick={openPaymentLink} disabled={disabled}>
            {children}
        </button>
    );
};

export default PaymentButton;