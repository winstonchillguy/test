// Interface interactions are simulated client-side and do not perform external actions.
// No data is stored, sent, or processed beyond this local UI.
const loginForm = document.getElementById('login-form');
const loginStatus = document.getElementById('login-status');
const loginScreen = document.getElementById('login');
const dashboard = document.getElementById('dashboard');
const loginDate = document.getElementById('login-date');
const toolGrid = document.getElementById('tool-grid');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const terminalOutput = document.getElementById('terminal-output');
const statusGrid = document.getElementById('status-grid');
const modalForm = document.getElementById('modal-form');
const progressLabel = document.getElementById('progress-label');
const progressPercent = document.getElementById('progress-percent');
const closeModal = document.getElementById('close-modal');
const uptime = document.getElementById('uptime');
const cloudStatus = document.getElementById('cloud-status');
const linuxEnv = document.getElementById('linux-env');
const ipRotation = document.getElementById('ip-rotation');
const sysLoad = document.getElementById('sys-load');
const loadBar = document.getElementById('load-bar');
const tempReadout = document.getElementById('temp-readout');
const exitNode = document.getElementById('exit-node');
const meshStatus = document.getElementById('mesh-status');
const meshIp = document.getElementById('mesh-ip');
const meshLocation = document.getElementById('mesh-location');
const meshLatency = document.getElementById('mesh-latency');
const meshIntegrity = document.getElementById('mesh-integrity');

const tools = [
  { name: 'Social Media Access Audit', desc: 'Credential resilience simulation for social platforms.', type: 'bruteforce' },
  { name: 'Password Resilience Suite', desc: 'Adaptive hash resilience simulation.', type: 'password' },
  { name: 'Mailbox Integrity Drill', desc: 'Inbox security workflow simulator.', type: 'email' },
  { name: 'Vulnerability Scanner', desc: 'Attack surface reconnaissance for authorized targets.', type: 'scan' },
  { name: 'IP Trace & Geolocation', desc: 'Geo-IP triangulation and routing analysis.', type: 'trace' },
  { name: 'Email Phishing Simulator', desc: 'Lure templating and response tracking drill.', type: 'phish' },
  { name: 'Packet Sniffer', desc: 'Deep packet inspection and TLS health checks.', type: 'network' },
  { name: 'Payload Delivery Lab', desc: 'Controlled delivery chain sandbox.', type: 'payload' },
  { name: 'Traffic Burst Simulator', desc: 'Load orchestration for resilience testing.', type: 'network' },
  { name: 'Crypto Wallet Audit', desc: 'Mnemonic permutation analysis for training.', type: 'password' },
  { name: 'SQL Injection Tester', desc: 'Database probe simulation with safe mode.', type: 'scan' },
  { name: 'Zero-Day Monitor', desc: 'Threat intelligence ingestion.', type: 'monitor' },
  { name: 'Dark Web Indexer', desc: 'Onion routing map builder.', type: 'monitor' },
  { name: 'Exploit Chain Builder', desc: 'Module compilation + chaining in sandbox.', type: 'payload' },
  { name: 'Rootkit Implant Viewer', desc: 'Kernel hook monitor (read-only).', type: 'monitor' },
  { name: 'VPN Drift Simulator', desc: 'Route resiliency planner.', type: 'network' },
  { name: 'IoT Device Mapper', desc: 'Embedded device inventory.', type: 'scan' },
  { name: 'RFID Signal Lab', desc: 'Capture & replay training workflow.', type: 'payload' },
  { name: 'Credential Leak Monitor', desc: 'Paste site watcher.', type: 'monitor' },
  { name: 'Biometric Sensor Lab', desc: 'Sensor bypass emulation.', type: 'payload' },
  { name: 'Cloud Vault Audit', desc: 'Bucket misconfiguration audit.', type: 'scan' },
  { name: 'Proxy Mesh Orchestrator', desc: 'Relay health control.', type: 'network' },
  { name: 'Malware Sandbox', desc: 'Behavioral trace viewer.', type: 'payload' },
  { name: 'Threat Actor Radar', desc: 'Pattern recognition feed.', type: 'monitor' },
  { name: 'Mobile SIM Tracker', desc: 'Baseband signal sweeps for training.', type: 'trace' },
  { name: 'Satellite Uplink Probe', desc: 'Signal injection mock.', type: 'network' },
  { name: 'Memory Dumper', desc: 'Volatile memory extraction drill.', type: 'password' }
];

