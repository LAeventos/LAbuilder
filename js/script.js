// CONFIGURAÇÕES DO LA BUILDER
const CONFIG = {
  whatsappNumber: '5511999999999'
};

const state = {
  template: '',
  layout: 'original',
  color: '',
  hex: '#2563ff'
};

const steps = ['modelos', 'cores', 'preview', 'resumo'];
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
  setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 260);
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
  landingPreview.dataset.template = state.layout || 'original';
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
  unlockSection('preview');
  unlockSection('resumo');
  updateSummary();
  updatePreview();
  updateProgress('preview');
  scrollToSection('preview');
}

templateCards.forEach(card => {
  card.addEventListener('click', () => selectTemplate(card));
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectTemplate(card);
    }
  });
});

colorCards.forEach(card => card.addEventListener('click', () => selectColor(card)));

document.querySelectorAll('[data-target]').forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.target;
    const section = document.getElementById(target);
    if (target === 'modelos' || (section && !section.classList.contains('locked'))) {
      updateProgress(target);
      scrollToSection(target);
    }
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) updateProgress(entry.target.id);
  });
}, { threshold: 0.45 });

steps.forEach(id => {
  const section = document.getElementById(id);
  if (section) observer.observe(section);
});

whatsappBtn.addEventListener('click', () => {
  if (!(state.template && state.color)) return;
  const mensagem = `Olá! Quero continuar a criação da minha Landing Page.

` +
    `Modelo escolhido: ${state.template}
` +
    `Cor principal: ${state.color}

` +
    `Agora podemos continuar com logo, textos, fotos e demais informações.`;
  window.location.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
});

updateAccent(state.hex);
updatePreview();
updateSummary();
