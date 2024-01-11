'use client'

import ReduxProvider from "../../../store/ReduxProvider"
import LoginForm from "../Login/LoginForm"

import React from 'react'

const ClientFormWrapper = () => {
  return (
    // <ReduxProvider>
        <LoginForm/>
    // </ReduxProvider>
  )
}

export default ClientFormWrapper