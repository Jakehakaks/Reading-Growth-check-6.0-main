// ============================================
// MAP PREP PLATFORM - COMPLETE SCRIPT
// ============================================

// ===== APP STATE =====
let appState = {
    userStats: {
        questionsAnswered: 0,
        questionsCorrect: 0,
        accuracy: 0,
        currentStreak: 0,
        bestStreak: 0,
        studyTime: 0,
        mistakes: []
    },
    sessionData: {
        currentSubject: 'math',
        currentGrade: '7',
        questionCount: 20,
        questions: [],
        currentQuestionIndex: 0,
        correct: 0,
        incorrect: 0
    }
};

// ===== GLOSSARY TERMS =====
const GLOSSARY = {
    math: {
        "Fraction": "A part of a whole number (e.g., 1/2)",
        "Decimal": "A number with a decimal point (e.g., 0.5)",
        "Percentage": "A number out of 100 (e.g., 50%)",
        "Ratio": "A comparison of two numbers (e.g., 3:2)",
        "Integer": "A whole number, positive or negative",
        "Exponent": "A small number showing repeated multiplication",
        "Prime": "A number with only 1 and itself as factors"
    },
    reading: {
        "Main Idea": "The most important point of a text",
        "Inference": "A conclusion based on clues in the text",
        "Theme": "The underlying message or lesson",
        "Context Clues": "Words around a word that help explain it",
        "Point of View": "Who is telling the story (first, second, third)",
        "Tone": "The author's attitude in their writing",
        "Author's Purpose": "The reason the author wrote the text"
    }
};

// ===== SIMPLE QUESTION BANK =====
const QUESTIONS = {
    math: {
        6: [
            { q: "What is 1/4 of 20?", a: ["4", "5", "10", "16"], c: 1 },
            { q: "7 × 8 = ?", a: ["54", "56", "64", "72"], c: 1 },
            { q: "50% of 80 = ?", a: ["40", "60", "80", "100"], c: 0 },
            { q: "144 ÷ 12 = ?", a: ["10", "11", "12", "13"], c: 2 }
        ],
        7: [
            { q: "Solve: x + 7 = 15", a: ["8", "22", "7", "15"], c: 0 },
            { q: "-5 + (-8) = ?", a: ["-13", "-3", "3", "13"], c: 0 },
            { q: "1/3 + 1/4 = ?", a: ["1/7", "2/7", "7/12", "2/12"], c: 2 }
        ],
        8: [
            { q: "Solve: 2x - 5 = 11", a: ["3", "6", "8", "16"], c: 2 },
            { q: "If f(x)=2x+3, what is f(4)?", a: ["7", "8", "11", "15"], c: 2 }
        ]
    },
    reading: {
        6: [
            { q: "What is the main idea?", p: "Sarah reads every day. She loves books.", a: ["Sarah is young", "Sarah loves reading", "Books are heavy"], c: 1 },
            { q: "What word means a safe place?", p: "The library was a sanctuary - quiet and safe.", a: ["Quiet place", "Safe place", "Big building"], c: 1 }
        ],
        7: [
            { q: "Why did she get an A?", p: "Emma studied 3 hours daily with flashcards.", a: ["Luck", "Hard work", "Smart"], c: 1 },
            { q: "What is the tone?", p: "I loved the concert! Amazing music!", a: ["Sad", "Excited", "Bored"], c: 1 }
        ],
        8: [
            { q: "What does this mean?", p: "They understood that systems need ideology.", a: ["Systems fail", "Systems need ideas", "Ideas are bad"], c: 1 }
        ]
    }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    updateAllStats();
    populateGlossary('math');
});

// ===== SCREEN MANAGEMENT =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) screen.classList.add('active');
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
    document.getElementById('glossaryScreen').classList.toggle('active');
}

function toggleSettings() {
    document.getElementById('settingsScreen').classList.toggle('active');
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
    showScreen('practiceModeScreen');
    updatePracticeTopics('math');
}

function startTestMode() {
    showScreen('testModeScreen');
    appState.sessionData.currentQuestionIndex = 0;
    appState.sessionData.correct = 0;
    generateTestQuestions();
}

function startEndlessMode() {
    showScreen('endlessModeScreen');
    appState.sessionData.currentQuestionIndex = 0;
    appState.sessionData.correct = 0;
    displayEndlessQuestion();
}

function startQuestionBank() {
    showScreen('questionBankScreen');
    displayQuestionBank();
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
    
    const topicList = Object.keys(QUESTIONS[subject]?.[grade] || {});
    topicSelect.innerHTML = '<option value="">Select a topic...</option>';
    topicSelect.appendChild(new Option('All Questions', 'all'));
}

