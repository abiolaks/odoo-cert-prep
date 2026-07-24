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
  // Lazy loading flags
  kbRendered: false,
  ocrLoaded: false,
  tesseractLoading: false,
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
  setupPasteQuestion();
  setupOCR();
  setupHistory();
});

// ==============================
// Tab Navigation
// ==============================

function setupTabNavigation() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const hamburger = document.getElementById('hamburger-btn');

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    hamburger.classList.toggle('open');
  });

  // Close sidebar when tapping overlay
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.classList.remove('open');
  });

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Close mobile sidebar on nav
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      hamburger.classList.remove('open');
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      state.activeTab = tab;
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      document.getElementById(`tab-${tab}`).classList.add('active');
      // Lazy-load heavy content only when tab is first opened
      if (tab === 'knowledge' && !state.kbRendered) { renderKnowledgeBase(); state.kbRendered = true; }
      if (tab === 'ocr' && !state.ocrLoaded) loadTesseract();
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
  document.getElementById('btn-exam-hint').addEventListener('click', showExamHint);
}

function showExamHint() {
  const q = state.examQuestions[state.examCurrentIndex];
  if (!q) return;

  const correctLetters = q.correct.map(idx => String.fromCharCode(65 + idx));
  const hintDiv = document.getElementById('exam-hint-result');
  hintDiv.classList.remove('hidden');

  // Since exam questions come from our bank, we always know the answer
  hintDiv.innerHTML = `
    <div style="font-weight:600;margin-bottom:8px;">
      <span class="hint-correct">✅ Correct: ${correctLetters.join(', ')}</span>
    </div>
    <div style="color:var(--text-secondary);font-size:12px;">
      ${q.explanation ? escHtml(q.explanation) : ''}
    </div>
    ${q.id ? `<div style="margin-top:4px;font-size:11px;color:var(--text-muted);">Source: question bank (${q.id})</div>` : ''}
    <div style="margin-top:6px;font-size:10px;color:var(--warning);">⚠️ Using hints will affect your practice assessment. Try first, then hint if stuck.</div>
  `;

  // Clear hint when navigating
  const clearHint = () => hintDiv.classList.add('hidden');
  // Replace navigation listeners with hint-clearing versions
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  prevBtn.addEventListener('click', clearHint, { once: true });
  nextBtn.addEventListener('click', clearHint, { once: true });
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

  // Clear any previous hint
  document.getElementById('exam-hint-result').classList.add('hidden');

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
  document.getElementById('results-score').textContent = `${results.totalScore.toFixed(1)}/${results.maxScore}`;
  document.getElementById('results-percent').textContent = `${results.percentage}%`;
  const passfail = document.getElementById('results-passfail');
  passfail.textContent = passed ? '✅ PASSED (70%+ required)' : '❌ NOT YET — Need 70% to pass';
  passfail.className = `results-pass-fail ${passed ? 'pass' : 'fail'}`;

  // Summary counts
  const breakdown = document.getElementById('results-breakdown');
  breakdown.innerHTML = `
    <div class="results-summary" style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:20px;">
      <div style="flex:1;min-width:100px;background:var(--bg-secondary);padding:12px;border-radius:8px;text-align:center;">
        <div style="font-size:24px;font-weight:700;color:var(--success);">${results.correct}</div>
        <div style="font-size:12px;color:var(--text-muted);">✓ Correct (+1)</div>
      </div>
      <div style="flex:1;min-width:100px;background:var(--bg-secondary);padding:12px;border-radius:8px;text-align:center;">
        <div style="font-size:24px;font-weight:700;color:var(--error);">${results.incorrect}</div>
        <div style="font-size:12px;color:var(--text-muted);">✗ Wrong (−0.5)</div>
      </div>
      <div style="flex:1;min-width:100px;background:var(--bg-secondary);padding:12px;border-radius:8px;text-align:center;">
        <div style="font-size:24px;font-weight:700;color:var(--text-muted);">${results.skipped}</div>
        <div style="font-size:12px;color:var(--text-muted);">— Skipped (0)</div>
      </div>
    </div>
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
        // Check if at least one selected option is correct (partial credit case)
        const hasCorrectPick = selected.some(oi => q.correct.includes(oi));
        const missedRequired = q.correct.some(ci => !selected.includes(ci));
        if (hasCorrectPick && missedRequired) {
          statusCls = 'partial'; statusText = '⚠ Partially Correct (−0.5)';
        } else {
          statusCls = 'incorrect'; statusText = '✗ Incorrect (−0.5)';
        }
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
        ${renderKBRefs(q)}
      </div>`;
  }).join('');
}

