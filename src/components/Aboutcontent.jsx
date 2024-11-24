import React from "react";

function Aboutcontent() {
  return (
    <section className="rounded-2xl py-20 px-4 mb-3 bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-700">
      <h2 className="text-5xl text-orange-400 text-center">About</h2>
      <p className="text-3xl text-center px-16 py-4 text-gray-300">
        Celluloid Symphony is a highly responsive web application styled with
        TailwindCSS, offering a visually appealing and seamless user experience.
        The application integrates API calls to dynamically fetch and display
        data, ensuring real-time content updates. It incorporates modern React
        features, including hooks like useState, useEffect, useLocation, and
        useNavigate to manage state, lifecycle events, and navigation
        efficiently. React Router is employed for smooth and dynamic page
        routing, enhancing usability. Interactive Swipers are utilized for
        showcasing content in a sleek and engaging manner. The app is designed
        to handle both desktop and mobile views gracefully, prioritizing user
        responsiveness. Modular and reusable components improve maintainability
        and scalability. API integration allows fetching movie or
        multimedia-related data for a rich and interactive user experience. The
        use of TailwindCSS ensures rapid styling with minimal code. This modern
        approach creates a powerful, user-friendly, and visually stunning
        platform.
      </p>
    </section>
  );
}

export default Aboutcontent;
