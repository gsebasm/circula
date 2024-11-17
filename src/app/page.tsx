"use client";

import ChatbotInterface from "@/components/ChatbotInterface";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const handleNavigation = (path: string): void => {
    console.log(`Navigating to: ${path}`);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Sidebar onNavigate={handleNavigation} />
      <div className="lg:ml-64">
        <div className="max-w-2xl mx-auto h-screen">
          <ChatbotInterface />
        </div>
      </div>
    </main>
  );
}
