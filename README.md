# Sistema de Gestão e Visualização de Processos

Este projeto é uma aplicação web em React para gerenciamento e visualização de processos organizacionais e seus documentos associados. A interface permite navegar entre diferentes processos, filtrar por nome e status, além de visualizar documentos em PDF e imagens diretamente na página com suporte a zoom. Os dados apresentados são simulados localmente (dados fictícios), sendo possível expandir para conexão com APIs reais conforme necessário. O sistema exibe informações detalhadas do processo, incluindo área, departamento, setor, descrição e status, além de agrupar os documentos por tipo com ícones representativos.

## Funcionalidades principais

- Listagem e filtro dinâmico de processos.
- Visualização detalhada de processos selecionados.
- Exibição e navegação entre documentos agrupados por tipo.
- Visualizador integrado de documentos PDF e imagens com zoom.
- Interface responsiva e acessível utilizando componentes React personalizados e biblioteca de ícones lucide-react.

## Tecnologias utilizadas

- React (com hooks e React Router)
- date-fns para formatação de datas com suporte a pt-BR
- lucide-react para ícones modernos
- Tailwind CSS (presumido pelo uso das classes utilitárias)
- JavaScript/TypeScript (tipo genérico no código)

## Como rodar o projeto

1. Clone este repositório:  
   `git clone https://github.com/jEduuardo/GestaoDocumentos.git`  
   `cd gestaodocumento`

2. Instale as dependências:  
   `npm install`

3. Inicie o servidor de desenvolvimento:  
   `npm run dev`

4. Abra o navegador e acesse:  
   `http://localhost:5173`

## Observações

- Os dados são fictícios e gerados localmente no frontend para facilitar testes.  
- Os arquivos de documentos são carregados via caminho fixo apontando para uma pasta local simulada (`../database/process/active/`).  
- O sistema pode ser facilmente adaptado para consumir APIs reais, adicionando backend e persistência.  
- Ideal para quem busca uma solução simples e clara para gerenciamento documental em processos internos.

---

