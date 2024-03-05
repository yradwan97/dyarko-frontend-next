import { Dialog, Tab } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosClient as axios } from "@/app/services/axiosClient";
import Line from "../../property-search/components/Line";
import Overlay from "./Overlay";
import Button from "../../components/Shared/Button";
import Typography from "../../components/Shared/Typography";
import Label from "../../components/Shared/Form/Label";
import PhoneInput from "../../components/Shared/Form/PhoneInput";
import CloseOutline from "../../components/UI/icons/CloseOutline";
import CalendarComponent from "./Calendar/Calendar";
import { useSession } from "next-auth/react";
import { toast, Bounce } from "react-toastify"
import { format } from "date-fns"

function ScheduleTour({ visible, setVisible, id, propertyId }) {
  const { register, formState: { errors } } = useForm();
  const { data: session } = useSession();
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [comment, setComment] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")

  const scheduleTourSchema = {
    phoneNumber: {
      id: "phoneNumber",
      label: "Phone Number",
      placeholder: "5XXXXXXX",
      register: {
        ...register("phoneNumber", {
          required: "Phone Number is required",
          minLength: {
            value: 8,
            message: "Minimum character length is 8",
          },
        }),
      },
      error: errors.phoneNumber,
    },
  };

  useEffect(() => {
    if (visible) {
      const fetchAvailableTimeSlots = async () => {
        try {
          const response = await axios.get(`/Schedules/${id}`, {
            headers: {
              "auth-token": `Bearer ${session?.user?.accessToken}`
            }
          });


          setAvailableTimeSlots(response.data.data);
        } catch (error) {
          console.error("Error fetching unavailable time slots:", error);
        }
      };
      fetchAvailableTimeSlots();
    }

  }, [id, session, visible]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!selectedDate || !phoneNumber) {
      toast.error("Please make sure to select a date and enter your phone number!")
      return
    }

    const tourData = {
      date: format(new Date(selectedDate), "yyyy/MM/dd"),
      phone: phoneNumber,
      property: propertyId
    }
    if (comment) tourData.comment = comment

    try {
      const response = await axios.post("/tours", tourData, {
        headers: {
          "auth-token": `Bearer ${session?.user?.accessToken}`
        }
      });

      // Handle success
      
      if (response.data.success) {
        toast.success("Tour added successfully, pending owner confirmation.")
      }
      setVisible(false)
    } catch (error) {
      console.error("Error adding tour:", error);
    }
  };

  return (
    <Overlay visible={visible} setVisible={setVisible}>
      <Dialog.Panel className="relative my-8 mx-auto max-h-full w-full overflow-y-hidden bg-white hover:overflow-y-auto sm:rounded-lg md:w-8/12">
        <div className="flex items-center justify-between p-6">
          <Typography variant="h3" as="h3" className="text-black">
            Schedule a tour
          </Typography>
          <span
            className="flex items-center justify-center"
            onClick={() => setVisible(false)}
          >
            <CloseOutline className="h-4 w-4 cursor-pointer stroke-gray-500 stroke-2" />
          </span>
        </div>
        <Line />
        <div className="p-6 ">
          <div className="flex flex-col space-x-4 lg:flex-row">
            <div className="w-full lg:w-1/2">
              <CalendarComponent onDateChange={handleDateChange} dateRanges={availableTimeSlots} />
            </div>

            <form className="w-full lg:w-1/2">
              <div className="mt-3 lg:mt-0">
                <PhoneInput className="lg:w-full" {...scheduleTourSchema.phoneNumber} register={scheduleTourSchema.phoneNumber.register} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="comment">Comment</Label>
                  <textarea
                    id="comment"
                    className="rounded-lg border border-gray-200 py-4 px-6 outline-0 focus:border-main-600"
                    rows={6}
                    placeholder="Leave a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              variant="primary"
              type="submit"
              className="w-4/12 rounded-lg !py-2 md:w-3/12"
              onClick={onSubmit}
            >
              Add
            </Button>
          </div>
        </div>
      </Dialog.Panel>
    </Overlay >
  );
}

export default ScheduleTour;
