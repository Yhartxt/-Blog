const lista = document.getElementById("listaEntradas");
const vacio = document.getElementById("vacio");
const buscar = document.getElementById("buscar");

function formatearFecha(texto) {
  // Se añade la hora para evitar desfases de zona horaria
  return new Date(texto + "T00:00:00").toLocaleDateString("es-MX", {
    day: "numeric", month: "long", year: "numeric"
  });
}

function mostrar() {
  const q = buscar.value.trim().toLowerCase();
  const filtradas = posts
    .filter(p => (p.titulo + p.categoria + p.contenido).toLowerCase().includes(q))
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  lista.innerHTML = "";
  vacio.hidden = filtradas.length > 0;

  filtradas.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = p.categoria || "General";

    const h3 = document.createElement("h3");
    h3.textContent = p.titulo;

    const fecha = document.createElement("span");
    fecha.className = "fecha";
    fecha.textContent = formatearFecha(p.fecha);

    const texto = document.createElement("p");
    texto.textContent = p.contenido;

    card.append(tag, h3, fecha, texto);
    lista.appendChild(card);
  });
}

buscar.addEventListener("input", mostrar);

// Menú móvil
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => nav.classList.remove("open"))
);

document.getElementById("anio").textContent = new Date().getFullYear();
mostrar();