// Render KB reference links for a question
function renderKBRefs(q) {
  const refs = QUESTION_KB_REFS[q.id];
  if (!refs || refs.length === 0) return '';
  return `
    <div class="kb-refs">
      <div class="kb-refs-title">📚 Documentation References</div>
      ${refs.map(r => `<span class="kb-ref-link" onclick="navigateToKB('${r.moduleId}','${escAttr(r.topicTitle)}')">${MODULE_NAMES[r.moduleId] || r.moduleId} → ${r.topicTitle}</span>`).join('')}
    </div>`;
}

// Navigate to the knowledge base tab and open a specific topic
function navigateToKB(moduleId, topicTitle) {
  // Switch to knowledge base tab
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const kbBtn = document.querySelector('[data-tab="knowledge"]');
  if (kbBtn) kbBtn.classList.add('active');
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  const kbTab = document.getElementById('tab-knowledge');
  if (kbTab) kbTab.classList.add('active');
  state.activeTab = 'knowledge';

  // Also close mobile sidebar if open
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');

  // Render KB (may be first time)
  renderKnowledgeBase();
  state.kbRendered = true;

  // Find the specific module + topic — retry up to 2s in case rendering is slow
  const moduleName = MODULE_NAMES[moduleId] || moduleId;
  const maxAttempts = 20;
  let attempts = 0;

  function findAndScroll() {
    attempts++;
    const cards = document.querySelectorAll('.kb-module-card');
    let found = false;

    cards.forEach(card => {
      const header = card.querySelector('.kb-module-header h3');
      if (!header) return;
      // Case-insensitive module name match
      if (header.textContent.trim().toLowerCase() !== moduleName.toLowerCase()) return;

      // Open ALL topics in this module so the user can see context
      const topics = card.querySelectorAll('.kb-topic');
      let targetTopic = null;

      topics.forEach(t => {
        const title = t.querySelector('.kb-topic-title');
        if (!title) return;
        // Case-insensitive topic title match
        const titleText = title.textContent.trim().toLowerCase();
        const searchText = topicTitle.toLowerCase();
        if (titleText === searchText || titleText.includes(searchText) || searchText.includes(titleText)) {
          targetTopic = t;
        }
        // Open all topics so nothing is hidden
        t.classList.add('open');
      });

      // Scroll the module card into view
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      found = true;

      // Highlight the specific topic with a brief pulse animation
      if (targetTopic) {
        // Remove any previous highlights
        document.querySelectorAll('.kb-topic.highlight-target').forEach(el => el.classList.remove('highlight-target'));
        targetTopic.classList.add('highlight-target');
        // Scroll the topic into clearer view
        setTimeout(() => targetTopic.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
        // Remove highlight after animation completes
        setTimeout(() => targetTopic.classList.remove('highlight-target'), 2500);
      }
    });

    if (!found && attempts < maxAttempts) {
      setTimeout(findAndScroll, 100);
    }
  }

  // Start searching after a short frame delay to let the DOM render
  setTimeout(findAndScroll, 50);
}

function escAttr(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/</g, '&lt;');
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

    // Determine feedback level: correct, partial, or incorrect
    const hasCorrectPick = selected.some(oi => q.correct.includes(oi));
    const hasWrongPick = selected.some(oi => !q.correct.includes(oi));
    const missedRequired = q.correct.some(ci => !selected.includes(ci));

    let fbLevel, fbTitle, fbDetail;
    if (isCorrect) {
      fbLevel = 'correct';
      fbTitle = '✅ Correct!';
      fbDetail = '';
    } else if (hasCorrectPick && missedRequired) {
      fbLevel = 'partial';
      fbTitle = '⚠️ Partially Correct';
      fbDetail = '<p style="font-size:12px;margin-top:4px;color:var(--warning)">You selected some correct answers, but missed: ' +
        q.correct.filter(ci => !selected.includes(ci)).map(i => String.fromCharCode(65 + i) + '. ' + q.options[i]).join(', ') + '</p>';
    } else {
      fbLevel = 'incorrect';
      fbTitle = '❌ Incorrect';
      // Show what the user picked vs what was correct
      const userPickStr = selected.map(oi => String.fromCharCode(65 + oi) + '. ' + q.options[oi]).join(', ') || '(none)';
      const correctStr = q.correct.map(i => String.fromCharCode(65 + i) + '. ' + q.options[i]).join(', ');
      fbDetail = '<div style="margin-top:6px;font-size:12px;">' +
        '<div style="color:var(--error);margin-bottom:2px;">You selected: ' + userPickStr + '</div>' +
        '<div style="color:var(--success);">Correct answer: ' + correctStr + '</div>' +
        '</div>';
    }

    fb.className = 'drill-feedback ' + fbLevel;
    fb.innerHTML =
      '<p style="font-weight:600;">' + fbTitle + '</p>' +
      fbDetail +
      (q.explanation ? '<p class="explanation">💡 ' + q.explanation + '</p>' : '') +
      '<p style="font-size:11px;color:var(--text-muted);margin-top:8px;">Correct: ' + q.correct.map(i => String.fromCharCode(65 + i)).join(', ') + '</p>' +
      renderKBRefs(q);
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
  // KB rendering is lazy — only when the tab is first opened
}

