// ============================================
// MAP PREP PLATFORM - COMPREHENSIVE SCRIPT
// ============================================

// ===== COMPREHENSIVE QUESTION BANK =====
const QUESTION_BANK = {
    math: {
        6: {
            "Fractions": [
                { q: "What is 1/4 of 20?", a: ["4", "5", "10", "16"], c: 1, exp: "Divide 20 by 4 = 5" },
                { q: "Which is larger: 1/2 or 3/5?", a: ["1/2", "3/5", "Same", "Unknown"], c: 1, exp: "Convert to decimals: 1/2 = 0.5, 3/5 = 0.6" },
                { q: "What is 1/3 + 1/6?", a: ["1/9", "2/9", "1/2", "3/6"], c: 2, exp: "Common denominator: 2/6 + 1/6 = 3/6 = 1/2" }
            ],
            "Decimals": [
                { q: "Which is largest: 0.5, 0.05, 0.55?", a: ["0.5", "0.05", "0.55"], c: 2, exp: "0.55 > 0.5 > 0.05" },
                { q: "2.5 × 4 = ?", a: ["6.5", "8", "10", "12.5"], c: 2, exp: "2.5 × 4 = 10" }
            ],
            "Percentages": [
                { q: "What is 50% of 80?", a: ["40", "50", "60", "80"], c: 0, exp: "50% = 1/2, so 80 ÷ 2 = 40" },
                { q: "What percent is 20 out of 100?", a: ["20%", "25%", "30%", "50%"], c: 0, exp: "20/100 = 20%" }
            ],
            "Multiplication": [
                { q: "7 × 8 = ?", a: ["54", "56", "64", "72"], c: 1, exp: "7 × 8 = 56" },
                { q: "12 × 11 = ?", a: ["121", "132", "143", "144"], c: 1, exp: "12 × 11 = 132" }
            ],
            "Division": [
                { q: "144 ÷ 12 = ?", a: ["10", "11", "12", "13"], c: 2, exp: "144 ÷ 12 = 12" },
                { q: "225 ÷ 15 = ?", a: ["15", "14", "13", "12"], c: 0, exp: "225 ÷ 15 = 15" }
            ],
            "Geometry": [
                { q: "What is the perimeter of a rectangle with length 8 and width 5?", a: ["13", "26", "40", "80"], c: 1, exp: "P = 2(l+w) = 2(8+5) = 26" },
                { q: "What is the area of a square with side 5?", a: ["10", "20", "25", "30"], c: 2, exp: "A = s² = 5² = 25" }
            ],
            "Ratios": [
                { q: "If the ratio of boys to girls is 3:2 and there are 15 boys, how many girls?", a: ["10", "18", "25", "45"], c: 0, exp: "3/2 = 15/x, so x = 10" }
            ],
            "Measurement": [
                { q: "How many centimeters in 2.5 meters?", a: ["25", "250", "2500", "2.5"], c: 1, exp: "2.5 × 100 = 250 cm" }
            ]
        },
        7: {
            "Integers": [
                { q: "-5 + (-8) = ?", a: ["-13", "-3", "3", "13"], c: 0, exp: "Add negatives: -5 + (-8) = -13" },
                { q: "-10 - 5 = ?", a: ["-15", "-5", "5", "15"], c: 0, exp: "-10 - 5 = -15" }
            ],
            "Fractions": [
                { q: "1/3 + 1/4 = ?", a: ["1/7", "2/7", "7/12", "2/12"], c: 2, exp: "LCD = 12: 4/12 + 3/12 = 7/12" }
            ],
            "Algebra": [
                { q: "Solve: x + 7 = 15", a: ["8", "22", "7", "15"], c: 0, exp: "x = 15 - 7 = 8" },
                { q: "Solve: 2x = 16", a: ["8", "16", "32", "2"], c: 0, exp: "x = 16 ÷ 2 = 8" }
            ],
            "Probability": [
                { q: "Probability of rolling a 3 on a die?", a: ["1/6", "1/3", "1/2", "1/3"], c: 0, exp: "One 3 out of 6 possible outcomes" }
            ]
        },
        8: {
            "Linear Equations": [
                { q: "Solve: 2x - 5 = 11", a: ["3", "6", "8", "16"], c: 2, exp: "2x = 16, so x = 8" }
            ],
            "Quadratics": [
                { q: "Factor: x² + 5x + 6", a: ["(x+2)(x+3)", "(x+1)(x+6)", "(x+2)(x+2)", "(x-2)(x-3)"], c: 0, exp: "Two numbers multiply to 6 and add to 5: 2,3" }
            ],
            "Functions": [
                { q: "If f(x) = 2x + 3, what is f(4)?", a: ["7", "8", "11", "15"], c: 2, exp: "f(4) = 2(4) + 3 = 11" }
            ]
        },
        9: {
            "Polynomials": [
                { q: "Expand: (x+2)(x+3)", a: ["x²+5x+6", "x²+6x+5", "x²+x+6", "x²+2x+3"], c: 0, exp: "= x² + 3x + 2x + 6 = x² + 5x + 6" }
            ],
            "Exponents": [
                { q: "Simplify: x³ × x²", a: ["x⁵", "x⁶", "x¹", "2x"], c: 0, exp: "Add exponents: 3 + 2 = 5" }
            ]
        }
    },
    reading: {
        6: {
            "Main Idea": [
                { q: "What is the main idea?", p: "Sarah loves reading every day. She reads after school and before bed.", a: ["Sarah reads at night", "Sarah loves reading and does it often", "Books are important"], c: 1, exp: "Focus on Sarah's love and frequency of reading" },
                { q: "What is the passage mainly about?", p: "Birds migrate south in winter to find food and warmth.", a: ["Birds fly fast", "Birds migrate for food and warmth", "Winter is cold"], c: 1, exp: "The main idea is why birds migrate" }
            ],
            "Context Clues": [
                { q: "What does 'sanctuary' mean?", p: "The library was a sanctuary - a quiet, safe place to escape.", a: ["A big building", "A safe, quiet place", "A loud place"], c: 1, exp: "Words like quiet and safe tell us the meaning" }
            ],
            "Inference": [
                { q: "What can you infer?", p: "Maya put on her coat, scarf, and gloves. She packed hot chocolate.", a: ["It is hot", "It is cold", "It is raining"], c: 1, exp: "Winter clothes and hot chocolate suggest cold weather" }
            ],
            "Vocabulary": [
                { q: "What does 'persist' mean?", p: "Even though she failed once, she decided to persist and try again.", a: ["Give up", "Continue trying", "Rest"], c: 1, exp: "Persist means to keep going despite difficulty" }
            ],
            "Theme": [
                { q: "What is the theme?", p: "Tom wanted to quit soccer but kept trying. Soon he scored a goal!", a: ["Give up easily", "Never give up; keep trying", "Sports are hard"], c: 1, exp: "Tom's persistence led to success" }
            ]
        },
        7: {
            "Main Idea": [
                { q: "What is the central idea?", p: "Smartphones changed communication. People now text and video call anywhere, not just at home.", a: ["Phones are expensive", "Smartphones revolutionized communication", "Texting is better"], c: 1, exp: "The main idea is how smartphones changed communication" }
            ],
            "Inference": [
                { q: "What inference can you make?", p: "Emma studied 3 hours daily, made flashcards, took practice tests. She got an A.", a: ["Studying doesn't help", "Hard work leads to success", "Tests are easy"], c: 1, exp: "Hard work and preparation resulted in an A grade" }
            ],
            "Author's Purpose": [
                { q: "What is the author's purpose?", p: "Exercise improves health and reduces stress. Everyone should exercise 30 minutes daily.", a: ["Tell a story", "Persuade people to exercise", "Explain what exercise is"], c: 1, exp: "Author advocates for exercise" }
            ],
            "Compare and Contrast": [
                { q: "What is a key difference?", p: "Books need no electricity but are heavy. E-readers need power but are portable.", a: ["They're the same", "E-readers need power; books are heavier", "Books are better"], c: 1, exp: "Trade-offs between physical books and e-readers" }
            ]
        },
        8: {
            "Complex Inference": [
                { q: "Why did shareholders applaud?", p: "Company announced layoffs. Stock jumped 15%. Community expressed concern.", a: ["They were kind", "They expected higher profits", "They didn't care"], c: 1, exp: "Stock increase shows investors expected profit gains" }
            ],
            "Tone": [
                { q: "What is the tone?", p: "Destroying this beautiful meadow is deeply troubling. This precious space will be lost.", a: ["Neutral", "Concerned and disappointed", "Happy"], c: 1, exp: "Words like troubling and precious show concern" }
            ],
            "Complex Theme": [
                { q: "What theme emerges?", p: "She criticized the regime. After revolution, the new regime had different flaws. She realized systems need myths.", a: ["Revolutions always fail", "Systems depend on ideology", "Truth always wins"], c: 1, exp: "Systems require ideology to function" }
            ]
        },
        9: {
            "Sophisticated Analysis": [
                { q: "What does this reveal?", p: "Tech optimists believe innovation solves scarcity. Yet history shows new tech creates new inequalities.", a: ["Tech is bad", "Innovation is naive about complex problems", "Scarcity is gone"], c: 1, exp: "Author expresses skepticism about tech utopianism" }
            ]
        }
    }
};

