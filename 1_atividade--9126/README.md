# Tarefador - Aplicação de Gerenciamento de Tarefas

Uma aplicação React moderna para gerenciamento de tarefas com checklist interativo de qualidade de software baseado na norma ISO/IEC 9126.

## 📋 Sobre o Projeto

Tarefador é uma aplicação de lista de tarefas (to-do list) desenvolvida com React e Vite, que inclui:

- **Gerenciamento de Tarefas**: Adicionar, marcar como concluída e excluir tarefas
- **Persistência de Dados**: Armazenamento local usando localStorage
- **Checklist de Qualidade**: Avaliação interativa baseada na ISO/IEC 9126
- **Interface Responsiva**: Design adaptável para diferentes dispositivos
- **CSS Modules**: Estilização com escopo local

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca para interfaces de usuário
- **Vite** - Build tool e servidor de desenvolvimento
- **CSS Modules** - Estilização com escopo local
- **ESLint** - Linting de código
- **LocalStorage** - Persistência de dados no navegador

## 📦 Estrutura do Projeto

```
src/
├── components/
│   ├── TaskItem.jsx           # Componente de item de tarefa
│   ├── TaskItem.module.css    # Estilos do TaskItem
│   ├── QualityCheckItem.jsx   # Componente de item de qualidade
│   └── QualityCheckItem.module.css # Estilos do QualityCheckItem
├── data/
│   └── initialQualityChecks.ts # Dados iniciais do checklist
├── App.jsx                    # Componente principal
├── App.module.css            # Estilos principais
├── main.jsx                  # Ponto de entrada
└── index.css                 # Estilos globais
```

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/luanhmilano/to-do_9126.git
   cd to-do_9126
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto em modo de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   - Abra o navegador em `http://localhost:5173`

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linting do código

## 🎯 Funcionalidades

### Gerenciamento de Tarefas
- ✅ Adicionar novas tarefas
- ✅ Marcar tarefas como concluídas
- ✅ Excluir tarefas
- ✅ Ordenação automática (pendentes primeiro)
- ✅ Persistência no localStorage

### Checklist de Qualidade ISO/IEC 9126
- ✅ Funcionalidade
- ✅ Confiabilidade
- ✅ Usabilidade
- ✅ Eficiência
- ✅ Manutenibilidade
- ✅ Portabilidade

## 🎨 Características de Design

- **Responsivo**: Adaptável a diferentes tamanhos de tela
- **Acessível**: Labels e ARIA attributes para acessibilidade
- **Animações**: Transições suaves e animações de entrada
- **Tema Moderno**: Design limpo e profissional

## 📱 Compatibilidade

- ✅ Chrome/Edge (versões recentes)
- ✅ Firefox (versões recentes)
- ✅ Safari (versões recentes)
- ✅ Dispositivos móveis



---
