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
import InputGroup from "@/app/components/Shared/Form/InputGroup";
import { format } from "date-fns"


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ScheduleTour({ visible, setVisible, id }) {
  const { register, formState: { errors }, reset } = useForm();
  const { data: session } = useSession();
  const [selectedPeriod, setSelectedPeriod] = useState("AM");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
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
    const fetchAvailableTimeSlots = async () => {
      try {
        const response = await axios.get(`/Schedules/${id}`, {
          headers: {
            "auth-token": `Bearer ${session?.user?.accessToken}`
          }
        });
        console.log("schedule", response.data.data)
        setAvailableTimeSlots(response.data.data);
      } catch (error) {
        console.error("Error fetching unavailable time slots:", error);
      }
    };

    fetchAvailableTimeSlots();
  }, [id, session]);

  const isSlotAvailable = (slot) => {
    // return !unavailableTimeSlots.some(
    //   (unavailableSlot) =>
    //     new Date(unavailableSlot.from) <= new Date(slot) &&
    //     new Date(unavailableSlot.to) >= new Date(slot)
    // ); 
    return true
  };

  const handleTabClick = (period) => {
    setSelectedPeriod(period);
  };

  const handleSlotClick = (slot) => {
    if (isSlotAvailable(slot)) {
      setSelectedTimeSlot(slot);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const generateTimeSlots = () => {
    if (availableTimeSlots.length > 0) {
      // If availableTimeSlots is not an empty array, use it for rendering time slots
      return availableTimeSlots.map((slot) => {
        // console.log(format(new Date(slot.from), "dd/MM/yyyy HH:mm"), format(new Date(slot.to), "dd/MM/yyyy HH:mm"))
        return ({
          key: slot._id,
          from: format(new Date(slot.from), "dd/MM/yyyy HH:mm"),
          to: format(new Date(slot.to), "dd/MM/yyyy HH:mm"),
          slot: `${format(new Date(slot.from), "dd/MM/yyyy HH:mm")} - ${format(new Date(slot.to), "dd/MM/yyyy HH:mm")}`
        });
      });
    }


    // If availableTimeSlots is an empty array, generate time slots as before
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
      const from = `${formattedHour}:00`;
      const to = `${(hour + 1).toString().padStart(2, "0")}:00`
      const slot = `${from} - ${to}`
      const isSlotDisabled =
        (selectedPeriod === "AM" && parseInt(slot) >= 12) ||
        (selectedPeriod === "PM" && parseInt(slot) < 12)
      timeSlots.push({
        from,
        to,
        slot,
        isSlotDisabled
      });
    }

    return timeSlots;
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    if (availableTimeSlots.length === 0) {
      if (!selectedDate || selectedTimeSlot || !phoneNumber || !id) return
    } else {
      if (!phoneNumber || selectedTimeSlot || !id) return
    }

    const tourData = {
      date: format(new Date(selectedDate), "yyyy/MM/dd"),
      phone: phoneNumber,
      property: id
    }
    if (comment) tourData.comment = comment

    try {
      const response = await axios.post("/tours", tourData, {
        headers: {
          "auth-token": `Bearer ${session?.user?.accessToken}`
        }
      });

      // Handle success
      console.log("Tour added successfully:", response.data);
      // You can add any additional logic here, such as closing the dialog
      setVisible(false);
    } catch (error) {
      console.error("Error adding tour:", error);
      // Handle error, e.g., display an error message
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
        <div className="p-6">
          <div className="flex flex-col space-x-4 md:flex-row">
            <div className="md:w-1/2">
              <CalendarComponent onDateChange={handleDateChange} />
              <div className="mt-6 flex items-center justify-between">
                <Typography variant="body-md-bold" as="p">
                  Time Slot
                </Typography>
                <Tab.Group>
                  <Tab.List className="rounded-[12px] bg-main-100 p-[4px]">
                    {["AM", "PM"].map((tab) => (
                      <Tab
                        key={tab}
                        className={({ selected }) =>
                          classNames(
                            "rounded-lg p-2 text-xs",
                            selected
                              ? "bg-white font-bold text-main-yellow-600"
                              : "font-regular text-gray-500"
                          )
                        }
                        onClick={() => handleTabClick(tab)}
                      >
                        {tab}
                      </Tab>
                    ))}
                  </Tab.List>
                </Tab.Group>
              </div>
              <ul className="mt-2 grid grid-cols-2 gap-2.5 px-8 sm:grid-cols-3 md:px-0">
                {generateTimeSlots().map((slot, i) => {
                  // console.log(slot)
                  return (
                    <li
                      key={i}
                      className={`rounded-lg border py-2 px-4 text-xs font-bold ${slot.isSlotDisabled
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-black cursor-pointer"
                        } odd:border-gray-300 even:border-red even:text-red ${selectedTimeSlot === slot.slot
                          ? "bg-main-yellow-200"
                          : "hover:bg-gray-100"
                        }`}
                      onClick={() => handleSlotClick(slot.slot)}
                      style={{ opacity: slot.isSlotDisabled ? 0.5 : 1 }}
                    >
                      {slot.slot}
                    </li>
                  );
                })}
              </ul>
            </div>
            <form>

              <div className="mt-3 text-left md:mt-0 md:w-1/2">
                <InputGroup {...scheduleTourSchema.phoneNumber} register={scheduleTourSchema.phoneNumber.register} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                <div className="flex flex-col space-y-3">
                  <Label htmlFor="comment">Comments</Label>
                  <textarea
                    id="comment"
                    className="w-full rounded-lg border border-gray-200 py-4 px-6 outline-0 focus:border-main-600"
                    rows={6}
                    placeholder="Leave a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
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
    </Overlay>
  );
}

export default ScheduleTour;
