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
        mistakes: [],
        subjectStats: {},
        gradeStats: {},
        topicStats: {},
        recentlyStudied: [],
        recentTests: [],
        daily: { streak: 0, lastCompleted: '', challengeDate: '', challengeQuestions: [] }
    },
    sessionData: {
        currentSubject: 'math',
        currentGrade: '7',
        questionCount: 20,
        questions: [],
        currentQuestionIndex: 0,
        correct: 0,
        incorrect: 0,
        responses: [],
        mode: '',
        startedAt: 0,
        hasAnswered: false,
        feedbackTimeout: null
    }
};

function handleAnswer(selectedIdx, correctIdx) {
    const mode = appState.sessionData.mode;
    if (mode === 'practice') selectPracticeAnswer(selectedIdx, correctIdx);
    else if (mode === 'test') selectTestAnswer(selectedIdx, correctIdx);
    else if (mode === 'endless') selectEndlessAnswer(selectedIdx, correctIdx);
    else if (mode === 'daily') selectDailyAnswer(selectedIdx, correctIdx);
}

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
// Use EXPANDED_QUESTIONS if available, otherwise use basic questions
let QUESTIONS;

if (typeof EXPANDED_QUESTIONS !== 'undefined') {
    // Flatten EXPANDED_QUESTIONS structure (Subject -> Grade -> Topic -> Questions)
    // into (Subject -> Grade -> [Questions]) format
    QUESTIONS = {};
    Object.keys(EXPANDED_QUESTIONS).forEach(subject => {
        QUESTIONS[subject] = {};
        Object.keys(EXPANDED_QUESTIONS[subject]).forEach(grade => {
            QUESTIONS[subject][grade] = [];
            Object.keys(EXPANDED_QUESTIONS[subject][grade]).forEach(topic => {
                const topicQuestions = EXPANDED_QUESTIONS[subject][grade][topic];
                if (Array.isArray(topicQuestions)) {
                    // Keep the topic metadata when flattening the bank. Several
                    // screens need it for their filters and selectors.
                    topicQuestions.forEach((question, index) => {
                        QUESTIONS[subject][grade].push({
                            ...question,
                            subject,
                            grade: String(grade),
                            topic,
                            // The supplied data has no difficulty metadata. Keep a
                            // stable, five-level classification for filtering and
                            // adaptive selection without changing the source data.
                            difficulty: question.difficulty || ['easy', 'easy', 'medium', 'medium', 'hard'][index % 5],
                            difficultyLevel: question.difficultyLevel || (index % 5) + 1,
                            questionType: question.questionType || (question.p ? 'Passage-based' : 'Multiple choice'),
                            explanation: question.explanation || ''
                        });
                    });
                }
            });
        });
    });
} else {
    QUESTIONS = {
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
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    updateAllStats();
    populateGlossary('math');

    // These selects have no inline handlers in the existing markup.
    document.getElementById('practiceGrade').addEventListener('change', () => {
        updatePracticeTopics(appState.sessionData.currentSubject || 'math');
    });
    document.getElementById('practiceTopic').addEventListener('change', event => {
        appState.sessionData.currentTopic = event.target.value;
    });
    document.getElementById('qbGrade').addEventListener('change', updateQBTopics);
    ['qbTopic', 'qbDifficulty', 'qbQuestionType'].forEach(id => {
        document.getElementById(id).addEventListener('change', displayQuestionBank);
    });
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
    updateOverlay();
    if (document.getElementById('glossaryScreen').classList.contains('active')) {
        populateGlossary('math');
    }
}

function toggleSettings() {
    document.getElementById('settingsScreen').classList.toggle('active');
    loadAPIKey();
    updateOverlay();
}

function closeAllModals() {
    document.getElementById('glossaryScreen').classList.remove('active');
    document.getElementById('settingsScreen').classList.remove('active');
    document.getElementById('overlay').style.display = 'none';
}

function updateOverlay() {
    const glossaryActive = document.getElementById('glossaryScreen').classList.contains('active');
    const settingsActive = document.getElementById('settingsScreen').classList.contains('active');
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.style.display = (glossaryActive || settingsActive) ? 'block' : 'none';
    }
}

// ===== MODE STARTERS =====
function startStudyMode() {
    showScreen('studyModeScreen');
    updateStudyTopics();
}

function startPracticeMode() {
    showScreen('practiceModeScreen');
    appState.sessionData.currentSubject = appState.sessionData.currentSubject || 'math';
    appState.sessionData.currentDifficulty = appState.sessionData.currentDifficulty || 'mixed';
    appState.sessionData.currentTopic = 'all';
    updatePracticeTopics(appState.sessionData.currentSubject);
    document.getElementById('practiceSetup').style.display = '';
    document.getElementById('practiceQuestions').classList.add('hidden');
}

function startTestMode() {
    showScreen('testModeScreen');
    renderAssessmentSetup(false);
}

function startCombinedAssessment() {
    showScreen('testModeScreen');
    renderAssessmentSetup(true);
}

function startEndlessMode() {
    showScreen('endlessModeScreen');
    appState.sessionData.currentQuestionIndex = 0;
    appState.sessionData.correct = 0;
    appState.sessionData.incorrect = 0;
    appState.sessionData.responses = [];
    appState.sessionData.mode = 'endless';
    appState.sessionData.startedAt = Date.now();
    appState.sessionData.difficultyReached = 1;
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
    const hasKey = !!getStoredApiKey();
    const chat = document.getElementById('tutorChat');
    if (chat && !chat.dataset.welcomed) {
        chat.dataset.welcomed = '1';
        chat.innerHTML = `<div class="tutor-message"><div class="message-bubble">Hi! I'm your AI tutor powered by <strong>ChatGPT (GPT-4o mini)</strong>. I can teach you any MAP test math or reading topic step by step with examples. ${hasKey ? 'You are ready to go.' : '<br><br>First, open <strong>Settings</strong> on the home screen and paste your OpenAI API key (starts with <code>sk-</code>). Get one at <strong>platform.openai.com</strong>.'}</div></div>`;
    }
}

// ===== STUDY MODE =====
function updateStudyTopics() {
    const subject = document.getElementById('studySubject').value;
    const grade = document.getElementById('studyGrade').value;
    const topicSelect = document.getElementById('studyTopic');
    
    const topicList = getTopics(subject, grade);
    topicSelect.innerHTML = '<option value="">Select a topic...</option>';
    topicSelect.appendChild(new Option('All Questions', 'all'));
    topicList.forEach(topic => topicSelect.appendChild(new Option(topic, topic)));
}

function loadStudyContent() {
    const subject = document.getElementById('studySubject').value;
    const grade = document.getElementById('studyGrade').value;
    const topic = document.getElementById('studyTopic').value;
    const contentArea = document.getElementById('studyContentArea');

    if (!topic) {
        contentArea.innerHTML = '<div class="study-placeholder">Select a topic to begin</div>';
        return;
    }
    const questions = getFilteredQuestions(subject, grade, topic, 'mixed');
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
    appState.sessionData.currentTopic = 'all';
    updatePracticeTopics(subject);
}

