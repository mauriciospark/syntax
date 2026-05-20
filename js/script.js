/*
  ============================================================================
  PROPRIETÁRIO: Mauricio Spark
  MARCA: SparkMaurício
  PROJETO: Syntax
  VERSÃO: 0.2.0
  LINHAGEM: SPARK
  ============================================================================
  Documento de Planejamento de Escopo
  COPYRIGHT: © 2026  / Mauricio Spark.
  ============================================================================
*/

// ============================================================================
// SECTION: Configuration & Constants
// ============================================================================

// Git Commands Database - loaded from JSON file
let gitCommands = [];

/*
 * Regra fixa de níveis (10 questões por nível):
 *   Nível 1  → Questões  1–10
 *   Nível 2  → Questões 11–20
 *   Nível 3  → Questões 21–30
 *   Nível 4  → Questões 31–40
 *   Nível 5  → Questões 41–50
 *   Nível 6  → Questões 51–60
 *   Nível 7  → Questões 61–70
 *   Nível 8  → Questões 71–80
 *   Nível 9  → Questões 81–90
 *   Nível 10 → Questões 91–100
 */
const QUESTIONS_PER_LEVEL = 10;
const TOTAL_QUESTIONS = 100;
const maxLevel = TOTAL_QUESTIONS / QUESTIONS_PER_LEVEL;

// ============================================================================
// SECTION: Level Management Functions
// ============================================================================

function nivelFromQuestao(questao) {
    const q = Number(questao);
    if (!q || q < 1 || q > TOTAL_QUESTIONS) return 1;
    return Math.ceil(q / QUESTIONS_PER_LEVEL);
}

function questaoFromNivelAndIndex(nivel, indexInLevel) {
    return (nivel - 1) * QUESTIONS_PER_LEVEL + indexInLevel + 1;
}

function indexInLevelFromQuestao(questao) {
    return (Number(questao) - 1) % QUESTIONS_PER_LEVEL;
}

function questaoRangeForLevel(nivel) {
    const start = questaoFromNivelAndIndex(nivel, 0);
    return { start, end: start + QUESTIONS_PER_LEVEL - 1 };
}

function questaoBelongsToLevel(questao, nivel) {
    const { start, end } = questaoRangeForLevel(nivel);
    const q = Number(questao);
    return q >= start && q <= end;
}

function getActiveLevel() {
    return expandedLevel ?? nivelAtual;
}

// ============================================================================
// SECTION: Data Loading
// ============================================================================

// Load commands from JSON files (comandos.json + commands.json)
async function loadCommandsFromJSON() {
    try {
        const [comandosRes, commandsRes] = await Promise.all([
            fetch('json/comandos.json'),
            fetch('json/commands.json')
        ]);
        const comandos = await comandosRes.json();
        const commands = await commandsRes.json();
        const extraByQuestao = new Map(
            commands.map((c) => [Number(c.questao ?? c.id), c])
        );

        gitCommands = comandos
            .map((cmd, index) => {
                const questao = Number(cmd.questao) || index + 1;
                const nivel = nivelFromQuestao(questao);
                const extra = extraByQuestao.get(questao) || {};
                const titulo = extra.titulo || cmd.comando;
                const descricaoBase = extra.descricao || cmd.descricao;
                const objetivos = Array.isArray(extra.objetivos) ? extra.objetivos : [];

                if (cmd.nivel != null && cmd.nivel !== nivel) {
                    console.warn(
                        `Questão ${questao}: nivel ${cmd.nivel} no JSON ignorado; usando Nível ${nivel}`
                    );
                }

                return {
                    id: `git-cmd-${questao}`,
                    questao,
                    nivel,
                    comando: cmd.comando,
                    regex: cmd.regex,
                    titulo,
                    descricao: descricaoBase,
                    objetivos,
                    ajuda: extra.ajuda || cmd.descricao,
                    exemplo: extra.exemplo || cmd.exemploCorreto,
                    categoria: extra.categoria || 'Git',
                    exemploCorreto: cmd.exemploCorreto
                };
            })
            .sort((a, b) => a.questao - b.questao);

        if (gitCommands.length !== TOTAL_QUESTIONS) {
            console.warn(`Esperado ${TOTAL_QUESTIONS} questões; carregado ${gitCommands.length}`);
        }

        for (let nivel = 1; nivel <= maxLevel; nivel++) {
            const levelCmds = getCommandsForLevel(nivel);
            if (levelCmds.length !== QUESTIONS_PER_LEVEL) {
                const { start, end } = questaoRangeForLevel(nivel);
                console.warn(`Nível ${nivel} (Q.${start}–${end}): ${levelCmds.length} questões`);
            }
        }

        console.log(`Loaded ${gitCommands.length} commands from JSON`);
    } catch (error) {
        console.error('Error loading commands from JSON:', error);
        gitCommands = [];
    }
}

// ============================================================================
// SECTION: DOM Elements
// ============================================================================

