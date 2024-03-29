import React, { useState } from "react";
import { Link } from "react-router-dom";

const Participants = () => {
  const [roomId, setRoomId] = useState("");

  return (
    // <div className="flex flex-col items-center gap-6">
    //   <div role="alert" className=" alert">
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       className="w-6 h-6 stroke-current shrink-0"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    //       ></path>
    //     </svg>
    //     <span>Enter the Room Id provided by the Presenter</span>
    //   </div>

    //   <div className="flex flex-row gap-4 card-body">
    //     <input
    //       type="text"
    //       placeholder="Type here"
    //       value={roomId}
    //       onChange={(e) => {
    //         setRoomId(e.target.value);
    //       }}
    //       className="w-[600px] input input-bordered"
    //       autoFocus
    //     />
    //     <Link
    //       to={{ pathname: `/participants/${roomId}` }}
    //       className="btn btn-warning"
    //     >
    //       Join Room
    //     </Link>
    //   </div>
    // </div>

    <div className="absolute top-0 left-0 min-h-screen hero bg-base-200">
      <div className="p-10 text-center border-2 shadow-lg card-body card hero-content ">
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl font-bold">
            Enter the Room Id provided by the Presenter to join as a{" "}
            <span className="text-4xl text-green-500 underline">
              Participant
            </span>
          </h1>
          <div className="flex justify-center gap-4">
            <input
              type="text"
              placeholder="Type here"
              value={roomId}
              onChange={(e) => {
                setRoomId(e.target.value);
              }}
              className="w-full max-w-xs input input-bordered"
              autoFocus
            />
            <Link
              to={{ pathname: `/participants/${roomId}` }}
              className="btn btn-neutral"
            >
              Join Room
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participants;
