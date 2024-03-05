import React from 'react'
import Modal from '@/app/components/Shared/Modal';
import { format } from 'date-fns';
import Link from "next/link"
import Button from '@/app/components/Shared/Button';
import Typography from "@/app/components/Shared/Typography"
import { axiosClient as axios } from "../../services/axiosClient"

const DisplayRentRequestModal = ({ hasARenterProperty, onSuccess, onFail, setApproveRent, approveRent }) => {

    const handleAcceptPropertyRent = async () => {
        const userStatusBody = {
            "is_user_approved": true
        }
        handleUpdateUserStatus(userStatusBody)
    }

    const handleRejectPropertyRent = async () => {
        const userStatusBody = {
            "is_user_approved": false
        }
        handleUpdateUserStatus(userStatusBody)
    }

    const handleUpdateUserStatus = async (body) => {
        try {
            let res = await axios.put(`/properties/${hasARenterProperty?._id}/user_status`, body)
            if (res.data.success) {
                onSuccess()
            }
        } catch (e) {
            onFail()
            console.error(e)
        }
    }
    return (
        <Modal isOpen={approveRent} onClose={() => setApproveRent(false)}>
            <Typography variant='h4' as='h4' className='text-center mb-1 text-black'>
                Approve Rent Request
            </Typography>
            <hr style={{ "background-color": "black", "height": "1px", "border": "none" }} />
            <div className='flex flex-col space-y-2 my-3'>
                <div className='flex flex-row justify-between'>
                    <p>Property: </p>
                    <p className='capitalize'>{hasARenterProperty?.title}</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <p>Start Date: </p>
                    <p className='capitalize'>{format(new Date(hasARenterProperty?.rent_details.start_date), "dd/MM/yyyy")}</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <p>End Date: </p>
                    <p className='capitalize'>{format(new Date(hasARenterProperty?.rent_details.end_date), "dd/MM/yyyy")}</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <p>Rent Type: </p>
                    <p className='capitalize'>{hasARenterProperty?.rent_details.rent_type}</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <p>Property Code: </p>
                    <p>{hasARenterProperty?.code.replace("_", " ")}</p>
                </div>
            </div>
            <hr style={{ "background-color": "black", "height": "1px", "border": "none" }} />
            <div className='flex justify-evenly mt-3'>
                <Button variant='primary' onClick={handleAcceptPropertyRent}>Accept</Button>
                <Button variant='primary' onClick={handleRejectPropertyRent}>Deny</Button>
            </div>
        </Modal>
    )
}

export default DisplayRentRequestModal