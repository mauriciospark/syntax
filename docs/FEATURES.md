# Funcionalidades do Syntax

**Versão:** 0.1.0  
**Proprietário:** Mauricio Spark  
**Marca:** SparkMaurício  
**Linhagem:** SPARK  
**Copyright:** © 2026 / Mauricio Spark

## Visão Geral das Funcionalidades

O Syntax oferece um conjunto completo de funcionalidades projetadas para facilitar o aprendizado de comandos Git de forma interativa e gamificada.

## 1. Validação de Sintaxe em Tempo Real

### Descrição
Valida comandos Git digitados pelo usuário usando expressões regulares avançadas, fornecendo feedback instantâneo sobre a correção da sintaxe.

### Como Funciona
- O sistema compara o comando digitado com padrões regex pré-definidos
- Validação exata para comandos corretos
- Sugestões inteligentes para comandos incorretos

### Benefícios
- Aprendizado imediato através de feedback instantâneo
- Prevenção de erros comuns
- Desenvolvimento de memória muscular para comandos Git

## 2. Sistema de Níveis Progressivo

### Descrição
Sistema de 3 níveis de dificuldade que desbloqueia comandos progressivamente conforme o usuário avança.

### Estrutura dos Níveis

#### Nível 1 (Iniciante)
- **Comandos**: `git init`, `git add`, `git commit`, `git status`
- **Feedback**: Extremamente detalhado e didático
- **Explicações**: Completas com exemplos e contexto
- **Público-alvo**: Usuários sem experiência prévia com Git

#### Nível 2 (Intermediário)
- **Comandos**: `git branch`, `git checkout`, `git remote`, `git log`
- **Feedback**: Técnico mas acessível
- **Explicações**: Mais concisas e diretas
- **Público-alvo**: Usuários com conhecimento básico de Git

#### Nível 3 (Avançado)
- **Comandos**: `git push`, `git pull`, `git merge`, `git diff`
- **Feedback**: Técnico e discreto
- **Explicações**: Diretas e sucintas
- **Público-alvo**: Usuários experientes buscando refinamento

### Mecanismo de Progressão
- Cada nível possui 4 comandos para dominar
- O usuário deve completar todos os comandos de um nível para avançar
- Progresso salvo automaticamente no localStorage
- Animação de "Level Up" ao completar um nível

## 3. Feedback Inteligente e Contextual

### Descrição
Sistema de feedback que adapta as explicações baseado no nível atual do usuário e no tipo de erro cometido.

### Tipos de Feedback

#### Para Comandos Corretos
- Indicação visual de sucesso (cor verde)
- Confirmação clara da correção
- Badge de categoria do comando
- Atualização imediata do progresso

#### Para Comandos Incorretos
- Indicação visual de erro (cor vermelha)
- Explicação detalhada do erro
- Sugestões de correção
- Exemplos de sintaxe correta

### Adaptação por Nível
- **Nível 1**: Explicações passo-a-passo com analogias
- **Nível 2**: Explicações técnicas com contexto
- **Nível 3**: Explicações diretas e profissionais

## 4. Busca Difusa (Fuzzy Search)

### Descrição
Algoritmo de Levenshtein para encontrar comandos similares quando o usuário comete erros de digitação.

### Como Funciona
- Calcula a distância de edição entre o comando digitado e comandos conhecidos
- Sugere os 3 comandos mais similares
- Ordena sugestões por proximidade

### Exemplo
```
Comando digitado: "git initt"
Sugestão: "git init" (distância: 1 caractere)
```

### Benefícios
- Ajuda usuários que cometem erros de digitação
- Acelera o processo de aprendizado
- Reduz frustração com erros triviais

## 5. Interface de Terminal Simulado

### Descrição
Interface que replica visualmente um terminal Git real, proporcionando imersão no ambiente de desenvolvimento.

### Características
- Design idêntico a terminais modernos
- Prompt personalizado: `spark@syntax:~$`
- Cores de sintaxe realistas
- Histórico de comandos executados
- Barra de rolagem personalizada

### Componentes
- **Header do Terminal**: Botões de controle (vermelho, amarelo, verde)
- **Área de Saída**: Histórico de comandos e resultados
- **Linha de Input**: Campo para digitar comandos
- **Botão de Dica**: Solicitar ajuda quando necessário

## 6. Sistema de Dicas Progressivo

### Descrição
Sistema de dicas que fornece ajuda gradual sem revelar a resposta completa imediatamente.

### Mecanismo de Progressão

#### Primeiro Clique
- Exibe a descrição de ajuda do comando
- Explica o propósito do comando
- Fornece contexto geral

#### Segundo Clique
- Revela o início da sintaxe
- Mostra o comando base
- Indica a estrutura geral

#### Terceiro Clique+
- Exemplo completo do comando
- Sintaxe exata a ser usada
- Parâmetros necessários

### Persistência
- Dica permanece visível até novo comando
- Reset ao mudar de exercício
- Reset ao avançar de nível

## 7. Persistência de Progresso

### Descrição
Sistema que salva automaticamente o progresso do usuário no navegador usando localStorage.

### Dados Salvos
- Nível atual do usuário
- Comandos completados
- Índice do exercício atual
- Contagem de cliques em dicas

### Benefícios
- Usuário pode retomar de onde parou
- Progresso mantido mesmo ao fechar o navegador
- Sem necessidade de login ou conta

### Limpeza
- Opção de resetar progresso
- Limpeza via console do navegador
- Backup manual possível

## 8. Layout Fixo Desktop

### Descrição
Interface de aplicação desktop com layout fixo e rolagem independente para cada painel.

### Características
- **Container Principal**: 100vh, overflow hidden
- **Cabeçalho Fixo**: 64px de altura, sempre visível
- **Painel Esquerdo**: 40% de largura, rolagem independente
- **Painel Direito**: 60% de largura, rolagem independente

### Benefícios
- Experiência similar a aplicação nativa
- Sem rolagem da página inteira
- Cada painel gerencia sua própria barra de rolagem
- Ideal para telas grandes

### Responsividade
- Adaptado para diferentes resoluções
- Modo colapso para painel de instruções
- Otimizado para desktop

## 9. Sistema de Animações

### Descrição
Animações sutis para melhorar a experiência do usuário e fornecer feedback visual.

### Animações Implementadas

#### Level Up
- Animação de celebração ao completar nível
- Ícone animado com bounce
- Fade in/out suave

#### Feedback de Comando
- Fade in para resultados
- Transições suaves de cores
- Animações de sucesso/erro

#### Dicas
- Fade in com translate Y
- Transição de opacidade
- Efeito de slide suave

### Benefícios
- Feedback visual claro
- Experiência mais agradável
- Indicações de estado visíveis

## 10. Marca e Identidade Visual

### Descrição
Identidade visual consistente com a marca SparkMaurício.

### Elementos
- **Logo**: Imagem personalizada no cabeçalho
- **Cores**: Paleta de cores temática (verde, azul, vermelho, amarelo)
- **Tipografia**: Fonte monoespaçada JetBrains Mono
- **Layout**: Design moderno e profissional

### Benefícios
- Identidade visual forte
- Aparência profissional
- Reconhecimento de marca

## Funcionalidades Futuras (Planejadas)

- [ ] Sistema de conquistas e badges
- [ ] Modo desafio com tempo limitado
- [ ] Multiplayer em tempo real
- [ ] Integração com GitHub real
- [ ] Suporte a outros sistemas de versionamento
- [ ] Temas personalizáveis
- [ ] Modo offline completo
- [ ] API para integrações externas
