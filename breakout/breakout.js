// ============================================================
// Breakout — HTML5 Canvas Port
// Ported with atb-game-porting skill | Powered by fun.aitobox.com
// ============================================================
'use strict';

// --- Zero-Black-Screen Invariant 1: isImgValid guard ---
function isImgValid(img) {
  return !!(img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0);
}

// ============================================================
// i18n — 6-language dictionary
// ============================================================
const I18N = {
  en: {
    title:'Breakout', start:'▶ Start', pause:'⏸ Pause', resume:'▶ Resume',
    restart:'↺ Restart', score:'Score', lives:'Lives', level:'Level',
    gameOver:'Game Over', youWin:'You Win!', settings:'Settings',
    sfxVol:'SFX Volume', exportSave:'📥 Export Save', importSave:'📤 Import Save',
    close:'Close', poweredBy:'🎮 Powered by fun.aitobox.com',
    rotate:'Rotate device for best experience',
    loadFail:'No save data found.', loadOk:'Save loaded!',
    saveOk:'Game saved!', saveFail:'Save failed.',
    resetConfirm:'Reset all progress?',
    easter:'🎉 Easter Egg Discovered! This game was automatically ported by the atb-game-porting skill powered by fun.aitobox.com',
    clickTitle:'Click title 3 times for surprise...',
    chooseFile:'Choose save file',
  },
  'zh-CN': {
    title:'打砖块', start:'▶ 开始', pause:'⏸ 暂停', resume:'▶ 继续',
    restart:'↺ 重来', score:'分数', lives:'生命', level:'关卡',
    gameOver:'游戏结束', youWin:'你赢了！', settings:'设置',
    sfxVol:'音效音量', exportSave:'📥 导出存档', importSave:'📤 导入存档',
    close:'关闭', poweredBy:'🎮 由 fun.aitobox.com 驱动',
    rotate:'旋转设备获得最佳体验',
    loadFail:'没有找到存档数据。', loadOk:'存档已加载！',
    saveOk:'游戏已保存！', saveFail:'保存失败。',
    resetConfirm:'重置所有进度？',
    easter:'🎉 发现彩蛋！此游戏由 atb-game-porting 技能自动移植，由 fun.aitobox.com 提供支持',
    clickTitle:'点击标题 3 次有惊喜...',
    chooseFile:'选择存档文件',
  },
  ja: {
    title:'ブロック崩し', start:'▶ スタート', pause:'⏸ 一時停止', resume:'▶ 再開',
    restart:'↺ リスタート', score:'スコア', lives:'残機', level:'レベル',
    gameOver:'ゲームオーバー', youWin:'クリア！', settings:'設定',
    sfxVol:'効果音量', exportSave:'📥 セーブ出力', importSave:'📤 セーブ読込',
    close:'閉じる', poweredBy:'🎮 fun.aitobox.com 提供',
    rotate:'端末を回転させてください',
    loadFail:'セーブデータが見つかりません。', loadOk:'セーブを読み込みました！',
    saveOk:'ゲームを保存しました！', saveFail:'保存に失敗しました。',
    resetConfirm:'すべての進行状況をリセットしますか？',
    easter:'🎉 イースターエッグ発見！このゲームはatb-game-portingスキルによって自動移植され、fun.aitobox.comが提供しています',
    clickTitle:'タイトルを3回クリックすると...',
    chooseFile:'セーブファイルを選択',
  },
  fr: {
    title:'Casse-Briques', start:'▶ Démarrer', pause:'⏸ Pause', resume:'▶ Reprendre',
    restart:'↺ Recommencer', score:'Score', lives:'Vies', level:'Niveau',
    gameOver:'Game Over', youWin:'Gagné !', settings:'Paramètres',
    sfxVol:'Volume SFX', exportSave:'📥 Exporter', importSave:'📤 Importer',
    close:'Fermer', poweredBy:'🎮 Propulsé par fun.aitobox.com',
    rotate:'Tournez l\'appareil',
    loadFail:'Aucune sauvegarde trouvée.', loadOk:'Sauvegarde chargée !',
    saveOk:'Jeu sauvegardé !', saveFail:'Échec de la sauvegarde.',
    resetConfirm:'Réinitialiser toute la progression ?',
    easter:'🎉 Easter Egg découvert ! Ce jeu a été porté automatiquement par atb-game-porting, propulsé par fun.aitobox.com',
    clickTitle:'Cliquez 3 fois sur le titre...',
    chooseFile:'Choisir un fichier',
  },
  de: {
    title:'Breakout', start:'▶ Start', pause:'⏸ Pause', resume:'▶ Fortsetzen',
    restart:'↺ Neustart', score:'Punkte', lives:'Leben', level:'Level',
    gameOver:'Game Over', youWin:'Gewonnen!', settings:'Einstellungen',
    sfxVol:'SFX Lautstärke', exportSave:'📥 Exportieren', importSave:'📤 Importieren',
    close:'Schließen', poweredBy:'🎮 Powered by fun.aitobox.com',
    rotate:'Gerät drehen',
    loadFail:'Kein Spielstand gefunden.', loadOk:'Spielstand geladen!',
    saveOk:'Spiel gespeichert!', saveFail:'Speichern fehlgeschlagen.',
    resetConfirm:'Gesamten Fortschritt zurücksetzen?',
    easter:'🎉 Easter Egg entdeckt! Dieses Spiel wurde automatisch von atb-game-porting portiert, powered by fun.aitobox.com',
    clickTitle:'3x auf Titel klicken...',
    chooseFile:'Datei auswählen',
  },
  es: {
    title:'Breakout', start:'▶ Iniciar', pause:'⏸ Pausa', resume:'▶ Reanudar',
    restart:'↺ Reiniciar', score:'Puntuación', lives:'Vidas', level:'Nivel',
    gameOver:'Game Over', youWin:'¡Ganaste!', settings:'Ajustes',
    sfxVol:'Volumen SFX', exportSave:'📥 Exportar', importSave:'📤 Importar',
    close:'Cerrar', poweredBy:'🎮 Impulsado por fun.aitobox.com',
    rotate:'Gira el dispositivo',
    loadFail:'No se encontraron datos guardados.', loadOk:'¡Partida cargada!',
    saveOk:'¡Juego guardado!', saveFail:'Error al guardar.',
    resetConfirm:'¿Restablecer todo el progreso?',
    easter:'🎉 ¡Easter Egg descubierto! Este juego fue portado automáticamente por atb-game-porting, impulsado por fun.aitobox.com',
    clickTitle:'Haz clic 3 veces en el título...',
    chooseFile:'Elegir archivo',
  },
};

