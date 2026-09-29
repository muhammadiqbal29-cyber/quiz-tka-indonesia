// ═══════════════════════════════════════════
//  Sound Effects (Web Audio API — no files needed)
// ═══════════════════════════════════════════
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
let soundEnabled = true;

function ensureAudioCtx() {
    if (!audioCtx) audioCtx = new AudioCtx();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playTone(freq, duration, type, vol) {
    if (!soundEnabled) return;
    ensureAudioCtx();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol || 0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

const SFX = {
    click() {
        playTone(800, 0.08, 'square', 0.06);
    },
    correct() {
        // Happy ascending arpeggio
        playTone(523, 0.12, 'sine', 0.15);
        setTimeout(() => playTone(659, 0.12, 'sine', 0.15), 80);
        setTimeout(() => playTone(784, 0.18, 'sine', 0.18), 160);
        setTimeout(() => playTone(1047, 0.3, 'triangle', 0.12), 250);
    },
    incorrect() {
        // Descending buzzy tone
        playTone(300, 0.15, 'sawtooth', 0.08);
        setTimeout(() => playTone(200, 0.25, 'sawtooth', 0.06), 120);
    },
    streak() {
        // Extra sparkle for streaks
        playTone(880, 0.08, 'sine', 0.1);
        setTimeout(() => playTone(1100, 0.08, 'sine', 0.1), 60);
        setTimeout(() => playTone(1320, 0.12, 'sine', 0.12), 120);
    },
    gameStart() {
        playTone(440, 0.1, 'triangle', 0.1);
        setTimeout(() => playTone(554, 0.1, 'triangle', 0.1), 100);
        setTimeout(() => playTone(659, 0.1, 'triangle', 0.1), 200);
        setTimeout(() => playTone(880, 0.25, 'triangle', 0.15), 300);
    },
    gameEnd() {
        // Fanfare
        playTone(523, 0.15, 'triangle', 0.12);
        setTimeout(() => playTone(659, 0.15, 'triangle', 0.12), 150);
        setTimeout(() => playTone(784, 0.15, 'triangle', 0.12), 300);
        setTimeout(() => playTone(1047, 0.4, 'sine', 0.18), 450);
    }
};

// ═══════════════════════════════════════════
//  DOM Elements
// ═══════════════════════════════════════════
const screens = {
    start: document.getElementById('start-screen'),
    game: document.getElementById('game-screen'),
    result: document.getElementById('result-screen'),
    review: document.getElementById('review-screen')
};

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const reviewBtn = document.getElementById('review-btn');
const backToResultBtn = document.getElementById('back-to-result-btn');
const soundToggle = document.getElementById('sound-toggle');
const playerNameInput = document.getElementById('player-name');

const monsterAvatarStart = document.getElementById('monster-avatar-start');
const monsterAvatarGame = document.getElementById('monster-avatar-game');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score');
const streakContainer = document.getElementById('streak-container');
const streakCount = document.getElementById('streak-count');

const finalScoreEl = document.getElementById('final-score');
const correctCountEl = document.getElementById('correct-count');
const incorrectCountEl = document.getElementById('incorrect-count');
const resultPlayerName = document.getElementById('result-player-name');
const resultTitle = document.getElementById('result-title');
const scoreCircle = document.getElementById('score-circle');
const trophyIcon = document.getElementById('trophy-icon');
const categoryList = document.getElementById('category-list');
const reviewList = document.getElementById('review-list');
const reviewFilters = document.getElementById('review-filters');

// ═══════════════════════════════════════════
//  Game State
// ═══════════════════════════════════════════
let currentQuestionIndex = 0;
let score = 0;
let correctCount = 0;
let incorrectCount = 0;
let streak = 0;
let maxStreak = 0;
let userAnswers = [];
let isAnswering = false;
let playerName = '';
let startTime = null;

let preloadedYesMeme = '';
let preloadedNoMeme = '';

const optionShapes = [
    '<i class="fa-solid fa-play" style="transform: rotate(-90deg);font-size:0.7rem"></i>',
    '<i class="fa-solid fa-square" style="font-size:0.7rem"></i>',
    '<i class="fa-solid fa-circle" style="font-size:0.7rem"></i>',
    '<i class="fa-solid fa-diamond" style="font-size:0.7rem"></i>'
];

// ═══════════════════════════════════════════
//  Meme API (yesno.wtf)
// ═══════════════════════════════════════════
async function preloadMemes() {
    try {
        const [yesRes, noRes] = await Promise.all([
            fetch('https://yesno.wtf/api?force=yes'),
            fetch('https://yesno.wtf/api?force=no')
        ]);
        const yesData = await yesRes.json();
        const noData = await noRes.json();
        preloadedYesMeme = yesData.image;
        preloadedNoMeme = noData.image;
    } catch (e) {
        console.error('Failed to preload memes:', e);
    }
}

// ═══════════════════════════════════════════
//  Initialization
// ═══════════════════════════════════════════
function init() {
    preloadMemes();
    
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', resetGame);
    reviewBtn.addEventListener('click', showReview);
    backToResultBtn.addEventListener('click', () => switchScreen('result'));
    soundToggle.addEventListener('click', toggleSound);

    // Update avatar as user types
    let debounceTimer;
    playerNameInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const val = e.target.value.trim() || 'peserta';
            monsterAvatarStart.src = `https://robohash.org/${encodeURIComponent(val)}?set=set2&size=120x120`;
        }, 500);
    });

    // Review filter buttons
    reviewFilters.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        SFX.click();
        reviewFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterReview(btn.dataset.filter);
    });

    // Allow Enter key to start
    playerNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') startGame();
    });
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const icon = soundToggle.querySelector('i');
    if (soundEnabled) {
        icon.className = 'fa-solid fa-volume-high';
    } else {
        icon.className = 'fa-solid fa-volume-xmark';
    }
}

function switchScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// ═══════════════════════════════════════════
//  Game Flow
// ═══════════════════════════════════════════
function startGame() {
    playerName = playerNameInput.value.trim() || 'Anonim';
    currentQuestionIndex = 0;
    score = 0;
    correctCount = 0;
    incorrectCount = 0;
    userAnswers = [];
    scoreDisplay.innerText = score;
    streakContainer.style.display = 'none';
    startTime = new Date();

    // Set game header avatar
    monsterAvatarGame.src = `https://robohash.org/${encodeURIComponent(playerName)}?set=set2&size=40x40`;

    SFX.gameStart();
    switchScreen('game');
    loadQuestion();
}

function resetGame() {
    SFX.click();
    switchScreen('start');
}

function loadQuestion() {
    isAnswering = false;
    const currentQ = quizData[currentQuestionIndex];

    questionCounter.innerText = `${currentQuestionIndex + 1} / ${quizData.length}`;
    const progress = (currentQuestionIndex / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;

    questionText.innerHTML = currentQ.question;

    // Scroll question container to top if needed
    const qContainer = document.querySelector('.question-container');
    qContainer.scrollTop = 0;

    optionsContainer.innerHTML = '';

    currentQ.options.forEach((opt, index) => {
        const match = opt.match(/^([A-D])\.\s*(.*)/s);
        let letter = '';
        let text = opt;

        if (match) {
            letter = match[1];
            text = match[2];
        }

        const btn = document.createElement('button');
        btn.className = `option-btn opt-color-${index}`;
        btn.dataset.letter = letter;
        btn.dataset.index = index;

        btn.innerHTML = `
            <div class="option-icon">${optionShapes[index]}</div>
            <div class="option-text">${text}</div>
        `;

        btn.addEventListener('click', () => handleAnswer(btn, letter, currentQ.answer));
        optionsContainer.appendChild(btn);
    });
}

function handleAnswer(selectedBtn, selectedLetter, correctLetter) {
    if (isAnswering) return;
    isAnswering = true;

    SFX.click();

    const isCorrect = selectedLetter === correctLetter;

    userAnswers.push({
        questionIndex: currentQuestionIndex,
        questionData: quizData[currentQuestionIndex],
        userLetter: selectedLetter,
        isCorrect: isCorrect
    });

    // Visual + audio feedback: 1 green, the rest red
    const allBtns = document.querySelectorAll('.option-btn');
    
    allBtns.forEach(btn => {
        btn.disabled = true;
        btn.classList.remove('selected');

        const btnLetter = btn.dataset.letter;

        if (btnLetter === correctLetter) {
            btn.classList.add('correct-anim'); // turns green
        } else {
            btn.classList.add('incorrect-anim'); // turns red
        }
    });

    if (isCorrect) {
        correctCount++;
        streak++;
        if (streak > maxStreak) maxStreak = streak;

        // Streak bonus: base 100 + 10 per streak level (cap 50 bonus)
        const bonus = Math.min(streak * 10, 50);
        const earned = 100 + bonus;
        score += earned;

        SFX.correct();
        if (streak >= 3) {
            SFX.streak();
            streakContainer.style.display = 'flex';
            streakCount.innerText = streak;
        }

        showMemeFeedback(true);
        animateValue(scoreDisplay, score - earned, score, 500);
    } else {
        incorrectCount++;
        streak = 0;
        streakContainer.style.display = 'none';

        SFX.incorrect();
        showMemeFeedback(false);
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            endGame();
        }
    }, 3000); // Wait 3s to show meme
}

