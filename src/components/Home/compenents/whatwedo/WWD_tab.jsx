import React from 'react';

const WhatWeDo = () => {
  const activities = [
    {
      number: "01",
      title: "Organize",
      description: "ACES hosts and coordinates various events, workshops, and seminars to enhance students' technical, cultural, and social skills."
    },
    {
      number: "02",
      title: "Collaborate",
      description: "ACES partners with diverse student clubs and organizations to promote interdisciplinary learning, networking, and teamwork."
    },
    {
      number: "03",
      title: "Manage University level Events",
      description: "ACES takes the lead in organizing and executing large-scale university events, conferences, and competitions, encouraging a spirit of community and excellence."
    }
  ];

  return (
    <div className="bg-[#0e0d0d] text-white py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <h3 className="text-base font-medium mb-8 sm:mb-12 bg-[#1C1C1C] block px-4 sm:px-6 py-3 rounded-full border-t border-t-white border-opacity-25 text-center sm:text-left w-fit mx-auto sm:mx-0">
          WHAT WE DO?
        </h3>

        {/* Activities List */} 
        <div className="space-y-8 sm:space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.number}
              className="flex flex-col sm:flex-row items-start sm:items-center bg-[#1C1C1C] border-t border-t-white border-opacity-25 rounded-3xl p-4 sm:p-6"
            >
              {/* Number and Title */}
              <div className="flex-shrink-0 w-full sm:w-1/2 mb-4 sm:mb-0 sm:pr-4 text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-medium flex justify-center sm:justify-start items-center gap-2">
                  <span className="text-white">{activity.number}.</span>
                  <span>{activity.title}</span>
                </h3>
              </div>

              {/* Description */}
              <div className="flex-grow text-center sm:text-left">
                <p className="text-white text-lg leading-relaxed sm:ml-12">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
