import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Loading from "../../components/spinners/loading";
import UserTables from "../../components/UserTables";
import { fetchUser } from "../../store/userSlice";
import { ToastContainer } from "react-toastify";
import { withAuth, WithAuth } from "../../components/withAuth";

export default withAuth(function Users() {
  const users = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (users.status === "loading") return <Loading />;

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
            <Breadcrumb current={"Users"} />

            <h1 className="mx-12 text-[28px] font-semibold">All Users</h1>
          </div>

          <div className="h-full bg-green-100">
            <UserTables />
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
});
