
document.getElementById('buscador').addEventListener('input', function() {
  const texto = this.value.toLowerCase();
  document.querySelectorAll('main section').forEach(sec => {
    sec.style.display = sec.textContent.toLowerCase().includes(texto) ? 'block' : 'none';
  });
});
