/* cloud.js — 3D Neural Network / ML Background Animation */
(function () {
  const canvas = document.getElementById('bgc');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initNetwork(); });

  /* ════════════════════════════════════════
     3D PROJECTION HELPERS
  ════════════════════════════════════════ */
  const CAM_Z = 900;
  function project(x, y, z) {
    const scale = CAM_Z / (CAM_Z + z);
    return {
      sx: W / 2 + x * scale,
      sy: H / 2 + y * scale,
      scale
    };
  }

  /* ════════════════════════════════════════
     ROTATION STATE — slow auto-rotate
  ════════════════════════════════════════ */
  let rotX = 0, rotY = 0;
  const rotSpeedX = 0.0008;
  const rotSpeedY = 0.0013;

  function rotatePoint(x, y, z) {
    /* Rotate around Y axis */
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    let x1 = x * cosY - z * sinY;
    let z1 = x * sinY + z * cosY;
    /* Rotate around X axis */
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    let y1 = y * cosX - z1 * sinX;
    let z2 = y * sinX + z1 * cosX;
    return { x: x1, y: y1, z: z2 };
  }

  /* ════════════════════════════════════════
     NEURAL NETWORK NODES
  ════════════════════════════════════════ */
  const LAYERS = [4, 7, 9, 9, 7, 4];  /* neurons per layer */
  const LAYER_GAP = 160;
  const NODE_GAP  = 70;
  let nodes = [];
  let edges = [];

  /* Floating ambient particles */
  const PARTICLE_COUNT = 120;
  let particles = [];

  /* Data pulse signals traveling along edges */
  let pulses = [];

  function initNetwork() {
    nodes = [];
    edges = [];
    particles = [];
    pulses = [];

    const totalLayers = LAYERS.length;
    const totalWidth  = (totalLayers - 1) * LAYER_GAP;

    LAYERS.forEach((count, li) => {
      const lx = li * LAYER_GAP - totalWidth / 2;
      const totalH = (count - 1) * NODE_GAP;

      for (let ni = 0; ni < count; ni++) {
        const ny = ni * NODE_GAP - totalH / 2;
        /* slight Z depth variation per layer for 3D feel */
        const nz = (Math.sin(li * 1.3) * 80) + (Math.random() - 0.5) * 40;
        nodes.push({
          x: lx, y: ny, z: nz,
          layer: li, idx: ni,
          /* activation pulse brightness */
          activation: Math.random(),
          activationSpeed: 0.004 + Math.random() * 0.012,
          activationPhase: Math.random() * Math.PI * 2,
          r: 3.5 + Math.random() * 2.5,
        });
      }
    });

    /* Connect every node to every node in the next layer */
    let layerStart = 0;
    LAYERS.forEach((count, li) => {
      if (li < LAYERS.length - 1) {
        const nextStart = layerStart + count;
        const nextCount = LAYERS[li + 1];
        for (let i = layerStart; i < layerStart + count; i++) {
          for (let j = nextStart; j < nextStart + nextCount; j++) {
            edges.push({
              a: i, b: j,
              weight: Math.random(),   /* visual thickness */
              opacity: 0.04 + Math.random() * 0.10,
            });
          }
        }
      }
      layerStart += count;
    });

    /* Ambient floating particles */
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 900,
        y: (Math.random() - 0.5) * 700,
        z: (Math.random() - 0.5) * 600,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        vz: (Math.random() - 0.5) * 0.25,
        r:  0.6 + Math.random() * 1.4,
        alpha: 0.15 + Math.random() * 0.35,
        color: Math.random() > 0.6 ? 'accent2' : 'accent',
      });
    }

    /* Seed some initial pulses */
    for (let i = 0; i < 8; i++) {
      spawnPulse();
    }
  }

  function spawnPulse() {
    if (edges.length === 0) return;
    const edge = edges[Math.floor(Math.random() * edges.length)];
    pulses.push({
      edge,
      t: Math.random(),          /* 0→1 position along edge */
      speed: 0.004 + Math.random() * 0.008,
      r: 2 + Math.random() * 2,
      color: Math.random() > 0.5 ? '#60a5fa' : '#a78bfa',
      trail: [],
      trailLen: 8,
    });
  }

  initNetwork();

  /* Spawn pulses periodically */
  setInterval(() => {
    if (pulses.length < 60) spawnPulse();
  }, 120);

  /* ════════════════════════════════════════
     DRAW HELPERS
  ════════════════════════════════════════ */
  function drawGlowDot(sx, sy, r, color, alpha, scale) {
    /* outer glow */
    const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 3.5 * scale);
    g.addColorStop(0,   color.replace(')', `,${alpha * 0.9})`).replace('rgb','rgba'));
    g.addColorStop(0.35, color.replace(')', `,${alpha * 0.4})`).replace('rgb','rgba'));
    g.addColorStop(1,   color.replace(')', ',0)').replace('rgb','rgba'));
    ctx.beginPath();
    ctx.arc(sx, sy, r * 3.5 * scale, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();

    /* core */
    ctx.beginPath();
    ctx.arc(sx, sy, r * scale, 0, Math.PI * 2);
    ctx.fillStyle = color.replace(')', `,${alpha})`).replace('rgb','rgba');
    ctx.fill();
  }

  /* ════════════════════════════════════════
     MAIN LOOP
  ════════════════════════════════════════ */
  let frame = 0;

  function tick() {
    frame++;
    ctx.clearRect(0, 0, W, H);

    /* Subtle dark vignette */
    const vig = ctx.createRadialGradient(W/2, H/2, H*0.05, W/2, H/2, H*0.9);
    vig.addColorStop(0, 'rgba(4,6,15,0)');
    vig.addColorStop(1, 'rgba(4,6,15,0.7)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    /* Auto rotate */
    rotX += rotSpeedX;
    rotY += rotSpeedY;

    /* ── PROJECT ALL NODES ── */
    const projected = nodes.map(n => {
      const r = rotatePoint(n.x, n.y, n.z);
      return project(r.x, r.y, r.z);
    });

    /* ── DRAW EDGES ── */
    edges.forEach(e => {
      const pa = projected[e.a], pb = projected[e.b];
      const na = nodes[e.a],     nb = nodes[e.b];

      /* depth-based opacity */
      const avgZ = (rotatePoint(na.x,na.y,na.z).z + rotatePoint(nb.x,nb.y,nb.z).z) / 2;
      const depthFade = Math.max(0, (600 + avgZ) / 1200);
      const op = e.opacity * depthFade;

      ctx.beginPath();
      ctx.moveTo(pa.sx, pa.sy);
      ctx.lineTo(pb.sx, pb.sy);

      /* subtle gradient edge */
      const grad = ctx.createLinearGradient(pa.sx, pa.sy, pb.sx, pb.sy);
      grad.addColorStop(0,   `rgba(96,165,250,${op})`);
      grad.addColorStop(0.5, `rgba(167,139,250,${op * 1.3})`);
      grad.addColorStop(1,   `rgba(96,165,250,${op})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = e.weight * 0.8 * Math.min(pa.scale, pb.scale);
      ctx.stroke();
    });

    /* ── DRAW PULSES (data signals) ── */
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.t += p.speed;

      if (p.t > 1) {
        /* When pulse reaches end node, maybe spawn a new one from there */
        pulses.splice(i, 1);
        if (Math.random() > 0.3) spawnPulse();
        continue;
      }

      const na = nodes[p.edge.a], nb = nodes[p.edge.b];
      const ra = rotatePoint(na.x, na.y, na.z);
      const rb = rotatePoint(nb.x, nb.y, nb.z);
      const pa2 = project(ra.x, ra.y, ra.z);
      const pb2 = project(rb.x, rb.y, rb.z);

      const px = pa2.sx + (pb2.sx - pa2.sx) * p.t;
      const py = pa2.sy + (pb2.sy - pa2.sy) * p.t;
      const pz = ra.z  + (rb.z  - ra.z)  * p.t;
      const ps = project(0, 0, pz);
      const sc = ps.scale;

      /* Trail */
      p.trail.push({ x: px, y: py });
      if (p.trail.length > p.trailLen) p.trail.shift();

      if (p.trail.length > 1) {
        for (let t = 1; t < p.trail.length; t++) {
          const ta = (t / p.trail.length) * 0.5;
          ctx.beginPath();
          ctx.moveTo(p.trail[t-1].x, p.trail[t-1].y);
          ctx.lineTo(p.trail[t].x,   p.trail[t].y);
          ctx.strokeStyle = p.color.replace(')', `,${ta})`).replace('#', 'rgba(') + ')';
          /* convert hex to rgba manually */
          const hex = p.color;
          const r2 = parseInt(hex.slice(1,3),16);
          const g2 = parseInt(hex.slice(3,5),16);
          const b2 = parseInt(hex.slice(5,7),16);
          ctx.strokeStyle = `rgba(${r2},${g2},${b2},${ta})`;
          ctx.lineWidth = p.r * sc * (t / p.trail.length) * 1.5;
          ctx.stroke();
        }
      }

      /* Pulse dot */
      const hex2 = p.color;
      const rr = parseInt(hex2.slice(1,3),16);
      const gg = parseInt(hex2.slice(3,5),16);
      const bb = parseInt(hex2.slice(5,7),16);

      const gl = ctx.createRadialGradient(px, py, 0, px, py, p.r * sc * 5);
      gl.addColorStop(0,   `rgba(${rr},${gg},${bb},0.95)`);
      gl.addColorStop(0.3, `rgba(${rr},${gg},${bb},0.4)`);
      gl.addColorStop(1,   `rgba(${rr},${gg},${bb},0)`);
      ctx.beginPath();
      ctx.arc(px, py, p.r * sc * 5, 0, Math.PI * 2);
      ctx.fillStyle = gl;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(px, py, p.r * sc, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rr},${gg},${bb},1)`;
      ctx.fill();
    }

    /* ── DRAW NODES ── */
    nodes.forEach((n, i) => {
      const { sx, sy, scale } = projected[i];
      if (scale <= 0) return;

      n.activationPhase += n.activationSpeed;
      const act = 0.5 + 0.5 * Math.sin(n.activationPhase);

      /* Layer color: input=green, hidden=blue/purple, output=orange */
      let cr, cg, cb;
      if (n.layer === 0) { cr=52;  cg=211; cb=153; }        /* green — input */
      else if (n.layer === LAYERS.length - 1) { cr=245; cg=158; cb=11; } /* amber — output */
      else if (n.layer % 2 === 0) { cr=96;  cg=165; cb=250; } /* blue — even hidden */
      else                         { cr=167; cg=139; cb=250; } /* purple — odd hidden */

      const alpha = (0.5 + act * 0.5) * Math.min(1, scale * 1.5);
      const r = n.r * scale;

      /* outer aura */
      const aura = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 6);
      aura.addColorStop(0,   `rgba(${cr},${cg},${cb},${alpha * 0.35})`);
      aura.addColorStop(0.5, `rgba(${cr},${cg},${cb},${alpha * 0.08})`);
      aura.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);
      ctx.beginPath();
      ctx.arc(sx, sy, r * 6, 0, Math.PI * 2);
      ctx.fillStyle = aura;
      ctx.fill();

      /* node ring */
      ctx.beginPath();
      ctx.arc(sx, sy, r * 1.6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha * 0.5})`;
      ctx.lineWidth = 0.7 * scale;
      ctx.stroke();

      /* core */
      const core = ctx.createRadialGradient(sx - r*0.3, sy - r*0.3, 0, sx, sy, r);
      core.addColorStop(0,   `rgba(255,255,255,${alpha * 0.9})`);
      core.addColorStop(0.4, `rgba(${cr},${cg},${cb},${alpha})`);
      core.addColorStop(1,   `rgba(${Math.round(cr*0.4)},${Math.round(cg*0.4)},${Math.round(cb*0.4)},${alpha})`);
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.fill();
    });

    /* ── AMBIENT PARTICLES ── */
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.z += p.vz;

      /* wrap around */
      if (p.x >  500) p.x = -500;
      if (p.x < -500) p.x =  500;
      if (p.y >  400) p.y = -400;
      if (p.y < -400) p.y =  400;
      if (p.z >  350) p.z = -350;
      if (p.z < -350) p.z =  350;

      const rp = rotatePoint(p.x, p.y, p.z);
      const { sx, sy, scale } = project(rp.x, rp.y, rp.z);
      if (scale <= 0) return;

      const cr2 = p.color === 'accent2' ? [167,139,250] : [96,165,250];
      const alpha2 = p.alpha * scale;

      ctx.beginPath();
      ctx.arc(sx, sy, p.r * scale, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${cr2[0]},${cr2[1]},${cr2[2]},${alpha2})`;
      ctx.fill();
    });

    /* ── FLOATING DATA LABELS (random binary/matrix look) ── */
    if (frame % 18 === 0) {
      const chars = '01';
      ctx.font = `${8 + Math.random()*6}px 'JetBrains Mono',monospace`;
      ctx.fillStyle = `rgba(96,165,250,${0.04 + Math.random()*0.06})`;
      ctx.fillText(
        Array.from({length:4},()=>chars[Math.floor(Math.random()*2)]).join(''),
        Math.random() * W, Math.random() * H
      );
    }

    /* ── LAYER LABELS ── */
    const labelNames = ['Input', 'Hidden', 'Hidden', 'Hidden', 'Hidden', 'Output'];
    const totalLayers2 = LAYERS.length;
    const totalWidth2  = (totalLayers2 - 1) * LAYER_GAP;

    LAYERS.forEach((count, li) => {
      const lx3d = li * LAYER_GAP - totalWidth2 / 2;
      /* top node of each layer */
      const topNode = nodes.find(n => n.layer === li && n.idx === 0);
      if (!topNode) return;
      const rn = rotatePoint(topNode.x, topNode.y - NODE_GAP * 1.4, topNode.z);
      const { sx: lsx, sy: lsy, scale: lsc } = project(rn.x, rn.y, rn.z);
      if (lsc < 0.3) return;

      ctx.font = `${Math.round(9 * lsc)}px 'JetBrains Mono',monospace`;
      ctx.fillStyle = `rgba(107,114,128,${lsc * 0.55})`;
      ctx.textAlign = 'center';
      ctx.fillText(labelNames[li] || 'Hidden', lsx, lsy);
    });
    ctx.textAlign = 'left';

    requestAnimationFrame(tick);
  }
  tick();
})();
