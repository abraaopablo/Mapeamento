# Mapeador de Switch - PWA

Um Progressive Web App (PWA) para mapear e gerenciar portas de switch de rede.

## Funcionalidades

- **Interface Visual**: Representação gráfica de um switch de 24 portas
- **Dois Modos de Interação**:
  - **Usuário**: Visualização rápida das informações da porta
  - **Admin**: Edição completa dos dados da porta
- **Armazenamento Local**: Os dados são salvos no navegador usando localStorage
- **PWA**: Pode ser instalado na tela inicial do celular como um aplicativo nativo
- **Offline**: Funciona sem conexão com a internet após a primeira instalação

## Estrutura do Projeto

- `index.html` - Página principal da aplicação
- `style.css` - Estilos e layout da interface
- `script.js` - Lógica da aplicação e interatividade
- `manifest.json` - Configurações do PWA
- `sw.js` - Service Worker para funcionalidade offline
- `icon-192.png` - Ícone da aplicação

## Como Usar

1. Acesse a aplicação através do link hospedado
2. Clique em uma porta vazia (cinza) para configurá-la
3. Preencha as informações e salve
4. A porta ficará verde indicando que está configurada
5. Clique em uma porta configurada para ver as informações
6. Use o botão "Editar" para modificar os dados

## Instalação no Celular

1. Abra a aplicação no Chrome do seu celular Android
2. Procure pelo ícone "Adicionar à tela inicial" na barra de endereço
3. Confirme a instalação
4. O aplicativo aparecerá na sua tela inicial como um app nativo

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- PWA (Progressive Web App)
- Service Workers
- Web App Manifest
- LocalStorage API

## Melhorias Futuras

1. **Interface Realista**: Substituir os quadrados por imagens realistas de portas RJ45
2. **Múltiplos Switches**: Suporte para gerenciar vários switches
3. **Exportação de Dados**: Funcionalidade para exportar relatórios
4. **Autenticação**: Sistema de login para diferentes níveis de usuário