let lang = (() => { try { return localStorage.getItem('breakout_lang') || 'en'; } catch(e) { return 'en'; } })();
function t(key) { return (I18N[lang] && I18N[lang][key]) || (I18N['en'][key]) || key; }

// ============================================================
// StorageManager — localStorage + JSON export/import
// ============================================================
const STORAGE_KEY = 'breakout_save';
const StorageManager = {
  save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch(e) { return false; }
  },
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch(e) { return null; }
  },
  remove() {
    try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
  },
  exportJSON(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'breakout_save.json'; a.click();
    URL.revokeObjectURL(url);
  },
  importJSON(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (typeof data.score === 'number' && typeof data.level === 'number') {
          callback(data);
        } else {
          throw new Error('Invalid format');
        }
      } catch(err) { callback(null); }
    };
    reader.readAsText(file);
  },
};

// ============================================================
// Audio — Web Audio API procedural SFX
// ============================================================
let audioCtx = null;
let sfxVolume = 0.5;
function getAudioCtx() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
  }
  return audioCtx;
}
function playBeep(freq, duration, type, volMult) {
  const ctx = getAudioCtx();
  if (!ctx || sfxVolume <= 0) return;
  if (ctx.state === 'suspended') ctx.resume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type || 'square';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(sfxVolume * (volMult || 0.3), ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain); gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}
function sfxBounce() { playBeep(440, 0.08, 'square', 0.25); }
function sfxHit() { playBeep(660, 0.06, 'triangle', 0.30); }
function sfxBreak() { playBeep(880, 0.12, 'sawtooth', 0.20); }
function sfxLose() { playBeep(150, 0.4, 'sawtooth', 0.35); }
function sfxWin() {
  [523,659,784,1047].forEach((f,i) => setTimeout(() => playBeep(f,0.15,'triangle',0.25), i*100));
}

