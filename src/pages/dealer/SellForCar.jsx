/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useDealerIdByCarQuery } from "../../services/carAPI";
import { Tooltip } from "@material-tailwind/react";
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import TableComponent from "../../components/table/TableComponent";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Dialog,
  DialogFooter,
  DialogBody
} from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import { useCarRemoveMutation } from "../../services/carAPI";
import { MdPendingActions } from "react-icons/md";
import StatusDialogeBox from "../../ui/StatusDialogeBox";
//import AddDealerCar from "../../components/dealer/AddDealerCar";
import { useCarUpdateMutation } from "../../services/carAPI";

const SellForCar = () => {
  const [pageNo, setPageNo] = useState(0);
  const { id } = useParams();

  const [carRemove] = useCarRemoveMutation();
  const active = "ACTIVE";
  const pending = "PENDING";
  const sell = "SOLD";
  const deactive = "DEACTIVATE";
  const { data, isLoading, error } = useDealerIdByCarQuery({ id, pageNo ,status: active });
  const { data : pendingData, isLoading : pendingIsLoding, error : pendingerror } = useDealerIdByCarQuery({ id, pageNo ,status: pending });
  const { data : sellData, isLoading : sellIsLoding, error : sellerror } = useDealerIdByCarQuery({ id, pageNo ,status: sell });
  const { data : deactiveData, isLoading : deactiveIsLoding, error : deactiveerror } = useDealerIdByCarQuery({ id, pageNo ,status: deactive });
  // const { data, isLoading, error } = useDealerIdByCarQuery({ id, pageNo ,"ACTIVE" });

  const activeCarsData = data?.list?.filter(car => car?.carStatus === "ACTIVE");

  const [totalCars, setTotalCars] = useState(data?.list?.length || "-");
  const [activeCars, setActiveCars] = useState(data?.list?.length || "-");
  const [pendingCars, setPendingCars] = useState(pendingData?.list?.length || "-");
  const [inspectionDone, setInspectionDone] = useState(data?.length || "-");
  const [sellCars, setSellCars] = useState(sellData?.length || "-");
  const [deactiveCars, setdeactiveCars] = useState(deactiveData?.length || "-");

  const [open, setOpen] = useState(false);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [openActivate, setOpenActivate] = useState(false);
  const [deactivateId ,setDeactivateId] = useState();
  const [deleteid ,setDeleteid] = useState();
  const [list ,setList] = useState([]);

  const [carUpdate] = useCarUpdateMutation(deactivateId);
  const [selectedOption, setSelectedOption] = useState(status); 
 
  const handleOpenDeactivate = (carId) => {
    setOpenDeactivate(!openDeactivate);
    setDeactivateId(carId);
    // setDeleteid(carId);
    // console.log('hsgjfsdjh', openDeactivate, deactivateId);
  };

  const handleOpenAactivate = (carId) => {
    setOpenActivate(!openActivate);
    setDeactivateId(carId);
  };

  const deactivateStatus = async () => {
    const data = {
      carStatus: 'DEACTIVATE',
    };
    const res = await carUpdate({data, carId: deactivateId});
    setSelectedOption("DEACTIVATE");
    setOpenDeactivate(!openDeactivate);
  };

  const activateCarStatus = async () => {
    const data = {
      carStatus: 'ACTIVE',
    };
    const res = await carUpdate({data, carId: deactivateId});
    setSelectedOption("ACTIVE");
    setOpenActivate(!openActivate);
  };

  const handleOpen = (carId) => {
    setOpen(!open);
    setDeleteid(carId);
  };

  const handleOpen1 = (carId) => {
    deleteDealerHandler(deleteid)
    setOpen(!open)
  };

  const handleFilterActiveCars= () => {
    setList(data?.list)
  }

  const handleFilterPendingCars= () => {
    console.log("pendingData?.list",pendingData?.list)
    setList(pendingData?.list ?? [])
  }

  const handleFilterSellCars= () => {
    setList(sellData?.list ?? [])
  }
  const handleFilterDeactiveCars = () => {
    setList(deactiveData?.list ?? [])

  }

  const deleteDealerHandler = async (carId) => {
    console.log(id);
    console.log(carId);
    const res = await carRemove({ id, carId });
    console.log(res);
  };
  useEffect(() => {
    if (data) {
      const totalCars = 
      (data?.list?.length ?? 0) + 
      (pendingData?.list?.length ?? 0) + 
      (sellData?.list?.length ?? 0)+
      (deactiveData?.list?.length ?? 0);

      setTotalCars(totalCars);
      setActiveCars(data?.list?.length || "-");
      setPendingCars(pendingData?.list?.length || "-");
      setInspectionDone(activeCarsData?.list?.length || "-");
      setSellCars(sellData?.list?.length || "-");
      setdeactiveCars(deactiveData?.list?.length || "-");
      setList(data?.list)
    }
  }, [data ,pendingData , sellData,deactiveData]);
  const nextHandler = () => {
    setPageNo((prevPageNo) => {
      // Check if the error status is 404
      if (error?.status === 404) {
        console.log("click");
        console.log(prevPageNo);
        // Display message or perform any action indicating that it's the last page
        console.log("You are on the last page.");
        return prevPageNo; // Keep pageNo unchanged
      } else {
        // Increment pageNo
        return prevPageNo + 1;
      }
    });
  };

  // eslint-disable-next-line no-unused-vars
  const columns = [
    
  {
    Header: "ID",
    accessor: "carId",
  },

    {
      Header: "Brand ",
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
    {
      Header: "Status",
      accessor: "carStatus",
      Cell: (cell) => {
        return (
          <div>
            <div className="flex gap-2 justify-center items-center  ">
              <StatusDialogeBox status={cell.row.values.carStatus} carId={cell.row.values.carId}  />
            </div>
          </div>
        );
      },
    },

    {
      Header: "Edit",
      accessor: "Edit",
      Cell: (cell) => {
        return (
          <div>
            <div className="flex gap-2 justify-center items-center  ">
              {/* <Link to={`/car/${cell.row.values.carId}/pendinguser`}>
                <div className="w- h-">
                  <MdPendingActions color="#b09b12" className="h-6 w-6" />
                </div>
              </Link> */}
              <Link to={`/carlist/cardetails/${cell.row.values.carId}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                  color="blue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </Link>

              <Link to={`/dealer/${id}/car/edit/${cell.row.values.carId}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                  color="green"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </Link>
              <div onClick={() => handleOpen(cell.row.values.carId)}>
                <Tooltip content="Delete">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                    color="red"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </Tooltip>
              </div>

              { cell.row.values.carStatus == 'ACTIVE' && (<p onClick={() =>handleOpenDeactivate(cell.row.values.carId)} className="cursor-pointer">Deactivate</p>)}
              { cell.row.values.carStatus == 'DEACTIVATE' && (<p onClick={() =>handleOpenAactivate(cell.row.values.carId)} className="cursor-pointer">Activate</p>)}
            </div>
          </div>
        );
      },
    },
  ];
    // const columns1 = [
    //   {
    //     Header: "ID",
    //     accessor: "carId",
    //   },
    //   {
    //     Header: "Brand",
    //     accessor: "brand",
    //   },

    //   {
    //     Header: "Model ",
    //     accessor: "model",
    //   },
    //   {
    //     Header: "Fuel Type",
    //     accessor: "fuelType",
    //   },
    //   {
    //     Header: "Year",
    //     accessor: "year",
    //   },

    //   {
    //     Header: "Price",
    //     accessor: "price",
    //     disableSortBy: true,
    //   },
    //   {
    //     Header: "Edit",
    //     accessor: "Edit",
    //     Cell: (cell) => {
    //       console.log(cell.row.values.carId);
    //       return (
    //         <div>
    //           <div className="flex gap-2 justify-center items-center  ">
    //             <Link to={`/car/${cell.row.values.carId}/pendinguser`}>
    //               <div className="w- h-">
    //                 <MdPendingActions color="#b09b12" className="h-6 w-6" />
    //               </div>
    //             </Link>
    //             <Link to={`/carlist/cardetails/${cell.row.values.carId}`}>
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 strokeWidth={1.5}
    //                 stroke="currentColor"
    //                 className="w-6 h-6 cursor-pointer"
    //                 color="blue"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    //                 />
    //               </svg>
    //             </Link>

    //             <Link to={`/dealer/${id}/car/edit/${cell.row.values.carId}`}>
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 strokeWidth={1.5}
    //                 stroke="currentColor"
    //                 className="w-6 h-6 cursor-pointer"
    //                 color="green"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    //                 />
    //               </svg>
    //             </Link>
    //             <div >
    //               <Tooltip content="Delete">
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   strokeWidth={1.5}
    //                   stroke="currentColor"
    //                   className="w-6 h-6 cursor-pointer"
    //                   color="red"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    //                   />
    //                 </svg>
    //               </Tooltip>
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     },
    //   },
    // ];

  let dealerApiData;
  if (isLoading) {
    return <p>isLoading</p>;
  } else {
    dealerApiData = data?.list;
  }

 
  
  // const data1 = [
  //   {
  //     label: "All Cars",
  //     value: "html",
  //     desc: <TableComponent columns={columns} data={dealerApiData} />,
  //   },
  //   {
  //     label: "Sold Cars",
  //     value: "react",
  //     desc: <TableComponent columns={columns1} data={dealerApiData} />,
  //     // desc: `Because it's about motivating the doers. Because I'm here
  //     // to follow my dreams and inspire other people to follow their dreams, too.`,
  //   },
  // ];
  return (
    <>
     <h1 className="mt-2 text-2xl ml-2 mb-5 font-bold">Car Listing</h1>
     <div className="flex flex-wrap justify-center divide-x-4 mx-5 mb-8">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-5 text-center bg-blue-400 rounded-2xl shadow-xl mb-5 sm:mb-2 sm:mr-5 cursor-pointer">
          <div className="text-4xl font-bold text-white">{totalCars}</div>
          <div className="mt-2 font-medium">Total Cars</div>
        </div>
        <div onClick={handleFilterActiveCars} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-5 text-center bg-green-500 rounded-2xl shadow-xl mb-5 sm:mb-2 sm:mr-5 cursor-pointer">
          <div className="text-4xl font-bold text-white">{activeCars}/{totalCars}</div>
          <div className="mt-2 font-medium">Active Cars</div>
        </div>
        <div onClick={handleFilterPendingCars} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-5 text-center bg-yellow-800 rounded-2xl shadow-xl mb-5 sm:mb-2 sm:mr-5 cursor-pointer">
          <div className="text-4xl font-bold text-white">{pendingCars}/{totalCars}</div>
          <div className="mt-2 font-medium">Pending Cars</div>
        </div>
        
        <div onClick={handleFilterSellCars} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-5 text-center bg-blue-500 rounded-2xl shadow-xl sm:mb-2 mb-5 sm:mr-5 cursor-pointer">
          <div className="text-4xl font-bold text-white">{sellCars}/{totalCars}</div>
          <div className="mt-2 font-medium">Sold Cars</div>
        </div>
        <div  onClick={handleFilterDeactiveCars} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-5 text-center bg-red-500 rounded-2xl shadow-xl  sm:mb-2 sm:mr-5 cursor-pointer">
          <div className="text-4xl font-bold text-white">{deactiveCars}/{totalCars}</div>
          <div className="mt-2 font-medium">Deactive Cars</div>
        </div>
      </div>
      {error?.status === 404 ? (
        <div>
          <p>No Data Available</p>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to={`/dealer/${id}/addcar`}>
              <Button>Add Car</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {/* <p>Sell for car</p> */}
          <Card className="h-full w-full">
          <Dialog open={open} handler={handleOpen}>
      <DialogBody className="flex justify-center" >
        <p className="font-semibold text-xl">Are you sure want to delete?</p> 
        </DialogBody>
        <DialogFooter className="flex justify-center">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen1}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className=" flex items-center justify-between gap-8">
                <div>
                  {/* <Typography variant="h3" className="p-2" color="blue-gray">
                    Cars list
                  </Typography> */}
                  {/* <Typography color="gray" className="mt-1 font-normal">
                    See information about all cars
                  </Typography> */}
                </div>
                <div className="flex shrink-0 flex-col mb-2 gap-2 sm:flex-row">
                  <Link to={`/dealer/${id}/addcar`}>
                    <Button>Add Car</Button>
                  </Link>
                </div>
              </div>
              {/* <div className="flex justify-center gap-10 mt-3">
                <div className="flex flex-col items-center align-middle bg-blue-200 px-3 py-2 rounded-lg">
                  <div className="font-bold text-base text-black">All Cars</div>
                  <div className="text-white font-bold">200</div>
                </div>
                <div className="flex flex-col items-center align-middle bg-blue-200 px-3 py-2 rounded-lg">
                  <div className="font-bold text-base text-black">
                    Sold Cars
                  </div>
                  <div className="text-white font-bold">96</div>
                </div>
              </div> */}

              <div className="overflow-scroll px-0">
              <TableComponent columns={columns} data={list} />
              </div>
            </CardHeader>
            {error ? (
              <p className="text-center">car is not found</p>
            ) : (
              <CardBody className=" px-0">
                {/* <Tabs value="html" className="w-full">
                  <TabsHeader
                    className="bg-transperant "
                    indicatorProps={{
                      className:
                        "bg-indigo-200 shadow-none !text-black font-bold ",
                    }}
                  >
                    {data1.map(({ label, value }) => (
                      <Tab key={value} value={value}>
                        {label}
                      </Tab>
                    ))}
                  </TabsHeader>
                  <TabsBody>
                    {data1.map(({ value, desc }) => (
                      <TabPanel key={value} value={value}>
                        {desc}
                      </TabPanel>
                    ))}
                  </TabsBody>
                </Tabs> */}
              </CardBody>
            )}

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
                  disabled={list?.length < 10}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}

    {/* Dectivate Popup */}
    { openDeactivate && (<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <h2 className="text-lg font-semibold mb-4">Are you sure you want to deactivate?</h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={deactivateStatus}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Confirm
          </button>
          <button
            onClick={handleOpenDeactivate}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>)}

    { openActivate && (<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <h2 className="text-lg font-semibold mb-4">Are you sure you want to Activate?</h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={activateCarStatus}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Confirm
          </button>
          <button
            onClick={handleOpenAactivate}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>)}
    </>
  );
};

export default SellForCar;