import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loading from "../components/spinners/Loading";
import { withAuth } from "../components/withAuth";
import { server } from "../server";

const Home = () => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ donations: [], expanses: [] });
  const dispatch = useDispatch();

  const loadDetails = () => {
    // if (auth.user) {
    axios
      .get(`${server}/api/stats`)
      .then((response) => {
        console.log("Fetched");
        setData(response.data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
    // }
  };
  // const dispatchFunction = () => {};
  useEffect(() => {
    loadDetails();
    // Checking login
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className=" w-screen h-screen font-poppins bg-gray-50">
      <div className="w-screen h-[10vh] border-b-2">
        <Navbar />
      </div>
      <div className="w-screen h-[90vh] flex">
        <div className="bg-white w-[15%] h-full">
          <Sidebar />
        </div>

        <div className=" w-[85%] h-full overflow-y-auto">
          <div className="grid grid-cols-4 gap-6 p-6">
            <div className="bg-gray-100 shadow-lg p-16 rounded-lg">
              <div className="text-3xl font-bold text-center ">
                Rs. {data?.donationAmount}{" "}
              </div>
              <div className="text-center my-6">Total amount donated</div>
            </div>
            <div className="bg-gray-100 shadow-lg p-16 rounded-lg">
              <div className="text-3xl font-bold text-center ">
                Rs. {data?.expanseAmount}{" "}
              </div>
              <div className="text-center my-6">Total amount Spent</div>
            </div>
            <div className="bg-gray-100 shadow-lg p-16 rounded-lg">
              <div className="text-3xl font-bold text-center ">
                {data?.donorCount}{" "}
              </div>
              <div className="text-center my-6">Total Donors</div>
            </div>
            <div className="bg-gray-100 shadow-lg p-16 rounded-lg">
              <div className="text-3xl font-bold text-center ">
                {data?.donationCount}{" "}
              </div>
              <div className="text-center my-6">Number of Donations</div>
            </div>
          </div>

          <div className="my-4 p-4">
            <div>
              <div className="font-bold text-xl p-6">Recent Donations</div>
              <div className="w-full">
                <div className="bg-white border rounded-lg p-4 ">
                  <div className="grid grid-cols-4 my-4 text-lg font-semibold">
                    <span>Id</span>
                    <span>Donor Id</span>
                    <span>Amount</span>
                    <span>Date</span>
                  </div>

                  {data?.donations.map((donation, index) => {
                    if (index < 10) {
                      return (
                        <div key={index}>
                          <div className="grid grid-cols-4 p-2 bg-gray-100 rounded-lg  my-4 hover:bg-gray-50 cursor-pointer ">
                            <span>{donation._id}</span>
                            <span>{donation.donorId}</span>
                            <span>{donation.ammount}</span>
                            <span>{donation.createdAt.split("T")[0]}</span>
                          </div>
                        </div>
                      );
                    }
                  })}
                  {data?.donations.length > 0 && (
                    <span className="text-center text-blue-500 cursor-pointer w-full flex justify-center">
                      <Link href="/donation">View all</Link>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 p-4">
            <div>
              <div className="font-bold text-xl p-6">Recent Expanse</div>
              <div className="w-full">
                <div className="bg-white border rounded-lg p-4 ">
                  <div className="grid grid-cols-4 my-4 text-lg font-semibold">
                    <span>Id</span>
                    <span>Type</span>
                    <span>Amount</span>
                    <span>Date</span>
                  </div>

                  {data?.expanses.map((expanse, index) => {
                    if (index < 10) {
                      return (
                        <div key={index}>
                          <div className="grid grid-cols-4 p-2 bg-gray-100 rounded-lg  my-4 hover:bg-gray-50 cursor-pointer ">
                            <span>{expanse?._id}</span>
                            <span>{expanse?.type}</span>
                            <span>{expanse?.ammount}</span>
                            <span>{expanse?.createdAt.split("T")[0]}</span>
                          </div>
                        </div>
                      );
                    }
                  })}
                  {data?.donations.length > 0 && (
                    <span className="text-center text-blue-500 cursor-pointer w-full flex justify-center">
                      <Link href="/expanse">View all</Link>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withAuth(Home);
