# Syntax - Validador de Sintaxe Git

**Versão:** 0.1.0  
**Proprietário:** Mauricio Spark  
**Marca:** SparkMaurício  
**Linhagem:** SPARK  
**Copyright:** © 2026 / Mauricio Spark

## Visão Geral

O Syntax é uma aplicação web interativa projetada para ensinar e validar comandos Git de forma gamificada. A plataforma oferece um ambiente de aprendizado prático onde os usuários podem praticar comandos Git em um terminal simulado, recebendo feedback instantâneo e correções detalhadas.

## Características Principais

- **Validação de Sintaxe em Tempo Real**: Valida comandos Git usando expressões regulares avançadas
- **Sistema de Níveis**: Progressão através de 3 níveis de dificuldade (Iniciante, Intermediário, Avançado)
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
│   ├── script.js          # Lógica principal da aplicação
│   └── commands.js        # Banco de dados de comandos Git
├── json/
│   └── commands.json      # Configuração de comandos e níveis
├── favicon/               # Ícones e logo
├── docs/                  # Documentação
└── index.html             # Página principal
```

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

### Nível 1 (Iniciante)
- Comandos básicos: `git init`, `git add`, `git commit`, `git status`
- Feedback detalhado e didático
- Explicações completas com exemplos

### Nível 2 (Intermediário)
- Comandos de branches: `git branch`, `git checkout`, `git remote`
- Feedback técnico mas ainda acessível
- Explicações mais concisas

### Nível 3 (Avançado)
- Comandos de sincronização: `git push`, `git pull`, `git merge`
- Feedback técnico e discreto
- Explicações diretas

## Licença

Copyright © 2026 Mauricio Spark. Todos os direitos reservados.

## Suporte

Para suporte ou dúvidas, entre em contato através do repositório do projeto.
