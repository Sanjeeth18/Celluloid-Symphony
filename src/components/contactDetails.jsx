import React from "react";
import logo from "../assets/mine.jpg";

function ContactDetails() {
  return (
    <>
      <section className="rounded-2xl p-4 mb-3 bg-gradient-to-tr from-purple-500 to-indigo-600 text-orange-400">
        <div className="container  p-4">
          <div className="flex flex-col md:flex-row">
            <div className="w-full sm:my-auto md:w-1/3 ">
              <img
                src={logo}
                alt=""
                className="rounded-lg w-full h-auto max-w-xs md:max-w-sm lg:max-w-md object-cover  mx-auto"
              />
            </div>

            <div className="w-full my-auto lg:px-10 md:w-2/3  p-4">
              <h2 className="text-4xl text-left font-bold text-orange-400 mb-4">
                Sanjeeth J
              </h2>
              <p className="text-lg ">
                <strong className="text-purple-300 text-xl">16.07.2004</strong>{" "}
              </p>
              <p className="text-lg text-white">
                <strong className="text-purple-300 text-xl">
                  {" "}
                  PSG College Of Technology
                </strong>
              </p>
              <p className="text-lg text-white">
                <strong className="text-purple-300 text-xl">
                  50,periyar nagar,MSK Palayam
                </strong>{" "}
              </p>
              <p className="text-lg text-white">
                <strong className="text-purple-300 text-xl">
                  Coimbatore - 641015{" "}
                </strong>{" "}
              </p>

              <p className="text-lg text-white">
                <strong className="text-purple-300 text-xl">
                  {" "}
                  +91-7548824694
                </strong>{" "}
              </p>
              <p className="text-lg text-white">
                <strong className="text-purple-300 text-xl">
                  {" "}
                  22pw33@psgtech.ac.in
                </strong>{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactDetails;
