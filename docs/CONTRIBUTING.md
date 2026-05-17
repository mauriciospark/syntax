# Guia de Contribuição para o Syntax

**Versão:** 0.1.0  
**Proprietário:** Mauricio Spark  
**Marca:** SparkMaurício  
**Linhagem:** SPARK  
**Copyright:** © 2026 / Mauricio Spark

## Visão Geral

Obrigado por seu interesse em contribuir com o Syntax! Este guia fornece informações sobre como você pode participar do desenvolvimento do projeto.

O Syntax utiliza uma arquitetura modular baseada em JSON onde todos os comandos Git e níveis de aprendizado são definidos no arquivo `json/commands.json`. Esta abordagem permite carregar dinamicamente até 100 níveis de aprendizado, tornando a contribuição extremamente acessível.

## Como Contribuir

### Reportando Bugs

Se você encontrou um bug, por favor:

1. **Verifique se o bug já foi reportado**
   - Revise as issues existentes
   - Use a busca para encontrar relatos similares

2. **Crie uma nova issue** com as seguintes informações:
   - **Título**: Descrição clara e concisa do bug
   - **Descrição Detalhada**: O que aconteceu, o que você esperava
   - **Passos para Reproduzir**: Passos detalhados para reproduzir o bug
   - **Comportamento Esperado**: O que deveria acontecer
   - **Capturas de Tela**: Se aplicável
   - **Ambiente**:
     - Navegador e versão
     - Sistema operacional
     - Resolução da tela

### Sugerindo Funcionalidades

Para sugerir novas funcionalidades:

1. **Verifique se a funcionalidade já foi sugerida**
   - Revise as issues existentes
   - Verifique a documentação de funcionalidades planejadas

2. **Crie uma nova issue** com:
   - **Título**: Nome da funcionalidade proposta
   - **Descrição**: Descrição detalhada da funcionalidade
   - **Motivação**: Por que esta funcionalidade é útil
   - **Casos de Uso**: Exemplos de como seria usada
   - **Alternativas Consideradas**: Outras abordagens possíveis

### Contribuindo com Código

#### Configuração do Ambiente

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd syntax
   ```

2. **Abra o projeto**
   - Use um editor de código (VS Code recomendado)
   - Abra `index.html` no navegador para testar

#### Estrutura do Código

```
syntax/
├── css/
│   └── style.css          # Estilos CSS
├── js/
│   ├── script.js          # Lógica principal
│   └── commands.js        # Banco de dados de comandos
├── json/
│   └── commands.json      # Configuração de comandos
├── favicon/               # Ícones e logo
├── docs/                  # Documentação
└── index.html             # Página principal
```

#### Padrões de Código

**JavaScript**
- Use ES6+ features
- Use `const` e `let` em vez de `var`
- Use arrow functions quando apropriado
- Adicione comentários para funções complexas
- Siga o estilo existente no código

**CSS**
- Use variáveis CSS para cores e valores repetidos
- Use classes BEM quando apropriado
- Mantenha seletores específicos e performáticos
- Adicione comentários para seções complexas

**HTML**
- Use elementos semânticos
- Mantenha indentação consistente
- Adicione atributos `alt` para imagens
- Use atributos ARIA para acessibilidade

#### Adicionando Novos Comandos Git

Para adicionar um novo comando Git, você não precisa modificar código JavaScript - basta editar o arquivo `json/commands.json`:

1. **Edite `json/commands.json`**
   ```json
   {
     "id": 101,
     "categoria": "Nova Categoria",
     "comando": "git novo-comando",
     "regex": "^git novo-comando$",
     "ajuda": "Descrição breve da ajuda",
     "exemplo": "git novo-comando",
     "nivel": 1,
     "titulo": "Título do Exercício",
     "descricao": "Descrição detalhada em Markdown",
     "objetivos": [
       "Objetivo de aprendizado 1",
       "Objetivo de aprendizado 2"
     ]
   }
   ```

2. **Campos do Comando**
   - **id**: Identificador único (use o próximo número disponível)
   - **categoria**: Categoria do comando (ex: "Branch", "Commit", "Remote")
   - **comando**: O comando Git exato
   - **regex**: Expressão regular para validação (deve corresponder ao comando)
   - **ajuda**: Texto de ajuda curto (exibido nas dicas)
   - **exemplo**: Exemplo de uso do comando
   - **nivel**: Nível de dificuldade (1-100)
   - **titulo**: Título do exercício
   - **descricao**: Descrição detalhada em Markdown
   - **objetivos**: Array de objetivos de aprendizado

3. **Teste o comando**
   - Abra a aplicação
   - O comando será carregado automaticamente do JSON
   - Verifique se o comando é validado corretamente
   - Teste variações do comando

4. **Atualize a documentação**
   - Adicione o comando ao FEATURES.md se necessário
   - Atualize o README.md se for um comando importante

#### Adicionando Novos Níveis

O sistema suporta até 100 níveis de aprendizado. Para adicionar um novo nível:

1. **Adicione comandos com o novo nível**
   ```json
   {
     "id": 101,
     "nivel": 6,
     "comando": "git novo-comando-avancado",
     ...
   }
   ```

2. **A aplicação detectará automaticamente o novo nível**
   - Não é necessário modificar código JavaScript
   - O sistema carrega comandos dinamicamente do JSON
   - O progresso do usuário é salvo por nível

3. **Organize os níveis em fases**
   - Fase 1: Fundamentos Locais (níveis 1-20)
   - Fase 2: Colaboração e Remotos (níveis 21-50)
   - Fase 3: Operações Avançadas (níveis 51-100)

#### Modificando a Lógica

Ao modificar `js/script.js`:

1. **Mantenha compatibilidade**
   - Não quebre funcionalidades existentes
   - Teste todos os níveis (até 100)
   - Verifique persistência de progresso
   - Certifique-se de que o carregamento dinâmico do JSON funciona

2. **Adicione testes manuais**
   - Teste cada função modificada
   - Verifique edge cases
   - Teste em diferentes navegadores
   - Teste com diferentes níveis de progresso

3. **Documente mudanças**
   - Adicione comentários ao código
   - Atualize a documentação API.md se necessário
   - Descreva mudanças no commit message

#### Melhores Práticas para Expressões Regulares

Ao adicionar ou modificar expressões regulares no JSON:

1. **Seja específico mas flexível**
   ```json
   "regex": "^git add .+$"  // Aceita qualquer arquivo após git add
   ```

2. **Use âncoras quando apropriado**
   ```json
   "regex": "^git init$"  // Exige comando exato
   ```

3. **Teste variações do comando**
   - Com espaços extras
   - Com diferentes parâmetros
   - Com caracteres especiais

4. **Documente limitações**
   - Se a regex não aceita certas variações, documente no campo `ajuda`

#### Modificando Estilos

Ao modificar `css/style.css`:

1. **Mantenha consistência**
   - Use variáveis CSS existentes
   - Siga o padrão de cores existente
   - Mantenha responsividade

2. **Teste em diferentes resoluções**
   - Desktop (1920x1080)
   - Laptop (1366x768)
   - Tablet (768x1024)

3. **Verifique acessibilidade**
   - Contraste de cores
   - Tamanho de fonte
   - Navegação por teclado

## Processo de Pull Request

### Antes de Submeter

1. **Teste suas mudanças**
   - Verifique que tudo funciona
   - Teste em diferentes navegadores
   - Verifique responsividade

2. **Atualize a documentação**
   - Atualize README.md se necessário
   - Atualize FEATURES.md para novas funcionalidades
   - Atualize API.md para novas funções

3. **Limpe seu código**
   - Remova código comentado
   - Remova console.log() desnecessários
   - Formate o código consistentemente

### Criando um Pull Request

1. **Faça um fork do repositório**
2. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/nome-da-feature
   ```