// ---- Lazy load Tesseract.js (only when OCR tab is opened) ----
function loadTesseract() {
  if (state.tesseractLoading) return;
  state.tesseractLoading = true;
  state.ocrLoaded = true; // Mark loaded to prevent re-load attempts

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@6/dist/tesseract.min.js';
  script.onload = () => {
    console.log('Tesseract.js loaded');
    state.ocrLoaded = true;
  };
  script.onerror = () => {
    console.warn('Failed to load Tesseract.js');
    state.ocrLoaded = false;
    state.tesseractLoading = false;
  };
  document.head.appendChild(script);
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

// ==============================
// Paste Question → Answer
// ==============================

function setupPasteQuestion() {
  document.getElementById('btn-paste-answer').addEventListener('click', processPastedQuestion);
  document.getElementById('btn-paste-clear').addEventListener('click', () => {
    document.getElementById('paste-input').value = '';
    document.getElementById('paste-results').classList.add('hidden');
  });
}

function processPastedQuestion() {
  const rawText = document.getElementById('paste-input').value.trim();
  if (!rawText) return;

  const parsed = parseQuestionText(rawText);
  if (!parsed) {
    alert('Could not parse the question. Please make sure it includes a question and options (A), B), etc.)');
    return;
  }

  document.getElementById('paste-results').classList.remove('hidden');

  // Display parsed question
  document.getElementById('paste-question-display').innerHTML = `
    <p class="question-text">${escHtml(parsed.question)}</p>
    ${parsed.options.map((opt, i) => `<div class="paste-option"><strong>${String.fromCharCode(65 + i)}.</strong> ${escHtml(opt)}</div>`).join('')}
  `;

  // STAGE 1: Try to match against our verified question bank
  const match = findMatchingQuestion(parsed);

  if (match) {
    // Found a match in our bank — show verified answers
    showVerifiedAnswer(parsed, match);
  } else {
    // No match found — fall back to KB search with clear caveats
    showKBEstimate(parsed);
  }
}

function findMatchingQuestion(parsed) {
  const qLower = parsed.question.toLowerCase();
  const qWords = new Set(qLower.split(/\s+/).filter(w => w.length > 3 && !isStopWord(w)));

  let bestMatch = null;
  let bestScore = 0;

  for (const q of QUESTIONS) {
    const bankQLower = q.question.toLowerCase();
    const bankWords = new Set(bankQLower.split(/\s+/).filter(w => w.length > 3 && !isStopWord(w)));

    // Jaccard-like overlap on significant words
    const intersection = [...qWords].filter(w => bankWords.has(w)).length;
    const union = new Set([...qWords, ...bankWords]).size;
    const questionSimilarity = intersection / union;

    // Also check option overlap
    let optionMatchCount = 0;
    for (const pastedOpt of parsed.options) {
      const pLower = pastedOpt.toLowerCase();
      for (const bankOpt of q.options) {
        const bLower = bankOpt.toLowerCase();
        const pWords = new Set(pLower.split(/\s+/).filter(w => w.length > 3));
        const bWords = new Set(bLower.split(/\s+/).filter(w => w.length > 3));
        const optIntersection = [...pWords].filter(w => bWords.has(w)).length;
        const optUnion = new Set([...pWords, ...bWords]).size;
        if (optUnion > 0 && optIntersection / optUnion > 0.5) {
          optionMatchCount++;
          break;
        }
      }
    }
    const optionSimilarity = parsed.options.length > 0 ? optionMatchCount / parsed.options.length : 0;

    // Combined score: question text matters more than option overlap
    const score = questionSimilarity * 0.6 + optionSimilarity * 0.4;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = { question: q, score };
    }
  }

  // Require a minimum similarity to consider it a match
  if (bestScore >= 0.35) return bestMatch;
  return null;
}

