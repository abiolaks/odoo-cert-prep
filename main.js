/* ==============================
   Odoo 19 Certification Prep — App Logic
   ============================== */

// ---- State ----
const state = {
  activeTab: 'exam',
  // Exam state
  examQuestions: [],
  examAnswers: {},      // { questionIndex: [selectedOptionIndices] }
  examSkipped: {},      // { questionIndex: true }
  examCurrentIndex: 0,
  examTimer: null,
  examTimeLeft: 5400,   // 90 minutes in seconds
  examSubmitted: false,
  // Drill state
  drillQuestions: [],
  drillAnswers: {},
  drillCurrentIndex: 0,
  drillChecked: false,
  drillCorrectCount: 0,
};

// ---- Module list ----
const MODULES = [
  'accounting', 'crm', 'sales', 'pos', 'inventory', 'mrp', 'purchase',
  'hr', 'website', 'marketing', 'project', 'helpdesk', 'productivity',
  'studio', 'ai', 'expenses', 'subscriptions', 'general', 'cross'
];

const MODULE_NAMES = {
  accounting: 'Accounting', crm: 'CRM', sales: 'Sales', pos: 'Point of Sale',
  inventory: 'Inventory', mrp: 'Manufacturing', purchase: 'Purchase',
  hr: 'Human Resources', website: 'Website & eCommerce', marketing: 'Marketing',
  project: 'Project', helpdesk: 'Helpdesk', productivity: 'Productivity',
  studio: 'Studio', ai: 'Odoo AI', expenses: 'Expenses',
  subscriptions: 'Subscriptions', general: 'General Settings', cross: 'Cross-Module',
  all: 'All Modules'
};

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  setupTabNavigation();
  setupExam();
  setupDrill();
  setupKnowledgeBase();
  setupQASearch();
  setupHistory();
});

// ==============================
// Tab Navigation
// ==============================

function setupTabNavigation() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      state.activeTab = tab;
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      document.getElementById(`tab-${tab}`).classList.add('active');
      if (tab === 'knowledge') renderKnowledgeBase();
      if (tab === 'history') renderHistory();
    });
  });
}

// ==============================
// Full Exam Simulator
// ==============================

function setupExam() {
  document.getElementById('btn-start-exam').addEventListener('click', startExam);
  document.getElementById('btn-prev').addEventListener('click', () => navigateExam(-1));
  document.getElementById('btn-next').addEventListener('click', () => navigateExam(1));
  document.getElementById('btn-skip').addEventListener('click', skipQuestion);
  document.getElementById('btn-clear').addEventListener('click', clearAnswer);
  document.getElementById('btn-submit-exam').addEventListener('click', submitExam);
  document.getElementById('btn-review').addEventListener('click', showReview);
  document.getElementById('btn-new-exam').addEventListener('click', resetExam);
  document.getElementById('btn-back-to-results').addEventListener('click', () => {
    document.getElementById('exam-review').classList.add('hidden');
    document.getElementById('exam-results').classList.remove('hidden');
  });
}

function startExam() {
  // Pick 120 random questions (or all if fewer)
  const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
  state.examQuestions = shuffled.slice(0, Math.min(120, shuffled.length));
  state.examAnswers = {};
  state.examSkipped = {};
  state.examCurrentIndex = 0;
  state.examTimeLeft = 90 * 60;
  state.examSubmitted = false;

  document.getElementById('exam-start').classList.add('hidden');
  document.getElementById('exam-active').classList.remove('hidden');
  document.getElementById('exam-results').classList.add('hidden');
  document.getElementById('exam-review').classList.add('hidden');

  renderExamQuestion();
  renderExamDots();
  startExamTimer();
  updateExamProgress();
}