function updatePracticeTopics(subject) {
    const grade = document.getElementById('practiceGrade').value;
    const topicSelect = document.getElementById('practiceTopic');
    const topics = getTopics(subject, grade);
    const selectedTopic = appState.sessionData.currentTopic || 'all';

    topicSelect.innerHTML = '<option value="all">All Topics</option>';
    topics.forEach(topic => topicSelect.appendChild(new Option(topic, topic)));
    topicSelect.value = topics.includes(selectedTopic) ? selectedTopic : 'all';
    appState.sessionData.currentTopic = topicSelect.value;
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
    const topic = document.getElementById('practiceTopic').value || 'all';
    const difficulty = appState.sessionData.currentDifficulty || 'mixed';
    const count = appState.sessionData.questionCount || 20;
    const questions = getFilteredQuestions(subject, grade, topic, difficulty);

    appState.sessionData.questions = selectQuestions(questions, count);
    appState.sessionData.currentQuestionIndex = 0;
    appState.sessionData.correct = 0;
    appState.sessionData.incorrect = 0;
    appState.sessionData.responses = [];
    appState.sessionData.mode = 'practice';
    appState.sessionData.startedAt = Date.now();
    
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

    appState.sessionData.currentQuestion = q;
    
    if (appState.sessionData.feedbackTimeout) {
        clearTimeout(appState.sessionData.feedbackTimeout);
        appState.sessionData.feedbackTimeout = null;
    }
    
    const container = document.getElementById('practiceQuestions');
    appState.sessionData.hasAnswered = false;
    container.innerHTML = renderQuestionHTML(q, -1, false);
}

function selectPracticeAnswer(selectedIdx, correctIdx) {
    if (!claimCurrentAnswer('practiceQuestions')) return;
    const q = appState.sessionData.questions[appState.sessionData.currentQuestionIndex];
    const correct = selectedIdx === correctIdx;
    if (correct) {
        appState.sessionData.correct++;
        appState.userStats.currentStreak++;
    } else {
        appState.sessionData.incorrect++;
        appState.userStats.currentStreak = 0;
        recordMistake(q, selectedIdx);
    }
    recordAnswer(q, selectedIdx, correct, 'practice');
    
    if (isEnhancedReadingQuestion(q)) {
        document.getElementById('practiceQuestions').innerHTML = renderQuestionHTML(q, selectedIdx, true);
        appState.sessionData.feedbackTimeout = setTimeout(() => {
            appState.sessionData.currentQuestionIndex++;
            displayPracticeQuestion();
        }, 3000);
    } else {
        appState.sessionData.currentQuestionIndex++;
        setTimeout(() => displayPracticeQuestion(), 500);
    }
}

function endPracticeSession() {
    const total = appState.sessionData.correct + appState.sessionData.incorrect;
    const accuracy = total > 0 ? (appState.sessionData.correct / total * 100).toFixed(1) : 0;
    showResults(finishSession('practice'));
}

// ===== TEST MODE =====
function renderAssessmentSetup(combined) {
    const area = document.getElementById('testQuestionArea');
    document.getElementById('testQuestionCounter').textContent = combined ? 'Combined Assessment' : 'Assessment Setup';
    document.getElementById('testGradeLevel').textContent = combined ? 'Math and Reading, scored separately' : 'Choose your assessment';
    area.innerHTML = `
        <div class="practice-setup assessment-setup">
            <h3>${combined ? 'Combined Assessment' : 'Test Mode'}</h3>
            <p>${combined ? 'You will complete a Math section and a Reading section. Results stay separate.' : 'Questions stay within your selected subject and grade.'}</p>
            ${combined ? '' : `<div class="setup-section"><label>Subject</label><select id="testSubject"><option value="math">Math</option><option value="reading">Reading</option></select></div>`}
            <div class="setup-section"><label>Grade Level</label><select id="testGrade"><option value="6">Grade 6</option><option value="7">Grade 7</option><option value="8">Grade 8</option><option value="9">Grade 9</option><option value="all">All Grade Levels</option></select></div>
            <div class="setup-section"><label>Number of Questions ${combined ? 'per section (total = 2×)' : ''}</label><select id="testCount"><option value="30">30</option><option value="35">35</option><option value="40" selected>40</option><option value="45">45</option></select></div>
            <button class="btn-primary" onclick="beginAssessment(${combined})">Start ${combined ? 'Combined Assessment' : 'Test'}</button>
        </div>`;
}

function beginAssessment(combined) {
    const grade = document.getElementById('testGrade').value;
    const count = Number(document.getElementById('testCount').value);
    if (combined) {
        appState.combinedAssessment = { grade, count, section: 0, results: [] };
        beginAssessmentSection('math', grade, count);
    } else {
        beginAssessmentSection(document.getElementById('testSubject').value, grade, count);
    }
}

function beginAssessmentSection(subject, grade, count) {
    const pool = getAssessmentPool(subject, grade);
    if (!pool.length) {
        document.getElementById('testQuestionArea').innerHTML = '<p>No questions are available for that selection yet. Please choose another grade.</p>';
        return;
    }
    appState.sessionData = {
        ...appState.sessionData,
        mode: 'test', currentSubject: subject, currentGrade: grade, questionCount: count,
        questions: [], pool, usedQuestionIds: new Set(), currentQuestionIndex: 0, correct: 0, incorrect: 0,
        responses: [], startedAt: Date.now(), hasAnswered: false,
        estimatedAbility: grade === 'all' ? 215 : gradeBaseRit(grade), difficultyReached: 1
    };
    document.getElementById('testGradeLevel').textContent = `${subject === 'math' ? 'Math' : 'Reading'} · ${grade === 'all' ? 'All Grade Levels' : `Grade ${grade}`}`;
    displayTestQuestion();
}

function generateTestQuestions() {
    // Retained for compatibility with existing callers; Test Mode now begins from setup.
    startTestMode();
}

function displayTestQuestion() {
    if (appState.sessionData.currentQuestionIndex >= appState.sessionData.questionCount) {
        endTestSession();
        return;
    }
    const q = selectAdaptiveQuestion();
    if (!q) {
        endTestSession();
        return;
    }
    appState.sessionData.questions[appState.sessionData.currentQuestionIndex] = q;
    
    const progress = ((appState.sessionData.currentQuestionIndex + 1) / appState.sessionData.questions.length * 100).toFixed(0);
    document.getElementById('testProgressFill').style.width = progress + '%';
    document.getElementById('testQuestionCounter').textContent = `Question ${appState.sessionData.currentQuestionIndex + 1}/${appState.sessionData.questions.length}`;
    
    const container = document.getElementById('testQuestionArea');
    appState.sessionData.hasAnswered = false;
    if (appState.sessionData.feedbackTimeout) {
        clearTimeout(appState.sessionData.feedbackTimeout);
        appState.sessionData.feedbackTimeout = null;
    }
    container.innerHTML = renderQuestionHTML(q, -1, false);
}

