/* =========================================================
   Moteurs à effet Hall — animations interactives
   Physique : équations résolues numériquement (Euler-Cromer / RK)
   ========================================================= */

(function () {
  'use strict';

  // ---------- Constantes physiques ----------
  const E_CHARGE = 1.602e-19;       // C
  const M_E      = 9.109e-31;       // kg (électron)
  const M_XE     = 2.18e-25;        // kg (xénon)
  const KB       = 1.381e-23;       // J/K
  const G0       = 9.81;            // m/s²

  // ---------- Utilitaires ----------
  function setupCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, w: rect.width, h: rect.height };
  }
  function resizeCanvas(canvas, ctx) {
    const r = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    return { w: r.width, h: r.height };
  }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function clamp(x, a, b) { return x < a ? a : (x > b ? b : x); }

  // =========================================================
  // 1. HERO — étoiles + jet de plasma sortant
  // =========================================================
  function initHero() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    let { ctx, w, h } = setupCanvas(canvas);

    const stars = Array.from({ length: 160 }, () => ({
      x: rand(0, w), y: rand(0, h),
      r: rand(0.4, 1.6),
      a: rand(0.3, 1),
      tw: rand(0.005, 0.02),
      ph: rand(0, Math.PI * 2)
    }));

    // jet d'ions partant d'un point source à gauche
    const ions = Array.from({ length: 80 }, () => ({
      x: rand(-50, w),
      y: rand(0, h),
      vx: rand(2.5, 5.5),
      vy: rand(-0.4, 0.4),
      r: rand(1, 2.4),
      hue: rand(15, 50)
    }));

    window.addEventListener('resize', () => { ({ w, h } = resizeCanvas(canvas, ctx)); });

    let t = 0;
    function frame() {
      t++;
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        const f = 0.5 + 0.5 * Math.sin(t * s.tw + s.ph);
        ctx.fillStyle = `rgba(200,220,255,${s.a * f})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      });
      ions.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x > w + 20) { p.x = -20; p.y = rand(0, h); p.vx = rand(2.5, 5.5); }
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        g.addColorStop(0, `hsla(${p.hue},100%,70%,0.9)`);
        g.addColorStop(1, `hsla(${p.hue},100%,60%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `hsla(${p.hue},100%,90%,1)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
      requestAnimationFrame(frame);
    }
    frame();
  }

  // =========================================================
  // 2. PLASMA — ionisation Xe + Xe⁺ avec champ E réel
  // Physique : électrons accélérés par E (anode→cathode),
  //   ions repoussés par anode, neutres en marche aléatoire.
  // Section efficace d'ionisation seuil ~12.13 eV (Xe).
  // =========================================================
  function initPlasma() {
    const canvas = document.getElementById('plasmaCanvas');
    if (!canvas) return;
    let { ctx, w, h } = setupCanvas(canvas);

    const energyEl = document.getElementById('plasmaEnergy');
    const resetBtn = document.getElementById('plasmaReset');

    // Unités : on travaille en pixels/frame, mais on impose la cohérence physique :
    //   la "vitesse" d'un électron représente sa racine carrée d'énergie cinétique.
    //   L'utilisateur règle l'énergie moyenne via slider.
    // Seuil d'ionisation = équivalent vitesse v_th tel que ½ m_e v_th² = 12.13 eV
    // Dans nos unités visuelles : v_th = 2.0 (par convention de l'animation)
    // énergie utilisateur = vitesse d'injection des e⁻

    let particles = [];
    let energy = 5;
    const V_THRESHOLD = 2.0; // seuil "ionisation" dans les unités visuelles

    function maxwellSpeed(vMean) {
      // tirage approximatif d'une vitesse selon Maxwell : v = vMean * sqrt(-ln(u1)*-ln(u2))
      const u1 = Math.random(), u2 = Math.random();
      return vMean * Math.sqrt(-Math.log(u1 + 1e-6) - Math.log(u2 + 1e-6)) * 0.7;
    }

    function spawn() {
      particles = [];
      for (let i = 0; i < 26; i++) {
        particles.push({
          type: 'neutral',
          x: rand(20, w - 20), y: rand(20, h - 20),
          vx: rand(-0.25, 0.25), vy: rand(-0.25, 0.25),
          r: 6
        });
      }
      for (let i = 0; i < 6; i++) {
        const a = rand(0, Math.PI * 2);
        const v = maxwellSpeed(energy * 0.6);
        particles.push({
          type: 'electron',
          x: rand(20, w - 20), y: rand(20, h - 20),
          vx: Math.cos(a) * v, vy: Math.sin(a) * v,
          r: 2.5
        });
      }
    }

    window.addEventListener('resize', () => { ({ w, h } = resizeCanvas(canvas, ctx)); });
    energyEl.addEventListener('input', e => { energy = parseFloat(e.target.value); });
    resetBtn.addEventListener('click', spawn);
    spawn();

    function frame() {
      ctx.clearRect(0, 0, w, h);

      // arrière-plan : gradient de potentiel (anode rouge à gauche, cathode verte à droite)
      const bg = ctx.createLinearGradient(0, 0, w, 0);
      bg.addColorStop(0, 'rgba(255,107,107,0.10)');
      bg.addColorStop(1, 'rgba(74,222,128,0.10)');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);

      // étiquettes anode/cathode
      ctx.font = 'bold 11px monospace';
      ctx.fillStyle = '#ff6b6b'; ctx.textAlign = 'left';
      ctx.fillText('Anode +', 8, 16);
      ctx.fillStyle = '#4ade80'; ctx.textAlign = 'right';
      ctx.fillText('Cathode −', w - 8, 16);

      // champ E (pixels) : accélération des électrons vers la gauche, des ions vers la droite
      // Force ~ proportionnelle au slider d'énergie
      const Efield = 0.012 * energy;

      particles.forEach(p => {
        if (p.type === 'electron') {
          p.vx -= Efield;            // électron accéléré vers anode (gauche)
        } else if (p.type === 'ion') {
          p.vx += Efield * 0.05;      // ion plus lourd → accélération plus faible visuellement
        } else {
          // neutres : marche aléatoire (agitation thermique)
          p.vx += rand(-0.02, 0.02);
          p.vy += rand(-0.02, 0.02);
        }
        // amortissement très léger (collisions ambiantes)
        p.vx *= 0.999; p.vy *= 0.999;
        p.x += p.vx; p.y += p.vy;

        // rebonds
        if (p.x < p.r) { p.x = p.r; p.vx = -p.vx * 0.8; }
        if (p.x > w - p.r) { p.x = w - p.r; p.vx = -Math.abs(p.vx) * 0.8; }
        if (p.y < p.r) { p.y = p.r; p.vy = -p.vy * 0.8; }
        if (p.y > h - p.r) { p.y = h - p.r; p.vy = -Math.abs(p.vy) * 0.8; }
      });

      // collisions ionisantes : électron rapide (E_c > seuil) heurte un neutre
      const newParts = [];
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        if (a.type !== 'electron') continue;
        const speed = Math.hypot(a.vx, a.vy);
        if (speed < V_THRESHOLD) continue;
        for (let j = 0; j < particles.length; j++) {
          if (i === j) continue;
          const b = particles[j];
          if (b.type !== 'neutral') continue;
          const dx = a.x - b.x, dy = a.y - b.y;
          if (dx * dx + dy * dy < 90) {
            // ionisation : le neutre devient ion, on émet un électron secondaire
            b.type = 'ion'; b.r = 5;
            // l'électron incident perd l'énergie de seuil
            const factor = Math.sqrt(Math.max(0, speed * speed - V_THRESHOLD * V_THRESHOLD)) / speed;
            a.vx *= factor; a.vy *= factor;
            // électron secondaire éjecté avec vitesse modeste
            const ang = rand(0, Math.PI * 2);
            newParts.push({
              type: 'electron',
              x: b.x, y: b.y,
              vx: Math.cos(ang) * 0.8, vy: Math.sin(ang) * 0.8,
              r: 2.5
            });
            break;
          }
        }
      }
      particles = particles.concat(newParts);
      // recombinaison aux parois (ions qui touchent les parois latérales se recombinent en neutres)
      particles.forEach(p => {
        if (p.type === 'ion' && (p.y < 8 || p.y > h - 8)) {
          p.type = 'neutral'; p.r = 6;
        }
      });
      // limiter le nombre total
      if (particles.length > 90) particles.splice(80);

      // dessin
      particles.forEach(p => {
        if (p.type === 'neutral') {
          ctx.fillStyle = 'rgba(140,148,180,0.85)';
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#fff';
          ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
          ctx.fillText('Xe', p.x, p.y + 3);
        } else if (p.type === 'ion') {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
          g.addColorStop(0, 'rgba(255,138,76,0.95)'); g.addColorStop(1, 'rgba(255,138,76,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#ff8a4c';
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#fff'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
          ctx.fillText('+', p.x, p.y + 3);
        } else {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          g.addColorStop(0, 'rgba(45,212,255,1)'); g.addColorStop(1, 'rgba(45,212,255,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#2dd4ff';
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        }
      });

      requestAnimationFrame(frame);
    }
    frame();
  }

  // =========================================================
  // 3. EFFET HALL — DÉRIVE E×B
  // Résolution exacte de m dv/dt = q(E + v × B) (Boris pusher)
  // 2D : E = (E, 0, 0), B = (0, 0, B), électron q = -e
  // Solution analytique : cycloïde de rayon r_L = m v⊥ / qB
  // dérive : v_D = E/B selon -ŷ pour notre convention
  // =========================================================
  function initExB() {
    const canvas = document.getElementById('exbCanvas');
    if (!canvas) return;
    let { ctx, w, h } = setupCanvas(canvas);

    const bSlider = document.getElementById('bSlider');
    const eSlider = document.getElementById('eSlider');
    const resetBtn = document.getElementById('exbReset');

    // Système d'unités visuelles : m = 1, q = -1 (électron), dt = 1
    // omega_c = |q|B/m = B  →  période T = 2π/B
    // r_L = v_⊥ / B   →   v_drift = E/B
    // On choisit B et E en "unités visuelles" pilotés par les sliders
    let B = 0.10;
    let E = 0.04;

    function syncSliders() {
      B = parseFloat(bSlider.value) * 0.012; // [0.012 .. 0.24]
      E = parseFloat(eSlider.value) * 0.005; // [0.005 .. 0.10]
    }
    bSlider.addEventListener('input', syncSliders);
    eSlider.addEventListener('input', syncSliders);
    syncSliders();

    let electrons = [];
    function spawn() {
      electrons = [];
      for (let i = 0; i < 4; i++) {
        electrons.push({
          x: rand(60, w - 60),
          y: rand(60, h - 60),
          vx: rand(-0.3, 0.3),
          vy: rand(-0.3, 0.3),
          trail: []
        });
      }
    }
    resetBtn.addEventListener('click', spawn);
    window.addEventListener('resize', () => { ({ w, h } = resizeCanvas(canvas, ctx)); });
    spawn();

    function frame() {
      // léger fond persistant (effet "phosphore")
      ctx.fillStyle = 'rgba(6, 8, 18, 0.18)';
      ctx.fillRect(0, 0, w, h);

      // grille de E (flèches horizontales →)
      ctx.strokeStyle = 'rgba(74,222,128,0.20)';
      ctx.fillStyle = 'rgba(74,222,128,0.4)';
      ctx.lineWidth = 1;
      for (let y = 30; y < h - 10; y += 36) {
        ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(w - 20, y); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(w - 20, y); ctx.lineTo(w - 26, y - 3); ctx.lineTo(w - 26, y + 3);
        ctx.closePath(); ctx.fill();
      }
      ctx.fillStyle = 'rgba(74,222,128,0.85)';
      ctx.font = 'bold 12px monospace'; ctx.textAlign = 'left';
      ctx.fillText('E →', 10, 18);

      // grille de B (points sortants ⊙)
      ctx.strokeStyle = 'rgba(251,191,36,0.55)';
      ctx.fillStyle = 'rgba(251,191,36,0.9)';
      for (let x = 50; x < w - 30; x += 70) {
        for (let y = 50; y < h - 20; y += 60) {
          ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.font = 'bold 12px monospace'; ctx.textAlign = 'right';
      ctx.fillText('B ⊙', w - 10, 18);

      // Boris-style integrator (sans demi-pas, suffisant pour la visu)
      // a = (q/m)(E + v×B) avec q/m = -1
      // 2D : v×B = (vy, -vx, 0)·B  (B selon ẑ)
      // donc dvx = -E - vy*B  ; dvy = + vx*B  (le signe " - " sur E vient de q=-1)
      electrons.forEach(p => {
        const sub = 4; // sous-itérations pour stabilité
        const dt = 1 / sub;
        for (let s = 0; s < sub; s++) {
          const ax = -E - p.vy * B;     // accélération sur électron
          const ay =  p.vx * B;
          p.vx += ax * dt;
          p.vy += ay * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
        }
        // trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 250) p.trail.shift();

        // rebond doux (l'électron resterait piégé sinon)
        if (p.x < 5)     { p.x = 5;     p.vx = Math.abs(p.vx); }
        if (p.x > w - 5) { p.x = w - 5; p.vx = -Math.abs(p.vx); }
        if (p.y < 5)     { p.y = 5;     p.vy = Math.abs(p.vy); }
        if (p.y > h - 5) { p.y = h - 5; p.vy = -Math.abs(p.vy); }
      });

      // dessin trails (cycloïdes)
      electrons.forEach(p => {
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        for (let i = 0; i < p.trail.length; i++) {
          const t = p.trail[i];
          const alpha = i / p.trail.length;
          ctx.strokeStyle = `rgba(45,212,255,${0.15 + alpha * 0.5})`;
          if (i === 0) ctx.moveTo(t.x, t.y);
          else {
            ctx.lineTo(t.x, t.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(t.x, t.y);
          }
        }
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 12);
        g.addColorStop(0, 'rgba(45,212,255,1)');
        g.addColorStop(1, 'rgba(45,212,255,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, 12, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#2dd4ff';
        ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill();
      });

      // indicateur de vitesse de dérive (flèche violette)
      // Pour notre convention (q=-1, E=+x, B=+z), la dérive E×B/B² = (E/B) (-ŷ)
      // avec notre intégration, l'électron dérive vers le bas → on dessine flèche ↓ taille ∝ E/B
      const dirSign = -1; // descendant
      const drift = clamp(E / Math.max(B, 0.001), 0, 5);
      ctx.save();
      ctx.translate(w - 50, h / 2);
      ctx.strokeStyle = '#c66bff';
      ctx.fillStyle = '#c66bff';
      ctx.lineWidth = 2.5;
      const len = 15 + drift * 8;
      ctx.beginPath();
      ctx.moveTo(0, -len * dirSign);
      ctx.lineTo(0, len * dirSign);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, len * dirSign);
      ctx.lineTo(-5, len * dirSign - 6 * dirSign);
      ctx.lineTo(5, len * dirSign - 6 * dirSign);
      ctx.closePath(); ctx.fill();
      ctx.font = 'bold 11px monospace'; ctx.textAlign = 'left';
      ctx.fillText('v_D = E/B', 10, 4);
      ctx.restore();

      // affichage du rayon de Larmor théorique
      ctx.fillStyle = 'rgba(230,232,255,0.9)';
      ctx.font = '11px monospace'; ctx.textAlign = 'left';
      const rL = electrons[0] ? Math.hypot(electrons[0].vx, electrons[0].vy) / Math.max(B, 0.001) : 0;
      ctx.fillText(`r_L = v⊥/B ≈ ${rL.toFixed(1)} px`, 10, h - 24);
      ctx.fillText(`v_D = E/B ≈ ${(E / Math.max(B,0.001)).toFixed(2)}`, 10, h - 8);

      requestAnimationFrame(frame);
    }
    frame();
  }

  // =========================================================
  // 4. ACCÉLÉRATION — coupe du propulseur Hall
  //    + ions accélérés par champ E réel (intégration RK)
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

    let Ud = 300, mdot = 5;
    let ions = [];
    let electrons = [];     // électrons piégés (drift azimutal visualisé verticalement)
    let neutrals = [];

    function spawnNeutral() {
      neutrals.push({
        x: 50, y: rand(70, h - 70),
        vx: rand(0.3, 0.6), vy: rand(-0.1, 0.1)
      });
    }
    function spawnElectron() {
      // électron piégé dans la zone du champ B (au milieu du canal)
      electrons.push({
        x: rand(w * 0.4, w * 0.55),
        y: rand(60, h - 60),
        vx: rand(-0.5, 0.5),
        vy: rand(-0.5, 0.5),
        life: 600
      });
    }

    window.addEventListener('resize', () => { ({ w, h } = resizeCanvas(canvas, ctx)); });

    function update() {
      Ud = parseFloat(ud.value);
      mdot = parseFloat(md.value);
      udVal.textContent = Ud + ' V';
      mdVal.textContent = mdot + ' mg/s';

      // physique réelle
      const ve = Math.sqrt(2 * E_CHARGE * Ud / M_XE);   // m/s
      const F  = (mdot * 1e-6) * ve;                     // N
      const Isp = ve / G0;                               // s
      const Pjet = 0.5 * (mdot * 1e-6) * ve * ve;        // W

      resVe.textContent  = Math.round(ve).toLocaleString('fr-FR') + ' m/s';
      resF.textContent   = (F * 1000).toFixed(1) + ' mN';
      resIsp.textContent = Math.round(Isp) + ' s';
      resP.textContent   = (Pjet / 1000).toFixed(2) + ' kW';
    }
    ud.addEventListener('input', update);
    md.addEventListener('input', update);
    update();

    let neutralTimer = 0;
    let electronTimer = 0;

    function frame() {
      ctx.clearRect(0, 0, w, h);

      // --- coupe schématique du propulseur ---
      const cx0 = 30, cx1 = w * 0.78;          // canal annulaire (vue 2D = coupe radiale)
      const cy0 = 40, cy1 = h - 40;
      const accelStart = w * 0.50;             // début zone d'accélération
      const channelMid = (cy0 + cy1) / 2;

      // gradient de potentiel : anode (rouge, +Ud) → sortie (vert, 0V)
      const grad = ctx.createLinearGradient(cx0, 0, cx1, 0);
      grad.addColorStop(0, 'rgba(255,107,107,0.18)');
      grad.addColorStop(0.5, 'rgba(255,138,76,0.12)');
      grad.addColorStop(1, 'rgba(74,222,128,0.05)');
      ctx.fillStyle = grad;
      ctx.fillRect(cx0, cy0, cx1 - cx0, cy1 - cy0);

      // murs en céramique
      ctx.fillStyle = 'rgba(180,180,210,0.10)';
      ctx.fillRect(cx0, cy0 - 8, cx1 - cx0, 8);
      ctx.fillRect(cx0, cy1, cx1 - cx0, 8);
      ctx.strokeStyle = 'rgba(180,180,210,0.6)';
      ctx.strokeRect(cx0, cy0, cx1 - cx0, cy1 - cy0);

      // anode (gauche)
      ctx.fillStyle = '#ff6b6b';
      ctx.fillRect(cx0 - 6, cy0, 6, cy1 - cy0);

      // bobines magnétiques (symbolisées par croix B sortant)
      ctx.fillStyle = 'rgba(251,191,36,0.7)';
      ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center';
      for (let i = 0; i < 3; i++) {
        const x = w * 0.40 + i * 16;
        ctx.fillText('⊗', x, cy0 + 16);
        ctx.fillText('⊗', x, cy1 - 6);
      }

      // courbe gaussienne du champ B (radial, max au milieu de l'anneau)
      ctx.strokeStyle = 'rgba(251,191,36,0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const yB = cy1 - 10;
      const N = 80;
      for (let i = 0; i <= N; i++) {
        const x = cx0 + (i / N) * (cx1 - cx0);
        // gaussienne centrée près de la sortie
        const xn = (x - w * 0.45) / 50;
        const Bmag = Math.exp(-xn * xn) * 22;
        const y = yB - Bmag;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = 'rgba(251,191,36,0.7)';
      ctx.font = '10px monospace'; ctx.textAlign = 'left';
      ctx.fillText('B(x)', w * 0.45 - 20, cy1 - 28);

      // courbe potentiel V(x) : marche de l'anode à 0
      ctx.strokeStyle = 'rgba(123,140,255,0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const yVtop = cy0 + 10;
      const yVbot = cy0 + 36;
      for (let i = 0; i <= N; i++) {
        const t = i / N;
        // sigmoïde inversée centrée vers la zone d'accélération
        const xPhys = t;
        const xc = (xPhys - 0.55) * 12;
        const V = 1 / (1 + Math.exp(xc));   // 1→0
        const y = yVbot - V * (yVbot - yVtop);
        const x = cx0 + t * (cx1 - cx0);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = 'rgba(123,140,255,0.85)'; ctx.font = '10px monospace';
      ctx.fillText('V(x) = U_d → 0', cx0 + 4, yVtop - 4);

      // étiquettes
      ctx.fillStyle = '#ff6b6b'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText('Anode +', cx0 + 2, cy0 - 14);
      ctx.fillStyle = '#4ade80'; ctx.textAlign = 'right';
      ctx.fillText('Sortie (cathode externe −)', cx1 - 2, cy0 - 14);

      // --- spawn ---
      neutralTimer++;
      if (neutralTimer > Math.max(2, 12 - mdot)) { spawnNeutral(); neutralTimer = 0; }
      electronTimer++;
      if (electronTimer > 30) { spawnElectron(); electronTimer = 0; }

      // --- neutres (poussés depuis l'anode) ---
      neutrals = neutrals.filter(p => p.x < cx1 - 5);
      neutrals.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        ctx.fillStyle = 'rgba(140,148,180,0.7)';
        ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill();
      });

      // --- ionisation : un neutre dans la zone B peut être ionisé ---
      neutrals.forEach((n, i) => {
        if (n.x > w * 0.40 && n.x < w * 0.55 && Math.random() < 0.06) {
          ions.push({ x: n.x, y: n.y, vx: n.vx, vy: n.vy });
          neutrals.splice(i, 1);
        }
      });

      // --- ions : intégration F = qE(x), E ∝ -dV/dx ---
      // Profil E(x) = sigmoïde dérivée
      function eFieldNorm(x) {
        const t = (x - cx0) / (cx1 - cx0);
        const xc = (t - 0.55) * 12;
        const s = 1 / (1 + Math.exp(xc));
        return s * (1 - s) * 12; // dérivée de la sigmoïde, normalisée
      }
      const accel = 0.0008 * Ud;  // facteur visuel proportionnel à Ud

      ions = ions.filter(p => p.x < w + 50 && p.y > cy0 - 5 && p.y < cy1 + 5);
      ions.forEach(p => {
        const ax = accel * eFieldNorm(p.x);
        p.vx += ax;
        p.vx = Math.min(p.vx, 12);  // saturation visuelle
        p.x += p.vx; p.y += p.vy;

        // halo
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 14);
        g.addColorStop(0, 'rgba(255,138,76,0.85)');
        g.addColorStop(1, 'rgba(255,138,76,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, 14, 0, Math.PI * 2); ctx.fill();
        // traînée
        const tail = clamp(p.vx * 8, 4, 50);
        ctx.strokeStyle = 'rgba(255,138,76,0.55)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(Math.max(p.x - tail, cx0), p.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.fillStyle = '#ff8a4c';
        ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill();
      });

      // --- électrons piégés (zone B) : trajectoires cycloïdales ---
      // E ↔ champ axial local, B ↔ vertical (perpendiculaire écran), drift azimutal
      electrons = electrons.filter(p => p.life > 0);
      electrons.forEach(p => {
        const inB = p.x > w * 0.38 && p.x < w * 0.58;
        const Bloc = inB ? 0.18 : 0.02;
        const Eloc = inB ? 0.04 : 0.005;
        // Boris simplifié : dvx = -Eloc - vy*Bloc, dvy = vx*Bloc
        for (let k = 0; k < 3; k++) {
          const ax = -Eloc - p.vy * Bloc;
          const ay =  p.vx * Bloc;
          p.vx += ax * 0.5; p.vy += ay * 0.5;
          p.x += p.vx * 0.5; p.y += p.vy * 0.5;
        }
        // confinement dans la zone B
        if (p.x < w * 0.38) p.vx = Math.abs(p.vx) * 0.5;
        if (p.x > w * 0.60) p.vx = -Math.abs(p.vx) * 0.5;
        if (p.y < cy0) p.vy = Math.abs(p.vy);
        if (p.y > cy1) p.vy = -Math.abs(p.vy);
        p.life--;

        ctx.fillStyle = 'rgba(45,212,255,0.9)';
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2); ctx.fill();
      });

      // --- jet sortant (au-delà du canal) ---
      ions.forEach(p => {
        if (p.x > cx1) {
          // petit divergence
          p.y += rand(-0.15, 0.15);
        }
      });

      // bandeau sortie
      ctx.strokeStyle = 'rgba(74,222,128,0.4)';
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(cx1, cy0); ctx.lineTo(cx1, cy1); ctx.stroke();
      ctx.setLineDash([]);

      // étiquette tension
      ctx.fillStyle = '#e6e8ff'; ctx.font = 'bold 12px monospace'; ctx.textAlign = 'left';
      ctx.fillText('U_d = ' + Ud + ' V', 8, h - 8);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#a3a8d0';
      ctx.fillText('ṁ = ' + mdot + ' mg/s', w - 8, h - 8);

      requestAnimationFrame(frame);
    }
    frame();
  }

  // =========================================================
  // 5. ARCHITECTURE — diagramme SVG (inchangé fonctionnellement)
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
          <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        <g transform="translate(20,140)">
          <rect width="120" height="100" rx="10" fill="url(#boxG)" stroke="rgba(123,140,255,0.5)"/>
          <text x="60" y="36" text-anchor="middle" fill="#e6e8ff" font-size="13" font-weight="600">☀️ Panneaux</text>
          <text x="60" y="56" text-anchor="middle" fill="#e6e8ff" font-size="13" font-weight="600">solaires</text>
          <text x="60" y="80" text-anchor="middle" fill="#a3a8d0" font-size="11">~100 V DC</text>
        </g>
        <g transform="translate(200,160)">
          <rect width="100" height="60" rx="8" fill="rgba(20,24,56,0.8)" stroke="rgba(123,140,255,0.5)"/>
          <text x="50" y="28" text-anchor="middle" fill="#e6e8ff" font-size="12" font-weight="600">Bus DC</text>
          <text x="50" y="46" text-anchor="middle" fill="#a3a8d0" font-size="11">28/100 V</text>
        </g>
        <g transform="translate(360,130)">
          <rect width="160" height="120" rx="14" fill="url(#ppuG)" stroke="white" stroke-width="1" filter="url(#glow)"/>
          <text x="80" y="40" text-anchor="middle" fill="white" font-size="16" font-weight="700">PPU</text>
          <text x="80" y="60" text-anchor="middle" fill="white" font-size="10" opacity="0.85">Power Processing Unit</text>
          <line x1="20" y1="80" x2="140" y2="80" stroke="rgba(255,255,255,0.3)"/>
          <text x="80" y="98" text-anchor="middle" fill="white" font-size="11">• Buck • Boost</text>
          <text x="80" y="112" text-anchor="middle" fill="white" font-size="11">• Full-bridge isolé</text>
        </g>

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

        <g stroke="#7b8cff" stroke-width="2" fill="none" marker-end="url(#arr)">
          <path d="M 140,190 L 200,190" />
          <path d="M 300,190 L 360,190" />
          <path d="M 520,190 L 580,60" />
          <path d="M 520,190 L 580,140" />
          <path d="M 520,190 L 580,220" />
          <path d="M 520,190 L 580,300" />
        </g>

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
  // 6. PWM / BUCK — vrai modèle
  //    - signal MOSFET (PWM)
  //    - courant inductance (rampe triangulaire)
  //    - tension condensateur (ondulation triangulaire intégrée du courant - charge)
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
    const Vin = 100;
    let phase = 0;

    window.addEventListener('resize', () => { ({ w, h } = resizeCanvas(canvas, ctx)); });

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
      const margin = 44;
      // 3 zones : PWM, courant L, tension Vout
      const Hzone = (h - 30) / 3;
      const yPwmTop = 16, yPwmBot = yPwmTop + Hzone - 12;
      const yIlTop  = yPwmBot + 12, yIlBot = yIlTop + Hzone - 12;
      const yVoTop  = yIlBot + 12, yVoBot = yVoTop + Hzone - 12;

      // axes
      ctx.strokeStyle = 'rgba(120,140,200,0.3)';
      ctx.lineWidth = 1;
      [yPwmBot, yIlBot, yVoBot].forEach(y => {
        ctx.beginPath(); ctx.moveTo(margin, y); ctx.lineTo(w - 8, y); ctx.stroke();
      });

      // labels
      ctx.fillStyle = '#a3a8d0'; ctx.font = '11px monospace'; ctx.textAlign = 'left';
      ctx.fillText('V_GS (PWM)', 6, yPwmTop + 12);
      ctx.fillText('I_L (A)', 6, yIlTop + 12);
      ctx.fillText('V_out (V)', 6, yVoTop + 12);

      // déplacement de phase (vitesse perçue dépend de freq)
      phase += freq * 0.00012;

      // période en pixels (varie inversement avec freq pour que ça reste lisible)
      const period = clamp(8000 / freq, 30, 200);
      const cycles = (w - margin - 10) / period;
      const Vout = (duty / 100) * Vin;

      // ---- PWM ----
      ctx.strokeStyle = '#7b8cff'; ctx.lineWidth = 2;
      ctx.shadowColor = '#7b8cff'; ctx.shadowBlur = 8;
      ctx.beginPath();
      let prevHigh = null;
      for (let x = margin; x <= w - 8; x++) {
        const t = ((x - margin) / period + phase) % 1;
        const high = t < (duty / 100);
        const y = high ? yPwmTop + 4 : yPwmBot;
        if (prevHigh === null) ctx.moveTo(x, y);
        else if (prevHigh !== high) {
          ctx.lineTo(x, prevHigh ? yPwmTop + 4 : yPwmBot);
          ctx.lineTo(x, y);
        } else ctx.lineTo(x, y);
        prevHigh = high;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // ---- courant inductance I_L ----
      // di/dt = (Vin - Vout)/L  pendant ON ; di/dt = -Vout/L pendant OFF
      // On normalise pour rester lisible : amplitude ondulation ∝ duty*(1-duty)/freq
      const ILavg = 0.6;          // courant moyen normalisé
      const ripple = (duty / 100) * (1 - duty / 100) * (160 / freq) * 1.0;
      // amplitude visuelle
      const ilCenter = (yIlTop + yIlBot) / 2 + 18;
      const ilScale = (yIlBot - yIlTop) / 2 - 6;
      ctx.strokeStyle = '#ff8a4c'; ctx.lineWidth = 2;
      ctx.shadowColor = '#ff8a4c'; ctx.shadowBlur = 8;
      ctx.beginPath();
      for (let x = margin; x <= w - 8; x++) {
        const t = ((x - margin) / period + phase) % 1;
        // triangle : monte pendant ON [0, α], descend pendant OFF [α, 1]
        let val;
        if (t < duty / 100) val = -1 + 2 * (t / (duty / 100));     // de -1 à +1
        else                val = 1 - 2 * ((t - duty / 100) / (1 - duty / 100));
        const il = ILavg + val * ripple * 0.5;
        const y = ilCenter - il * ilScale;
        if (x === margin) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      // ligne moyenne
      ctx.strokeStyle = 'rgba(255,138,76,0.3)';
      ctx.lineWidth = 1; ctx.setLineDash([3,3]);
      ctx.beginPath();
      const yIavg = ilCenter - ILavg * ilScale;
      ctx.moveTo(margin, yIavg); ctx.lineTo(w - 8, yIavg);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,138,76,0.85)';
      ctx.font = '10px monospace'; ctx.textAlign = 'right';
      ctx.fillText('<I_L>', w - 12, yIavg - 4);

      // ---- tension de sortie (Vout) avec petite ondulation triangulaire ----
      const yVlevel = yVoBot - (Vout / Vin) * (yVoBot - yVoTop - 6);
      const vRipple = ripple * 1.5;
      ctx.strokeStyle = '#2dd4ff'; ctx.lineWidth = 2;
      ctx.shadowColor = '#2dd4ff'; ctx.shadowBlur = 8;
      ctx.beginPath();
      for (let x = margin; x <= w - 8; x++) {
        const t = ((x - margin) / period + phase) % 1;
        // intégrale du courant inductance → ondulation parabolique -> on simplifie en triangle inversé
        let val;
        if (t < duty / 100) val = (t / (duty / 100));         // monte
        else                val = 1 - (t - duty / 100) / (1 - duty / 100);
        const y = yVlevel - (val - 0.5) * vRipple;
        if (x === margin) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      // étiquette Vout
      ctx.fillStyle = '#2dd4ff'; ctx.font = 'bold 12px monospace'; ctx.textAlign = 'right';
      ctx.fillText(Vout.toFixed(0) + ' V', w - 12, yVlevel - 4);

      // niveau Vin (pointillé) sur PWM
      ctx.strokeStyle = 'rgba(123,140,255,0.35)';
      ctx.lineWidth = 1; ctx.setLineDash([3,3]);
      ctx.beginPath();
      ctx.moveTo(margin, yPwmTop + 4); ctx.lineTo(w - 8, yPwmTop + 4);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(123,140,255,0.7)'; ctx.textAlign = 'right'; ctx.font = '10px monospace';
      ctx.fillText('V_in', w - 12, yPwmTop + 14);

      // axes verticaux légers
      ctx.strokeStyle = 'rgba(120,140,200,0.2)';
      ctx.beginPath();
      ctx.moveTo(margin, yPwmTop); ctx.lineTo(margin, yVoBot);
      ctx.stroke();

      requestAnimationFrame(frame);
    }
    frame();
  }

  // =========================================================
  // 7. TSIOLKOVSKI — courbes Hall vs chimique
  // =========================================================
  function initTsiol() {
    const canvas = document.getElementById('tsiolCanvas');
    if (!canvas) return;
    let { ctx, w, h } = setupCanvas(canvas);

    const dvSlider = document.getElementById('dvSlider');
    const dvVal = document.getElementById('dvVal');
    const tsiolHall = document.getElementById('tsiolHall');
    const tsiolChim = document.getElementById('tsiolChim');

    window.addEventListener('resize', () => { ({ w, h } = resizeCanvas(canvas, ctx)); });

    let dv = 6;
    function update() {
      dv = parseFloat(dvSlider.value);
      dvVal.textContent = dv + ' km/s';
      const veHall = 2000 * G0;
      const veChim = 450 * G0;
      const rH = Math.exp(dv * 1000 / veHall);
      const rC = Math.exp(dv * 1000 / veChim);
      tsiolHall.innerHTML = `m₀/m_f = <strong>${rH.toFixed(2)}</strong>`;
      tsiolChim.innerHTML = `m₀/m_f = <strong>${rC.toFixed(2)}</strong>`;
    }
    dvSlider.addEventListener('input', update);
    update();

    function frame() {
      ctx.clearRect(0, 0, w, h);
      const margin = 36;
      const x0 = margin, x1 = w - 16;
      const y0 = h - 32, y1 = 30;
      const yMax = 8;

      ctx.strokeStyle = 'rgba(120,140,200,0.25)'; ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x0, y0); ctx.lineTo(x1, y0);
      ctx.moveTo(x0, y0); ctx.lineTo(x0, y1);
      ctx.stroke();

      ctx.fillStyle = '#6f7499'; ctx.font = '10px monospace'; ctx.textAlign = 'right';
      for (let r = 1; r <= yMax; r++) {
        const y = y0 - (r - 1) / (yMax - 1) * (y0 - y1);
        ctx.fillText(r + 'x', x0 - 4, y + 3);
        ctx.strokeStyle = 'rgba(120,140,200,0.10)';
        ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
      }
      ctx.textAlign = 'center';
      for (let v = 0; v <= 15; v += 3) {
        const x = x0 + v / 15 * (x1 - x0);
        ctx.fillText(v, x, y0 + 14);
      }
      ctx.fillText('Δv (km/s)', (x0 + x1) / 2, y0 + 26);

      function plot(isp, color) {
        const ve = isp * G0;
        ctx.strokeStyle = color; ctx.shadowColor = color; ctx.shadowBlur = 8;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i <= 100; i++) {
          const v = (i / 100) * 15;
          const ratio = Math.exp(v * 1000 / ve);
          const x = x0 + (v / 15) * (x1 - x0);
          const y = y0 - Math.min((ratio - 1) / (yMax - 1), 1) * (y0 - y1);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke(); ctx.shadowBlur = 0;
      }
      plot(450, '#f87171');
      plot(2000, '#4ade80');

      const xCur = x0 + (dv / 15) * (x1 - x0);
      ctx.strokeStyle = 'rgba(45,212,255,0.5)'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(xCur, y0); ctx.lineTo(xCur, y1); ctx.stroke();
      ctx.setLineDash([]);

      const veHall = 2000 * G0, veChim = 450 * G0;
      const rH = Math.exp(dv * 1000 / veHall), rC = Math.exp(dv * 1000 / veChim);
      const yH = y0 - Math.min((rH - 1) / (yMax - 1), 1) * (y0 - y1);
      const yC = y0 - Math.min((rC - 1) / (yMax - 1), 1) * (y0 - y1);
      ctx.fillStyle = '#4ade80';
      ctx.beginPath(); ctx.arc(xCur, yH, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f87171';
      ctx.beginPath(); ctx.arc(xCur, yC, 5, 0, Math.PI * 2); ctx.fill();

      ctx.font = 'bold 11px monospace'; ctx.textAlign = 'left';
      ctx.fillStyle = '#4ade80'; ctx.fillText('Hall (Isp=2000s)', x0 + 8, y1 + 14);
      ctx.fillStyle = '#f87171'; ctx.fillText('Chimique (Isp=450s)', x0 + 8, y1 + 30);

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
  // MODE PRÉSENTATION (plein écran + nav clavier type PPTX)
  // =========================================================
  function initPresentationMode() {
    const presentBtn   = document.getElementById('presentBtn');
    const slideCounter = document.getElementById('slideCounter');
    if (!presentBtn || !slideCounter) return;

    // Liste ordonnée des slides (hero + sections + conclusion), ordre du DOM.
    const slides = Array.from(
      document.querySelectorAll('.hero, section.section, section.section-conclusion')
    ).filter((el, i, arr) => arr.indexOf(el) === i);

    function isPresentationMode() {
      return document.body.classList.contains('presentation-mode');
    }

    function currentIndex() {
      const probe = window.scrollY + window.innerHeight / 3;
      let idx = 0;
      for (let i = 0; i < slides.length; i++) {
        if (slides[i].offsetTop <= probe) idx = i;
      }
      return idx;
    }

    function goTo(i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      slides[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function updateCounter() {
      slideCounter.textContent = `${currentIndex() + 1} / ${slides.length}`;
    }

    // --- Toggle plein écran ---
    presentBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.warn('Fullscreen refusé :', err);
          // fallback : activer le mode présentation sans plein écran
          enterPresentation();
        });
      } else {
        document.exitFullscreen();
      }
    });

    function enterPresentation() {
      document.body.classList.add('presentation-mode');
      document.documentElement.classList.add('presentation-mode');
      slideCounter.hidden = false;
      updateCounter();
      // re-trigger les resize handlers des canvases
      window.dispatchEvent(new Event('resize'));
    }
    function exitPresentation() {
      document.body.classList.remove('presentation-mode');
      document.documentElement.classList.remove('presentation-mode');
      slideCounter.hidden = true;
      window.dispatchEvent(new Event('resize'));
    }

    // --- Sync mode présentation avec l'état fullscreen ---
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) enterPresentation();
      else exitPresentation();
    });

    // --- Navigation clavier (type télécommande PPTX) ---
    document.addEventListener('keydown', (e) => {
      if (!isPresentationMode()) return;
      // Ignorer si l'utilisateur tape dans un input
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      const k = e.key;
      if (k === 'PageDown' || k === 'ArrowDown' || k === 'ArrowRight' || k === ' ' || k === 'Spacebar') {
        e.preventDefault();
        goTo(currentIndex() + 1);
      } else if (k === 'PageUp' || k === 'ArrowUp' || k === 'ArrowLeft') {
        e.preventDefault();
        goTo(currentIndex() - 1);
      } else if (k === 'Home') {
        e.preventDefault();
        goTo(0);
      } else if (k === 'End') {
        e.preventDefault();
        goTo(slides.length - 1);
      }
      // Esc : géré nativement par le navigateur (sortie fullscreen → fullscreenchange)
    });

    // --- Mise à jour du compteur au scroll ---
    window.addEventListener('scroll', () => {
      if (isPresentationMode()) updateCounter();
    }, { passive: true });
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
    initPresentationMode();

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
