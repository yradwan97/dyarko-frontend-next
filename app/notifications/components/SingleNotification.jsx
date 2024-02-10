import React from 'react'
import Typography from "@/app/components/Shared/Typography"
import HomeSolid from "../../components/UI/icons/HomeSolid";


const SingleNotification = ({ notification, onClickNotification }) => {

    return (
        <div onClick={() => onClickNotification(notification._id, notification.type)} className={`flex flex-row space-x-4 hover:bg-main-100 ${!notification?.is_read ? `bg-main-200 cursor-pointer` : ""} border-b rounded-md mx-1 border-gray-300 px-5 py-3 last:border-b-0`}>

            <div className='flex items-center'>
                <span
                    className={`h-6 w-6 rounded-full ${"bg-red"} flex items-center justify-center`}
                >
                    <HomeSolid className="h-3 w-3 fill-white" />
                </span>
            </div>
            <div className="flex-col space-y-2">
                <Typography
                    variant="body-sm-bold"
                    as="h6"
                    className="text-black capitalize"
                >
                    {notification?.title_en}
                </Typography>
                <Typography
                    variant="body-xs-bold"
                    as="p"
                    className="text-gray-600"
                >
                    {notification?.body_en}
                </Typography>
                {notification?.property && <Typography
                    variant="body-xs-medium"
                    as="p"
                    className="text-gray-600"
                >
                    Property: {notification?.property.title}
                </Typography>}
            </div>
        </div>
    )
}

export default SingleNotification