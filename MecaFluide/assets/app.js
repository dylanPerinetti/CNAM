/* === Mécanique des Fluides — application principale === */

const COURSES = [
  { file: 'cours/01-introduction.md',     title: 'Introduction générale',           desc: 'Définitions, propriétés, milieu continu' },
  { file: 'cours/02-cinematique.md',      title: 'Cinématique des fluides',         desc: 'Eulérien/Lagrangien, dérivée particulaire, lignes de courant' },
  { file: 'cours/03-equations-bilans.md', title: 'Équations de bilans',             desc: 'Reynolds, continuité, quantité de mouvement' },
  { file: 'cours/04-bilan-energie.md',    title: 'Bilan d\'énergie',                desc: 'Premier principe, dissipation, pertes de charge' },
  { file: 'cours/05-bernoulli.md',        title: 'Théorèmes de Bernoulli',          desc: 'Bernoulli, Pitot, Venturi, Torricelli' },
  { file: 'cours/06-sustentation.md',     title: 'Principes de sustentation',       desc: 'Portance, traînée, profils d\'aile' },
  { file: 'cours/07-navier-stokes.md',    title: 'Modèle de Navier-Stokes',         desc: 'Construction, Poiseuille, Couette' },
  { file: 'cours/08-adimensionnement.md', title: 'Adimensionnement',                desc: 'Reynolds, Mach, Froude, similitude' },
  { file: 'cours/09-fiches-revisions.md', title: 'Fiches de révision',              desc: 'Formules, méthodologie, pièges classiques', special: true },
];

const EXOS = [
  { file: 'exercices/01-cinematique-exos.md',      title: 'Cinématique',           desc: 'Accélération, lignes de courant, vorticité' },
  { file: 'exercices/02-bilans-exos.md',           title: 'Bilans',                desc: 'Conservation du débit, force sur paroi, aubage' },
  { file: 'exercices/03-bernoulli-exos.md',        title: 'Bernoulli',             desc: 'Vidange, Pitot, Venturi, pompe' },
  { file: 'exercices/04-navier-stokes-exos.md',    title: 'Navier-Stokes',         desc: 'Poiseuille, Couette, Stokes' },
  { file: 'exercices/05-adimensionnement-exos.md', title: 'Adimensionnement',      desc: 'Vaschy-Buckingham, similitude' },
];

const navCours = document.getElementById('navCours');
const navExos = document.getElementById('navExos');
const navQuiz = document.getElementById('navQuiz');
const content = document.getElementById('content');
const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('backdrop');

// === Sidebar : cours
COURSES.forEach((c, i) => {
  const item = document.createElement('a');
  item.className = 'nav-item' + (c.special ? ' special' : '');
  item.href = '#' + c.file;
  item.dataset.file = c.file;
  item.innerHTML = `<span class="num">${String(i+1).padStart(2,'0')}</span>${c.title}`;
  item.addEventListener('click', e => { e.preventDefault(); loadCourse(c.file); closeSidebar(); });
  navCours.appendChild(item);
});

// === Sidebar : exos
EXOS.forEach((c, i) => {
  const item = document.createElement('a');
  item.className = 'nav-item exo';
  item.href = '#' + c.file;
  item.dataset.file = c.file;
  item.innerHTML = `<span class="num">E${String(i+1).padStart(2,'0')}</span>${c.title}`;
  item.addEventListener('click', e => { e.preventDefault(); loadCourse(c.file); closeSidebar(); });
  navExos.appendChild(item);
});

// === Sidebar : quiz
window.QUIZZES.forEach((q, i) => {
  const item = document.createElement('a');
  item.className = 'nav-item quiz';
  item.href = '#quiz/' + q.id;
  item.dataset.quizId = q.id;
  item.innerHTML = `<span class="num">Q${String(i+1).padStart(2,'0')}</span>${q.title}`;
  item.addEventListener('click', e => { e.preventDefault(); loadQuiz(q.id); closeSidebar(); });
  navQuiz.appendChild(item);
});

/* === RENDU MARKDOWN + KaTeX (sans interférence) === */
function renderMarkdownWithMath(md) {
  const blocks = [];
  md = md.replace(/\$\$([\s\S]+?)\$\$/g, (m, formula) => {
    const id = blocks.length;
    blocks.push({ formula: formula.trim(), display: true });
    return `\n\n@@MATH${id}@@\n\n`;
  });
  md = md.replace(/(^|[^\$])\$([^\$\n]+?)\$(?!\$)/g, (m, pre, formula) => {
    const id = blocks.length;
    blocks.push({ formula: formula.trim(), display: false });
    return pre + `@@MATH${id}@@`;
  });
  let html = marked.parse(md);
  html = html.replace(/@@MATH(\d+)@@/g, (m, id) => {
    const { formula, display } = blocks[parseInt(id, 10)];
    try {
      return katex.renderToString(formula, { displayMode: display, throwOnError: false, strict: false });
    } catch (e) {
      return `<code class="katex-error">${formula}</code>`;
    }
  });
  return html;
}

