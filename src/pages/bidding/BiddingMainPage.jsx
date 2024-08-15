/* eslint-disable no-unused-vars */
import GridList2 from "../../components/buyCar/GridList2"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useGetAllCarQuery } from "../../services/carAPI";
const BiddingMainPage = () => {
    
  const { data, error, isLoading } = useGetAllCarQuery()
  console.log(data)

  const navigate = useNavigate();
 

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // if (error?.status == 401) {
  //   Cookies.remove("token");
  //   navigate("/signin");
  // }
  return (
    <>
    <GridList2 data={data} />
      
    </>
  )
}

export default BiddingMainPage