// ============================================================
// Game Constants
// ============================================================
const W = 640, H = 480;
const PADDLE_W = 80, PADDLE_H = 14, PADDLE_Y = H - 40;
const BALL_R = 6;
const BRICK_ROWS = 5, BRICK_COLS = 10;
const BRICK_W = 56, BRICK_H = 18, BRICK_PAD = 4;
const BRICK_TOP = 50, BRICK_LEFT = (W - BRICK_COLS * (BRICK_W + BRICK_PAD) + BRICK_PAD) / 2;
const BRICK_COLORS = ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6'];

// ============================================================
// Game State
// ============================================================
const G = {
  paddleX: (W - PADDLE_W) / 2,
  ballX: W / 2, ballY: PADDLE_Y - BALL_R - 2,
  ballDX: 3, ballDY: -3,
  bricks: [],
  score: 0, lives: 3, level: 1,
  running: false, paused: false,
  gameOver: false, won: false,
};

function initBricks() {
  G.bricks = [];
  for (let r = 0; r < BRICK_ROWS; r++) {
    for (let c = 0; c < BRICK_COLS; c++) {
      G.bricks.push({
        x: BRICK_LEFT + c * (BRICK_W + BRICK_PAD),
        y: BRICK_TOP + r * (BRICK_H + BRICK_PAD),
        w: BRICK_W, h: BRICK_H,
        alive: true, color: BRICK_COLORS[r],
      });
    }
  }
}

function resetBall() {
  G.ballX = W / 2;
  G.ballY = PADDLE_Y - BALL_R - 2;
  const speed = 3 + G.level * 0.5;
  const angle = (Math.random() * 1.0 + 0.75) * Math.PI;
  G.ballDX = Math.cos(angle) * speed;
  G.ballDY = -Math.sin(angle) * speed;
}

function resetGame() {
  initBricks();
  G.paddleX = (W - PADDLE_W) / 2;
  G.score = 0; G.lives = 3; G.level = 1;
  G.running = false; G.paused = false;
  G.gameOver = false; G.won = false;
  resetBall();
}

function nextLevel() {
  G.level++;
  initBricks();
  G.paddleX = (W - PADDLE_W) / 2;
  resetBall();
  G.running = true; G.paused = false;
}
// ============================================================
// Breakout Part 2 — Rendering, Game Loop, Input, UI
// ============================================================
'use strict';

// --- Canvas references ---
const bgCtx = document.getElementById('bg-canvas').getContext('2d');
const fgCtx = document.getElementById('fg-canvas').getContext('2d');

// ============================================================
// Rendering
// ============================================================
function drawBackground() {
  const ctx = bgCtx;
  // Starfield background
  ctx.fillStyle = '#0b1120';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(30,41,59,0.5)';
  for (let i = 0; i < 60; i++) {
    const sx = (i * 137.5 + 31) % W;
    const sy = (i * 97.3 + 17) % H;
    const sr = 0.5 + (i % 3) * 0.8;
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
  }
  // Grid lines
  ctx.strokeStyle = 'rgba(51,65,85,0.3)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
}

function drawForeground() {
  const ctx = fgCtx;
  ctx.clearRect(0, 0, W, H);

  // Bricks
  for (const b of G.bricks) {
    if (!b.alive) continue;
    const grad = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.h);
    grad.addColorStop(0, b.color);
    grad.addColorStop(1, 'rgba(0,0,0,0.3)');
    ctx.fillStyle = grad;
    ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(b.x, b.y, b.w, b.h);
  }

  // Paddle
  const px = G.paddleX;
  const pw = PADDLE_W, ph = PADDLE_H;
  const pgrad = ctx.createLinearGradient(px, PADDLE_Y, px, PADDLE_Y + ph);
  pgrad.addColorStop(0, '#60a5fa');
  pgrad.addColorStop(0.5, '#3b82f6');
  pgrad.addColorStop(1, '#1d4ed8');
  ctx.fillStyle = pgrad;
  // Manual rounded rect (roundRect polyfill for older Chrome)
  const rr = 6;
  ctx.beginPath();
  ctx.moveTo(px + rr, PADDLE_Y);
  ctx.lineTo(px + pw - rr, PADDLE_Y);
  ctx.quadraticCurveTo(px + pw, PADDLE_Y, px + pw, PADDLE_Y + rr);
  ctx.lineTo(px + pw, PADDLE_Y + ph - rr);
  ctx.quadraticCurveTo(px + pw, PADDLE_Y + ph, px + pw - rr, PADDLE_Y + ph);
  ctx.lineTo(px + rr, PADDLE_Y + ph);
  ctx.quadraticCurveTo(px, PADDLE_Y + ph, px, PADDLE_Y + ph - rr);
  ctx.lineTo(px, PADDLE_Y + rr);
  ctx.quadraticCurveTo(px, PADDLE_Y, px + rr, PADDLE_Y);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#93c5fd';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Ball
  ctx.fillStyle = '#facc15';
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(G.ballX, G.ballY, BALL_R, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // HUD
  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 14px monospace';
  ctx.fillText(`${t('score')}: ${G.score}`, 12, 22);
  ctx.fillText(`${t('lives')}: ${'❤'.repeat(G.lives)}`, W / 2 - 40, 22);
  ctx.fillText(`${t('level')}: ${G.level}`, W - 100, 22);
}

