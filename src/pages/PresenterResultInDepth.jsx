import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import axios from "axios";
import RoomBasicInfo from "../components/RoomBasicInfo";
import ResultDisplay from "../components/ResultDisplay";
import OpenClosePolling from "../components/OpenClosePolling";
// import LoaderComp from "../components/LoaderComp";
import usePollSlice from "../store/poll/usePollSlice";
import ProgressBar from "../components/ProgressBar";
import instance from "../axios/axios";
import useUserSlice from "../store/user/useUserSlice";

const PresenterResultInDepth = () => {
  const { roomId } = useParams();
  const [allResult, setAllResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState([]);
  const { isPollOpen, setPollOpenClose } = usePollSlice();
  const { user } = useUserSlice();

  useEffect(() => {
    const fetchSpecificPoll = async () => {
      try {
        if (!refresh) {
          setLoading(true);
        }

        const response = await instance({
          url: `poll/${roomId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        // Update the state with the fetched results
        if (response.status === 200) {
          setAllResult(response.data);
        }
      } catch (err) {
        console.error(err);
        toast.error("failed to fetch the poll details");
      } finally {
        setLoading(false);
        setRefresh(false);
      }
    };

    fetchSpecificPoll();

    // Listen for socket updates
    socket.on("updatedWithUserAns", async ({ reload }) => {
      if (reload) {
        fetchSpecificPoll();
        setRefresh(true);
      }
    });

    // Cleanup socket listeners when the component unmounts
    return () => {
      setPollOpenClose(false);
      socket.emit("closeRoom", roomId);
      socket.off("updatedWithUserAns");
      socket.off("participantsCount");
    };
  }, []);

  // if poll is open then create a room and send the questions
  if (isPollOpen) {
    socket.emit("createRoom", roomId);
    socket.emit("createPoll", {
      roomId,
      questions: allResult.questions,
    });
  }
  if (!isPollOpen) {
    socket.emit("closeRoom", roomId);
  }

  // loader compoenent
  if (loading) {
    return (
      <>
        <ProgressBar />
        <div className="flex flex-col gap-4">
          <div className="w-full h-[156px] skeleton"></div>
          <div className="w-full h-[112px] skeleton"></div>
          <div className="w-full h-[370px] skeleton"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <RoomBasicInfo
          roomId={roomId}
          roomName={allResult.roomName}
          roomDescription={allResult.roomDesc}
        />
        <OpenClosePolling />
        <ResultDisplay questions={allResult.questions} />
      </div>
    </>
  );
};

export default PresenterResultInDepth;
