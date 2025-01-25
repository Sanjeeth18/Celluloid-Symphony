import React from "react";
import logo from "../assets/mine.jpg";

function ContactDetails() {
  return (
    <div className="flex justify-center items-center lg:min-h-screen bg-gray-900 text-gray-100">
      <div className="container p-6 rounded-lg shadow-lg ">
        <h2
          className="text-center font-serif py-7 text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600"
          data-aos="fade-down"
          data-aos-offset="300"
          data-aos-once="false"
          data-aos-mirror="true"
        >
          Contact Details
        </h2>

        <div className="flex flex-col md:flex-row bg-gray-800 justify-center items-center">
          <div
            className="w-full sm:my-4 md:w-1/3 py-6 flex justify-center mb-4 md:mb-0"
            data-aos="zoom-in"
            data-aos-offset="00"
            data-aos-once="false"
            data-aos-mirror="true"
          >
            <img
              src={logo}
              alt="Sanjeeth J"
              className="rounded-lg w-full h-auto max-w-xs md:max-w-sm lg:max-w-md object-cover shadow-lg border-4 border-green-500"
            />
          </div>

          <div
            className="w-full my-auto lg:px-10 md:w-2/3 p-6 flex flex-col  rounded-lg shadow-md"
            data-aos="zoom-in"
            data-aos-offset="00"
            data-aos-once="false"
            data-aos-mirror="true"
          >
            <h2 className="text-4xl font-bold text-green-400 mb-6 text-left">
              Sanjeeth J
            </h2>

            <p className="text-lg mb-4 text-left">
              <strong className="text-green-500 text-xl">
                Date of Birth :
              </strong>{" "}
              <span className="text-gray-100 text-xl">16.07.2004</span>
            </p>

            <p className="text-lg mb-4 text-left">
              <strong className="text-green-500 text-xl">College :</strong>{" "}
              <span className="text-gray-100 text-xl">
                PSG College Of Technology
              </span>
            </p>

            <p className="text-lg mb-4 text-left">
              <strong className="text-green-500 text-xl">Address :</strong>{" "}
              <span className="text-gray-100 text-xl">
                50, Periyar Nagar, MSK Palayam, Coimbatore - 641015
              </span>
            </p>

            <p className="text-lg mb-4 text-left">
              <strong className="text-green-500 text-xl">Ph :</strong>{" "}
              <span className="text-gray-100 text-xl">+91-7548824694</span>
            </p>

            <p className="text-lg mb-4 text-left">
              <strong className="text-green-500 text-xl">Mail ID :</strong>{" "}
              <span className="text-gray-100 text-xl">
                22pw33@psgtech.ac.in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