function startExamTimer() {
  updateTimerDisplay();
  state.examTimer = setInterval(() => {
    state.examTimeLeft--;
    updateTimerDisplay();
    if (state.examTimeLeft <= 0) {
      submitExam();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const mins = Math.floor(state.examTimeLeft / 60);
  const secs = state.examTimeLeft % 60;
  const display = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const el = document.getElementById('exam-timer');
  el.textContent = display;
  el.classList.remove('warning', 'danger');
  if (state.examTimeLeft < 300) el.classList.add('danger');
  else if (state.examTimeLeft < 900) el.classList.add('warning');
}

function renderExamQuestion() {
  const idx = state.examCurrentIndex;
  const q = state.examQuestions[idx];
  if (!q) return;

  document.getElementById('exam-q-module').textContent = MODULE_NAMES[q.module] || q.module;
  document.getElementById('exam-q-topic').textContent = q.topic || '';
  document.getElementById('exam-q-text').textContent = q.question;

  const existing = state.examAnswers[idx];

  const optionsContainer = document.getElementById('exam-q-options');
  optionsContainer.innerHTML = q.options.map((opt, oi) => {
    let cls = 'option-item';
    if (existing && existing.includes(oi)) cls += ' selected';
    if (q.correct && q.correct.length > 1) {
      // Multi-select
    }
    return `
      <div class="option-item ${cls}" data-option="${oi}">
        <div class="option-marker">${String.fromCharCode(65 + oi)}</div>
        <div>${opt}</div>
      </div>`;
  }).join('');

  // Click handlers
  optionsContainer.querySelectorAll('.option-item').forEach(item => {
    item.addEventListener('click', () => {
      selectOption(idx, parseInt(item.dataset.option));
    });
  });

  document.getElementById('exam-q-hint').textContent =
    q.correct && q.correct.length > 1
      ? '💡 Select ALL correct answers. Multiple answers may apply.'
      : '💡 Select the best answer.';

  document.getElementById('btn-prev').disabled = idx === 0;
  document.getElementById('btn-next').textContent = idx === state.examQuestions.length - 1 ? 'Finish →' : 'Next →';
  document.getElementById('btn-submit-exam').classList.toggle('hidden', idx !== state.examQuestions.length - 1);
  document.getElementById('btn-clear').classList.toggle('hidden', !existing);
  document.getElementById('btn-skip').classList.toggle('hidden', !!existing);

  updateExamProgress();
  renderExamDots();
}

function selectOption(idx, oi) {
  const q = state.examQuestions[idx];
  const isMulti = q.correct && q.correct.length > 1;

  if (isMulti) {
    if (!state.examAnswers[idx]) state.examAnswers[idx] = [];
    const existing = state.examAnswers[idx];
    const pos = existing.indexOf(oi);
    if (pos >= 0) {
      existing.splice(pos, 1);
      if (existing.length === 0) delete state.examAnswers[idx];
    } else {
      existing.push(oi);
    }
  } else {
    state.examAnswers[idx] = [oi];
  }

  delete state.examSkipped[idx];
  renderExamQuestion();
}

function clearAnswer() {
  const idx = state.examCurrentIndex;
  delete state.examAnswers[idx];
  state.examSkipped[idx] = true;
  renderExamQuestion();
}

function skipQuestion() {
  const idx = state.examCurrentIndex;
  state.examSkipped[idx] = true;
  delete state.examAnswers[idx];
  if (idx < state.examQuestions.length - 1) {
    navigateExam(1);
  }
}

function navigateExam(delta) {
  const newIdx = state.examCurrentIndex + delta;
  if (newIdx >= 0 && newIdx < state.examQuestions.length) {
    state.examCurrentIndex = newIdx;
    renderExamQuestion();
  }
  if (newIdx === state.examQuestions.length) {
    submitExam();
  }
}

function renderExamDots() {
  const container = document.getElementById('exam-dots');
  container.innerHTML = state.examQuestions.map((_, i) => {
    let cls = 'question-dot';
    if (i === state.examCurrentIndex) cls += ' current';
    else if (state.examAnswers[i]) cls += ' answered';
    else if (state.examSkipped[i]) cls += ' skipped';
    return `<div class="${cls}" data-idx="${i}"></div>`;
  }).join('');

  container.querySelectorAll('.question-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      state.examCurrentIndex = parseInt(dot.dataset.idx);
      renderExamQuestion();
    });
  });
}

function updateExamProgress() {
  const answered = Object.keys(state.examAnswers).length;
  document.getElementById('exam-progress-text').textContent =
    `Question ${state.examCurrentIndex + 1}/${state.examQuestions.length}`;
  document.getElementById('exam-progress-bar').style.width =
    `${((state.examCurrentIndex + 1) / state.examQuestions.length) * 100}%`;
  document.getElementById('exam-answered-count').textContent = answered;
  document.getElementById('exam-score-live').textContent = calculateLiveScore();
}

function calculateLiveScore() {
  let score = 0;
  Object.entries(state.examAnswers).forEach(([idx, selected]) => {
    const q = state.examQuestions[parseInt(idx)];
    if (!q || !q.correct) return;
    const correctSet = new Set(q.correct);
    const selectedSet = new Set(selected);
    if (setsEqual(correctSet, selectedSet)) {
      score += 1;
    } else if (selected.length > 0) {
      score -= 0.5;
    }
  });
  return score;
}

function setsEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
}

function submitExam() {
  if (state.examSubmitted) return;
  state.examSubmitted = true;
  clearInterval(state.examTimer);

  document.getElementById('exam-active').classList.add('hidden');
  document.getElementById('exam-results').classList.remove('hidden');

  const results = calculateResults();
  displayResults(results);
  saveToHistory(results);
}

function calculateResults() {
  let totalScore = 0;
  let correct = 0;
  let incorrect = 0;
  let skipped = 0;
  const moduleBreakdown = {};

  state.examQuestions.forEach((q, idx) => {
    const selected = state.examAnswers[idx];
    const modName = MODULE_NAMES[q.module] || q.module || 'Unknown';

    if (!moduleBreakdown[modName]) {
      moduleBreakdown[modName] = { total: 0, correct: 0, incorrect: 0, skipped: 0 };
    }
    moduleBreakdown[modName].total++;

    if (!selected || selected.length === 0) {
      skipped++;
      moduleBreakdown[modName].skipped++;
    } else {
      const correctSet = new Set(q.correct);
      const selectedSet = new Set(selected);
      if (setsEqual(correctSet, selectedSet)) {
        totalScore += 1;
        correct++;
        moduleBreakdown[modName].correct++;
      } else {
        totalScore -= 0.5;
        incorrect++;
        moduleBreakdown[modName].incorrect++;
      }
    }
  });

  const maxScore = state.examQuestions.length;
  const percentage = Math.max(0, Math.round((totalScore / maxScore) * 100));

  return { totalScore, maxScore, percentage, correct, incorrect, skipped, moduleBreakdown };
}

