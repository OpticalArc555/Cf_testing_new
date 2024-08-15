/* eslint-disable no-unused-vars */
import { useGetAllDealerPendingBookingQuery } from "../../services/dealerAPI";
import { useParams } from "react-router-dom";
import DealerCarPendingRequest from "../../components/carDetails/DealerCarPendingRequest";
import { useState } from "react";
import { Button, CardFooter, Typography } from "@material-tailwind/react";

const DealerAllPendingRequest = () => {
  const { id } = useParams();
  const [pageNo, setPageNo] = useState(0);

  const { data, isLoading, error ,refetch } = useGetAllDealerPendingBookingQuery({
    id,
    pageNo,
  });

  const nextHandler = () => {
    setPageNo((prePageNo) => {
      if (error?.status === 404) {
        console.log("You are on the last page.");
      } else {
        return prePageNo + 1;
      }
    });
  };

  const renderData = data?.list.map((item, index) => {
    return (
      <div key={index} className="mt-5">
        <DealerCarPendingRequest item={item} refetch={refetch} />
      </div>
    );
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }

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
              disabled={data?.list?.length < 10}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-y-4 lg:grid lg:grid-cols-2">
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

export default DealerAllPendingRequest;
