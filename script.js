function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== Menu hamburguer =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach(el => el.classList.add('in-view'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));
}

// ===== Nav ativo conforme a seção visível =====
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav a[data-nav]');

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(section => navObserver.observe(section));
}

// ===== Efeito de digitação no editor =====
const codeTyper = document.getElementById('codeTyper');

const codeLines = [
  { indent: 0, html: '<span class="kw">const</span> <span class="prop">desenvolvedor</span> = {' },
  { indent: 1, html: '<span class="prop">nome</span>: <span class="str">"Fidel Maluto"</span>,' },
  { indent: 1, html: '<span class="prop">cargo</span>: <span class="str">"Full Stack Developer"</span>,' },
  { indent: 1, html: '<span class="prop">stack</span>: [<span class="str">"Node.js"</span>, <span class="str">"Angular"</span>, <span class="str">"MongoDB"</span>],' },
  { indent: 1, html: '<span class="prop">status</span>: <span class="str">"disponivel_para_novos_projetos"</span>' },
  { indent: 0, html: '};' },
];

function renderStaticCode() {
  codeTyper.innerHTML = codeLines
    .map(line => '  '.repeat(line.indent) + line.html)
    .join('\n');
}

function typeCode() {
  let output = '';
  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= codeLines.length) {
      codeTyper.innerHTML = output;
      const caret = document.createElement('span');
      caret.className = 'caret';
      codeTyper.appendChild(caret);
      return;
    }
    const line = codeLines[lineIndex];
    output += (lineIndex > 0 ? '\n' : '') + '  '.repeat(line.indent) + line.html;
    codeTyper.innerHTML = output + '<span class="caret"></span>';
    lineIndex++;
    setTimeout(typeLine, 220);
  }

  typeLine();
}

if (codeTyper) {
  if (reduceMotion) {
    renderStaticCode();
  } else {
    typeCode();
  }
}

// ===== Envio de mensagem via WhatsApp =====
const whatsappForm = document.getElementById('whatsappForm');
const WHATSAPP_NUMBER = '244950620392';

if (whatsappForm) {
  whatsappForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('wa-name').value.trim();
    const message = document.getElementById('wa-message').value.trim();

    if (!name || !message) return;

    const text = `Olá Fidel, meu nome é ${name}. ${message}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank', 'noopener');
    whatsappForm.reset();
  });
}