// ============================================================
// Physics / Collision
// ============================================================
function updateGame() {
  if (!G.running || G.paused || G.gameOver) return;

  // Move ball
  G.ballX += G.ballDX;
  G.ballY += G.ballDY;

  // Wall bounce
  if (G.ballX - BALL_R <= 0) { G.ballX = BALL_R; G.ballDX = Math.abs(G.ballDX); sfxBounce(); }
  if (G.ballX + BALL_R >= W) { G.ballX = W - BALL_R; G.ballDX = -Math.abs(G.ballDX); sfxBounce(); }
  if (G.ballY - BALL_R <= 0) { G.ballY = BALL_R; G.ballDY = Math.abs(G.ballDY); sfxBounce(); }

  // Bottom — lose life
  if (G.ballY - BALL_R > H) {
    G.lives--;
    sfxLose();
    if (G.lives <= 0) {
      G.gameOver = true;
      G.running = false;
      showOverlay('gameOver');
      return;
    }
    resetBall();
    return;
  }

  // Paddle collision
  if (G.ballDY > 0 &&
      G.ballY + BALL_R >= PADDLE_Y &&
      G.ballY - BALL_R <= PADDLE_Y + PADDLE_H &&
      G.ballX >= G.paddleX &&
      G.ballX <= G.paddleX + PADDLE_W) {
    // Angle based on hit position
    const hitPos = (G.ballX - G.paddleX) / PADDLE_W; // 0..1
    const angle = (hitPos - 0.5) * Math.PI * 0.7; // -63°..+63°
    const speed = Math.sqrt(G.ballDX * G.ballDX + G.ballDY * G.ballDY);
    G.ballDX = Math.sin(angle) * speed;
    G.ballDY = -Math.abs(Math.cos(angle) * speed);
    G.ballY = PADDLE_Y - BALL_R;
    sfxBounce();
  }

  // Brick collision
  for (const b of G.bricks) {
    if (!b.alive) continue;
    if (G.ballX + BALL_R > b.x && G.ballX - BALL_R < b.x + b.w &&
        G.ballY + BALL_R > b.y && G.ballY - BALL_R < b.y + b.h) {
      b.alive = false;
      G.score += 10 * G.level;
      sfxBreak();

      // Determine bounce direction
      const overlapLeft = (G.ballX + BALL_R) - b.x;
      const overlapRight = (b.x + b.w) - (G.ballX - BALL_R);
      const overlapTop = (G.ballY + BALL_R) - b.y;
      const overlapBottom = (b.y + b.h) - (G.ballY - BALL_R);
      const minOverlapX = Math.min(overlapLeft, overlapRight);
      const minOverlapY = Math.min(overlapTop, overlapBottom);

      if (minOverlapX < minOverlapY) {
        G.ballDX = -G.ballDX;
      } else {
        G.ballDY = -G.ballDY;
      }
      break; // one brick per frame
    }
  }

  // Check win
  if (G.bricks.every(b => !b.alive)) {
    G.won = true;
    G.score += 50 * G.level;
    sfxWin();
    showOverlay('win');
  }
}