function showMemeFeedback(isCorrect) {
    const overlay = document.createElement('div');
    overlay.className = 'feedback-overlay meme-overlay';
    
    const memeUrl = isCorrect ? preloadedYesMeme : preloadedNoMeme;
    const fallbackEmoji = isCorrect ? '✅' : '❌';
    
    if (memeUrl) {
        overlay.innerHTML = `
            <div class="meme-container ${isCorrect ? 'meme-correct' : 'meme-wrong'}">
                <h2 class="meme-text">${isCorrect ? 'BENAR!' : 'SALAH!'}</h2>
                <img src="${memeUrl}" class="meme-img" alt="Meme" />
            </div>
        `;
    } else {
        // Fallback if API fails
        overlay.innerHTML = `<span class="feedback-emoji">${fallbackEmoji}</span>`;
    }
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.remove();
        // Preload next memes for next question
        preloadMemes();
    }, 2800);
}

// ═══════════════════════════════════════════
//  End Game & Results
// ═══════════════════════════════════════════
function endGame() {
    progressBar.style.width = '100%';

    setTimeout(() => {
        SFX.gameEnd();
        switchScreen('result');

        resultPlayerName.innerText = playerName;

        // Dynamic title based on score
        const pct = (correctCount / quizData.length) * 100;
        if (pct === 100) {
            resultTitle.innerText = '🏆 SEMPURNA!';
            trophyIcon.style.color = '#ffd700';
        } else if (pct >= 80) {
            resultTitle.innerText = '🌟 Hebat Sekali!';
            trophyIcon.style.color = '#ffd700';
        } else if (pct >= 60) {
            resultTitle.innerText = '👍 Bagus!';
            trophyIcon.style.color = '#c0c0c0';
        } else {
            resultTitle.innerText = '💪 Terus Semangat!';
            trophyIcon.style.color = '#cd7f32';
        }

        correctCountEl.innerText = correctCount;
        incorrectCountEl.innerText = incorrectCount;

        // Animate score circle gradient
        const deg = Math.round((correctCount / quizData.length) * 360);
        scoreCircle.style.background = `conic-gradient(#8854c0 ${deg}deg, rgba(42,10,74,0.8) ${deg}deg)`;

        animateValue(finalScoreEl, 0, score, 1000);

        generateCategorySummary();
        generateReview();
    }, 500);
}

