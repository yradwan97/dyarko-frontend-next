'use client'
import HeartSolid from '../../components/UI/icons/HeartSolid'
import HeartOutline from '../../components/UI/icons/HeartOutline'
import { useEffect, useState } from 'react'
import { axiosClient as axios } from "../../services/axiosClient"
import { useSession } from 'next-auth/react'
import { useIsPropertySaved } from '@/app/property-listing/propertiesApis'
import { ToastContainer, toast } from "react-toastify"

function AddWishlist({ location, id }) {

  const isLiked = useIsPropertySaved(id)
  const [pressed, setPressed] = useState(isLiked)
  const { data: session } = useSession()

  useEffect(() => {
    setPressed(isLiked)
  }, [isLiked])

  const handleLikePressed = async (method) => {
    try {
      let response =
        method === "post" ?
          await axios.post(`/save_properties/${id}`) :
          await axios.delete(`/save_properties/${id}`)

      return response
    } catch (e) {
      console.error(e)
    }
  }
  return (

    <div className={`w-8 h-8 cursor-pointer ${pressed ? 'bg-main-100 border-main-100' : "border-main-200"} border  rounded-full flex justify-center items-center`}
      onClick={async () => {
        let response
        if (pressed) {
          response = await handleLikePressed("delete")
        } else {
          response = await handleLikePressed("post")
        }

        if (response.status === 200) {
          setPressed(!pressed)
          if (pressed) {
            toast.warn("Property unsaved.")
          } else {
            toast.success("Property saved!")
          }
        } else {
          toast.error("Something went wrong")
        }

      }}>
      {
        pressed ?
          <HeartSolid className='fill-red stroke-red w-4 h-4' />
          :
          <HeartOutline className='stroke-main-600 w-4 h-4' />
      }
      <ToastContainer />
    </div>


  )
}

export default AddWishlist