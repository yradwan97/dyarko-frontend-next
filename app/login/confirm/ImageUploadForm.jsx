import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from "@/app/components/Shared/Button";
import { axiosClient as axios } from "@/app/services/axiosClient"
import { useSession } from 'next-auth/react';
import { toast } from "react-toastify"
import { useRouter } from 'next/navigation';
import { prettifyError } from '@/app/utils/utils';

const ImageUploadForm = () => {
    const [formData, setFormData] = useState(new FormData());
    const [isMarried, setIsMarried] = useState(false)
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const { data: session } = useSession()
    const router = useRouter()

    const canUserSubmit = () => {
        const isSubmitDisabled =
            !formData.get("id_image_front") ||
            !formData.get("id_image_back") ||
            !formData.get("image") ||
            (isMarried && !formData.get("mariage_document"));

        return isSubmitDisabled
    }

    const handleFileChange = (event, fieldName) => {
        const files = event.target.files;

        // Update FormData with the new file(s)
        formData.set(fieldName, files[0]);
        const isSubmitDisabled = canUserSubmit()
        setSubmitDisabled(isSubmitDisabled);

        // Log the FormData object to see the selected files

    };

    const handleSubmit = async () => {
        // Create a new FormData object to include additional form fields if needed

        try {
            // Append additional form data if needed
            formData.append("isMarried", isMarried);

            // Make an Axios post request
            const response = await axios.post("/otp_requests", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "auth-token": `Bearer ${session?.user?.accessToken}`
                },
            });


            toast.success("Documents uploaded successfully, pending admin confirmation")
            setTimeout(() => router.push("/"), 3000)
        } catch (error) {
            console.error("Error submitting the form:", error);
            toast.error(prettifyError(error.response.data.errors[0].msg))
        }
    };


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md p-4 bg-white border border-spacing-1 border-main-300 shadow-md rounded-lg ">
                <div className="mb-4">
                    <label htmlFor="image1" className="block text-sm font-medium text-main-secondary">
                        Upload ID (Front)
                    </label>
                    <input
                        type="file"
                        id="image1"
                        className="relative block w-full rounded-lg border border-gray-200 py-3 px-5 text-main-secondary text-black outline-none focus:border-main-yellow-600 focus-visible:ring-main-yellow-600"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'id_image_front')}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image2" className="block text-sm font-medium text-main-secondary">
                        Upload ID (Back)
                    </label>
                    <input
                        type="file"
                        id="image2"
                        className="relative block w-full rounded-lg border border-gray-200 py-3 px-5 text-main-secondary text-black outline-none focus:border-main-yellow-600 focus-visible:ring-main-yellow-600"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'id_image_back')}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image3" className="block text-sm font-medium text-main-secondary">
                        Upload Personal Image
                    </label>
                    <input
                        type="file"
                        id="image3"
                        className="relative block w-full rounded-lg border border-gray-200 py-3 px-5 text-main-secondary text-black outline-none focus:border-main-yellow-600 focus-visible:ring-main-yellow-600"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'image')}
                    />
                </div>
                {isMarried && <div className="mb-4">
                    <label htmlFor="image3" className="block text-sm font-medium text-main-secondary">
                        Upload Marriage Document
                    </label>
                    <input
                        type="file"
                        id="image3"
                        className="relative block w-full rounded-lg border border-gray-200 py-3 px-5 text-main-secondary text-black outline-none focus:border-main-yellow-600 focus-visible:ring-main-yellow-600"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'mariage_document')}
                    />
                </div>}
                <div className='mb-4'>
                    <label className="block text-sm font-medium text-main-secondary">
                        Are you married?
                    </label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="checkbox"
                            id="marriedYes"
                            name="marriedStatus"
                            checked={isMarried === true}
                            onChange={() => {
                                setIsMarried(true)
                                canUserSubmit()
                            }}
                            className="rounded border-gray-300 text-main-secondary focus:border-main-yellow-600 focus-visible:ring-main-yellow-600"
                        />
                        <label htmlFor="marriedYes" className="text-sm font-medium text-main-secondary">
                            Yes
                        </label>

                        <input
                            type="checkbox"
                            id="marriedNo"
                            name="marriedStatus"
                            checked={isMarried === false}
                            onChange={() => {
                                setIsMarried(true)
                                canUserSubmit()
                            }}
                            className="rounded border-gray-300 text-main-secondary focus:border-main-yellow-600 focus-visible:ring-main-yellow-600"
                        />
                        <label htmlFor="marriedNo" className="text-sm font-medium text-main-secondary">
                            No
                        </label>
                    </div>
                </div>

                <Button variant="primary" onClick={handleSubmit} disabled={submitDisabled} className="w-full" >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default ImageUploadForm;
