# API do Syntax

**Versão:** 0.1.0  
**Proprietário:** Mauricio Spark  
**Marca:** SparkMaurício  
**Linhagem:** SPARK  
**Copyright:** © 2026 / Mauricio Spark

## Visão Geral

O Syntax é uma aplicação client-side que não possui uma API REST tradicional. No entanto, expõe várias funções JavaScript que podem ser utilizadas para integrações e extensões.

## Estrutura de Dados

### Comando Git (Command Object)

```javascript
{
  id: 1,                    // Identificador único do comando
  categoria: "Início",      // Categoria do comando
  comando: "git init",      // Comando Git
  regex: "^git init$",      // Expressão regular para validação
  ajuda: "Descrição...",    // Texto de ajuda
  exemplo: "git init",      // Exemplo de uso
  nivel: 1,                 // Nível de dificuldade (1-3)
  titulo: "Título",         // Título do exercício
  descricao: "Descrição",  // Descrição detalhada (Markdown)
  objetivos: [              // Array de objetivos de aprendizado
    "Objetivo 1",
    "Objetivo 2"
  ]
}
```

### Objeto de Validação (Validation Object)

```javascript
{
  isValid: true/false,      // Se o comando é válido
  command: "git init",      // Comando digitado
  match: CommandObject,     // Objeto do comando correspondente
  similarity: 2,           // Distância de edição (fuzzy search)
  allSimilar: [            // Array de comandos similares
    { command: CommandObject, distance: 2 },
    { command: CommandObject, distance: 3 }
  ]
}
```

### Objeto de Progresso (Progress Object)

```javascript
{
  nivelAtual: 1,                // Nível atual do usuário
  comandosCorretos: [1, 2, 3]   // Array de IDs de comandos completados
}
```

## Funções Principais

### loadCommands()

**Descrição**: Carrega os comandos Git do arquivo JSON.

**Sintaxe**:
```javascript
async function loadCommands()
```

**Retorno**: Promise<void>

**Exemplo**:
```javascript
await loadCommands();
```

**Uso Interno**: Chamado automaticamente ao carregar a página.

---

### validateCommand(command)

**Descrição**: Valida um comando Git contra o banco de dados de comandos.

**Sintaxe**:
```javascript
function validateCommand(command: string): ValidationObject
```

**Parâmetros**:
- `command` (string): O comando Git a ser validado

**Retorno**: ValidationObject

**Exemplo**:
```javascript
const result = validateCommand("git init");
console.log(result.isValid); // true
```

**Comportamento**:
1. Validação exata usando regex
2. Busca difusa (Levenshtein) para comandos similares
3. Verificação de correspondência parcial
4. Retorna objeto com resultado da validação

---

### getCurrentExercise()

**Descrição**: Retorna o exercício atual baseado no nível e progresso do usuário.

**Sintaxe**:
```javascript
function getCurrentExercise(): CommandObject
```

**Retorno**: CommandObject

**Exemplo**:
```javascript
const exercise = getCurrentExercise();
console.log(exercise.titulo); // "Iniciando um Repositório Git"
```

**Comportamento**:
- Retorna o primeiro comando não completado do nível atual
- Se todos completados, retorna o último comando do nível

---

### updateInstructions()

**Descrição**: Atualiza o painel de instruções com o exercício atual.

**Sintaxe**:
```javascript
function updateInstructions(): void
```

**Retorno**: void

**Exemplo**:
```javascript
updateInstructions();
```

**Comportamento**:
- Busca o exercício atual
- Renderiza o conteúdo Markdown
- Atualiza o DOM do painel de instruções

---

### updateProgressUI()

**Descrição**: Atualiza a interface de progresso (barra de progresso, indicadores).

**Sintaxe**:
```javascript
function updateProgressUI(): void
```

**Retorno**: void

**Exemplo**:
```javascript
updateProgressUI();
```

**Comportamento**:
- Calcula progresso do nível atual
- Atualiza barra de progresso
- Atualiza indicadores de nível

---

### levelUp()

**Descrição**: Avança para o próximo nível quando o atual é completado.

