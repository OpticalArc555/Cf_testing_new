/* eslint-disable no-unused-vars */
import { useState } from "react";
import FilterCars from "../components/buyCar/FilterCars";
import GridCarList from "../components/buyCar/GridCarList";
import { useFilterCarQuery } from "../services/carAPI";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const BuyCar = () => {
  const [urlState, setUrlState] = useState(null);
 
  const { data, error, refetch } = useFilterCarQuery(urlState);

  const navigate = useNavigate();

  if (error?.status === 401) {
    Cookies.remove("token");
    navigate("/signin");
  }

  return (
    <>
      <div className="container mx-auto mt-12">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-5 lg:grid-cols-4 lg:gap-6">
          <div className="md:col-span-2 lg:col-span-1 top-0">
            <FilterCars setUrlState={setUrlState} onFilterChange={refetch} />
          </div>
          <div className="md:col-span-3 lg:col-span-3 no-scrollbar">
            {error?.status === 404 ? (
              <div>
                <p>No Data Available</p>
              </div>
            ) : ( 
              <GridCarList data={data} error={error} refetch={refetch} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyCar;
