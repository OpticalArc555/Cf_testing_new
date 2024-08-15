/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useBiddingAllCardQuery, useGetByDealerIdQuery } from "../../services/biddingAPI";
import TableComponent from "../../components/table/TableComponent";
import { Link, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const BiddingDealerCars = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const UserID = jwtDecodes?.userId;
  const dealerId = jwtDecodes?.dealerId;
  const userRole = token ? jwtDecodes?.authorities[0] : null;
  const [pageNo, setPageNo] = useState(0);
  const [filteredData, setFilteredData] = useState(null);

  
  const dataQuery = (userRole === "DEALER") 
  ? useGetByDealerIdQuery( dealerId ) 
  : useBiddingAllCardQuery();

  const { data, isLoading, error } = dataQuery;
  const [totalCars, setTotalCars] = useState(data?.length || "-");
  const activeCarCount = data?.filter((car) => car.carStatus === "ACTIVE").length;
  const pendingCarCount = data?.filter((car) => car.carStatus === "pending").length;
  const soldCarCount = data?.filter((car) => car.carStatus === "sold").length;
  
  const [activeCars, setActiveCars] = useState(activeCarCount || "-");
  const [pendingCars, setPendingCars] = useState(pendingCarCount || "-");
  const [soldCars, setSoldCars] = useState(soldCarCount || "-");
  

  const itemsPerPage = 10;
  useEffect(() => {
    if (data) {
      setTotalCars(data?.length);
      setActiveCars(data?.filter((car) => car.carStatus === "ACTIVE").length);
      setPendingCars(data?.filter((car) => car.carStatus === "pending").length);
      setSoldCars(data?.filter((car) => car.carStatus === "sold").length);
      setFilteredData(data);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading..</p>;
  }

  // if (error?.status == 401) {
  //   navigate("/signin");
  // }

  const handleCardClick = (status) => {
    if (status === "ALL") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((car) => car?.carStatus === status));
    }
  };

  const columns = [
    {
      accessor: 'biddingTimerId',
      // show: true,
      isVisible: true
    },
    {
      Header: "ID",
      accessor: "beadingCarId",
    },
    {
      Header: "Brand",
      accessor: "brand",
    },
    {
      Header: "Model ",
      accessor: "model",
    },
    {
      Header: "Fuel Type",
      accessor: "fuelType",
    },
    {
      Header: "Year",
      accessor: "year",
    },
    {
      Header: "Price",
      accessor: "price",
      disableSortBy: true,
    },
    ...(userRole === "ADMIN" ||  userRole === "SALESPERSON"
      ? [
          {
            Header: "Inspection Report",
            accessor: "carStatus",
            Cell: (cell) => {
              

              return userRole === "DEALER" ? (
                <Link
                  to={`/dealer/finalreport/${cell.row.values.beadingCarId}`}
                  className="button-link"
                >
                  <Button variant="gradient" color="blue">
                    View Report
                  </Button>
                </Link>
              ) : cell.row.values.carStatus === "pending" ? (
                <Link to={userRole === "ADMIN" ?`/admin/carverify/${cell.row.values.beadingCarId}` : `/sale/carverify/${cell.row.values.beadingCarId}`}>
                  <Button variant="gradient" color="yellow">
                    Pending
                  </Button>
                </Link>
              ) : (
                <Link to={userRole === "ADMIN" ?`/admin/inspection/report/${cell.row.values.beadingCarId}` :`/sale/inspection/report/${cell.row.values.beadingCarId}`}>
                  <Button variant="gradient" color="green">
                    Done
                  </Button>
                </Link>
              );
            },
          },
        ]
      : []),
    {
      Header: "Action",
      accessor: "",
      Cell: (cell) => {
        const { beadingCarId, biddingTimerId } = cell.row.values;
        console.log("cell.row.values.biddingTimerId" ,biddingTimerId)
        return (
          <div>
           <div className="flex gap-2 justify-center items-center">
  <Link
    to={
      cell.row.values.biddingTimerId 
        ? `/biddinglist/cardetails/${cell.row.values.beadingCarId}/${cell.row.values.biddingTimerId}` 
        : `/biddinglist/cardetails/${cell.row.values.beadingCarId}`
    }
  >
    <Button className="bg-[#045e4f]">
    {userRole === "DEALER" 
    ? "Place Bidding" 
    : (userRole === "ADMIN" || userRole === "SALESPERSON") 
      ? (cell.row.values.biddingTimerId !== null
        ? "Update Bid Time" 
        : "Set Bid Time") 
      : ""
  }
    </Button>
  </Link>
</div>

          </div>
        );
      },
    },
  ];

  const startIndex = pageNo * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData ? filteredData.slice(startIndex, endIndex) : [];

  return (
    <>
      <h1 className="mt-2 text-xl ml-2 mb-5 font-bold">Car Listing</h1>
      <div className="flex flex-wrap justify-center divide-x-4 mx-5 mb-8">
        <div
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-5 text-center bg-[#FE9496] rounded-2xl shadow-xl mb-5 sm:mb-2 sm:mr-5 cursor-pointer"
          onClick={() => handleCardClick("ALL")}
        >
          <div className="text-4xl font-bold text-white">{totalCars}</div>
          <div className="mt-2 font-medium">Total Cars</div>
        </div>
        <div
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-5 text-center bg-[#4BCBEB] rounded-2xl shadow-xl mb-5 sm:mb-2 sm:mr-5 cursor-pointer"
          onClick={() => handleCardClick("ACTIVE")}
        >
          <div className="text-4xl font-bold text-white">
            {activeCars}/{totalCars}
          </div>
          <div className="mt-2 font-medium">Active Cars</div>
        </div>
        <div
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-5 text-center bg-[#9E58FF] rounded-2xl shadow-xl mb-5 sm:mb-2 sm:mr-5 cursor-pointer"
          onClick={() => handleCardClick("pending")}
        >
          <div className="text-4xl font-bold text-white">
            {pendingCars}/{totalCars}
          </div>
          <div className="mt-2 font-medium">Pending Cars</div>
        </div>
        <div
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-5 text-center bg-[#1DC9B7] rounded-2xl shadow-xl mb-5 sm:mb-2 sm:mr-5 cursor-pointer"
          onClick={() => handleCardClick("ACTIVE")}
        >
          <div className="text-4xl font-bold text-white">
            {activeCars}/{totalCars}
          </div>
          <div className="mt-2 font-medium">Inspection Done Cars</div>
        </div>
        <div
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-5 text-center bg-green-500 rounded-2xl shadow-xl sm:mb-2 sm:mr-5 cursor-pointer"
          onClick={() => handleCardClick("sold")}
        >
          <div className="text-4xl font-bold text-white">
            {soldCars}/{totalCars}
          </div>
          <div className="mt-2 font-medium">Sold Cars</div>
        </div>
      </div>

      <div>
        {error?.status === 404 ? (
          <div>
            <p className="text-3xl font-semibold ">{error?.data?.message}</p>
          </div>
        ) : (
          <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Bidding Car list
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    See information about all cars
                  </Typography>
                </div>
              </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
              <TableComponent columns={columns} data={paginatedData} />
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Button
                variant="outlined"
                color="blue-gray"
                size="sm"
                onClick={() => setPageNo((prev) => Math.max(prev - 1, 0))}
                disabled={pageNo === 0}
              >
                Previous
              </Button>
              <div className="flex items-center gap-2">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  Page {pageNo + 1} of {Math.ceil(filteredData?.length / itemsPerPage)}
                </Typography>
              </div>
              <Button
                variant="outlined"
                color="blue-gray"
                size="sm"
                onClick={() => setPageNo((prev) => prev + 1)}
                disabled={endIndex >= filteredData?.length}
              >
                Next
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
};

export default BiddingDealerCars;
