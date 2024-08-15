/* eslint-disable react/prop-types */
import { Link, useNavigate, useParams } from "react-router-dom";
import { useInspectorByIdQuery } from "../../services/inspectorapi";
import { IoChevronBack } from "react-icons/io5";
import { Button } from "@material-tailwind/react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AdminInspectorInfo = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data } = useInspectorByIdQuery({ userId });

  const {
    response: { firstName, lastName, mobileNo, email, city, address } = {},
  } = data || {};

  const token = Cookies.get("token");

  let jwtDecodes;

  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  
  const InspectorProfileId = token ? jwtDecodes?.inspectorProfileId : null;
  const userRole = token ? jwtDecodes?.authorities[0] : null;
  const DealerId = token ? jwtDecodes?.dealerId : null;
console.log(DealerId)
  return (
    <>
      <div className="text-3xl font-bold mt-5 mb-4 ml-4 md:ml-12 xl:mb-[-5rem]  md:mb-8">
        Profile Information
      </div>
      <div className="flex justify-center items-center   xl:h-screen ">
        <div className="w-full max-w-4xl flex flex-col mx-2 md:flex-row shadow-xl">
          <div className="w-full md:w-1/2">
            <img
              src="https://www.shutterstock.com/image-photo/smiling-friendly-car-seller-suit-600nw-2105619599.jpg"
              alt="Dealer"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
            <div className="overflow-x-auto md:overflow-visible">
              <table className="table w-full border-collapse border border-gray-200  ">
                <tbody>
                  <tr>
                    <th className="px-4 py-2 border border-gray-200">
                      First Name
                    </th>
                    <td className="px-4 py-2 border border-gray-200">
                      {firstName}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 border border-gray-200">
                      Last Name
                    </th>
                    <td className="px-4 py-2 border border-gray-200">
                      {lastName}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 border border-gray-200">
                      Mobile Number
                    </th>
                    <td className="px-4 py-2 border border-gray-200">
                      {mobileNo}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 border border-gray-200">Email</th>
                    <td className="px-4 py-2 border border-gray-200">
                      {email}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 border border-gray-200">City</th>
                    <td className="px-4 py-2 border border-gray-200">{city}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 border border-gray-200">
                      Address
                    </th>
                    <td className="px-4 py-2 border border-gray-200">
                      {address}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-center items-center mt-4 md:mt-0">
              <span className="flex items-center">
                {userRole === 'Admin' ? (
                  <Button
                    size="md"
                    className="mt-2 ml-2 cursor-pointer flex items-center"
                    onClick={() => navigate(-1)}
                  >
                    <IoChevronBack className="w-5 h-5" /> Back
                  </Button>
                ) : null}
                {userRole === 'INSPECTOR' ? (
                  <Link to={`/inspector/edit/${userId}/${InspectorProfileId}`}>
                    <Button
                      size="md"
                      className="mt-2 ml-2 cursor-pointer flex items-center"
                    >
                      Edit Profile
                    </Button>
                  </Link>
                ) : null}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminInspectorInfo;