const GLOSSARY = {
    math: {
        "Fraction": "A part of a whole number, shown as a numerator over a denominator (1/2)",
        "Decimal": "A number written with a decimal point, representing parts of 10",
        "Percentage": "A number out of 100, shown with the % symbol",
        "Ratio": "A comparison of two numbers (3:2)",
        "Equation": "A mathematical statement with an equals sign (x + 5 = 10)",
        "Variable": "A letter representing an unknown number",
        "Integer": "A whole number that can be positive, negative, or zero",
        "Exponent": "A small number showing how many times to multiply (2³ = 2×2×2)",
        "Prime": "A number with exactly two factors: 1 and itself",
        "Geometry": "The study of shapes and their properties"
    },
    reading: {
        "Main Idea": "The central message or most important point of a text",
        "Inference": "A conclusion based on clues and what you already know",
        "Theme": "The underlying message or lesson in a story",
        "Tone": "The author's attitude expressed in their writing",
        "Context Clues": "Words or phrases around an unfamiliar word that help explain its meaning",
        "Point of View": "The perspective from which a story is told (first, second, third person)",
        "Plot": "The sequence of events in a story",
        "Character": "A person in a story",
        "Setting": "The time and place where a story happens",
        "Figurative Language": "Words used in imaginative ways, not literal (metaphors, similes)"
    }
};

