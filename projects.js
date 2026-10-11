/* PROJETOS: edite apenas esta lista
   cat: Web | Sistemas | Ferramentas | Empresa (cria os filtros sozinho)
   status: online | evolucao | concluido
   image: opcional, ex.: "img/confeitaria.jpg" (sem imagem, usa o ícone) */
const PROJECTS = [
  { name: "Doces Tentações", icon: "cake-candles", cat: "Web", status: "online", tags: ["Loja online", "Catálogo"], desc: "Site de confeitaria com catálogo de produtos, compras online e encomendas.", github: "https://github.com/fidelmaluto/confeitaria-lissandra", live: "https://lissandradocestentacoes.vercel.app" },
  { name: "SIETI", icon: "box", cat: "Sistemas", status: "concluido", tags: ["Node.js", "Gestão"], desc: "Sistema completo de gestão e controlo de equipamentos informáticos.", github: "https://github.com/fidelmaluto/SIETI.git" },
  { name: "Baixar-Músicas", icon: "music", cat: "Web", status: "evolucao", tags: ["API YouTube", "Node.js"], desc: "Aplicação para baixar e reproduzir músicas, consumindo a API do YouTube. Continua a crescer.", github: "https://github.com/fidelmaluto/baixar-musica", live: "https://playdeby.onrender.com" },
  { name: "Speacker", icon: "volume-high", cat: "Web", status: "online", tags: ["JavaScript", "Vercel"], desc: "Converte texto digitado em áudio, com suporte a vários sotaques.", github: "https://github.com/fidelmaluto/translatetoaudio", live: "https://translatetoaudio.vercel.app" },
  { name: "SGRH", icon: "user-tie", cat: "Sistemas", status: "evolucao", tags: ["Full Stack", "RH"], desc: "Sistema de Gestão de Recursos Humanos, focado na gestão fácil e eficaz de empresas.", github: "https://github.com/fidelmaluto/SGRH.git" },
  { name: "DataAtual", icon: "calendar-days", cat: "Ferramentas", status: "online", tags: ["JavaScript", "NPM"], desc: "O meu primeiro pacote publicado: formata datas com JavaScript puro.", github: "https://github.com/fidelmaluto/dataatual", live: "https://npm.com/fidelmaluto/dataatual" },
  { name: "Desenvolvimento Web", icon: "book-open", cat: "Web", status: "evolucao", tags: ["Educação", "PDF"], desc: "Guia de carreira para iniciantes em desenvolvimento web, com materiais em PDF.", github: "https://github.com/fidelmaluto/ProjetoTLP" },
  { name: "Dashboard", icon: "chart-simple", cat: "Web", status: "concluido", tags: ["Gráficos", "Mapa"], desc: "Painel com dados de 3 elementos, gráfico de desempenho e mapa de localização.", github: "https://github.com/fidelmaluto/Dashboard" },
  { name: "CRUD-simples", icon: "rotate", cat: "Ferramentas", status: "concluido", tags: ["Node.js", "Insomnia"], desc: "API em Node.js testada no Insomnia, com dois middlewares: verificador de ID e ilustrador da rota.", github: "https://github.com/fidelmaluto/CRUD-simples" },
  { name: "SCF Web", icon: "box-archive", cat: "Sistemas", status: "concluido", tags: ["Cadastro", "Web"], desc: "Sistema de Cadastro de Funcionários: mini-sistema que possibilita o cadastro de usuários.", github: "https://github.com/fidelmaluto/scf.git" },
  { name: "PopUp", icon: "circle-check", cat: "Ferramentas", status: "concluido", tags: ["JavaScript", "UI"], desc: "Mini-projeto interativo que ilustra uma mensagem de sucesso, ideal após um cadastro.", github: "https://github.com/fidelmaluto/PopUp" },
  { name: "Fleves Serviços", icon: "building", cat: "Empresa", status: "online", tags: ["Tecnologia"], desc: "Empresa de soluções tecnológicas, em paralelo à carreira de desenvolvedor." }
];

(() => {
  const $ = s => document.querySelector(s);
  const ST = { online: "Online", evolucao: "Em evolução", concluido: "Concluído" };
  const HUES = [40, 170, 215, 285, 10, 100];
  const LIMIT = 8;
  const album = $("#album"), chips = $("#chips"), more = $("#moreBtn"), dlg = $("#projModal"), pm = $("#pm");
  let cat = "Todos", all = false, list = [];

  const cover = p => p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy">` : `<i class="fa-solid fa-${p.icon}"></i>`;
  const hue = p => HUES[PROJECTS.indexOf(p) % HUES.length];

  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .1 });

  function render() {
    list = PROJECTS.filter(p => cat === "Todos" || p.cat === cat);
    const shown = all ? list : list.slice(0, LIMIT);
    album.innerHTML = shown.map((p, i) => `<button class="tile" data-i="${i}" style="--h:${hue(p)};--d:${(i % 4) * 70}ms">
      <span class="cover">${cover(p)}<em class="st ${p.status}">${ST[p.status]}</em><span class="peek"><i class="fa-solid fa-expand"></i></span></span>
      <strong>${p.name}</strong><small>${p.tags.slice(0, 2).join(" · ")}</small></button>`).join("");
    album.querySelectorAll(".tile").forEach(t => io.observe(t));
    more.hidden = list.length <= LIMIT;
    more.textContent = all ? "Mostrar menos" : `Ver todos (${list.length})`;
  }

  const cats = ["Todos", ...new Set(PROJECTS.map(p => p.cat))];
  chips.innerHTML = cats.map(c => `<button class="chip${c === "Todos" ? " on" : ""}">${c}</button>`).join("");
  chips.onclick = e => {
    if (!e.target.classList.contains("chip")) return;
    cat = e.target.textContent; all = false;
    chips.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c === e.target));
    render();
  };
  more.onclick = () => { all = !all; render(); };

  let cur = 0;
  function open(i) {
    cur = (i + list.length) % list.length;
    const p = list[cur];
    pm.innerHTML = `<div class="pm-cover" style="--h:${hue(p)}">${cover(p)}</div>
      <div class="pm-body"><span class="st ${p.status}">${ST[p.status]}</span><h3>${p.name}</h3><p>${p.desc}</p>
      <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
      <div class="pm-links">${p.github ? `<a class="btn btn-ghost" href="${p.github}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Código</a>` : ""}${p.live ? `<a class="btn btn-primary" href="${p.live}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Ver online</a>` : ""}</div></div>`;
    if (!dlg.open) dlg.showModal();
  }
  album.onclick = e => { const t = e.target.closest(".tile"); if (t) open(+t.dataset.i); };
  $("#pmPrev").onclick = () => open(cur - 1);
  $("#pmNext").onclick = () => open(cur + 1);
  $("#pmClose").onclick = () => dlg.close();
  dlg.onclick = e => { if (e.target === dlg) dlg.close(); };
  dlg.addEventListener("keydown", e => { if (e.key === "ArrowLeft") open(cur - 1); if (e.key === "ArrowRight") open(cur + 1); });

  $("#statProj").textContent = PROJECTS.length;
  render();
})();
