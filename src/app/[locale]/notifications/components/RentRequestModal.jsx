import React, { useEffect, useState } from 'react'
import Modal from '@/src/app/[locale]/components/Shared/Modal';
import { format } from 'date-fns';
import Button from '@/src/app/[locale]/components/Shared/Button';
import Typography from "@/src/app/[locale]/components/Shared/Typography"
import { axiosClient as axios } from "../../services/axiosClient"
import { useLocale, useTranslations } from 'next-intl';

const RentRequestModal = ({ hasARenterProperty, onSuccess, onFail, setApproveRent, approveRent }) => {
    // TODO: make sure rent amount is under name amount before submitting
    const t = useTranslations("Notifications.RentRequest")
    const isArabic = useLocale() === "ar"
    const [property, setProperty] = useState(null)
    useEffect(() => {
        console.log(property)
    }, [property]);
    useEffect(() => {
        if (hasARenterProperty) {
            setProperty(hasARenterProperty)
        }
    }, [hasARenterProperty]);

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
            let res = await axios.put(`/properties/${property?._id}/user_status`, body)
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
                {t("title")}
            </Typography>
            <hr style={{ "background-color": "black", "height": "1px", "border": "none" }} />
            <div className='flex flex-col space-y-2 my-3'>
                <div className={`flex ${isArabic ? "flex-row-reverse" : "flex-row"} justify-between`}>
                    <p>{t("property")} </p>
                    <p className='capitalize'>{property?.title}</p>
                </div>
                <div className={`flex ${isArabic ? "flex-row-reverse" : "flex-row"} justify-between`}>
                    <p>{t("code")} </p>
                    <p>{property?.code}</p>
                </div>
                <div className={`flex ${isArabic ? "flex-row-reverse" : "flex-row"} justify-between`}>
                    <p>{t("start")} </p>
                    <p className='capitalize'>{new Date(property?.rent_details?.start_date).toLocaleDateString()}</p>
                </div>
                <div className={`flex ${isArabic ? "flex-row-reverse" : "flex-row"} justify-between`}>
                    <p>{t("end")} </p>
                    <p className='capitalize'>{new Date(property?.rent_details?.end_date).toLocaleDateString()}</p>
                </div>
                <div className={`flex ${isArabic ? "flex-row-reverse" : "flex-row"} justify-between`}>
                    <p>{t("type")} </p>
                    <p className='capitalize'>{property?.rent_details.rent_type}</p>
                </div>
                <div className={`flex ${isArabic ? "flex-row-reverse" : "flex-row"} justify-between`}>
                    <p>{t("amount")} </p>
                    <div className={`flex gap-x-2 ${isArabic ? "flex-row-reverse" : "flex-row"}`}>
                        <p className='capitalize text-main-yellow-600'>{property?.rent_details.amount} </p>
                        <p className='capitalize'>{t("kwd")}</p>
                    </div>
                </div>

            </div>
            <hr style={{ "backgroundColor": "black", "height": "1px", "border": "none" }} />
            <div className={`flex justify-evenly ${isArabic ? "flex-row-reverse" : "flex-row"} mt-3`}>
                <Button variant='primary' onClick={handleAcceptPropertyRent}>{t("accept")}</Button>
                <Button variant='primary' onClick={handleRejectPropertyRent}>{t("deny")}</Button>
            </div>
        </Modal>
    )
}

export default RentRequestModal