import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-25 flex items-center justify-center bg-blur">
      <div>
        <p className="py-4 text-xl font-bold text-white">Loading....</p>
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loading;
