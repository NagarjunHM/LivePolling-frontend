import React, { useEffect } from "react";

import { IoClose, IoAddOutline } from "react-icons/io5";
import { RiDeleteBin7Line } from "react-icons/ri";
import { usePollContext } from "../context/PollContext.jsx";
import { generateRoomId, socket } from "../socket.js";

const NewPollCreation = () => {
  const {
    questions,
    setRoomId,
    roomId,
    handleQuestionInput,
    handleOptions,
    handleAddOption,
    handleOptionDelete,
    handleQuestionDelete,
    handleQuestionAdd,
    handleForm,
  } = usePollContext();

  useEffect(() => {
    setRoomId(generateRoomId());
  }, []);

  useEffect(() => {
    socket.emit("createRoom", roomId);
  }, [roomId]);

  return (
    <div>
      <form onSubmit={handleForm}>
        {questions.map((question, questionIndex) => (
          <React.Fragment key={questionIndex}>
            <div className="my-4 card card-body bg-base-300">
              {/* card close button */}
              <div className="justify-end card-actions">
                <div
                  className="tooltip tooltip-left"
                  data-tip="close this question"
                >
                  <button
                    className="btn btn-square"
                    onClick={() => {
                      handleQuestionDelete(questionIndex);
                    }}
                  >
                    <IoClose size="2em" />
                  </button>
                </div>
              </div>

              {/* question */}
              <div className="label">
                <span className="label-text">Enter question</span>
              </div>
              <textarea
                className="h-24 text-xl textarea textarea-bordered"
                placeholder="Question"
                value={question.question}
                onChange={(e) => {
                  handleQuestionInput(e.target.value, questionIndex);
                }}
              ></textarea>

              {/* options */}
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center gap-4">
                  <input
                    type="text"
                    placeholder="Type here"
                    value={option}
                    onChange={(e) =>
                      handleOptions(e.target.value, optionIndex, questionIndex)
                    }
                    className="w-full max-w-xs input input-bordered"
                  />

                  {optionIndex !== 0 ? (
                    <button
                      onClick={() =>
                        handleOptionDelete(questionIndex, optionIndex)
                      }
                    >
                      <RiDeleteBin7Line size="1.5em" className="text-red-500" />
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              ))}

              {/* add option button */}
              <div>
                <div
                  className="tooltip tooltip-right"
                  data-tip="add new option"
                >
                  <button
                    className="btn btn-circle "
                    onClick={() => handleAddOption(questionIndex)}
                  >
                    <IoAddOutline size="2em" />
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}

        {/* button to add new question */}
        <div className="flex justify-end">
          <button className="btn btn-neutral " onClick={handleQuestionAdd}>
            Add question
          </button>
        </div>

        {/* submit button */}
        <div className="fixed flex px-4 btm-nav backdrop-blur">
          <div className="items-end ">
            <button className=" btn btn-warning" type="submit">
              send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPollCreation;
