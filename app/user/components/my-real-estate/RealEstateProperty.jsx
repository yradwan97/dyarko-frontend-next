import propertyOne from "../../../../public/assets/property-1.png";
import Typography from "../../../components/Shared/Typography";
import AddWishlist from "../../../landingPage/properties/AddWishList";
import Price from "../../../landingPage/properties/Price";
import TopBadge from "../../../landingPage/properties/TopBadge";
import Link from "next/link";
import StatusButton from "./StatusButton";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { capitalizeFirst, fixImageSource, getPropertyPeriod, getPropertyPrice, prettifyError } from "@/app/utils/utils";
import { Menu, MenuItem } from "@mui/material";
import menuImage from "@/public/assets/menu.png";
import { axiosClient as axios } from "@/app/services/axiosClient"
import { useSession } from "next-auth/react";
import { toast } from "react-toastify"
import Modal from "../../../components/Shared/Modal"
import Input from "../../../components/Shared/Form/Input"
import Button from "../../../components/Shared/Button"
import Line from "@/app/property-search/components/Line";

function RealEstateProperty({ property, onShowInvoices, }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const [services, setServices] = useState([])
  const [showReason, setShowReason] = useState(false)
  const [reason, setReason] = useState("")
  const [selectedService, setSelectedService] = useState()
  const [showServicesModal, setShowServicesModal] = useState(false)

  const { data: session } = useSession()

  const getServices = async () => {
    try {
      let res = await axios.get("/additional_services")

      if (res.status === 200) {
        setServices(res.data.data)
      }
    } catch (e) {
      console.error(e)
      toast.error(e)
    }
  }

  useEffect(() => {
    if (session && services.length === 0) {
      getServices()
    }
  }, [session])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectService = async (service) => {

    const body = {
      property: property._id,
      service: service._id
    }
    try {
      let response = await axios.post("/additional_service_requests", body)
      console.log(response)
      if (response.data.success) {
        toast.success(`Service: ${service.name} requested successfully. Pending confirmation.`)
        setShowServicesModal(false)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleMenuItemClick = async (event) => {

    if (event.target.textContent === "Financial Discharge") {
      try {
        let response = await axios.post(`/disclaimer/${property?._id}`)
        if (response.data.success) {
          toast.success("Request created successfully. Pending owner confirmation.")
        }
      } catch (e) {
        toast.error(prettifyError(e.response.data.errors[0].msg))
      }

    } else if (event.target.textContent === "Services") {
      setShowServicesModal(true)
    } else if (event.target.textContent === "Terminate Contract") {
      setShowReason(true)
    } else if (event.target.textContent === "Invoices") {
      onShowInvoices(property?._id)
    }
    handleClose()
  };

  const handleTerminateContract = async () => {

    let body = {
      "causes": reason,
      "property": property._id
    }
    try {
      let response = await axios.post("/end_contract", body)

      if (response.data.success) {
        toast.success("Contract termination request submitted. Pending owner confirmation.")
      }
    } catch (e) {
      console.error(e)
      toast.error(`Something went wrong: ${e}`)
    } finally {
      setShowReason(false)
    }
  }

  return (

    <div className={`relative flex flex-col rounded-lg border border-main-200 p-1 md:flex-row`}>
      <StatusButton />
      <div className="relative">
        {property?.payment_type === "rent" && <TopBadge />}
        <Link href={`/property-details/${property?._id}`}>
          <Image
            src={fixImageSource(property?.image) || propertyOne}
            alt="property"
            className="h-[200px] w-full rounded-lg md:w-[200px]"
            width={250}
            height={250}
          />
        </Link>
      </div>
      <div className="flex-grow bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {property?.category !== ("tent_group" || "tent") && (
              <Price
                price={getPropertyPrice(property)}
                period={getPropertyPeriod(property)}
              />
            )}
          </div>
          <div className="flex items-center">
            <AddWishlist id={property?._id} />
            {property?.payment_type === "rent" && <div className="cursor-pointer ml-2" onClick={handleClick}>
              <Image src={menuImage} alt="menu" width={30} height={30} />
            </div>}
          </div>
        </div>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={(e) => handleMenuItemClick(e)}>Financial Discharge</MenuItem>
          <MenuItem onClick={(e) => handleMenuItemClick(e)}>Invoices</MenuItem>
          <MenuItem onClick={(e) => handleMenuItemClick(e)}>Services</MenuItem>
          <MenuItem onClick={(e) => handleMenuItemClick(e)}>Terminate Contract</MenuItem>
        </Menu>
        <Typography variant="h4" as="h4" className="mt-1">
          {capitalizeFirst(property?.title)}
        </Typography>
        <Typography variant="body-sm-medium" as="p" className="my-2 text-gray-500">
          {property?.locations.join(", ")}
        </Typography>
      </div>
      <Modal isOpen={showReason} onClose={() => setShowReason(false)}>
        <div className="flex flex-col space-y-3 items-center justify-center">
          <Input type="text" className="text-black" placeholder="Enter Termination Reason." value={reason} onChange={e => setReason(e.target.value)} />
          <div className="flex space-x-2 flex-row">
            <Button variant="primary" onClick={handleTerminateContract}>Submit</Button>
            <Button variant="primary" onClick={() => setShowReason(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={showServicesModal} onClose={() => setShowServicesModal(false)}>
        <div className="flex flex-col space-y-3 items-center justify-center">
          <Typography as="h1" variant="body-lg-medium">Available Services</Typography>
          {services.length === 0 ? (
            <Typography as="p" variant="body-sm-medium">No services are available</Typography>
          ) : (
            <>
              <Line />
              {services.map((service) => (
                <div key={service._id} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`${service._id}`}
                    name="selectedService"
                    className="capitalize text-black"
                    value={service.name}
                    onChange={() => setSelectedService(service)}
                  />
                  <label htmlFor={`service-${service._id}`}>
                    <Typography as="p" variant="body-sm-medium">
                      {service.name}
                    </Typography>
                  </label>
                </div>
              ))}


            </>
          )}
          <div className="flex flex-row space-x-2">
            {services && services.length > 0 && <Button className="mt-8" variant="primary" onClick={() => {
              handleSelectService(selectedService)
            }}>
              Submit
            </Button>}
            <Button className="mt-8" variant="primary" onClick={() => {
              setShowServicesModal(false)
            }}>
              Close
            </Button>
          </div>
        </div>
      </Modal>

    </div>


  );
}

export default RealEstateProperty;