function selectTestAnswer(selectedIdx, correctIdx) {
    if (!claimCurrentAnswer('testQuestionArea')) return;
    const q = appState.sessionData.questions[appState.sessionData.currentQuestionIndex];
    const correct = selectedIdx === correctIdx;
    if (correct) appState.sessionData.correct++;
    else {
        appState.sessionData.incorrect++;
        recordMistake(q, selectedIdx);
    }
    recordAnswer(q, selectedIdx, correct, 'test');
    updateAdaptiveAbility(q, correct);
    
    if (isEnhancedReadingQuestion(q)) {
        document.getElementById('testQuestionArea').innerHTML = renderQuestionHTML(q, selectedIdx, true);
        appState.sessionData.feedbackTimeout = setTimeout(() => {
            appState.sessionData.currentQuestionIndex++;
            displayTestQuestion();
        }, 3000);
    } else {
        appState.sessionData.currentQuestionIndex++;
        setTimeout(() => displayTestQuestion(), 300);
    }
}

function endTestSession() {
    const result = finishSession('test');
    if (appState.combinedAssessment) {
        appState.combinedAssessment.results.push(result);
        if (appState.combinedAssessment.section === 0) {
            appState.combinedAssessment.section = 1;
            beginAssessmentSection('reading', appState.combinedAssessment.grade, appState.combinedAssessment.count);
            return;
        }
        showCombinedResults(appState.combinedAssessment.results);
        appState.combinedAssessment = null;
        return;
    }
    showResults(result);
}

// ===== ENDLESS MODE =====
function displayEndlessQuestion() {
    let q = null;
    let attempts = 0;
    
    // Keep trying to find a valid question (max 10 attempts)
    while (!q && attempts < 10) {
        const subjects = ['math', 'reading'];
        const subject = subjects[Math.floor(Math.random() * 2)];
        const grades = Object.keys(QUESTIONS[subject]);
        const grade = grades[Math.floor(Math.random() * grades.length)];
        const qs = QUESTIONS[subject][grade];
        
        if (qs && qs.length > 0) {
            const candidate = qs[Math.floor(Math.random() * qs.length)];
            if (candidate && candidate.q && candidate.a && candidate.c !== undefined) {
                q = candidate;
                break;
            }
        }
        attempts++;
    }
    
    // If no valid question found after attempts, show error and stop
    if (!q) {
        document.getElementById('endlessQuestionArea').innerHTML = '<p>Error loading question. Please try again.</p>';
        return;
    }

    appState.sessionData.currentQuestion = q;
    
    const answered = appState.sessionData.currentQuestionIndex;
    const accuracy = answered > 0 
        ? (appState.sessionData.correct / answered * 100).toFixed(0)
        : 0;
    
    document.getElementById('endlessAnswered').textContent = answered;
    document.getElementById('endlessCorrect').textContent = appState.sessionData.correct;
    document.getElementById('endlessAccuracy').textContent = accuracy + '%';
    document.getElementById('endlessStreak').textContent = appState.userStats.currentStreak;
    
    const container = document.getElementById('endlessQuestionArea');
    appState.sessionData.hasAnswered = false;
    if (appState.sessionData.feedbackTimeout) {
        clearTimeout(appState.sessionData.feedbackTimeout);
        appState.sessionData.feedbackTimeout = null;
    }
    container.innerHTML = renderQuestionHTML(q, -1, false);
}

function selectEndlessAnswer(selectedIdx, correctIdx) {
    if (!claimCurrentAnswer('endlessQuestionArea')) return;
    const q = appState.sessionData.currentQuestion;
    const correct = selectedIdx === correctIdx;
    if (correct) {
        appState.sessionData.correct++;
        appState.userStats.currentStreak++;
    } else {
        appState.sessionData.incorrect++;
        appState.userStats.currentStreak = 0;
        recordMistake(q, selectedIdx);
    }
    appState.sessionData.difficultyReached = Math.max(appState.sessionData.difficultyReached || 1, q.difficultyLevel || 1);
    recordAnswer(q, selectedIdx, correct, 'endless');
    
    if (isEnhancedReadingQuestion(q)) {
        document.getElementById('endlessQuestionArea').innerHTML = renderQuestionHTML(q, selectedIdx, true);
        appState.sessionData.feedbackTimeout = setTimeout(() => {
            appState.sessionData.currentQuestionIndex++;
            displayEndlessQuestion();
        }, 3000);
    } else {
        appState.sessionData.currentQuestionIndex++;
        setTimeout(() => displayEndlessQuestion(), 300);
    }
}

function stopEndlessMode() {
    showResults(finishSession('endless'));
}