**Sintaxe**:
```javascript
function levelUp(): void
```

**Retorno**: void

**Exemplo**:
```javascript
levelUp();
```

**Comportamento**:
- Incrementa nível atual
- Salva progresso
- Mostra animação de level up
- Atualiza instruções

---

### showHint()

**Descrição**: Exibe uma dica progressiva para o comando atual.

**Sintaxe**:
```javascript
function showHint(): void
```

**Retorno**: void

**Exemplo**:
```javascript
showHint();
```

**Comportamento**:
- Primeiro clique: descrição de ajuda
- Segundo clique: início da sintaxe
- Terceiro+ clique: exemplo completo

---

### hideHint()

**Descrição**: Esconde a dica exibida.

**Sintaxe**:
```javascript
function hideHint(): void
```

**Retorno**: void

**Exemplo**:
```javascript
hideHint();
```

**Comportamento**:
- Remove classe 'show' do elemento
- Limpa conteúdo após transição

---

### loadProgress()

**Descrição**: Carrega o progresso salvo do localStorage.

**Sintaxe**:
```javascript
function loadProgress(): void
```

**Retorno**: void

**Exemplo**:
```javascript
loadProgress();
```

**Comportamento**:
- Lê do localStorage
- Atualiza variáveis globais
- Restaura estado da aplicação

---

### saveProgress()

**Descrição**: Salva o progresso atual no localStorage.

**Sintaxe**:
```javascript
function saveProgress(): void
```

**Retorno**: void

**Exemplo**:
```javascript
saveProgress();
```

**Comportamento**:
- Serializa estado atual
- Salva no localStorage
- Persiste entre sessões

---

### findSimilarCommands(command, threshold)

**Descrição**: Encontra comandos similares usando algoritmo de Levenshtein.

**Sintaxe**:
```javascript
function findSimilarCommands(command: string, threshold: number): Array<{command: CommandObject, distance: number}>
```

**Parâmetros**:
- `command` (string): Comando a buscar
- `threshold` (number): Limite de distância (padrão: 3)

**Retorno**: Array de objetos com comando e distância

**Exemplo**:
```javascript
const similar = findSimilarCommands("git initt", 2);
console.log(similar[0].command.comando); // "git init"
console.log(similar[0].distance); // 1
```

---

### levenshteinDistance(str1, str2)

**Descrição**: Calcula a distância de edição entre duas strings.

**Sintaxe**:
```javascript
function levenshteinDistance(str1: string, str2: string): number
```

**Parâmetros**:
- `str1` (string): Primeira string
- `str2` (string): Segunda string

**Retorno**: number (distância de edição)

**Exemplo**:
```javascript
const distance = levenshteinDistance("git init", "git initt");
console.log(distance); // 1
```

---

### toggleInstructions()

**Descrição**: Alterna a visibilidade do painel de instruções.

**Sintaxe**:
```javascript
function toggleInstructions(): void
```

**Retorno**: void

**Exemplo**:
```javascript
toggleInstructions();
```

**Comportamento**:
- Alterna classe 'collapsed'
- Atualiza ícone do botão
- Anima transição

---

### getCommandsForLevel(level)

**Descrição**: Retorna todos os comandos de um nível específico.

**Sintaxe**:
```javascript
function getCommandsForLevel(level: number): CommandObject[]
```

**Parâmetros**:
- `level` (number): Nível desejado (1-3)

**Retorno**: Array de CommandObject

**Exemplo**:
```javascript
const level1Commands = getCommandsForLevel(1);
console.log(level1Commands.length); // 4
```

---

### getCommandsUpToLevel(level)

**Descrição**: Retorna todos os comandos até um nível específico (inclusive).

**Sintaxe**:
```javascript
function getCommandsUpToLevel(level: number): CommandObject[]
```

**Parâmetros**:
- `level` (number): Nível máximo

**Retorno**: Array de CommandObject

**Exemplo**:
```javascript
const commands = getCommandsUpToLevel(2);
console.log(commands.length); // 8 (nível 1 + nível 2)
```

---

### isLevelComplete(level)

