import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WatchHistoryContent from "../components/WatchHistoryContent";

function WatchHistory() {
  return (
    <div className="overflow-hidden min-h-screen flex flex-col" style={{ background: "var(--color-bg-primary)" }}>
      <Header />
      <main className="flex-grow">
        <WatchHistoryContent />
      </main>
      <Footer />
    </div>
  );
}

export default WatchHistory;
