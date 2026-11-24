/* =====================================================
   js/main.js - comportamento do site UX Lab
   Autor: Arthur Moura Campos - RA 22602304
   Secoes:
   1. Acessibilidade (tema, fonte, contraste, movimento)
   2. Menu para celular
   4. Abas
   5. Busca (glossario e heuristicas)
   ===================================================== */

/* ---------- 1. ACESSIBILIDADE ---------- */
const raiz = document.documentElement;

// Le uma configuracao salva (se o navegador bloquear, usa o padrao)
function ler(chave, padrao) {
  try { return localStorage.getItem(chave) || padrao; } catch (e) { return padrao; }
}
function salvar(chave, valor) {
  try { localStorage.setItem(chave, valor); } catch (e) { /* ignora */ }
}

// Estado inicial: usa a preferencia salva; se nao houver, segue o sistema
const prefereEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
let tema = ler("tema", prefereEscuro ? "dark" : "light");
let tamanhoFonte = parseInt(ler("fonte", "100"), 10);
let altoContraste = ler("contraste", "normal");
let reduzirMovimento = ler("movimento", "normal");

function aplicarConfiguracoes() {
  raiz.setAttribute("data-theme", tema);
  raiz.style.setProperty("--font-size-base", tamanhoFonte + "%");
  if (altoContraste === "high") raiz.setAttribute("data-contrast", "high");
  else raiz.removeAttribute("data-contrast");
  if (reduzirMovimento === "reduce") raiz.setAttribute("data-motion", "reduce");
  else raiz.removeAttribute("data-motion");
}
aplicarConfiguracoes(); // aplica o quanto antes para nao "piscar"

// Cria o painel de acessibilidade em todas as paginas
function criarPainelAcessibilidade() {
  const botao = document.createElement("button");
  botao.className = "a11y-fab";
  botao.type = "button";
  botao.setAttribute("aria-label", "Abrir painel de acessibilidade");
  botao.setAttribute("aria-expanded", "false");
  botao.setAttribute("aria-controls", "painel-a11y");
  botao.textContent = "♿";

  const painel = document.createElement("div");
  painel.className = "a11y-panel";
  painel.id = "painel-a11y";
  painel.hidden = true;
  painel.setAttribute("role", "dialog");
  painel.setAttribute("aria-label", "Opcoes de acessibilidade");
  painel.innerHTML = `
    <h2>Acessibilidade</h2>
    <div class="a11y-row">
      <label for="sw-tema" style="margin:0">Modo escuro</label>
      <span class="switch"><input type="checkbox" id="sw-tema" role="switch"><span class="slider"></span></span>
    </div>
    <div class="a11y-row">
      <label for="sw-contraste" style="margin:0">Alto contraste</label>
      <span class="switch"><input type="checkbox" id="sw-contraste" role="switch"><span class="slider"></span></span>
    </div>
    <div class="a11y-row">
      <label for="sw-movimento" style="margin:0">Reduzir movimento</label>
      <span class="switch"><input type="checkbox" id="sw-movimento" role="switch"><span class="slider"></span></span>
    </div>
    <div class="a11y-row">
      <span id="rotulo-fonte">Tamanho da fonte: <strong id="valor-fonte"></strong></span>
    </div>
    <div class="a11y-row" role="group" aria-labelledby="rotulo-fonte">
      <button type="button" class="btn btn-outline" id="fonte-menos" aria-label="Diminuir fonte">A-</button>
      <button type="button" class="btn btn-outline" id="fonte-padrao" aria-label="Fonte padrao">A</button>
      <button type="button" class="btn btn-outline" id="fonte-mais" aria-label="Aumentar fonte">A+</button>
    </div>
    <button type="button" class="btn" id="a11y-resetar" style="width:100%">Restaurar padrao</button>
  `;
  document.body.appendChild(painel);
  document.body.appendChild(botao);

  const swTema = document.getElementById("sw-tema");
  const swContraste = document.getElementById("sw-contraste");
  const swMovimento = document.getElementById("sw-movimento");
  const valorFonte = document.getElementById("valor-fonte");

  function atualizarControles() {
    swTema.checked = tema === "dark";
    swContraste.checked = altoContraste === "high";
    swMovimento.checked = reduzirMovimento === "reduce";
    valorFonte.textContent = tamanhoFonte + "%";
  }
  atualizarControles();

  botao.addEventListener("click", () => {
    const abrir = painel.hidden;
    painel.hidden = !abrir;
    botao.setAttribute("aria-expanded", String(abrir));
    if (abrir) swTema.focus();
  });

  // Esc fecha o painel e devolve o foco ao botao
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !painel.hidden) {
      painel.hidden = true;
      botao.setAttribute("aria-expanded", "false");
      botao.focus();
    }
  });

  swTema.addEventListener("change", () => {
    tema = swTema.checked ? "dark" : "light";
    salvar("tema", tema); aplicarConfiguracoes();
  });
  swContraste.addEventListener("change", () => {
    altoContraste = swContraste.checked ? "high" : "normal";
    salvar("contraste", altoContraste); aplicarConfiguracoes();
  });
  swMovimento.addEventListener("change", () => {
    reduzirMovimento = swMovimento.checked ? "reduce" : "normal";
    salvar("movimento", reduzirMovimento); aplicarConfiguracoes();
  });

  function mudarFonte(novo) {
    tamanhoFonte = Math.min(150, Math.max(80, novo)); // limites de 80% a 150%
    salvar("fonte", String(tamanhoFonte));
    aplicarConfiguracoes(); atualizarControles();
  }
  document.getElementById("fonte-menos").addEventListener("click", () => mudarFonte(tamanhoFonte - 10));
  document.getElementById("fonte-mais").addEventListener("click", () => mudarFonte(tamanhoFonte + 10));
  document.getElementById("fonte-padrao").addEventListener("click", () => mudarFonte(100));

  document.getElementById("a11y-resetar").addEventListener("click", () => {
    tema = prefereEscuro ? "dark" : "light";
    tamanhoFonte = 100; altoContraste = "normal"; reduzirMovimento = "normal";
    ["tema", "fonte", "contraste", "movimento"].forEach((c) => { try { localStorage.removeItem(c); } catch (e) {} });
    aplicarConfiguracoes(); atualizarControles();
  });
}