3. **Commit suas mudanças**
   ```bash
   git commit -m "Descrição clara da mudança"
   ```

4. **Push para sua branch**
   ```bash
   git push origin feature/nome-da-feature
   ```

5. **Crie um Pull Request**
   - Descreva suas mudanças
   - Referencie issues relacionadas
   - Adicione capturas de tela se aplicável

### Convenções de Commit

Use mensagens de commit claras e descritivas:

```
feat: adiciona suporte para novo comando git stash
fix: corrige validação de comando git add com caminhos
docs: atualiza documentação de instalação
style: melhora formatação do código CSS
refactor: otimiza função de validação
test: adiciona testes manuais para novo comando
chore: atualiza dependências externas
```

## Código de Conduta

### Nossos Valores

- **Respeito**: Trate todos com respeito e profissionalismo
- **Inclusão**: Seja aberto e acolhedor com novos contribuidores
- **Colaboração**: Trabalhe juntos para construir algo melhor
- **Qualidade**: Esforce-se por código de alta qualidade
- **Aprendizado**: Esteja aberto a aprender e ensinar

### Comportamento Esperado

- Seja respeitoso nas discussões
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Mostre empatidade com outros contribuidores

### Comportamento Inaceitável

- Linguagem ofensiva ou discriminatória
- Ataques pessoais ou assédio
- Publicação de informações privadas
- Comportamento não profissional

## Perguntas Frequentes

### Preciso saber Git para contribuir?
Não! Você pode contribuir de várias formas:
- Reportando bugs
- Sugerindo funcionalidades
- Melhorando a documentação
- Traduzindo para outros idiomas
- Melhorando o design/UX

### Posso contribuir sem saber programar?
Sim! Contribuições não-técnicas são muito valorizadas:
- Documentação
- Design
- Tradução
- Testes
- Feedback

### Como posso testar minhas mudanças?
1. Abra `index.html` no navegador
2. Use o console do navegador (F12) para debugar
3. Teste em diferentes navegadores
4. Verifique responsividade

### Posso adicionar comandos Git de outros níveis?
Sim! Sinta-se livre para adicionar comandos para qualquer nível. O sistema suporta até 100 níveis. Apenas certifique-se de:
- Usar o nível apropriado (1-100)
- Seguir o formato JSON existente
- Testar a validação da expressão regular
- Atualizar a documentação se necessário
- Organizar comandos em fases lógicas de aprendizado

### Posso modificar o design?
Sim! Melhorias no design são bem-vindas. Por favor:
- Mantenha a identidade visual
- Teste responsividade
- Verifique acessibilidade
- Documente mudanças

## Recursos

### Documentação
- [README.md](README.md) - Visão geral do projeto
- [INSTALLATION.md](INSTALLATION.md) - Guia de instalação
- [FEATURES.md](FEATURES.md) - Documentação de funcionalidades
- [API.md](API.md) - Documentação da API

### Ferramentas Recomendadas
- **Editor**: VS Code
- **Navegadores**: Chrome, Firefox, Edge
- **Ferramentas de Debug**: DevTools do navegador
- **Git**: GitHub Desktop ou linha de comando

### Aprendizado
- [Git Documentation](https://git-scm.com/doc)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

## Reconhecimento

Contribuidores serão reconhecidos:
- Na seção de contribuidores do README
- No changelog de cada versão
- Em releases importantes

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto.

## Contato

Para dúvidas sobre contribuição:
- Abra uma issue no repositório
- Entre em contato através do repositório
- Participe das discussões

## Obrigado!

Obrigado por considerar contribuir com o Syntax! Sua ajuda é muito apreciada.
