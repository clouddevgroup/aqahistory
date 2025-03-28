import React, { useState, useEffect } from 'react';

const WW2InteractiveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');

  const easyQuestions = [
    {
      question: 'When did World War II begin?',
      options: ['1935', '1939', '1941', '1945'],
      correctAnswer: 1,
      explanation: 'World War II began on September 1, 1939, when Nazi Germany invaded Poland.'
    },
    {
      question: 'Who was the Prime Minister of Britain during most of World War II?',
      options: ['Neville Chamberlain', 'Winston Churchill', 'Clement Attlee', 'Anthony Eden'],
      correctAnswer: 1,
      explanation: 'Winston Churchill served as Prime Minister from 1940 to 1945, leading Britain through most of World War II.'
    },
    {
      question: 'Which event brought the United States into World War II?',
      options: ['Fall of France', 'Battle of Britain', 'Attack on Pearl Harbor', 'Invasion of Italy'],
      correctAnswer: 2,
      explanation: 'The Japanese attack on Pearl Harbor on December 7, 1941, led to the United States declaring war on Japan, bringing America into World War II.'
    },
    {
      question: 'What was "Operation Barbarossa"?',
      options: ['Allied invasion of Sicily', 'German invasion of the Soviet Union', 'British bombing campaign', 'Japanese attack in the Pacific'],
      correctAnswer: 1,
      explanation: 'Operation Barbarossa was the code name for Nazi Germany\'s invasion of the Soviet Union, which began on June 22, 1941.'
    },
    {
      question: 'When did World War II end in Europe?',
      options: ['May 8, 1945', 'August 15, 1945', 'September 2, 1945', 'December 7, 1945'],
      correctAnswer: 0,
      explanation: 'Victory in Europe (VE) Day was celebrated on May 8, 1945, marking the end of World War II in Europe following Germany\'s surrender.'
    }
  ];

  const mediumQuestions = [
    {
      question: 'What was the codename for the Allied invasion of Normandy in 1944?',
      options: ['Operation Market Garden', 'Operation Overlord', 'Operation Torch', 'Operation Husky'],
      correctAnswer: 1,
      explanation: 'Operation Overlord was the codename for the Battle of Normandy, which began on June 6, 1944 (D-Day).'
    },
    {
      question: 'Which battle is considered the turning point of the war in the Pacific?',
      options: ['Battle of Coral Sea', 'Battle of Midway', 'Battle of Leyte Gulf', 'Battle of Iwo Jima'],
      correctAnswer: 1,
      explanation: 'The Battle of Midway in June 1942 is widely regarded as the turning point in the Pacific War, where the US Navy decisively defeated the Japanese fleet.'
    },
    {
      question: 'What was the "Battle of the Bulge"?',
      options: ['A naval battle in the Mediterranean', 'Germany\'s last major offensive on the Western Front', 'An air campaign over Germany', 'The Allied invasion of Italy'],
      correctAnswer: 1,
      explanation: 'The Battle of the Bulge (December 1944 - January 1945) was Germany\'s last major offensive campaign on the Western Front, creating a "bulge" in the Allied front line.'
    },
    {
      question: 'What was the significance of the Wannsee Conference in 1942?',
      options: ['Planning D-Day invasion', 'Coordinating the "Final Solution"', 'Discussing Allied bombing strategy', 'Arranging for Italian surrender'],
      correctAnswer: 1,
      explanation: 'The Wannsee Conference was held in January 1942 to coordinate the implementation of the "Final Solution to the Jewish Question" - the Nazi plan for the genocide of all European Jews.'
    },
    {
      question: 'Which city was the first to be attacked with an atomic bomb?',
      options: ['Tokyo', 'Hiroshima', 'Nagasaki', 'Osaka'],
      correctAnswer: 1,
      explanation: 'Hiroshima was the first city to be devastated by an atomic bomb, dropped by the United States on August 6, 1945.'
    }
  ];

  const hardQuestions = [
    {
      question: 'What was the significance of the Molotov-Ribbentrop Pact?',
      options: ['A trade agreement between the US and Britain', 'A non-aggression pact between Nazi Germany and the Soviet Union', 'An alliance between China and the US', 'A surrender document for Italy'],
      correctAnswer: 1,
      explanation: 'The Molotov-Ribbentrop Pact was a non-aggression pact between Nazi Germany and the Soviet Union signed in August 1939, which included a secret protocol dividing Eastern Europe into German and Soviet spheres of influence.'
    },
    {
      question: 'What was the key outcome of the Yalta Conference in February 1945?',
      options: ['Declaration of war against Japan', 'Plans for post-war division of Germany', 'Development of the Manhattan Project', 'Formation of NATO'],
      correctAnswer: 1,
      explanation: 'At the Yalta Conference, the Allied leaders (Roosevelt, Churchill, and Stalin) agreed on the post-war reorganization of Germany and Europe, including the division of Germany into occupation zones.'
    },
    {
      question: 'Which naval engagement was the largest in World War II?',
      options: ['Battle of the Coral Sea', 'Battle of Midway', 'Battle of Leyte Gulf', 'Battle of the Atlantic'],
      correctAnswer: 2,
      explanation: 'The Battle of Leyte Gulf (October 23-26, 1944) is considered the largest naval battle of World War II and possibly the largest naval battle in history.'
    },
    {
      question: 'What was Operation Paperclip?',
      options: ['The Allied bombing of Dresden', 'US program to recruit German scientists after the war', 'British intelligence operation in occupied France', 'The Nazi plan to destroy evidence of the Holocaust'],
      correctAnswer: 1,
      explanation: 'Operation Paperclip was a secret US intelligence program that recruited German scientists, engineers, and technicians for employment in the United States after WWII.'
    },
    {
      question: 'What was the significance of the breaking of the Enigma code?',
      options: ['It revealed Japanese naval positions', 'It allowed the Allies to intercept and decrypt German communications', 'It provided the formula for the atomic bomb', 'It exposed Soviet spies in the Manhattan Project'],
      correctAnswer: 1,
      explanation: 'Breaking the Enigma code allowed Allied forces to decrypt German military communications, providing crucial intelligence that historians estimate shortened the war by two to four years.'
    }
  ];

  const questionsMap = {
    easy: easyQuestions,
    medium: mediumQuestions,
    hard: hardQuestions
  };

  const [questions, setQuestions] = useState(mediumQuestions);

  useEffect(() => {
    setQuestions(questionsMap[difficulty]);
  }, [difficulty]);

  useEffect(() => {
    let timer;
    if (quizStarted && !showScore && !answered && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0 && !answered) {
      handleAnswerClick(null, true);
    }
    return () => clearTimeout(timer);
  }, [timeRemaining, quizStarted, showScore, answered]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setTimeRemaining(30);
  };

  const handleAnswerClick = (answerIndex, timeout = false) => {
    setAnswered(true);
    setSelectedAnswer(answerIndex);
    
    if (!timeout && answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setAnswered(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimeRemaining(30);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setAnswered(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimeRemaining(30);
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    handleRestart();
    setQuizStarted(false);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">World War II Interactive Quiz</h2>
      
      {!quizStarted ? (
        <div className="text-center w-full">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Select Difficulty:</h3>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => handleDifficultyChange('easy')}
                className={`px-4 py-2 rounded ${difficulty === 'easy' ? 'bg-green-600 text-white' : 'bg-green-200 text-green-800'}`}
              >
                Easy
              </button>
              <button 
                onClick={() => handleDifficultyChange('medium')}
                className={`px-4 py-2 rounded ${difficulty === 'medium' ? 'bg-yellow-600 text-white' : 'bg-yellow-200 text-yellow-800'}`}
              >
                Medium
              </button>
              <button 
                onClick={() => handleDifficultyChange('hard')}
                className={`px-4 py-2 rounded ${difficulty === 'hard' ? 'bg-red-600 text-white' : 'bg-red-200 text-red-800'}`}
              >
                Hard
              </button>
            </div>
          </div>
          <p className="mb-6 text-gray-700">Test your knowledge about World War II with this interactive quiz. You'll have 30 seconds to answer each question.</p>
          <button 
            onClick={handleStartQuiz}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Start Quiz
          </button>
        </div>
      ) : showScore ? (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Quiz Complete!</h3>
          <p className="text-2xl mb-6">Your Score: <span className="font-bold text-blue-600">{score}</span> out of {questions.length}</p>
          
          {score === questions.length ? (
            <p className="mb-6 text-green-600 font-semibold">Perfect score! You're a WW2 expert!</p>
          ) : score >= questions.length * 0.7 ? (
            <p className="mb-6 text-green-600">Great job! You know your WW2 history well!</p>
          ) : score >= questions.length * 0.5 ? (
            <p className="mb-6 text-yellow-600">Good effort! You have a solid understanding of WW2.</p>
          ) : (
            <p className="mb-6 text-red-600">Keep studying! WW2 is a complex but important topic to understand.</p>
          )}
          
          <button 
            onClick={handleRestart} 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-600">Question {currentQuestion + 1}/{questions.length}</span>
            <span className={`text-sm font-semibold ${timeRemaining <= 10 ? 'text-red-600' : 'text-gray-600'}`}>
              Time: {timeRemaining}s
            </span>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h3>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !answered && handleAnswerClick(index)}
                  disabled={answered}
                  className={`w-full p-3 text-left rounded-lg transition duration-200 ${
                    answered 
                      ? index === questions[currentQuestion].correctAnswer
                        ? 'bg-green-200 border-green-500 border-2'
                        : index === selectedAnswer
                          ? 'bg-red-200 border-red-500 border-2'
                          : 'bg-gray-200'
                      : 'bg-white hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {answered && (
            <div className="mb-6">
              <div className={`p-4 rounded-lg ${selectedAnswer === questions[currentQuestion].correctAnswer ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className="font-semibold mb-2">
                  {selectedAnswer === questions[currentQuestion].correctAnswer 
                    ? 'Correct!' 
                    : selectedAnswer === null 
                      ? 'Time\'s up!' 
                      : 'Incorrect!'}
                </p>
                <p>{questions[currentQuestion].explanation}</p>
              </div>
            </div>
          )}
          
          {answered && (
            <div className="flex justify-center">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WW2InteractiveQuiz;
