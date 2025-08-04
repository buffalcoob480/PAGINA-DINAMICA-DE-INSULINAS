const contentEl = document.getElementById("content");
const tocEl = document.getElementById("toc");

fetch('insulinoterapia.txt')
  .then(res => res.text())
  .then(text => {
    const sections = text.split(/Sección (\d+):/g).filter(Boolean);

    for (let i = 0; i < sections.length; i += 2) {
      const num = sections[i];
      const content = sections[i + 1];
      const lines = content.trim().split('\n');
      const title = lines[0].trim();
      const body = lines.slice(1).join('\n');
      const id = `seccion-${num}`;

      // Agregar enlace en la barra lateral
      const li = document.createElement("li");
      li.innerHTML = `<a href="#${id}">Sección ${num}: ${title}</a>`;
      tocEl.appendChild(li);

      // Agregar sección colapsable
      const sectionEl = document.createElement("section");
      sectionEl.id = id;
      sectionEl.innerHTML = `
        <button class="collapsible">Sección ${num}: ${title}</button>
        <div>${body.replace(/\n/g, '<br>')}</div>
      `;
      contentEl.appendChild(sectionEl);
    }

    // Interactividad para colapsables
    document.querySelectorAll(".collapsible").forEach(btn => {
      btn.addEventListener("click", function () {
        const content = this.nextElementSibling;
        content.style.display = content.style.display === "block" ? "none" : "block";
      });
    });
  })
  .catch(err => {
    contentEl.innerHTML += `<p style="color:red;">Error al cargar el archivo: ${err.message}</p>`;
  });
