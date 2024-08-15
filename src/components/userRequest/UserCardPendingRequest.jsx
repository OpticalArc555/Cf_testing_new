/* eslint-disable react/prop-types */

import { Button, CardHeader, Chip } from "@material-tailwind/react";
import CardUi from "../../ui/CardUi";
import { Link } from "react-router-dom";
import { CarouselCustomArrows } from "../../ui/CarouselCustomArrows";

const UserCardPendingRequest = ({ item }) => {
  
  const carid = item?.carId;
  return (
    <div className="w-96px items-center flex justify-center mx-8">
      <div className="shadow-xl rounded-lg">
        <CardUi>
          <div className="md:min-w-[20rem] lg:min-w-[26rem] min-w-[20rem]">
            <div className="flex-col md:flex md:flex-row md:w-full">
              <div className="w-full p-4">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none"
                >
                  <Link to={`/carlist/cardetails/${carid}`}>
                    <CarouselCustomArrows carId={carid}/>
                  </Link>
                </CardHeader>
              </div>
              <div className="w-full flex justify-center">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between gap-5 md:gap-1">
                    <div>
                      <Chip
                        variant="outlined"
                        value={`${item?.date}`}
                        className="rounded-full font-[latto] -ml-2 md:text-sm text-xs"
                      ></Chip>
                    </div>
                    <div>
                      <Chip
                        color="amber"
                        value={`${item?.status}`}
                        className="font-[latto] md:text-sm text-xs"
                      ></Chip>
                    </div>
                  </div>
                  <div className="text-sm md:text-lg mt-3 font-[latto] font-medium text-black">
                    Car Price:₹{item?.price}
                  </div>
                  <div className=" mt-3 font-[latto] text-sm md:text-lg font-medium text-black">
                    Asking Price:₹{item?.askingPrice}
                  </div>

                  <Link to={`/carlist/cardetails/${item?.carId}`}>
                    <Button className="flex gap-2 bg-indigo-500 items-center mt-3 mb-3 md:mb-0 font-[latto]">
                      <span className="text-xs">Car Details </span>
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
                </div>
              </div>
            </div>
          </div>
        </CardUi>
      </div>
    </div>
  );
};

export default UserCardPendingRequest;