// ===== GLOBAL STATE =====
let appState = {
    currentScreen: 'home',
    currentMode: null,
    userStats: {
        questionsAnswered: 0,
        questionsCorrect: 0,
        accuracy: 0,
        currentStreak: 0,
        bestStreak: 0,
        studyTime: 0,
        topicStats: {},
        mistakes: []
    },
    sessionData: {
        currentSubject: 'math',
        currentGrade: '7',
        currentDifficulty: 'mixed',
        questionCount: 20,
        questions: [],
        currentQuestionIndex: 0,
        correct: 0,
        incorrect: 0,
        sessionStartTime: null
    }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadUserData();
    updateAllStats();
    showScreen('homeScreen');
}

// ===== SCREEN NAVIGATION =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
        appState.currentScreen = screenId;
    }
}

function goToHome() {
    showScreen('homeScreen');
    updateAllStats();
}

function goToStats() {
    showScreen('statsScreen');
    updateStatsDisplay();
}

function toggleGlossary() {
    const glossary = document.getElementById('glossaryScreen');
    glossary.classList.toggle('active');
    if (glossary.classList.contains('active')) {
        populateGlossary('math');
    }
}

function toggleSettings() {
    const settings = document.getElementById('settingsScreen');
    settings.classList.toggle('active');
}

function closeAllModals() {
    document.getElementById('glossaryScreen').classList.remove('active');
    document.getElementById('settingsScreen').classList.remove('active');
}

// ===== MODE STARTERS =====
function startStudyMode() {
    showScreen('studyModeScreen');
    updateStudyTopics();
}

function startPracticeMode() {
    appState.sessionData = { ...appState.sessionData, currentQuestionIndex: 0, correct: 0, incorrect: 0 };
    showScreen('practiceModeScreen');
    updatePracticeTopics('math');
}

function startTestMode() {
    appState.sessionData = { ...appState.sessionData, currentQuestionIndex: 0, correct: 0, incorrect: 0 };
    showScreen('testModeScreen');
    generateTestQuestions();
}