const commandInput = document.getElementById('commandInput');
const outputArea = document.getElementById('outputArea');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const levelIndicator = document.getElementById('levelIndicator');
const headerLevelIndicator = document.getElementById('headerLevelIndicator');
const instructionsPanelContainer = document.getElementById('instrucoes');
const levelTrail = document.getElementById('levelTrail');
const toggleInstructionsBtn = document.getElementById('toggleInstructions');
const hintButton = document.getElementById('hintButton');
const hintDisplay = document.getElementById('hintDisplay');
const jewelCollection = document.getElementById('jewelCollection');
const jewelCount = document.getElementById('jewelCount');
const currentJewelGem = document.getElementById('currentJewelGem');
const currentJewelName = document.getElementById('currentJewelName');

// ============================================================================
// SECTION: Jewel Configuration
// ============================================================================

// Joias — uma por nível (10 questões cada); imagens em preciosas/*.png
const JEWELS = [
    { level: 1, name: 'Ágata', color: '#c0392b', highlight: '#ff6b6b', glow: 'rgba(192, 57, 43, 0.55)', image: 'preciosas/agata.png' },
    { level: 2, name: 'Aguamarinha', color: '#1abc9c', highlight: '#7bedd6', glow: 'rgba(26, 188, 156, 0.55)', image: 'preciosas/aguamarinha.png' },
    { level: 3, name: 'Amazonita', color: '#27ae60', highlight: '#7bed9f', glow: 'rgba(39, 174, 96, 0.55)', image: 'preciosas/amazonita.png' },
    { level: 4, name: 'Ametista', color: '#8e44ad', highlight: '#d6a2e8', glow: 'rgba(142, 68, 173, 0.55)', image: 'preciosas/ametista.png' },
    { level: 5, name: 'Ametrina Bolivianita', color: '#9b59b6', highlight: '#e8daef', glow: 'rgba(155, 89, 182, 0.55)', image: 'preciosas/ametrinabolivianita.png' },
    { level: 6, name: 'Andaluzita', color: '#e67e22', highlight: '#f5b041', glow: 'rgba(230, 126, 34, 0.55)', image: 'preciosas/andaluzita.png' },
    { level: 7, name: 'Apatita', color: '#2980b9', highlight: '#74b9ff', glow: 'rgba(41, 128, 185, 0.55)', image: 'preciosas/apatita.png' },
    { level: 8, name: 'Aventurina', color: '#16a085', highlight: '#55efc4', glow: 'rgba(22, 160, 133, 0.55)', image: 'preciosas/aventurina.png' },
    { level: 9, name: 'Benitoita', color: '#3498db', highlight: '#85c1e9', glow: 'rgba(52, 152, 219, 0.55)', image: 'preciosas/benitoita.png' },
    { level: 10, name: 'Berilo Verde', color: '#2ecc71', highlight: '#abebc6', glow: 'rgba(46, 204, 113, 0.55)', image: 'preciosas/beriloverde.png' }
];

// ============================================================================
// SECTION: Jewel Helper Functions
// ============================================================================

function getJewelConfig(level) {
    return JEWELS[level - 1] || JEWELS[0];
}

function hasJewel(level) {
    return earnedJewels.has(level);
}

// Initialize marked.js options
marked.setOptions({
    breaks: true,
    gfm: true
});

// ============================================================================
// SECTION: State Management
// ============================================================================

// Level system state
let nivelAtual = 1;
let maxUnlockedLevel = 1; // Track the highest unlocked level separately
let comandosCorretos = new Set(); // Track correct command IDs
let currentExerciseIndex = 0; // índice 0–9 dentro do nível atual
let isInstructionsCollapsed = false;
let hintClickCount = 0; // Track hint clicks for progressive hints
let expandedLevel = 1; // Track which level is currently expanded
let completedLevels = new Set();
let earnedJewels = new Set();

// ============================================================================
// SECTION: Progress Management
// ============================================================================

// Load progress from localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('syntaxProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        nivelAtual = progress.nivelAtual || 1;
        maxUnlockedLevel = progress.maxUnlockedLevel || 1;
        comandosCorretos = new Set(progress.comandosCorretos || []);
        expandedLevel = progress.expandedLevel || nivelAtual;
        completedLevels = new Set(progress.completedLevels || []);
        earnedJewels = new Set(progress.earnedJewels || progress.completedLevels || []);
    } else {
        // Initialize with default values
        nivelAtual = 1;
        maxUnlockedLevel = 1;
        expandedLevel = 1;
        currentExerciseIndex = 0;
        earnedJewels = new Set();
    }

    completedLevels.forEach((lvl) => earnedJewels.add(lvl));
    
    // Ensure nivelAtual is valid
    if (!nivelAtual || nivelAtual < 1 || nivelAtual > maxLevel) {
        nivelAtual = 1;
    }
    
    // Ensure maxUnlockedLevel is valid and at least nivelAtual
    if (!maxUnlockedLevel || maxUnlockedLevel < 1 || maxUnlockedLevel > maxLevel) {
        maxUnlockedLevel = nivelAtual;
    }
    if (maxUnlockedLevel < nivelAtual) {
        maxUnlockedLevel = nivelAtual;
    }
    
    // Ensure expandedLevel is always set to a valid level
    if (!expandedLevel || expandedLevel < 1 || expandedLevel > maxLevel) {
        expandedLevel = nivelAtual;
    }
    
    // Reset currentExerciseIndex if it's invalid
    const levelCommands = getCommandsForLevel(expandedLevel);
    if (currentExerciseIndex < 0 || currentExerciseIndex >= levelCommands.length) {
        currentExerciseIndex = 0;
    }
    
    // Reset to Level 1 if localStorage has corrupted data (e.g., nivelAtual = 5 with no progress)
    if (nivelAtual > 1 && comandosCorretos.size === 0) {
        nivelAtual = 1;
        maxUnlockedLevel = 1;
        expandedLevel = 1;
        currentExerciseIndex = 0;
        saveProgress();
    }
}

