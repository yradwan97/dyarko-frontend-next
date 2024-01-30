'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import SingleNotification from './SingleNotification';
import Typography from "@/app/components/Shared/Typography"
import { axiosClient as axios } from "../../services/axiosClient"
import { useRouter } from 'next/navigation';
const NotificationsContent = ({ onTriggerChange }) => {
    const { data: session } = useSession();
    const [notifications, setNotifications] = useState([]);
    const router = useRouter()

    const getNotifications = async () => {
        try {
            if (session) {
                const response = await axios.get("/notifications", {
                    headers: {
                        "auth-token": `Bearer ${session?.user.accessToken}`,
                        "Accept": "*/*",
                        "Content-Type": "application/json",
                    },
                });

                if (response?.data.message === "success") {
                    setNotifications(response.data.data.sort((a, b) => a.is_read - b.is_read));
                }
            }
        } catch (error) {
            // Handle errors if necessary
            console.error("Error fetching notifications:", error);
        }
    };

    const handleNotificationClick = async (id) => {
        let notification = notifications.find(n => n._id === id)
        if (notification.is_read) return

        console.log(notification)
        if (notification.type === "installment") {
            console.log("installment", notification.property._id)
            router.push(`/user?installment=${notification.property._id}`)
        }
        let body = {
            "is_read": true
        }
        let response = await axios.put(`/notifications/${id}`, body, {
            headers: {
                "auth-token": `Bearer ${session?.user?.accessToken}`
            }
        })

        if (response.data.success) {
            getNotifications()
            onTriggerChange()
        }

    }

    useEffect(() => {
        getNotifications();
    }, [session]);

    return (
        <div className='flex flex-col items-center'>
            <Typography
                variant="body-lg-bold"
                as="h4"
                className="px-5 my-4 capitalize text-gray-900"
            >
                All Notifications
            </Typography>
            <div className="border border-gray-200 rounded-lg w-[500px] min-h-[200px] space-y-3 px-2 py-3 overflow-y-auto">
                {notifications && notifications.length ?
                    notifications.map((n, i) => (
                        <SingleNotification key={i} notification={n} onReadNotification={(id) => handleNotificationClick(id)} />
                    ))
                    :
                    <Typography variant='body-md-bold' as='h4' className='text-center text-gray-500'>
                        You don't have any new notifications
                    </Typography>
                }
            </div>
        </div>
    )
}

export default NotificationsContent