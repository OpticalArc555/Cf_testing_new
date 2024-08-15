/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import { useGetbeadingCarImageQuery } from "../../services/biddingAPI";

// eslint-disable-next-line react/prop-types
const BiddingCarView1 = ({ beadingCarId }) => {
  // const [img360, setImg360] = useState(true);
  const [interior, setInterior] = useState(false);
  const [exterior, setExterior] = useState(true);
  const [features, setFeatures] = useState(false);
  const [tyres, setTyres] = useState(false);
  const [engines, setEngines] = useState(false);
  const [imageURLs, setImageURLs] = useState([]);

  const { data, isLoading, error } = useGetbeadingCarImageQuery({beadingCarId});
console.log(data)

const fallbackImage = "..\\..\\cars\\no-image-available-update.png";
const checkIfImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(url); // Return the original URL if the image loads
    img.onerror = () => resolve(fallbackImage); // Return the fallback image if the image fails to load
    img.src = url;
  });
};

useEffect(() => {
  if (data?.object && Array.isArray(data.object)) {
    // Reorder data to have 'coverImage' first
    const reorderedData = [
      ...data.object.filter(item => item.documentType === 'coverImage'),
      ...data.object.filter(item => item.documentType !== 'coverImage')
    ];

    // Extract the URLs from the reordered data
    const urls = reorderedData.map((item) => item.documentLink);

    // Validate URLs and set image URLs
    Promise.all(urls.map(checkIfImage))
      .then((validatedURLs) => setImageURLs(validatedURLs));
  } else {
    setImageURLs([fallbackImage]); // Handle case when data.object is not valid
  }
}, [data]);


  
  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="font-[Merriweather] md:text-center text-center">
        Image not available{" "}
        <div className="flex justify-center">
          <img
            className=" md:w-[12rem] w-[10rem] opacity-50 "
            src="..\..\cars\no-image-available-update.png"
            alt="no image"
          />
        </div>
      </div>
    );

  

  const ChooseCarColor = () => {
    return (
      <div className="w-full h-[16rem] md:w-full md:h-[30rem]">
        {interior && (
          <Carousel className="bg-white rounded-lg shadow-md absolute inset-0 blurred-bg" style="background-image: url('https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600');">
             {imageURLs.length > 0 ? (
        <Carousel className="bg-white rounded-lg shadow-md">
          {imageURLs.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Car Image ${index}`}
              className="object-contain w-full h-full opacity-50"
            />
          ))}
          
        </Carousel>
      ) : (
        <div className="text-center mt-2">
          {" "}
          Image not available
          <img
            src={fallbackImage}
            alt="no image"
            className="object-contain h-full md:w-[12rem] w-[13rem] ml-12 md:ml-[9rem] mt-8 opacity-50 "
          />
        </div>
      )}
          </Carousel>
        )}

        {exterior && (
          <Carousel className="bg-white rounded-lg shadow-md ">
            {imageURLs.length > 0 ? (
        
          imageURLs.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Car Image ${index}`}
              className="object-contain w-full h-full"
            />
          ))
      ) : (
        <div className="text-center mt-2">
          {" "}
          Image not available
          <img
            src={fallbackImage}
            alt="no image"
            className="object-contain h-full md:w-[12rem] w-[13rem] ml-12 md:ml-[9rem] mt-8 opacity-50 "
          />
        </div>
      )}
          </Carousel>
        )}

        {features && (
          <Carousel className="bg-white rounded-lg shadow-md ">
            {data.object.length > 0 ? (
              data.object.map((item) => (
                <img
                  key={item.documentId}
                  src={item.documentLink}
                  alt={`Car Image ${item.documentId}`}
                  className="object-contain w-full h-full"
                />
              ))
            ) : (
              <div className="text-center mt-2">
                {" "}
                Image not available
                <img
                  src={fallbackImage}
                  alt="no image"
                  className="object-contain h-full md:w-[12rem] w-[13rem] ml-12 md:ml-[9rem] mt-8 opacity-50 "
                />
              </div>
            )}
          </Carousel>
        )}

        {tyres && (
          <Carousel className="bg-white rounded-lg shadow-md">
             {imageURLs.length > 0 ? (
        <Carousel className="bg-white rounded-lg shadow-md">
          {imageURLs.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Car Image ${index}`}
              className="object-contain w-full h-full"
            />
          ))}
        </Carousel>
      ) : (
        <div className="text-center mt-2">
          {" "}
          Image not available
          <img
            src={fallbackImage}
            alt="no image"
            className="object-contain h-full md:w-[12rem] w-[13rem] ml-12 md:ml-[9rem] mt-8 opacity-50 "
          />
        </div>
      )}
          </Carousel>
        )}

        {engines && (
          <Carousel className="bg-white rounded-lg shadow-md  ">
             {imageURLs.length > 0 ? (
        <Carousel className="bg-white rounded-lg shadow-md">
          {imageURLs.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Car Image ${index}`}
              className="object-contain w-full h-full"
            />
          ))}
        </Carousel>
      ) : (
        <div className="text-center mt-2">
          {" "}
          Image not available
          <img
            src={fallbackImage}
            alt="no image"
            className="object-contain h-full md:w-[12rem] w-[13rem] ml-12 md:ml-[9rem] mt-8 opacity-50 "
          />
        </div>
      )}
          </Carousel>
        )}
      </div>
    );
  };

  return (
    <div className="w-5/5 md:w-full container md:px-4 lg:px-8">
      <div className="flex flex-col justify-between">
        <ChooseCarColor />
        <div className="w-11/12 max-w-xl mx-auto m-5 mb-10 overflow-x-auto scrollbar">
          <div className="flex space-x-4 justify-between"></div>
        </div>
      </div>
    </div>
  );
};

export default BiddingCarView1;