// Save progress to localStorage
function saveProgress() {
    const progress = {
        nivelAtual,
        maxUnlockedLevel,
        comandosCorretos: Array.from(comandosCorretos),
        expandedLevel,
        completedLevels: Array.from(completedLevels),
        earnedJewels: Array.from(earnedJewels)
    };
    localStorage.setItem('syntaxProgress', JSON.stringify(progress));
}

// ============================================================================
// SECTION: UI Rendering Functions
// ============================================================================

function renderJewelGem(level, size = 'md') {
    const jewel = getJewelConfig(level);
    const earned = hasJewel(level);
    return `
        <span
            class="jewel-gem jewel-gem--${size} ${earned ? 'jewel-gem--earned' : 'jewel-gem--locked'}"
            style="--jewel-color: ${jewel.color}; --jewel-highlight: ${jewel.highlight}; --jewel-glow: ${jewel.glow};"
            title="${earned ? `${jewel.name} — Nível ${level}` : `Nível ${level} — ainda não conquistada`}"
            aria-hidden="${earned ? 'false' : 'true'}"
        >
            <span class="jewel-gem__shine"></span>
            <span class="jewel-gem__core" style="background-image: url('${jewel.image}');"></span>
        </span>
    `;
}

function renderJewelCollection() {
    if (!jewelCollection) return;

    if (jewelCount) {
        jewelCount.textContent = `${earnedJewels.size}/${maxLevel}`;
    }

    let html = '';
    for (let i = 1; i <= maxLevel; i++) {
        const jewel = getJewelConfig(i);
        const earned = hasJewel(i);
        html += `
            <div class="jewel-slot ${earned ? 'jewel-slot--earned' : ''}" data-level="${i}"
                title="${earned ? jewel.name : `Nível ${i} — ${jewel.name}`}">
                ${renderJewelGem(i, 'xs')}
            </div>
        `;
    }
    jewelCollection.innerHTML = html;
    updateCurrentJewelBadge();
}

function updateCurrentJewelBadge() {
    const level = getActiveLevel();
    const jewel = getJewelConfig(level);
    if (currentJewelName) {
        currentJewelName.textContent = jewel.name;
    }
    if (currentJewelGem) {
        currentJewelGem.innerHTML = renderJewelGem(level, 'md');
    }
}

function awardJewel(level) {
    if (level < 1 || level > maxLevel || earnedJewels.has(level)) return false;
    earnedJewels.add(level);
    completedLevels.add(level);
    return true;
}

function showJewelUnlockAnimation(levelCompleted) {
    const jewel = getJewelConfig(levelCompleted);
    const { start, end } = questaoRangeForLevel(levelCompleted);
    const advancing = levelCompleted < maxLevel;
    const nextLevel = levelCompleted + 1;

    const animation = document.createElement('div');
    animation.className = 'jewel-unlock-animation';
    animation.innerHTML = `
        <div class="jewel-unlock-content">
            <div class="jewel-unlock-sparkles" aria-hidden="true"></div>
            <div class="jewel-unlock-gem-wrap">
                ${renderJewelGem(levelCompleted, 'xl')}
            </div>
            <p class="jewel-unlock-label">Joia conquistada!</p>
            <h2 class="jewel-unlock-name">${jewel.name}</h2>
            <p class="jewel-unlock-detail">Nível ${levelCompleted} · Questões ${start} a ${end}</p>
            <p class="jewel-unlock-subtitle">${
                advancing
                    ? `Nível ${nextLevel} desbloqueado!`
                    : 'Coleção completa — todas as 10 joias são suas!'
            }</p>
        </div>
    `;
    document.body.appendChild(animation);

    requestAnimationFrame(() => {
        animation.classList.add('show');
    });

    setTimeout(() => {
        animation.classList.remove('show');
        setTimeout(() => animation.remove(), 500);
    }, 3500);
}

// Lista de pedras preciosas disponíveis no diretório
let PRECIOUS_STONES = [];