// ═══════════════════════════════════════════
//  Category Summary
// ═══════════════════════════════════════════
function generateCategorySummary() {
    const catMap = {};

    userAnswers.forEach((ans) => {
        const cat = ans.questionData.category || 'Umum';
        if (!catMap[cat]) {
            catMap[cat] = { total: 0, correct: 0, wrong: 0, wrongQuestions: [] };
        }
        catMap[cat].total++;
        if (ans.isCorrect) {
            catMap[cat].correct++;
        } else {
            catMap[cat].wrong++;
            catMap[cat].wrongQuestions.push(ans.questionIndex + 1);
        }
    });

    categoryList.innerHTML = '';

    // Sort: categories with wrong answers first
    const sorted = Object.entries(catMap).sort((a, b) => b[1].wrong - a[1].wrong);

    sorted.forEach(([cat, data]) => {
        const item = document.createElement('div');
        const hasWrong = data.wrong > 0;
        item.className = `category-item ${hasWrong ? 'has-wrong' : 'all-correct'}`;

        let badgeHTML = '';
        if (hasWrong) {
            badgeHTML = `<span class="category-badge badge-wrong">${data.correct}/${data.total} — No. ${data.wrongQuestions.join(', ')}</span>`;
        } else {
            badgeHTML = `<span class="category-badge badge-perfect">${data.correct}/${data.total} ✓</span>`;
        }

        item.innerHTML = `<span>${cat}</span>${badgeHTML}`;
        categoryList.appendChild(item);
    });
}

// ═══════════════════════════════════════════
//  Review
// ═══════════════════════════════════════════
function generateReview() {
    reviewList.innerHTML = '';

    userAnswers.forEach((ans, index) => {
        const item = document.createElement('div');
        item.className = `review-item ${ans.isCorrect ? 'is-correct' : 'is-wrong'}`;
        item.dataset.result = ans.isCorrect ? 'correct' : 'wrong';

        const qData = ans.questionData;
        const correctOptText = qData.options.find(o => o.startsWith(qData.answer + '.')) || qData.answer;
        const userOptText = qData.options.find(o => o.startsWith(ans.userLetter + '.')) || ans.userLetter;

        // Strip passage HTML for review to keep it clean (but show a small label)
        let questionClean = qData.question;

        const catTag = qData.category ? `<div class="review-category-tag">${qData.category}</div>` : '';

        let html = catTag;
        html += `<div class="review-question">${index + 1}. ${questionClean}</div>`;

        if (ans.isCorrect) {
            html += `<div class="review-answer correct"><i class="fa-solid fa-circle-check"></i> Jawaban Anda: ${correctOptText}</div>`;
        } else {
            html += `<div class="review-answer incorrect"><i class="fa-solid fa-circle-xmark"></i> Jawaban Anda: ${userOptText}</div>`;
            html += `<div class="review-answer correct" style="margin-top: 5px;"><i class="fa-solid fa-circle-check"></i> Jawaban Benar: ${correctOptText}</div>`;
        }

        item.innerHTML = html;
        reviewList.appendChild(item);
    });
}

function filterReview(filter) {
    const items = reviewList.querySelectorAll('.review-item');
    items.forEach(item => {
        if (filter === 'all') {
            item.style.display = '';
        } else if (filter === 'wrong') {
            item.style.display = item.dataset.result === 'wrong' ? '' : 'none';
        } else if (filter === 'correct') {
            item.style.display = item.dataset.result === 'correct' ? '' : 'none';
        }
    });
}

function showReview() {
    SFX.click();
    switchScreen('review');
}

// ═══════════════════════════════════════════
//  Utility: Animate number
// ═══════════════════════════════════════════
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOutQuad = progress * (2 - progress);
        obj.innerHTML = Math.floor(easeOutQuad * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = end;
        }
    };
    window.requestAnimationFrame(step);
}

// Run
document.addEventListener('DOMContentLoaded', init);
