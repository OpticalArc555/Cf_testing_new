/* eslint-disable react/prop-types */
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { CarouselCustomArrows } from "../CarouselCustomArrows";
import { Link } from "react-router-dom";

export function CardDefault2({ data }) {
 
  const carid = data?.carId;
  
  return (
    <Card className="mt-1 w-96 md:m-0 items-center max-w-[20rem] overflow-hidden">
      <div className="">
      <Link to={`/carlist/cardetails/${carid}`}>
        <CarouselCustomArrows carId={carid} />
        </Link>
      </div>
      <CardBody className="mb-5">
        <Typography>{data.year}</Typography>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {data.brand} {data.model}
        </Typography>
        <p className="text-xs font-medium uppercase flex-wrap ">
          <span className="bg-gray-200 p-[5px] mr-2 rounded-sm text-black">{data.kmDriven} KM</span>
          <span className="bg-gray-200 p-[5px] mr-2 rounded-sm text-black">{data.fuelType}</span>
          <span className="bg-gray-200 p-[5px] mr-2 rounded-sm text-black">{data.transmission}</span>
            
        </p>
        <Typography variant="h6" className="mt-2 font-bold text-xl text-black">₹ {data.price}</Typography>

        <Link to={`/carlist/cardetails/${data.carId}`}>
          {" "}
          <Button className="mt-2 mb-4 p-[8px] bg-indigo-500 rounded-lg text-white">View Car</Button>
        </Link>
        <hr />
        <p className="text-sm">Free Test Drive Today at {data.area}</p>
      </CardBody>
    
    </Card>
  );
}