const logTemplates = {
  default: [
    '0x{hex} :: SYN {ip}:{port} -> {ip}:{port}',
    'TRACE::{ip} latency {ms}ms :: jitter {ms}ms',
    'AUTH::token {hex} :: status [masked]',
    'PING::{ip} ttl={ttl} seq={seq}',
    'WARN::checksum mismatch on node {node}',
    'INFO::entropy {entropy}% / seed {hex}',
    'SCAN::{ip} ports [{port},{port},{port}]',
    'LOAD::{hex} -> memory segment {hex}'
  ],
  bruteforce: [
    'SPRAY::{ip} -> {ip} :: throttle {ms}s',
    'AUTH::{hex} :: credential set #{node}',
    'LOCKOUT watch :: drift {ms}ms',
    'PASSLIST::{hex} :: pattern {entropy}%'
  ],
  password: [
    'HASH::{hex} :: salt={hex} :: mode {entropy}%',
    'GPU lane {node} :: {ms}ms batch',
    'RULESET::{hex} :: mutate {entropy}%'
  ],
  email: [
    'TOKEN::{hex} :: mailbox {ip}',
    'IMAP::{ip} :: handshake {ms}ms',
    'RECOVERY::challenge {hex}'
  ],
  scan: [
    'PORT::{port} :: {ip} :: status open',
    'VULN::{hex} :: surface {node}',
    'CRAWL::{ip} :: depth {entropy}%'
  ],
  trace: [
    'HOP::{node} :: {ip} :: {ms}ms',
    'ASN::{hex} :: relay {ip}',
    'ROUTE::{ip} -> {ip} :: drift {ms}ms'
  ],
  network: [
    'FLOW::{hex} :: burst {port}pps',
    'BOT::{node} :: {ip} :: ready',
    'AMP::{hex} :: factor {entropy}%'
  ],
  payload: [
    'STAGE::{hex} :: dropper {node}',
    'SIGN::{hex} :: stealth {entropy}%',
    'BEACON::{ip} :: {ms}ms heartbeat'
  ],
  monitor: [
    'FEED::{hex} :: alert score {entropy}%',
    'SIGNAL::{ip} :: flagged',
    'BROKER::{node} :: sync {ms}ms'
  ],
  phish: [
    'CLICK::{ip} :: {ms}ms response',
    'MAILER::{hex} :: batch {node}',
    'REDIR::{ip} :: capture {entropy}%'
  ]
};

const moduleProfiles = {
  bruteforce: {
    statusLines: ['Validating consent ledger...', 'Rotating proxy ladders...', 'Masking fingerprint telemetry...'],
    counterLabel: 'Attempts',
    statusCards: [
      { label: 'Throttle', value: 'Adaptive' },
      { label: 'Lockout risk', value: 'Low' },
      { label: 'Policy scope', value: 'Verified' }
    ]
  },
  password: {
    statusLines: ['Spinning GPU kernels...', 'Digesting rule chains...', 'Logging keyspace coverage...'],
    counterLabel: 'Hashes',
    statusCards: [
      { label: 'GPU lanes', value: '08' },
      { label: 'Keyspace', value: '14.8B' },
      { label: 'Audit mode', value: 'Enabled' }
    ]
  },
  email: {
    statusLines: ['Negotiating mailbox access...', 'Auditing recovery vectors...', 'Verifying tenant policy...'],
    counterLabel: 'Tokens',
    statusCards: [
      { label: 'Session', value: 'IMAP/SSL' },
      { label: 'Proxy route', value: 'Split' },
      { label: 'Inbox status', value: 'Sealed' }
    ]
  },
  scan: {
    statusLines: ['Enumerating endpoints...', 'Validating response headers...', 'Mapping approved surface...'],
    counterLabel: 'Findings',
    statusCards: [
      { label: 'Hosts scoped', value: '11' },
      { label: 'Criticals', value: '03' },
      { label: 'Scope', value: 'Approved' }
    ]
  },
  trace: {
    statusLines: ['Triangulating path...', 'Measuring relay drift...', 'Resolving ASN fingerprints...'],
    counterLabel: 'Hops',
    statusCards: [
      { label: 'Exit node', value: 'SG-07' },
      { label: 'TTL variance', value: 'Low' },
      { label: 'Geo lock', value: 'Strict' }
    ]
  },
  network: {
    statusLines: ['Priming burst engine...', 'Linking cluster nodes...', 'Balancing throughput...'],
    counterLabel: 'Bursts',
    statusCards: [
      { label: 'Cluster set', value: 'Hydra' },
      { label: 'Amplifier', value: 'Idle' },
      { label: 'Traffic cap', value: '83%' }
    ]
  },
  payload: {
    statusLines: ['Packing payload chain...', 'Assembling beacons...', 'Syncing sandbox profile...'],
    counterLabel: 'Staged',
    statusCards: [
      { label: 'Delivery', value: 'Staged' },
      { label: 'Persistence', value: 'Disabled' },
      { label: 'Sandbox', value: 'Live' }
    ]
  },
  monitor: {
    statusLines: ['Listening for threat signals...', 'Refreshing intel feed...', 'Scoring anomalies...'],
    counterLabel: 'Signals',
    statusCards: [
      { label: 'Feeds', value: '12' },
      { label: 'Threat score', value: '74' },
      { label: 'Broker sync', value: 'Live' }
    ]
  },
  phish: {
    statusLines: ['Staging lure assets...', 'Verifying landing zones...', 'Tracking response rates...'],
    counterLabel: 'Responses',
    statusCards: [
      { label: 'Delivery rate', value: '92%' },
      { label: 'Clicks', value: '14' },
      { label: 'Bounce', value: '3%' }
    ]
  }
};