function loadStudyContent() {
    const subject = document.getElementById('studySubject').value;
    const grade = document.getElementById('studyGrade').value;
    const contentArea = document.getElementById('studyContentArea');
    
    const questions = QUESTIONS[subject]?.[grade] || [];
    let html = `<div class="study-lesson"><h3>Lesson Content</h3>`;
    
    questions.forEach((q, i) => {
        html += `<div class="lesson-item">
            <h4>Example ${i + 1}:</h4>
            ${q.p ? `<div class="lesson-passage">${q.p}</div>` : ''}
            <div class="lesson-question"><strong>${q.q}</strong></div>
            <div class="lesson-answers">`;
        q.a.forEach((ans, j) => {
            html += `<div class="lesson-answer ${j === q.c ? 'correct' : ''}">${j === q.c ? '✓ ' : ''} ${ans}</div>`;
        });
        html += `</div></div>`;
    });
    
    html += '</div>';
    contentArea.innerHTML = html;
}

// ===== PRACTICE MODE =====
function selectPracticeSubject(subject) {
    appState.sessionData.currentSubject = subject;
    updatePracticeTopics(subject);
}

function updatePracticeTopics(subject) {
    const grade = document.getElementById('practiceGrade').value;
    // Grades available for each subject
}

function selectPracticeDifficulty(level) {
    appState.sessionData.currentDifficulty = level;
}

function selectPracticeCount(count) {
    appState.sessionData.questionCount = count;
}

function startPracticeQuestions() {
    const subject = appState.sessionData.currentSubject || 'math';
    const grade = document.getElementById('practiceGrade').value || '7';
    
    const questions = QUESTIONS[subject]?.[grade] || [];
    appState.sessionData.questions = questions;
    appState.sessionData.currentQuestionIndex = 0;
    appState.sessionData.correct = 0;
    appState.sessionData.incorrect = 0;
    
    document.getElementById('practiceSetup').style.display = 'none';
    document.getElementById('practiceQuestions').classList.remove('hidden');
    displayPracticeQuestion();
}