/* ---------- 2. MENU PARA CELULAR ---------- */
function iniciarMenu() {
  const botao = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (!botao || !nav) return;
  botao.addEventListener("click", () => {
    const aberto = nav.classList.toggle("open");
    botao.setAttribute("aria-expanded", String(aberto));
  });
}

/* ---------- 4. ABAS ---------- */
function iniciarAbas() {
  const abas = document.querySelectorAll(".tab-btn");
  if (!abas.length) return;
  const lista = Array.from(abas);

  function selecionar(aba, focar) {
    lista.forEach((b) => {
      const ativa = b === aba;
      b.setAttribute("aria-selected", String(ativa));
      b.tabIndex = ativa ? 0 : -1;
      document.getElementById(b.getAttribute("aria-controls")).hidden = !ativa;
    });
    if (focar) aba.focus();
  }

  lista.forEach((b, i) => {
    b.addEventListener("click", () => selecionar(b, false));
    // Navegacao por setas, como no padrao WAI-ARIA
    b.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") selecionar(lista[(i + 1) % lista.length], true);
      if (e.key === "ArrowLeft") selecionar(lista[(i - 1 + lista.length) % lista.length], true);
      if (e.key === "Home") selecionar(lista[0], true);
      if (e.key === "End") selecionar(lista[lista.length - 1], true);
    });
  });

  // Abre a aba indicada na URL (ex.: pesquisa.html#cores)
  const alvo = lista.find((b) => "#" + b.getAttribute("aria-controls").replace("painel-", "") === location.hash);
  selecionar(alvo || lista[0], false);
}

/* ---------- 5. BUSCA ---------- */
// Remove acentos e deixa minusculo para comparar textos
function normalizar(t) {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function iniciarBuscaGlossario() {
  const lista = document.getElementById("lista-glossario");
  const campo = document.getElementById("busca-glossario");
  if (!lista || !campo) return;
  const contador = document.getElementById("contador-glossario");

  function desenhar(termoBusca) {
    const q = normalizar(termoBusca.trim());
    const achados = GLOSSARIO.filter((g) => normalizar(g.termo + " " + g.texto).includes(q));
    lista.innerHTML = "";
    achados.forEach((g) => {
      const item = document.createElement("div");
      item.className = "card";
      item.innerHTML = `<h3>${g.termo}</h3><p>${g.texto}</p>`;
      lista.appendChild(item);
    });
    contador.textContent = achados.length === 0
      ? "Nenhum termo encontrado. Tente outra palavra."
      : `${achados.length} termo(s) encontrado(s).`;
  }

  campo.addEventListener("input", () => desenhar(campo.value));
  document.getElementById("limpar-glossario").addEventListener("click", () => {
    campo.value = ""; desenhar(""); campo.focus();
  });
  desenhar("");
}

function iniciarHeuristicas() {
  const lista = document.getElementById("lista-heuristicas");
  if (!lista) return;
  const campo = document.getElementById("busca-heuristicas");
  const contador = document.getElementById("contador-heuristicas");

  function desenhar(termoBusca) {
    const q = normalizar(termoBusca.trim());
    const achadas = HEURISTICAS.filter((h) =>
      normalizar(h.n + " " + h.titulo + " " + h.resumo + " " + h.exemplo).includes(q));
    lista.innerHTML = "";
    achadas.forEach((h) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <span class="tag">Heuristica ${h.n}</span>
        <div class="icon" aria-hidden="true">${h.icone}</div>
        <h3>${h.titulo}</h3>
        <p>${h.resumo}</p>
        <p><strong>No UX Lab:</strong> ${h.exemplo}</p>`;
      lista.appendChild(card);
    });
    contador.textContent = achadas.length === 0
      ? "Nenhuma heuristica encontrada."
      : `${achadas.length} de ${HEURISTICAS.length} heuristicas.`;
  }

  campo.addEventListener("input", () => desenhar(campo.value));
  document.getElementById("limpar-heuristicas").addEventListener("click", () => {
    campo.value = ""; desenhar(""); campo.focus();
  });
  desenhar("");
}

/* ---------- INICIO ---------- */
document.addEventListener("DOMContentLoaded", () => {
  criarPainelAcessibilidade();
  iniciarMenu();
  iniciarAbas();
  iniciarBuscaGlossario();
  iniciarHeuristicas();
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
});
