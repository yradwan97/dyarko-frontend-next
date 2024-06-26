import React, { useEffect, useState } from 'react'
import Line from '../../property-search/components/Line'
import Button from '../../components/Shared/Button'
import Typography from '../../components/Shared/Typography'
import DocumentOutline from '../../components/UI/icons/DocumentOutline'
import LocationControlSolid from '../../components/UI/icons/LocationControlSolid'
import ScheduleTour from './ScheduleTour'
import { getPropertyPeriod, getPropertyPrice, prettifyError } from '@/src/app/[locale]/utils/utils'
import { axiosClient as axios } from "@/src/app/[locale]/services/axiosClient"
import { useSession } from 'next-auth/react'
import { toast } from "react-toastify"
import Modal from "@/src/app/[locale]/components/Shared/Modal"
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'


function ReservationBox({ property }) {
    const [visible, setVisible] = useState(false)
    const { data: session } = useSession()
    const [confirmedUser, setConfirmedUser] = useState(false)
    const [isContactOwnerOpen, setIsContactOwnerOpen] = useState(false)
    const router = useRouter()
    const isTentGroup = property?.category === "tent_group"
    const isReplacement = property?.payment_type === "replacement"
    const t = useTranslations("Properties.Details.Reservations")
    const tPrice = useTranslations("Properties.Price")
    const tCategories = useTranslations("General.Categories")
    const locale = useLocale()

    useEffect(() => {
        if (session) {
            const isUserConfirmed = async () => {
                try {
                    let res = await axios.get("/otp_requests/check", {
                        headers: {
                            "auth-token": `Bearer ${session?.user?.accessToken}`
                        }
                    })

                    if (res.data.success && res.data.status !== "has_pending_request" && res.data.status !== null) {
                        setConfirmedUser(true)
                    }
                } catch (e) {
                    console.error(e)
                }
            }

            isUserConfirmed()
        } else {
            router.push("/login")
        }
    }, [session, router])

    const decideSubmitButtonLinkHref = () => {
        if (property?.payment_type === "rent") {
            if (confirmedUser) {
                return `/application/${property?._id}`
            } else {
                return "/login/confirm"
            }

        } else if (property?.payment_type === "installment") {
            if (!confirmedUser) {
                return "/login/confirm"
            }
        } else {
            return ""
        }
    }

    const handleMainSubmitButtonClick = async () => {

        if (property.payment_type === "installment") {
            // this button is he request installment button
            let body = {
                "property": property?._id
            }
            try {
                let response = await axios.post("/installments", body, {
                    headers: {
                        "auth-token": `Bearer ${session?.user?.accessToken}`
                    }
                })

                if (response.status === 200) {
                    toast.success("Installment requested successfully, pending owner confirmtaion.")
                }
            } catch (e) {
                toast.error(prettifyError(e.response.data.errors[0].msg))
            }
        } else if (property.payment_type === "rent") {
            // if property is rent, it has a link to the renting application so no need to handle click.
            return
        } else {
            // if anything other that installment and rent, show contact owner modal.
            setIsContactOwnerOpen(true)

        }
    }

    return (
        <>
            <ScheduleTour id={property?.owner?._id} propertyId={property?._id} visible={visible} setVisible={setVisible} />
            <div className='border-[1.5px] border-gray-200 rounded-md p-6 '>
                {isTentGroup ?
                    <Typography variant='body-sm' as="h4" className="text-black text-center">
                        {t("tent-group")}
                    </Typography>
                    :
                    isReplacement ?
                        <Typography variant='body-md' as="h2" className="text-black text-center">
                            {t("replace-with")} {tCategories(property?.replace_with)}
                        </Typography>
                        :
                        <div className={`flex ${locale === "en" ? "flex-row" : "flex-row-reverse"} justify-between`}>
                            <div className={`flex flex-col ${locale === "en" ? "items-start" : "items-end"}`}>
                                <Typography variant='body-xs' as="span" className="text-main-secondary">{property?.payment_type === "rent" ? t("rent-price") : t("price")}</Typography>
                                <Typography variant='body-lg-bold' as="p" className="text-main-yellow-600">
                                    {property && getPropertyPrice(property)} {t("kwd")}
                                    {property?.payment_type === "rent" && <sub><Typography variant='body-xs' as="span" className="text-main-secondary"> / {property && tPrice(getPropertyPeriod(property))}</Typography></sub>}
                                </Typography>
                            </div>
                            {property?.min_months && <div className='flex flex-col items-center'>
                                <Typography variant='body-sm' as="span" className="text-main-secondary text-center">
                                    {t("min-months")}
                                </Typography>
                                <p className='text-main-yellow-600'>{property?.min_months}</p>
                            </div>
                            }
                        </div>
                }
                <Button
                    variant='primary'
                    className="stroke-white hover:stroke-main-600 my-6 flex justify-center items-center leading-6 w-full"
                    to={decideSubmitButtonLinkHref()}
                    onClick={handleMainSubmitButtonClick}
                >
                    <DocumentOutline className='stroke-inherit mr-1 w-5 h-5' />
                    <Typography variant='body-md-bold' as="span">{property && t(property?.payment_type)}</Typography>
                </Button>
                <Line />
                <Typography variant='body-lg-bold' as="p" className="my-6 text-center">{t("request-home-tour")}</Typography>

                <Button onClick={() => setVisible(true)} variant="primary" className="bottom-7 w-full left-7 !bg-main-blue !border-main-blue flex justify-center my-6 items-center">
                    <LocationControlSolid className='stroke-white w-5 h-5 mr-1' />
                    <Typography variant='body-sm-bold' as='span' className="text-white text-center transition-colors ease-in-out duration-500">{t("request-tour")}</Typography>
                </Button>
                <Typography variant='body-xs' as='span' className="text-gray-500 text-center">{t("tour-text")}</Typography>
            </div>
            <Modal isOpen={isContactOwnerOpen} onClose={() => setIsContactOwnerOpen(false)}>
                <Typography variant='body-lg-bold' as="p" className="">{t("OwnerModal.title")}</Typography>
                <Line />
                <div className='flex flex-row justify-between mt-4'>
                    <p>{t("OnwerModal.email")} </p>
                    <p>{property?.owner?.email}</p>
                </div>
                <div className='flex flex-row justify-between mt-2'>
                    <p>{t("OwnerModal.mobile")} </p>
                    <p>{property?.owner?.mobile}</p>
                </div>
            </Modal>
        </>
    )
}

export default ReservationBox