# Syntax - Validador de Sintaxe Git

**Versão:** 0.1.0  
**Proprietário:** Mauricio Spark  
**Marca:** SparkMaurício  
**Linhagem:** SPARK  
**Copyright:** © 2026 / Mauricio Spark

## Visão Geral

O Syntax é uma aplicação web interativa projetada para ensinar e validar comandos Git de forma gamificada. A plataforma oferece um ambiente de aprendizado prático onde os usuários podem praticar comandos Git em um terminal simulado, recebendo feedback instantâneo e correções detalhadas.

A arquitetura modular do Syntax permite carregar dinamicamente até 100 níveis de aprendizado a partir do arquivo `json/comandos.json`, proporcionando um sistema escalável e extensível para ensinar desde os fundamentos básicos do Git até operações avançadas como rebase e submódulos.

## Características Principais

- **Validação de Sintaxe em Tempo Real**: Valida comandos Git usando expressões regulares avançadas
- **Sistema de 100 Níveis Dinâmicos**: Progressão através de até 100 níveis de dificuldade carregados dinamicamente do JSON
- **Arquitetura Modular**: Comandos e níveis configurados via `json/comandos.json` para fácil extensão
- **Feedback Inteligente**: Correções detalhadas com explicações contextuais baseadas no nível do usuário
- **Busca Difusa**: Sugestões de comandos similares usando algoritmo de Levenshtein
- **Interface de Terminal Simulado**: Ambiente que replica um terminal Git real
- **Sistema de Dicas**: Dicas progressivas que ajudam o usuário sem revelar a resposta completa
- **Persistência de Progresso**: Salva o progresso do usuário no localStorage
- **Layout Fixo Desktop**: Interface de aplicação desktop com rolagem independente

## Estrutura do Projeto

```
syntax/
├── css/
│   └── style.css          # Estilos da aplicação
├── js/
│   └── script.js          # Lógica principal da aplicação
├── json/
│   └── comandos.json      # Configuração dinâmica de comandos e níveis (até 100 níveis)
├── favicon/               # Ícones e logo
├── docs/                  # Documentação
└── index.html             # Página principal
```

## Arquitetura Modular

O Syntax utiliza uma arquitetura baseada em dados onde todos os comandos Git e níveis de aprendizado são definidos no arquivo `json/comandos.json`. Esta abordagem permite:

- **Extensibilidade Simples**: Adicionar novos comandos ou níveis sem modificar o código JavaScript
- **Manutenção Facilitada**: Atualizar descrições, expressões regulares e objetivos diretamente no JSON
- **Escalabilidade**: Suporte para até 100 níveis de aprendizado progressivo
- **Personalização**: Fácil adaptação para diferentes curriculares ou idiomas

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização com variáveis CSS e Flexbox
- **JavaScript (ES6+)**: Lógica da aplicação
- **Marked.js**: Renderização de Markdown
- **LocalStorage**: Persistência de dados

## Começando Rápido

1. Clone o repositório
2. Abra o arquivo `index.html` em um navegador moderno
3. Comece a praticar comandos Git!

## Níveis de Aprendizado

O Syntax organiza os comandos Git em fases progressivas que vão desde fundamentos locais até operações avançadas de colaboração e manutenção de repositório. Os níveis são carregados dinamicamente do arquivo `json/comandos.json`, permitindo até 100 níveis distintos.

### Fase 1: Fundamentos Locais (Níveis 1-2)
- **Comandos básicos**: `git init`, `git add`, `git commit`, `git status`
- **Gerenciamento de arquivos**: `git rm`, `git mv`, `git restore`
- **Histórico local**: `git log`, `git diff`, `git show`
- **Feedback**: Extremamente detalhado e didático
- **Explicações**: Completas com exemplos e contexto

### Fase 2: Colaboração e Remotos (Níveis 3-4)
- **Comandos de branches**: `git branch`, `git checkout`, `git switch`
- **Repositórios remotos**: `git remote`, `git clone`, `git fetch`
- **Sincronização**: `git push`, `git pull`
- **Tags e versionamento**: `git tag`
- **Stash**: Gerenciamento de trabalho temporário
- **Feedback**: Técnico mas acessível
- **Explicações**: Mais concisas e diretas

### Fase 3: Operações Avançadas (Níveis 5+)
- **Rebase avançado**: `git rebase -i`, `git rebase --continue`
- **Reset e reversão**: `git reset --hard`, `git revert`
- **Cherry-pick**: Seleção cirúrgica de commits
- **Submódulos**: Gerenciamento de projetos complexos
- **Reflog e recuperação**: `git reflog`, `git fsck`
- **Feedback**: Técnico e discreto
- **Explicações**: Diretas e profissionais

## Licença

Copyright © 2026 Mauricio Spark. Todos os direitos reservados.

## Suporte

Para suporte ou dúvidas, entre em contato através do repositório do projeto.