// Variante : rend une chaîne courte avec $...$ inline (pour quiz)
function renderInline(text) {
  if (!text) return '';
  return text.replace(/\$([^\$\n]+?)\$/g, (m, f) => {
    try { return katex.renderToString(f, { displayMode: false, throwOnError: false, strict: false }); }
    catch { return m; }
  });
}

marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) return hljs.highlight(code, { language: lang }).value;
    return hljs.highlightAuto(code).value;
  },
  breaks: false,
  gfm: true,
});

/* === LOAD COURSE === */
async function loadCourse(file) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.file === file));
  content.classList.remove('home');
  content.innerHTML = '<div class="loader"><div class="spinner"></div>Chargement…</div>';

  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error('Fichier introuvable : ' + file);
    const md = await res.text();
    content.innerHTML = '<div class="md">' + renderMarkdownWithMath(md) + '</div>';
    // wrap tables
    content.querySelectorAll('.md table').forEach(table => {
      if (!table.parentElement.classList.contains('table-wrap')) {
        const wrap = document.createElement('div');
        wrap.className = 'table-wrap';
        table.parentNode.insertBefore(wrap, table);
        wrap.appendChild(table);
      }
    });
    history.replaceState(null, '', '#' + file);
    document.querySelector('main').scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    content.innerHTML = `<div class="md"><h1>❌ Erreur</h1><p>${err.message}</p>
      <p>Si tu ouvres ce site directement avec <code>file://</code>, ton navigateur peut bloquer les requêtes <code>fetch()</code>.<br>
      Lance plutôt un mini-serveur local depuis le dossier <code>MecaFluide</code> :</p>
      <pre><code>python3 -m http.server 8000</code></pre>
      <p>puis ouvre <code>http://localhost:8000</code> dans ton navigateur.</p></div>`;
  }
}

/* === ACCUEIL === */
function loadHome(e) {
  if (e) e.preventDefault();
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  content.classList.add('home');
  let html = `
    <h2>🌊 Mécanique des Fluides Fondamentale</h2>
    <p class="lead">Cours, exercices et quiz interactifs — tout ce qu'il te faut pour réussir l'examen</p>
    <p class="author">Rédigé par <strong>Dylan Perinetti</strong> · D'après le cours de M. Alfarez (CNAM)</p>

    <h3 class="section-title">📖 Les chapitres de cours</h3>
    <div class="cards">`;
  COURSES.forEach((c, i) => {
    html += `<div class="card" onclick="loadCourse('${c.file}')">
      <div class="num">${i+1}</div>
      <h3>${c.title}</h3><p>${c.desc}</p></div>`;
  });
  html += `</div>
    <h3 class="section-title">✏️ Exercices corrigés</h3>
    <div class="cards">`;
  EXOS.forEach((c, i) => {
    html += `<div class="card exo" onclick="loadCourse('${c.file}')">
      <div class="num">E${i+1}</div>
      <h3>${c.title}</h3><p>${c.desc}</p></div>`;
  });
  html += `</div>
    <h3 class="section-title">🎯 Quiz interactifs</h3>
    <div class="cards">`;
  window.QUIZZES.forEach((q, i) => {
    html += `<div class="card quiz" onclick="loadQuiz('${q.id}')">
      <div class="num">Q${i+1}</div>
      <h3>${q.title}</h3><p>${q.desc}<br><em>${q.questions.length} questions</em></p></div>`;
  });
  html += `</div>`;
  content.innerHTML = html;
  history.replaceState(null, '', '#');
  closeSidebar();
}