function startEndlessMode() {
    appState.sessionData = { ...appState.sessionData, currentQuestionIndex: 0, correct: 0, incorrect: 0, sessionStartTime: Date.now() };
    showScreen('endlessModeScreen');
    displayEndlessQuestion();
}

function startQuestionBank() {
    showScreen('questionBankScreen');
    updateQBTopics();
}

function startReviewMistakes() {
    showScreen('reviewMistakesScreen');
    displayMistakes();
}

function startDailyChallenge() {
    showScreen('dailyChallengeScreen');
    generateDailyChallenge();
}

function startAITutor() {
    showScreen('aiTutorScreen');
}

// ===== STUDY MODE =====
function updateStudyTopics() {
    const subject = document.getElementById('studySubject').value;
    const grade = document.getElementById('studyGrade').value;
    const topicSelect = document.getElementById('studyTopic');
    
    const topics = Object.keys(QUESTION_BANK[subject][grade] || {});
    topicSelect.innerHTML = '<option value="">Select a topic...</option>';
    topics.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic;
        topicSelect.appendChild(option);
    });
}

function loadStudyContent() {
    const subject = document.getElementById('studySubject').value;
    const grade = document.getElementById('studyGrade').value;
    const topic = document.getElementById('studyTopic').value;
    
    if (!topic) return;
    
    const questions = QUESTION_BANK[subject][grade][topic];
    const contentArea = document.getElementById('studyContentArea');
    
    let html = `<div class="study-lesson">
        <h3>${topic} - Grade ${grade} ${subject.charAt(0).toUpperCase() + subject.slice(1)}</h3>
        <div class="lesson-content">`;
    
    questions.forEach((q, idx) => {
        html += `
            <div class="lesson-item">
                <h4>Example ${idx + 1}:</h4>
                ${q.p ? `<p class="lesson-passage">${q.p}</p>` : ''}
                <p class="lesson-question"><strong>Q: ${q.q}</strong></p>
                <div class="lesson-answers">`;
                q.a.forEach((ans, i) => {
                    const isCorrect = i === q.c;
                    html += `<div class="lesson-answer ${isCorrect ? 'correct' : ''}">
                        ${isCorrect ? '✓' : ''} ${ans}
                    </div>`;
                });
                html += `</div>
                <p class="lesson-explanation"><strong>Explanation:</strong> ${q.exp}</p>
            </div>`;
    });
    
    html += `</div></div>`;
    contentArea.innerHTML = html;
}

// ===== PRACTICE MODE =====
function selectPracticeSubject(subject) {
    appState.sessionData.currentSubject = subject;
    updatePracticeTopics(subject);
}

function updatePracticeTopics(subject) {
    const grade = document.getElementById('practiceGrade').value;
    const topicSelect = document.getElementById('practiceTopic');
    
    const topics = Object.keys(QUESTION_BANK[subject][grade] || {});
    topicSelect.innerHTML = '<option value="all">All Topics</option>';
    topics.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic;
        topicSelect.appendChild(option);
    });
}

function selectPracticeDifficulty(level) {
    appState.sessionData.currentDifficulty = level;
}

function selectPracticeCount(count) {
    appState.sessionData.questionCount = count;
}

function startPracticeQuestions() {
    const subject = appState.sessionData.currentSubject;
    const grade = document.getElementById('practiceGrade').value;
    const topic = document.getElementById('practiceTopic').value;
    const count = appState.sessionData.questionCount;
    
    appState.sessionData.questions = getQuestions(subject, grade, topic, count);
    appState.sessionData.currentQuestionIndex = 0;
    appState.sessionData.correct = 0;
    appState.sessionData.incorrect = 0;
    appState.sessionData.sessionStartTime = Date.now();
    
    displayPracticeQuestion();
}

