// ==============================
// CONFIGURAÇÕES DO LA BUILDER
// ==============================

const CONFIG = {
    whatsappNumber: "5511916509898"
};
const state = {
  template: '',
  layout: '',
  color: '',
  hex: '#c026d3',
  logoName: '',
  logoData: '',
  headline: 'Seu evento merece uma presença digital incrível',
  subtitle: 'Uma landing page feita para apresentar sua empresa e receber novos pedidos.',
  buttonText: 'Solicitar orçamento',
  highlight: 'Sua ideia já começa a ganhar forma aqui.',
  businessName: '',
  segment: '',
  selectedEventFields: ['Tipo de evento', 'Quantidade aproximada de pessoas', 'Cidade / local do evento', 'Data ou período do evento'],
  instagram: '',
  notes: ''
};

const whatsappNumber = '5511950358430';
const steps = ['modelos', 'cores', 'logo', 'frases', 'personalizacao', 'preview', 'resumo'];

const templateCards = document.querySelectorAll('.template-card');
const colorCards = document.querySelectorAll('.color-card');
const progressSteps = document.querySelectorAll('.progress-step');
const landingPreview = document.getElementById('landingPreview');
const summaryTemplate = document.getElementById('summaryTemplate');
const summaryColor = document.getElementById('summaryColor');
const summaryLogo = document.getElementById('summaryLogo');
const summaryHeadline = document.getElementById('summaryHeadline');
const summaryButton = document.getElementById('summaryButton');
const summaryBusiness = document.getElementById('summaryBusiness');
const summarySegment = document.getElementById('summarySegment');
const summaryEvent = document.getElementById('summaryEvent');
const summaryLocation = document.getElementById('summaryLocation');
const whatsappBtn = document.getElementById('whatsappBtn');

const logoInput = document.getElementById('logoInput');
const headlineInput = document.getElementById('headlineInput');
const subtitleInput = document.getElementById('subtitleInput');
const buttonTextInput = document.getElementById('buttonTextInput');
const highlightInput = document.getElementById('highlightInput');
const businessNameInput = document.getElementById('businessNameInput');
const segmentInput = document.getElementById('segmentInput');
const eventFieldCheckboxes = document.querySelectorAll('.event-field-checkbox');
const instagramInput = document.getElementById('instagramInput');
const notesInput = document.getElementById('notesInput');

const logoTargets = [
  document.getElementById('phoneLogoPreview'),
  document.getElementById('phraseLogoPreview'),
  document.getElementById('mainLogoPreview')
].filter(Boolean);

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
}

function unlockSection(id) {
  const section = document.getElementById(id);
  if (section) section.classList.add('unlocked');
}

