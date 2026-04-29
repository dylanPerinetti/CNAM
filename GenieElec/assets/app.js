/* =========================================================
   Moteurs à effet Hall — animations interactives
   Toutes les animations utilisent Canvas 2D + requestAnimationFrame
   ========================================================= */

(function () {
  'use strict';

  // -------- Utilitaires --------
  function setupCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, w: rect.width, h: rect.height };
  }

  function rand(min, max) { return min + Math.random() * (max - min); }

  // =========================================================
  // 1. HERO — fond animé : étoiles + flux de plasma
  // =========================================================
  function initHero() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    let { ctx, w, h } = setupCanvas(canvas);

    const stars = Array.from({ length: 140 }, () => ({
      x: rand(0, w), y: rand(0, h),
      r: rand(0.4, 1.6),
      a: rand(0.3, 1),
      tw: rand(0.005, 0.02),
      ph: rand(0, Math.PI * 2)
    }));

    const ions = Array.from({ length: 60 }, () => ({
      x: rand(-100, w),
      y: rand(0, h),
      vx: rand(2, 5),
      vy: rand(-0.3, 0.3),
      r: rand(1.2, 2.4),
      hue: rand(20, 60), // orange/jaune
      life: 1
    }));

    function resize() {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr; canvas.height = r.height * dpr;
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(dpr, dpr);
      w = r.width; h = r.height;
    }
    window.addEventListener('resize', resize);

    let t = 0;
    function frame() {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      // étoiles scintillantes
      ctx.save();
      stars.forEach(s => {
        const flicker = 0.5 + 0.5 * Math.sin(t * s.tw + s.ph);
        ctx.fillStyle = `rgba(200, 220, 255, ${s.a * flicker})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // flux d'ions (jet de propulseur)
      ions.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > w + 20) {
          p.x = -20;
          p.y = rand(0, h);
        }
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 70%, 0.9)`);
        grad.addColorStop(1, `hsla(${p.hue}, 100%, 60%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 90%, 1)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(frame);
    }
    frame();
  }

  // =========================================================
  // 2. PLASMA — ionisation du xénon
  // =========================================================
  function initPlasma() {
    const canvas = document.getElementById('plasmaCanvas');
    if (!canvas) return;
    let { ctx, w, h } = setupCanvas(canvas);

    let energySlider = document.getElementById('plasmaEnergy');
    let resetBtn = document.getElementById('plasmaReset');

    let particles = [];
    let energy = 5;

    function spawn() {
      particles = [];
      // neutres (atomes Xe)
      for (let i = 0; i < 22; i++) {
        particles.push({
          type: 'neutral',
          x: rand(20, w - 20),
          y: rand(20, h - 20),
          vx: rand(-0.3, 0.3),
          vy: rand(-0.3, 0.3),
          r: 6
        });
      }
      // électrons rapides
      for (let i = 0; i < 8; i++) {
        const a = rand(0, Math.PI * 2);
        particles.push({
          type: 'electron',
          x: rand(20, w - 20),
          y: rand(20, h - 20),
          vx: Math.cos(a) * energy * 0.6,
          vy: Math.sin(a) * energy * 0.6,
          r: 2.5
        });
      }
    }

    function resize() {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr; canvas.height = r.height * dpr;
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(dpr, dpr);
      w = r.width; h = r.height;
    }
    window.addEventListener('resize', resize);

    energySlider.addEventListener('input', e => {
      energy = parseFloat(e.target.value);
      // adapte la vitesse des électrons
      particles.forEach(p => {
        if (p.type === 'electron') {
          const sp = Math.hypot(p.vx, p.vy) || 1;
          p.vx = p.vx / sp * energy * 0.6;
          p.vy = p.vy / sp * energy * 0.6;
        }
      });
    });
    resetBtn.addEventListener('click', spawn);
    spawn();

    function frame() {
      ctx.clearRect(0, 0, w, h);

      // halo plasma
      const grad = ctx.createRadialGradient(w/2, h/2, 20, w/2, h/2, w/2);
      grad.addColorStop(0, 'rgba(123,140,255,0.05)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // mouvement
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < p.r || p.x > w - p.r) p.vx *= -1;
        if (p.y < p.r || p.y > h - p.r) p.vy *= -1;
      });

      // collisions ionisantes
      const newParts = [];
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          if (a.type === 'electron' && b.type === 'neutral') {
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            const speed = Math.hypot(a.vx, a.vy);
            if (d < 9 && speed > 2.5) {
              // ionisation
              b.type = 'ion';
              b.r = 5;
              b.vx *= 0.5; b.vy *= 0.5;
              // électron secondaire
              newParts.push({
                type: 'electron',
                x: b.x + rand(-3, 3),
                y: b.y + rand(-3, 3),
                vx: rand(-2, 2),
                vy: rand(-2, 2),
                r: 2.5
              });
              a.vx *= 0.6; a.vy *= 0.6;
            }
          }
        }
      }
      particles = particles.concat(newParts);
      // limiter
      if (particles.length > 80) particles = particles.slice(0, 80);

      // dessin
      particles.forEach(p => {
        if (p.type === 'neutral') {
          ctx.fillStyle = 'rgba(111, 116, 153, 0.85)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#fff';
          ctx.font = '8px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Xe', p.x, p.y + 3);
        } else if (p.type === 'ion') {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
          g.addColorStop(0, 'rgba(255,138,76,1)');
          g.addColorStop(1, 'rgba(255,138,76,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ff8a4c';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#fff';
          ctx.font = '8px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('+', p.x, p.y + 3);
        } else { // electron
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          g.addColorStop(0, 'rgba(45, 212, 255, 1)');
          g.addColorStop(1, 'rgba(45, 212, 255, 0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#2dd4ff';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(frame);
    }
    frame();
  }

  // =========================================================
  // 3. EFFET HALL — dérive E×B
  // =========================================================
  function initExB() {
    const canvas = document.getElementById('exbCanvas');
    if (!canvas) return;
    let { ctx, w, h } = setupCanvas(canvas);

    const bSlider = document.getElementById('bSlider');
    const eSlider = document.getElementById('eSlider');
    const resetBtn = document.getElementById('exbReset');

    let B = 10;
    let E = 8;
    let electrons = [];

    function spawnElectrons() {
      electrons = [];
      for (let i = 0; i < 5; i++) {
        electrons.push({
          x: rand(40, w - 40),
          y: rand(40, h - 40),
          vx: rand(-1, 1),
          vy: rand(-1, 1),
          trail: []
        });
      }
    }

    function resize() {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr; canvas.height = r.height * dpr;
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(dpr, dpr);
      w = r.width; h = r.height;
    }
    window.addEventListener('resize', resize);

    bSlider.addEventListener('input', e => B = parseFloat(e.target.value));
    eSlider.addEventListener('input', e => E = parseFloat(e.target.value));
    resetBtn.addEventListener('click', spawnElectrons);
    spawnElectrons();

    function frame() {
      // fond persistant pour effet de traînée
      ctx.fillStyle = 'rgba(6, 8, 18, 0.18)';
      ctx.fillRect(0, 0, w, h);

      // grille de champ E (flèches horizontales)
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.18)';
      ctx.lineWidth = 1;
      for (let y = 30; y < h; y += 36) {
        ctx.beginPath();
        ctx.moveTo(20, y); ctx.lineTo(w - 20, y);
        ctx.stroke();
        // pointes
        ctx.beginPath();
        ctx.moveTo(w - 20, y); ctx.lineTo(w - 26, y - 3); ctx.lineTo(w - 26, y + 3); ctx.closePath();
        ctx.fillStyle = 'rgba(74, 222, 128, 0.35)';
        ctx.fill();
      }
      // labels
      ctx.fillStyle = 'rgba(74, 222, 128, 0.7)';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('E →', 8, 18);

      // points B (sortants — radial vers nous)
      ctx.fillStyle = 'rgba(251, 191, 36, 0.9)';
      ctx.font = 'bold 14px monospace';
      for (let x = 50; x < w - 30; x += 70) {
        for (let y = 50; y < h - 20; y += 60) {
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(251, 191, 36, 0.9)';
          ctx.fill();
        }
      }
      ctx.fillStyle = 'rgba(251, 191, 36, 0.9)';
      ctx.fillText('B ⊙', w - 50, 18);

      // dérive E×B (vers le haut sur l'écran : E→ × B⊙ = ↑)
      const Ev = E * 0.04;
      const Bv = B * 0.04;
      const driftY = - (Ev / Math.max(Bv, 0.01)) * 0.6; // signe : vers le haut

      electrons.forEach(p => {
        // F = q(E + v × B). Pour électron q = -e, mais on garde les conventions
        // pour visualiser une trajectoire cycloïdale.
        // Force E (vers la droite, mais sur l'électron : vers la gauche)
        const ax = -Ev; // accélération due à E (sur électron)
        // Force magnétique : v × B où B sort de l'écran (Bz > 0)
        // F_x = -q * vy * B  ;  F_y =  q * vx * B  (avec q = -e)
        // Pour l'électron : F_x = +e*vy*B ; F_y = -e*vx*B
        const fx = Bv * p.vy;
        const fy = -Bv * p.vx;

        p.vx += ax + fx;
        p.vy += fy;

        // amortissement léger
        p.vx *= 0.995;
        p.vy *= 0.995;

        p.x += p.vx;
        p.y += p.vy;

        // rebond sur les bords
        if (p.x < 5) { p.x = 5; p.vx = Math.abs(p.vx); }
        if (p.x > w - 5) { p.x = w - 5; p.vx = -Math.abs(p.vx); }
        if (p.y < 5) { p.y = 5; p.vy = Math.abs(p.vy); }
        if (p.y > h - 5) { p.y = h - 5; p.vy = -Math.abs(p.vy); }

        // trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 80) p.trail.shift();

        // dessin trail
        ctx.beginPath();
        for (let i = 0; i < p.trail.length; i++) {
          const t = p.trail[i];
          if (i === 0) ctx.moveTo(t.x, t.y);
          else ctx.lineTo(t.x, t.y);
        }
        ctx.strokeStyle = 'rgba(45, 212, 255, 0.55)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // électron
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10);
        g.addColorStop(0, 'rgba(45,212,255,1)');
        g.addColorStop(1, 'rgba(45,212,255,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#2dd4ff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // flèche de dérive globale
      ctx.save();
      ctx.translate(w - 70, h - 50);
      ctx.strokeStyle = '#c66bff';
      ctx.fillStyle = '#c66bff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 20); ctx.lineTo(0, -20);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -20); ctx.lineTo(-5, -14); ctx.lineTo(5, -14); ctx.closePath();
      ctx.fill();
      ctx.font = '11px monospace';
      ctx.fillText('v_D', 8, -10);
      ctx.restore();

      requestAnimationFrame(frame);
    }
    frame();
  }

  // =========================================================
  // 4. ACCÉLÉRATION DES IONS
  // =========================================================
  function initAccel() {
    const canvas = document.getElementById('accelCanvas');
    if (!canvas) return;
    let { ctx, w, h } = setupCanvas(canvas);

    const ud = document.getElementById('udSlider');
    const md = document.getElementById('mdotSlider');
    const udVal = document.getElementById('udValue');
    const mdVal = document.getElementById('mdotValue');

    const resVe = document.getElementById('resVe');
    const resF  = document.getElementById('resF');
    const resIsp = document.getElementById('resIsp');
    const resP  = document.getElementById('resP');

    let Ud = 300;     // V
    let mdot = 5;     // mg/s

    let ions = [];

    function spawnIon() {
      ions.push({
        x: rand(40, 80),
        y: rand(60, h - 60),
        vx: rand(0.2, 0.6),
        r: rand(2, 3.5)
      });
    }

    function resize() {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr; canvas.height = r.height * dpr;
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(dpr, dpr);
      w = r.width; h = r.height;
    }
    window.addEventListener('resize', resize);

    function update() {
      Ud = parseFloat(ud.value);
      mdot = parseFloat(md.value);
      udVal.textContent = Ud + ' V';
      mdVal.textContent = mdot + ' mg/s';

      // physique
      const q = 1.602e-19;
      const mi = 2.18e-25; // xénon
      const ve = Math.sqrt(2 * q * Ud / mi);
      const F = (mdot * 1e-6) * ve;        // mdot mg/s -> kg/s : *1e-6
      const Isp = ve / 9.81;
      const Pjet = 0.5 * (mdot * 1e-6) * ve * ve;

      resVe.textContent = Math.round(ve).toLocaleString('fr-FR') + ' m/s';
      resF.textContent  = (F * 1000).toFixed(1) + ' mN';
      resIsp.textContent = Math.round(Isp) + ' s';
      resP.textContent  = (Pjet / 1000).toFixed(2) + ' kW';
    }
    ud.addEventListener('input', update);
    md.addEventListener('input', update);
    update();

    let spawnTimer = 0;
    function frame() {
      ctx.clearRect(0, 0, w, h);

      // canal du propulseur
      const cx0 = 30, cx1 = w - 30, cy0 = 40, cy1 = h - 40;
      // murs
      ctx.fillStyle = 'rgba(123,140,255,0.06)';
      ctx.fillRect(cx0, cy0, cx1 - cx0, cy1 - cy0);
      ctx.strokeStyle = 'rgba(123,140,255,0.4)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(cx0, cy0, cx1 - cx0, cy1 - cy0);

      // anode (gauche)
      ctx.fillStyle = '#ff6b6b';
      ctx.fillRect(cx0 - 6, cy0, 6, cy1 - cy0);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Anode +', cx0 + 30, cy0 - 8);

      // cathode (droite)
      ctx.fillStyle = '#4ade80';
      ctx.fillRect(cx1, cy0, 6, cy1 - cy0);
      ctx.fillText('Cathode -', cx1 - 30, cy0 - 8);

      // gradient E
      const eGrad = ctx.createLinearGradient(cx0, 0, cx1, 0);
      eGrad.addColorStop(0, 'rgba(255,107,107,0.08)');
      eGrad.addColorStop(1, 'rgba(74, 222, 128, 0.08)');
      ctx.fillStyle = eGrad;
      ctx.fillRect(cx0, cy0, cx1 - cx0, cy1 - cy0);

      // flèche E
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.6)';
      ctx.fillStyle = 'rgba(74, 222, 128, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx0 + 30, h / 2); ctx.lineTo(cx1 - 30, h / 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx1 - 30, h / 2); ctx.lineTo(cx1 - 36, h / 2 - 4); ctx.lineTo(cx1 - 36, h / 2 + 4); ctx.closePath();
      ctx.fill();
      ctx.font = '11px monospace';
      ctx.fillText('E', (cx0 + cx1) / 2, h / 2 - 8);

      // spawn ions
      spawnTimer++;
      if (spawnTimer > Math.max(2, 8 - mdot)) {
        spawnIon();
        spawnTimer = 0;
      }

      // accélération proportionnelle à Ud
      const accel = 0.005 * Ud;

      ions = ions.filter(p => p.x < cx1 + 100);
      ions.forEach(p => {
        p.vx += accel * 0.001;
        p.x += p.vx;

        // halo
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, 'rgba(255, 138, 76, 0.9)');
        g.addColorStop(1, 'rgba(255, 138, 76, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();

        // traînée
        ctx.strokeStyle = 'rgba(255, 138, 76, 0.5)';
        ctx.lineWidth = p.r;
        ctx.beginPath();
        ctx.moveTo(Math.max(p.x - 20, cx0), p.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        ctx.fillStyle = '#ff8a4c';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // label de tension
      ctx.fillStyle = 'rgba(230, 232, 255, 0.85)';
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('U_d = ' + Ud + ' V', 8, h - 8);

      requestAnimationFrame(frame);
    }
    frame();
  }

  // =========================================================
  // 5. ARCHITECTURE — diagramme SVG animé
  // =========================================================
  function initArch() {
    const wrap = document.getElementById('archDiagram');
    if (!wrap) return;
    wrap.innerHTML = `
      <svg viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="boxG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="rgba(123,140,255,0.18)"/>
            <stop offset="100%" stop-color="rgba(198,107,255,0.10)"/>
          </linearGradient>
          <linearGradient id="ppuG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#7b8cff"/>
            <stop offset="100%" stop-color="#c66bff"/>
          </linearGradient>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#7b8cff"/>
          </marker>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <!-- Panneaux solaires -->
        <g transform="translate(20,140)">
          <rect width="120" height="100" rx="10" fill="url(#boxG)" stroke="rgba(123,140,255,0.5)"/>
          <text x="60" y="36" text-anchor="middle" fill="#e6e8ff" font-size="13" font-weight="600">☀️ Panneaux</text>
          <text x="60" y="56" text-anchor="middle" fill="#e6e8ff" font-size="13" font-weight="600">solaires</text>
          <text x="60" y="80" text-anchor="middle" fill="#a3a8d0" font-size="11">~100 V DC</text>
        </g>

        <!-- Bus DC -->
        <g transform="translate(200,160)">
          <rect width="100" height="60" rx="8" fill="rgba(20,24,56,0.8)" stroke="rgba(123,140,255,0.5)"/>
          <text x="50" y="28" text-anchor="middle" fill="#e6e8ff" font-size="12" font-weight="600">Bus DC</text>
          <text x="50" y="46" text-anchor="middle" fill="#a3a8d0" font-size="11">28/100 V</text>
        </g>

        <!-- PPU central -->
        <g transform="translate(360,130)">
          <rect width="160" height="120" rx="14" fill="url(#ppuG)" stroke="white" stroke-width="1" filter="url(#glow)"/>
          <text x="80" y="40" text-anchor="middle" fill="white" font-size="16" font-weight="700">PPU</text>
          <text x="80" y="60" text-anchor="middle" fill="white" font-size="10" opacity="0.85">Power Processing Unit</text>
          <line x1="20" y1="80" x2="140" y2="80" stroke="rgba(255,255,255,0.3)"/>
          <text x="80" y="98" text-anchor="middle" fill="white" font-size="11">• Buck • Boost</text>
          <text x="80" y="112" text-anchor="middle" fill="white" font-size="11">• Full-bridge isolé</text>
        </g>

        <!-- Sous-systèmes (droite) -->
        <g transform="translate(580,30)">
          <rect width="200" height="60" rx="10" fill="url(#boxG)" stroke="rgba(255,107,76,0.6)"/>
          <text x="100" y="24" text-anchor="middle" fill="#e6e8ff" font-size="12" font-weight="600">Décharge (anode)</text>
          <text x="100" y="42" text-anchor="middle" fill="#a3a8d0" font-size="11">200–400 V • kW</text>
        </g>
        <g transform="translate(580,110)">
          <rect width="200" height="60" rx="10" fill="url(#boxG)" stroke="rgba(251,191,36,0.6)"/>
          <text x="100" y="24" text-anchor="middle" fill="#e6e8ff" font-size="12" font-weight="600">Bobines magnétiques</text>
          <text x="100" y="42" text-anchor="middle" fill="#a3a8d0" font-size="11">10–30 V • ~30 W</text>
        </g>
        <g transform="translate(580,190)">
          <rect width="200" height="60" rx="10" fill="url(#boxG)" stroke="rgba(74,222,128,0.6)"/>
          <text x="100" y="24" text-anchor="middle" fill="#e6e8ff" font-size="12" font-weight="600">Cathode chauffée</text>
          <text x="100" y="42" text-anchor="middle" fill="#a3a8d0" font-size="11">10–15 V • ~50 W</text>
        </g>
        <g transform="translate(580,270)">
          <rect width="200" height="60" rx="10" fill="url(#boxG)" stroke="rgba(45,212,255,0.6)"/>
          <text x="100" y="24" text-anchor="middle" fill="#e6e8ff" font-size="12" font-weight="600">Allumeur</text>
          <text x="100" y="42" text-anchor="middle" fill="#a3a8d0" font-size="11">kV (impulsion)</text>
        </g>

        <!-- liaisons -->
        <g stroke="#7b8cff" stroke-width="2" fill="none" marker-end="url(#arr)">
          <path d="M 140,190 L 200,190" />
          <path d="M 300,190 L 360,190" />
          <path d="M 520,190 L 580,60" class="flow-line" />
          <path d="M 520,190 L 580,140" class="flow-line" />
          <path d="M 520,190 L 580,220" class="flow-line" />
          <path d="M 520,190 L 580,300" class="flow-line" />
        </g>

        <!-- Particules d'énergie animées -->
        <circle r="3" fill="#2dd4ff" filter="url(#glow)">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 140,190 L 200,190 L 300,190 L 360,190"/>
        </circle>
        <circle r="3" fill="#2dd4ff" filter="url(#glow)">
          <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s" path="M 140,190 L 200,190 L 300,190 L 360,190"/>
        </circle>
        <circle r="2.5" fill="#ff8a4c" filter="url(#glow)">
          <animateMotion dur="1.6s" repeatCount="indefinite" path="M 520,190 L 580,60"/>
        </circle>
        <circle r="2.5" fill="#fbbf24" filter="url(#glow)">
          <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.4s" path="M 520,190 L 580,140"/>
        </circle>
        <circle r="2.5" fill="#4ade80" filter="url(#glow)">
          <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.8s" path="M 520,190 L 580,220"/>
        </circle>
        <circle r="2.5" fill="#2dd4ff" filter="url(#glow)">
          <animateMotion dur="1.6s" repeatCount="indefinite" begin="1.2s" path="M 520,190 L 580,300"/>
        </circle>
      </svg>
    `;
  }

  // =========================================================
  // 6. PWM — buck converter
  // =========================================================
  function initPWM() {
    const canvas = document.getElementById('pwmCanvas');
    if (!canvas) return;
    let { ctx, w, h } = setupCanvas(canvas);

    const dutyEl = document.getElementById('duty');
    const freqEl = document.getElementById('freq');
    const dutyVal = document.getElementById('dutyVal');
    const freqVal = document.getElementById('freqVal');
    const eqEl = document.getElementById('pwmEq');

    let duty = 50, freq = 100;
    let phase = 0;
    const Vin = 100;

    function resize() {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr; canvas.height = r.height * dpr;
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(dpr, dpr);
      w = r.width; h = r.height;
    }
    window.addEventListener('resize', resize);

    function update() {
      duty = parseFloat(dutyEl.value);
      freq = parseFloat(freqEl.value);
      dutyVal.textContent = duty + ' %';
      freqVal.textContent = freq + ' kHz';
      const Vout = (duty / 100) * Vin;
      eqEl.innerHTML = `Avec V<sub>in</sub> = 100 V → V<sub>out</sub> = ${Vout.toFixed(0)} V`;
    }
    dutyEl.addEventListener('input', update);
    freqEl.addEventListener('input', update);
    update();

    function frame() {
      ctx.clearRect(0, 0, w, h);
      const margin = 36;
      const yPwmTop = 30, yPwmBot = h * 0.55;
      const yOutTop = h * 0.55 + 10, yOutBot = h - 30;

      // axes
      ctx.strokeStyle = 'rgba(120,140,200,0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(margin, yPwmBot); ctx.lineTo(w - 10, yPwmBot);
      ctx.moveTo(margin, yOutBot); ctx.lineTo(w - 10, yOutBot);
      ctx.stroke();

      // labels
      ctx.fillStyle = '#a3a8d0';
      ctx.font = '11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('PWM (V)', 6, 22);
      ctx.fillText('V_out filtré (V)', 6, yOutTop + 12);

      // PWM signal
      phase += freq * 0.00015;
      const period = 80; // px par période
      ctx.strokeStyle = '#7b8cff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#7b8cff';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      let prevState = null;
      for (let x = margin; x <= w - 10; x++) {
        const t = ((x - margin) / period + phase) % 1;
        const high = t < (duty / 100);
        const y = high ? yPwmTop : yPwmBot;
        if (prevState === null) ctx.moveTo(x, y);
        else if (prevState !== high) {
          ctx.lineTo(x, prevState ? yPwmTop : yPwmBot);
          ctx.lineTo(x, y);
        } else ctx.lineTo(x, y);
        prevState = high;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // niveau Vin
      ctx.fillStyle = 'rgba(123,140,255,0.7)';
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('V_in', w - 14, yPwmTop - 4);

      // Vout (filtré, légère ondulation)
      const Vout = (duty / 100) * Vin;
      const yLevel = yOutBot - (Vout / Vin) * (yOutBot - yOutTop);
      ctx.strokeStyle = '#2dd4ff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#2dd4ff';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      for (let x = margin; x <= w - 10; x++) {
        const ripple = Math.sin((x - phase * 200) * 0.3) * 3;
        const y = yLevel + ripple;
        if (x === margin) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // étiquette Vout
      ctx.fillStyle = '#2dd4ff';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(Vout.toFixed(0) + ' V', w - 14, yLevel - 4);

      // ligne pointillée du niveau
      ctx.strokeStyle = 'rgba(45,212,255,0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(margin, yLevel);
      ctx.lineTo(w - 10, yLevel);
      ctx.stroke();
      ctx.setLineDash([]);

      requestAnimationFrame(frame);
    }
    frame();
  }

  // =========================================================
  // 7. TSIOLKOVSKI — comparaison Hall vs chimique
  // =========================================================
  function initTsiol() {
    const canvas = document.getElementById('tsiolCanvas');
    if (!canvas) return;
    let { ctx, w, h } = setupCanvas(canvas);

    const dvSlider = document.getElementById('dvSlider');
    const dvVal = document.getElementById('dvVal');
    const tsiolHall = document.getElementById('tsiolHall');
    const tsiolChim = document.getElementById('tsiolChim');

    function resize() {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr; canvas.height = r.height * dpr;
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(dpr, dpr);
      w = r.width; h = r.height;
    }
    window.addEventListener('resize', resize);

    let dv = 6;
    function update() {
      dv = parseFloat(dvSlider.value);
      dvVal.textContent = dv + ' km/s';

      const veHall = 2000 * 9.81;
      const veChim = 450 * 9.81;
      const ratioHall = Math.exp(dv * 1000 / veHall);
      const ratioChim = Math.exp(dv * 1000 / veChim);

      tsiolHall.innerHTML = `m₀/m_f = <strong>${ratioHall.toFixed(2)}</strong>`;
      tsiolChim.innerHTML = `m₀/m_f = <strong>${ratioChim.toFixed(2)}</strong>`;
    }
    dvSlider.addEventListener('input', update);
    update();

    function frame() {
      ctx.clearRect(0, 0, w, h);

      // axes
      const margin = 36;
      const x0 = margin, x1 = w - 16;
      const y0 = h - 30, y1 = 30;

      ctx.strokeStyle = 'rgba(120,140,200,0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x0, y0); ctx.lineTo(x1, y0);
      ctx.moveTo(x0, y0); ctx.lineTo(x0, y1);
      ctx.stroke();

      // grille
      ctx.fillStyle = '#6f7499';
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      const yMax = 8; // ratio max affiché
      for (let r = 1; r <= yMax; r++) {
        const y = y0 - (r - 1) / (yMax - 1) * (y0 - y1);
        ctx.fillText(r + 'x', x0 - 4, y + 3);
        ctx.strokeStyle = 'rgba(120,140,200,0.10)';
        ctx.beginPath();
        ctx.moveTo(x0, y); ctx.lineTo(x1, y);
        ctx.stroke();
      }
      ctx.textAlign = 'center';
      for (let v = 0; v <= 15; v += 3) {
        const x = x0 + v / 15 * (x1 - x0);
        ctx.fillText(v, x, y0 + 14);
      }
      ctx.fillText('Δv (km/s)', (x0 + x1) / 2, y0 + 26);

      // courbes
      function plot(isp, color, glow) {
        const ve = isp * 9.81;
        ctx.strokeStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = glow;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i <= 100; i++) {
          const v = (i / 100) * 15; // km/s
          const ratio = Math.exp(v * 1000 / ve);
          const x = x0 + (v / 15) * (x1 - x0);
          const y = y0 - Math.min((ratio - 1) / (yMax - 1), 1) * (y0 - y1);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      plot(450, '#f87171', 8);   // chimique
      plot(2000, '#4ade80', 8);  // Hall

      // curseur dv
      const xCur = x0 + (dv / 15) * (x1 - x0);
      ctx.strokeStyle = 'rgba(45,212,255,0.5)';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(xCur, y0); ctx.lineTo(xCur, y1);
      ctx.stroke();
      ctx.setLineDash([]);

      // points sur les courbes
      const veHall = 2000 * 9.81;
      const veChim = 450 * 9.81;
      const rH = Math.exp(dv * 1000 / veHall);
      const rC = Math.exp(dv * 1000 / veChim);
      const yH = y0 - Math.min((rH - 1) / (yMax - 1), 1) * (y0 - y1);
      const yC = y0 - Math.min((rC - 1) / (yMax - 1), 1) * (y0 - y1);

      ctx.fillStyle = '#4ade80';
      ctx.beginPath(); ctx.arc(xCur, yH, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f87171';
      ctx.beginPath(); ctx.arc(xCur, yC, 5, 0, Math.PI * 2); ctx.fill();

      // légendes
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#4ade80';
      ctx.fillText('Hall (Isp=2000s)', x0 + 8, y1 + 14);
      ctx.fillStyle = '#f87171';
      ctx.fillText('Chimique (Isp=450s)', x0 + 8, y1 + 30);

      ctx.fillStyle = '#a3a8d0';
      ctx.save();
      ctx.translate(14, (y0 + y1) / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillText('m₀ / m_f', 0, 0);
      ctx.restore();

      requestAnimationFrame(frame);
    }
    frame();
  }

  // =========================================================
  // INIT
  // =========================================================
  document.addEventListener('DOMContentLoaded', () => {
    initHero();
    initPlasma();
    initExB();
    initAccel();
    initArch();
    initPWM();
    initTsiol();

    // Highlight nav links on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header-nav a');
    function onScroll() {
      let current = '';
      sections.forEach(s => {
        const top = s.offsetTop - 120;
        if (window.scrollY >= top) current = s.id;
      });
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    }
    window.addEventListener('scroll', onScroll);
  });
})();
