'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import SingleNotification from './SingleNotification';
import Typography from "@/src/app/[locale]/components/Shared/Typography"
import { axiosClient as axios } from "../../services/axiosClient"
import { useRouter } from 'next/navigation';
import { useGetNotifications } from "../../user/userApi"
import Paginator from "@/src/app/[locale]/components/Shared/pagination/Pagination"
import { toast } from "react-toastify"
import RentRequestModal from "./RentRequestModal"
import Button from "../../components/Shared/Button"

const NotificationsContent = () => {
    const { data: session } = useSession();
    const [notifications, setNotifications] = useState([]);
    const [selectedNotification, setSelectedNotifiction] = useState()
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [approveRent, setApproveRent] = useState(false)
    const [hasARenterProperty, setHasARenterProperty] = useState({})
    const { data, refetch } = useGetNotifications(page, session?.user?.accessToken)

    useEffect(() => {
        refetch()
    }, [session, page, refetch])

    useEffect(() => {

        if (data?.data.length > 0) {
            setNotifications(data?.data)
        }
    }, [data])

    const updateNotificationIsRead = async (id) => {
        let body = {
            "is_read": true
        }
        try {
            let res = await axios.put(`/notifications/${id}`, body)
            if (res.data.success) {
                refetch()
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handleReadAllNotifications = async () => {
        let readAllBody = {
            "is_read": true
        }
        try {
            let res = await axios.put("/notifications/update_all", readAllBody)
            if (res.data.success) {
                refetch()
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handleNotificationClick = async (id, type) => {
        let notification = notifications.find(n => n._id === id)
        setSelectedNotifiction(notification)
        switch (type) {
            case "installment":
                router.push(`/user?tab=my-requests`)
                break;
            case "end_contract":
                router.push(`/user?tab=my-real-estates`)
                break;
            case "disclaimer":
                router.push(`/user?tab=my-real-estates`)
                break;
            case "extend_invoice":
                router.push(`/user?tab=my-real-estates`)
                break;
            case "tour":
                router.push(`/user?tab=my-requests`)
                break;
            case "prizes":
                router.push(`/user?tab=wallet`)
                break;
            case "property":
                if (!notification.is_read) {
                    setApproveRent(prev => {
                        setHasARenterProperty(notification)
                        return true
                    })
                } else {
                    router.push("/user?tab=my-real-estates")
                }
                break;
        }
        if (!notification.is_read && notification.type !== "property") {
            updateNotificationIsRead(id)
        }
    }

    return (
        <>
            <div className='flex flex-col items-center'>
                <div className='flex flex-row w-full my-2 items-center justify-evenly'>
                    <div className='w-1/3' />
                    <div className='w-1/2 justify-center'>
                        <Typography
                            variant="body-lg-bold"
                            as="h4"
                            className="px-4 ml-2 my-4 text-nowrap capitalize text-gray-900"
                        >
                            All Notifications
                        </Typography>
                    </div>
                    <div className='w-1/6 items-end justify-end'>
                        <Button variant='primary-outline' disabled={notifications?.every(n => n.is_read)} onClick={handleReadAllNotifications}>
                            Read all
                        </Button>
                    </div>
                </div>
                <div className="border border-gray-200 rounded-lg w-[330px] md:w-[500px] min-h-[200px] space-y-3 px-2 py-3 overflow-y-auto">
                    {notifications && notifications.length ?
                        notifications.map((n, i) => (
                            <SingleNotification key={i} notification={n} onClickNotification={(id, type) => handleNotificationClick(id, type)} />
                        ))
                        :
                        <Typography variant='body-md-bold' as='h4' className='text-center text-gray-500'>
                            You don&apos;t have any new notifications
                        </Typography>
                    }
                </div>
                <Paginator
                    lastPage={data?.pages}
                    page={page}
                    onChange={(e) => setPage(e)}
                />
            </div>
            {approveRent && <RentRequestModal
                hasARenterProperty={hasARenterProperty}
                setApproveRent={setApproveRent}
                approveRent={approveRent}
                onSuccess={() => {
                    toast.success("Rent status updated successfully!")
                    setApproveRent(false)
                    updateNotificationIsRead(selectedNotification._id)
                    setTimeout(() => {
                        router.push("/user?tab=my-real-estates")
                    }, 3000)
                }}
                onFail={() => {
                    toast.error("Something went wrong!")
                    setApproveRent(false)
                }}
            />}
        </>
    )
}

export default NotificationsContent