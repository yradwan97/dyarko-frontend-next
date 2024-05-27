import React from 'react'
import Button from "../../../components/Shared/Button"
import { axiosClient as axios } from "../../../services/axiosClient"
import { toast } from 'react-toastify'
import { prettifyError } from '@/src/app/[locale]/utils/utils'
import { useTranslations } from 'next-intl'

const MainWalletBalance = ({ user }) => {

  const t = useTranslations("Account.Wallet.MainWalletBalance")
  const handleCollectPrizes = async () => {
    try {
      const res = await axios.post("/prizes_requests")
      if (res.data.success) {
        toast.success(t("prizes-success"))
      }
    } catch (e) {
      console.error(e)
      let msg = e?.response?.data?.errors[0]?.msg
      toast.error(msg ? prettifyError(msg) : t("prizes-fail-fallback"))
    }
  }

  return (
    <>
      <div className="w-full lg:w-1/2 bg-walletBase justify-center rounded-md flex p-10">
        <div className='flex flex-col justify-center text-center'>
          <p className='font-bold'>{t("your-points")}</p>
          <h4 className='mt-2 text-white'>{user?.points} {t("points")}</h4>
        </div>
      </div>
      {user?.points > 0 && <div className="flex justify-center items-center mt-2">
        <Button variant="primary" onClick={handleCollectPrizes}>{t("collect")}</Button>
      </div>}
    </>
  )
}

export default MainWalletBalance