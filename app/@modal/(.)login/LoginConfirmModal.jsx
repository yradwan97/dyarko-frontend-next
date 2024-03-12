'use client'
import React from "react"
import { useRouter } from "next/navigation"
import Modal from "../../components/Shared/Modal"
import Typography from "../../components/Shared/Typography"
import Button from "../../components/Shared/Button"

const LoginConfirmModal = () => {
    const router = useRouter()
    const handleClose = () => {
        router.back()
    }
    return (
        <Modal isOpen={true} onClose={handleClose}>
            <div className="flex flex-col">
                <div className="flex flex-col px-1 pb-6 mb-2">
                    <Typography as="h4" variant="body-md-medium" className="text-center">
                        You will now be redirected to the login page.
                    </Typography>
                    <Typography as="h5" variant="body-sm-medium" className="text-center">
                        Are you sure you want to login?
                    </Typography>
                </div>
                <div className="flex justify-between flex-row">
                    <Button variant="primary" onClick={() => history.go(0)}>Login</Button>
                    <Button variant="primary" onClick={() => router.back()}>Continue Viewing</Button>
                </div>
            </div>
        </Modal>
    )
}

export default LoginConfirmModal