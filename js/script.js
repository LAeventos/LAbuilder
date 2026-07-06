const state = {
  template: '',
  layout: '',
  color: '',
  hex: '#c026d3'
};

const whatsappNumber = '5511950358430';
const steps = ['modelos', 'cores', 'personalizacao', 'preview', 'resumo'];

const templateCards = document.querySelectorAll('.template-card');
const colorCards = document.querySelectorAll('.color-card');
const progressSteps = document.querySelectorAll('.progress-step');
const landingPreview = document.getElementById('landingPreview');
const summaryTemplate = document.getElementById('summaryTemplate');
const summaryColor = document.getElementById('summaryColor');
const whatsappBtn = document.getElementById('whatsappBtn');

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 350);
}

function unlockSection(id) {
  const section = document.getElementById(id);
  if (section) section.classList.add('unlocked');
}

function updateAccent(hex) {
  document.documentElement.style.setProperty('--accent', hex);
  document.documentElement.style.setProperty('--accent-soft', `${hex}2b`);
}

function updateProgress(activeId) {
  const activeIndex = steps.indexOf(activeId);
  progressSteps.forEach((step, index) => {
    step.classList.toggle('active', index === activeIndex);
    step.classList.toggle('done', index < activeIndex);
  });
}

function updatePreview() {
  landingPreview.classList.remove('dark-mode', 'split-mode', 'center-mode');

  if (['dark', 'neon', 'luxury'].includes(state.layout)) {
    landingPreview.classList.add('dark-mode');
  }

  if (['corporate', 'sales', 'creative'].includes(state.layout)) {
    landingPreview.classList.add('split-mode');
  }

  if (['clean', 'natural'].includes(state.layout)) {
    landingPreview.classList.add('center-mode');
  }
}

function updateSummary() {
  summaryTemplate.textContent = state.template || '—';
  summaryColor.textContent = state.color || '—';
  whatsappBtn.disabled = !(state.template && state.color);
}

function selectTemplate(card) {
  templateCards.forEach(item => item.classList.remove('selected'));
  card.classList.add('selected');

  state.template = card.dataset.template;
  state.layout = card.dataset.layout;

  unlockSection('cores');
  updateSummary();
  updatePreview();
  updateProgress('cores');
  scrollToSection('cores');
}

function selectColor(card) {
  colorCards.forEach(item => item.classList.remove('selected'));
  card.classList.add('selected');

  state.color = card.dataset.color;
  state.hex = card.dataset.hex;

  updateAccent(state.hex);
  unlockSection('personalizacao');
  unlockSection('preview');
  unlockSection('resumo');
  updateSummary();
  updatePreview();
  updateProgress('personalizacao');
  scrollToSection('personalizacao');
}

templateCards.forEach(card => {
  card.addEventListener('click', () => selectTemplate(card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectTemplate(card);
    }
  });
});

colorCards.forEach(card => {
  card.addEventListener('click', () => selectColor(card));
});

document.querySelectorAll('[data-target]').forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.target;
    const section = document.getElementById(target);

    if (section && !section.classList.contains('locked')) {
      updateProgress(target);
      scrollToSection(target);
    } else if (target === 'modelos') {
      updateProgress(target);
      scrollToSection(target);
    }
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) updateProgress(entry.target.id);
  });
}, { threshold: 0.45 });

steps.forEach(id => {
  const section = document.getElementById(id);
  if (section) observer.observe(section);
});

whatsappBtn.addEventListener("click", () => {
  if (!(state.template && state.color)) return;

  const numeroWhatsapp = "5511916509898";

  const mensagem = `🚀 Novo pedido - LA Builder

Olá!
Aqui está a escolha da minha landing page.
📌 Modelo visual escolhido:
${state.template}

🎨 Cor escolhida:
${state.color}

Gostaria de continuar o atendimento e enviar minha logo, textos e imagens pelo WhatsApp.
Obrigado!!`;

  window.location.href =
    `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
});