function showVerifiedAnswer(parsed, match) {
  const q = match.question;

  // Map the correct indices to letters
  const correctLetters = q.correct.map(idx => String.fromCharCode(65 + idx));

  document.getElementById('paste-answer').innerHTML = `
    <div class="match-banner" style="background:rgba(158,206,106,0.1);border:1px solid rgba(158,206,106,0.3);border-radius:8px;padding:10px 14px;margin-bottom:12px;">
      <span style="color:var(--success);font-weight:600;">✅ Matched question bank</span>
      <span style="color:var(--text-muted);font-size:12px;margin-left:8px;">(${Math.round(match.score * 100)}% similarity — verified answer)</span>
    </div>
    <div class="paste-answer-header"><h3>📋 Answer</h3></div>
    ${parsed.options.map((opt, i) => {
      const letter = String.fromCharCode(65 + i);
      const isCorrect = correctLetters.includes(letter);
      return `
        <div class="paste-answer-option ${isCorrect ? 'likely' : 'no-evidence'}">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span><strong>${letter}.</strong> ${escHtml(opt)}</span>
            <span style="font-size:12px;font-weight:600;color:${isCorrect ? 'var(--success)' : 'var(--error)'};">${isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}</span>
          </div>
        </div>`;
    }).join('')}

    ${q.explanation ? `
    <div style="margin-top:12px;padding:12px;background:var(--bg-tertiary);border-radius:var(--radius);">
      <strong>Explanation:</strong><br>
      <span style="color:var(--text-secondary);font-size:13px;">${escHtml(q.explanation)}</span>
    </div>` : ''}

    <div style="margin-top:12px;padding:12px;background:var(--bg-tertiary);border-radius:var(--radius);">
      <strong>Correct answer from question bank:</strong><br>
      <span style="color:var(--success);">${q.correct.map(idx => `${String.fromCharCode(65 + idx)}. ${escHtml(q.options[idx])}`).join('<br>')}</span>
    </div>

    <p style="font-size:11px;color:var(--text-muted);margin-top:8px;">✅ This answer comes from our verified question bank (${q.id}), not from keyword guessing.</p>
  `;

  // Show KB references for this question
  const refs = QUESTION_KB_REFS[q.id];
  document.getElementById('paste-evidence').innerHTML = `
    <h3>🔍 Source References</h3>
    ${refs && refs.length > 0
      ? refs.map(r => {
        const content = getKBContent(r);
        return content ? `
          <div class="evidence-item" style="cursor:pointer;" onclick="navigateToKB('${escAttr(r.moduleId)}','${escAttr(r.topicTitle)}')">
            <div class="evidence-source">${content.module.name} → ${content.topic.title}</div>
            <div class="evidence-text">${content.topic.content.substring(0, 250)}...</div>
          </div>` : '';
      }).join('')
      : '<p style="color:var(--text-muted);font-size:13px;">No specific KB references for this question.</p>'}
    <p style="font-size:11px;color:var(--text-muted);margin-top:8px;">Click a reference to jump to that topic in the Knowledge Base.</p>
  `;
}