// ===== QUESTION BANK =====
function displayQuestionBank() {
    const subject = document.getElementById('qbSubject').value;
    const grade = document.getElementById('qbGrade').value;
    const topic = document.getElementById('qbTopic').value || 'all';
    const difficulty = document.getElementById('qbDifficulty').value || 'all';
    const questionType = document.getElementById('qbQuestionType').value || 'all';
    const questions = getFilteredQuestions(subject, grade, topic, difficulty === 'all' ? 'mixed' : difficulty)
        .filter(question => questionType === 'all' || question.questionType === questionType);
    appState.questionBankQuestions = questions;
    
    const container = document.getElementById('questionList');
    let html = '<div class="questions-listing">';
    
    questions.forEach((q, idx) => {
        html += `<div class="qbank-item">
            <div class="qbank-q"><strong>Q${idx + 1}:</strong> ${q.q}</div>
            ${q.passage_title ? `<div class="qbank-p"><em>${q.passage_title}</em></div>` : ''}
            ${q.p ? `<div class="qbank-p">${q.p.substring(0, 150)}${q.p.length > 150 ? '...' : ''}</div>` : ''}
            <button class="btn-secondary" onclick="practiceQuestion(${idx})">Practice</button>
        </div>`;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function updateQBTopics() {
    const subject = document.getElementById('qbSubject').value;
    const grade = document.getElementById('qbGrade').value;
    const topicSelect = document.getElementById('qbTopic');
    const currentTopic = topicSelect.value;
    const topics = getTopics(subject, grade);

    topicSelect.innerHTML = '<option value="all">All Topics</option>';
    topics.forEach(topic => topicSelect.appendChild(new Option(topic, topic)));
    topicSelect.value = topics.includes(currentTopic) ? currentTopic : 'all';
    displayQuestionBank();
}

function practiceQuestion(index) {
    const question = appState.questionBankQuestions?.[index];
    if (question) startSinglePracticeQuestion(question);
}

function startSinglePracticeQuestion(question) {
    appState.sessionData.questions = [question];
    appState.sessionData.currentQuestionIndex = 0;
    appState.sessionData.correct = 0;
    appState.sessionData.incorrect = 0;
    appState.sessionData.currentSubject = question.subject || appState.sessionData.currentSubject;
    appState.sessionData.hasAnswered = false;
    showScreen('practiceModeScreen');
    document.getElementById('practiceSetup').style.display = 'none';
    document.getElementById('practiceQuestions').classList.remove('hidden');
    displayPracticeQuestion();
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
            <div class="mistake-topic">Topic: ${m.topic || 'General'} · Difficulty: ${difficultyLabel(m.difficultyLevel || 3)}</div>
            <div class="setting-desc">${m.explanation || `The correct answer is ${m.correctAnswer}. Review the clues and the ${m.topic || 'skill'} before trying again.`}</div>
            <button class="btn-secondary" onclick="tryMistakeAgain(${i})">Try Again</button>
        </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
    
    document.getElementById('mistakesCount').textContent = appState.userStats.mistakes.length + ' mistakes';
}

function tryMistakeAgain(index) {
    const mistake = appState.userStats.mistakes[index];
    if (!mistake) return;
    startSinglePracticeQuestion({
        q: mistake.question,
        p: mistake.passage,
        passage_title: mistake.passage_title,
        a: mistake.answers,
        a_explanations: mistake.a_explanations,
        hint: mistake.hint,
        c: mistake.correctIndex,
        subject: mistake.subject,
        grade: mistake.grade,
        topic: mistake.topic,
        difficulty: mistake.difficulty,
        difficultyLevel: mistake.difficultyLevel,
        explanation: mistake.explanation
    });
}

// ===== DAILY CHALLENGE =====
function generateDailyChallenge() {
    const today = new Date().toISOString().slice(0, 10);
    const daily = appState.userStats.daily;
    if (daily.challengeDate !== today || !daily.challengeQuestions?.length) {
        daily.challengeDate = today;
        daily.challengeQuestions = makeDailyQuestions(today).map(questionId);
        daily.completed = false;
    }
    const questions = daily.challengeQuestions.map(getQuestionById).filter(Boolean);
    appState.sessionData.questions = questions;
    appState.sessionData.currentQuestionIndex = 0;
    appState.sessionData.correct = 0;
    appState.sessionData.incorrect = 0;
    appState.sessionData.responses = [];
    appState.sessionData.mode = 'daily';
    appState.sessionData.startedAt = Date.now();
    document.getElementById('dailyStreak').textContent = `🔥 Streak: ${daily.streak || 0}`;
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
    appState.sessionData.hasAnswered = false;
    if (appState.sessionData.feedbackTimeout) {
        clearTimeout(appState.sessionData.feedbackTimeout);
        appState.sessionData.feedbackTimeout = null;
    }
    container.innerHTML = renderQuestionHTML(q, -1, false);
}

function selectDailyAnswer(selectedIdx, correctIdx) {
    if (!claimCurrentAnswer('dailyQuestionArea')) return;
    const q = appState.sessionData.questions[appState.sessionData.currentQuestionIndex];
    const correct = selectedIdx === correctIdx;
    if (correct) {
        appState.sessionData.correct++;
        appState.userStats.currentStreak++;
    } else {
        appState.sessionData.incorrect++;
        appState.userStats.currentStreak = 0;
        recordMistake(q, selectedIdx);
    }
    recordAnswer(q, selectedIdx, correct, 'daily');
    
    if (isEnhancedReadingQuestion(q)) {
        document.getElementById('dailyQuestionArea').innerHTML = renderQuestionHTML(q, selectedIdx, true);
        appState.sessionData.feedbackTimeout = setTimeout(() => {
            appState.sessionData.currentQuestionIndex++;
            displayDailyQuestion();
        }, 3000);
    } else {
        appState.sessionData.currentQuestionIndex++;
        setTimeout(() => displayDailyQuestion(), 300);
    }
}

function endDailyChallenge() {
    const daily = appState.userStats.daily;
    const today = new Date().toISOString().slice(0, 10);
    if (!daily.completed) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        daily.streak = daily.lastCompleted === yesterday ? (daily.streak || 0) + 1 : 1;
        daily.lastCompleted = today;
        daily.completed = true;
    }
    showResults(finishSession('daily'));
}

// ===== AI TUTOR =====
const TUTOR_SYSTEM_PROMPT = `You are a friendly, encouraging AI tutor for the NWEA MAP Growth test (grades 6-9). Your job is to help a student master math and reading skills they need for the MAP test.

Guidelines:
- Be concise (2-4 short paragraphs max). Use simple language a 6th-9th grader understands.
- Always include a concrete example with numbers or a short passage.
- If the student is stuck, give a step-by-step worked example.
- For reading questions, teach the strategy, not just the answer.
- End with a quick check-for-understanding question when appropriate.
- Never reveal or guess answers to specific questions in the student's question bank - teach the underlying skill instead.
- Format math with simple notation (use * for multiplication, / for division, ^ for exponents).`;

// Track conversation for context
let tutorHistory = [];

function getStoredApiKey() {
    try { return localStorage.getItem('openaiKey') || ''; } catch (e) { return ''; }
}

function sendTutorMessage() {
    const input = document.getElementById('tutorInput');
    const message = input.value.trim();
    if (!message) return;

    const chatArea = document.getElementById('tutorChat');

    // Add user message
    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.innerHTML = `<div class="message-bubble user">${escapeHtml(message)}</div>`;
    chatArea.appendChild(userDiv);

    // Add a placeholder tutor message that will be updated as the response streams in
    const tutorDiv = document.createElement('div');
    tutorDiv.className = 'tutor-message';
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble tutor loading';
    bubble.textContent = 'Thinking...';
    tutorDiv.appendChild(bubble);
    chatArea.appendChild(tutorDiv);
    chatArea.scrollTop = chatArea.scrollHeight;

    input.value = '';
    input.disabled = true;

    const apiKey = getStoredApiKey();
    if (!apiKey) {
        bubble.classList.remove('loading');
        bubble.innerHTML = `<strong>API key not set.</strong> Open <em>Settings</em> on the home screen, paste your OpenAI API key (starts with <code>sk-</code>), and save. Your key is stored only in this browser.`;
        input.disabled = false;
        return;
    }

    callOpenAIChat(apiKey, message, bubble, () => {
        input.disabled = false;
    });
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function formatTutorText(str) {
    // Basic markdown -> HTML: **bold**, *italic*, `code`, line breaks
    let html = escapeHtml(str);
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
    html = html.replace(/\n/g, '<br>');
    return html;
}

async function callOpenAIChat(apiKey, userMessage, bubbleEl, done) {
    tutorHistory.push({ role: 'user', content: userMessage });
    // Cap history to last 10 messages to keep requests small
    const recent = tutorHistory.slice(-10);

    const body = {
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: TUTOR_SYSTEM_PROMPT },
            ...recent
        ],
        temperature: 0.5,
        max_tokens: 500
    };

    try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const errText = await res.text();
            let msg = 'OpenAI returned ' + res.status;
            try {
                const parsed = JSON.parse(errText);
                msg = parsed.error?.message || msg;
            } catch (e) { /* keep msg */ }
            bubbleEl.classList.remove('loading');
            bubbleEl.innerHTML = `<strong>Sorry, I could not reach the tutor.</strong> ${escapeHtml(msg)}<br><br>Check that your API key is correct and that you have an active OpenAI account with credit.`;
            done && done();
            return;
        }

        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content?.trim() || 'Sorry, I did not get a response. Try again.';
        tutorHistory.push({ role: 'assistant', content: reply });

        bubbleEl.classList.remove('loading');
        bubbleEl.innerHTML = formatTutorText(reply);
        const chatArea = document.getElementById('tutorChat');
        chatArea.scrollTop = chatArea.scrollHeight;
        done && done();
    } catch (e) {
        bubbleEl.classList.remove('loading');
        bubbleEl.innerHTML = `<strong>Network error.</strong> ${escapeHtml(e.message)}<br><br>Make sure you are online and the API key is valid.`;
        done && done();
    }
}

