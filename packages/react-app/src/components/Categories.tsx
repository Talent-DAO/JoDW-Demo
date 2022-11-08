import React from "react";

export default function Categories(props: any) {
  return (
    <div className="mt-10 col-span-6">
      <div className="pl-4 flex flex-col">
        <label htmlFor="categories" className="block text-left text-lg font-bold">
          Categories
        </label>
        <p className="text-left">Select the category this article might belong to</p>
      </div>
      <div className="mt-1 w-full p-4 text-lg rounded-lg border flex flex-row flex-wrap items-center space-x-4">
        <div
          className={
            props.optionTech
              ? "my-2 px-4 py-2 rounded-full text-lg text-primary border border-primary cursor-pointer font-bold flex flex-row items-center"
              : "my-2 px-4 py-2 rounded-full text-lg border cursor-pointer flex flex-row items-center"
          }
          style={
            props.optionTech ? { backgroundColor: "rgba(180, 28, 46, 0.13)" } : { backgroundColor: "transparent" }
          }
          onClick={() => props.setOptionTech(!props.optionTech)}
        >
          {props.optionTech && (
            <svg
              className="mr-2"
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.36364 12.3657L1.59091 7.66418L0 9.23134L6.36364 15.5L20 2.06716L18.4091 0.5L6.36364 12.3657Z"
                fill="#B41C2E"
              />
            </svg>
          )}
          <div>Technology</div>
        </div>
        <div
          className={
            props.optionHistory
              ? "my-2 px-4 py-2 rounded-full text-lg text-primary border border-primary cursor-pointer font-bold flex flex-row items-center"
              : "my-2 px-4 py-2 rounded-full text-lg border cursor-pointer flex flex-row items-center"
          }
          style={
            props.optionHistory
              ? { backgroundColor: "rgba(180, 28, 46, 0.13)" }
              : { backgroundColor: "transparent" }
          }
          onClick={() => props.setOptionHistory(!props.optionHistory)}
        >
          {props.optionHistory && (
            <svg
              className="mr-2"
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.36364 12.3657L1.59091 7.66418L0 9.23134L6.36364 15.5L20 2.06716L18.4091 0.5L6.36364 12.3657Z"
                fill="#B41C2E"
              />
            </svg>
          )}
          <div>History</div>
        </div>
        <div
          className={
            props.optionRomance
              ? "my-2 px-4 py-2 rounded-full text-lg text-primary border border-primary cursor-pointer font-bold flex flex-row items-center"
              : "my-2 px-4 py-2 rounded-full text-lg border cursor-pointer flex flex-row items-center"
          }
          style={
            props.optionRomance
              ? { backgroundColor: "rgba(180, 28, 46, 0.13)" }
              : { backgroundColor: "transparent" }
          }
          onClick={() => props.setOptionRomance(!props.optionRomance)}
        >
          {props.optionRomance && (
            <svg
              className="mr-2"
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.36364 12.3657L1.59091 7.66418L0 9.23134L6.36364 15.5L20 2.06716L18.4091 0.5L6.36364 12.3657Z"
                fill="#B41C2E"
              />
            </svg>
          )}
          <div>Romance</div>
        </div>
        <div
          className={
            props.optionComedy
              ? "my-2 px-4 py-2 rounded-full text-lg text-primary border border-primary cursor-pointer font-bold flex flex-row items-center"
              : "my-2 px-4 py-2 rounded-full text-lg border cursor-pointer flex flex-row items-center"
          }
          style={
            props.optionComedy
              ? { backgroundColor: "rgba(180, 28, 46, 0.13)" }
              : { backgroundColor: "transparent" }
          }
          onClick={() => props.setOptionComedy(!props.optionComedy)}
        >
          {props.optionComedy && (
            <svg
              className="mr-2"
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.36364 12.3657L1.59091 7.66418L0 9.23134L6.36364 15.5L20 2.06716L18.4091 0.5L6.36364 12.3657Z"
                fill="#B41C2E"
              />
            </svg>
          )}
          <div>Comedy</div>
        </div>
        <div
          className={
            props.optionPolitics
              ? "my-2 px-4 py-2 rounded-full text-lg text-primary border border-primary cursor-pointer font-bold flex flex-row items-center"
              : "my-2 px-4 py-2 rounded-full text-lg border cursor-pointer flex flex-row items-center"
          }
          style={
            props.optionPolitics
              ? { backgroundColor: "rgba(180, 28, 46, 0.13)" }
              : { backgroundColor: "transparent" }
          }
          onClick={() => props.setOptionPolitics(!props.optionPolitics)}
        >
          {props.optionPolitics && (
            <svg
              className="mr-2"
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.36364 12.3657L1.59091 7.66418L0 9.23134L6.36364 15.5L20 2.06716L18.4091 0.5L6.36364 12.3657Z"
                fill="#B41C2E"
              />
            </svg>
          )}
          <div>Politics</div>
        </div>
      </div>
    </div>
  );
}
