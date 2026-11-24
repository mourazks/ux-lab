/* =====================================================
   js/dados.js - dados usados pelas paginas
   Autor: Arthur Moura Campos - RA 22602304
   ===================================================== */

// As 10 heuristicas de usabilidade de Jakob Nielsen
const HEURISTICAS = [
  {
    n: 1, titulo: "Visibilidade do status do sistema", icone: "📶",
    resumo: "O sistema deve sempre informar ao usuario o que esta acontecendo, com feedback rapido.",
    exemplo: "Barra de progresso ao enviar o formulario de contato; mensagem 'Mensagem enviada!' ao final."
  },
  {
    n: 2, titulo: "Correspondencia entre o sistema e o mundo real", icone: "🌎",
    resumo: "Usar palavras, frases e conceitos familiares ao usuario, e nao termos tecnicos internos.",
    exemplo: "Botao 'Enviar mensagem' em vez de 'Submeter POST'; icone de lupa para busca."
  },
  {
    n: 3, titulo: "Controle e liberdade do usuario", icone: "↩️",
    resumo: "Usuarios cometem erros e precisam de uma 'saida de emergencia' clara: desfazer, cancelar, voltar.",
    exemplo: "Botao 'Limpar busca' e botao para pausar o carrossel."
  },
  {
    n: 4, titulo: "Consistencia e padroes", icone: "🧩",
    resumo: "Elementos iguais devem ter o mesmo aspecto e comportamento em todo o site.",
    exemplo: "O menu, o rodape e os botoes sao identicos em todas as paginas."
  },
  {
    n: 5, titulo: "Prevencao de erros", icone: "🛡️",
    resumo: "E melhor evitar o problema do que mostrar uma boa mensagem de erro.",
    exemplo: "Campo de e-mail com type='email' e validacao antes de enviar o formulario."
  },
  {
    n: 6, titulo: "Reconhecimento em vez de memorizacao", icone: "👀",
    resumo: "Deixar opcoes e informacoes visiveis, para o usuario nao precisar lembrar de nada.",
    exemplo: "A aba atual do menu fica destacada, entao o usuario sempre sabe onde esta."
  },
  {
    n: 7, titulo: "Flexibilidade e eficiencia de uso", icone: "⚡",
    resumo: "Atalhos e opcoes de personalizacao ajudam tanto iniciantes quanto usuarios experientes.",
    exemplo: "Painel de acessibilidade: tema claro/escuro, fonte maior, alto contraste."
  },
  {
    n: 8, titulo: "Design estetico e minimalista", icone: "✨",
    resumo: "Nao mostrar informacao irrelevante; cada elemento extra compete com o que importa.",
    exemplo: "Paginas com poucos elementos por secao e bastante espaco em branco."
  },
  {
    n: 9, titulo: "Ajudar a reconhecer, diagnosticar e corrigir erros", icone: "🩺",
    resumo: "Mensagens de erro em linguagem simples, dizendo qual foi o problema e como resolver.",
    exemplo: "'Digite um e-mail valido, como nome@exemplo.com' abaixo do campo."
  },
  {
    n: 10, titulo: "Ajuda e documentacao", icone: "📚",
    resumo: "Se for preciso ajuda, ela deve ser facil de achar, curta e focada na tarefa.",
    exemplo: "Dicas (hints) abaixo dos campos e a aba Glossario na pagina de pesquisa."
  }
];

// Glossario usado na busca da pagina de pesquisa
const GLOSSARIO = [
  { termo: "UX (User Experience)", texto: "Experiencia do usuario: tudo o que a pessoa sente e percebe ao usar um produto, do primeiro contato ate o fim da tarefa." },
  { termo: "UI (User Interface)", texto: "Interface do usuario: a parte visual e interativa, como botoes, cores, tipografia, icones e layout." },
  { termo: "IHC", texto: "Interacao Humano-Computador: area que estuda como as pessoas interagem com sistemas computacionais." },
  { termo: "WCAG", texto: "Web Content Accessibility Guidelines: diretrizes do W3C para tornar o conteudo web acessivel a todas as pessoas." },
  { termo: "Contraste", texto: "Diferenca de luminosidade entre texto e fundo. A WCAG pede ao menos 4,5:1 para texto normal (nivel AA)." },
  { termo: "Heuristica", texto: "Regra pratica usada para avaliar a usabilidade de uma interface, como as 10 heuristicas de Nielsen." },
  { termo: "Persona", texto: "Personagem ficticio baseado em dados reais que representa um grupo de usuarios do produto." },
  { termo: "Wireframe", texto: "Esboco simples da estrutura de uma tela, sem cores nem detalhes visuais." },
  { termo: "Prototipo", texto: "Versao navegavel, ainda que simples, de um produto, usada para testar ideias antes de construir." },
  { termo: "Branding", texto: "Conjunto de elementos (nome, cores, tipografia, tom de voz) que formam a identidade de uma marca." },
  { termo: "Psicologia das cores", texto: "Estudo de como as cores influenciam emocoes e comportamentos, e por isso ajudam a transmitir a mensagem do site." },
  { termo: "Usabilidade", texto: "Facilidade com que os usuarios conseguem aprender e usar um sistema para atingir seus objetivos." },
  { termo: "Acessibilidade", texto: "Garantia de que pessoas com diferentes habilidades (visuais, motoras, auditivas, cognitivas) consigam usar o site." },
  { termo: "Design responsivo", texto: "Layout que se adapta a diferentes tamanhos de tela, como celular, tablet e computador." }
];
