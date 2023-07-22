import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";
import DonationTables from "../../components/DonationTables";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { withAuth, WithAuth } from "../../components/withAuth";
import { fetchDonations } from "../../store/donationSlice";

const Donations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDonations());
  });
  return (
    <div className=" w-screen h-screen font-poppins  max-w-screen max-h-screen overflow-hidden">
      <div className="w-screen h-[10vh] border-b-2">
        <Navbar />
      </div>
      <div className="w-screen h-[90vh]  flex">
        <div className="bg-white w-[15%]  h-full">
          <Sidebar />
        </div>

        <div className=" w-[85%] h-full  max-w-[85%] ">
          <div className="h-fit">
            <Breadcrumb current={"Donation"} />

            <h1 className="mx-12 text-[28px] font-semibold">Donations</h1>
          </div>

          <div className="h-full bg-green-100">
            <DonationTables />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Donations);