function quickTutorQuestion(question) {
    document.getElementById('tutorInput').value = question;
    sendTutorMessage();
}

function clearTutorChat() {
    tutorHistory = [];
    const chatArea = document.getElementById('tutorChat');
    delete chatArea.dataset.welcomed;
    chatArea.innerHTML = '<div class="tutor-message"><div class="message-bubble">Chat cleared. Ask me anything about MAP test math or reading.</div></div>';
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

// ===== QUESTION AND ANSWER HELPERS =====
function getTopics(subject, grade) {
    const questions = QUESTIONS[subject]?.[grade] || [];
    return [...new Set(questions.map(question => question.topic).filter(Boolean))];
}

function getFilteredQuestions(subject, grade, topic = 'all', difficulty = 'mixed') {
    const questions = QUESTIONS[subject]?.[grade] || [];
    return questions.filter(question => {
        const topicMatches = topic === 'all' || question.topic === topic;
        const difficultyMatches = difficulty === 'mixed' || question.difficulty === difficulty;
        return topicMatches && difficultyMatches;
    });
}

function selectQuestions(questions, count) {
    if (!questions.length || count <= 0) return [];

    const shuffled = list => [...list].sort(() => Math.random() - 0.5);
    const selected = shuffled(questions);

    // Preserve uniqueness until the available pool is exhausted, then repeat in
    // newly shuffled cycles so every requested session length is supported.
    while (selected.length < count) selected.push(...shuffled(questions));
    return selected.slice(0, count);
}

function claimCurrentAnswer(containerId) {
    if (appState.sessionData.hasAnswered) return false;
    appState.sessionData.hasAnswered = true;
    const container = document.getElementById(containerId);
    if (!container) return false;
    container.querySelectorAll('.answer-btn, .answer-option').forEach(el => {
        el.style.pointerEvents = 'none';
        el.classList.add('answered');
    });
    return true;
}

function isEnhancedReadingQuestion(q) {
    return q && q.subject === 'reading' && q.passage_title && Array.isArray(q.a_explanations) && q.a_explanations.length === q.a.length;
}

function renderQuestionHTML(q, selectedIdx = -1, showFeedback = false) {
    if (isEnhancedReadingQuestion(q)) {
        return renderEnhancedReadingHTML(q, selectedIdx, showFeedback);
    }
    return renderStandardQuestionHTML(q, selectedIdx);
}

function renderStandardQuestionHTML(q, selectedIdx = -1) {
    const questions = appState.sessionData.questions;
    const currentIndex = appState.sessionData.currentQuestionIndex;
    const showCounter = Array.isArray(questions) && questions.length > 0;
    return `<div class="question-display">
        ${showCounter ? `<div class="q-header"><span>Question ${currentIndex + 1}/${questions.length}</span></div>` : ''}
        ${q.p ? `<div class="passage">${q.p}</div>` : ''}
        <div class="question">${q.q}</div>
        <div class="answers">
            ${q.a.map((ans, i) => `<button class="answer-btn" onclick="handleAnswer(${i}, ${q.c})">${ans}</button>`).join('')}
        </div>
    </div>`;
}

function renderEnhancedReadingHTML(q, selectedIdx = -1, showFeedback = false) {
    const explanations = q.a_explanations || [];
    let html = `<div class="question-display enhanced-reading">`;
    html += `<h3 class="passage-title">${escapeHTML(q.passage_title)}</h3>`;
    html += `<div class="passage">${escapeHTML(q.p)}</div>`;
    html += `<div class="question">${escapeHTML(q.q)}</div>`;
    html += `<div class="answers">`;
    q.a.forEach((ans, idx) => {
        const num = idx + 1;
        let optClass = '';
        if (showFeedback) {
            if (idx === q.c) optClass = ' correct';
            else if (idx === selectedIdx) optClass = ' incorrect';
        }
        html += `<div class="answer-option${optClass}" onclick="handleAnswer(${idx}, ${q.c})">`;
        html += `<span class="answer-num">${num}.</span> ${escapeHTML(ans)}`;
        if (showFeedback && explanations[idx]) {
            const label = idx === q.c ? 'Correct! ' : (idx === selectedIdx ? 'Incorrect. ' : '');
            html += `<div class="answer-explanation${idx === q.c ? ' correct' : ' incorrect'}"><strong>${label}</strong>${escapeHTML(explanations[idx])}</div>`;
        }
        html += `</div>`;
    });
    html += `</div>`;
    if (showFeedback && q.hint) {
        html += `<div class="hint-box"><strong>Hint:</strong> ${escapeHTML(q.hint)}</div>`;
    }
    html += `</div>`;
    return html;
}

function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function recordMistake(question, selectedIdx) {
    if (!question || !question.a || question.c === undefined) return;
    if (!Array.isArray(appState.userStats.mistakes)) appState.userStats.mistakes = [];
    appState.userStats.mistakes.push({
        question: question.q,
        passage: question.p || '',
        passage_title: question.passage_title || '',
        answers: [...question.a],
        a_explanations: question.a_explanations ? [...question.a_explanations] : [],
        hint: question.hint || '',
        correctIndex: question.c,
        userAnswer: question.a[selectedIdx],
        correctAnswer: question.a[question.c],
        subject: question.subject,
        grade: question.grade,
        topic: question.topic,
        difficulty: question.difficulty,
        difficultyLevel: question.difficultyLevel,
        explanation: question.explanation || `The correct answer is ${question.a[question.c]}. This question practices ${question.topic || 'this skill'}.`
    });
}

function questionId(question) {
    return `${question.subject}|${question.grade}|${question.topic}|${question.q}`;
}

function getQuestionById(id) {
    for (const subject of Object.keys(QUESTIONS)) {
        for (const grade of Object.keys(QUESTIONS[subject])) {
            const match = QUESTIONS[subject][grade].find(question => questionId(question) === id);
            if (match) return match;
        }
    }
    return null;
}

function getAssessmentPool(subject, grade) {
    if (grade !== 'all') return [...(QUESTIONS[subject]?.[grade] || [])];
    return Object.values(QUESTIONS[subject] || {}).flat();
}

function gradeBaseRit(grade) {
    return ({ '6': 195, '7': 210, '8': 225, '9': 240 })[String(grade)] || 215;
}

function selectAdaptiveQuestion() {
    const session = appState.sessionData;
    const available = session.pool.filter(question => !session.usedQuestionIds.has(questionId(question)));
    const candidates = available.length ? available : session.pool;
    if (!candidates.length) return null;
    const target = Math.max(1, Math.min(5, Math.round((session.estimatedAbility - 170) / 18)));
    const ordered = [...candidates].sort((a, b) => Math.abs((a.difficultyLevel || 3) - target) - Math.abs((b.difficultyLevel || 3) - target));
    const choice = ordered[Math.floor(Math.random() * Math.min(4, ordered.length))];
    session.usedQuestionIds.add(questionId(choice));
    session.difficultyReached = Math.max(session.difficultyReached || 1, choice.difficultyLevel || 1);
    return choice;
}

function updateAdaptiveAbility(question, correct) {
    const level = question.difficultyLevel || 3;
    // Generous gains on correct answers, severe penalty on wrong answers.
    // Diminishing returns near the top so reaching 350 requires sustained
    // near-perfect runs on maximum difficulty.
    const headroom = Math.max(0, (350 - (appState.sessionData.estimatedAbility || 200)) / 230);
    const correctGain = (2.2 + level * 1.0) * (0.35 + 0.65 * headroom);
    const wrongLoss = 2.0 + level * 0.8;
    const change = correct ? correctGain : -wrongLoss;
    appState.sessionData.estimatedAbility = Math.max(120, Math.min(350, appState.sessionData.estimatedAbility + change));
}

function recordAnswer(question, selectedIdx, correct, mode) {
    if (!question) return;
    appState.sessionData.responses.push({ question, selectedIdx, correct, mode });
}

function makeDailyQuestions(dateText) {
    const pool = [...Object.values(QUESTIONS.math).flat(), ...Object.values(QUESTIONS.reading).flat()];
    let seed = [...dateText].reduce((value, char) => ((value * 31) + char.charCodeAt(0)) >>> 0, 7);
    const seeded = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    return [...pool].sort(() => seeded() - 0.5).slice(0, 10);
}

function finishSession(mode) {
    const session = appState.sessionData;
    const total = session.responses.length;
    const correct = session.correct;
    const accuracy = total ? Number((correct / total * 100).toFixed(1)) : 0;
    const elapsedMinutes = session.startedAt ? Math.max(0, Math.round((Date.now() - session.startedAt) / 60000)) : 0;
    const result = {
        mode, subject: session.currentSubject, grade: session.currentGrade, total, correct, accuracy,
        responses: [...session.responses], estimatedRit: Math.round(session.estimatedAbility || calculateMapScore(correct, total)),
        percentile: estimatePercentile(session.estimatedAbility || calculateMapScore(correct, total), session.currentGrade),
        difficultyReached: session.difficultyReached || 3, elapsedMinutes
    };
    updateProgressFromResult(result);
    return result;
}

function estimatePercentile(rit, grade) {
    const midpoint = gradeBaseRit(grade === 'all' ? '7' : grade);
    return Math.max(1, Math.min(99, Math.round(50 + (rit - midpoint) * 1.15)));
}

function updateProgressFromResult(result) {
    const stats = appState.userStats;
    stats.questionsAnswered += result.total;
    stats.questionsCorrect += result.correct;
    stats.accuracy = stats.questionsAnswered ? (stats.questionsCorrect / stats.questionsAnswered * 100).toFixed(1) : 0;
    stats.bestStreak = Math.max(stats.bestStreak || 0, stats.currentStreak || 0);
    stats.studyTime = (stats.studyTime || 0) + result.elapsedMinutes;
    result.responses.forEach(({ question, correct }) => {
        const add = (collection, key) => {
            if (!collection[key]) collection[key] = { answered: 0, correct: 0 };
            collection[key].answered++;
            if (correct) collection[key].correct++;
        };
        add(stats.subjectStats, question.subject);
        add(stats.gradeStats, `Grade ${question.grade}`);
        add(stats.topicStats, `${question.subject}:${question.topic}`);
        stats.recentlyStudied = [`${question.subject === 'math' ? 'Math' : 'Reading'}: ${question.topic}`, ...stats.recentlyStudied.filter(item => item !== `${question.subject === 'math' ? 'Math' : 'Reading'}: ${question.topic}`)].slice(0, 8);
    });
    stats.recentTests = [result, ...(stats.recentTests || [])].slice(0, 10);
    saveUserData();
}

// ===== MAP SCORE CALCULATION =====
function calculateMapScore(correct, total) {
    const accuracyPercent = total > 0 ? (correct / total * 100) : 0;
    const minScore = 120;
    const maxScore = 350;
    // Hard ceiling is intentionally BELOW maxScore so a perfect run does
    // not hit the absolute top. Headroom is reserved for the adaptive
    // difficulty bonus in test mode.
    const hardCeiling = 340;
    const range = hardCeiling - minScore;
    const p = Math.max(0, Math.min(1, accuracyPercent / 100));
    // Mild power curve so gains flatten as you approach the ceiling.
    // p=0.50 -> 0.41 of range, p=0.80 -> 0.74, p=0.90 -> 0.84, p=1.0 -> 1.0
    const curve = 1 - Math.pow(1 - p, 1.35);
    const baseScore = minScore + curve * range;
    return Math.round(baseScore);
}

// ===== RESULTS =====
function showResults(resultOrCorrect, legacyTotal, legacyAccuracy) {
    const result = typeof resultOrCorrect === 'object'
        ? resultOrCorrect
        : { correct: resultOrCorrect, total: legacyTotal, accuracy: Number(legacyAccuracy), estimatedRit: calculateMapScore(resultOrCorrect, legacyTotal), percentile: 50, difficultyReached: 3, responses: [], grade: '' };
    appState.lastCompletedSession = result;
    // Calculate RIT range based on number of questions (more questions = narrower range)
    const sem = Math.max(2, 6 - Math.floor(result.total / 8)); // Standard error: 6 for few questions, 2 for many
    const rangeLow = Math.max(120, result.estimatedRit - sem);
    const rangeHigh = Math.min(350, result.estimatedRit + sem);
    document.getElementById('resultQuestionsAnswered').textContent = result.total;
    document.getElementById('resultCorrect').textContent = result.correct;
    document.getElementById('resultAccuracy').textContent = `${result.accuracy}%`;
    document.getElementById('resultMapScore').textContent = result.estimatedRit;
    document.getElementById('resultRitRange').textContent = `Estimated range: ${rangeLow}–${rangeHigh}`;
    document.getElementById('resultPercentile').textContent = result.percentile;
    const topicSummary = summarizeResultTopics(result.responses);
    document.getElementById('resultsByTopic').innerHTML = `
        <p><strong>Difficulty reached:</strong> ${difficultyLabel(result.difficultyReached)}</p>
        ${result.grade === 'all' ? gradeBreakdownHtml(result.responses) : ''}
        <h4>Topic performance</h4>${topicSummary || '<p>Complete questions to see topic performance.</p>'}`;
    document.getElementById('recommendations').innerHTML = `${recommendationsHtml(result.responses)}<p class="setting-desc">This is an unofficial estimate based on performance in this app. Official MAP Growth RIT scores and percentiles are calculated by NWEA using its own assessment and scoring system.</p>`;
    saveUserData();
    showScreen('resultsScreen');
}

function showCombinedResults(results) {
    const [math, reading] = results;
    appState.lastCompletedSession = { mode: 'combined', results };
    document.getElementById('resultMapScore').textContent = 'Separate scores';
    document.getElementById('resultQuestionsAnswered').textContent = results.reduce((sum, result) => sum + result.total, 0);
    document.getElementById('resultCorrect').textContent = results.reduce((sum, result) => sum + result.correct, 0);
    document.getElementById('resultAccuracy').textContent = 'By section';
    document.getElementById('resultsByTopic').innerHTML = [math, reading].map(result => `<div class="result-section"><h4>${result.subject === 'math' ? 'Math' : 'Reading'}</h4><p><strong>Estimated RIT:</strong> ${result.estimatedRit}</p><p><strong>Estimated national percentile:</strong> ${result.percentile}% (unofficial)</p><p><strong>Accuracy:</strong> ${result.accuracy}%</p>${summarizeResultTopics(result.responses)}</div>`).join('');
    document.getElementById('recommendations').innerHTML = '<p class="setting-desc">This is an unofficial estimate based on performance in this app. Official MAP Growth RIT scores and percentiles are calculated by NWEA using its own assessment and scoring system.</p>';
    showScreen('resultsScreen');
}

function difficultyLabel(level) {
    return ['Very Easy', 'Easy', 'Medium', 'Challenging', 'Difficult'][Math.max(1, Math.min(5, level)) - 1];
}

function summarizeResultTopics(responses) {
    const topics = {};
    responses.forEach(({ question, correct }) => {
        const key = question.topic || 'General';
        if (!topics[key]) topics[key] = { answered: 0, correct: 0 };
        topics[key].answered++;
        if (correct) topics[key].correct++;
    });
    return Object.entries(topics).map(([topic, stat]) => `<p>${topic}: <strong>${Math.round(stat.correct / stat.answered * 100)}%</strong> (${stat.correct}/${stat.answered})</p>`).join('');
}

function gradeBreakdownHtml(responses) {
    const grades = {};
    responses.forEach(({ question, correct }) => {
        if (!grades[question.grade]) grades[question.grade] = { answered: 0, correct: 0 };
        grades[question.grade].answered++;
        if (correct) grades[question.grade].correct++;
    });
    return `<h4>Grade breakdown</h4>${Object.entries(grades).map(([grade, stat]) => `<p>Grade ${grade}: ${Math.round(stat.correct / stat.answered * 100)}%</p>`).join('')}`;
}

function recommendationsHtml(responses) {
    const entries = responses.length ? summarizeResultTopics(responses) : '';
    return entries ? `<p>Review the topics with the lowest percentages first, then retry related questions in Practice Mode.</p>${entries}` : '<p>Complete an assessment to receive topic recommendations.</p>';
}

// ===== STATS =====
function updateAllStats() {
    document.getElementById('totalQuestionsAnswered').textContent = appState.userStats.questionsAnswered;
    
    // Handle NaN and ensure valid percentage
    let accuracy = appState.userStats.accuracy;
    if (isNaN(accuracy) || accuracy === undefined) {
        accuracy = 0;
    }
    
    document.getElementById('accuracyDisplay').textContent = accuracy + '%';
    document.getElementById('streakCountDisplay').textContent = appState.userStats.currentStreak;
    document.getElementById('studyTimeDisplay').textContent = `${Math.round((appState.userStats.studyTime || 0) / 60 * 10) / 10}h`;
    document.getElementById('mistakesCount').textContent = `${appState.userStats.mistakes.length} mistakes`;
    document.getElementById('dailyStatus').textContent = appState.userStats.daily?.completed ? 'Challenge completed today' : 'New challenge available';
    document.getElementById('recentlyStudied').innerHTML = (appState.userStats.recentlyStudied || []).map(topic => `<span class="recent-topic-tag">${topic}</span>`).join('') || '<span class="recent-topic-tag">Start practicing to build your history.</span>';
    document.getElementById('streakDisplay').textContent = '🔥 ' + appState.userStats.currentStreak;
}

function updateStatsDisplay() {
    document.getElementById('statsQuestionsTotal').textContent = appState.userStats.questionsAnswered;
    document.getElementById('statsOverallAccuracy').textContent = appState.userStats.accuracy + '%';
    document.getElementById('statsStudyTime').textContent = `${Math.round((appState.userStats.studyTime || 0) / 60 * 10) / 10}h`;
    document.getElementById('statsBestStreak').textContent = appState.userStats.bestStreak;
    
    const topicStats = appState.userStats.topicStats || {};
    const topicTableBody = document.getElementById('topicTableBody');
    if (topicTableBody) {
        const entries = Object.entries(topicStats)
            .filter(([, stat]) => stat.answered > 0)
            .sort((a, b) => (b[1].correct / b[1].answered) - (a[1].correct / a[1].answered));
        topicTableBody.innerHTML = entries.map(([topic, stat]) => {
            const displayTopic = topic.includes(':') ? topic.split(':')[1] : topic;
            const accuracy = Math.round(stat.correct / stat.answered * 100);
            return `<tr><td>${displayTopic}</td><td>${stat.answered}</td><td>${accuracy}%</td></tr>`;
        }).join('') || '<tr><td colspan="3">Complete questions to see topic breakdown.</td></tr>';
    }
    
    renderStatsCharts();
}

function renderStatsCharts() {
    if (typeof Chart === 'undefined') return;
    
    const subjectStats = appState.userStats.subjectStats || {};
    const topicStats = appState.userStats.topicStats || {};
    
    const subjects = Object.keys(subjectStats).filter(s => subjectStats[s].answered > 0);
    const subjectLabels = subjects.map(s => s.charAt(0).toUpperCase() + s.slice(1));
    const subjectAccuracy = subjects.map(s => subjectStats[s].answered ? Math.round(subjectStats[s].correct / subjectStats[s].answered * 100) : 0);
    
    const accuracyCtx = document.getElementById('accuracyChart');
    if (accuracyCtx) {
        if (accuracyCtx.chart) accuracyCtx.chart.destroy();
        accuracyCtx.chart = new Chart(accuracyCtx, {
            type: 'bar',
            data: {
                labels: subjectLabels.length ? subjectLabels : ['Math', 'Reading'],
                datasets: [{
                    label: 'Accuracy %',
                    data: subjectAccuracy.length ? subjectAccuracy : [0, 0],
                    backgroundColor: ['rgba(0, 61, 155, 0.7)', 'rgba(74, 144, 226, 0.7)'],
                    borderColor: ['rgba(0, 61, 155, 1)', 'rgba(74, 144, 226, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });
    }
    
    const topicEntries = Object.entries(topicStats)
        .filter(([, stat]) => stat.answered > 0)
        .sort((a, b) => (b[1].correct / b[1].answered) - (a[1].correct / a[1].answered))
        .slice(0, 8);
    
    const topicLabels = topicEntries.map(([topic]) => topic.includes(':') ? topic.split(':')[1] : topic);
    const topicAccuracy = topicEntries.map(([, stat]) => Math.round(stat.correct / stat.answered * 100));
    
    const topicsCtx = document.getElementById('topicsChart');
    if (topicsCtx) {
        if (topicsCtx.chart) topicsCtx.chart.destroy();
        topicsCtx.chart = new Chart(topicsCtx, {
            type: 'doughnut',
            data: {
                labels: topicLabels.length ? topicLabels : ['No data yet'],
                datasets: [{
                    data: topicAccuracy.length ? topicAccuracy : [1],
                    backgroundColor: [
                        'rgba(0, 61, 155, 0.8)',
                        'rgba(74, 144, 226, 0.8)',
                        'rgba(46, 139, 87, 0.8)',
                        'rgba(255, 152, 0, 0.8)',
                        'rgba(220, 53, 69, 0.8)',
                        'rgba(0, 61, 155, 0.6)',
                        'rgba(74, 144, 226, 0.6)',
                        'rgba(46, 139, 87, 0.6)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }
}

// ===== DATA MANAGEMENT =====
function saveUserData() {
    localStorage.setItem('mapPrepUserStats', JSON.stringify(appState.userStats));
}

function loadUserData() {
    const saved = localStorage.getItem('mapPrepUserStats');
    if (saved) {
        appState.userStats = { ...appState.userStats, ...JSON.parse(saved) };
        if (!Array.isArray(appState.userStats.mistakes)) appState.userStats.mistakes = [];
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
            mistakes: [],
            subjectStats: {},
            gradeStats: {},
            topicStats: {},
            recentlyStudied: [],
            recentTests: [],
            daily: { streak: 0, lastCompleted: '', challengeDate: '', challengeQuestions: [] }
        };
        // Only clear this app's keys, not all localStorage
        localStorage.removeItem('mapPrepUserStats');
        localStorage.removeItem('openaiKey');
        localStorage.removeItem('mapPrepDaily');
        updateAllStats();
        alert('Data cleared!');
    }
}

function saveAPIKey() {
    const key = document.getElementById('apiKeyInput').value.trim();
    if (!key) {
        const status = document.getElementById('apiKeyStatus');
        if (status) status.textContent = 'Please paste a key first.';
        return;
    }
    if (!key.startsWith('sk-')) {
        const status = document.getElementById('apiKeyStatus');
        if (status) status.textContent = 'That does not look like an OpenAI key (should start with sk-).';
        return;
    }
    localStorage.setItem('openaiKey', key);
    const status = document.getElementById('apiKeyStatus');
    if (status) {
        status.textContent = 'Saved! The AI Tutor will now use ChatGPT.';
        status.style.color = 'green';
    }
}

// Auto-fill the key input on screen open
function loadAPIKey() {
    const key = getStoredApiKey();
    const input = document.getElementById('apiKeyInput');
    if (input) input.value = key;
    const status = document.getElementById('apiKeyStatus');
    if (status && key) {
        status.textContent = 'A key is saved. The AI Tutor is ready.';
        status.style.color = 'green';
    }
}

function restartMode() {
    // Restart the last completed session's mode
    const lastSession = appState.lastCompletedSession;
    if (!lastSession) {
        goToHome();
        return;
    }
    if (lastSession.mode === 'combined') {
        startCombinedAssessment();
    } else if (lastSession.mode === 'test') {
        startTestMode();
    } else if (lastSession.mode === 'practice') {
        startPracticeMode();
    } else if (lastSession.mode === 'endless') {
        startEndlessMode();
    } else if (lastSession.mode === 'daily') {
        startDailyChallenge();
    } else {
        goToHome();
    }
}

function reviewResults() {
    const session = appState.lastCompletedSession;
    if (!session || !session.responses || !session.responses.length) {
        alert('No answers to review.');
        return;
    }
    const responses = session.responses;
    let currentReviewIndex = 0;
    const reviewContainer = document.getElementById('resultsByTopic');
    const recommendationsContainer = document.getElementById('recommendations');
    function showReviewItem() {
        const { question, selectedIdx, correct } = responses[currentReviewIndex];
        const userAnswer = question.a[selectedIdx] || '(no answer)';
        const correctAnswer = question.a[question.c];
        let reviewHTML = `<div class="review-item">`;
        reviewHTML += `<p><strong>Question ${currentReviewIndex + 1} of ${responses.length}</strong></p>`;
        if (isEnhancedReadingQuestion(question)) {
            reviewHTML += `<h3 class="passage-title">${escapeHTML(question.passage_title)}</h3>`;
            reviewHTML += `<div class="passage">${escapeHTML(question.p)}</div>`;
            reviewHTML += `<div class="question">${escapeHTML(question.q)}</div>`;
            reviewHTML += `<div class="answers">`;
            question.a.forEach((ans, idx) => {
                const num = idx + 1;
                const isCorrect = idx === question.c;
                const isSelected = idx === selectedIdx;
                let optClass = '';
                if (isCorrect) optClass = ' correct';
                else if (isSelected && !correct) optClass = ' incorrect';
                reviewHTML += `<div class="answer-option${optClass}">`;
                reviewHTML += `<span class="answer-num">${num}.</span> ${escapeHTML(ans)}`;
                if (question.a_explanations && question.a_explanations[idx]) {
                    const label = isCorrect ? 'Correct! ' : (isSelected ? 'Incorrect. ' : '');
                    reviewHTML += `<div class="answer-explanation${isCorrect ? ' correct' : ' incorrect'}"><strong>${label}</strong>${escapeHTML(question.a_explanations[idx])}</div>`;
                }
                reviewHTML += `</div>`;
            });
            reviewHTML += `</div>`;
            if (question.hint) {
                reviewHTML += `<div class="hint-box"><strong>Hint:</strong> ${escapeHTML(question.hint)}</div>`;
            }
        } else {
            if (question.p) reviewHTML += `<div class="passage">${escapeHTML(question.p)}</div>`;
            reviewHTML += `<div class="question">${escapeHTML(question.q)}</div>`;
            reviewHTML += `<div class="answers">`;
            question.a.forEach((ans, idx) => {
                reviewHTML += `<div class="lesson-answer ${idx === question.c ? 'correct' : (idx === selectedIdx ? 'incorrect' : '')}">${idx === question.c ? '✓ ' : (idx === selectedIdx ? '✗ ' : '')}${escapeHTML(ans)}</div>`;
            });
            reviewHTML += `</div>`;
        }
        reviewHTML += `<p class="setting-desc"><strong>Your answer:</strong> ${escapeHTML(userAnswer)} ${correct ? '✓ Correct' : '✗ Incorrect'}</p>`;
        if (question.explanation) {
            reviewHTML += `<p class="setting-desc"><strong>Explanation:</strong> ${escapeHTML(question.explanation)}</p>`;
        }
        reviewHTML += `<div class="results-actions">
            ${currentReviewIndex > 0 ? '<button class="btn-secondary" onclick="prevReviewItem()">← Previous</button>' : ''}
            ${currentReviewIndex < responses.length - 1 ? '<button class="btn-primary" onclick="nextReviewItem()">Next →</button>' : '<button class="btn-primary" onclick="finishReview()">Finish Review</button>'}
        </div>`;
        reviewHTML += `</div>`;
        reviewContainer.innerHTML = reviewHTML;
        recommendationsContainer.innerHTML = `<p>Reviewing answers helps you understand mistakes and learn from them.</p>`;
    }
    window.nextReviewItem = function() { currentReviewIndex++; showReviewItem(); };
    window.prevReviewItem = function() { currentReviewIndex--; showReviewItem(); };
    window.finishReview = function() {
        document.getElementById('resultsByTopic').innerHTML = '';
        document.getElementById('recommendations').innerHTML = '';
        showResults(appState.lastCompletedSession);
    };
    showReviewItem();
}
