/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { useAllDealerFinalBidQuery, useLazyBiddingCarByIdQuery } from "../../services/biddingAPI";

import TableComponent from "../../components/table/TableComponent";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useLazyGetDealerByUserIdQuery } from "../../services/dealerAPI";
import { Link } from "react-router-dom";

const WinnerSection = () => {
  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const UserID = jwtDecodes?.userId;

  const { data: didData , isLoading , error} = useAllDealerFinalBidQuery(UserID);
  console.log("I have change ",error)

  let [trigger] = useLazyBiddingCarByIdQuery();
  let [triggerGetDealer] = useLazyGetDealerByUserIdQuery();
  const [liveCarsWinData, setLiveCarsWinData] = useState([]);

  useEffect(() => {
    const fetchServiceProducts = async () => {
      if (didData) {
        const liveCarsData = [];

        for (let i = 0; i < didData.finalBids.length; i++) {
          const carId = didData.finalBids[i]?.beadingCarId;
          const id = didData.finalBids[i]?.sellerDealerId;
          if (carId) {
            const { data: carData, error: carError } = await trigger(carId);
            if (carError) {
              console.error("Error fetching car data:", carError);
              continue;
            }

            const { data: dealerName, error: dealerError } = await triggerGetDealer(id);
            if (dealerError) {
              console.error("Error fetching dealer data:", dealerError);
              continue;
            }

            const combinedData = {
              ...carData,
              ...dealerName,
              ...didData.finalBids[i]
            };

            liveCarsData.push(combinedData);
          }
        }

        setLiveCarsWinData(liveCarsData);
      }
    };

    fetchServiceProducts();
  }, [didData, trigger, triggerGetDealer]);

 

  const columns = [
    {
      Header: "Sr.No",
      accessor: "bidCarId"
    },
    {
      Header: "Brand",
      accessor: "brand"
    },
    {
      Header: "Model",
      accessor: "model"
    },
    {
      Header: "Price",
      accessor: "price"
    },
    {
      Header: "Dealer Name",
      accessor: "firstName"
    },
    {
      Header: "Action",
      Cell: (cell) => {
        console.log(cell.row.values.bidCarId)
        return (
          <div>
            <div className="flex gap-2 justify-center items-center">
              <Link to={`/biddinglist/cardetails/${cell.row.values.bidCarId}/success`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  color="blue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        );
      },
    }
  ];

  if (error?.status === 404) {
    return (
      <div className="p-5">
        <p>No Available Data</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full justify-center mb-10 mt-5">
        <p className="text-3xl font-semibold">Winner Section</p>
      </div>
      <div>
        {liveCarsWinData && (
          <TableComponent columns={columns} data={liveCarsWinData} />
        )        
        }
      </div>
    </>
  );
};

export default WinnerSection;

