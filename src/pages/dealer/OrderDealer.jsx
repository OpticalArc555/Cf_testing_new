/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useCancelStatusSetMutation,
  useGetAllDealerCompleteBookingQuery,
} from "../../services/dealerAPI";
import CardUi from "../../ui/CardUi";
import {
  Button,
  CardFooter,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CarouselCustomArrows } from "../../ui/CarouselCustomArrows";
import { toast, ToastContainer } from "react-toastify";
const OrderDealer = () => {
  const { id } = useParams();

  const [pageNo, setPageNo] = useState(0);
  const [revertId, setRevertId] = useState("");

  const { data, error, isLoading, refetch } =
    useGetAllDealerCompleteBookingQuery({
      pageNo,
      id,
    });
 
  const [cancelStatusSet] = useCancelStatusSetMutation();

  const nextHandler = () => {
    setPageNo((prePageNo) => {
      if (error?.status === 404) {
        console.log("You are on the last page.");
      } else {
        return prePageNo + 1;
      }
    });
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = (revertID) => {
    setOpen(!open);
    setRevertId(revertID);
  };

  const handleRevertConfirmation = async () => {
    try {
      const res = await cancelStatusSet(revertId);
      toast.success(res?.data?.status);
      handleOpen(false);
      refetch();
      
    } catch (error) {
      console.log("Error :", error);
    }
  };

  if (error) {
    return (
      <div>
        <p>No Data Available</p>

        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography
            variant="medium"
            color="blue-gray"
            className="font-normal"
          >
            Page {pageNo + 1}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              disabled={pageNo <= 0}
              onClick={() => setPageNo((a) => a - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={nextHandler}
              disabled={data?.bookings?.length < 10}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </div>
    );
  }
  const renderData = data?.bookings?.map((item, index) => {
    const carid = item?.carId;
    return (
      <div className="md:mx-10 mx-5 mt-3 mb-3" key={index}>
        <CardUi>
          <div className="p-2 md:w-full md:px-5 md:py-3 md:flex md:gap-3">
            <div className="md:w-1/3">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <Link to={`/carlist/cardetails/${carid}`}>
                  <CarouselCustomArrows carId={carid} />
                </Link>
              </CardHeader>
            </div>
            <div>
              <p>
                Date:<span className="text-lg font-semibold">{item?.date}</span>
              </p>
              <p className="mt-2">
                Price:
                <span className="font-semibold text-lg">{item?.price}</span>
              </p>
              <div>
                <div className="font-[latto] mt-2 text-lg font-bold text-black">
                  Contact Details of the User
                </div>
                <div className="font-[latto] mt-1 text-base font-medium text-black">
                  User Name:{item?.firstName}
                </div>
                <div className="font-[latto] text-base font-medium text-black">
                  Contact No: {item?.mobileNo}
                </div>
              </div>
              <div className="flex gap-2 align-middle items-center">
                <Link to={`/carlist/cardetails/${item?.carId}`}>
                  <Button
                    fullWidth
                    className="flex items-center text-xs mt-5 bg-blue-400 w-full"
                  >
                    Car details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </Link>
                {item?.status === "cancel" ? (
                  <Button className="flex items-center text-xs gap-2 mt-5 bg-red-300">
                    Canceled Booking
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                ) : (
                  <Button
                    className="flex items-center text-xs gap-2 mt-5 bg-red-700"
                    onClick={() => handleOpen(item?.id)}
                  >
                    Cancel Booking
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardUi>
      </div>
    );
  });
  if (isLoading) {
    return <p>Loading.....</p>;
  }
  if (error) {
    return <p>No Data Available</p>;
  }
  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1 gap-y-4 lg:grid lg:grid-cols-2 lg:gap-y-4">
        {renderData}
      </div>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="medium" color="blue-gray" className="font-normal">
          Page {pageNo + 1}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            disabled={pageNo <= 0}
            onClick={() => setPageNo((a) => a - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={nextHandler}
            disabled={data?.list?.length < 10}
          >
            Next
          </Button>
        </div>
      </CardFooter>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Do you really want to Revert the Car?</DialogHeader>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleRevertConfirmation}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default OrderDealer;
