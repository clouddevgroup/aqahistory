import React, { useState } from 'react';

const WW2KeyFigures = () => {
  const [activeTab, setActiveTab] = useState('allied');
  const [activeFigure, setActiveFigure] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const leaders = {
    allied: [
      {
        id: 'churchill',
        name: 'Winston Churchill',
        role: 'Prime Minister of the United Kingdom (1940-1945)',
        country: 'United Kingdom',
        keyFacts: [
          'Led Britain through most of World War II',
          'Famous for inspiring speeches like "We shall fight on the beaches"',
          'One of the "Big Three" Allied leaders with Roosevelt and Stalin',
          'Won the Nobel Prize for Literature in 1953 for his historical writings'
        ],
        quotes: [
          "We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets, we shall fight in the hills; we shall never surrender.",
          "Never in the field of human conflict was so much owed by so many to so few.",
          "This is not the end. It is not even the beginning of the end. But it is, perhaps, the end of the beginning."
        ]
      },
      {
        id: 'roosevelt',
        name: 'Franklin D. Roosevelt',
        role: 'President of the United States (1933-1945)',
        country: 'United States',
        keyFacts: [
          'Led the US through most of World War II and the Great Depression',
          'Established the "Lend-Lease" program to supply the Allies',
          'Approved the Manhattan Project that developed the atomic bomb',
          'Only US president elected to four terms'
        ],
        quotes: [
          "Yesterday, December 7, 1941 — a date which will live in infamy — the United States of America was suddenly and deliberately attacked by naval and air forces of the Empire of Japan.",
          "The only thing we have to fear is fear itself.",
          "We must be the great arsenal of democracy."
        ]
      },
      {
        id: 'stalin',
        name: 'Joseph Stalin',
        role: 'Premier of the Soviet Union (1922-1953)',
        country: 'Soviet Union',
        keyFacts: [
          'Led the Soviet Union through World War II',
          'Signed the Molotov-Ribbentrop Pact with Nazi Germany in 1939',
          'Directed the Soviet war effort after German invasion in 1941',
          'Participated in the Yalta and Potsdam Conferences',
          'Soviet forces captured Berlin in 1945'
        ],
        quotes: [
          "It is not heroes that make history, but history that makes heroes.",
          "The death of one man is a tragedy. The death of millions is a statistic.",
          "In the Soviet Army, it takes more courage to retreat than to advance."
        ]
      },
      {
        id: 'degaulle',
        name: 'Charles de Gaulle',
        role: 'Leader of Free France (1940-1944)',
        country: 'France',
        keyFacts: [
          'Refused to accept French surrender to Germany in 1940',
          'Led the Free French Forces from exile in London',
          'Maintained that France was still at war despite the armistice',
          'Later became President of France (1959-1969)'
        ],
        quotes: [
          "France has lost a battle. But France has not lost the war!",
          "Greatness is a road leading towards the unknown.",
          "I have come to the conclusion that politics are too serious a matter to be left to the politicians."
        ]
      },
      {
        id: 'truman',
        name: 'Harry S. Truman',
        role: 'President of the United States (1945-1953)',
        country: 'United States',
        keyFacts: [
          'Became president upon Roosevelt\'s death in April 1945',
          'Made the decision to use atomic bombs on Japan',
          'Oversaw the final defeat of Nazi Germany and Japan',
          'Helped establish the United Nations and NATO',
          'Implemented the Marshall Plan to rebuild Europe'
        ],
        quotes: [
          "The buck stops here.",
          "It is amazing what you can accomplish if you do not care who gets the credit.",
          "If you can't convince them, confuse them."
        ]
      }
    ],
    axis: [
      {
        id: 'hitler',
        name: 'Adolf Hitler',
        role: 'Führer of Nazi Germany (1934-1945)',
        country: 'Germany',
        keyFacts: [
          'Founder of Nazism and dictator of Germany',
          'Initiated World War II in Europe with the invasion of Poland',
          'Responsible for the Holocaust and genocide of approximately 6 million Jews',
          'Committed suicide in April 1945 as Allied forces closed in on Berlin'
        ],
        quotes: [
          "The great strength of the totalitarian state is that it forces those who fear it to imitate it.",
          "If you tell a big enough lie and tell it frequently enough, it will be believed.",
          "Demoralize the enemy from within by surprise, terror, sabotage, assassination. This is the war of the future."
        ]
      },
      {
        id: 'mussolini',
        name: 'Benito Mussolini',
        role: 'Il Duce of Fascist Italy (1922-1943)',
        country: 'Italy',
        keyFacts: [
          'Founder of Italian Fascism',
          'Formed alliance with Nazi Germany (the "Pact of Steel")',
          'Invaded Ethiopia, Albania, and Greece',
          'Deposed by the Grand Council of Fascism in 1943',
          'Executed by Italian partisans in 1945'
        ],
        quotes: [
          "It is better to live one day as a lion than 100 years as a sheep.",
          "Fascism conceives of the State as an absolute, in comparison with which all individuals or groups are relative.",
          "Democracy is beautiful in theory; in practice it is a fallacy."
        ]
      },
      {
        id: 'hirohito',
        name: 'Emperor Hirohito',
        role: 'Emperor of Japan (1926-1989)',
        country: 'Japan',
        keyFacts: [
          'Reigned during Japan\'s imperial expansion and World War II',
          'Role in war decisions remains debated by historians',
          'Announced Japan\'s surrender in 1945 ("Jewel Voice Broadcast")',
          'Retained as symbolic emperor during American occupation',
          'Transformed from divine ruler to constitutional monarch'
        ],
        quotes: [
          "The war situation has developed not necessarily to Japan's advantage.",
          "We have resolved to endure the unendurable and suffer what is insufferable.",
          "It is my earnest hope that peace will be restored and that mankind will be spared from further suffering and distress."
        ]
      },
      {
        id: 'tojo',
        name: 'Hideki Tojo',
        role: 'Prime Minister of Japan (1941-1944)',
        country: 'Japan',
        keyFacts: [
          'Prime Minister during the attack on Pearl Harbor',
          'Military leader who expanded Japan\'s war in the Pacific',
          'Resigned after the fall of Saipan in 1944',
          'Attempted suicide upon Japan\'s surrender',
          'Found guilty of war crimes and executed in 1948'
        ],
        quotes: [
          "America and England are seeking to destroy Japan.",
          "History will recognize us as a splendid people who should continue to exist for the stability and order of East Asia.",
          "We must not forget our ancestors' achievement in founding our empire and in enhancing the national prestige."
        ]
      }
    ],
    military: [
      {
        id: 'eisenhower',
        name: 'Dwight D. Eisenhower',
        role: 'Supreme Commander of Allied Forces in Europe',
        country: 'United States',
        keyFacts: [
          'Planned and supervised the invasion of North Africa and Sicily',
          'Supreme Commander for the D-Day invasion of Normandy',
          'Commanded the Allied forces in Europe until the end of the war',
          'Later became the 34th President of the United States (1953-1961)'
        ],
        quotes: [
          "In preparing for battle I have always found that plans are useless, but planning is indispensable.",
          "Leadership is the art of getting someone else to do something you want done because he wants to do it.",
          "What counts is not necessarily the size of the dog in the fight; it's the size of the fight in the dog."
        ]
      },
      {
        id: 'zhukov',
        name: 'Georgy Zhukov',
        role: 'Chief of General Staff, Soviet Red Army',
        country: 'Soviet Union',
        keyFacts: [
          'Led the defense of Moscow and Leningrad',
          'Commanded Soviet forces at the Battle of Stalingrad',
          'Directed the Soviet offensive to capture Berlin',
          'Accepted the German surrender in Berlin',
          'Most decorated general in the history of the Soviet Union'
        ],
        quotes: [
          "If we come to a minefield, our infantry attacks exactly as if it were not there.",
          "In war I would deal only with facts, not suppositions, for on suppositions you can reach any conclusion.",
          "It is not the troops who win the battles, but good generals with good troops."
        ]
      },
      {
        id: 'rommel',
        name: 'Erwin Rommel',
        role: 'German Field Marshal, "Desert Fox"',
        country: 'Germany',
        keyFacts: [
          'Commander of the Afrika Korps in North Africa',
          'Known for tactical brilliance and respected by his enemies',
          'Later commanded German defenses in Normandy (Atlantic Wall)',
          'Implicated in the July 20 plot to assassinate Hitler',
          'Forced to commit suicide by Hitler in 1944'
        ],
        quotes: [
          "The best form of welfare for the troops is first-rate training.",
          "In the absence of orders, find something and kill it.",
          "Don't fight a battle if you don't gain anything by winning."
        ]
      },
      {
        id: 'yamamoto',
        name: 'Isoroku Yamamoto',
        role: 'Commander-in-Chief of the Japanese Combined Fleet',
        country: 'Japan',
        keyFacts: [
          'Planned and executed the attack on Pearl Harbor',
          'Opposed war with the United States, predicting Japan\'s defeat',
          'Led the Japanese navy during the early Pacific campaigns',
          'Killed when his aircraft was shot down in 1943',
          'Considered Japan\'s greatest naval strategist'
        ],
        quotes: [
          "I fear all we have done is to awaken a sleeping giant and fill him with a terrible resolve.",
          "A military man can scarcely pride himself on having 'smitten a sleeping enemy'; it is more a matter of shame.",
          "In the first six to twelve months of a war with the United States and Great Britain, I will run wild and win victory after victory."
        ]
      }
    ]
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setActiveTab('search');
  };
  
  const handleCardClick = (id) => {
    setActiveFigure(activeFigure === id ? null : id);
  };
  
  // Get all figures in a single array for search functionality
  const allFigures = [
    ...leaders.allied,
    ...leaders.axis,
    ...leaders.military
  ];
  
  // Filter figures based on search term
  const searchResults = allFigures.filter(figure => 
    figure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    figure.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    figure.country.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Determine which figures to display based on active tab
  let displayedFigures;
  if (activeTab === 'search') {
    displayedFigures = searchResults;
  } else if (activeTab === 'allied') {
    displayedFigures = leaders.allied;
  } else if (activeTab === 'axis') {
    displayedFigures = leaders.axis;
  } else if (activeTab === 'military') {
    displayedFigures = leaders.military;
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">World War II Key Figures</h2>
      
      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, role, or country..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      {/* Tabs */}
      <div className="flex mb-6 border-b border-gray-300">
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'allied' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('allied')}
        >
          Allied Leaders
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'axis' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('axis')}
        >
          Axis Leaders
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'military' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('military')}
        >
          Military Commanders
        </button>
        {searchTerm && (
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'search' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Search Results ({searchResults.length})
          </button>
        )}
      </div>
      
      {/* Figure cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedFigures && displayedFigures.map(figure => (
          <div 
            key={figure.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all ${
              activeFigure === figure.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
            }`}
            onClick={() => handleCardClick(figure.id)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">{figure.name}</h3>
                  <p className="text-sm text-gray-600">{figure.role}</p>
                </div>
                <span className="px-2 py-1 text-xs rounded bg-gray-200 text-gray-700">{figure.country}</span>
              </div>
              
              {activeFigure === figure.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Key Facts:</h4>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                      {figure.keyFacts.map((fact, index) => (
                        <li key={index} className="text-sm text-gray-600">{fact}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Notable Quotes:</h4>
                    <div className="space-y-2">
                      {figure.quotes.map((quote, index) => (
                        <blockquote key={index} className="pl-3 border-l-2 border-gray-300 italic text-sm text-gray-600">
                          "{quote}"
                        </blockquote>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {activeTab === 'search' && searchResults.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No figures match your search. Try a different term.
        </div>
      )}
    </div>
  );
};

export default WW2KeyFigures;
