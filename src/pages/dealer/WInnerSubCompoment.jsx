/* eslint-disable react/prop-types */

import { useBiddingCarByIdQuery, useGetbeadingCarImageQuery } from '../../services/biddingAPI';
import { WinnerSectionCarDefault } from '../../ui/WinnerSectionCarDefault';

export default function WInnerSubCompoment({ carId }) {
  
  console.log(carId)
  const { data, isLoading: isLoadingCar } = useBiddingCarByIdQuery(carId?.beadingCarId);
  
  console.log(data)
  const beadingCarId = data?.beadingCarId;
 
  console.log(beadingCarId)
  const { data: Image, isLoading: isLoadingImage } = useGetbeadingCarImageQuery({beadingCarId});
  
  console.log(Image)
  if (isLoadingCar || (beadingCarId && isLoadingImage)) {
    return <div>Loading...</div>;
  }
  
  if (!data) {
    return null;
  }
  
  return (
    <div className=''>
      <div className=''>
        <WinnerSectionCarDefault data={data} beadingCarId={data.beadingCarId} Image={Image} />
      </div>
    </div>
  );
}
