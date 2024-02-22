'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import SingleNotification from './SingleNotification';
import Typography from "@/app/components/Shared/Typography"
import { axiosClient as axios } from "../../services/axiosClient"
import { useRouter } from 'next/navigation';
import { useGetNotifications } from "../../user/userApi"
import Paginator from "@/app/components/Shared/pagination/Pagination"

const NotificationsContent = () => {
    const { data: session } = useSession();
    const [notifications, setNotifications] = useState([]);
    const router = useRouter()
    const [page, setPage] = useState(1)
    const { data, refetch } = useGetNotifications(page, session?.user?.accessToken)

    useEffect(() => {
        refetch()
    }, [session, page, refetch])

    useEffect(() => {
        console.log(data)
        if (data?.data.length > 0) {
            setNotifications(data?.data)
        }
    }, [data])

    const handleNotificationClick = async (id, type) => {
        let notification = notifications.find(n => n._id === id)
        console.log(notification)
        switch (type) {
            case "installment":
                router.push(`/user?request=installment`)
                break;
            case "end_contract":
                router.push(`/user?my-real-estates=true`)
                break;
            case "disclaimer":
                router.push(`/user?my-real-estates=true`)
                break;
            case "extend_invoice":
                router.push(`/user?my-real-estates=true`)
                break;
            case "tour":
                router.push(`/user?request=tour`)
                break;

        }
        if (!notification.is_read) {
            let body = {
                "is_read": true
            }
            let res = await axios.put(`/notifications/${id}`, body, {
                headers: {
                    "auth-token": `Bearer ${session?.user?.accessToken}`
                }
            })
            if (res.data.success) {
                refetch()
            }
        }
    }

    return (
        <div className='flex flex-col items-center'>
            <Typography
                variant="body-lg-bold"
                as="h4"
                className="px-5 my-4 capitalize text-gray-900"
            >
                All Notifications
            </Typography>
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
                lastPage={data?.pages || 1}
                page={page}
                onChange={(e) => setPage(e)}
            />
        </div>
    )
}

export default NotificationsContent