function unlockFrom(index) {
  steps.slice(index).forEach(unlockSection);
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

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function updateLogoPreviews() {
  logoTargets.forEach(target => {
    target.innerHTML = '';
    if (state.logoData) {
      const img = document.createElement('img');
      img.src = state.logoData;
      img.alt = 'Logo enviada';
      target.appendChild(img);
      target.classList.add('has-logo');
    } else {
      target.textContent = 'SUA LOGO';
      target.classList.remove('has-logo');
    }
  });
}

function updateTexts() {
  setText('phoneTitlePreview', state.headline);
  setText('phoneSubtitlePreview', state.subtitle);
  setText('phoneButtonPreview', state.buttonText);

  setText('phraseTitlePreview', state.headline);
  setText('phraseSubtitlePreview', state.subtitle);
  setText('phraseButtonPreview', state.buttonText);
  setText('phoneHighlightPreview', state.highlight);

  setText('mainTitlePreview', state.headline || 'Seu título principal aqui');
  setText('mainSubtitlePreview', state.subtitle || 'Texto de apresentação da sua empresa, serviço ou produto.');
  setText('mainButtonPreview', state.buttonText || 'Botão de ação');
  setText('mainHighlightPreview', state.highlight || 'Sua empresa');
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

  updateLogoPreviews();
  updateTexts();
}

function updateSummary() {
  summaryTemplate.textContent = state.template || '—';
  summaryColor.textContent = state.color || '—';
  if (summaryLogo) summaryLogo.textContent = state.logoName || 'Será enviada no WhatsApp';
  if (summaryHeadline) summaryHeadline.textContent = state.headline || '—';
  if (summaryButton) summaryButton.textContent = state.buttonText || '—';
  if (summaryBusiness) summaryBusiness.textContent = state.businessName || '—';
  if (summarySegment) summarySegment.textContent = state.segment || '—';
  if (summaryEvent) summaryEvent.textContent = state.selectedEventFields.length ? state.selectedEventFields.join(', ') : 'Nenhum campo selecionado';
  if (summaryLocation) summaryLocation.textContent = state.instagram || '—';
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
  unlockFrom(steps.indexOf('logo'));
  updateSummary();
  updatePreview();
  updateProgress('logo');
  scrollToSection('logo');
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

if (logoInput) {
  logoInput.addEventListener('change', () => {
    const file = logoInput.files?.[0];
    if (!file) return;

    state.logoName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      state.logoData = reader.result;
      updatePreview();
      updateSummary();
    };
    reader.readAsDataURL(file);
  });
}

[
  [headlineInput, 'headline'],
  [subtitleInput, 'subtitle'],
  [buttonTextInput, 'buttonText'],
  [highlightInput, 'highlight']
].forEach(([input, key]) => {
  if (!input) return;
  input.addEventListener('input', () => {
    state[key] = input.value.trim() || {
      headline: 'Seu evento merece uma presença digital incrível',
      subtitle: 'Uma landing page feita para apresentar sua empresa e receber novos pedidos.',
      buttonText: 'Solicitar orçamento',
      highlight: 'Sua ideia já começa a ganhar forma aqui.'
    }[key];
    updatePreview();
    updateSummary();
  });
});


[
  [businessNameInput, 'businessName'],
  [segmentInput, 'segment'],
  [instagramInput, 'instagram'],
  [notesInput, 'notes']
].forEach(([input, key]) => {
  if (!input) return;
  input.addEventListener('input', () => {
    state[key] = input.value.trim();
    updateSummary();
  });
  input.addEventListener('change', () => {
    state[key] = input.value.trim();
    updateSummary();
  });
});


eventFieldCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    state.selectedEventFields = Array.from(eventFieldCheckboxes)
      .filter(item => item.checked)
      .map(item => item.value);
    updateSummary();
  });
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

whatsappBtn.addEventListener('click', () => {
  if (!(state.template && state.color)) return;

  const mensagem = `Olá! Quero finalizar minha Landing Page personalizada.\n\n` +
    `Modelo visual escolhido: ${state.template}\n` +
    `Cor principal: ${state.color}\n` +
    `Logo: ${state.logoName ? 'visualizada na prévia (' + state.logoName + ')' : 'vou enviar aqui pelo WhatsApp'}\n\n` +
    `Frases escolhidas:\n` +
    `Título principal: ${state.headline}\n` +
    `Subtítulo: ${state.subtitle}\n` +
    `Texto do botão: ${state.buttonText}\n` +
    `Frase de destaque: ${state.highlight}\n\n` +
    `Dados para orçamento:\n` +
    `Empresa/projeto: ${state.businessName || 'não informado'}\n` +
    `Segmento: ${state.segment || 'não informado'}\n` +
    `Campos que devem aparecer no formulário da landing:\n` +
    `${state.selectedEventFields.length ? state.selectedEventFields.map(campo => '• ' + campo).join('\\n') : 'Nenhum campo selecionado'}\n` +
    `Instagram/rede social: ${state.instagram || 'não informado'}\n` +
    `Observações: ${state.notes || 'nenhuma'}\n\n` +
    `Agora quero enviar a logo e fotos pelo WhatsApp para finalizar.`;

  window.location.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
});

updatePreview();
updateSummary();
