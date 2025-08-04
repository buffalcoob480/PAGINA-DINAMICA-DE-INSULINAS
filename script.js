const contentEl = document.getElementById("content");
const tocEl = document.getElementById("toc");

fetch('insulinoterapia.txt')
  .then(res => res.text())
  .then(text => {
    const re = /Sección\s+(\d+):\s*([^\n]+)\n/gi;
    const matches = [...text.matchAll(re)];

    matches.forEach((match, index) => {
      const sectionNum = match[1];
      const title = match[2];
      const startIndex = match.index + match[0].length;
      const endIndex = index + 1 < matches.length ? matches[index + 1].index : text.length;
      const body = text.substring(startIndex, endIndex).trim();

      const id = `seccion-${sectionNum}`;

      // TOC
      const li = document.createElement("li");
      li.innerHTML = `<a href="#${id}">Sección ${sectionNum}: ${title}</a>`;
      tocEl.appendChild(li);

      // Sección expandible
      const sectionEl = document.createElement("section");
      sectionEl.id = id;
      sectionEl.innerHTML = `
        <button class="collapsible">Sección ${sectionNum}: ${title}</button>
        <div>${body.replace(/\n/g, '<br>')}</div>
      `;
      contentEl.appendChild(sectionEl);
    });

    // Toggle de colapsables
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