/* === À PROPOS === */
function loadAbout(e) {
  if (e) e.preventDefault();
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector('.nav-item.about')?.classList.add('active');
  content.classList.remove('home');
  content.innerHTML = `
    <div class="md">
      <h1>ℹ️ À propos de ce site</h1>

      <div class="about-box">
        <h3>📘 Présentation</h3>
        <p>Ce site rassemble un <strong>cours complet de mécanique des fluides fondamentale</strong>, des <strong>exercices corrigés</strong> et des <strong>quiz interactifs</strong>, conçus pour accompagner les étudiants dans la préparation de leurs examens.</p>

        <p class="label">Auteur</p>
        <p class="author-name">Dylan Perinetti</p>
        <p>Étudiant au CNAM. Si tu trouves une coquille ou souhaites suggérer une amélioration, n'hésite pas à me contacter via le dépôt GitHub du projet.</p>

        <p class="label">Sources</p>
        <ul>
          <li><strong>Cours de M. Alfarez</strong> — Mécanique des fluides fondamentale, CNAM</li>
          <li>Compléments tirés de <em>Mécanique des Fluides</em> (P.-L. Viollet)</li>
          <li><em>Fundamentals of Fluid Mechanics</em>, B.R. Munson</li>
          <li><em>An Introduction to Fluid Dynamics</em>, G.K. Batchelor</li>
        </ul>

        <p class="label">Architecture du site</p>
        <ul>
          <li><strong>Site statique</strong> : HTML + CSS + JS, hébergeable n'importe où (GitHub Pages, Netlify, Vercel)</li>
          <li><strong>Markdown</strong> pour le contenu pédagogique (cours/, exercices/)</li>
          <li><strong>marked.js</strong> pour le rendu HTML</li>
          <li><strong>KaTeX</strong> pour le rendu des formules mathématiques</li>
          <li><strong>highlight.js</strong> pour la coloration syntaxique</li>
          <li>Code séparé en <code>style.css</code>, <code>quiz-data.js</code>, <code>app.js</code></li>
        </ul>
      </div>

      <div class="about-box">
        <h3>🚀 Pistes d'amélioration du site</h3>
        <p>Voici quelques évolutions possibles :</p>
        <ul>
          <li><strong>Recherche full-text</strong> avec Lunr.js ou FlexSearch</li>
          <li><strong>Mode clair</strong> en plus du thème sombre</li>
          <li><strong>Schémas et figures interactifs</strong> (D3.js, Plotly) pour visualiser profils de vitesse, lignes de courant</li>
          <li><strong>Annotations utilisateurs</strong> en localStorage</li>
          <li><strong>Export PDF</strong> de chaque chapitre</li>
          <li><strong>Mode hors ligne</strong> via Service Worker (PWA)</li>
          <li><strong>Sauvegarde des scores</strong> de quiz en localStorage avec historique</li>
          <li><strong>Mode "fiche de révision"</strong> avec uniquement les formules clés</li>
          <li><strong>Mode aléatoire</strong> : quiz mélangeant des questions de tous les chapitres</li>
          <li><strong>Multi-langues</strong> (FR / EN)</li>
        </ul>
      </div>

      <div class="about-box">
        <h3>📝 Avertissement</h3>
        <p>Le contenu de ce site est <strong>pédagogique</strong> et destiné à un usage personnel d'étude. Il ne se substitue pas au cours officiel délivré par M. Alfarez au CNAM. Toute erreur restant de ma responsabilité.</p>
        <p>Si tu prépares un examen, je te recommande vivement de croiser ces fiches avec tes notes de cours, les TD officiels, et de t'entraîner sur des sujets d'annales.</p>
      </div>
    </div>`;
  history.replaceState(null, '', '#about');
  document.querySelector('main').scrollTo({ top: 0, behavior: 'smooth' });
  closeSidebar();
}

/* === MOTEUR DE QUIZ === */
const quizState = { current: null, answers: {}, submitted: false };