// Carregar lista de pedras do arquivo JSON
async function loadPreciousStones() {
    try {
        const response = await fetch('json/pedas.json');
        const data = await response.text();
        // Extrair a constante pedrasSintax do arquivo
        const match = data.match(/const pedrasSintax = \[([\s\S]*?)\];/);
        if (match) {
            // Avaliar a expressão para obter o array
            const arrayString = 'const pedrasSintax = [' + match[1] + '];';
            eval(arrayString);
            PRECIOUS_STONES = pedrasSintax;
            console.log(`Loaded ${PRECIOUS_STONES.length} precious stones from JSON`);
        }
    } catch (error) {
        console.error('Error loading precious stones:', error);
        // Fallback para lista hardcoded se falhar
        PRECIOUS_STONES = [
            'agata.png', 'aguamarinha.png', 'amazonita.png', 'ambar.png', 'ametista.png',
            'ametrinabolivianita.png', 'amolita.png', 'andaluzita.png', 'apatita.png', 'aventurina.png',
            'azeviche.png', 'benitoita.png', 'beriloverde.png', 'calcedonias.png', 'charoita.png',
            'cianita.png', 'citrino.png', 'coral.png', 'cornalina.png', 'crisoprásio.png',
            'diamante.png', 'diopside.png', 'esmeralda.png', 'esmeraldatrapiche.png', 'fluorita.png',
            'gemasorganicaseespeciais.png', 'goshenita.png', 'grandidierita.png', 'heliodoro.png', 'heliotropio.png',
            'hematita.png', 'jaspe.png', 'jeremejevita.png', 'larimar.png', 'moldavita.png',
            'morganita.png', 'musgravite.png', 'obsidianaflocodeneve.png', 'obsidianita.png', 'onix.png',
            'painita.png', 'pedradalua.png', 'pedradosol.png', 'perolabranca.png', 'perolanegra.png',
            'pirita.png', 'poudretteita.png', 'quartzofume.png', 'quartzorosa.png', 'quartzorutilado.png',
            'quartzos.png', 'quartzoturmalinado.png', 'rodocrosita.png', 'rodonita.png', 'rubi.png',
            'safira.png', 'safiraestrela.png', 'safirapadparadscha.png', 'serendibita.png', 'sugilita.png',
            'taaffeita.png', 'tectita.png', 'titanita.png', 'variedadesdeberiloecorindon.png'
        ];
    }
}

// Função para mostrar uma pedra aleatória por 5 segundos quando a resposta estiver correta
function showRandomStoneAnimation() {
    if (PRECIOUS_STONES.length === 0) {
        console.warn('No precious stones loaded');
        return;
    }
    
    const randomStone = PRECIOUS_STONES[Math.floor(Math.random() * PRECIOUS_STONES.length)];
    
    // Verificar se é um objeto (novo formato) ou string (formato antigo)
    let stoneFile, stoneName;
    if (typeof randomStone === 'object' && randomStone.arquivo) {
        stoneFile = `${randomStone.arquivo}.png`;
        stoneName = randomStone.nome;
    } else {
        stoneFile = randomStone;
        stoneName = randomStone.replace('.png', '').replace(/([A-Z])/g, ' $1').trim();
    }
    
    const animation = document.createElement('div');
    animation.className = 'stone-animation';
    animation.innerHTML = `
        <div class="stone-animation-content">
            <div class="stone-sparkles" aria-hidden="true"></div>
            <div class="stone-image-wrap">
                <img src="preciosas/${stoneFile}" alt="${stoneName}" class="stone-image">
            </div>
            <p class="stone-label">✨ ${stoneName} ✨</p>
        </div>
    `;
    document.body.appendChild(animation);

    requestAnimationFrame(() => {
        animation.classList.add('show');
    });

    setTimeout(() => {
        animation.classList.remove('show');
        setTimeout(() => animation.remove(), 500);
    }, 5000);
}

// Questões do nível pelo intervalo fixo (ex.: Nível 2 → Q.11–20)
function getCommandsForLevel(level) {
    const { start, end } = questaoRangeForLevel(level);
    return gitCommands.filter((cmd) => cmd.questao >= start && cmd.questao <= end);
}

// Get commands for all levels up to a specific level
function getCommandsUpToLevel(level) {
    const { end } = questaoRangeForLevel(level);
    return gitCommands.filter((cmd) => cmd.questao <= end);
}

// Check if all commands of current level are completed
function isLevelComplete(level) {
    const levelCommands = getCommandsForLevel(level);
    return levelCommands.every(cmd => comandosCorretos.has(cmd.comando));
}

