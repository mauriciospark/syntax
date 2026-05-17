/*
  ============================================================================
  PROPRIETÁRIO: Mauricio Spark
  MARCA: SparkMaurício
  PROJETO: Syntax
  VERSÃO: 0.1.0
  LINHAGEM: SPARK
  ============================================================================
  Documento de Planejamento de Escopo
  COPYRIGHT: © 2026  / Mauricio Spark.
  ============================================================================
*/

// DOM Elements
const commandInput = document.getElementById('commandInput');
const outputArea = document.getElementById('outputArea');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const levelIndicator = document.getElementById('levelIndicator');
const headerLevelIndicator = document.getElementById('headerLevelIndicator');
const instructionsPanel = document.getElementById('instrucoes');
const instructionsPanelContainer = document.getElementById('instructionsPanel');
const toggleInstructionsBtn = document.getElementById('toggleInstructions');
const hintButton = document.getElementById('hintButton');
const hintDisplay = document.getElementById('hintDisplay');

// Initialize marked.js options
marked.setOptions({
    breaks: true,
    gfm: true
});

// Global variable to store commands loaded from JSON
let gitCommands = [];

// Level system state
let nivelAtual = 1;
let comandosCorretos = new Set(); // Track correct command IDs
let maxLevel = 3;
let currentExerciseIndex = 0; // Track current exercise within level
let isInstructionsCollapsed = false;
let hintClickCount = 0; // Track hint clicks for progressive hints

// Load progress from localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('syntaxProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        nivelAtual = progress.nivelAtual || 1;
        comandosCorretos = new Set(progress.comandosCorretos || []);
    }
}

// Save progress to localStorage
function saveProgress() {
    const progress = {
        nivelAtual,
        comandosCorretos: Array.from(comandosCorretos)
    };
    localStorage.setItem('syntaxProgress', JSON.stringify(progress));
}

// Get commands for current level
function getCommandsForLevel(level) {
    return gitCommands.filter(cmd => cmd.nivel === level);
}

// Get commands up to current level (including lower levels)
function getCommandsUpToLevel(level) {
    return gitCommands.filter(cmd => cmd.nivel <= level);
}

// Check if all commands of current level are completed
function isLevelComplete(level) {
    const levelCommands = getCommandsForLevel(level);
    return levelCommands.every(cmd => comandosCorretos.has(cmd.id));
}

// Level up logic
function levelUp() {
    if (nivelAtual < maxLevel) {
        nivelAtual++;
        saveProgress();
        showLevelUpAnimation();
        updateProgressUI();
        updateInstructions();
        // Reset hint on level up
        hintClickCount = 0;
        hideHint();
    }
}

// Show level up animation
function showLevelUpAnimation() {
    const animation = document.createElement('div');
    animation.className = 'level-up-animation';
    animation.innerHTML = `
        <div class="level-up-content">
            <div class="level-up-icon">🎉</div>
            <h2>LEVEL UP!</h2>
            <p>Você alcançou o Nível ${nivelAtual}</p>
            <p class="level-up-subtitle">Novos comandos desbloqueados!</p>
        </div>
    `;
    document.body.appendChild(animation);
    
    setTimeout(() => {
        animation.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        animation.classList.remove('show');
        setTimeout(() => animation.remove(), 500);
    }, 3000);
}

// Update progress UI
function updateProgressUI() {
    const levelCommands = getCommandsForLevel(nivelAtual);
    const completedInLevel = levelCommands.filter(cmd => comandosCorretos.has(cmd.id)).length;
    const totalInLevel = levelCommands.length;
    const progress = totalInLevel > 0 ? (completedInLevel / totalInLevel) * 100 : 0;
    
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${completedInLevel}/${totalInLevel} comandos`;
    }
    
    if (levelIndicator) {
        levelIndicator.textContent = `Nível ${nivelAtual}`;
    }
    
    if (headerLevelIndicator) {
        headerLevelIndicator.textContent = nivelAtual;
    }
}

// Get current exercise based on level and progress
function getCurrentExercise() {
    const levelCommands = getCommandsForLevel(nivelAtual);
    // Find the first uncompleted command in the current level
    for (let i = 0; i < levelCommands.length; i++) {
        if (!comandosCorretos.has(levelCommands[i].id)) {
            currentExerciseIndex = i;
            return levelCommands[i];
        }
    }
    // If all commands in level are completed, return the last one
    currentExerciseIndex = levelCommands.length - 1;
    return levelCommands[levelCommands.length - 1];
}

// Update instructions panel with current exercise
function updateInstructions() {
    if (!instructionsPanel) return;
    
    const exercise = getCurrentExercise();
    if (!exercise) {
        instructionsPanel.innerHTML = '<p>Carregando exercícios...</p>';
        return;
    }
    
    const markdownContent = `# ${exercise.titulo}

${exercise.descricao}

## Objetivos

${exercise.objetivos.map(obj => `- ${obj}`).join('\n')}

## Comando Alvo

\`\`${exercise.comando}\`\``;
    
    instructionsPanel.innerHTML = marked.parse(markdownContent);
}

// Move to next exercise
function moveToNextExercise() {
    const levelCommands = getCommandsForLevel(nivelAtual);
    const completedInLevel = levelCommands.filter(cmd => comandosCorretos.has(cmd.id)).length;
    
    if (completedInLevel < levelCommands.length) {
        updateInstructions();
        // Reset hint when moving to next exercise
        hintClickCount = 0;
        hideHint();
    }
}

