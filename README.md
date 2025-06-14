# Projeto Postos

## Sobre o Projeto

Este é um projeto frontend para visualização de informações sobre postos de combustível, construído com Next.js, React e Chakra UI.

## Começando

Siga estas instruções para configurar e rodar o projeto localmente.

### Pré-requisitos

Certifique-se de que você tem o Node.js e o npm (ou yarn) instalados na sua máquina.

- [Node.js](https://nodejs.org/) (versão recomendada: LTS)
- npm (geralmente vem com o Node.js) ou [Yarn](https://yarnpkg.com/)

### Instalação

1. Clone o repositório (se aplicável):
   ```bash
   git clone <url-do-repositorio>
   cd nome-do-projeto
   ```
2. Instale as dependências do projeto:
   ```bash
   npm install
   # ou
   yarn install
   ```

### Rodando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Principais Tecnologias

- [Next.js](https://nextjs.org/) - Framework React para produção.
- [React](https://reactjs.org/) - Biblioteca JavaScript para construir interfaces de usuário.
- [Chakra UI](https://chakra-ui.com/) - Biblioteca de componentes UI simples, modular e acessível.
- [next-themes](https://github.com/pacocoursey/next-themes) - Para gerenciamento de temas (claro/escuro).

## Estrutura de Pastas

- `src/app/`: Contém as páginas da aplicação (usando o App Router do Next.js).
- `src/components/`: Contém os componentes React reutilizáveis.
  - `src/components/ui/`: Componentes de UI específicos, como o `Provider`.
- `src/contexts/`: (A ser criado) Para contextos React.
- `public/`: Arquivos estáticos.
- `jsconfig.json`: Configurações do JavaScript para o editor (paths, etc.).

## Próximos Passos

- Desenvolver as páginas em `src/app/`.
- Criar componentes reutilizáveis em `src/components/`.
- Implementar contextos em `src/contexts/` conforme necessário.