function displayPracticeQuestion() {
    const q = appState.sessionData.questions[appState.sessionData.currentQuestionIndex];
    if (!q) {
        endPracticeSession();
        return;
    }
    
    const container = document.getElementById('practiceQuestions');
    container.classList.remove('hidden');
    document.getElementById('practiceSetup').style.display = 'none';
    
    let html = `
        <div class="question-display">
            <div class="q-header">
                <span>Question ${appState.sessionData.currentQuestionIndex + 1}/${appState.sessionData.questions.length}</span>
                <span>Score: ${appState.sessionData.correct}/${appState.sessionData.currentQuestionIndex + appState.sessionData.correct + appState.sessionData.incorrect}</span>
            </div>
            ${q.p ? `<div class="passage">${q.p}</div>` : ''}
            <div class="question">${q.q}</div>
            <div class="answers">`;
    
    q.a.forEach((ans, idx) => {
        html += `<button class="answer-btn" onclick="selectPracticeAnswer(${idx}, ${q.c})">${ans}</button>`;
    });
    
    html += `</div></div>`;
    container.innerHTML = html;
}

function selectPracticeAnswer(selectedIdx, correctIdx) {
    const correct = selectedIdx === correctIdx;
    if (correct) {
        appState.sessionData.correct++;
        appState.userStats.currentStreak++;
    } else {
        appState.sessionData.incorrect++;
        appState.userStats.currentStreak = 0;
    }
    
    appState.sessionData.currentQuestionIndex++;
    setTimeout(() => displayPracticeQuestion(), 500);
}

function endPracticeSession() {
    const totalQuestions = appState.sessionData.correct + appState.sessionData.incorrect;
    const accuracy = totalQuestions > 0 ? (appState.sessionData.correct / totalQuestions * 100).toFixed(1) : 0;
    
    showResults(appState.sessionData.correct, totalQuestions, accuracy);
}

// ===== TEST MODE =====
function generateTestQuestions() {
    const numQuestions = Math.floor(Math.random() * 16) + 15; // 15-30
    const subjects = ['math', 'reading'];
    const questions = [];
    
    subjects.forEach(subject => {
        const gradesObj = QUESTION_BANK[subject];
        const grades = Object.keys(gradesObj);
        
        for (let i = 0; i < numQuestions / 2; i++) {
            const grade = grades[Math.floor(Math.random() * grades.length)];
            const topics = Object.keys(gradesObj[grade]);
            const topic = topics[Math.floor(Math.random() * topics.length)];
            const topicQs = gradesObj[grade][topic];
            const q = topicQs[Math.floor(Math.random() * topicQs.length)];
            questions.push({ ...q, subject, grade, topic });
        }
    });
    
    appState.sessionData.questions = questions;
    appState.sessionData.currentQuestionIndex = 0;
    appState.sessionData.correct = 0;
    displayTestQuestion();
}

function displayTestQuestion() {
    const q = appState.sessionData.questions[appState.sessionData.currentQuestionIndex];
    if (!q) {
        endTestSession();
        return;
    }
    
    const container = document.getElementById('testQuestionArea');
    const progress = ((appState.sessionData.currentQuestionIndex + 1) / appState.sessionData.questions.length * 100).toFixed(0);
    document.getElementById('testProgressFill').style.width = progress + '%';
    document.getElementById('testQuestionCounter').textContent = `Question ${appState.sessionData.currentQuestionIndex + 1}/${appState.sessionData.questions.length}`;
    
    let html = `
        <div class="question-display">
            ${q.p ? `<div class="passage">${q.p}</div>` : ''}
            <div class="question">${q.q}</div>
            <div class="answers">`;
    
    q.a.forEach((ans, idx) => {
        html += `<button class="answer-btn" onclick="selectTestAnswer(${idx}, ${q.c})">${ans}</button>`;
    });
    
    html += `</div></div>`;
    container.innerHTML = html;
}

function selectTestAnswer(selectedIdx, correctIdx) {
    if (selectedIdx === correctIdx) {
        appState.sessionData.correct++;
    }
    appState.sessionData.currentQuestionIndex++;
    setTimeout(() => displayTestQuestion(), 300);
}

function endTestSession() {
    const total = appState.sessionData.questions.length;
    const accuracy = (appState.sessionData.correct / total * 100).toFixed(1);
    showResults(appState.sessionData.correct, total, accuracy);
}

