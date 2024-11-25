import React from "react";
import logo from "../assets/mine.jpg";

function ContactDetails() {
  return (
    <div className="flex justify-center items-center lg:min-h-screen ">
      <div className="container p-4 text-black">
        <h2 className="text-center font-serif py-7 text-5xl font-serif lg:text-7xl">
          Contact Details
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="w-full sm:my-auto md:w-1/3 flex justify-center mb-4 md:mb-0">
            <img
              src={logo}
              alt="Sanjeeth J"
              className="rounded-lg w-full h-auto max-w-xs md:max-w-sm lg:max-w-md object-cover mx-auto"
            />
          </div>

          <div className="w-full  my-auto lg:px-10 md:w-2/3 p-4 flex flex-col">
            <h2 className="text-4xl font-bold text-orange-400 mb-4 text-left">
              Sanjeeth J
            </h2>
            <p className="text-lg mb-2 text-left">
              {" "}
              <strong className="text-purple-500 text-xl">
                Date of Birth :
              </strong>{" "}
              <strong className="text-black text-xl">16.07.2004</strong>
            </p>
            <p className="text-lg mb-2 text-left">
              {" "}
              <strong className="text-purple-500 text-xl">
                College :
              </strong>{" "}
              <strong className="text-black text-xl">
                PSG College Of Technology
              </strong>
            </p>
            <p className="text-lg mb-2 text-left">
              <strong className="text-purple-500 text-xl">Address :</strong>{" "}
              <strong className="text-black text-xl">
                50, Periyar Nagar, MSK Palayam , Coimbatore - 641015
              </strong>
            </p>
            <p className="text-lg mb-2 text-left">
              {" "}
              <strong className="text-purple-500 text-xl">Ph :</strong>{" "}
              <strong className="text-black text-xl">
                +91-7548824694
              </strong>
            </p>
            <p className="text-lg mb-2 text-left">
              {" "}
              <strong className="text-purple-500 text-xl">
                Mail id :
              </strong>{" "}
              <strong className="text-black text-xl">
                22pw33@psgtech.ac.in
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
