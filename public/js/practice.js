// practice.js - Functionality for the practice questions page

document.addEventListener('DOMContentLoaded', function() {
    // Filter questions by topic and difficulty
    const topicFilter = document.getElementById('topic-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const generateButton = document.getElementById('generate-question');
    const questionsContainer = document.getElementById('questions-container');
    const questionElements = document.querySelectorAll('.question-container');

    function filterQuestions() {
        const selectedTopic = topicFilter.value;
        const selectedDifficulty = difficultyFilter.value;

        questionElements.forEach(question => {
            const questionTopic = question.dataset.topic;
            const questionMarks = question.dataset.marks;
            
            const topicMatch = selectedTopic === 'all' || questionTopic === selectedTopic;
            const difficultyMatch = selectedDifficulty === 'all' || questionMarks === selectedDifficulty;
            
            if (topicMatch && difficultyMatch) {
                question.style.display = 'block';
            } else {
                question.style.display = 'none';
            }
        });
    }

    if (topicFilter && difficultyFilter) {
        topicFilter.addEventListener('change', filterQuestions);
        difficultyFilter.addEventListener('change', filterQuestions);
    }
    
    // Handle generating new questions
    if (generateButton) {
        generateButton.addEventListener('click', function() {
            // Get selected topic and mark value
            const selectedTopic = topicFilter.value === 'all' ? 
                ['boom', 'depression', 'new-deal', 'ww2', 'cold-war', 'space-race'][Math.floor(Math.random() * 6)] : 
                topicFilter.value;
                
            const selectedMarks = difficultyFilter.value === 'all' ? 
                [4, 8, 12, 16][Math.floor(Math.random() * 4)] : 
                parseInt(difficultyFilter.value);
            
            // Get topic display name
            const topicDisplayNames = {
                'boom': 'The Boom',
                'depression': 'The Great Depression',
                'new-deal': 'The New Deal',
                'ww2': 'World War II',
                'cold-war': 'The Cold War',
                'space-race': 'The Space Race'
            };
            
            // Generate a new question
            const questionText = generateNewQuestion(selectedTopic, selectedMarks);
            let questionType = '';
            
            if (selectedMarks === 4) {
                questionType = 'Source Analysis';
            } else if (selectedMarks === 8) {
                questionType = 'Explanation';
            } else if (selectedMarks === 12) {
                questionType = 'Analysis';
            } else if (selectedMarks === 16) {
                questionType = 'Essay';
            }
            
            // Create new question container HTML
            const newQuestionHTML = `
                <div class="question-container" data-topic="${selectedTopic}" data-marks="${selectedMarks}">
                    <div class="question">
                        <div class="question-info">
                            <span class="topic">${topicDisplayNames[selectedTopic]}</span>
                            <span class="marks">${selectedMarks} Marks</span>
                        </div>
                        <h3>${questionType}</h3>
                        <p>${questionText}</p>
                        <textarea placeholder="Type your answer here..."></textarea>
                        <button class="btn primary submit-answer">Submit Answer</button>
                    </div>
                    <div class="loading">
                        <div class="spinner"></div>
                        <p>Analyzing your answer...</p>
                    </div>
                    <div class="feedback">
                        <h4>Feedback</h4>
                        <div class="score"></div>
                        <div class="suggestions"></div>
                        <div class="example-answer">
                            <h4>Example Answer</h4>
                            <div class="example-content"></div>
                            <button class="btn secondary toggle-example">Show Example Answer</button>
                        </div>
                    </div>
                </div>
            `;
            
            // Add the new question to the top of the questions container
            questionsContainer.insertAdjacentHTML('afterbegin', newQuestionHTML);
            
            // Add event listener to the new submit button
            const newSubmitButton = questionsContainer.querySelector('.question-container:first-child .submit-answer');
            addSubmitListener(newSubmitButton);
            
            // Scroll to the new question
            questionsContainer.querySelector('.question-container:first-child').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Helper function to add submit listener to buttons
    function addSubmitListener(button) {
        button.addEventListener('click', async function() {
            const questionContainer = this.closest('.question-container');
            const questionText = questionContainer.querySelector('.question p').textContent;
            const answerText = questionContainer.querySelector('textarea').value.trim();
            const topicText = questionContainer.querySelector('.topic').textContent;
            const marksText = questionContainer.querySelector('.marks').textContent;
            
            // Validate answer
            if (answerText.length < 10) {
                alert('Please provide a more detailed answer before submitting.');
                return;
            }

            // Show loading spinner
            const loadingElement = questionContainer.querySelector('.loading');
            loadingElement.classList.add('active');
            
            // Hide submit button while processing
            this.style.display = 'none';
            
            try {
                // Call the API to evaluate the answer
                const response = await evaluateAnswer(questionText, answerText, topicText, marksText);
                
                // Display feedback
                const feedbackElement = questionContainer.querySelector('.feedback');
                const scoreElement = questionContainer.querySelector('.score');
                const suggestionsElement = questionContainer.querySelector('.suggestions');
                
                scoreElement.innerHTML = `<p>Score: <strong>${response.score}/${response.maxScore}</strong></p>`;
                
                let suggestionsHTML = '<h4>Suggestions for improvement:</h4><ul>';
                response.suggestions.forEach(suggestion => {
                    suggestionsHTML += `<li>${suggestion}</li>`;
                });
                suggestionsHTML += '</ul>';
                
                suggestionsElement.innerHTML = suggestionsHTML;
                
                // Set up example answer
                const exampleElement = questionContainer.querySelector('.example-content');
                exampleElement.textContent = response.exampleAnswer;
                
                const toggleButton = questionContainer.querySelector('.toggle-example');
                toggleButton.addEventListener('click', function() {
                    if (exampleElement.style.display === 'block') {
                        exampleElement.style.display = 'none';
                        this.textContent = 'Show Example Answer';
                    } else {
                        exampleElement.style.display = 'block';
                        this.textContent = 'Hide Example Answer';
                    }
                });
                
                // Hide loading spinner and show feedback
                loadingElement.classList.remove('active');
                feedbackElement.classList.add('active');
                
                // Show submit button again for potential resubmission
                this.style.display = 'inline-block';
                
            } catch (error) {
                console.error('Error evaluating answer:', error);
                alert('There was an error evaluating your answer. Please try again later.');
                
                // Hide loading spinner and show submit button again
                loadingElement.classList.remove('active');
                this.style.display = 'inline-block';
            }
        });
    }

    // Handle answer submission and feedback for existing buttons
    const submitButtons = document.querySelectorAll('.submit-answer');
    submitButtons.forEach(button => {
        addSubmitListener(button);
    });

    // Function to call the Anthropic API for answer evaluation
    async function evaluateAnswer(question, answer, topic, marks) {
        try {
            // Extract the mark value from the string (e.g., "4 Marks" -> 4)
            const maxScore = parseInt(marks.match(/\d+/)[0]);
            
            // Call our serverless API endpoint that connects to Claude
            const response = await fetch('/api/evaluate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: question,
                    answer: answer,
                    topic: topic,
                    markScheme: maxScore
                }),
            });
            
            if (!response.ok) {
                throw new Error('API request failed');
            }
            
            const data = await response.json();
            
            return {
                score: data.score,
                maxScore: maxScore,
                suggestions: data.suggestions,
                exampleAnswer: data.exampleAnswer
            };
        } catch (error) {
            console.error('Error calling evaluation API:', error);
            
            // Fallback to local evaluation if API call fails
            return fallbackEvaluation(question, answer, topic, marks);
        }
    }
    
    // Fallback evaluation function if the API call fails
    function fallbackEvaluation(question, answer, topic, marks) {
        // Extract the mark value
        const maxScore = parseInt(marks.match(/\d+/)[0]);
        
        // Basic score calculation
        const answerWords = answer.split(' ').length;
        let score = Math.min(Math.floor(answerWords / 10), maxScore);
        
        // Generate basic feedback suggestions
        const suggestions = [];
        
        if (answerWords < 50) {
            suggestions.push('Your answer is too brief. Aim to provide more detail and examples.');
        }
        
        if (!answer.includes('example') && !answer.includes('instance') && !answer.includes('such as')) {
            suggestions.push('Include specific examples to support your points.');
        }
        
        if (!answer.includes('because') && !answer.includes('due to') && !answer.includes('as a result')) {
            suggestions.push('Explain the causes and effects more clearly using linking phrases.');
        }
        
        if (maxScore >= 8 && !answer.includes('however') && !answer.includes('on the other hand') && !answer.includes('conversely')) {
            suggestions.push('For higher mark questions, consider different perspectives or counterarguments.');
        }
        
        if (maxScore >= 12 && (!answer.includes('historian') && !answer.includes('interpretation'))) {
            suggestions.push('For essay questions, discuss different historical interpretations.');
        }
        
        if (suggestions.length === 0) {
            suggestions.push('Continue to develop your analytical skills by linking evidence to your arguments more explicitly.');
        }
        
        // Use local example generation
        const exampleAnswer = generateExampleAnswer(question, topic, maxScore);
        
        return {
            score: score,
            maxScore: maxScore,
            suggestions: suggestions,
            exampleAnswer: exampleAnswer
        };
    }
    
    // Function to generate an AQA GCSE-style example answer
    // In a real implementation, this would call the LLM API
    function generateExampleAnswer(question, topic, maxScore) {
        // This simulates what would normally be a call to an LLM API
        // In production, this would be replaced with an actual API call
        
        // Different response templates based on question type/mark scheme
        if (maxScore === 4) {
            // For 4-mark questions (describe/identify)
            return createLowMarkAnswer(question, topic);
        } else if (maxScore === 8) {
            // For 8-mark questions (explain)
            return createMediumMarkAnswer(question, topic);
        } else if (maxScore === 12) {
            // For 12-mark questions (analyze)
            return createHighMarkAnswer(question, topic, 12);
        } else if (maxScore === 16) {
            // For 16-mark questions (evaluate)
            return createHighMarkAnswer(question, topic, 16);
        } else {
            return "Unable to generate an example answer for this question format.";
        }
    }
    
    // Helper functions to generate answers of varying complexity
    function createLowMarkAnswer(question, topic) {
        // For 4-mark "describe" or "identify" questions
        if (topic === "The Boom") {
            if (question.includes("automobile industry")) {
                return "The automobile industry contributed to the economic boom in two significant ways. Firstly, mass production techniques pioneered by Henry Ford allowed cars to be produced quickly and cheaply, making them affordable to average Americans. For example, the price of the Model T fell from $850 in 1908 to $290 by 1924, creating a mass market for cars. Secondly, the automobile industry stimulated growth in related industries such as steel, glass, rubber, and petroleum. This created a multiplier effect, as for every worker employed in car manufacturing, many more were employed in these supporting industries.";
            } else {
                return "For 4-mark questions, you need to identify two clear points with specific supporting evidence. Make sure each point is fully developed with precise historical terminology and contextual knowledge. For example, if describing aspects of 1920s prosperity, you might discuss mass production techniques and their impact on consumer goods prices, followed by the growth of consumer credit which enabled more Americans to purchase expensive items.";
            }
        } else if (topic === "The Great Depression") {
            return "For 4-mark questions on the Great Depression, you should identify two clear factors with supporting evidence. For instance, discussing how bank failures directly impacted ordinary Americans by causing them to lose their savings, and then explaining how unemployment led to widespread poverty with specific statistics (e.g., unemployment rising to 25% by 1933). Each point should include specific examples, dates, or statistics.";
        } else {
            return "For 4-mark questions in AQA GCSE History, you need to identify two clear points with specific supporting evidence. Each point should be fully developed with precise historical details, dates, statistics, or examples. Aim for approximately 2-3 sentences per point, ensuring you demonstrate accurate historical knowledge rather than general statements.";
        }
    }
    
    function createMediumMarkAnswer(question, topic) {
        // For 8-mark "explain" questions
        if (topic === "The Great Depression" && question.includes("Wall Street Crash")) {
            return "The Wall Street Crash of 1929 had several interconnected causes. Overspeculation in the stock market was a primary factor, as ordinary Americans bought stocks on margin, paying as little as 10% of the value with the rest borrowed from brokers. This created an unsustainable bubble as stock prices became divorced from actual company performance. For example, RCA's stock value increased from $85 to $420 per share despite no increase in dividends.\n\nAnother cause was overproduction in industry and agriculture. American factories produced more goods than consumers could afford to buy, while farmers faced falling prices due to surplus crops. This economic imbalance meant that prosperity was built on unstable foundations.\n\nAdditionally, weak banking regulations allowed banks to engage in risky investment practices. Many banks used their customers' deposits to speculate in the stock market, and when stocks collapsed, these banks failed, taking their customers' savings with them.\n\nFinally, uneven wealth distribution meant that while industrial output increased by 50% in the 1920s, workers' wages only rose by 8%. This meant most Americans lacked the purchasing power to sustain economic growth, creating fundamental weakness in the economy.";
        } else if (topic === "Cold War" && question.includes("Potsdam Conference")) {
            return "The Potsdam Conference (July-August 1945) was highly significant in shaping early Cold War tensions in several ways. Firstly, it represented a crucial change in leadership and approach. President Truman, who replaced the deceased Roosevelt, adopted a more confrontational stance toward the Soviet Union than his predecessor. His diary entries reveal suspicion of Soviet motives, and he deliberately delayed the conference until the atomic bomb test was completed, demonstrating his intention to negotiate from a position of strength.\n\nSecondly, disagreements over Germany's future crystallized at Potsdam. While the Allied powers confirmed their intention to denazify and democratize Germany, they could not agree on specific approaches. Stalin demanded heavy reparations to rebuild the devastated Soviet economy, while the Western Allies, having witnessed the problems caused by reparations after World War I, resisted these demands. This fundamental disagreement led to the economic division of Germany, as each occupying power implemented different policies in their zones.\n\nThirdly, Potsdam revealed the growing mutual suspicion between former allies. When Truman casually informed Stalin about America's development of an \"unusually destructive weapon\" (the atomic bomb), Stalin's measured response suggested he already knew about it through Soviet espionage. This exchange highlighted the atmosphere of distrust and the beginning of what would become a nuclear arms race.\n\nFinally, the conference's ambiguous language regarding Eastern Europe allowed for different interpretations. While the Soviets believed their security interests in this region had been acknowledged, the Americans and British expected genuinely free elections. These conflicting expectations would soon lead to accusations of broken promises on both sides.";
        } else if (topic === "Space Race") {
            return "The Space Race reflected Cold War tensions between the USA and USSR in several important ways. First, space achievements became powerful propaganda tools in the ideological battle between communism and capitalism. When the Soviet Union launched Sputnik in 1957, they presented it as evidence of communist scientific superiority. Soviet Premier Khrushchev frequently boasted that Soviet space successes demonstrated the superiority of the communist system. Similarly, when the Americans landed on the moon in 1969, President Nixon described it as a victory for the democratic system.\n\nSecond, space technology was inextricably linked to military capability. The rockets that launched satellites and cosmonauts were modified intercontinental ballistic missiles. The Soviet R-7 rocket that launched Sputnik could also deliver nuclear warheads to American cities. Space achievements thus signaled each superpower's potential military reach and technological capability to the other side.\n\nThird, the Space Race reflected the competition for influence over non-aligned nations. Both superpowers used their space achievements to impress developing countries and win them as allies. For example, after Yuri Gagarin became the first human in space in 1961, he toured numerous countries in Africa and Asia as a Soviet goodwill ambassador, promoting the USSR's technological prowess.\n\nFourth, national security concerns drove much of the space competition. After Sputnik's launch, American officials worried about a \"missile gap\" and the vulnerability of American territory to Soviet surveillance and attack from space. This fear accelerated American missile and space programs, including spy satellite development.";
        } else {
            return "For 8-mark 'explain' questions in AQA GCSE History, you need to provide a detailed explanation of multiple factors, causes, or consequences. Structure your answer with clear paragraphs, each focusing on a different factor. Include specific historical evidence, such as dates, statistics, events, and examples to support each point. Make explicit connections between causes and effects, using phrases like 'this led to,' 'as a result,' and 'consequently.' Your explanation should demonstrate depth of knowledge and clear understanding of historical processes rather than just describing events.";
        }
    }
    
    function createHighMarkAnswer(question, topic, marks) {
        // For 12-mark and 16-mark "analyze" and "evaluate" questions
        if (topic === "The New Deal" && question.includes("How far do you agree")) {
            return "The New Deal had significant successes in addressing the immediate crisis of the Great Depression, though it did not fully resolve all economic problems. The New Deal's relief programs provided immediate aid to millions of suffering Americans. For example, the Civilian Conservation Corps (CCC) employed over 3 million young men, while the Works Progress Administration (WPA) employed 8.5 million people, constructing public buildings, roads, and bridges that benefited communities nationwide.\n\nRegulatory reforms also brought stability to key sectors. The Banking Act of 1933 restored confidence in the banking system, while the Securities and Exchange Commission (SEC) regulated the stock market to prevent the kind of speculation that led to the 1929 crash. The creation of the Federal Deposit Insurance Corporation (FDIC) protected ordinary citizens' bank deposits, preventing future bank runs.\n\nHowever, the New Deal had limitations. Unemployment remained high throughout the 1930s, never falling below 14% until World War II military mobilization. Some historians argue that the New Deal's restrictions on production and price controls may have actually prolonged recovery by interfering with market mechanisms. Conservative historian Burton Folsom contends that New Deal policies created uncertainty that discouraged business investment.\n\nFurthermore, certain groups received limited benefits. African Americans were often discriminated against in New Deal programs, and women were frequently directed toward lower-paying jobs. Agricultural policies benefited large landowners more than tenant farmers and sharecroppers.\n\nThe debate over the New Deal's effectiveness reflects different interpretations of government's proper role. Liberal historians like Arthur Schlesinger Jr. view it as a necessary adaptation of government to modern economic conditions, while conservatives see it as harmful overreach that damaged free enterprise. What is clear is that while the New Deal did not end the Depression, it provided critical relief, created a basic social safety net, and modernized American infrastructure in ways that benefited subsequent generations.";
        } else if (topic === "World War II" && question.includes("atomic bombs")) {
            return "The decision to use atomic weapons against Japan represents one of history's most complex moral and strategic questions, with multiple interpretations supported by compelling evidence.\n\nThe traditional interpretation, advocated by President Truman himself and historians like Herbert Feis, maintains that the bombs were dropped primarily to force Japan's surrender and avoid a costly invasion. Military planners estimated that Operation Downfall (the planned invasion of Japan) could result in up to 1 million American casualties and far more Japanese deaths. Evidence supporting this view includes Truman's diary entries expressing desire to avoid another Okinawa-style bloodbath \"from one end of Japan to the other.\" The fierce Japanese resistance at Iwo Jima and Okinawa suggested that an invasion would face fanatical opposition.\n\nHowever, revisionist historians like Gar Alperovitz argue that diplomatic considerations regarding the Soviet Union were equally important. According to this interpretation, the bombs were partially intended to impress the Soviets with American power and limit Soviet influence in postwar Asia. Evidence includes Secretary of State Byrnes' remarks about the bomb giving the US \"diplomatic bargaining power,\" and the timing of the bombings occurring shortly after the Potsdam Conference where Soviet-American tensions were evident.\n\nA third interpretation, advanced by historian Tsuyoshi Hasegawa, suggests Japan's surrender was primarily influenced by the Soviet declaration of war on August 8th, which eliminated Japan's hopes for Soviet mediation for a negotiated peace. The Supreme Council's discussions show greater concern about Soviet entry than the atomic bombings.\n\nRecent scholarship by historians like J. Samuel Walker suggests a synthesis: Truman and his advisors had multiple, overlapping motives. While saving American lives was genuinely important, demonstrating power to the Soviets, justifying the Manhattan Project's enormous cost, and avoiding prolonged negotiations were also significant factors.\n\nEvidence against the purely military necessity argument includes Japan's already devastated condition by August 1945, with naval blockades causing severe shortages, conventional bombing having destroyed 67 Japanese cities, and diplomatic signals suggesting potential surrender if the emperor could be retained.\n\nWhile saving American lives was certainly a primary motivation, the historical evidence suggests a more complex decision-making process involving diplomatic, political, and psychological factors beyond purely military considerations. This multifaceted understanding better reflects the complex moral calculations that accompany decisions in total war.";
        } else if (topic === "Cold War" && question.includes("Cuban Missile Crisis")) {
            return "The Cuban Missile Crisis of October 1962 certainly represents one of the Cold War's most perilous moments, though evaluating whether it was definitively the most dangerous requires comparison with other critical periods.\n\nThe crisis undoubtedly brought the world exceptionally close to nuclear war. When American U-2 spy planes discovered Soviet nuclear missiles being installed in Cuba, just 90 miles from Florida, the situation created immediate danger of unprecedented scale. Recently declassified documents reveal several moments when nuclear war was narrowly avoided. For instance, on October 27, 1962, a Soviet submarine commander nearly launched a nuclear torpedo after being depth-charged by US Navy vessels unaware the submarine carried nuclear weapons. Only the dissent of one officer, Vasili Arkhipov, prevented launch. Additionally, during the crisis, a U-2 spy plane accidentally strayed into Soviet airspace near Alaska, prompting Soviet fighters to scramble and American nuclear-armed fighters to launch in response—another potential flashpoint for conflict.\n\nThe concentration of decision-making power in so few hands during intense pressure made the situation particularly volatile. President Kennedy and Chairman Khrushchev were operating with incomplete information while facing intense political pressure. Recordings from Kennedy's Executive Committee meetings reveal serious consideration of military options that would likely have escalated to nuclear exchange.\n\nHowever, other Cold War crises also presented grave dangers. The Berlin Blockade (1948-49) marked the first direct confrontation between former allies. The Korean War (1950-53) saw American forces engage in direct combat with Chinese forces backed by Soviet support, with General MacArthur advocating using nuclear weapons. The 1983 NATO exercise Able Archer was interpreted by Soviet intelligence as potential preparation for a first strike, placing Soviet nuclear forces on high alert without American knowledge.\n\nWhen evaluating these crises, what distinguishes the Cuban Missile Crisis was the combination of geographic proximity, the direct involvement of both superpowers' core interests, compressed decision timeframes, and the backdrop of rapidly expanding nuclear arsenals. While other crises contained some of these elements, the Cuban Missile Crisis contained all of them simultaneously.\n\nHistorian Arthur Schlesinger Jr. characterized the crisis as \"the most dangerous moment in human history.\" However, historian Melvyn Leffler argues that because both leaders recognized the catastrophic consequences of nuclear war, they exercised more caution than during earlier crises when nuclear weapons were fewer but their effects less understood.\n\nOn balance, while other Cold War confrontations presented serious dangers, the Cuban Missile Crisis represented the moment when nuclear war was most imminent, making it justifiably characterized as the Cold War's most dangerous moment.";
        } else {
            if (marks === 12) {
                return "For 12-mark 'how far do you agree' questions in AQA GCSE History, you must present a balanced analysis that considers multiple perspectives. Begin with a clear introduction that outlines your overall judgment. In your main paragraphs, present arguments both for and against the statement, supporting each with detailed historical evidence including specific events, dates, and examples. Consider different historical interpretations, mentioning historians where relevant. Ensure all content directly addresses the question rather than narrating events. Conclude with a substantiated judgment that weighs the evidence presented and answers the question directly. Your response should demonstrate not just knowledge but analytical thinking about historical significance.";
            } else {
                return "For 16-mark essay questions in AQA GCSE History, you need to construct a sophisticated, balanced analysis with a clear line of argument. Begin with an introduction that outlines the key debate and states your position. Your main paragraphs should evaluate different perspectives, with detailed supporting evidence and reference to historian interpretations where relevant. Analyze the relative importance of different factors, explaining their interconnections rather than treating them in isolation. Throughout, maintain explicit focus on the question, using phrases like 'this suggests that' or 'this challenges the view that' to maintain relevance. Your conclusion should offer a nuanced judgment that acknowledges complexity while directly answering the question. For full marks, demonstrate not just factual knowledge but thoughtful engagement with historical significance and interpretation.";
            }
        }
    }
    
    // Function to dynamically generate new questions
    function generateNewQuestion(topic, markValue) {
        // This would ideally call an LLM API to generate contextually appropriate questions
        // For this demo, we'll simulate with predefined questions by topic and mark value
        
        const questionTemplates = {
            "boom": {
                4: [
                    "Describe two ways in which consumer credit contributed to the economic boom of the 1920s.",
                    "Describe two features of the new mass production techniques in American industry during the 1920s."
                ],
                8: [
                    "Explain the importance of the automobile industry to the American economy in the 1920s.",
                    "Explain how the growth of new industries contributed to American prosperity in the 1920s."
                ],
                12: [
                    "\"The main reason for American economic prosperity in the 1920s was the development of new consumer goods.\" How far do you agree with this statement?",
                    "\"Mass marketing was the main factor behind the economic boom of the 1920s.\" How far do you agree with this statement?"
                ],
                16: [
                    "\"The prosperity of the 1920s benefited all Americans equally.\" How far do you agree with this interpretation?",
                    "\"The economic boom of the 1920s created more problems than benefits for American society.\" How far do you agree with this interpretation?"
                ]
            },
            "depression": {
                4: [
                    "Describe two effects of the Wall Street Crash on ordinary Americans.",
                    "Describe two features of Hoover's response to the Great Depression."
                ],
                8: [
                    "Explain the key causes of the Wall Street Crash of 1929.",
                    "Explain why President Hoover's responses to the Great Depression were ineffective."
                ],
                12: [
                    "\"Overproduction was the main cause of the Great Depression.\" How far do you agree with this statement?",
                    "\"The Wall Street Crash was inevitable given the economic conditions of the 1920s.\" How far do you agree with this statement?"
                ],
                16: [
                    "\"The Great Depression was primarily caused by structural weaknesses in the American economy rather than the Wall Street Crash.\" How far do you agree with this interpretation?",
                    "\"President Hoover's response to the Great Depression was appropriate given the economic understanding of the time.\" How far do you agree with this interpretation?"
                ]
            },
            "new-deal": {
                4: [
                    "Describe two features of the First New Deal (1933-1934).",
                    "Describe two ways the New Deal attempted to address unemployment."
                ],
                8: [
                    "Explain why there was opposition to Roosevelt's New Deal.",
                    "Explain the significance of the Second New Deal in addressing the problems of the Great Depression."
                ],
                12: [
                    "\"The New Deal was successful in addressing the problems of the Great Depression.\" How far do you agree with this statement?",
                    "\"The New Deal fundamentally changed the relationship between the American people and their government.\" How far do you agree with this statement?"
                ],
                16: [
                    "\"The New Deal was a revolution in American politics.\" How far do you agree with this interpretation?",
                    "\"The New Deal failed to solve the economic problems of the Great Depression.\" How far do you agree with this interpretation?"
                ]
            },
            "ww2": {
                4: [
                    "Describe two ways in which World War II changed the economic position of women in America.",
                    "Describe two features of American industrial mobilization during World War II."
                ],
                8: [
                    "Explain the significance of Pearl Harbor in changing American foreign policy.",
                    "Explain how World War II ended the Great Depression in America."
                ],
                12: [
                    "\"American involvement in World War II was inevitable after the fall of France in 1940.\" How far do you agree with this statement?",
                    "\"The experience of World War II improved the position of African Americans in the United States.\" How far do you agree with this statement?"
                ],
                16: [
                    "\"The decision to drop atomic bombs on Hiroshima and Nagasaki was primarily motivated by the desire to end the war quickly and save American lives.\" How far do you agree with this interpretation?",
                    "\"America emerged from World War II as the world's leading superpower primarily because of the economic impact of the war.\" How far do you agree with this interpretation?"
                ]
            },
            "cold-war": {
                4: [
                    "Describe two features of the Truman Doctrine.",
                    "Describe two aspects of the arms race between the USA and USSR."
                ],
                8: [
                    "Explain the significance of the Potsdam Conference in shaping early Cold War tensions.",
                    "Explain why McCarthyism emerged in the United States in the late 1940s."
                ],
                12: [
                    "\"The Cold War was primarily caused by Soviet expansionism in Eastern Europe.\" How far do you agree with this statement?",
                    "\"The Cuban Missile Crisis was the most dangerous moment of the Cold War.\" How far do you agree with this statement?"
                ],
                16: [
                    "\"American fears of communism were justified during the early Cold War period (1945-1955).\" How far do you agree with this interpretation?",
                    "\"The principle of containment was the most effective American strategy during the Cold War.\" How far do you agree with this interpretation?"
                ]
            },
            "space-race": {
                4: [
                    "Describe two features of the American space program in the 1960s.",
                    "Describe two ways in which the launch of Sputnik affected the United States."
                ],
                8: [
                    "Explain how the Space Race reflected Cold War tensions between the USA and USSR.",
                    "Explain the significance of the Apollo 11 moon landing for the United States in the Cold War."
                ],
                12: [
                    "\"The main motivation for the Space Race was national prestige rather than scientific advancement.\" How far do you agree with this statement?",
                    "\"The United States won the Space Race.\" How far do you agree with this statement?"
                ],
                16: [
                    "\"The Space Race was more important symbolically than it was strategically during the Cold War.\" How far do you agree with this interpretation?",
                    "\"The Soviet Union's early successes in space were more impressive than America's moon landing.\" How far do you agree with this interpretation?"
                ]
            }
        };
        
        // Return a random question from the appropriate category
        const availableQuestions = questionTemplates[topic][markValue] || ["No appropriate questions available for this topic and mark value."];
        return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    }
});