function loadQuiz(id) {
  const quiz = window.QUIZZES.find(q => q.id === id);
  if (!quiz) return loadHome();
  document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.quizId === id));
  content.classList.remove('home');

  quizState.current = quiz;
  quizState.answers = {};
  quizState.submitted = false;
  renderQuiz();
  history.replaceState(null, '', '#quiz/' + id);
  document.querySelector('main').scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuiz() {
  const { current, answers, submitted } = quizState;
  const total = current.questions.length;
  const answered = Object.keys(answers).length;
  const progress = (answered / total) * 100;

  let html = `
    <div class="quiz-header">
      <div>
        <h1>🎯 Quiz : ${current.title}</h1>
        <div class="meta">${current.desc} · <strong>${total} questions</strong></div>
      </div>
      <button class="btn ghost" onclick="loadHome()">← Retour</button>
    </div>
    <div class="quiz-progress-bar"><div style="width:${progress}%"></div></div>
  `;

  current.questions.forEach((q, i) => {
    const userAnswer = answers[i];
    const isAnswered = userAnswer !== undefined;
    const isCorrect = isAnswered && userAnswer === q.correct;
    const showResult = submitted;
    const stateClass = showResult ? (isCorrect ? 'correct' : 'wrong') : '';

    html += `<div class="quiz-question ${showResult ? 'answered' : ''} ${stateClass}">
      <div class="q-text"><span class="q-num">${i+1}</span>${renderInline(q.q)}</div>
      <div class="quiz-options">`;

    q.options.forEach((opt, j) => {
      let optClasses = 'quiz-option';
      let marker = '';
      if (showResult) {
        optClasses += ' disabled';
        if (j === q.correct) { optClasses += ' correct'; marker = '<span class="marker">✓</span>'; }
        else if (j === userAnswer) { optClasses += ' wrong'; marker = '<span class="marker">✗</span>'; }
      } else if (userAnswer === j) {
        optClasses += ' selected';
      }
      html += `<label class="${optClasses}">
        <input type="radio" name="q${i}" value="${j}" ${userAnswer === j ? 'checked' : ''} ${showResult ? 'disabled' : ''}
          onchange="selectAnswer(${i}, ${j})">
        <span class="label-txt">${renderInline(opt)}</span>${marker}
      </label>`;
    });

    html += `</div>`;
    if (showResult) {
      html += `<div class="quiz-explanation"><strong>💡 Explication :</strong> ${renderInline(q.explanation)}</div>`;
    }
    html += `</div>`;
  });

  if (!submitted) {
    html += `<div class="quiz-actions">
      <button class="btn primary" id="submitBtn" ${answered < total ? 'disabled' : ''} onclick="submitQuiz()">
        Valider le quiz (${answered}/${total})
      </button>
      <button class="btn ghost" onclick="resetQuiz()">Réinitialiser</button>
    </div>`;
  } else {
    const score = current.questions.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);
    const pct = Math.round((score / total) * 100);
    let msg = '';
    if (pct === 100) msg = "🏆 Parfait ! Tu maîtrises ce chapitre !";
    else if (pct >= 80) msg = "🎉 Très bon résultat, encore quelques détails à revoir.";
    else if (pct >= 60) msg = "👍 Bon début, mais il y a des points à approfondir.";
    else if (pct >= 40) msg = "📚 Il faut reprendre le cours sérieusement.";
    else msg = "❌ Reprends le cours depuis le début et refais le quiz.";

    html = `<div class="quiz-result">
      <div class="msg">${msg}</div>
      <div class="score">${score}/${total}</div>
      <div class="msg">Soit <strong>${pct}%</strong> de bonnes réponses</div>
      <div class="stats">
        <div class="stat">✅ Correctes : <strong>${score}</strong></div>
        <div class="stat">❌ Erreurs : <strong>${total - score}</strong></div>
      </div>
      <div class="quiz-actions" style="justify-content:center;margin-top:24px">
        <button class="btn primary" onclick="resetQuiz()">🔄 Recommencer</button>
        <button class="btn ghost" onclick="loadHome()">🏠 Accueil</button>
      </div>
    </div>` + html;
  }

  content.innerHTML = html;
}

function selectAnswer(qIdx, optIdx) {
  if (quizState.submitted) return;
  quizState.answers[qIdx] = optIdx;
  renderQuiz();
}

function submitQuiz() {
  quizState.submitted = true;
  renderQuiz();
}

function resetQuiz() {
  quizState.answers = {};
  quizState.submitted = false;
  renderQuiz();
}

/* === RECHERCHE === */
document.getElementById('searchInput').addEventListener('input', e => {
  const q = e.target.value.toLowerCase().trim();
  document.querySelectorAll('aside .nav-item').forEach(n => {
    const match = !q || n.textContent.toLowerCase().includes(q);
    n.style.display = match ? '' : 'none';
  });
});

/* === MOBILE MENU === */
document.getElementById('menuToggle').addEventListener('click', () => sidebar.classList.toggle('open'));
backdrop.addEventListener('click', closeSidebar);
function closeSidebar() { sidebar.classList.remove('open'); }
window.addEventListener('resize', () => { if (window.innerWidth > 768) closeSidebar(); });

/* === BOOTSTRAP === */
const initialHash = location.hash.replace('#','');
const allFiles = [...COURSES, ...EXOS].map(c => c.file);
if (initialHash === 'about') loadAbout();
else if (initialHash.startsWith('quiz/')) loadQuiz(initialHash.slice(5));
else if (initialHash && allFiles.includes(initialHash)) loadCourse(initialHash);
else loadHome();
