import propertyOne from "../../../../public/assets/property-1.png";
import Typography from "../../../components/Shared/Typography"
import BathSolid from "../../../components/UI/icons/BathSolid"
import BedSolid from "../../../components/UI/icons/BedSolid"
import SquareOutline from "../../../components/UI/icons/SquareOutline"
import Image from "next/image"
import AddWishlist from "../../../landingPage/properties/AddWishList";
import Price from "../../../landingPage/properties/Price";
import TopBadge from "../../../landingPage/properties/TopBadge";
import Link from "next/link";
import RequestBadge from "./RequestBadge";
import Button from "../../../components/Shared/Button"
import { capitalizeFirst, format, getPropertyPeriod, getPropertyPrice, prettifyError } from "../../../utils/utils";
import { useState } from "react";
import Modal from "../../../components/Shared/Modal"
import { format as formatDate } from "date-fns"
import { axiosClient as axios } from "../../../services/axiosClient"
import { toast } from "react-toastify"

const stylesMap = {
  pending: "bg-main-orange-600",
  visited: "bg-main-yellow-600",
  approved: "bg-main-600"
}


function RequestProperty({ badge, request, activeTab }) {
  let { property, owner_status, user_status } = request
  const [showInstallmentPlanModal, setShowInstallmentPlanModal] = useState(false)

  const showInstallmentButton = () => {
    // Check the conditions for showing the button
    return (
      property?.payment_type === "installment" &&
      property?.max_installment_period &&
      property?.down_payment &&
      owner_status === "approved" &&
      user_status === "pending"
    );
  };

  const handleUserAction = async (e) => {

    let body = {
      "status": e.target.textContent === "Accept" ? "approved" : "rejected"
    }
    try {
      let res = await axios.put(`/installments/${request?._id}/user`, body)
      if (res.data.success) {
        setShowInstallmentPlanModal(false)
        toast.success(`Installment plan ${e.target.textContent === "Accept" ? "accepted" : "rejected"} successfully.`)
      }
    } catch (e) {
      toast.error(prettifyError(e.response.data.errors[0].msg))
    }
  }
  let remaining = property?.price - property?.down_payment
  let periods = property?.installment_type === "yearly" ? 1 : property?.installment_type === "monthly" ? 12 : property?.installment_type === "quarterly" ? 4 : 12
  let startingDate = property?.start_date ? new Date(property?.start_date) : new Date()
  let amount = request?.amount ? request?.amount : remaining / (property?.max_installment_period * periods)

  return (
    <div className={`relative flex flex-col rounded-lg border border-main-200 p-1 md:flex-row`}>
      {activeTab === 1 && <RequestBadge text={badge || "visited"} bgColor={stylesMap[badge]} />}
      <div className="relative">
        {property?.payment_type === "rent" && <TopBadge />}
        <Link href={`/property-details/${property?._id}`}>
          <Image
            src={property?.image || propertyOne}
            alt="property"
            className="h-[200px] w-full rounded-lg md:w-[200px]"
            width={150}
            height={150}
          />
        </Link>
      </div>
      <div className="flex-grow bg-white p-4">
        <div className="flex items-center justify-between">
          <Price paymentType={property?.payment_type} price={getPropertyPrice(property)} period={getPropertyPeriod(property)} />
          <AddWishlist property={property} id={property?._id} />
          {showInstallmentButton() && (
            <Button
              variant="primary"
              onClick={() => setShowInstallmentPlanModal(true)}
            >
              Review Installment Plan
            </Button>
          )}
        </div>
        <Typography variant="h4" as="h4" className="mt-1">
          {capitalizeFirst(property?.title)}
        </Typography>
        <Typography
          variant="body-sm-medium"
          as="p"
          className="my-2 text-gray-500"
        >
          {property?.locations.join(", ")}
        </Typography>
        <div className="mt-5 mb-4 flex items-center justify-between space-x-4 border-t border-main-100 pt-3 md:justify-start">
          <div className="flex items-end justify-between space-x-2">
            <BedSolid className="h-4 w-4 fill-main-600" />
            <Typography
              variant="body-xs-medium"
              as="p"
              className="text-gray-500 "
            >
              {property?.bedrooms || 0} Beds
            </Typography>
          </div>
          <div className="flex items-end justify-between space-x-2 py-2">
            <BathSolid className="h-4 w-4 fill-main-600" />
            <Typography
              variant="body-xs-medium"
              as="p"
              className="text-gray-500 "
            >
              {property?.bathrooms || 0} Bathrooms
            </Typography>
          </div>
          <div className="flex items-end justify-between space-x-2">
            <SquareOutline className="h-4 w-4 stroke-main-600" />
            <Typography
              variant="body-xs-medium"
              as="p"
              className="text-gray-500 "
            >
              {property?.area || 0} m²
            </Typography>
          </div>
        </div>
      </div>
      <Modal isOpen={showInstallmentPlanModal} onClose={() => setShowInstallmentPlanModal(false)}>
        <Typography as="h2" variant="body-lg-bold">
          Your approved installment details:
        </Typography>
        <div className="flex flex-col mt-3 space-y-2">
          <div className="flex flex-row justify-between">
            <label htmlFor="downPayment">Down Payment: </label>
            <input className="w-1/3 bg-white text-main-yellow-400" type="text" disabled id="downPayment" value={format(property?.down_payment)} />
          </div>
          <div className="flex flex-row justify-between">
            <label htmlFor="maxPeriod">Maximum Installment Period: </label>
            <input className="w-1/3 bg-white" type="text" disabled id="maxPeriod" value={`${property?.max_installment_period} years`} />
          </div>
          <div className="flex flex-row justify-between">
            <label htmlFor="installmentType">Payment Frequency: </label>
            <input className="w-1/3 bg-white capitalize" type="text" disabled id="installmentType" value={property?.installment_type || "monthly"} />
          </div>
          <div className="flex flex-row justify-between">
            <label htmlFor="startDate">Start Date: </label>
            <input className="w-1/3 bg-white" type="text" disabled id="startDate" value={formatDate(startingDate, "dd/MM/yyyy")} />
          </div>
          <div className="flex flex-row justify-between">
            <label htmlFor="amount">Amount: </label>
            <input className="w-1/3 bg-white text-main-yellow-400" type="text" disabled id="amount" value={format(amount)} />
          </div>
          <div className="flex flex-row justify-between">
            <label htmlFor="price">Total Price: </label>
            <input className="w-1/3 bg-white text-main-yellow-400" type="text" disabled id="price" value={format(property?.price)} />
          </div>
          <div className="flex flex-row pt-4 justify-evenly">
            <Button variant="primary" onClick={handleUserAction}>
              Accept
            </Button>
            <Button variant="primary-outline" onClick={handleUserAction}>
              Reject
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default RequestProperty;
