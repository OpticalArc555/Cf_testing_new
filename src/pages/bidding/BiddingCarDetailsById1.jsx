/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

// import CarView from "../../components/carDetails/CarView";
// import PriceCard from "../../components/carDetails/PriceCard";
import { useParams } from "react-router-dom";
import {
  useGetbeadingCarImageQuery,
  useGetbeadingCarByIdQuery,
} from "../../services/biddingAPI";
// import { redirectToSignIn } from "../services/apiSlice";
import { useNavigate } from "react-router-dom";
import BiddingCarView from "./BiddingCarView";
import BiddingPriceCard from "./BiddingPriceCard";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useWebSocket } from "../../Utiles/WebSocketConnection";

export default function BiddingCarDetailsById1() {
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);
  const [topThreeBids, setTopThreeBids] = useState([]);
  const [client, setClient] = useState(null);
  const { beadingCarId, bidCarId } = useParams();
  const [isConnected, setIsConnected] = useState(false); // New state variable
  const { data, isLoading, error } = useGetbeadingCarByIdQuery(beadingCarId);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error?.status === 401) {
    navigate("/signin");
    return null;
  }
  
  const {
    buttonStart,
    abs,
    sunroof,
    airbag,
    childSafetyLocks,
    acFeature,
    musicFeature,
    powerWindowFeature,
    rearParkingCameraFeature,
    price,
    brand,
    fuelType,
    kmDriven,
    ownerSerial,
    year,
    model,
    registration,
    area,
    transmission,
    carInsurance,
    city,
    color,
    bodyType,
    dealerId,
    insurancedate,
    carInsuranceType,
    insuranceType,
  } = data;

  const handleMessage = (msg, action) => {
    if (action == "error") {
      toast.error(msg);
    } else {
      toast.success(msg);
    }
  }

  return (
    <div className="grid grid-flow-row-dense md:grid-cols-3 gap-4 container mx-auto">
      <div className="p-4 md:col-span-2 no-scrollbar">
        <ToastContainer />
        <BiddingCarView
          beadingCarId={beadingCarId}
          fuelType={fuelType}
          registration={registration}
          ownerSerial={ownerSerial}
          transmission={transmission}
          year={year}
          carInsurance={carInsurance}
          insurancedate={insurancedate}
          insuranceType={insuranceType}
          carInsuranceType={carInsuranceType}
          kmDriven={kmDriven}
          acFeature={acFeature}
          musicFeature={musicFeature}
          powerWindowFeature={powerWindowFeature}
          rearParkingCameraFeature={rearParkingCameraFeature}
          childSafetyLocks={childSafetyLocks}
          abs={abs}
          buttonStart={buttonStart}
          sunroof={sunroof}
          airbag={airbag}
        />
      </div>
      <div className="md:col-span-1 sticky top-0">
        <BiddingPriceCard
          beadingCarId={beadingCarId}
          bidCarId={bidCarId}
          // getTopThreeBids={getTopThreeBids}
          topThreeBids={topThreeBids}
          // placeBid={handlePlaceBid}
          handleMessage={handleMessage}
          price={price}
          brand={brand}
          fuelType={fuelType}
          kmDriven={kmDriven}
          ownerSerial={ownerSerial}
          year={year}
          model={model}
          registration={registration}
          area={area}
          city={city}
          color={color}
          bodyType={bodyType}
          dealer_id={dealerId}
        />
      </div>
    </div>
  );
}
