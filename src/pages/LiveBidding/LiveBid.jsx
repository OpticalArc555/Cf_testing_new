/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useMemo } from 'react';
import { useGetAllLiveBiddingCarsQuery } from '../../services/biddingAPI';
import Card from './Card';
import { useWebSocket } from '../../Utiles/WebSocketConnection';

const LiveBid = () => {
  // const { data, isLoading, refetch } = useGetAllLiveBiddingCarsQuery();
  // if (isLoading) {
  //   return <span>Loading...</span>;
  // }
  const { isConnected, getTopThreeBids,topThreeBidsAmountArray,topThreeBidsAmount,getLiveCars ,liveCars} = useWebSocket() || {} ;
  useEffect(() => {
    getLiveCars();
  }, []);
  // useEffect(() => {
  //   const fetchLiveCars = () => {
  //     if (isConnected) {
  //       try {
  //         getLiveCars();
  //       } catch (error) {
  //         console.error('Failed to fetch live cars:', error);
  //       }
  //     }
  //   };

  //   fetchLiveCars();

    // Optionally, set up an interval to fetch live cars continuously
    // const intervalId = setInterval(() => {
    //   fetchLiveCars();
    // }, 1000); // Fetch every 5 seconds, adjust as needed

    // Cleanup the interval on component unmount
    // return () => clearInterval(intervalId);
  // }, [isConnected, getLiveCars]);

    // const handleHighestBidAmount = useCallback(async (bidCarId) => {
    //   try {
    //     // Make an API call to fetch the highest bid amount for the given car ID
    //     const response = await  getTopThreeBids(bidCarId);
    //     console.log("topThreeBidsAmount",response);
    //     // Update state with the highest bid amount
    //     return response;
    //   } catch (error) {
    //     console.error("Error fetching highest bid amount:", error);
    //   }
    // }, []);

    console.log("MyLiveCars",liveCars);
  return (
    <div className="mx-4 mb-10 sm:mx-12">
      <h1 className="text-2xl font-bold text-center mb-8 sm:text-3xl">Bidding Car Live</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {liveCars && liveCars?.map((cardData, i) => (
          <Card key={i} cardData={cardData} handleHighestBidAmount="" />
        ))}
      </div>
    </div>
  );
};

export default LiveBid;
