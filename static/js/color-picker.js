document.addEventListener('DOMContentLoaded', () => {
  // Background Color Picker
  const bgPickr = Pickr.create({
    el: '#color-picker-container',
    theme: 'classic',
    default: 'rgba(255, 255, 255, 1)',
    swatches: ['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff'],
    components: {
      preview: true,
      opacity: true,
      hue: true,
      interaction: {
        input: true,
        save: true
      }
    }
  });

  bgPickr.on('save', (color) => {
    const rgba = color.toRGBA().toString();
    document.body.style.backgroundColor = rgba;
  });

  // Font Color Picker
  const fontPickr = Pickr.create({
    el: '#font-color-picker-container',
    theme: 'classic',
    default: '#1a1a1a',
    swatches: ['#000000', '#ffffff', '#1a1a1a', '#ff0000', '#00ff00', '#0000ff'],
    components: {
      preview: true,
      opacity: true,
      hue: true,
      interaction: {
        input: true,
        save: true
      }
    }
  });

  fontPickr.on('save', (color) => {
    const hex = color.toHEXA().toString();
    document.body.style.color = hex;
    document.querySelectorAll('h1, h2, nav a, .card h2').forEach(el => el.style.color = hex);
  });
});
