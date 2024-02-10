
import React, { useRef } from 'react';

const OTPInput = ({ length, onComplete, otp, setOTP }) => {

    const inputRefs = useRef([]);
    const lastIndex = length - 1;

    const handleInputChange = (index, value) => {
        setOTP((prevOTP) => {
            const newOTP = [...prevOTP];

            // Case 1: Input is empty, and a value is entered
            if (value !== '' && newOTP[index] === '') {
                newOTP[index] = value;

                // Move focus to the next input (except the last one)
                if (index < lastIndex) {
                    inputRefs.current[index + 1].focus();
                }
            }
            // Case 2: Input has a value, and backspace is pressed
            else if (value === '' && newOTP[index] !== '') {
                newOTP[index] = '';

                // Keep the cursor in the same input field
            }
            // Case 3: Input is empty, and backspace is pressed
            else if (value === '' && index > 0) {
                newOTP[index] = '';

                // Move focus to the previous input and delete the value there
                inputRefs.current[index - 1].focus();
                newOTP[index - 1] = '';
            }

            return newOTP;
        });
    };



    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
            // Move focus to the previous input when Backspace is pressed on an empty input
            inputRefs.current[index - 1].focus();
        }
    };

    const handleInputFocus = (index) => {
        // Set caret position to the end of the input when focused
        const input = inputRefs.current[index];
        input.setSelectionRange(input.value.length, input.value.length);
    };

    const handleInputPaste = (event) => {
        event.preventDefault();
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedData = clipboardData.getData('text').trim();

        if (/^\d+$/.test(pastedData) && pastedData.length <= length) {
            setOTP((prevOTP) => {
                const newOTP = Array(length).fill('');
                for (let i = 0; i < pastedData.length; i++) {
                    newOTP[i] = pastedData[i];
                }
                return newOTP;
            });
        }
    };

    return (
        <>
            <div className='flex flex-row mt-4 items-center justify-center space-x-1.5'>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        type="text"
                        value={digit}
                        maxLength={1}
                        min={0}
                        className="relative block w-14 h-14 rounded-lg border border-main-300 py-2 font-bold text-center text-black outline-none focus:border-main-yellow-600 focus-visible:ring-main-yellow-600"
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onFocus={() => handleInputFocus(index)}
                        onPaste={(e) => handleInputPaste(e)}
                    />
                ))}
            </div>


        </>

    );
};

export default OTPInput;