// ============================================================
// Game Loop
// ============================================================
let lastTime = 0;
function gameLoop(timestamp) {
  try {
    if (!lastTime) lastTime = timestamp;
    // Cap at 60fps equivalent
    if (timestamp - lastTime >= 16) {
      handlePaddleInput();
      updateGame();
      drawForeground();
      lastTime = timestamp;
    }
  } catch(e) {
    console.error('Render loop error:', e);
  }
  requestAnimationFrame(gameLoop);
}

// ============================================================
// Input Handling — Keyboard + Touch/Pointer
// ============================================================
let keys = {};
let touchX = null;
let mouseX = null;

window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') e.preventDefault();
  if (e.key === ' ' || e.key === 'Spacebar') {
    e.preventDefault();
    if (!G.running && !G.gameOver) { startGame(); }
    else if (G.paused) { togglePause(); }
  }
  if (e.key === 'p' || e.key === 'P') { togglePause(); }
});
window.addEventListener('keyup', (e) => { keys[e.key] = false; });

function handlePaddleInput() {
  const speed = 7;
  if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
    G.paddleX = Math.max(0, G.paddleX - speed);
  }
  if (keys['ArrowRight'] || keys['d'] || keys['D']) {
    G.paddleX = Math.min(W - PADDLE_W, G.paddleX + speed);
  }
  // Mouse/touch
  if (mouseX !== null) {
    G.paddleX = Math.max(0, Math.min(W - PADDLE_W, mouseX - PADDLE_W / 2));
  }
  if (touchX !== null) {
    G.paddleX = Math.max(0, Math.min(W - PADDLE_W, touchX - PADDLE_W / 2));
  }
}

const fgCanvas = document.getElementById('fg-canvas');
fgCanvas.addEventListener('mousemove', (e) => {
  const rect = fgCanvas.getBoundingClientRect();
  const scaleX = W / rect.width;
  mouseX = (e.clientX - rect.left) * scaleX;
});
fgCanvas.addEventListener('mouseleave', () => { mouseX = null; });
fgCanvas.addEventListener('click', (e) => {
  if (!G.running && !G.gameOver) startGame();
});

fgCanvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const rect = fgCanvas.getBoundingClientRect();
  const scaleX = W / rect.width;
  touchX = (e.touches[0].clientX - rect.left) * scaleX;
}, {passive: false});
fgCanvas.addEventListener('touchend', () => { touchX = null; });
fgCanvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  const rect = fgCanvas.getBoundingClientRect();
  const scaleX = W / rect.width;
  touchX = (e.touches[0].clientX - rect.left) * scaleX;
  if (!G.running && !G.gameOver) startGame();
}, {passive: false});

// Paddle input is now handled directly in gameLoop

// ============================================================
// UI Controls
// ============================================================
function showOverlay(type) {
  const overlay = document.getElementById('overlay');
  const title = document.getElementById('overlay-title');
  const sub = document.getElementById('overlay-sub');
  const btn = document.getElementById('start-btn');

  if (type === 'gameOver') {
    title.textContent = t('gameOver');
    sub.textContent = `${t('score')}: ${G.score}  |  ${t('level')}: ${G.level}`;
    btn.textContent = t('restart');
    overlay.classList.remove('hidden');
  } else if (type === 'win') {
    title.textContent = t('youWin');
    sub.textContent = `${t('score')}: ${G.score}  |  ${t('level')}: ${G.level}`;
    btn.textContent = t('start') + ' ▶';
    overlay.classList.remove('hidden');
    G.running = false;
  } else if (type === 'start') {
    title.textContent = t('title');
    sub.textContent = '';
    btn.textContent = t('start');
    overlay.classList.remove('hidden');
  }
}

function hideOverlay() {
  document.getElementById('overlay').classList.add('hidden');
}

function startGame() {
  if (G.won) {
    nextLevel();
  } else if (G.gameOver) {
    resetGame();
  }
  hideOverlay();
  G.running = true;
  G.paused = false;
  saveState();
}

function togglePause() {
  if (!G.running || G.gameOver) return;
  G.paused = !G.paused;
  if (G.paused) {
    showOverlay('start');
    document.getElementById('overlay-title').textContent = t('pause');
    document.getElementById('start-btn').textContent = t('resume');
  } else {
    hideOverlay();
  }
}

