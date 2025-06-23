const imageBackgrounds = [
  { file: 'neo.png', label: 'Neo' },
  { file: 'cyber.png', label: 'Cyberpunk' },
  { file: '70s.png', label: '70s Retro' },
  { file: 'chalk.png', label: 'Chalkboard' },
  { file: 'landscape01.png', label: 'Landscape 01' },
  { file: 'landscape02.png', label: 'Landscape 02' },
  { file: 'landscape03.png', label: 'Landscape 03' },
  { file: 'landscape05.png', label: 'Landscape 05' },
  { file: 'landscape06.png', label: 'Landscape 06' },
  { file: 'landscape07.png', label: 'Landscape 07' },
  { file: 'landscape08.png', label: 'Landscape 08' },
  { file: 'landscape09.png', label: 'Landscape 09' },
  { file: 'landscape10.png', label: 'Landscape 10' },
  { file: 'landscape11.png', label: 'Landscape 11' },
  { file: 'landscape12.png', label: 'Landscape 12' },
  { file: 'landscape13.png', label: 'Landscape 13' },
  { file: 'landscape14.png', label: 'Landscape 14' }
];

function initImageDropdown() {
  const select = document.getElementById('image-bg-dropdown');
  if (!select) return;

  // Add options
  imageBackgrounds.forEach(img => {
    const option = document.createElement('option');
    option.value = img.file;
    option.textContent = img.label;
    select.appendChild(option);
  });

  // On change, update background
  select.addEventListener('change', () => {
    const selected = select.value;
    if (!selected) {
      document.body.style.backgroundImage = '';
    } else {
      document.body.style.backgroundImage = `url('/Generic/static/images/${selected}')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
    }
  });
}

window.addEventListener('DOMContentLoaded', initImageDropdown);