function showKBEstimate(parsed) {
  const results = evaluateOptions(parsed);

  document.getElementById('paste-answer').innerHTML = `
    <div class="match-banner" style="background:rgba(224,175,104,0.1);border:1px solid rgba(224,175,104,0.3);border-radius:8px;padding:10px 14px;margin-bottom:12px;">
      <span style="color:var(--warning);font-weight:600;">⚠️ No match in question bank</span>
      <span style="color:var(--text-muted);font-size:12px;margin-left:8px;">Showing keyword-based estimate — not a verified answer</span>
    </div>
    <div class="paste-answer-header"><h3>📋 Keyword-Based Estimate</h3></div>
    ${results.verdicts.map(v => `
      <div class="paste-answer-option ${v.level}">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <span><strong>${v.letter}.</strong> ${escHtml(v.text)}</span>
          <span class="score-badge ${v.level}">score: ${v.score} (${v.ratio}% match)</span>
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">${v.explanation}</div>
      </div>
    `).join('')}
    <div style="margin-top:12px;padding:12px;background:var(--bg-tertiary);border-radius:var(--radius);">
      <strong>Best keyword match:</strong> ${results.bestAnswer}
    </div>
    <p style="font-size:11px;color:var(--text-muted);margin-top:8px;">⚠️ No matching question was found in our verified bank. This is a keyword-based guess and may be inaccurate. Always verify against the official Odoo documentation.</p>
  `;

  document.getElementById('paste-evidence').innerHTML = `
    <h3>🔍 Related Documentation</h3>
    ${results.evidence.length > 0
      ? results.evidence.slice(0, 5).map(e => `
        <div class="evidence-item">
          <div class="evidence-source">${e.module} → ${e.topic}</div>
          <div class="evidence-text">${e.snippet}</div>
        </div>
      `).join('')
      : '<p style="color:var(--text-muted);font-size:13px;">No clear evidence found. Try rephrasing the question or check the official Odoo docs directly.</p>'}
  `;
}

function parseQuestionText(text) {
  // Split into question and options
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length < 2) return null;

  // First non-empty line is the question
  let questionEnd = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (/^[A-Z][)\].]/.test(line) || /^[A-Z]\s/.test(line)) {
      questionEnd = i;
      break;
    }
  }
  if (questionEnd === 0) questionEnd = lines.length;

  const question = lines.slice(0, questionEnd).join(' ').trim();
  const optionLines = lines.slice(questionEnd);

  const options = [];
  let current = '';
  for (const line of optionLines) {
    const trimmed = line.trim();
    if (/^[A-Z][)\].]/.test(trimmed)) {
      if (current) options.push(current);
      current = trimmed.replace(/^[A-Z][)\].]\s*/, '').trim();
    } else if (current) {
      current += ' ' + trimmed;
    }
  }
  if (current) options.push(current);

  if (!question || options.length < 2) return null;

  return { question, options };
}

function evaluateOptions(parsed) {
  const questionLower = parsed.question.toLowerCase();
  const questionWords = questionLower.split(/\s+/).filter(w => w.length > 3);

  // Score each option individually against the KB
  const scored = parsed.options.map((optionText, idx) => {
    const letter = String.fromCharCode(65 + idx);
    const optLower = optionText.toLowerCase();
    const evidence = searchKBForTerms(questionLower, optLower);

    // Compute a meaningful score based on evidence quality
    const totalScore = evidence.reduce((s, e) => s + e.score, 0);
    return { letter, text: optionText, evidence, totalScore };
  });

  // Find the maximum score to compute relative confidence
  const maxScore = Math.max(...scored.map(s => s.totalScore), 1);

  // Classify options by how they compare to the top scorer
  const verdicts = scored.map(s => {
    let level, explanation;
    // Normalize: option's score as a fraction of the best option's score
    const ratio = s.totalScore / maxScore;

    if (s.totalScore === 0) {
      level = 'no-evidence';
      explanation = 'No documentation found for this option';
    } else if (ratio >= 0.7) {
      // Close to or equal to the top scorer — this is competitive
      if (s.evidence.length >= 2) {
        level = 'likely';
        explanation = 'Strong match — multiple documentation sources support this';
      } else {
        level = 'likely';
        explanation = 'Best match in documentation';
      }
    } else if (ratio >= 0.3) {
      level = 'unlikely';
      explanation = 'Some keyword matches, but weaker than the top option(s)';
    } else {
      level = 'no-evidence';
      explanation = 'Minimal or no evidence found';
    }

    return { letter: s.letter, text: s.text, level, explanation, score: s.totalScore, ratio: Math.round(ratio * 100) };
  });

  // Deduplicate and collect all evidence from top-scoring options
  const seen = new Set();
  const uniqueEvidence = [];
  const topOptions = scored.filter(s => s.totalScore > 0).sort((a, b) => b.totalScore - a.totalScore);
  for (const s of topOptions) {
    for (const e of s.evidence) {
      const key = e.module + e.topic;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueEvidence.push(e);
      }
    }
  }

  // Best answer: only the highest-scoring option or options (within 10% of top)
  const best = scored.filter(s => s.totalScore > 0).sort((a, b) => b.totalScore - a.totalScore);
  let bestAnswer;
  if (best.length === 0) {
    bestAnswer = 'Could not determine — no matching evidence in the knowledge base. Try rephrasing or checking the official Odoo docs.';
  } else {
    const topScore = best[0].totalScore;
    const topGroup = best.filter(s => s.totalScore >= topScore * 0.9);
    if (topGroup.length === 1) {
      bestAnswer = `${topGroup[0].letter}. ${topGroup[0].text} (score: ${topGroup[0].totalScore})`;
    } else {
      bestAnswer = topGroup.map(s => `${s.letter}. ${s.text}`).join('  |  ') + ` (scores: ${topGroup.map(s => s.totalScore).join('/')})`;
    }
  }

  return { verdicts, evidence: uniqueEvidence.slice(0, 5), bestAnswer };
}