// Render level trail
function renderLevelTrail() {
    if (!levelTrail) return;
    
    let html = '<div class="level-trail-container">';
    
    for (let i = 1; i <= maxLevel; i++) {
        const isCompleted = isLevelComplete(i);
        const isUnlocked = i <= maxUnlockedLevel;
        const isExpanded = expandedLevel === i;
        const levelCommands = getCommandsForLevel(i);
        const completedCount = levelCommands.filter(cmd => comandosCorretos.has(cmd.comando)).length;
        const { start: qStart, end: qEnd } = questaoRangeForLevel(i);
        const jewel = getJewelConfig(i);
        
        html += `
            <div class="level-item ${isCompleted ? 'completed' : ''} ${isUnlocked ? 'unlocked' : 'locked'} ${isExpanded ? 'expanded' : ''}" data-level="${i}">
                <div class="level-header" role="button" tabindex="0" data-level="${i}"
                    aria-expanded="${isExpanded}" aria-label="Nível ${i}, ${jewel.name}">
                    <div class="level-number ${hasJewel(i) ? 'level-number--jewel' : ''}">
                        ${hasJewel(i) ? renderJewelGem(i, 'sm') : i}
                    </div>
                    <div class="level-item__info">
                        <span class="level-title">Nível ${i} · ${jewel.name}</span>
                        <span class="level-range">Q. ${qStart}–${qEnd}</span>
                        <span class="level-progress">${completedCount}/10</span>
                    </div>
                    <div class="level-chevron">
                        ${isExpanded ? '▼' : '▶'}
                    </div>
                </div>
                ${isExpanded ? `
                    <div class="level-questions">
                        ${levelCommands.map((cmd, index) => {
                            const isQuestionCompleted = comandosCorretos.has(cmd.comando);
                            const isCurrentQuestion = i === expandedLevel && index === currentExerciseIndex;
                            return `
                                <div class="question-item ${isQuestionCompleted ? 'completed' : ''} ${isCurrentQuestion ? 'current' : ''}"
                                    data-level="${i}" data-question="${index}" role="button" tabindex="0"
                                    aria-label="Questão ${cmd.questao}: ${cmd.comando}">
                                    <span class="question-number">${cmd.questao}</span>
                                    <span class="question-command">${cmd.comando}</span>
                                    ${isQuestionCompleted ? '<span class="question-status" aria-hidden="true">✓</span>' : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    html += '</div>';
    levelTrail.innerHTML = html;
    bindLevelTrailEvents();
}

function selectQuestion(level, questionIndex) {
    if (level > maxUnlockedLevel) return;
    expandedLevel = level;
    currentExerciseIndex = questionIndex;
    saveProgress();
    renderLevelTrail();
    updateProgressUI();
    hintClickCount = 0;
    hideHint();
    commandInput?.focus();
}

function bindLevelTrailEvents() {
    if (!levelTrail) return;

    levelTrail.querySelectorAll('.level-header').forEach((header) => {
        const level = Number(header.dataset.level);
        const activate = () => toggleLevel(level);
        header.addEventListener('click', activate);
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activate();
            }
        });
    });

    levelTrail.querySelectorAll('.question-item').forEach((item) => {
        const level = Number(item.dataset.level);
        const questionIndex = Number(item.dataset.question);
        const activate = () => selectQuestion(level, questionIndex);
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            activate();
        });
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activate();
            }
        });
    });
}

// Toggle level expansion
function toggleLevel(level) {
    // Only allow expanding unlocked levels
    if (level > maxUnlockedLevel) return;
    
    // If clicking on a different level, switch to it
    if (expandedLevel !== level) {
        expandedLevel = level;
        // Reset exercise index when switching levels
        const levelCommands = getCommandsForLevel(level);
        for (let i = 0; i < levelCommands.length; i++) {
            if (!comandosCorretos.has(levelCommands[i].comando)) {
                currentExerciseIndex = i;
                break;
            }
        }
        // If all completed, set to last one
        if (currentExerciseIndex === 0 && comandosCorretos.has(levelCommands[0].comando)) {
            currentExerciseIndex = levelCommands.length - 1;
        }
    } else {
        expandedLevel = null;
    }
    
    saveProgress();
    renderLevelTrail();
    updateProgressUI();
}

// Ao completar as 10 questões do nível: joia + avanço (se houver próximo nível)
function levelUp() {
    const levelFinished = nivelAtual;
    if (!isLevelComplete(levelFinished)) return;

    const newJewel = awardJewel(levelFinished);
    if (newJewel) {
        showJewelUnlockAnimation(levelFinished);
    }

    if (levelFinished < maxLevel) {
        nivelAtual = levelFinished + 1;
        maxUnlockedLevel = nivelAtual;
        expandedLevel = nivelAtual;
        currentExerciseIndex = 0;
    }

    saveProgress();
    updateProgressUI();
    renderLevelTrail();
    hintClickCount = 0;
    hideHint();
}

// Update progress UI
function updateProgressUI() {
    const levelCommands = getCommandsForLevel(getActiveLevel());
    const completedInLevel = levelCommands.filter(cmd => comandosCorretos.has(cmd.comando)).length;
    const totalInLevel = levelCommands.length;
    const progress = totalInLevel > 0 ? (completedInLevel / totalInLevel) * 100 : 0;
    
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    if (progressText) {
        const currentLevel = getActiveLevel();
        const levelCommands = getCommandsForLevel(currentLevel);
        const exercise = levelCommands[currentExerciseIndex];
        const globalQuestion = exercise?.questao ?? questaoFromNivelAndIndex(currentLevel, currentExerciseIndex);
        progressText.textContent = `Questão ${globalQuestion}/${TOTAL_QUESTIONS}`;
    }
    
    if (levelIndicator) {
        levelIndicator.textContent = `Nível ${getActiveLevel()}`;
    }
    
    if (headerLevelIndicator) {
        headerLevelIndicator.textContent = nivelAtual;
    }
    
    renderLevelTrail();
    renderJewelCollection();
}

// Get current exercise based on level and progress
function getCurrentExercise() {
    const currentLevel = getActiveLevel();
    const levelCommands = getCommandsForLevel(currentLevel);
    // Find the first uncompleted command in the current level
    for (let i = 0; i < levelCommands.length; i++) {
        if (!comandosCorretos.has(levelCommands[i].comando)) {
            currentExerciseIndex = i;
            return levelCommands[i];
        }
    }
    // If all commands in level are completed, return the last one
    currentExerciseIndex = levelCommands.length - 1;
    return levelCommands[levelCommands.length - 1];
}

// Move to next exercise
function moveToNextExercise() {
    const currentLevel = getActiveLevel();
    const levelCommands = getCommandsForLevel(currentLevel);
    const completedInLevel = levelCommands.filter(cmd => comandosCorretos.has(cmd.comando)).length;
    
    if (completedInLevel < levelCommands.length) {
        hintClickCount = 0;
        hideHint();
    }
}

// Toggle instructions panel
function toggleInstructions() {
    isInstructionsCollapsed = !isInstructionsCollapsed;
    const icon = toggleInstructionsBtn?.querySelector('.panel__collapse-icon');

    if (isInstructionsCollapsed) {
        instructionsPanelContainer.classList.add('collapsed');
        toggleInstructionsBtn?.classList.add('rotated');
        if (icon) icon.textContent = '▶';
        toggleInstructionsBtn?.setAttribute('aria-expanded', 'false');
    } else {
        instructionsPanelContainer.classList.remove('collapsed');
        toggleInstructionsBtn?.classList.remove('rotated');
        if (icon) icon.textContent = '◀';
        toggleInstructionsBtn?.setAttribute('aria-expanded', 'true');
    }
    
    // Focus input when expanding
    if (!isInstructionsCollapsed) {
        setTimeout(() => commandInput.focus(), 300);
    }
}

// Show hint
function showHint() {
    const exercise = getCurrentExercise();
    if (!exercise) return;
    
    hintClickCount++;
    let hintText = '';
    
    if (hintClickCount === 1) {
        // First click: subtle hint
        hintText = exercise.ajuda;
    } else if (hintClickCount === 2) {
        // Second click: more specific (show part of syntax)
        const commandParts = exercise.comando.split(' ');
        hintText = `Sintaxe começa com: \`${commandParts[0]}\``;
    } else {
        // Third+ click: show full example
        hintText = `Exemplo completo: \`${exercise.exemplo}\``;
    }
    
    hintDisplay.innerHTML = `<p>${hintText}</p>`;
    hintDisplay.classList.add('show');
}

// Hide hint
function hideHint() {
    hintDisplay.classList.remove('show');
    setTimeout(() => {
        hintDisplay.innerHTML = '';
    }, 300);
}


// Levenshtein Distance Algorithm for fuzzy search
function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],      // deletion
                    dp[i][j - 1],      // insertion
                    dp[i - 1][j - 1]   // substitution
                );
            }
        }
    }

    return dp[m][n];
}

