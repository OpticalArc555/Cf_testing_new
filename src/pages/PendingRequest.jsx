/* eslint-disable no-unused-vars */
import { useState } from "react";
import UserCardPendingRequest from "../components/userRequest/UserCardPendingRequest";
import { useUserAllCarRequestQuery } from "../services/carAPI";
import { useParams } from "react-router-dom";
import { Button, CardFooter, Typography } from "@material-tailwind/react";
const PendingRequest = () => {
  const {userid} = useParams()
  const [pageNo , setPageNo] = useState(0)
  
  const { data, isLoading, error } = useUserAllCarRequestQuery({pageNo,userid});
  const nextHandler = () => {
    setPageNo((prePageNo) => {
      if (error?.status === 404) {
        console.log("You are on the last page.");
      }else{
        return prePageNo + 1;
      }
    })
  }
  const renderData = data?.list.map((item, index) => {
    
    return (
      <div key={index} className="mt-5">
        <UserCardPendingRequest item = {item} />
      </div>
    );
  });
  if (isLoading) {
    return <p>isLoading</p>;
  }
  if(error){
    return(
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
  )
}
  return (
    <>
      <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-3 gap-2 md:auto-cols-auto md:auto-rows-auto">
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
    </>
  );
};

export default PendingRequest;
