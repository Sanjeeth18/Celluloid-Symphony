import React from "react";

function Aboutcontent() {
  return (
    <div className="bg-gradient-to-b bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2
          className="text-5xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600"
          data-aos="fade-down"
          data-aos-offset="300"
          data-aos-once="false"
          data-aos-mirror="true"
        >
          About
        </h2>
        {/* Content */}
        <p
          className="text-xl  lg:text-2xl text-center mt-8 px-4 md:px-16 py-4 text-gray-300 leading-relaxed"
          data-aos="zoom-in"
          data-aos-offset="300"
          data-aos-once="false"
          data-aos-mirror="true"
        >
          <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent font-semibold">
            Celluloid Symphony
          </span>{" "}
          is a dynamic and responsive web application built with modern React
          features and styled using{" "}
          <span className="font-semibold text-green-500">TailwindCSS</span>. It
          offers a seamless user experience across devices by integrating{" "}
          <span className="bg-gray-700 px-2 py-1 rounded-md font-mono">
            useMediaQuery
          </span>{" "}
          to adapt layouts based on screen size.
        </p>
        <p
          className="text-xl lg:text-2xl text-center px-4 md:px-16 py-4 text-gray-300 leading-relaxed"
          data-aos="zoom-in"
          data-aos-offset="300"
          data-aos-once="false"
          data-aos-mirror="true"
        >
          The application utilizes{" "}
          <span className="font-semibold text-green-400">React Router</span> for
          smooth navigation and features modular components for maintainability
          and scalability. Real-time API calls dynamically fetch and display
          movie-related data, enhancing interactivity. Key React hooks like{" "}
          <span className="bg-gray-700 px-2 py-1 rounded-md font-mono">
            useState
          </span>
          ,{" "}
          <span className="bg-gray-700 px-2 py-1 rounded-md font-mono">
            useEffect
          </span>
          ,{" "}
          <span className="bg-gray-700 px-2 py-1 rounded-md font-mono">
            useLocation
          </span>
          , and{" "}
          <span className="bg-gray-700 px-2 py-1 rounded-md font-mono">
            useNavigate
          </span>{" "}
          streamline state management, lifecycle events, and navigation.
        </p>
        <p
          className="text-xl lg:text-2xl text-center px-4 md:px-16 py-4 text-gray-300 leading-relaxed"
          data-aos="zoom-in"
          data-aos-offset="200"
          data-aos-once="false"
          data-aos-mirror="true"
        >
          The app supports interactive Swipers to display visually appealing
          content efficiently.{" "}
          <span className="font-semibold text-green-500">TailwindCSS</span>{" "}
          accelerates styling with clean, utility-first classes, ensuring
          mobile-first responsiveness.{" "}
          <span className="bg-gray-700 px-2 py-1 rounded-md font-mono">
            useMediaQuery
          </span>{" "}
          helps conditionally render components, such as pagination and layout
          adjustments for different screen sizes.
        </p>
        <p
          className="text-xl lg:text-2xl text-center px-4 md:px-16 py-4 text-gray-300 leading-relaxed"
          data-aos="zoom-in"
          data-aos-offset="100"
          data-aos-once="false"
          data-aos-mirror="true"
        >
          By combining responsive design, interactive features, and a visually
          stunning interface,{" "}
          <span className="font-semibold text-green-400">
            Celluloid Symphony
          </span>{" "}
          creates a modern and user-friendly platform for multimedia
          exploration. Its modular design principles ensure the app is scalable,
          reusable, and easy to maintain, delivering a rich, engaging user
          experience.
        </p>
        {/* Decorative Line */}
        <div className="mt-12 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Aboutcontent;
