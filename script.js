
AOS.init({ duration: 800, once: true });

document.querySelectorAll('.faq').forEach(el => {
  el.addEventListener('click', () => {
    const answer = el.querySelector('.faq-answer');
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  });
});

const contentEl = document.getElementById("content");
const tocEl = document.getElementById("toc");
const searchInput = document.getElementById("search");

fetch('insulinoterapia.txt')
  .then(res => res.text())
  .then(text => {
    const sections = text.split(/Sección\s+(\d+):/g).filter(Boolean);
    for (let i = 0; i < sections.length; i += 2) {
      const num = sections[i];
      const content = sections[i + 1];
      const lines = content.trim().split('\n');
      const title = lines[0];
      const body = lines.slice(1).join('\n');

      const id = `seccion-${num}`;
      const li = document.createElement("li");
      li.innerHTML = `<a href="#${id}">Sección ${num}: ${title}</a>`;
      tocEl.appendChild(li);

      const sectionEl = document.createElement("section");
      sectionEl.id = id;
      sectionEl.innerHTML = `
        <h2>Sección ${num}: ${title}</h2>
        <p>${body.replace(/\n/g, '<br>')}</p>
      `;
      contentEl.appendChild(sectionEl);
    }
  });
