const apiUrl = "http://localhost:3000/";

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

async function init() {
  const data = await getData(apiUrl);

  // Mostrar peliculas desde mySQL
  const listaDePeliculas = document.getElementById("listaDePeliculas");
  const noHayPeliculas = document.getElementById("noHayPeliculas");
  let resultadoHTML = "";

  
  

  data.forEach((pelicula) => {
    const template = /*html*/ `
    <article class="imagen-port">
      <img src="${pelicula.imagenUrl}" alt="" loading="lazy" />
      <div class="hover-galeria">
        <h4>${pelicula.titulo}</h4>
        <img src="${pelicula.imagenUrl}" alt="${pelicula.titulo}" loading="lazy" />
        <a href="${pelicula.descargarUrl}" target="_blank">Descargar película</a>
      </div>
    </article>
    `;

    resultadoHTML += template;
  });

  if (data.length > 0) {
    listaDePeliculas.innerHTML = resultadoHTML;
  } else {
    noHayPeliculas.innerHTML = "No tenemos películas disponibles.";
  }

  // Barra de busqueda de peliculas
  const formatearTexto = (texto) => {
    return texto
      .toLowerCase() // Pasamos a minusculas el texto completo
      .trim() // quita espacios
      .split(" ") // Separamos por espacios
      .join("") // Unimos todos los elementos en un solo texto
      .normalize("NFD") // quitar acentos
      .replace(/[\u0300-\u036f]/gu, "") // elimina acentos
      .replace(/[^a-zA-Z0-9]/g, "") // elimina caracteres especiales
      .replace(/\s+/g, ""); // elimina espacios
  };

  const buscarPelicula = (peliculas, nombre) => {
    const busquedaUsuario = formatearTexto(nombre);
    const resultado = peliculas.filter((pelicula) => {
      return (
        formatearTexto(pelicula.titulo) +
        formatearTexto(pelicula.descripcionBusqueda)
      ).includes(busquedaUsuario);
    });

    return resultado;
  };

  const inputSerch = document.getElementById("buscador");

  inputSerch.addEventListener("keyup", (event) => {
    const busquedaUsuario = event.target.value;
    const resultado = buscarPelicula(data, busquedaUsuario);

    event.preventDefault();

    if (resultado.length === 0) {
      listaDePeliculas.innerHTML = /*html*/ `
        <div class="loading" id="noHayPeliculas">No hay pelicula que coincida con tu búsqueda.</div>
      `;
    } else {
      listaDePeliculas.innerHTML = "";

      resultado.forEach((pelicula) => {
        const template = /*html*/ `
        <article class="imagen-port">
          <a hfre="file:///C:/Users/yo/Desktop/yo/Pelisonline/lugar%20de%20ver%20la%20pelicula-Batman.html"><img src="${pelicula.imagenUrl}" alt="" loading="lazy" /></a>
          <div class="hover-galeria">
            <h4>${pelicula.titulo}</h4>
            <img src="${pelicula.imagenUrl}" alt="${pelicula.titulo}" loading="lazy" />
            <a href="${pelicula.descargarUrl}" target="_blank">Descargar película</a>
          </div>
        </article> 
          `;

        listaDePeliculas.innerHTML += template;
      });
    }
  });
}

window.addEventListener("load", init);
