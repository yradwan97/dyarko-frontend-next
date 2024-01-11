'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import SingleNotification from './SingleNotification';
import Typography from "@/app/components/Shared/Typography"
import { axiosClient as axios } from "../../services/axiosClient"

const NotificationsContent = () => {
    const { data: session } = useSession();
    const [notifications, setNotifications] = useState([]);

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
                    setNotifications(response?.data.data);
                }
            }
        } catch (error) {
            // Handle errors if necessary
            console.error("Error fetching notifications:", error);
        }
    };

    let notif = {
        "_id": "6599951c54d2607f406d943e",
        "to": "user",
        "who": {
            "_id": "64ea01b3673c4413aad02baa",
            "name": "fady",
            "email": "fadyuser@mozej.com",
            "civilian_id": "12312312312315",
            "phone": "3123123123",
            "balance": null,
            "image": null
        },
        "is_read": false,
        "type": "disclaimer",
        "title_ar": "ابراء ذمة",
        "title_en": "disclaimer",
        "body_ar": "ركوست ابراء ذمة - كود الوحدة (dk_2)",
        "body_en": "request disclaimer - property code (dk_2)",
        "property": {
            "_id": "65425560daf0e7ae0b39c4a3",
            "auto_no": "7271727171",
            "title": "rent",
            "code": "dk_2",
            "__t": "propertyRentHouse",
            "image": null,
            "contract": null,
            "interior_design": null
        },
        "__v": 0
    }
    let notifs = Array(6).fill(notif)

    // TODO: remove above test notif

    const handleNotificationRead = async (id) => {
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
                        <SingleNotification key={i} notification={n} onReadNotification={(id) => handleNotificationRead(id)} />
                    ))
                    :
                    <Typography variant='body-md-bold' as='h4' className='text-center capitalize text-gray-500'>
                        You don't have any new notifications
                    </Typography>
                }
            </div>
        </div>
    )
}

export default NotificationsContent