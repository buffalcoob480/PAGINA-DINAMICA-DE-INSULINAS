const contentEl = document.getElementById("content");
const tocEl = document.getElementById("toc");

fetch('insulinoterapia.txt')
  .then(res => res.text())
  .then(text => {
    const sections = text.split(/Sección \d+:/g).filter(Boolean);

    sections.forEach((sec, index) => {
      const titleMatch = sec.match(/^.*\n/);
      const title = titleMatch ? titleMatch[0].trim() : `Sección ${index + 1}`;
      const id = `seccion-${index + 1}`;

      // Crear enlace en la barra lateral
      const li = document.createElement("li");
      li.innerHTML = `<a href="#${id}">${title}</a>`;
      tocEl.appendChild(li);

      // Crear sección principal
      const sectionEl = document.createElement("section");
      sectionEl.id = id;
      sectionEl.innerHTML = `
        <button class="collapsible">${title}</button>
        <div>${sec.replace(titleMatch, '').replace(/\n/g, '<br>')}</div>
      `;
      contentEl.appendChild(sectionEl);
    });

    // Interacción con los botones colapsables
    document.querySelectorAll(".collapsible").forEach(btn => {
      btn.addEventListener("click", function() {
        const content = this.nextElementSibling;
        content.style.display = content.style.display === "block" ? "none" : "block";
      });
    });
  })
  .catch(err => {
    contentEl.innerHTML += `<p style="color:red;">Error al cargar el archivo: ${err.message}</p>`;
  });