// Find similar commands using fuzzy search (nível ativo)
function findSimilarCommands(command, threshold = 3) {
    const trimmedCommand = command.trim().toLowerCase();
    const similar = [];
    const availableCommands = getCommandsForLevel(getActiveLevel());

    for (const gitCommand of availableCommands) {
        const commandName = gitCommand.comando.toLowerCase();
        const distance = levenshteinDistance(trimmedCommand, commandName);
        
        if (distance <= threshold) {
            similar.push({
                command: gitCommand,
                distance: distance
            });
        }
    }

    // Sort by distance (closest match first)
    similar.sort((a, b) => a.distance - b.distance);
    
    return similar;
}

// Validate command: acerto só na questão atual; dicas no nível ativo
function validateCommand(command) {
    const trimmedCommand = command.trim();
    
    if (!trimmedCommand) {
        return {
            isValid: false,
            command: trimmedCommand,
            match: null,
            similarity: null
        };
    }

    const currentExercise = getCurrentExercise();
    if (!currentExercise) {
        return {
            isValid: false,
            command: trimmedCommand,
            match: null,
            similarity: null
        };
    }

    const activeLevel = getActiveLevel();
    const levelCommands = getCommandsForLevel(activeLevel);
    const unlockedCommands = getCommandsUpToLevel(nivelAtual);

    const currentRegex = new RegExp(currentExercise.regex);
    if (currentRegex.test(trimmedCommand)) {
        return {
            isValid: true,
            command: trimmedCommand,
            match: currentExercise,
            similarity: null
        };
    }

    // Comando certo, mas de outra questão (mesmo nível ou nível desbloqueado)
    for (const gitCommand of unlockedCommands) {
        if (gitCommand.questao === currentExercise.questao) continue;
        const regex = new RegExp(gitCommand.regex);
        if (regex.test(trimmedCommand)) {
            return {
                isValid: false,
                command: trimmedCommand,
                match: gitCommand,
                similarity: null,
                reason: 'wrong_question',
                expectedQuestao: currentExercise.questao
            };
        }
    }

    const similarCommands = findSimilarCommands(trimmedCommand);
    
    if (similarCommands.length > 0) {
        return {
            isValid: false,
            command: trimmedCommand,
            match: similarCommands[0].command,
            similarity: similarCommands[0].distance,
            allSimilar: similarCommands.slice(0, 3)
        };
    }

    const commandParts = trimmedCommand.split(' ');
    const baseCommand = commandParts[0] + ' ' + (commandParts[1] || '');
    
    for (const gitCommand of levelCommands) {
        const gitCommandParts = gitCommand.comando.split(' ');
        if (gitCommandParts[0] === commandParts[0] || 
            (gitCommandParts[0] + ' ' + gitCommandParts[1]) === baseCommand) {
            return {
                isValid: false,
                command: trimmedCommand,
                match: gitCommand,
                similarity: null,
                reason: 'syntax_error'
            };
        }
    }

    return {
        isValid: false,
        command: trimmedCommand,
        match: null,
        similarity: null
    };
}