function searchKBForTerms(questionLower, optLower) {
  // Extract key phrases from the question and option
  const questionWords = questionLower.split(/\s+/).filter(w => w.length > 4 && !isStopWord(w));
  const optionWords = optLower.split(/\s+/).filter(w => w.length > 4 && !isStopWord(w));

  // Also extract quoted or special phrases
  const keyPhrases = [];
  // Look for multi-word terms (2-3 word combinations that might be meaningful)
  const allQWords = questionLower.split(/\s+/).filter(w => w.length > 3);
  for (let i = 0; i < allQWords.length - 1; i++) {
    keyPhrases.push(allQWords[i] + ' ' + allQWords[i + 1]);
  }

  const results = [];

  KNOWLEDGE_BASE.forEach(mod => {
    mod.topics.forEach(topic => {
      let score = 0;
      const contentLower = topic.content.toLowerCase();
      const titleLower = topic.title.toLowerCase();

      // Phrase matches (strongest signal) — question+option phrase found in content
      for (const phrase of keyPhrases) {
        if (contentLower.includes(phrase)) score += 8;
      }

      // Option text contains a KB term (the option IS about this topic)
      const titleWords = titleLower.split(/\s+/).filter(w => w.length > 3);
      for (const tw of titleWords) {
        if (optLower.includes(tw)) score += 6;
      }

      // Significant words from option found in topic title
      for (const ow of optionWords) {
        if (titleLower.includes(ow)) score += 4;
      }

      // Significant words from question found in topic title
      for (const qw of questionWords) {
        if (titleLower.includes(qw)) score += 3;
      }

      // Option words found in content body
      for (const ow of optionWords) {
        if (contentLower.includes(ow)) score += 2;
      }

      // Question words found in content body (weakest signal)
      for (const qw of questionWords) {
        if (contentLower.includes(qw)) score += 1;
      }

      // Bonus: topic title is directly part of the option
      if (optLower.includes(titleLower) && titleLower.length > 6) score += 10;

      if (score > 0) {
        results.push({
          module: mod.name,
          topic: topic.title,
          snippet: topic.content.substring(0, 300) + (topic.content.length > 300 ? '...' : ''),
          score
        });
      }
    });
  });

  results.sort((a, b) => b.score - a.score);
  return results;
}

function isStopWord(word) {
  const stops = new Set([
    'which', 'there', 'their', 'about', 'would', 'could', 'should', 'these',
    'those', 'other', 'being', 'where', 'after', 'while', 'having', 'because',
    'before', 'during', 'between', 'through', 'without', 'following'
  ]);
  return stops.has(word);
}

// ==============================
// Screenshot OCR → Answer
// ==============================

function setupOCR() {
  const dropZone = document.getElementById('ocr-drop-zone');
  const fileInput = document.getElementById('ocr-file-input');
  const cameraInput = document.getElementById('ocr-camera-input');
  const preview = document.getElementById('ocr-preview');
  const previewImg = document.getElementById('ocr-preview-img');

  // Camera button
  document.getElementById('btn-ocr-camera').addEventListener('click', (e) => {
    e.stopPropagation();
    cameraInput.click();
  });
  cameraInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleOCRFile(e.target.files[0]);
  });

  // Gallery button
  document.getElementById('btn-ocr-gallery').addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleOCRFile(e.target.files[0]);
  });

  // Click on drop zone background still works (clicking the zone, not buttons)
  dropZone.addEventListener('click', (e) => {
    // Only trigger if clicking the zone itself, not a button inside it
    if (e.target === dropZone || e.target.closest('.ocr-upload-icon') || e.target.tagName === 'P') {
      fileInput.click();
    }
  });

  // Drag and drop
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleOCRFile(file);
  });

  // Paste from clipboard
  document.addEventListener('paste', (e) => {
    if (state.activeTab !== 'ocr') return;
    const items = e.clipboardData?.items;
    if (items) {
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          handleOCRFile(file);
          break;
        }
      }
    }
  });

  document.getElementById('btn-ocr-reset').addEventListener('click', resetOCR);
  document.getElementById('btn-ocr-process').addEventListener('click', processOCRImage);
  document.getElementById('btn-ocr-edit').addEventListener('click', editOCRText);
}

function handleOCRFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('ocr-preview-img').src = e.target.result;
    document.getElementById('ocr-upload-area').querySelector('.ocr-upload-zone').classList.add('hidden');
    document.getElementById('ocr-preview').classList.remove('hidden');
    state.ocrFile = file;
  };
  reader.readAsDataURL(file);
}

function resetOCR() {
  document.getElementById('ocr-upload-area').querySelector('.ocr-upload-zone').classList.remove('hidden');
  document.getElementById('ocr-preview').classList.add('hidden');
  document.getElementById('ocr-processing').classList.add('hidden');
  document.getElementById('ocr-results').classList.add('hidden');
  document.getElementById('ocr-file-input').value = '';
  state.ocrFile = null;
  state.ocrText = null;
}

async function processOCRImage() {
  if (!state.ocrFile) return;

  document.getElementById('ocr-preview').classList.add('hidden');
  document.getElementById('ocr-processing').classList.remove('hidden');
  document.getElementById('ocr-results').classList.add('hidden');

  try {
    // Ensure Tesseract is loaded (may be loading lazily)
    if (typeof Tesseract === 'undefined') {
      document.getElementById('ocr-progress').textContent = 'Loading OCR engine...';
      if (!state.tesseractLoading) loadTesseract();
      // Wait up to 30s for Tesseract to load
      for (let i = 0; i < 60; i++) {
        await new Promise(r => setTimeout(r, 500));
        if (typeof Tesseract !== 'undefined') break;
      }
      if (typeof Tesseract === 'undefined') {
        throw new Error('OCR engine failed to load. Check your internet connection and try again.');
      }
    }

    const { createWorker } = Tesseract;
    const worker = await createWorker('eng', 1, {
      logger: m => {
        if (m.status === 'recognizing text') {
          const pct = Math.round(m.progress * 100);
          document.getElementById('ocr-progress').textContent = pct + '%';
        }
      }
    });

    const { data: { text } } = await worker.recognize(state.ocrFile);
    await worker.terminate();

    state.ocrText = text.trim();
    document.getElementById('ocr-processing').classList.add('hidden');
    document.getElementById('ocr-results').classList.remove('hidden');

    // Display extracted text
    document.getElementById('ocr-text-display').textContent = state.ocrText;
    document.getElementById('ocr-text-display').contentEditable = 'false';
    document.getElementById('ocr-text-display').classList.remove('editing');

    // Process extracted text as a question
    processOCRExtractedText(state.ocrText);
  } catch (err) {
    console.error('OCR error:', err);
    document.getElementById('ocr-processing').innerHTML = `
      <p style="color:var(--error);">OCR failed: ${escHtml(err.message)}</p>
      <p class="ocr-hint">Try again with a clearer image, or use the Paste Question tab instead.</p>
    `;
  }
}