function randomHex(length) {
  const chars = 'abcdef0123456789';
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function randomIP() {
  return `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

function renderLogLine(templates = logTemplates.default) {
  const template = templates[Math.floor(Math.random() * templates.length)];
  return template
    .replace('{hex}', randomHex(8))
    .replace('{hex}', randomHex(6))
    .replace('{ip}', randomIP())
    .replace('{ip}', randomIP())
    .replace('{ip}', randomIP())
    .replace('{port}', Math.floor(Math.random() * 65000))
    .replace('{port}', Math.floor(Math.random() * 65000))
    .replace('{port}', Math.floor(Math.random() * 65000))
    .replace('{ms}', (Math.random() * 2 + 0.2).toFixed(2))
    .replace('{ms}', (Math.random() * 3 + 0.1).toFixed(2))
    .replace('{ttl}', Math.floor(Math.random() * 128))
    .replace('{seq}', Math.floor(Math.random() * 5000))
    .replace('{node}', Math.floor(Math.random() * 64))
    .replace('{entropy}', Math.floor(Math.random() * 99) + 1);
}

function playTypingSound() {
  if (!window.AudioContext) return;
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.type = 'square';
  oscillator.frequency.value = 880;
  gainNode.gain.value = 0.03;
  oscillator.connect(gainNode).connect(audioCtx.destination);
  oscillator.start();
  setTimeout(() => {
    oscillator.stop();
    audioCtx.close();
  }, 60);
}

function updateLoginDate() {
  if (!loginDate) return;
  const now = new Date();
  const datePart = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  const timePart = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  loginDate.textContent = `${datePart}, ${timePart}`;
}

updateLoginDate();
setInterval(updateLoginDate, 60000);

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('user').value;
  const password = document.getElementById('pass').value;
  loginStatus.textContent = 'Authenticating...';
  loginStatus.style.color = '#7dffb1';
  playTypingSound();
  setTimeout(() => {
    if (username === 'cube' && password === 'noonehere') {
      loginStatus.textContent = 'Access granted. Launching toolkit...';
      loginStatus.style.color = '#7dffb1';
      setTimeout(() => {
        loginScreen.classList.add('hidden');
        dashboard.classList.remove('hidden');
      }, 800);
    } else {
      loginStatus.textContent = 'Authentication failed: incorrect credentials.';
      loginStatus.style.color = '#ff5f6d';
    }
  }, 900);
});

tools.forEach((tool) => {
  const card = document.createElement('div');
  card.className = 'tool-card';
  card.dataset.type = tool.type;
  card.innerHTML = `<h3>${tool.name}</h3><p>${tool.desc}</p>`;
  card.addEventListener('click', () => {
    if (card.classList.contains('locked')) {
      openLockedModal(tool.name);
      return;
    }
    openModal(tool);
  });
  toolGrid.appendChild(card);
});

const lockedCards = Array.from(toolGrid.querySelectorAll('.tool-card'));
const lockedCount = Math.min(4, Math.ceil(lockedCards.length * 0.2));
lockedCards
  .sort(() => Math.random() - 0.5)
  .slice(0, lockedCount)
  .forEach((card) => {
    card.classList.add('locked');
  });

let modalInterval;
let statusInterval;
let progressInterval;
let attemptInterval;
let attemptCount = 0;
let currentProgress = 0;
let modalLogs = [];
let moduleActive = false;
let moduleState = 'idle';
let currentConfig = {};
let currentProfile = moduleProfiles.scan;

const formPresets = {
  bruteforce: {
    title: 'Access Audit Controls',
    summary: ['Credential audit matrix', 'Proxy mesh rotation', 'Lockout avoidance'],
    fields: [
      { label: 'Target username / email / phone', type: 'text', placeholder: 'target@domain.com' },
      { label: 'Platform', type: 'select', options: ['Instagram', 'Facebook', 'TikTok', 'Snapchat', 'Twitter/X', 'LinkedIn'] },
      { label: 'Attack mode', type: 'select', options: ['Brute-force', 'Dictionary', 'Hybrid', 'Credential stuffing', 'Spray attack'] },
      { label: 'Wordlist pack', type: 'select', options: ['core-lexicon.txt', 'shadowlist-2024.lst', 'breachdump-alpha.gz', 'operator-elite.dict', 'shadow-core-2025.lst', 'neural-passpack.v2', 'multi-lang-phrases.csv', 'kbd-walks-legacy.txt'] },
      { label: 'Thread count', type: 'range', min: 20, max: 420, value: 160 },
      { label: 'Proxy relay', type: 'toggle', value: true }
    ]
  },
  password: {
    title: 'Hash Resilience Module',
    summary: ['GPU pipeline status', 'Keyspace coverage', 'Rule chain optimizer'],
    fields: [
      { label: 'Hash input', type: 'text', placeholder: 'b109f3bbbc244eb82441917ed06d618b' },
      { label: 'Hash type', type: 'select', options: ['bcrypt', 'SHA-256', 'SHA-1', 'MD5', 'NTLM', 'Argon2', 'PBKDF2'] },
      { label: 'Attack mode', type: 'select', options: ['Mask', 'Rule-based', 'Hybrid', 'Combinator', 'Prince', 'Token hybrid'] },
      { label: 'Wordlist pack', type: 'select', options: ['rockyou-extended', 'corp-leaks.qz', 'mirage-core.lst', 'hashcat-favorites', 'wordnet-labs', 'open-source-phrases'] },
      { label: 'GPU acceleration', type: 'toggle', value: true },
      { label: 'Speed governor', type: 'range', min: 1, max: 10, value: 7 }
    ]
  },
  email: {
    title: 'Mailbox Integrity Console',
    summary: ['Session replay', 'Recovery audit', 'Inbox integrity scan'],
    fields: [
      { label: 'Target email', type: 'text', placeholder: 'alias@provider.com' },
      { label: 'Provider', type: 'select', options: ['Gmail', 'Outlook', 'Proton', 'Yahoo', 'Custom IMAP', 'Zoho', 'Fastmail'] },
      { label: 'Attack vector', type: 'select', options: ['Token replay', 'OAuth exploit', 'Session hijack', 'Password spray', 'Mailbox relay', 'Cookie clone'] },
      { label: 'Recovery intercept', type: 'toggle', value: true },
      { label: 'Proxy relay', type: 'toggle', value: true }
    ]
  },
  scan: {
    title: 'Scan Parameters',
    summary: ['Surface map', 'Risk classifier', 'Compliance readiness'],
    fields: [
      { label: 'Target URL / IP', type: 'text', placeholder: 'https://target.example' },
      { label: 'Scan depth', type: 'select', options: ['Light', 'Standard', 'Aggressive', 'Deep crawl'] },
      { label: 'Module pack', type: 'select', options: ['OWASP Top 10', 'CMS audit', 'API gateway', 'Legacy stack', 'Cloud edge', 'Auth surfaces'] },
      { label: 'Thread count', type: 'range', min: 5, max: 120, value: 30 }
    ]
  },
  trace: {
    title: 'Trace Parameters',
    summary: ['Route triangulation', 'Relay drift metrics', 'Geo lock'],
    fields: [
      { label: 'Target IP / handle', type: 'text', placeholder: '104.24.12.77' },
      { label: 'Lookup mode', type: 'select', options: ['Geo-IP', 'Traceroute', 'ASN fingerprint', 'Proxy chain', 'Passive DNS'] },
      { label: 'Cloak level', type: 'range', min: 1, max: 10, value: 6 },
      { label: 'Relay obfuscation', type: 'toggle', value: true }
    ]
  },
  network: {
    title: 'Network Orchestration',
    summary: ['Burst cadence', 'Cluster load', 'Amplifier sync'],
    fields: [
      { label: 'Target range', type: 'text', placeholder: '10.0.0.0/24' },
      { label: 'Traffic pattern', type: 'select', options: ['Pulse', 'Adaptive wave', 'Randomized', 'Steady stream', 'Burst ripple'] },
      { label: 'Bot cluster', type: 'select', options: ['Hydra', 'Cerberus', 'Specter', 'Aegis', 'Helios', 'Nyx'] },
      { label: 'Amplification', type: 'toggle', value: false },
      { label: 'Burst size', type: 'range', min: 10, max: 300, value: 120 }
    ]
  },
  payload: {
    title: 'Payload Staging Lab',
    summary: ['Delivery chain', 'Sandbox profile', 'Control toggles'],
    fields: [
      { label: 'Target OS', type: 'select', options: ['Windows', 'Linux', 'macOS', 'Android', 'iOS'] },
      { label: 'Delivery method', type: 'select', options: ['Dropper', 'USB', 'Remote shell', 'Macro doc', 'Drive-by', 'Staged beacon'] },
      { label: 'Stealth profile', type: 'select', options: ['Low noise', 'Adaptive', 'Aggressive', 'Ghost'] },
      { label: 'Persistence', type: 'toggle', value: true }
    ]
  },
  monitor: {
    title: 'Intel Monitoring',
    summary: ['Signal sweep', 'Anomaly scoring', 'Broker sync'],
    fields: [
      { label: 'Signal channel', type: 'select', options: ['Darknet feeds', 'OSINT mesh', 'Zero-day brokers', 'Pastebins', 'Threat exchanges'] },
      { label: 'Alert threshold', type: 'range', min: 1, max: 100, value: 64 },
      { label: 'Encryption', type: 'toggle', value: true }
    ]
  },
  phish: {
    title: 'Phishing Simulation',
    summary: ['Lure templates', 'Domain rotation', 'Response tracking'],
    fields: [
      { label: 'Campaign name', type: 'text', placeholder: 'Quarterly access audit' },
      { label: 'Template pack', type: 'select', options: ['Corporate login', 'SaaS reset', 'Invoice lure', 'Shipping notice', 'Security alert'] },
      { label: 'Redirect domain', type: 'text', placeholder: 'login-secure.example' },
      { label: 'Auto-rotate links', type: 'toggle', value: true }
    ]
  }
};

function renderForm(tool) {
  const preset = formPresets[tool.type] || formPresets.scan;
  const summaryItems = (preset.summary || []).map((item) => `<li>${item}</li>`).join('');
  const fieldsHtml = preset.fields.map((field) => {
    if (field.type === 'select') {
      const options = field.options.map((opt) => `<option value="${opt}">${opt}</option>`).join('');
      return `<div class="form-group"><label>${field.label}</label><select data-required="true" data-field="${field.label}"><option value="" disabled selected>Select...</option>${options}</select></div>`;
    }
    if (field.type === 'range') {
      return `<div class="form-group"><label>${field.label}</label><input class="slider" type="range" min="${field.min}" max="${field.max}" value="${field.value}" data-field="${field.label}"></div>`;
    }
    if (field.type === 'toggle') {
      return `<div class="form-group toggle"><input type="checkbox" ${field.value ? 'checked' : ''} data-field="${field.label}"><label>${field.label}</label></div>`;
    }
    return `<div class="form-group"><label>${field.label}</label><input type="${field.type}" placeholder="${field.placeholder || ''}" data-required="true" data-field="${field.label}"></div>`;
  }).join('');
  modalForm.innerHTML = `
    <h4>${preset.title}</h4>
    <ul class="module-summary">${summaryItems}</ul>
    ${fieldsHtml}
    <div class="helper-text">All inputs remain on-device in this simulated console.</div>
    <div class="action-row">
      <button class="action-btn" type="button" data-action="engage">Engage Module</button>
      <button class="secondary-btn" type="button" data-action="pause">Pause</button>
      <button class="ghost-btn" type="button" data-action="reset">Reset</button>
    </div>
  `;
}

function collectConfig() {
  const config = {};
  modalForm.querySelectorAll('[data-field]').forEach((field) => {
    if (field.type === 'checkbox') {
      config[field.dataset.field] = field.checked ? 'Enabled' : 'Disabled';
    } else if (field.type === 'range') {
      config[field.dataset.field] = field.value;
    } else {
      config[field.dataset.field] = field.value.trim();
    }
  });
  return config;
}

function setFormDisabled(disabled) {
  modalForm.querySelectorAll('input, select, textarea').forEach((field) => {
    field.disabled = disabled;
  });
}

function renderContextLogLine() {
  const base = renderLogLine(logTemplates[currentProfile.type] || logTemplates.default);
  const target = currentConfig['Target username / email / phone']
    || currentConfig['Target email']
    || currentConfig['Target URL / IP']
    || currentConfig['Target IP / handle']
    || currentConfig['Target range']
    || 'target';
  const platform = currentConfig.Platform || currentConfig.Provider || currentConfig['Target OS'] || 'stack';
  const details = Math.random() > 0.6 ? ` :: target=${target}` : '';
  const channel = Math.random() > 0.6 ? ` :: channel=${platform}` : '';
  return `${base}${details}${channel}`;
}

function engageModule(tool) {
  const requiredFields = modalForm.querySelectorAll('[data-required="true"]');
  let hasErrors = false;
  const missingFields = [];
  requiredFields.forEach((field) => {
    const isEmpty = field.value.trim() === '';
    field.classList.toggle('field-error', isEmpty);
    if (isEmpty) {
      hasErrors = true;
      if (field.dataset.field) {
        missingFields.push(field.dataset.field);
      }
    }
  });
  if (hasErrors) {
    const missingLabel = missingFields.length ? `Missing: ${missingFields.slice(0, 2).join(', ')}${missingFields.length > 2 ? '…' : ''}.` : 'Missing required inputs.';
    modalSubtitle.textContent = `${missingLabel} Complete highlighted fields.`;
    modalSubtitle.style.color = '#f0b45c';
    return;
  }
  modalSubtitle.style.color = '';
  closeIntervals();
  moduleActive = true;
  moduleState = 'running';
  currentConfig = collectConfig();
  setFormDisabled(true);
  playTypingSound();
  modalSubtitle.textContent = `Engaging ${tool.name} — initializing controls for ${currentConfig.Platform || currentConfig.Provider || 'selected'}...`;
  attemptCount = 0;
  currentProgress = 0;
  progressLabel.textContent = `${currentProfile.counterLabel}: 0`;
  progressPercent.textContent = '0%';
  modalLogs.unshift(`>> ENGAGE ${tool.name.toUpperCase()} :: session ${randomHex(6).toUpperCase()}`);
  modalLogs.unshift(`CONFIG :: ${Object.entries(currentConfig).slice(0, 3).map(([key, value]) => `${key}=${value || 'n/a'}`).join(' | ')}`);
  modalLogs = modalLogs.slice(0, 18);
  terminalOutput.innerHTML = modalLogs.join('<br />');

  modalInterval = setInterval(() => {
    modalLogs.push(renderContextLogLine());
    if (modalLogs.length > 18) modalLogs.shift();
    terminalOutput.innerHTML = modalLogs.join('<br />');
  }, 350);

  statusInterval = setInterval(() => {
    const lines = currentProfile.statusLines || moduleProfiles.scan.statusLines;
    modalSubtitle.textContent = lines[Math.floor(Math.random() * lines.length)];
    if (Math.random() > 0.7) {
      modalSubtitle.textContent = '⚠ anomaly detected — rerouting payload...';
    }
  }, 2200);

  attemptInterval = setInterval(() => {
    attemptCount += Math.floor(Math.random() * 42) + 12;
    progressLabel.textContent = `${currentProfile.counterLabel}: ${attemptCount.toLocaleString()}`;
    if (Math.random() > 0.85) {
      modalLogs.push(`SUCCESS? candidate password: ${randomHex(4)}${randomHex(4)}...`);
    }
    if (modalLogs.length > 18) modalLogs.shift();
    terminalOutput.innerHTML = modalLogs.join('<br />');
  }, 900);

  progressInterval = setInterval(() => {
    const increment = Math.random() * 1.8 + 0.4;
    currentProgress = Math.min(currentProgress + increment, 97);
    if (currentProgress > 94 && Math.random() > 0.7) {
      currentProgress = Math.random() * 12 + 70;
    }
    progressPercent.textContent = `${currentProgress.toFixed(1)}%`;
  }, 1200);
}

function openModal(tool) {
  closeModalNow();
  moduleActive = false;
  moduleState = 'idle';
  currentProfile = { ...(moduleProfiles[tool.type] || moduleProfiles.scan), type: tool.type };
  modal.classList.toggle('kali-mail', tool.type === 'email');
  modalTitle.textContent = tool.name;
  modalSubtitle.textContent = 'Module idle — configure parameters and engage.';
  modalSubtitle.style.color = '';
  terminalOutput.innerHTML = '';
  statusGrid.innerHTML = '';
  renderForm(tool);
  modalForm.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      if (action === 'engage') {
        engageModule(tool);
      }
      if (action === 'pause') {
        if (moduleState === 'running') {
          closeIntervals();
          moduleState = 'paused';
          modalSubtitle.textContent = 'Module paused — resume or reset when ready.';
          modalSubtitle.style.color = '#f0b45c';
          modalLogs.unshift('>> PAUSE :: operator hold applied.');
          modalLogs = modalLogs.slice(0, 18);
          terminalOutput.innerHTML = modalLogs.join('<br />');
        }
      }
      if (action === 'reset') {
        closeIntervals();
        moduleState = 'idle';
        moduleActive = false;
        attemptCount = 0;
        currentProgress = 0;
        progressLabel.textContent = `${currentProfile.counterLabel}: 0`;
        progressPercent.textContent = '0%';
        modalSubtitle.textContent = 'Module reset — configure parameters and engage.';
        modalSubtitle.style.color = '';
        modalLogs = ['Module reset. Awaiting operator input...'];
        terminalOutput.innerHTML = modalLogs.join('<br />');
        setFormDisabled(false);
      }
    });
  });
  modal.classList.remove('hidden');
  playTypingSound();

  const statuses = [
    { label: 'Operation ID', value: `OP-${randomHex(6).toUpperCase()}` },
    { label: 'Latency', value: `${(Math.random() * 4 + 0.5).toFixed(2)} ms` },
    { label: 'Nodes engaged', value: Math.floor(Math.random() * 18) + 4 },
    ...(currentProfile.statusCards || []),
    { label: 'Cipher', value: 'AES-4096/ShadowTLS' }
  ];

  statuses.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'status-card';
    card.innerHTML = `<strong>${item.label}</strong><br/>${item.value}`;
    statusGrid.appendChild(card);
  });

  modalLogs = [];
  attemptCount = 0;
  currentProgress = 0;
  progressLabel.textContent = `${currentProfile.counterLabel}: 0`;
  progressPercent.textContent = '0%';
  modalLogs.push('Awaiting operator input... click “Engage Module” to begin.');
  terminalOutput.innerHTML = modalLogs.join('<br />');
}

function openLockedModal(toolName) {
  closeModalNow();
  modalTitle.textContent = `${toolName} Locked`;
  modalSubtitle.textContent = 'Not enough computing power connected with cloud to perform this task.';
  modalSubtitle.style.color = '#f0b45c';
  modalForm.innerHTML = `
    <div class="panel-banner">
      <h4>Access restricted</h4>
      <p>Link additional cloud compute nodes or downgrade the request queue.</p>
    </div>
  `;
  statusGrid.innerHTML = '';
  terminalOutput.innerHTML = 'REQUEST HALTED :: insufficient cloud compute credits.';
  progressLabel.textContent = 'Attempts: 0';
  progressPercent.textContent = '0%';
  modal.classList.remove('hidden');
}

function closeIntervals() {
  clearInterval(modalInterval);
  clearInterval(statusInterval);
  clearInterval(progressInterval);
  clearInterval(attemptInterval);
}

function closeModalNow() {
  modal.classList.add('hidden');
  modal.classList.remove('kali-mail');
  closeIntervals();
  moduleActive = false;
  moduleState = 'idle';
  currentConfig = {};
  setFormDisabled(false);
}

closeModal.addEventListener('click', closeModalNow);
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModalNow();
  }
});

const navModuleMap = {
  'Operations Hub': { type: 'payload', desc: 'Staging operations overview.' },
  'Signal Trace': { type: 'trace', desc: 'Route intelligence scanner.' },
  'Credential Vault': { type: 'password', desc: 'Secure credential analyzer.' },
  'Payload Sandbox': { type: 'network', desc: 'Traffic lab simulator.' },
  'Shadow Logs': { type: 'monitor', desc: 'Event stream observatory.' },
  'Quantum Relay': { type: 'network', desc: 'Quantum relay stabilization.' },
  'Forge Console': { type: 'payload', desc: 'Payload forge controls.' },
  'Synapse Grid': { type: 'monitor', desc: 'Signal lattice monitor.' }
};

const navButtons = Array.from(document.querySelectorAll('.nav button'));
const lockedNavCount = Math.min(2, Math.ceil(navButtons.length * 0.2));
navButtons
  .slice()
  .sort(() => Math.random() - 0.5)
  .slice(0, lockedNavCount)
  .forEach((button) => {
    button.classList.add('locked');
  });

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const label = button.textContent.trim();
    if (button.classList.contains('locked')) {
      openLockedModal(label);
      return;
    }
    const mapped = navModuleMap[label] || { type: 'monitor', desc: 'Section interface simulation.' };
    openModal({
      name: label,
      desc: mapped.desc,
      type: mapped.type
    });
  });
});

const feeds = [
  document.getElementById('intel-feed'),
  document.getElementById('node-feed'),
  document.getElementById('packet-feed')
];

function updateFeed(feed) {
  const lines = Array.from({ length: 6 }, () => renderLogLine());
  feed.innerHTML = lines.join('<br />');
}

feeds.forEach((feed) => updateFeed(feed));
setInterval(() => feeds.forEach((feed) => updateFeed(feed)), 2400);

const chart = document.getElementById('chart');
for (let i = 0; i < 6; i += 1) {
  const bar = document.createElement('div');
  bar.className = 'bar';
  chart.appendChild(bar);
}

setInterval(() => {
  document.getElementById('probe-count').textContent = String(Math.floor(Math.random() * 20) + 4).padStart(2, '0');
  document.getElementById('relay-count').textContent = Math.floor(Math.random() * 90) + 10;
  document.getElementById('drift-count').textContent = `${(Math.random() * 0.6 + 0.1).toFixed(2)} ms`;
  chart.querySelectorAll('.bar').forEach((bar) => {
    bar.style.height = `${Math.floor(Math.random() * 70) + 20}%`;
  });
}, 2000);

setInterval(() => {
  const now = new Date();
  uptime.textContent = now.toLocaleTimeString('en-US', { hour12: false });
}, 1000);

const envProfiles = ['Ubuntu 22.04 LTS', 'Kali 2024.1', 'Debian 12', 'Arch 6.7.4'];
const exitNodes = ['NL-42', 'DE-19', 'SG-07', 'US-88', 'SE-31'];
const meshNodes = [
  { ip: '185.42.17.91', location: 'London, UK' },
  { ip: '37.120.187.64', location: 'Frankfurt, Germany' },
  { ip: '91.219.212.118', location: 'Paris, France' },
  { ip: '5.62.42.230', location: 'Madrid, Spain' },
  { ip: '83.170.92.44', location: 'Oslo, Norway' },
  { ip: '103.21.244.91', location: 'Mumbai, India' },
  { ip: '64.233.160.0', location: 'New York, USA' },
  { ip: '45.33.32.156', location: 'Toronto, Canada' },
  { ip: '139.59.93.12', location: 'Singapore' },
  { ip: '52.64.42.112', location: 'Sydney, Australia' },
  { ip: '154.72.47.12', location: 'Nairobi, Kenya' },
  { ip: '181.214.198.9', location: 'São Paulo, Brazil' },
  { ip: '102.219.176.4', location: 'Cape Town, South Africa' },
  { ip: '186.2.163.19', location: 'Mexico City, Mexico' },
  { ip: '46.36.203.142', location: 'Dubai, UAE' }
];

let meshIndex = 0;

function updateMeshStatus() {
  const node = meshNodes[meshIndex % meshNodes.length];
  const latency = Math.floor(Math.random() * 22) + 14;
  const integrity = (Math.random() * 1.4 + 98.4).toFixed(1);
  if (meshIp) meshIp.textContent = node.ip;
  if (meshLocation) meshLocation.textContent = node.location;
  if (meshLatency) meshLatency.textContent = `${latency} ms`;
  if (meshIntegrity) meshIntegrity.textContent = `${integrity}%`;
  if (meshStatus) meshStatus.textContent = `Connected · ${node.location}`;
  meshIndex += 1;
}

updateMeshStatus();
setInterval(updateMeshStatus, 6500);

setInterval(() => {
  if (Math.random() > 0.75) {
    linuxEnv.textContent = envProfiles[Math.floor(Math.random() * envProfiles.length)];
  }
  cloudStatus.textContent = Math.random() > 0.1 ? 'Connected' : 'Rerouting';
  ipRotation.textContent = Math.random() > 0.2 ? 'Active' : 'Cycling';
  exitNode.textContent = exitNodes[Math.floor(Math.random() * exitNodes.length)];

  const baseLoad = moduleActive ? Math.random() * 25 + 55 : Math.random() * 30 + 15;
  const loadValue = Math.min(95, Math.round(baseLoad));
  sysLoad.textContent = `${loadValue}%`;
  loadBar.style.width = `${loadValue}%`;

  const baseTemp = moduleActive ? Math.random() * 10 + 58 : Math.random() * 6 + 42;
  tempReadout.textContent = `${baseTemp.toFixed(1)}°C`;
}, 1800);
