import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";
import DonorTables from "../../components/DonorTables";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { withAuth, WithAuth } from "../../components/withAuth";
import { fetchDonors } from "../../store/donorSlice";

export default withAuth(function Donations() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDonors());
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
            <Breadcrumb current={"Donors"} />

            <h1 className="mx-12 text-[28px] font-semibold">All Donors</h1>
          </div>

          <div className="h-full bg-green-100">
            <DonorTables />
          </div>
        </div>
      </div>
    </div>
  );
});