// ===== ENDLESS MODE =====
function displayEndlessQuestion() {
    const subjects = ['math', 'reading'];
    const subject = subjects[Math.floor(Math.random() * 2)];
    const gradesObj = QUESTION_BANK[subject];
    const grades = Object.keys(gradesObj);
    const grade = grades[Math.floor(Math.random() * grades.length)];
    const topics = Object.keys(gradesObj[grade]);
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const q = gradesObj[grade][topic][Math.floor(Math.random() * gradesObj[grade][topic].length)];
    
    window.endlessCurrentQuestion = { ...q, subject, topic };
    
    const container = document.getElementById('endlessQuestionArea');
    const accuracy = appState.sessionData.currentQuestionIndex > 0 
        ? (appState.sessionData.correct / appState.sessionData.currentQuestionIndex * 100).toFixed(0)
        : 0;
    
    document.getElementById('endlessAnswered').textContent = appState.sessionData.currentQuestionIndex + appState.sessionData.correct;
    document.getElementById('endlessCorrect').textContent = appState.sessionData.correct;
    document.getElementById('endlessAccuracy').textContent = accuracy + '%';
    document.getElementById('endlessStreak').textContent = appState.userStats.currentStreak;
    
    let html = `
        <div class="question-display">
            ${q.p ? `<div class="passage">${q.p}</div>` : ''}
            <div class="question">${q.q}</div>
            <div class="answers">`;
    
    q.a.forEach((ans, idx) => {
        html += `<button class="answer-btn" onclick="selectEndlessAnswer(${idx}, ${q.c})">${ans}</button>`;
    });
    
    html += `</div></div>`;
    container.innerHTML = html;
}

function selectEndlessAnswer(selectedIdx, correctIdx) {
    if (selectedIdx === correctIdx) {
        appState.sessionData.correct++;
        appState.userStats.currentStreak++;
    } else {
        appState.sessionData.incorrect++;
        appState.userStats.currentStreak = 0;
    }
    appState.sessionData.currentQuestionIndex++;
    setTimeout(() => displayEndlessQuestion(), 300);
}

function stopEndlessMode() {
    const total = appState.sessionData.currentQuestionIndex + appState.sessionData.correct;
    const accuracy = total > 0 ? (appState.sessionData.correct / total * 100).toFixed(1) : 0;
    showResults(appState.sessionData.correct, total, accuracy);
}

// ===== QUESTION BANK MODE =====
function updateQBTopics() {
    const subject = document.getElementById('qbSubject').value;
    const grade = document.getElementById('qbGrade').value;
    const topicSelect = document.getElementById('qbTopic');
    
    const topics = Object.keys(QUESTION_BANK[subject][grade] || {});
    topicSelect.innerHTML = '<option value="all">All Topics</option>';
    topics.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic;
        topicSelect.appendChild(option);
    });
    
    displayQuestionBank();
}

