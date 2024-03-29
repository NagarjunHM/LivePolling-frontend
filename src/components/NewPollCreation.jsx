import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose, IoAddOutline } from "react-icons/io5";
import { RiDeleteBin7Line } from "react-icons/ri";
import usePollSlice from "../store/poll/usePollSlice.js";

const NewPollCreation = () => {
  const {
    questions,
    handleQuestionInput,
    handleOptions,
    handleAddOption,
    handleDeleteOption,
    handleQuestionDelete,
    handleQuestionAdd,
    handleCorrectAnswer,
    handleForm,
    redirect,
    setRedirect,
  } = usePollSlice();

  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate(`/presenterResult`);
    }

    setRedirect(false);
  }, [redirect]);

  return (
    <div>
      <div>
        {questions.map((question, questionIndex) => (
          <React.Fragment key={questionIndex}>
            <div className="my-4 border shadow bg-violet-100/50 card card-body ">
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
                    type="radio"
                    name={questionIndex}
                    className="radio"
                    value={optionIndex}
                    onChange={() => {
                      handleCorrectAnswer(optionIndex, questionIndex);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Type here"
                    value={option}
                    onChange={(e) =>
                      handleOptions(e.target.value, optionIndex, questionIndex)
                    }
                    className="w-full max-w-xs input input-bordered"
                  />

                  {optionIndex > 1 ? (
                    <button
                      onClick={() =>
                        handleDeleteOption(questionIndex, optionIndex)
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
        <div className="fixed bottom-0 left-0 flex justify-end w-full px-4 py-2 border shadow backdrop-blur">
          <div className="">
            <button className=" btn btn-info" onClick={handleForm}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPollCreation;