function displayResults(results) {
  const passed = results.percentage >= 70;
  document.getElementById('results-heading').textContent = passed ? '🎉 Congratulations!' : 'Keep Studying';
  document.getElementById('results-score').textContent = `${results.totalScore}/${results.maxScore}`;
  document.getElementById('results-percent').textContent = `${results.percentage}%`;
  const passfail = document.getElementById('results-passfail');
  passfail.textContent = passed ? '✅ PASSED' : '❌ NOT YET — NEED 70%';
  passfail.className = `results-pass-fail ${passed ? 'pass' : 'fail'}`;

  // Module breakdown
  const breakdown = document.getElementById('results-breakdown');
  breakdown.innerHTML = `
    <h3 style="margin-bottom:12px;font-size:14px;">Module Breakdown</h3>
    <table class="breakdown-table">
      <thead><tr><th>Module</th><th>Correct</th><th>Incorrect</th><th>Skipped</th><th>Score</th></tr></thead>
      <tbody>
        ${Object.entries(results.moduleBreakdown).map(([mod, data]) => `
          <tr>
            <td>${mod}</td>
            <td style="color:var(--success)">${data.correct}</td>
            <td style="color:var(--error)">${data.incorrect}</td>
            <td style="color:var(--text-muted)">${data.skipped}</td>
            <td>
              <div class="breakdown-bar">
                <div class="breakdown-bar-fill" style="width:${Math.round((data.correct/Math.max(1,data.total))*100)}%;background:${(data.correct/Math.max(1,data.total)) >= 0.7 ? 'var(--success)' : 'var(--error)'}"></div>
              </div>
              ${data.correct}/${data.total}
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function showReview() {
  document.getElementById('exam-results').classList.add('hidden');
  document.getElementById('exam-review').classList.remove('hidden');

  const list = document.getElementById('review-list');
  list.innerHTML = state.examQuestions.map((q, idx) => {
    const selected = state.examAnswers[idx];
    const correctSet = new Set(q.correct);
    let statusCls = 'skipped', statusText = 'Skipped';
    if (selected && selected.length > 0) {
      const selectedSet = new Set(selected);
      if (setsEqual(correctSet, selectedSet)) {
        statusCls = 'correct'; statusText = '✓ Correct';
      } else {
        statusCls = 'incorrect'; statusText = '✗ Incorrect (−0.5)';
      }
    }

    const optionsHtml = q.options.map((opt, oi) => {
      let cls = 'option-item';
      if (q.correct.includes(oi) && (!selected || !selected.includes(oi))) cls += ' missed-correct';
      else if (q.correct.includes(oi)) cls += ' correct';
      else if (selected && selected.includes(oi)) cls += ' incorrect';
      return `
        <div class="option-item ${cls}">
          <div class="option-marker">${String.fromCharCode(65 + oi)}</div>
          <div>${opt}</div>
        </div>`;
    }).join('');

    return `
      <div class="review-item">
        <div class="review-status ${statusCls}">${statusText}</div>
        <div class="question-meta">
          <span class="question-module">${MODULE_NAMES[q.module] || q.module}</span>
          <span class="question-topic">${q.topic || ''}</span>
        </div>
        <p style="font-weight:600;margin-bottom:12px;">${q.question}</p>
        <div class="question-options">${optionsHtml}</div>
        ${q.explanation ? `<div class="review-explanation">💡 ${q.explanation}</div>` : ''}
      </div>`;
  }).join('');
}

function resetExam() {
  state.examQuestions = [];
  state.examAnswers = {};
  state.examSkipped = {};
  state.examCurrentIndex = 0;
  state.examTimeLeft = 90 * 60;
  state.examSubmitted = false;
  if (state.examTimer) clearInterval(state.examTimer);

  document.getElementById('exam-active').classList.add('hidden');
  document.getElementById('exam-results').classList.add('hidden');
  document.getElementById('exam-review').classList.add('hidden');
  document.getElementById('exam-start').classList.remove('hidden');
}

// ==============================
// Drill Mode
// ==============================

function setupDrill() {
  const moduleSelect = document.getElementById('drill-module');
  moduleSelect.innerHTML += MODULES.filter(m => QUESTIONS.some(q => q.module === m))
    .map(m => `<option value="${m}">${MODULE_NAMES[m]}</option>`).join('');

  document.getElementById('btn-start-drill').addEventListener('click', startDrill);
  document.getElementById('btn-check-answer').addEventListener('click', checkDrillAnswer);
  document.getElementById('btn-next-drill').addEventListener('click', nextDrillQuestion);
  document.getElementById('btn-drill-again').addEventListener('click', resetDrill);
}

function startDrill() {
  const module = document.getElementById('drill-module').value;
  const count = parseInt(document.getElementById('drill-count').value);
  const showAnswers = document.getElementById('drill-show-answers').checked;

  let pool = module === 'all' ? [...QUESTIONS] : QUESTIONS.filter(q => q.module === module);
  if (pool.length === 0) pool = [...QUESTIONS];
  const shuffled = pool.sort(() => Math.random() - 0.5);
  state.drillQuestions = shuffled.slice(0, Math.min(count, shuffled.length));
  state.drillAnswers = {};
  state.drillCurrentIndex = 0;
  state.drillChecked = false;
  state.drillCorrectCount = 0;
  state.drillShowAnswers = showAnswers;

  document.getElementById('drill-setup').classList.add('hidden');
  document.getElementById('drill-active').classList.remove('hidden');
  document.getElementById('drill-results').classList.add('hidden');
  renderDrillQuestion();
}

function renderDrillQuestion() {
  const idx = state.drillCurrentIndex;
  const q = state.drillQuestions[idx];
  if (!q) return;

  state.drillChecked = false;
  document.getElementById('drill-progress').textContent = `Question ${idx + 1}/${state.drillQuestions.length}`;
  document.getElementById('drill-correct-count').textContent = state.drillCorrectCount;
  document.getElementById('drill-q-module').textContent = MODULE_NAMES[q.module] || q.module;
  document.getElementById('drill-q-text').textContent = q.question;

  const optionsContainer = document.getElementById('drill-q-options');
  optionsContainer.innerHTML = q.options.map((opt, oi) => `
    <div class="option-item" data-option="${oi}">
      <div class="option-marker">${String.fromCharCode(65 + oi)}</div>
      <div>${opt}</div>
    </div>
  `).join('');

  optionsContainer.querySelectorAll('.option-item').forEach(item => {
    item.addEventListener('click', () => {
      if (state.drillChecked) return;
      selectDrillOption(parseInt(item.dataset.option));
    });
  });

  document.getElementById('drill-feedback').classList.add('hidden');
  document.getElementById('btn-check-answer').classList.remove('hidden');
  document.getElementById('btn-next-drill').classList.add('hidden');
  state.drillChecked = false;
}

function selectDrillOption(oi) {
  const q = state.drillQuestions[state.drillCurrentIndex];
  const isMulti = q.correct && q.correct.length > 1;

  if (isMulti) {
    if (!state.drillAnswers[state.drillCurrentIndex]) state.drillAnswers[state.drillCurrentIndex] = [];
    const existing = state.drillAnswers[state.drillCurrentIndex];
    const pos = existing.indexOf(oi);
    if (pos >= 0) existing.splice(pos, 1);
    else existing.push(oi);
  } else {
    state.drillAnswers[state.drillCurrentIndex] = [oi];
  }

  // Update visual selection
  const items = document.getElementById('drill-q-options').querySelectorAll('.option-item');
  items.forEach(item => item.classList.remove('selected'));
  (state.drillAnswers[state.drillCurrentIndex] || []).forEach(i => {
    items[i]?.classList.add('selected');
  });
}

function checkDrillAnswer() {
  const idx = state.drillCurrentIndex;
  const q = state.drillQuestions[idx];
  const selected = state.drillAnswers[idx] || [];
  const correctSet = new Set(q.correct);
  const selectedSet = new Set(selected);
  const isCorrect = setsEqual(correctSet, selectedSet);

  state.drillChecked = true;
  if (isCorrect) state.drillCorrectCount++;
  document.getElementById('drill-correct-count').textContent = state.drillCorrectCount;

  // Show correct/incorrect on options
  const items = document.getElementById('drill-q-options').querySelectorAll('.option-item');
  items.forEach((item, oi) => {
    item.style.pointerEvents = 'none';
    if (q.correct.includes(oi)) item.classList.add('correct');
    if (selected.includes(oi) && !q.correct.includes(oi)) item.classList.add('incorrect');
    if (q.correct.includes(oi) && !selected.includes(oi)) item.classList.add('missed-correct');
  });

  // Show feedback if enabled
  if (state.drillShowAnswers) {
    const fb = document.getElementById('drill-feedback');
    fb.classList.remove('hidden');
    fb.className = `drill-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    fb.innerHTML = `
      <p style="font-weight:600;">${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</p>
      ${q.explanation ? `<p class="explanation">💡 ${q.explanation}</p>` : ''}
      <p style="font-size:11px;color:var(--text-muted);margin-top:8px;">Correct: ${q.correct.map(i => String.fromCharCode(65 + i)).join(', ')}</p>
    `;
  }

  document.getElementById('btn-check-answer').classList.add('hidden');
  document.getElementById('btn-next-drill').classList.remove('hidden');
  if (idx === state.drillQuestions.length - 1) {
    document.getElementById('btn-next-drill').textContent = 'Show Results →';
  }
}

function nextDrillQuestion() {
  if (state.drillCurrentIndex < state.drillQuestions.length - 1) {
    state.drillCurrentIndex++;
    renderDrillQuestion();
  } else {
    finishDrill();
  }
}

function finishDrill() {
  document.getElementById('drill-active').classList.add('hidden');
  document.getElementById('drill-results').classList.remove('hidden');

  const total = state.drillQuestions.length;
  const correct = state.drillCorrectCount;
  const pct = Math.round((correct / total) * 100);

  document.getElementById('drill-final-score').textContent = `${correct}/${total}`;
  document.getElementById('drill-final-percent').textContent = `${pct}%`;
  document.getElementById('drill-breakdown').innerHTML = `
    <p style="margin-top:12px;">${pct >= 70 ? '✅ Above passing threshold!' : '⚠️ Keep practicing this module.'}</p>
  `;
}

function resetDrill() {
  state.drillQuestions = [];
  state.drillAnswers = {};
  state.drillCurrentIndex = 0;
  state.drillCorrectCount = 0;
  document.getElementById('drill-active').classList.add('hidden');
  document.getElementById('drill-results').classList.add('hidden');
  document.getElementById('drill-setup').classList.remove('hidden');
}

// ==============================
// Knowledge Base
// ==============================

function renderKnowledgeBase(filter = '') {
  const container = document.getElementById('kb-container');
  const searchTerm = filter.toLowerCase();

  const filtered = KNOWLEDGE_BASE.filter(mod => {
    if (!searchTerm) return true;
    return mod.name.toLowerCase().includes(searchTerm) ||
      mod.topics.some(t => t.title.toLowerCase().includes(searchTerm) ||
        t.content.toLowerCase().includes(searchTerm));
  });

  container.innerHTML = filtered.map(mod => {
    const visibleTopics = mod.topics.filter(t => {
      if (!searchTerm) return true;
      return t.title.toLowerCase().includes(searchTerm) ||
        t.content.toLowerCase().includes(searchTerm);
    });

    return `
      <div class="kb-module-card">
        <div class="kb-module-header">
          <h3>${mod.name}</h3>
          <span class="kb-module-icon">${mod.icon}</span>
        </div>
        <div class="kb-module-body">
          ${visibleTopics.map(t => `
            <div class="kb-topic">
              <div class="kb-topic-title" onclick="this.parentElement.classList.toggle('open')">
                ${highlightText(t.title, searchTerm)}
              </div>
              <div class="kb-topic-content">${highlightText(t.content, searchTerm)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  // Open topics that match search
  if (searchTerm) {
    container.querySelectorAll('.kb-topic').forEach(t => t.classList.add('open'));
  }
}

function highlightText(text, term) {
  if (!term) return text;
  const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

function setupKnowledgeBase() {
  document.getElementById('kb-search').addEventListener('input', (e) => {
    renderKnowledgeBase(e.target.value);
  });
  renderKnowledgeBase();
}

// ==============================
// Q&A Search
// ==============================

function setupQASearch() {
  document.getElementById('btn-qa-search').addEventListener('click', performQASearch);
  document.getElementById('qa-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performQASearch();
  });
}

function performQASearch() {
  const query = document.getElementById('qa-input').value.trim().toLowerCase();
  if (!query) return;

  const results = [];
  const words = query.split(/\s+/);

  KNOWLEDGE_BASE.forEach(mod => {
    mod.topics.forEach(topic => {
      const contentLower = topic.content.toLowerCase();
      const titleLower = topic.title.toLowerCase();
      let score = 0;
      words.forEach(word => {
        if (titleLower.includes(word)) score += 3;
        if (contentLower.includes(word)) score += 1;
      });
      if (score > 0) {
        results.push({ module: mod, topic, score });
      }
    });
  });

  // Also search questions for relevant ones
  QUESTIONS.forEach(q => {
    const qLower = q.question.toLowerCase();
    let score = 0;
    words.forEach(word => {
      if (qLower.includes(word)) score += 2;
    });
    if (score > 0 && q.explanation) {
      results.push({
        module: { name: MODULE_NAMES[q.module] || q.module, icon: '📝' },
        topic: { title: q.question, content: q.explanation },
        score: score + 0.5
      });
    }
  });

  results.sort((a, b) => b.score - a.score);
  const topResults = results.slice(0, 20);

  const container = document.getElementById('qa-results');
  if (topResults.length === 0) {
    container.innerHTML = '<div class="qa-no-results">No results found. Try different keywords.</div>';
    return;
  }

  container.innerHTML = topResults.map(r => `
    <div class="qa-result-item">
      <div class="qa-result-module">${r.module.name} ${r.module.icon || ''}</div>
      <div class="qa-result-title">${highlightText(r.topic.title, query)}</div>
      <div class="qa-result-snippet">${highlightText(r.topic.content, query)}</div>
    </div>
  `).join('');
}

// ==============================
// History
// ==============================

function saveToHistory(results) {
  const history = getHistory();
  history.push({
    date: new Date().toISOString(),
    score: results.totalScore,
    max: results.maxScore,
    percentage: results.percentage,
    passed: results.percentage >= 70,
    correct: results.correct,
    incorrect: results.incorrect,
    skipped: results.skipped,
  });
  // Keep last 50 entries
  const trimmed = history.slice(-50);
  localStorage.setItem('odoo-exam-history', JSON.stringify(trimmed));
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem('odoo-exam-history') || '[]');
  } catch { return []; }
}

function renderHistory() {
  const list = document.getElementById('history-list');
  const history = getHistory().reverse();

  if (history.length === 0) {
    list.innerHTML = '<div class="history-empty">No exam attempts yet. Take your first full exam!</div>';
    document.getElementById('btn-clear-history').classList.add('hidden');
    return;
  }

  document.getElementById('btn-clear-history').classList.remove('hidden');

  list.innerHTML = history.map(h => `
    <div class="history-item">
      <div>
        <div style="font-weight:600;">${new Date(h.date).toLocaleString()}</div>
        <div class="history-date">${h.correct} correct · ${h.incorrect} incorrect · ${h.skipped} skipped</div>
      </div>
      <div>
        <span class="history-score ${h.passed ? 'pass' : 'fail'}">${h.percentage}%</span>
        <span style="font-size:12px;margin-left:8px;">${h.score}/${h.max}</span>
      </div>
    </div>
  `).join('');
}

function setupHistory() {
  document.getElementById('btn-clear-history').addEventListener('click', () => {
    if (confirm('Clear all exam history? This cannot be undone.')) {
      localStorage.removeItem('odoo-exam-history');
      renderHistory();
    }
  });
  renderHistory();
}