function displayQuestionBank() {
    const subject = document.getElementById('qbSubject').value;
    const grade = document.getElementById('qbGrade').value;
    const topic = document.getElementById('qbTopic').value;
    const difficulty = document.getElementById('qbDifficulty').value;
    
    const questions = getQuestions(subject, grade, topic, 100);
    const container = document.getElementById('questionList');
    
    let html = '<div class="questions-listing">';
    questions.forEach((q, idx) => {
        html += `
            <div class="qbank-item">
                <div class="qbank-q"><strong>Q${idx + 1}:</strong> ${q.q}</div>
                ${q.p ? `<div class="qbank-p">Passage: ${q.p.substring(0, 100)}...</div>` : ''}
                <div class="qbank-topic">${q.topic || topic}</div>
                <button class="btn-secondary" onclick="practiceQuestion('${btoa(JSON.stringify(q))}')">Practice This</button>
            </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

// ===== REVIEW MISTAKES =====
function displayMistakes() {
    const container = document.getElementById('mistakesList');
    if (appState.userStats.mistakes.length === 0) {
        container.innerHTML = '<p>No mistakes yet. Keep practicing!</p>';
        return;
    }
    
    let html = '<div class="mistakes-listing">';
    appState.userStats.mistakes.forEach((mistake, idx) => {
        html += `
            <div class="mistake-item">
                <div class="mistake-num">Mistake ${idx + 1}</div>
                <div class="mistake-q">${mistake.question}</div>
                <div class="mistake-user-answer">Your answer: ${mistake.userAnswer}</div>
                <div class="mistake-correct">Correct: ${mistake.correctAnswer}</div>
                <div class="mistake-topic">Topic: ${mistake.topic}</div>
                <button class="btn-secondary" onclick="tryMistakeAgain(${idx})">Try Again</button>
            </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
    
    document.getElementById('mistakesCount').textContent = appState.userStats.mistakes.length + ' mistakes';
}

// ===== DAILY CHALLENGE =====
function generateDailyChallenge() {
    const today = new Date().toDateString();
    const lastChallenge = localStorage.getItem('lastChallengeDate');
    
    if (lastChallenge === today) {
        // Already did today's challenge
        document.getElementById('dailyStatus').textContent = 'Challenge completed today';
    } else {
        const questions = [];
        for (let i = 0; i < 10; i++) {
            const subject = Math.random() > 0.5 ? 'math' : 'reading';
            const grade = ['6', '7', '8'][Math.floor(Math.random() * 3)];
            const gradeObj = QUESTION_BANK[subject][grade];
            const topics = Object.keys(gradeObj);
            const topic = topics[Math.floor(Math.random() * topics.length)];
            const q = gradeObj[topic][Math.floor(Math.random() * gradeObj[topic].length)];
            questions.push(q);
        }
        appState.sessionData.questions = questions;
        appState.sessionData.currentQuestionIndex = 0;
        appState.sessionData.correct = 0;
        displayDailyQuestion();
    }
}

function displayDailyQuestion() {
    const q = appState.sessionData.questions[appState.sessionData.currentQuestionIndex];
    if (!q) {
        endDailyChallenge();
        return;
    }
    
    const container = document.getElementById('dailyQuestionArea');
    document.getElementById('dailyScore').textContent = `Score: ${appState.sessionData.correct}/${appState.sessionData.currentQuestionIndex}`;
    
    let html = `
        <div class="question-display">
            ${q.p ? `<div class="passage">${q.p}</div>` : ''}
            <div class="question">${q.q}</div>
            <div class="answers">`;
    
    q.a.forEach((ans, idx) => {
        html += `<button class="answer-btn" onclick="selectDailyAnswer(${idx}, ${q.c})">${ans}</button>`;
    });
    
    html += `</div></div>`;
    container.innerHTML = html;
}

function selectDailyAnswer(selectedIdx, correctIdx) {
    if (selectedIdx === correctIdx) {
        appState.sessionData.correct++;
        appState.userStats.currentStreak++;
    } else {
        appState.userStats.currentStreak = 0;
    }
    appState.sessionData.currentQuestionIndex++;
    setTimeout(() => displayDailyQuestion(), 300);
}

function endDailyChallenge() {
    localStorage.setItem('lastChallengeDate', new Date().toDateString());
    const score = appState.sessionData.correct;
    showResults(score, 10, (score / 10 * 100).toFixed(1));
}

// ===== AI TUTOR =====
function sendTutorMessage() {
    const input = document.getElementById('tutorInput');
    const message = input.value.trim();
    if (!message) return;
    
    const chatArea = document.getElementById('tutorChat');
    const userMsg = document.createElement('div');
    userMsg.className = 'user-message';
    userMsg.innerHTML = `<div class="message-bubble user">${message}</div>`;
    chatArea.appendChild(userMsg);
    
    // Simulate AI response
    const tutorResponse = generateTutorResponse(message);
    setTimeout(() => {
        const tutorMsg = document.createElement('div');
        tutorMsg.className = 'tutor-message';
        tutorMsg.innerHTML = `<div class="message-bubble tutor">${tutorResponse}</div>`;
        chatArea.appendChild(tutorMsg);
        chatArea.scrollTop = chatArea.scrollHeight;
    }, 500);
    
    input.value = '';
}

function generateTutorResponse(question) {
    const responses = {
        fraction: "A fraction shows a part of a whole. The top number (numerator) shows how many parts, and the bottom (denominator) shows how many parts make a whole.",
        mainidea: "The main idea is the most important point the author makes. Look for what's repeated most or what all the details support.",
        infer: "To infer means to use clues from the text plus what you know to make a conclusion that isn't directly stated.",
        percent: "A percentage is a number out of 100. For example, 50% means 50 out of 100."
    };
    
    const lowerQ = question.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
        if (lowerQ.includes(key)) return response;
    }
    
    return "That's a great question! Remember to break down complex concepts into simpler parts. Try to relate it to something you already understand.";
}

function quickTutorQuestion(question) {
    document.getElementById('tutorInput').value = question;
    sendTutorMessage();
}

// ===== RESULTS =====
function showResults(correct, total, accuracy) {
    appState.userStats.questionsAnswered += total;
    appState.userStats.questionsCorrect += correct;
    appState.userStats.accuracy = (appState.userStats.questionsCorrect / appState.userStats.questionsAnswered * 100).toFixed(1);
    appState.userStats.bestStreak = Math.max(appState.userStats.bestStreak, appState.userStats.currentStreak);
    
    saveUserData();
    
    document.getElementById('resultScore').textContent = accuracy + '%';
    document.getElementById('resultQuestionsAnswered').textContent = total;
    document.getElementById('resultCorrect').textContent = correct;
    document.getElementById('resultAccuracy').textContent = accuracy + '%';
    
    showScreen('resultsScreen');
}

// ===== GLOSSARY =====
function populateGlossary(subject) {
    const terms = GLOSSARY[subject];
    const container = document.getElementById('glossaryList');
    
    let html = '<div class="glossary-items">';
    Object.entries(terms).forEach(([term, def]) => {
        html += `
            <div class="glossary-item">
                <div class="glossary-term">${term}</div>
                <div class="glossary-def">${def}</div>
            </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

function filterGlossary() {
    const search = document.getElementById('glossarySearch').value.toLowerCase();
    const items = document.querySelectorAll('.glossary-item');
    items.forEach(item => {
        const term = item.querySelector('.glossary-term').textContent.toLowerCase();
        item.style.display = term.includes(search) ? '' : 'none';
    });
}

// ===== STATS =====
function updateAllStats() {
    document.getElementById('totalQuestionsAnswered').textContent = appState.userStats.questionsAnswered;
    document.getElementById('accuracyDisplay').textContent = appState.userStats.accuracy + '%';
    document.getElementById('streakCountDisplay').textContent = appState.userStats.currentStreak;
    document.getElementById('studyTimeDisplay').textContent = (appState.userStats.studyTime / 60).toFixed(1) + 'h';
    document.getElementById('streakDisplay').textContent = '🔥 ' + appState.userStats.currentStreak;
}

function updateStatsDisplay() {
    document.getElementById('statsQuestionsTotal').textContent = appState.userStats.questionsAnswered;
    document.getElementById('statsOverallAccuracy').textContent = appState.userStats.accuracy + '%';
    document.getElementById('statsStudyTime').textContent = (appState.userStats.studyTime / 60).toFixed(1) + 'h';
    document.getElementById('statsBestStreak').textContent = appState.userStats.bestStreak;
}

// ===== UTILITIES =====
function getQuestions(subject, grade, topic, count) {
    const gradeObj = QUESTION_BANK[subject][grade];
    if (!gradeObj) return [];
    
    let questions = [];
    if (topic === 'all') {
        Object.values(gradeObj).forEach(topicQs => {
            questions = questions.concat(topicQs);
        });
    } else {
        questions = gradeObj[topic] || [];
    }
    
    return questions.slice(0, count);
}

function saveUserData() {
    localStorage.setItem('mapPrepUserStats', JSON.stringify(appState.userStats));
}

function loadUserData() {
    const saved = localStorage.getItem('mapPrepUserStats');
    if (saved) {
        appState.userStats = JSON.parse(saved);
    }
}

function clearAllData() {
    if (confirm('Clear all data? This cannot be undone.')) {
        appState.userStats = {
            questionsAnswered: 0,
            questionsCorrect: 0,
            accuracy: 0,
            currentStreak: 0,
            bestStreak: 0,
            studyTime: 0,
            topicStats: {},
            mistakes: []
        };
        localStorage.clear();
        updateAllStats();
        alert('All data cleared!');
    }
}

function saveAPIKey() {
    const key = document.getElementById('apiKeyInput').value;
    localStorage.setItem('openaiKey', key);
    alert('API key saved!');
}

function restartMode() {
    goToHome();
}

function reviewResults() {
    alert('Review feature coming soon!');
}

