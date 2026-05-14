# Instalação do Syntax

**Versão:** 0.1.0  
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

### Configuração de Comandos

Para adicionar ou modificar comandos Git, edite o arquivo `json/commands.json`:

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
  "objetivos": [
    "Objetivo 1",
    "Objetivo 2"
  ]
}
```

## Solução de Problemas

### Problema: A aplicação não carrega

**Soluções:**
1. Verifique se o JavaScript está habilitado no navegador
2. Limpe o cache do navegador
3. Tente usar um navegador diferente
4. Verifique o console do navegador para erros (F12)

### Problema: Comandos não são validados

**Soluções:**
1. Verifique se o arquivo `json/commands.json` está acessível
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