// Toggle instructions panel
function toggleInstructions() {
    isInstructionsCollapsed = !isInstructionsCollapsed;
    
    if (isInstructionsCollapsed) {
        instructionsPanelContainer.classList.add('collapsed');
        toggleInstructionsBtn.classList.add('rotated');
        toggleInstructionsBtn.querySelector('.toggle-icon').textContent = '▶';
    } else {
        instructionsPanelContainer.classList.remove('collapsed');
        toggleInstructionsBtn.classList.remove('rotated');
        toggleInstructionsBtn.querySelector('.toggle-icon').textContent = '◀';
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

// Load commands from JSON file
async function loadCommands() {
    try {
        const response = await fetch('../json/comandos.json?v=${new Date().getTime()}');
        gitCommands = await response.json();
        loadProgress();
        updateProgressUI();
        updateInstructions();
    } catch (error) {
        console.error('Erro ao carregar comandos:', error);
        gitCommands = [];
    }
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

// Find similar commands using fuzzy search (only for current level)
function findSimilarCommands(command, threshold = 3) {
    const trimmedCommand = command.trim().toLowerCase();
    const similar = [];
    const availableCommands = getCommandsUpToLevel(nivelAtual);

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

// Validate command against Git commands database with fuzzy search
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

    // Only validate commands up to current level
    const availableCommands = getCommandsUpToLevel(nivelAtual);

    // First, try exact regex match
    for (const gitCommand of availableCommands) {
        const regex = new RegExp(gitCommand.regex);
        if (regex.test(trimmedCommand)) {
            return {
                isValid: true,
                command: trimmedCommand,
                match: gitCommand,
                similarity: null
            };
        }
    }

    // If no exact match, try fuzzy search for suggestions
    const similarCommands = findSimilarCommands(trimmedCommand);
    
    if (similarCommands.length > 0) {
        return {
            isValid: false,
            command: trimmedCommand,
            match: similarCommands[0].command,
            similarity: similarCommands[0].distance,
            allSimilar: similarCommands.slice(0, 3) // Return top 3 suggestions
        };
    }

    // Check for partial match (same base command)
    const commandParts = trimmedCommand.split(' ');
    const baseCommand = commandParts[0] + ' ' + (commandParts[1] || '');
    
    for (const gitCommand of availableCommands) {
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
function renderizarErro(comandoDigitado, comandoSugerido, similarity = null, allSimilar = null) {
    let whyWrong, suggestion, explanation;
    
    // Progressive hints based on level
    if (nivelAtual === 1) {
        // Level 1: Extremely detailed and didactic
        whyWrong = similarity !== null 
            ? `🔍 **Erro de digitação detectado!**\n\nVocê digitou \`${escapeHtml(comandoDigitado)}\`, mas o comando correto é muito parecido. A distância de edição é de ${similarity} caractere${similarity > 1 ? 's' : ''}. Isso significa que você está muito perto da resposta correta!`
            : `📝 **Sintaxe incorreta ou comando incompleto.**\n\nNão se preocupe, isso acontece com todos quando estão aprendendo. Vamos analisar juntos o que pode estar errado.`;
        
        suggestion = comandoSugerido 
            ? `💡 **Sugestão detalhada:**\n\nO comando correto é: \`${escapeHtml(comandoSugerido.exemplo)}\`\n\nObserve atentamente a sintaxe e tente novamente.`
            : `🤔 **Comando não reconhecido.**\n\nEste comando ainda não está disponível no nível atual. Continue praticando os comandos do Nível ${nivelAtual} para desbloquear mais!`;
        
        explanation = comandoSugerido 
            ? `📚 **Explicação completa:**\n\n${comandoSugerido.ajuda}\n\n**Dica:** Lembre-se que comandos Git seguem um padrão. O primeiro comando é sempre \`git\`, seguido da ação específica.`
            : `📚 **Comandos disponíveis no Nível ${nivelAtual}:**\n\n${getCommandsForLevel(nivelAtual).map(c => `- \`${c.comando}\``).join('\n')}\n\nPratique estes comandos primeiro para avançar!`;
    } else if (nivelAtual === 2) {
        // Level 2: More technical but still helpful
        whyWrong = similarity !== null 
            ? `Erro de digitação. Distância de edição: ${similarity} caractere${similarity > 1 ? 's' : ''}.`
            : 'Sintaxe incorreta ou comando incompleto.';
        
        suggestion = comandoSugerido 
            ? `Comando sugerido: \`${escapeHtml(comandoSugerido.exemplo)}\``
            : 'Comando não disponível no nível atual.';
        
        explanation = comandoSugerido 
            ? comandoSugerido.ajuda
            : `Comandos do Nível ${nivelAtual}: ${getCommandsForLevel(nivelAtual).map(c => c.comando).join(', ')}`;
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
function createIncorrectResult(command, match, similarity = null, allSimilar = null) {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'command-result incorrect';
    
    const correctionHTML = renderizarErro(command, match, similarity, allSimilar);
    
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

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Handle command input
async function handleCommand() {
    const command = commandInput.value;
    
    if (!command.trim()) {
        return;
    }

    // Remove welcome message if it exists
    const welcomeMessage = outputArea.querySelector('.welcome-message');
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
        
        // Track correct answer
        if (validation.match && !comandosCorretos.has(validation.match.id)) {
            comandosCorretos.add(validation.match.id);
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
            validation.allSimilar
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
    await loadCommands();
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
document.querySelector('.terminal').addEventListener('click', () => {
    commandInput.focus();
});

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
