# Instalação do Syntax

**Versão:** 0.2.0  
**Proprietário:** Mauricio Spark  
**Marca:** SparkMaurício  
**Linhagem:** SPARK  
**Copyright:** © 2026 / Mauricio Spark

## Requisitos do Sistema

### Navegadores Suportados
- Google Chrome (versão 90+)
- Mozilla Firefox (versão 88+)
- Microsoft Edge (versão 90+)
- Safari (versão 14+)

### Requisitos Mínimos
- JavaScript habilitado
- Conexão com internet (para carregar bibliotecas externas)
- Resolução mínima de tela: 1024x768
- Suporte a Fetch API (para carregar comandos JSON dinamicamente)

## Métodos de Instalação

### Método 1: Uso Direto (Recomendado)

1. **Clone ou baixe o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd syntax
   ```

2. **Abra o arquivo index.html**
   - Navegue até a pasta do projeto
   - Dê um duplo clique em `index.html`
   - Ou arraste o arquivo para o navegador

3. **Comece a usar!**
   - A aplicação está pronta para uso imediato
   - Não requer instalação adicional

### Método 2: Servidor Local (Opcional)

Para desenvolvimento ou testes mais avançados:

1. **Usando Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

2. **Usando Node.js**
   ```bash
   # Instale http-server globalmente
   npm install -g http-server
   
   # Execute na pasta do projeto
   http-server -p 8000
   ```

3. **Usando PHP**
   ```bash
   php -S localhost:8000
   ```

4. **Acesse no navegador**
   ```
   http://localhost:8000
   ```

### Método 3: VS Code Live Server

Se você usa Visual Studio Code:

1. Instale a extensão "Live Server"
2. Clique com o botão direito em `index.html`
3. Selecione "Open with Live Server"

## Configuração

### Variáveis de Ambiente

O Syntax não requer variáveis de ambiente, mas você pode personalizar algumas configurações editando o arquivo `css/style.css`:

```css
:root {
    --bg-primary: #1e1e1e;      /* Cor de fundo principal */
    --bg-secondary: #252526;    /* Cor de fundo secundária */
    --accent-green: #4ec9b0;    /* Cor de destaque verde */
    --accent-blue: #569cd6;     /* Cor de destaque azul */
    --accent-red: #f44747;      /* Cor de destaque vermelho */
    --accent-yellow: #dcdcaa;   /* Cor de destaque amarelo */
}
```

### Configuração de Comandos (Arquitetura Modular)

O Syntax utiliza uma arquitetura modular baseada em JSON onde todos os comandos Git são definidos no arquivo `json/comandos.json`. Esta abordagem permite:

- **Carregamento Dinâmico**: Comandos são carregados em tempo de execução via Fetch API
- **Suporte para 10 Níveis**: Sistema escalável que suporta até 10 níveis de aprendizado
- **Extensibilidade**: Adicionar novos comandos sem modificar código JavaScript
- **Manutenção Facilitada**: Atualizar descrições e expressões regulares diretamente no JSON

### Configuração de Pedras Preciosas

O Syntax também suporta uma animação de pedras preciosas que aparece quando o usuário responde corretamente. As pedras são configuradas no arquivo `json/pedas.json`:

```javascript
const pedrasSintax = [
    { id: 1, arquivo: "nome-da-pedra", nome: "Nome da Pedra" }
];
```

As imagens das pedras devem ser colocadas na pasta `preciosas/` com extensão `.png`.

#### Estrutura do Arquivo JSON

Para adicionar ou modificar comandos Git, edite o arquivo `json/comandos.json`:

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
  "descricao": "Descrição detalhada em Markdown",
  "objetivos": [
    "Objetivo 1",
    "Objetivo 2"
  ]
}
```

#### Campos do Comando

- **id**: Identificador único do comando (número inteiro)
- **categoria**: Categoria do comando (string)
- **comando**: O comando Git a ser validado (string)
- **regex**: Expressão regular para validação (string)
- **ajuda**: Texto de ajuda curto (string)
- **exemplo**: Exemplo de uso do comando (string)
- **nivel**: Nível de dificuldade (1-10)
- **titulo**: Título do exercício (string)
- **descricao**: Descrição detalhada em Markdown (string)
- **objetivos**: Array de objetivos de aprendizado (array de strings)

#### Configuração de Níveis

O sistema suporta até 10 níveis de aprendizado. Para adicionar um novo nível:

1. Adicione comandos com o campo `nivel` definido para o novo nível desejado
2. A aplicação automaticamente detectará e carregará os comandos do novo nível
3. O progresso do usuário é salvo por nível

#### Personalização

Você pode personalizar o Syntax para diferentes necessidades:

- **Idiomas**: Traduza os campos `ajuda`, `titulo`, `descricao` e `objetivos`
- **Curriculares**: Organize comandos por diferentes sequências de aprendizado
- **Níveis**: Crie até 10 níveis distintos com progressão personalizada

## Solução de Problemas

### Problema: A aplicação não carrega

**Soluções:**
1. Verifique se o JavaScript está habilitado no navegador
2. Limpe o cache do navegador
3. Tente usar um navegador diferente
4. Verifique o console do navegador para erros (F12)

### Problema: Comandos não são validados

**Soluções:**
1. Verifique se o arquivo `json/comandos.json` está acessível
2. Verifique se há erros no console do navegador
3. Certifique-se de que as expressões regulares estão corretas

### Problema: Progresso não é salvo

**Soluções:**
1. Verifique se o localStorage está habilitado
2. Limpe o localStorage e tente novamente
3. Verifique se há espaço suficiente no navegador

### Problema: Layout quebrado

**Soluções:**
1. Verifique se o arquivo `css/style.css` está sendo carregado
2. Aumente a resolução da tela
3. Tente em modo tela cheia

## Atualização

Para atualizar para a versão mais recente:

1. **Backup do progresso**
   - O progresso é salvo no localStorage
   - Para backup, use o console do navegador:
   ```javascript
   console.log(localStorage.getItem('syntaxProgress'))
   ```

2. **Atualize os arquivos**
   - Baixe a nova versão
   - Substitua os arquivos antigos
   - Mantenha o localStorage se desejar preservar o progresso

## Desinstalação

Para remover o Syntax:

1. **Remova os arquivos**
   - Delete a pasta do projeto
   - Ou remova apenas os arquivos do projeto

2. **Limpe o localStorage**
   - Abra o console do navegador (F12)
   - Execute:
   ```javascript
   localStorage.removeItem('syntaxProgress')
   ```

## Suporte

Para problemas não resolvidos, verifique a documentação adicional na pasta `docs/` ou entre em contato através do repositório do projeto.
