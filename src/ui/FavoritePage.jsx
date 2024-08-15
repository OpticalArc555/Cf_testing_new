/* eslint-disable no-unused-vars */
import React from "react";
import {  useNavigate } from "react-router-dom";
import {
  useGetbyUserCarIdQuery,
} from "../services/carAPI";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import FavCard from "./FavCard";

export function FavoritePage() {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  const UserId = jwtDecodes?.userId;
  const {
    data: userCars,
    error,
    isLoading,
    refetch
  } = useGetbyUserCarIdQuery({ UserId });
 
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error?.status === 401) {
    navigate("/signin");
    return null;
  }

  if (error && !isLoading && userCars) {
    refetch();
  }

  return (
    <>
      <div className="text-3xl font-bold mt-3 ml-16 mb-6">Favorite Page</div>
      <div className="md:grid md:grid-cols-2 md:mx-10 lg:grid lg:grid-cols-4 lg:mx-20 gap-x-4 gap-y-4">
        {userCars?.list &&
          userCars?.list?.map((data, key) => (
            <FavCard favoriteCarData={data} key={key} />
          ))}
      </div>
    </>
  );
}
