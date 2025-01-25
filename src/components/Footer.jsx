import React, { useEffect } from "react";
import "aos/dist/aos.css";

function Footer() {

  return (
    <footer className="text-white bg-gray-800">
      <div className="flex flex-wrap py-12">
        {/* About Section */}
        <div
          className="p-5 lg:p-10 w-full md:w-1/3"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-once="false"
          data-aos-mirror="true"
        >
          <h2 className="font-extrabold text-left text-2xl text-green-400">
            Celluloid Symphony
          </h2>
          <p className="text-gray-400 mt-3 leading-relaxed">
            Celluloid Symphony is a ReactJS project styled with Tailwind CSS,
            leveraging APIs to fetch movie details and ratings. It includes a
            powerful search feature for easy movie discovery. The application is
            fully responsive, ensuring seamless use across devices. Experience
            an intuitive interface for exploring and rating your favorite
            movies!
          </p>
        </div>

        {/* Address Section */}
        <div
          className="p-5 lg:p-10 w-full md:w-1/3"
          data-aos="zoom-in"
          data-aos-offset="300"
          data-aos-once="false"
          data-aos-mirror="true"
        >
          <h2 className="font-extrabold text-left text-xl text-green-400">
            Address
          </h2>
          <p className="text-gray-400 mt-3 leading-relaxed">
            57, Periyar Nagar, MSK Palayam
            <br />
            Coimbatore - 641015
          </p>
        </div>

        {/* Inquiries Section */}
        <div
          className="p-5 lg:p-10 w-full md:w-1/3"
          data-aos="fade-left"
          data-aos-offset="100"
          data-aos-once="false"
          data-aos-mirror="true"
        >
          <h2 className="font-extrabold text-left text-xl text-green-400">
            Inquiries
          </h2>
          <p className="text-gray-400 mt-3">
            <div className="flex items-center my-4 ">
              {" "}
              <div className="p-2 mr-2 bg-gray-700 rounded mx-1 hover:bg-green-500 transition">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
              </div>
              <a
                href="tel:+917548824694"
                className="text-white hover:text-green-400"
              >
                +91-7548824694
              </a>
            </div>{" "}
            <div className="flex items-center">
              {" "}
              <div className="p-2 mr-2 bg-gray-700 rounded mx-1 hover:bg-green-500 transition">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="grey"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>{" "}
              </div>
              <a
                href="mailto:22pw33@psgtech.ac.in"
                className="text-white hover:text-green-400"
              >
                22pw33@psgtech.ac.in
              </a>
            </div>{" "}
          </p>
          <ul className="flex my-4">
            <li className="p-2 bg-gray-700 rounded mx-1 hover:bg-green-500 transition">
              <a
                className="text-white"
                href="https://www.instagram.com/invites/contact/?igsh=14m5ohi8la29c&utm_content=4wrped5"
              >
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.233 5.488c-.843-.038-1.097-.046-3.233-.046s-2.389.008-3.232.046c-2.17.099-3.181 1.127-3.279 3.279-.039.844-.048 1.097-.048 3.233s.009 2.389.047 3.233c.099 2.148 1.106 3.18 3.279 3.279.843.038 1.097.047 3.233.047 2.137 0 2.39-.008 3.233-.046 2.17-.099 3.18-1.129 3.279-3.279.038-.844.046-1.097.046-3.233s-.008-2.389-.046-3.232c-.099-2.153-1.111-3.182-3.279-3.281zm-3.233 10.62c-2.269 0-4.108-1.839-4.108-4.108 0-2.269 1.84-4.108 4.108-4.108s4.108 1.839 4.108 4.108c0 2.269-1.839 4.108-4.108 4.108zm4.271-7.418c-.53 0-.96-.43-.96-.96s.43-.96.96-.96.96.43.96.96-.43.96-.96.96zm-1.604 3.31c0 1.473-1.194 2.667-2.667 2.667s-2.667-1.194-2.667-2.667c0-1.473 1.194-2.667 2.667-2.667s2.667 1.194 2.667 2.667zm4.333-12h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm.952 15.298c-.132 2.909-1.751 4.521-4.653 4.654-.854.039-1.126.048-3.299.048s-2.444-.009-3.298-.048c-2.908-.133-4.52-1.748-4.654-4.654-.039-.853-.048-1.125-.048-3.298 0-2.172.009-2.445.048-3.298.134-2.908 1.748-4.521 4.654-4.653.854-.04 1.125-.049 3.298-.049s2.445.009 3.299.048c2.908.133 4.523 1.751 4.653 4.653.039.854.048 1.127.048 3.299 0 2.173-.009 2.445-.048 3.298z" />
                </svg>
              </a>
            </li>
            <li className="p-2 bg-gray-700 rounded mx-1 hover:bg-green-500 transition">
              <a
                className="text-white"
                href="https://www.linkedin.com/in/sanjeeth-j-68a17a289"
              >
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </li>
            <li className="p-2 bg-gray-700 rounded mx-1 hover:bg-green-500 transition">
              <a className="text-white" href="https://github.com/Sanjeeth18">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 6c-3.313 0-6 2.686-6 6 0 2.651 1.719 4.9 4.104 5.693.3.056.396-.13.396-.289v-1.117c-1.669.363-2.017-.707-2.017-.707-.272-.693-.666-.878-.666-.878-.544-.373.041-.365.041-.365.603.042.92.619.92.619.535.917 1.403.652 1.746.499.054-.388.209-.652.381-.802-1.333-.152-2.733-.667-2.733-2.965 0-.655.234-1.19.618-1.61-.062-.153-.268-.764.058-1.59 0 0 .504-.161 1.65.615.479-.133.992-.199 1.502-.202.51.002 1.023.069 1.503.202 1.146-.776 1.648-.615 1.648-.615.327.826.121 1.437.06 1.588.385.42.617.955.617 1.61 0 2.305-1.404 2.812-2.74 2.96.216.186.412.551.412 1.111v1.646c0 .16.096.347.4.288 2.383-.793 4.1-3.041 4.1-5.691 0-3.314-2.687-6-6-6z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div
        className="text-center text-gray-500 border-t py-3 border-gray-600 pt-3"
        data-aos="flip-left"
        data-aos-offset="10"
        data-aos-once="false"
        data-aos-mirror="true"
        data-aos-delay="200"
      >
        <span>© {new Date().getFullYear()} All Rights Reserved</span>
      </div>
    </footer>
  );
}

export default Footer;
