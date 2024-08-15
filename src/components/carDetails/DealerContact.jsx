/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { FaLocationDot } from 'react-icons/fa6';
import { IoLogoWhatsapp } from 'react-icons/io';
import { MdEmail, MdPerson } from 'react-icons/md';
import { useGetDealerQuery } from "../../services/dealerAPI";
import CardUi from '../../ui/CardUi';

const DealerContact = ({ dealer_id }) => {
  const { data, isLoading, isError, error } = useGetDealerQuery({ id: dealer_id });

  const {
    dealerDto: {
      mobileNo,
      firstName,
      lastName,
      email,
      city,
      address,
    } = {},
  } = data || {};

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="w-full md:w-full rounded-lg shadow-xl overflow-hidden mt-6">
      <CardUi>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">Dealer Contact</h2>
          <div className="flex align-bottom items-baseline gap-3 ml-2 md:ml-0 mt-4">
            <MdPerson />
            <p className="text-gray-600 flex-1">
              Name: <span className="text-black font-semibold">{firstName} {lastName}</span>
            </p>
          </div>
          <div className="flex align-bottom items-baseline gap-3 ml-2 md:ml-0 mt-1">
            <FaLocationDot />
            <p className="text-gray-600 flex-1">
              Address: <span className="text-black font-semibold">{address}, {city}</span>
            </p>
          </div>
          <div className="flex align-bottom items-baseline gap-3 ml-2 md:ml-0 mt-1">
            <MdEmail />
            <p className="text-gray-600 flex-1">
              Email: <span className="text-black font-semibold">{email}</span>
            </p>
          </div>
          <div className="flex align-bottom items-baseline gap-3 ml-2 md:ml-0 mt-1">
            <IoLogoWhatsapp />
            <p className="text-gray-600 flex-1">
              Phone: <span className="text-black font-semibold">{mobileNo}</span>
            </p>
          </div>
        </div>
      </CardUi>
    </div>
  );
};

export default DealerContact;
