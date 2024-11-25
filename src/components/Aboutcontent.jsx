import React from "react";

function Aboutcontent() {
  return (
    <div className="my-10">
      <h2 className="text-5xl text-black text-center">About</h2>
      <p className="text-xl lg:text-3xl text-center px-2 md:px-16 py-4 text-orange-600">
        Celluloid Symphony is a dynamic and responsive web application built
        with modern React features and styled using TailwindCSS. It offers a
        seamless user experience across devices by integrating useMediaQuery to
        adapt layouts based on screen size. The application utilizes React
        Router for smooth navigation and features modular components for
        maintainability and scalability. Real-time API calls dynamically fetch
        and display movie-related data, enhancing interactivity. Key React hooks
        like useState, useEffect, useLocation, and useNavigate streamline state
        management, lifecycle events, and navigation. The app supports
        interactive Swipers to display visually appealing content efficiently.
        TailwindCSS accelerates styling with clean, utility-first classes,
        ensuring mobile-first responsiveness. useMediaQuery helps conditionally
        render components, such as pagination and layout adjustments for
        different screen sizes. The application gracefully handles desktop and
        mobile views, delivering a rich, engaging user experience. Modular
        design principles ensure the app is scalable, reusable, and easy to
        maintain. By combining responsive design, interactive features, and a
        visually stunning interface, Celluloid Symphony creates a modern and
        user-friendly platform for multimedia exploration.{" "}
      </p>
    </div>
  );
}

export default Aboutcontent;
