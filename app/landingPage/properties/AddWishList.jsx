'use client'
import HeartSolid from '../../components/UI/icons/HeartSolid'
import HeartOutline from '../../components/UI/icons/HeartOutline'
import { useState } from 'react'
import { axiosClient as axios } from "../../services/axiosClient"
import { useSession } from 'next-auth/react'

function AddWishlist({ location, id, property }) {

  const [pressed, setPressed] = useState(property?.saved > 0 || location === "savedProperties" || false)
  const { data: session } = useSession()

  const handleLikePressed = async (method) => {
    let response =
      method === "post" ?
        await axios.post(`/save_properties/${id}`) :
        await axios.delete(`/save_properties/${id}`)

    return response
  }
  return (

    <div className={`w-8 h-8 cursor-pointer ${pressed ? 'bg-main-100 border-main-100' : "border-main-200"} border  rounded-full flex justify-center items-center`}
      onClick={async () => {
        let response
        if (pressed) {
          response = handleLikePressed("delete")
        } else {
          response = handleLikePressed("post")
        }

        response.status === 200 && setPressed(!pressed)
      }}>
      {
        pressed ?
          <HeartSolid className='fill-red stroke-red w-4 h-4' />
          :
          <HeartOutline className='stroke-main-600 w-4 h-4' />
      }
    </div>


  )
}

export default AddWishlist