function displayPracticeQuestion() {
    const q = appState.sessionData.questions[appState.sessionData.currentQuestionIndex];
    if (!q) {
        endPracticeSession();
        return;
    }
    
    const container = document.getElementById('practiceQuestions');
    let html = `<div class="question-display">
        <div class="q-header">
            <span>Question ${appState.sessionData.currentQuestionIndex + 1}/${appState.sessionData.questions.length}</span>
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
    if (selectedIdx === correctIdx) {
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
    const total = appState.sessionData.correct + appState.sessionData.incorrect;
    const accuracy = total > 0 ? (appState.sessionData.correct / total * 100).toFixed(1) : 0;
    showResults(appState.sessionData.correct, total, accuracy);
}

// ===== TEST MODE =====
function generateTestQuestions() {
    const subjects = ['math', 'reading'];
    const questions = [];
    
    subjects.forEach(subject => {
        const grades = Object.keys(QUESTIONS[subject] || {});
        for (let i = 0; i < 10; i++) {
            const grade = grades[Math.floor(Math.random() * grades.length)];
            const qs = QUESTIONS[subject][grade];
            if (qs && qs.length > 0) {
                questions.push(qs[Math.floor(Math.random() * qs.length)]);
            }
        }
    });
    
    appState.sessionData.questions = questions.slice(0, 20);
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
    
    const progress = ((appState.sessionData.currentQuestionIndex + 1) / appState.sessionData.questions.length * 100).toFixed(0);
    document.getElementById('testProgressFill').style.width = progress + '%';
    document.getElementById('testQuestionCounter').textContent = `Question ${appState.sessionData.currentQuestionIndex + 1}/${appState.sessionData.questions.length}`;
    
    const container = document.getElementById('testQuestionArea');
    let html = `<div class="question-display">
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
    if (selectedIdx === correctIdx) appState.sessionData.correct++;
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
    const grades = Object.keys(QUESTIONS[subject]);
    const grade = grades[Math.floor(Math.random() * grades.length)];
    const qs = QUESTIONS[subject][grade];
    const q = qs[Math.floor(Math.random() * qs.length)];
    
    const accuracy = appState.sessionData.currentQuestionIndex > 0 
        ? (appState.sessionData.correct / appState.sessionData.currentQuestionIndex * 100).toFixed(0)
        : 0;
    
    document.getElementById('endlessAnswered').textContent = appState.sessionData.currentQuestionIndex + appState.sessionData.correct;
    document.getElementById('endlessCorrect').textContent = appState.sessionData.correct;
    document.getElementById('endlessAccuracy').textContent = accuracy + '%';
    document.getElementById('endlessStreak').textContent = appState.userStats.currentStreak;
    
    const container = document.getElementById('endlessQuestionArea');
    let html = `<div class="question-display">
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

// ===== QUESTION BANK =====
function displayQuestionBank() {
    const subject = document.getElementById('qbSubject').value;
    const grade = document.getElementById('qbGrade').value;
    const questions = QUESTIONS[subject]?.[grade] || [];
    
    const container = document.getElementById('questionList');
    let html = '<div class="questions-listing">';
    
    questions.forEach((q, idx) => {
        html += `<div class="qbank-item">
            <div class="qbank-q"><strong>Q${idx + 1}:</strong> ${q.q}</div>
            ${q.p ? `<div class="qbank-p">${q.p}</div>` : ''}
            <button class="btn-secondary" onclick="practiceQuestion(${idx})">Practice</button>
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
    appState.userStats.mistakes.forEach((m, i) => {
        html += `<div class="mistake-item">
            <div class="mistake-q">${m.question}</div>
            <div class="mistake-user-answer">Your answer: ${m.userAnswer}</div>
            <div class="mistake-correct">Correct: ${m.correctAnswer}</div>
        </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
    
    document.getElementById('mistakesCount').textContent = appState.userStats.mistakes.length + ' mistakes';
}

// ===== DAILY CHALLENGE =====
function generateDailyChallenge() {
    const questions = [];
    const subjects = ['math', 'reading'];
    
    for (let i = 0; i < 10; i++) {
        const subject = subjects[Math.floor(Math.random() * 2)];
        const grades = Object.keys(QUESTIONS[subject]);
        const grade = grades[Math.floor(Math.random() * grades.length)];
        const qs = QUESTIONS[subject][grade];
        if (qs && qs.length > 0) {
            questions.push(qs[Math.floor(Math.random() * qs.length)]);
        }
    }
    
    appState.sessionData.questions = questions;
    appState.sessionData.currentQuestionIndex = 0;
    appState.sessionData.correct = 0;
    displayDailyQuestion();
}

function displayDailyQuestion() {
    const q = appState.sessionData.questions[appState.sessionData.currentQuestionIndex];
    if (!q) {
        endDailyChallenge();
        return;
    }
    
    document.getElementById('dailyScore').textContent = `Score: ${appState.sessionData.correct}/${appState.sessionData.currentQuestionIndex}`;
    
    const container = document.getElementById('dailyQuestionArea');
    let html = `<div class="question-display">
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
    const score = appState.sessionData.correct;
    showResults(score, 10, (score / 10 * 100).toFixed(1));
}

// ===== AI TUTOR =====
function sendTutorMessage() {
    const input = document.getElementById('tutorInput');
    const message = input.value.trim();
    if (!message) return;
    
    const chatArea = document.getElementById('tutorChat');
    
    // Add user message
    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.innerHTML = `<div class="message-bubble user">${message}</div>`;
    chatArea.appendChild(userDiv);
    
    // Add tutor response
    setTimeout(() => {
        const response = generateTutorResponse(message);
        const tutorDiv = document.createElement('div');
        tutorDiv.className = 'tutor-message';
        tutorDiv.innerHTML = `<div class="message-bubble tutor">${response}</div>`;
        chatArea.appendChild(tutorDiv);
        chatArea.scrollTop = chatArea.scrollHeight;
    }, 500);
    
    input.value = '';
}

function generateTutorResponse(question) {
    const responses = {
        fraction: "A fraction shows a part of a whole, like 1/4 of a pizza.",
        mainidea: "Look for the most important point the author makes.",
        infer: "Use clues from the text to figure out something not directly stated.",
        percent: "A percentage is out of 100. 50% = half."
    };
    
    const q = question.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
        if (q.includes(key)) return response;
    }
    
    return "Great question! Break it into smaller parts. Can you relate it to something you know?";
}

function quickTutorQuestion(question) {
    document.getElementById('tutorInput').value = question;
    sendTutorMessage();
}

// ===== GLOSSARY =====
function populateGlossary(subject) {
    const terms = GLOSSARY[subject] || {};
    const container = document.getElementById('glossaryList');
    
    let html = '<div class="glossary-items">';
    Object.entries(terms).forEach(([term, def]) => {
        html += `<div class="glossary-item">
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

// ===== STATS =====
function updateAllStats() {
    document.getElementById('totalQuestionsAnswered').textContent = appState.userStats.questionsAnswered;
    document.getElementById('accuracyDisplay').textContent = appState.userStats.accuracy + '%';
    document.getElementById('streakCountDisplay').textContent = appState.userStats.currentStreak;
    document.getElementById('streakDisplay').textContent = '🔥 ' + appState.userStats.currentStreak;
}

function updateStatsDisplay() {
    document.getElementById('statsQuestionsTotal').textContent = appState.userStats.questionsAnswered;
    document.getElementById('statsOverallAccuracy').textContent = appState.userStats.accuracy + '%';
    document.getElementById('statsBestStreak').textContent = appState.userStats.bestStreak;
}

// ===== DATA MANAGEMENT =====
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
    if (confirm('Clear all data?')) {
        appState.userStats = {
            questionsAnswered: 0,
            questionsCorrect: 0,
            accuracy: 0,
            currentStreak: 0,
            bestStreak: 0,
            studyTime: 0,
            mistakes: []
        };
        localStorage.clear();
        updateAllStats();
        alert('Data cleared!');
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
