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

// ---------- Cursos, aprendizaje y hobbies ----------
function crear(tag, clase, texto) {
  const e = document.createElement(tag);
  if (clase) e.className = clase;
  if (texto) e.textContent = texto;
  return e;
}

// Imagen que se reemplaza por un recuadro gris si no carga
function imagen(src, alt, clase) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.loading = "lazy";
  if (clase) img.className = clase;
  img.addEventListener("error", () => {
    const ph = crear("div", "placeholder");
    ph.setAttribute("role", "img");
    ph.setAttribute("aria-label", alt);
    img.replaceWith(ph);
  });
  return img;
}

function mostrarCursos() {
  const cont = document.getElementById("listaCursos");
  cursos.forEach(c => {
    const card = crear("article", "card curso");
    const info = crear("div", "info");
    info.append(
      crear("span", "tag", c.emisor),
      crear("h3", "", c.titulo),
      crear("span", "fecha", c.fecha),
      crear("p", "", c.descripcion)
    );
    card.append(imagen(c.imagen, "Medalla: " + c.titulo, "insignia"), info);
    cont.appendChild(card);
  });
}

function mostrarAprendiendo() {
  const cont = document.getElementById("listaAprendiendo");
  aprendiendo.forEach(a => {
    const card = crear("article", "card");
    const chips = crear("div", "chips");
    a.etiquetas.forEach(t => chips.appendChild(crear("span", "chip", t)));
    card.append(crear("h3", "", a.titulo), crear("p", "", a.descripcion), chips);
    cont.appendChild(card);
  });
}

function mostrarHobbies() {
  const cont = document.getElementById("listaHobbies");
  hobbies.forEach(h => {
    const bloque = crear("article", "hobby");
    const galeria = crear("div", "galeria");
    h.fotos.forEach(f => galeria.appendChild(imagen(f.src, f.alt)));
    bloque.append(crear("h3", "", h.nombre), crear("p", "", h.descripcion), galeria);
    cont.appendChild(bloque);
  });
}

mostrarCursos();
mostrarAprendiendo();
mostrarHobbies();

function mostrarContacto() {
  const cont = document.getElementById("listaContacto");
  contactos.forEach(c => {
    const a = crear("a", "contacto");
    a.href = c.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", c.nombre + " (se abre en una pestaña nueva)");
    a.append(
      crear("div", "inicial", c.nombre.charAt(0)),
      crear("strong", "", c.nombre),
      crear("span", "det", c.detalle)
    );
    cont.appendChild(a);
  });
}

mostrarContacto();