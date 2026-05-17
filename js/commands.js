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

// Git Commands Database with validation regex and explanations
const gitCommands = [
    {
        id: 'git-init',
        nivel: 1,
        comando: 'git init',
        regex: /^git\s+init$/,
        titulo: 'Inicializando um Repositório Git',
        descricao: `# git init

O comando \`git init\` é usado para inicializar um novo repositório Git. Ele cria um subdiretório .git que contém todos os metadados necessários para o repositório.

## Quando usar
- Quando você está começando um novo projeto
- Quando deseja transformar um diretório existente em um repositório Git

## Exemplo
\`\`\`bash
git init
\`\`\``,
        objetivos: [
            'Inicializar um novo repositório Git',
            'Entender o conceito de repositório local',
            'Criar a estrutura .git no diretório'
        ],
        ajuda: 'Digite "git init" para inicializar um repositório Git no diretório atual.',
        exemplo: 'git init',
        categoria: 'Básico',
        exemploCorreto: 'git init'
    },
    {
        id: 'git-status',
        nivel: 1,
        comando: 'git status',
        regex: /^git\s+status$/,
        titulo: 'Verificando o Status do Repositório',
        descricao: `# git status

O comando \`git status\` mostra o estado do diretório de trabalho e do staging area. Ele informa quais arquivos foram modificados, adicionados ou deletados.

## Quando usar
- Para verificar o estado atual do repositório
- Antes de fazer um commit
- Para ver quais arquivos estão no staging area

## Exemplo
\`\`\`bash
git status
\`\`\`

## Saída típica
- **Untracked files**: arquivos não rastreados
- **Changes not staged for commit**: modificações não preparadas
- **Changes to be committed**: modificações preparadas para commit`,
        objetivos: [
            'Verificar o estado atual do repositório',
            'Identificar arquivos modificados',
            'Entender o conceito de staging area'
        ],
        ajuda: 'Digite "git status" para ver o estado atual do seu repositório Git.',
        exemplo: 'git status',
        categoria: 'Básico',
        exemploCorreto: 'git status'
    },
    {
        id: 'git-add',
        nivel: 1,
        comando: 'git add',
        regex: /^git\s+add(\s+\.|\s+[^\s]+)+$/,
        titulo: 'Adicionando Arquivos ao Staging',
        descricao: `# git add

O comando \`git add\` é usado para adicionar arquivos ao staging area (área de preparação). Isso prepara os arquivos para serem commitados.

## Sintaxe
\`\`\`bash
git add <arquivo-ou-diretorio>
\`\`\`

## Exemplos
\`\`\`bash
git add arquivo.txt
git add .
git add pasta/
\`\`\`

## Notas
- Use \`git add .\` para adicionar todos os arquivos modificados
- Use \`git add -A\` para adicionar todos os arquivos, incluindo os deletados`,
        objetivos: [
            'Adicionar arquivos ao staging area',
            'Preparar arquivos para commit',
            'Entender o fluxo de trabalho do Git'
        ],
        ajuda: 'Use "git add ." para adicionar todos os arquivos modificados ou "git add <arquivo>" para um arquivo específico.',
        exemplo: 'git add .',
        categoria: 'Básico',
        exemploCorreto: 'git add .'
    },
    {
        id: 'git-commit',
        nivel: 1,
        comando: 'git commit',
        regex: /^git\s+commit(\s+-m\s+"[^"]+"|\s+-am\s+"[^"]+"|\s+--message\s+"[^"]+")*$/,
        titulo: 'Criando um Commit',
        descricao: `# git commit

O comando \`git commit\` é usado para salvar as mudanças no repositório. Ele cria um novo commit com as mudanças que estão no staging area.

## Sintaxe
\`\`\`bash
git commit -m "mensagem do commit"
\`\`\`

## Exemplos
\`\`\`bash
git commit -m "Adiciona funcionalidade de login"
git commit -am "Corrige bug no formulário"
git commit --message "Atualiza documentação"
\`\`\`

## Notas
- A mensagem do commit deve ser clara e concisa
- Use \`-am\` para adicionar e commitar arquivos já rastreados
- Sempre inclua uma mensagem descritiva`,
        objetivos: [
            'Criar commits com mudanças',
            'Escrever mensagens de commit descritivas',
            'Salvar o progresso do projeto'
        ],
        ajuda: 'Use "git commit -m "sua mensagem"" para criar um commit com uma mensagem descritiva.',
        exemplo: 'git commit -m "Adiciona nova funcionalidade"',
        categoria: 'Básico',
        exemploCorreto: 'git commit -m "Adiciona nova funcionalidade"'
    },
    {
        id: 'git-branch',
        nivel: 2,
        comando: 'git branch',
        regex: /^git\s+branch(\s+-[dD]\s+[^\s]+|\s+-[a-zA-Z])?$/,
        titulo: 'Gerenciando Branches',
        descricao: `# git branch

O comando \`git branch\` é usado para criar, listar ou deletar branches (ramificações).

## Sintaxe
\`\`\`bash
git branch [opcoes] [nome-do-branch]
\`\`\`

## Exemplos
\`\`\`bash
git branch              # Lista todos os branches
git branch feature-x    # Cria um novo branch
git branch -d feature-x # Deleta um branch
git branch -a           # Lista todos os branches (remotos e locais)
\`\`\`

## Opções comuns
- \`-d\`: deleta um branch
- \`-a\`: lista todos os branches
- \`-r\`: lista apenas branches remotos`,
        objetivos: [
            'Criar novos branches',
            'Listar branches existentes',
            'Deletar branches não necessários'
        ],
        ajuda: 'Use "git branch" para listar branches ou "git branch <nome>" para criar um novo.',
        exemplo: 'git branch',
        categoria: 'Branching',
        exemploCorreto: 'git branch'
    },
    {
        id: 'git-checkout',
        nivel: 2,
        comando: 'git checkout',
        regex: /^git\s+checkout(\s+-b\s+[^\s]+|\s+[^\s]+)$/,
        titulo: 'Alternando entre Branches',
        descricao: `# git checkout

O comando \`git checkout\` é usado para alternar entre branches ou restaurar arquivos. Ele também pode criar novos branches.

## Sintaxe
\`\`\`bash
git checkout [opcoes] <branch-ou-arquivo>
\`\`\`

## Exemplos
\`\`\`bash
git checkout main       # Alterna para o branch main
git checkout -b feature # Cria e alterna para o branch feature
git checkout arquivo.txt # Restaura o arquivo para o último commit
\`\`\`

## Notas
- Use \`-b\` para criar um novo branch e alternar para ele
- Para alternar branches, os arquivos modificados devem ser commitados ou stashed`,
        objetivos: [
            'Alternar entre branches',
            'Criar e alternar para novos branches',
            'Restaurar arquivos de commits anteriores'
        ],
        ajuda: 'Use "git checkout <branch>" para alternar ou "git checkout -b <nome>" para criar e alternar.',
        exemplo: 'git checkout main',
        categoria: 'Branching',
        exemploCorreto: 'git checkout main'
    },
    {
        id: 'git-merge',
        nivel: 2,
        comando: 'git merge',
        regex: /^git\s+merge\s+[^\s]+$/,
        titulo: 'Integrando Mudanças com Merge',
        descricao: `# git merge

O comando \`git merge\` é usado para integrar mudanças de um branch para o branch atual.

## Sintaxe
\`\`\`bash
git merge <nome-do-branch>
\`\`\`

## Exemplos
\`\`\`bash
git merge feature-x
git merge main
\`\`\`

## Tipos de merge
- **Fast-forward**: quando o branch atual está atrás do branch sendo mergeado
- **Three-way merge**: quando os branches divergiram
- **Conflicts**: quando há conflitos que precisam ser resolvidos manualmente`,
        objetivos: [
            'Integrar mudanças de branches',
            'Resolver conflitos de merge',
            'Entender o fluxo de colaboração'
        ],
        ajuda: 'Use "git merge <branch>" para integrar as mudanças de um branch no branch atual.',
        exemplo: 'git merge feature-x',
        categoria: 'Branching',
        exemploCorreto: 'git merge feature-x'
    },
    {
        id: 'git-clone',
        nivel: 2,
        comando: 'git clone',
        regex: /^git\s+clone\s+(https?:\/\/[^\s]+|git@[^:]+:[^\s]+)$/,
        titulo: 'Clonando Repositórios',
        descricao: `# git clone

O comando \`git clone\` é usado para copiar um repositório Git existente. Ele cria uma cópia completa do repositório, incluindo todo o histórico.

## Sintaxe
\`\`\`bash
git clone <url-do-repositorio>
\`\`\`

## Exemplos
\`\`\`bash
git clone https://github.com/usuario/repositorio.git
git clone git@github.com:usuario/repositorio.git
\`\`\``,
        objetivos: [
            'Clonar repositórios remotos',
            'Obter cópias de projetos existentes',
            'Trabalhar com repositórios externos'
        ],
        ajuda: 'Use "git clone <url>" para copiar um repositório existente para sua máquina.',
        exemplo: 'git clone https://github.com/usuario/repositorio.git',
        categoria: 'Remoto',
        exemploCorreto: 'git clone https://github.com/usuario/repositorio.git'
    },
    {
        id: 'git-pull',
        nivel: 3,
        comando: 'git pull',
        regex: /^git\s+pull(\s+[^\s]+\s+[^\s]+)?$/,
        titulo: 'Atualizando com Mudanças Remotas',
        descricao: `# git pull

O comando \`git pull\` é usado para buscar e integrar mudanças de um repositório remoto para o branch atual.

## Sintaxe
\`\`\`bash
git pull [remote] [branch]
\`\`\`

## Exemplos
\`\`\`bash
git pull
git pull origin main
git pull upstream develop
\`\`\`

## Notas
- \`git pull\` é equivalente a \`git fetch\` seguido de \`git merge\`
- Use \`--rebase\` para fazer rebase em vez de merge
- Pode causar conflitos que precisam ser resolvidos`,
        objetivos: [
            'Buscar mudanças de repositórios remotos',
            'Atualizar o branch local',
            'Integrar mudanças da equipe'
        ],
        ajuda: 'Use "git pull" para buscar e integrar mudanças do repositório remoto.',
        exemplo: 'git pull origin main',
        categoria: 'Remoto',
        exemploCorreto: 'git pull origin main'
    },
    {
        id: 'git-push',
        nivel: 3,
        comando: 'git push',
        regex: /^git\s+push(\s+-[uU]\s+[^\s]+\s+[^\s]+|\s+[^\s]+\s+[^\s]+)?$/,
        titulo: 'Enviando Mudanças para Remoto',
        descricao: `# git push

O comando \`git push\` é usado para enviar commits locais para um repositório remoto.

## Sintaxe
\`\`\`bash
git push [remote] [branch]
\`\`\`

## Exemplos
\`\`\`bash
git push
git push origin main
git push -u origin feature-x
\`\`\`

## Opções comuns
- \`-u\` ou \`--set-upstream\`: configura o branch upstream
- \`--force\`: força o push (use com cuidado!)
- \`--all\`: envia todos os branches

## Notas
- Primeiro push de um branch geralmente requer \`-u\`
- Force push pode sobrescrever histórico remoto`,
        objetivos: [
            'Enviar commits para repositórios remotos',
            'Compartilhar mudanças com a equipe',
            'Configurar branches upstream'
        ],
        ajuda: 'Use "git push" para enviar seus commits locais para o repositório remoto.',
        exemplo: 'git push origin main',
        categoria: 'Remoto',
        exemploCorreto: 'git push origin main'
    },
    {
        id: 'git-log',
        nivel: 3,
        comando: 'git log',
        regex: /^git\s+log(\s+--[a-z]+)?$/,
        titulo: 'Visualizando Histórico de Commits',
        descricao: `# git log

O comando \`git log\` mostra o histórico de commits do repositório.

## Sintaxe
\`\`\`bash
git log [opcoes]
\`\`\`

## Exemplos
\`\`\`bash
git log
git log --oneline
git log --graph --all
git log -5
\`\`\`

## Opções comuns
- \`--oneline\`: mostra cada commit em uma linha
- \`--graph\`: mostra o grafo de commits
- \`--all\`: mostra todos os branches
- \`-n\`: limita o número de commits`,
        objetivos: [
            'Visualizar o histórico de commits',
            'Entender a evolução do projeto',
            'Rastrear mudanças ao longo do tempo'
        ],
        ajuda: 'Use "git log" para ver o histórico completo de commits do projeto.',
        exemplo: 'git log',
        categoria: 'Histórico',
        exemploCorreto: 'git log'
    },
    {
        id: 'git-diff',
        nivel: 3,
        comando: 'git diff',
        regex: /^git\s+diff(\s+[^\s]+)?$/,
        titulo: 'Visualizando Diferenças',
        descricao: `# git diff

O comando \`git diff\` mostra as diferenças entre commits, branches ou arquivos.

## Sintaxe
\`\`\`bash
git diff [arquivo-ou-commit]
\`\`\`

## Exemplos
\`\`\`bash
git diff           # Diferenças não commitadas
git diff arquivo.txt
git diff main feature
\`\`\`

## Notas
- Mostra mudanças no diretório de trabalho
- Use \`--staged\` para ver mudanças no staging area
- Use \`--cached\` como alternativa a \`--staged\``,
        objetivos: [
            'Visualizar diferenças entre versões',
            'Comparar branches e commits',
            'Revisar mudanças antes do commit'
        ],
        ajuda: 'Use "git diff" para ver as diferenças não commitadas ou "git diff <arquivo>" para um arquivo específico.',
        exemplo: 'git diff',
        categoria: 'Histórico',
        exemploCorreto: 'git diff'
    },
    {
        id: 'git-remote',
        nivel: 3,
        comando: 'git remote',
        regex: /^git\s+remote(\s+-[vV]|add\s+[^\s]+\s+[^\s]+|remove\s+[^\s]+)?$/,
        titulo: 'Gerenciando Repositórios Remotos',
        descricao: `# git remote

O comando \`git remote\` é usado para gerenciar repositórios remotos.

## Sintaxe
\`\`\`bash
git remote [opcoes] [nome] [url]
\`\`\`

## Exemplos
\`\`\`bash
git remote -v                    # Lista remotos com URLs
git remote add origin https://github.com/user/repo.git
git remote remove origin
\`\`\`

## Opções comuns
- \`-v\` ou \`--verbose\`: mostra URLs dos remotos
- \`add\`: adiciona um novo remoto
- \`remove\` ou \`rm\`: remove um remoto`,
        objetivos: [
            'Adicionar repositórios remotos',
            'Listar remotos configurados',
            'Remover remotos não necessários'
        ],
        ajuda: 'Use "git remote -v" para listar remotos ou "git remote add <nome> <url>" para adicionar um novo.',
        exemplo: 'git remote -v',
        categoria: 'Remoto',
        exemploCorreto: 'git remote -v'
    },
    {
        id: 'git-reset',
        nivel: 3,
        comando: 'git reset',
        regex: /^git\s+reset(\s+--[a-z]+\s+[^\s]+|\s+[^\s]+)?$/,
        titulo: 'Resetando o Estado do Repositório',
        descricao: `# git reset

O comando \`git reset\` é usado para resetar o estado atual do branch para um estado específico.

## Sintaxe
\`\`\`bash
git reset [opcoes] <commit>
\`\`\`

## Exemplos
\`\`\`bash
git reset HEAD~1        # Desfaz o último commit (mantém mudanças)
git reset --hard HEAD~1 # Desfaz o último commit (descarta mudanças)
git reset --soft HEAD~1 # Desfaz o último commit (mantém no staging)
\`\`\`

## Modos
- \`--soft\`: mantém mudanças no staging area
- \`--mixed\` (padrão): mantém mudanças no diretório de trabalho
- \`--hard\`: descarta todas as mudanças

## Cuidado
- \`--hard\` é irreversível e pode perder trabalho`,
        objetivos: [
            'Desfazer commits',
            'Resetar o estado do repositório',
            'Entender os modos de reset'
        ],
        ajuda: 'Use "git reset HEAD~1" para desfazer o último commit mantendo as mudanças.',
        exemplo: 'git reset HEAD~1',
        categoria: 'Avançado',
        exemploCorreto: 'git reset HEAD~1'
    },
    {
        id: 'git-rm',
        nivel: 3,
        comando: 'git rm',
        regex: /^git\s+rm(\s+-[rR]\s+[^\s]+|\s+[^\s]+)+$/,
        titulo: 'Removendo Arquivos do Git',
        descricao: `# git rm

O comando \`git rm\` é usado para remover arquivos do repositório e do diretório de trabalho.

## Sintaxe
\`\`\`bash
git rm [opcoes] <arquivo>
\`\`\`

## Exemplos
\`\`\`bash
git rm arquivo.txt
git rm -r pasta/
git rm --cached arquivo.txt
\`\`\`

## Opções comuns
- \`-r\`: remove recursivamente (diretórios)
- \`--cached\`: remove apenas do Git, mantém o arquivo local

## Notas
- Diferente de \`rm\`, \`git rm\` também stageia a remoção
- Use \`git rm --cached\` para parar de rastrear um arquivo sem deletá-lo`,
        objetivos: [
            'Remover arquivos do Git',
            'Deletar arquivos do repositório',
            'Parar de rastrear arquivos sem deletá-los'
        ],
        ajuda: 'Use "git rm <arquivo>" para remover um arquivo do Git e do diretório.',
        exemplo: 'git rm arquivo.txt',
        categoria: 'Avançado',
        exemploCorreto: 'git rm arquivo.txt'
    }
];