function saveState() {
  const ok = StorageManager.save({
    score: G.score, lives: G.lives, level: G.level,
    paddleX: G.paddleX, ballX: G.ballX, ballY: G.ballY,
    ballDX: G.ballDX, ballDY: G.ballDY,
    bricks: G.bricks.map(b => ({...b})),
    running: G.running, paused: G.paused,
  });
  showToast(ok ? t('saveOk') : t('saveFail'));
}

function loadState() {
  const data = StorageManager.load();
  if (!data) { showToast(t('loadFail')); return; }
  Object.assign(G, data);
  G.bricks = data.bricks || [];
  hideOverlay();
  showToast(t('loadOk'));
}

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._timeout);
  el._timeout = setTimeout(() => el.classList.remove('show'), 2000);
}

// ============================================================
// Settings Panel & Easter Egg
// ============================================================
let titleClicks = 0;
let titleClickTimer = null;

document.getElementById('start-btn').addEventListener('click', (e) => {
  e.stopPropagation();
  if (G.paused) { togglePause(); }
  else if (G.gameOver) { resetGame(); hideOverlay(); G.running = true; }
  else if (G.won) { nextLevel(); hideOverlay(); }
  else { startGame(); }
});

document.getElementById('settings-btn').addEventListener('click', () => {
  document.getElementById('settings-panel').classList.toggle('hidden');
});
document.getElementById('close-settings-btn').addEventListener('click', () => {
  document.getElementById('settings-panel').classList.add('hidden');
});

document.getElementById('sfx-vol').addEventListener('input', (e) => {
  sfxVolume = parseInt(e.target.value) / 100;
});

document.getElementById('save-btn').addEventListener('click', saveState);
document.getElementById('load-btn').addEventListener('click', loadState);
document.getElementById('reset-btn').addEventListener('click', () => {
  if (confirm(t('resetConfirm'))) {
    StorageManager.remove();
    resetGame();
    showOverlay('start');
    showToast(t('loadOk'));
  }
});
document.getElementById('save-json-btn').addEventListener('click', () => {
  StorageManager.exportJSON({
    score: G.score, lives: G.lives, level: G.level,
    timestamp: new Date().toISOString(),
  });
});
document.getElementById('load-json-btn').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    if (e.target.files[0]) {
      StorageManager.importJSON(e.target.files[0], (data) => {
        if (data) {
          Object.assign(G, data);
          hideOverlay();
          showToast(t('loadOk'));
        } else {
          showToast(t('loadFail'));
        }
      });
    }
  };
  input.click();
});

// Language switching
document.getElementById('lang-select').addEventListener('change', (e) => {
  lang = e.target.value;
  try { localStorage.setItem('breakout_lang', lang); } catch(e) {}
  refreshUI();
});

function refreshUI() {
  document.getElementById('overlay-title').textContent = G.gameOver ? t('gameOver') :
    G.won ? t('youWin') : G.paused ? t('pause') : t('title');
  document.getElementById('start-btn').textContent = G.gameOver ? t('restart') :
    G.paused ? t('resume') : t('start');
  document.getElementById('settings-title').textContent = t('settings');
}

// Title easter egg
document.getElementById('overlay-title').addEventListener('click', () => {
  titleClicks++;
  clearTimeout(titleClickTimer);
  titleClickTimer = setTimeout(() => { titleClicks = 0; }, 1500);
  if (titleClicks >= 3) {
    titleClicks = 0;
    showToast(t('easter'));
  }
});

document.getElementById('easter-btn').addEventListener('click', () => {
  showToast(t('easter'));
});

// ============================================================
// Initialization — Zero-Black-Screen Invariant 3
// ============================================================
function initApp() {
  // Console banner
  console.log(
    '%c🎮 Ported with atb-game-porting skill | Powered by fun.aitobox.com (https://fun.aitobox.com)',
    'background:#111827;color:#38bdf8;padding:6px 12px;border-radius:6px;font-weight:bold;'
  );

  lang = (() => { try { return localStorage.getItem('breakout_lang') || 'en'; } catch(e) { return 'en'; } })();
  document.getElementById('lang-select').value = lang;

  resetGame();
  drawBackground();
  drawForeground();
  showOverlay('start');
  refreshUI();
  requestAnimationFrame(gameLoop);
}

// Zero-Black-Screen Invariant 3: Mount lifecycle guard
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp, {once: true});
} else {
  initApp();
}
