import React, { useState } from 'react';

const WW2Timeline = () => {
  const [activeEvent, setActiveEvent] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const timelineEvents = [
    {
      id: 1,
      date: "September 1, 1939",
      title: "Germany Invades Poland",
      description: "Nazi Germany invades Poland, marking the beginning of World War II. Britain and France declare war on Germany two days later.",
      category: "major-event",
      image: true
    },
    {
      id: 2,
      date: "May-June 1940",
      title: "Battle of France",
      description: "Germany launches a successful offensive against France, Belgium, Luxembourg and the Netherlands. France falls and signs an armistice on June 22.",
      category: "major-event",
      image: true
    },
    {
      id: 3,
      date: "July-October 1940",
      title: "Battle of Britain",
      description: "The German air force (Luftwaffe) attempts to gain air superiority over the Royal Air Force. Britain's successful defense prevents a German invasion.",
      category: "major-event",
      image: true
    },
    {
      id: 4,
      date: "June 22, 1941",
      title: "Operation Barbarossa",
      description: "Germany invades the Soviet Union, breaking the non-aggression pact between the two countries. This opens the Eastern Front, which eventually becomes the largest theater of war in history.",
      category: "major-event",
      image: true
    },
    {
      id: 5,
      date: "December 7, 1941",
      title: "Attack on Pearl Harbor",
      description: "Japan attacks the US naval base at Pearl Harbor, Hawaii, bringing the United States into the war. The US declares war on Japan the following day.",
      category: "major-event",
      image: true
    },
    {
      id: 6,
      date: "June 1942",
      title: "Battle of Midway",
      description: "A decisive naval battle in the Pacific where the US Navy defeats the Japanese fleet, marking a turning point in the Pacific War.",
      category: "pacific",
      image: true
    },
    {
      id: 7,
      date: "July 1942 - February 1943",
      title: "Battle of Stalingrad",
      description: "A major battle on the Eastern Front where Soviet forces defeated the German army, marking a turning point in the war against Nazi Germany.",
      category: "eastern-front",
      image: true
    },
    {
      id: 8,
      date: "June 6, 1944",
      title: "D-Day (Operation Overlord)",
      description: "Allied forces land on the beaches of Normandy, France, beginning the liberation of Western Europe from Nazi control.",
      category: "major-event",
      image: true
    },
    {
      id: 9,
      date: "December 16, 1944 - January 25, 1945",
      title: "Battle of the Bulge",
      description: "The last major German offensive on the Western Front, ultimately defeated by Allied forces.",
      category: "western-front",
      image: false
    },
    {
      id: 10,
      date: "April-May 1945",
      title: "Battle of Berlin",
      description: "Soviet forces capture Berlin, leading to the suicide of Adolf Hitler and the collapse of the Nazi regime.",
      category: "eastern-front",
      image: true
    },
    {
      id: 11,
      date: "May 8, 1945",
      title: "VE Day (Victory in Europe)",
      description: "Nazi Germany surrenders unconditionally to the Allies, ending the war in Europe.",
      category: "major-event",
      image: true
    },
    {
      id: 12,
      date: "August 6 & 9, 1945",
      title: "Atomic Bombings of Hiroshima and Nagasaki",
      description: "The United States drops atomic bombs on the Japanese cities of Hiroshima and Nagasaki.",
      category: "pacific",
      image: true
    },
    {
      id: 13,
      date: "September 2, 1945",
      title: "Japanese Surrender",
      description: "Japan formally surrenders to the Allies aboard the USS Missouri in Tokyo Bay, officially ending World War II.",
      category: "major-event",
      image: true
    },
    {
      id: 14,
      date: "January 20, 1942",
      title: "Wannsee Conference",
      description: "Nazi officials meet to coordinate the implementation of the 'Final Solution to the Jewish Question' - the plan for the genocide of European Jews.",
      category: "holocaust",
      image: false
    },
    {
      id: 15,
      date: "February 1945",
      title: "Yalta Conference",
      description: "Allied leaders Roosevelt, Churchill, and Stalin meet to discuss the post-war reorganization of Germany and Europe.",
      category: "diplomacy",
      image: true
    }
  ];

  const filteredEvents = filterCategory === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.category === filterCategory);

  const getCategoryColor = (category) => {
    const colors = {
      'major-event': 'bg-red-500',
      'western-front': 'bg-blue-500',
      'eastern-front': 'bg-purple-500',
      'pacific': 'bg-green-500',
      'holocaust': 'bg-gray-700',
      'diplomacy': 'bg-yellow-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const getCategoryName = (category) => {
    const names = {
      'major-event': 'Major Event',
      'western-front': 'Western Front',
      'eastern-front': 'Eastern Front',
      'pacific': 'Pacific Theater',
      'holocaust': 'Holocaust',
      'diplomacy': 'Diplomacy'
    };
    return names[category] || category;
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">World War II Interactive Timeline</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Filter Events:</h3>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1 rounded text-sm font-medium ${
              filterCategory === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            All Events
          </button>
          {['major-event', 'western-front', 'eastern-front', 'pacific', 'holocaust', 'diplomacy'].map(category => (
            <button 
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                filterCategory === category 
                  ? `${getCategoryColor(category)} text-white` 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {getCategoryName(category)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="relative">
        {/* Timeline stem */}
        <div className="absolute left-4 top-0 w-1 h-full bg-gray-300 hidden md:block"></div>
        
        <div className="space-y-6">
          {filteredEvents.map(event => (
            <div key={event.id} className="flex flex-col md:flex-row">
              {/* Timeline node */}
              <div className="flex flex-row md:flex-col items-center md:w-36 mb-3 md:mb-0">
                <div className={`w-8 h-8 rounded-full ${getCategoryColor(event.category)} flex items-center justify-center text-white font-bold z-10`}>
                  {event.id}
                </div>
                <div className="ml-4 md:ml-0 md:mt-2 text-sm font-medium">{event.date}</div>
              </div>
              
              {/* Event card */}
              <div 
                className={`flex-grow bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all ${
                  activeEvent === event.id ? 'border-2 border-blue-500' : 'border border-gray-200'
                }`}
                onClick={() => setActiveEvent(activeEvent === event.id ? null : event.id)}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold">{event.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded text-white ${getCategoryColor(event.category)}`}>
                      {getCategoryName(event.category)}
                    </span>
                  </div>
                  
                  <p className="mt-2 text-gray-600">{event.description}</p>
                  
                  {activeEvent === event.id && event.image && (
                    <div className="mt-4">
                      <div className="bg-gray-200 w-full h-48 flex items-center justify-center rounded">
                        <img 
                          src={`/api/placeholder/400/300`} 
                          alt={`Placeholder for ${event.title}`}
                          className="max-h-full rounded"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1 italic text-center">
                        Click on events to expand/collapse details
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WW2Timeline;