function processOCRExtractedText(text) {
  const parsed = parseQuestionText(text);
  if (!parsed) {
    document.getElementById('ocr-answer').innerHTML = `
      <div class="paste-answer-header"><h3>⚠️ Could Not Parse</h3></div>
      <p style="color:var(--text-secondary);font-size:13px;">The extracted text doesn't appear to be a complete question with options. Try editing the text below, or paste the question manually in the "Paste Question" tab.</p>
    `;
    document.getElementById('ocr-evidence').innerHTML = '';
    return;
  }

  const match = findMatchingQuestion(parsed);

  if (match) {
    const q = match.question;
    const correctLetters = q.correct.map(idx => String.fromCharCode(65 + idx));

    document.getElementById('ocr-answer').innerHTML = `
      <div class="match-banner" style="background:rgba(158,206,106,0.1);border:1px solid rgba(158,206,106,0.3);border-radius:8px;padding:10px 14px;margin-bottom:12px;">
        <span style="color:var(--success);font-weight:600;">✅ Matched question bank</span>
        <span style="color:var(--text-muted);font-size:12px;margin-left:8px;">(${Math.round(match.score * 100)}% similarity — verified answer)</span>
      </div>
      <div class="paste-answer-header"><h3>📋 Answer</h3></div>
      ${parsed.options.map((opt, i) => {
        const letter = String.fromCharCode(65 + i);
        const isCorrect = correctLetters.includes(letter);
        return `
          <div class="paste-answer-option ${isCorrect ? 'likely' : 'no-evidence'}">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span><strong>${letter}.</strong> ${escHtml(opt)}</span>
              <span style="font-size:12px;font-weight:600;color:${isCorrect ? 'var(--success)' : 'var(--error)'};">${isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}</span>
            </div>
          </div>`;
      }).join('')}
      ${q.explanation ? `
      <div style="margin-top:12px;padding:12px;background:var(--bg-tertiary);border-radius:var(--radius);">
        <strong>Explanation:</strong><br>
        <span style="color:var(--text-secondary);font-size:13px;">${escHtml(q.explanation)}</span>
      </div>` : ''}
      <p style="font-size:11px;color:var(--text-muted);margin-top:8px;">✅ This answer comes from our verified question bank (${q.id}), not from keyword guessing.</p>
    `;

    const refs = QUESTION_KB_REFS[q.id];
    document.getElementById('ocr-evidence').innerHTML = `
      <h3>🔍 Source References</h3>
      ${refs && refs.length > 0
        ? refs.map(r => {
          const content = getKBContent(r);
          return content ? `
            <div class="evidence-item" style="cursor:pointer;" onclick="navigateToKB('${escAttr(r.moduleId)}','${escAttr(r.topicTitle)}')">
              <div class="evidence-source">${content.module.name} → ${content.topic.title}</div>
              <div class="evidence-text">${content.topic.content.substring(0, 250)}...</div>
            </div>` : '';
        }).join('')
        : '<p style="color:var(--text-muted);font-size:13px;">No specific KB references for this question.</p>'}
    `;
  } else {
    const results = evaluateOptions(parsed);
    document.getElementById('ocr-answer').innerHTML = `
      <div class="match-banner" style="background:rgba(224,175,104,0.1);border:1px solid rgba(224,175,104,0.3);border-radius:8px;padding:10px 14px;margin-bottom:12px;">
        <span style="color:var(--warning);font-weight:600;">⚠️ No match in question bank</span>
        <span style="color:var(--text-muted);font-size:12px;margin-left:8px;">Showing keyword-based estimate — not a verified answer</span>
      </div>
      <div class="paste-answer-header"><h3>📋 Keyword-Based Estimate</h3></div>
      ${results.verdicts.map(v => `
        <div class="paste-answer-option ${v.level}">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <span><strong>${v.letter}.</strong> ${escHtml(v.text)}</span>
            <span class="score-badge ${v.level}">score: ${v.score} (${v.ratio}% match)</span>
          </div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">${v.explanation}</div>
        </div>
      `).join('')}
      <div style="margin-top:12px;padding:12px;background:var(--bg-tertiary);border-radius:var(--radius);">
        <strong>Best keyword match:</strong> ${results.bestAnswer}
      </div>
      <p style="font-size:11px;color:var(--text-muted);margin-top:8px;">⚠️ No matching question found in verified bank. This is a keyword-based guess. Verify against official docs.</p>
    `;
    document.getElementById('ocr-evidence').innerHTML = `
      <h3>🔍 Related Documentation</h3>
      ${results.evidence.length > 0
        ? results.evidence.slice(0, 5).map(e => `
          <div class="evidence-item">
            <div class="evidence-source">${e.module} → ${e.topic}</div>
            <div class="evidence-text">${e.snippet}</div>
          </div>
        `).join('')
        : '<p style="color:var(--text-muted);font-size:13px;">No clear evidence found.</p>'}
    `;
  }
}

function editOCRText() {
  const display = document.getElementById('ocr-text-display');
  const editing = display.contentEditable === 'true';
  display.contentEditable = editing ? 'false' : 'true';
  display.classList.toggle('editing', !editing);
  document.getElementById('btn-ocr-edit').textContent = editing ? 'Edit Text' : 'Reprocess Text';

  if (!editing) {
    // Reprocess with edited text
    processOCRExtractedText(display.textContent.trim());
  }
}

// ---- Utility ----

function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
