
document.getElementById("enter-site").addEventListener("click", () => {
  document.getElementById("intro-cover").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("intro-cover").style.display = "none";
  }, 500);
});
const contentEl = document.getElementById("content");
const tocEl = document.getElementById("toc");
const searchInput = document.getElementById("search");

fetch('insulinoterapia.txt')
  .then(res => res.text())
  .then(text => {
    const re = /Sección\s+(\d+):\s*([^\n]+)\n/gi;
    const matches = [...text.matchAll(re)];

    const sectionRefs = [];

    matches.forEach((match, index) => {
      const sectionNum = match[1];
      const title = match[2];
      const startIndex = match.index + match[0].length;
      const endIndex = index + 1 < matches.length ? matches[index + 1].index : text.length;
      const body = text.substring(startIndex, endIndex).trim();
      const id = `seccion-${sectionNum}`;

      const li = document.createElement("li");
      li.innerHTML = `<a href="#${id}">Sección ${sectionNum}: ${title}</a>`;
      tocEl.appendChild(li);

      const sectionEl = document.createElement("section");
      sectionEl.id = id;
      sectionEl.setAttribute("data-aos", "fade-up");
      sectionEl.innerHTML = `
        <button class="collapsible">Sección ${sectionNum}: ${title}</button>
        <div>${body.replace(/\n/g, '<br>')}</div>
      `;
      contentEl.appendChild(sectionEl);

      sectionRefs.push({ id, title: title.toLowerCase(), element: sectionEl });
    });

    document.querySelectorAll(".collapsible").forEach(btn => {
      btn.addEventListener("click", function () {
        const content = this.nextElementSibling;
        content.style.display = content.style.display === "block" ? "none" : "block";
      });
    });

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      sectionRefs.forEach(ref => {
        ref.element.style.display = ref.title.includes(query) ? "block" : "none";
      });
    });
  })
  .catch(err => {
    contentEl.innerHTML += `<p style="color:red;">Error al cargar el archivo: ${err.message}</p>`;
  });

// Modo oscuro
document.getElementById("toggle-dark").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Recordar preferencia
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Exportar a PDF usando print
document.getElementById("print").addEventListener("click", () => {
  Swal.fire({
    title: '¿Exportar a PDF?',
    text: "Esto abrirá la ventana de impresión de tu navegador",
    icon: 'info',
    confirmButtonText: 'Aceptar'
  }).then(() => window.print());
});

// Inicialización de animaciones al hacer scroll
AOS.init({
  duration: 800,
  once: true
});