// ============================================================================
// SECTION: Result Display Functions
// ============================================================================

// Create result element for correct command
function createCorrectResult(command, match) {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'command-result correct';
    
    const category = match ? match.categoria : '';
    
    resultDiv.innerHTML = `
        <div class="result-header correct">
            <span>✓</span>
            <span>Comando correto!</span>
            ${category ? `<span class="category-badge">${escapeHtml(category)}</span>` : ''}
        </div>
        <div class="result-command">${escapeHtml(command)}</div>
        <div class="success-message">
            <p>✨ Perfeito! A sintaxe está correta.</p>
        </div>
    `;
    
    return resultDiv;
}

// Render error with Markdown formatting and progressive hints
function renderizarErro(comandoDigitado, comandoSugerido, similarity = null, allSimilar = null, reason = null, expectedQuestao = null) {
    let whyWrong, suggestion, explanation;
    const hintLevel = getActiveLevel();

    if (reason === 'wrong_question' && expectedQuestao != null) {
        const current = getCurrentExercise();
        whyWrong = `✓ Sintaxe correta, mas esta é a **Questão ${comandoSugerido?.questao ?? '?'}**. Você está na **Questão ${expectedQuestao}**.`;
        suggestion = current
            ? `Comando esperado agora: \`${escapeHtml(current.exemploCorreto || current.comando)}\``
            : 'Volte à questão atual na trilha.';
        explanation = current?.ajuda || '';
        const markdownContent = `## Por que não avançou\n\n${whyWrong}\n\n## Sugestão\n\n${suggestion}\n\n## Explicação\n\n${explanation}`;
        return marked.parse(markdownContent);
    }
    
    // Progressive hints based on level
    if (hintLevel === 1) {
        // Level 1: Extremely detailed and didactic
        whyWrong = similarity !== null 
            ? `🔍 **Erro de digitação detectado!**\n\nVocê digitou \`${escapeHtml(comandoDigitado)}\`, mas o comando correto é muito parecido. A distância de edição é de ${similarity} caractere${similarity > 1 ? 's' : ''}. Isso significa que você está muito perto da resposta correta!`
            : `📝 **Sintaxe incorreta ou comando incompleto.**\n\nNão se preocupe, isso acontece com todos quando estão aprendendo. Vamos analisar juntos o que pode estar errado.`;
        
        suggestion = comandoSugerido 
            ? `💡 **Sugestão detalhada:**\n\nO comando correto é: \`${escapeHtml(comandoSugerido.exemplo)}\`\n\nObserve atentamente a sintaxe e tente novamente.`
            : `🤔 **Comando não reconhecido.**\n\nEste comando ainda não está disponível no nível atual. Continue praticando os comandos do Nível ${hintLevel} para desbloquear mais!`;
        
        explanation = comandoSugerido 
            ? `📚 **Explicação completa:**\n\n${comandoSugerido.ajuda}\n\n**Dica:** Lembre-se que comandos Git seguem um padrão. O primeiro comando é sempre \`git\`, seguido da ação específica.`
            : `📚 **Comandos disponíveis no Nível ${hintLevel}:**\n\n${getCommandsForLevel(hintLevel).map(c => `- \`${c.comando}\``).join('\n')}\n\nPratique estes comandos primeiro para avançar!`;
    } else if (hintLevel === 2) {
        // Level 2: More technical but still helpful
        whyWrong = similarity !== null 
            ? `Erro de digitação. Distância de edição: ${similarity} caractere${similarity > 1 ? 's' : ''}.`
            : 'Sintaxe incorreta ou comando incompleto.';
        
        suggestion = comandoSugerido 
            ? `Comando sugerido: \`${escapeHtml(comandoSugerido.exemplo)}\``
            : 'Comando não disponível no nível atual.';
        
        explanation = comandoSugerido 
            ? comandoSugerido.ajuda
            : `Comandos do Nível ${hintLevel}: ${getCommandsForLevel(hintLevel).map(c => c.comando).join(', ')}`;
    } else {
        // Level 3: Technical and discrete
        whyWrong = similarity !== null 
            ? `Edit distance: ${similarity}`
            : 'Syntax error.';
        
        suggestion = comandoSugerido 
            ? `Try: \`${escapeHtml(comandoSugerido.exemplo)}\``
            : 'Command not available.';
        
        explanation = comandoSugerido 
            ? comandoSugerido.ajuda
            : 'Check available commands for current level.';
    }
    
    // Format explanation as Markdown
    const markdownContent = `## Por que está errado

${whyWrong}

## Sugestão

${suggestion}

## Explicação

${explanation}

${allSimilar && allSimilar.length > 1 ? '### Outras sugestões:\n' + allSimilar.slice(1).map(s => `- \`${escapeHtml(s.command.exemplo)}\``).join('\n') : ''}`;
    
    return marked.parse(markdownContent);
}

// Create result element for incorrect command
function createIncorrectResult(command, match, similarity = null, allSimilar = null, reason = null, expectedQuestao = null) {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'command-result incorrect';
    
    const correctionHTML = renderizarErro(command, match, similarity, allSimilar, reason, expectedQuestao);
    
    resultDiv.innerHTML = `
        <div class="result-header incorrect">
            <span>✗</span>
            <span>Comando incorreto</span>
            ${match ? `<span class="category-badge">${escapeHtml(match.categoria)}</span>` : ''}
        </div>
        <div class="result-command">${escapeHtml(command)}</div>
        <div class="correction-card">
            ${correctionHTML}
        </div>
    `;
    
    return resultDiv;
}

// ============================================================================
// SECTION: Utility Functions
// ============================================================================

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================================================
// SECTION: Event Listeners and Initialization
// ============================================================================

// Handle command input
async function handleCommand() {
    const command = commandInput.value;
    
    if (!command.trim()) {
        return;
    }

    // Remove welcome message if it exists
    const welcomeMessage = outputArea.querySelector('.terminal__welcome, .welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }

    // Validate the command
    const validation = validateCommand(command);
    
    // Create and append the result
    let resultElement;
    if (validation.isValid) {
        resultElement = createCorrectResult(validation.command, validation.match);
        commandInput.classList.add('success');
        commandInput.classList.remove('error');
        
        // Show random stone animation for correct answer
        showRandomStoneAnimation();
        
        // Track correct answer
        if (validation.match && !comandosCorretos.has(validation.match.comando)) {
            comandosCorretos.add(validation.match.comando);
            saveProgress();
            updateProgressUI();
            moveToNextExercise();
            
            // Check if level is complete
            if (isLevelComplete(nivelAtual)) {
                setTimeout(() => levelUp(), 500);
            }
        }
    } else {
        resultElement = createIncorrectResult(
            validation.command, 
            validation.match, 
            validation.similarity,
            validation.allSimilar,
            validation.reason,
            validation.expectedQuestao
        );
        commandInput.classList.add('error');
        commandInput.classList.remove('success');
    }
    
    outputArea.appendChild(resultElement);
    
    // Scroll to bottom of output
    outputArea.scrollTop = outputArea.scrollHeight;
    
    // Clear input
    commandInput.value = '';
    
    // Remove input highlight after a delay
    setTimeout(() => {
        commandInput.classList.remove('success', 'error');
    }, 2000);
}

// Event listener for Enter key
commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleCommand();
    }
});

// Focus input on page load
window.addEventListener('load', async () => {
    await loadCommandsFromJSON();
    await loadPreciousStones();
    loadProgress();
    updateProgressUI();
    renderLevelTrail();
    renderJewelCollection();
    commandInput.focus();
});

// Toggle instructions button event listener
toggleInstructionsBtn.addEventListener('click', toggleInstructions);

// Hint button event listener
hintButton.addEventListener('click', showHint);

// Hide hint when user starts typing
commandInput.addEventListener('input', () => {
    if (hintDisplay.classList.contains('show')) {
        hideHint();
    }
});

// Keep focus on input when clicking anywhere in the terminal
document.querySelector('.terminal')?.addEventListener('click', () => {
    commandInput.focus();
});

// Expor para testes e depuração
window.toggleLevel = toggleLevel;
window.selectQuestion = selectQuestion;

// Add real-time validation feedback (optional - for instant feedback)
commandInput.addEventListener('input', () => {
    const command = commandInput.value.trim();
    
    if (command.length > 3) {
        const validation = validateCommand(command);
        
        if (validation.isValid) {
            commandInput.classList.add('success-preview');
            commandInput.classList.remove('error-preview');
        } else if (validation.match) {
            commandInput.classList.add('error-preview');
            commandInput.classList.remove('success-preview');
        } else {
            commandInput.classList.remove('success-preview', 'error-preview');
        }
    } else {
        commandInput.classList.remove('success-preview', 'error-preview');
    }
});
