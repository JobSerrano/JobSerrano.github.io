function mostrarSeccion(id) 
{
  const secciones = document.querySelectorAll('.seccion');
  secciones.forEach(sec => {
    sec.style.display = 'none';
  });
  document.getElementById(id).style.display = 'block';
}

// Mostrar la sección de inicio por defecto al cargar
window.onload = function () {
  mostrarSeccion('inicio');
};