**Descrição**: Verifica se todos os comandos de um nível foram completados.

**Sintaxe**:
```javascript
function isLevelComplete(level: number): boolean
```

**Parâmetros**:
- `level` (number): Nível a verificar

**Retorno**: boolean

**Exemplo**:
```javascript
if (isLevelComplete(1)) {
  levelUp();
}
```

---

## Variáveis Globais

### gitCommands
```javascript
let gitCommands = [];
```
Array contendo todos os comandos Git carregados do JSON.

### nivelAtual
```javascript
let nivelAtual = 1;
```
Nível atual do usuário (1-3).

### comandosCorretos
```javascript
let comandosCorretos = new Set();
```
Set contendo IDs dos comandos completados.

### maxLevel
```javascript
let maxLevel = 3;
```
Número máximo de níveis disponíveis.

### currentExerciseIndex
```javascript
let currentExerciseIndex = 0;
```
Índice do exercício atual dentro do nível.

### isInstructionsCollapsed
```javascript
let isInstructionsCollapsed = false;
```
Estado do painel de instruções (colapsado ou expandido).

### hintClickCount
```javascript
let hintClickCount = 0;
```
Contador de cliques no botão de dica.

## Elementos DOM

### Referências Principais
```javascript
const commandInput = document.getElementById('commandInput');
const outputArea = document.getElementById('outputArea');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const levelIndicator = document.getElementById('levelIndicator');
const headerLevelIndicator = document.getElementById('headerLevelIndicator');
const instructionsPanel = document.getElementById('instrucoes');
const toggleInstructionsBtn = document.getElementById('toggleInstructions');
const hintButton = document.getElementById('hintButton');
const hintDisplay = document.getElementById('hintDisplay');
```

## Event Listeners

### commandInput - keydown
```javascript
commandInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleCommand();
  }
});
```
Detecta tecla Enter para validar comando.

### commandInput - input
```javascript
commandInput.addEventListener('input', () => {
  // Validação em tempo real
  // Esconde dica se visível
});
```
Detecta mudanças no input para validação preview.

### toggleInstructionsBtn - click
```javascript
toggleInstructionsBtn.addEventListener('click', toggleInstructions);
```
 Alterna painel de instruções.

### hintButton - click
```javascript
hintButton.addEventListener('click', showHint);
```
Exibe dica progressiva.

## Integração Externa

### Acessando Funções via Console

Você pode acessar as funções do Syntax via console do navegador:

```javascript
// Ver progresso atual
console.log(nivelAtual);
console.log(Array.from(comandosCorretos));

// Resetar progresso
localStorage.removeItem('syntaxProgress');
location.reload();

// Validar comando manualmente
const result = validateCommand("git status");
console.log(result);

// Ver comandos disponíveis
console.log(getCommandsForLevel(1));
```

### Modificando Comandos

Para adicionar novos comandos, edite `json/commands.json`:

```json
{
  "id": 12,
  "categoria": "Nova Categoria",
  "comando": "git novo-comando",
  "regex": "^git novo-comando$",
  "ajuda": "Descrição da ajuda",
  "exemplo": "git novo-comando",
  "nivel": 1,
  "titulo": "Título do Comando",
  "descricao": "Descrição detalhada",
  "objetivos": ["Objetivo 1", "Objetivo 2"]
}
```

## Limitações

- **Client-side Only**: Não possui backend ou API REST
- **LocalStorage**: Progresso limitado ao navegador
- **Sem Autenticação**: Não possui sistema de login
- **Sem Persistência na Nuvem**: Dados não sincronizados entre dispositivos

## Segurança

- **XSS Prevention**: Função `escapeHtml()` para sanitização
- **No eval()**: Não usa eval() para execução dinâmica
- **CSP Ready**: Compatível com Content Security Policy
- **No External Data**: Todos os dados são estáticos

## Performance

- **Lazy Loading**: Comandos carregados sob demanda
- **Efficient DOM**: Atualizações seletivas do DOM
- **Cached Regex**: Expressões regulares compiladas
- **LocalStorage**: Cache local para persistência
