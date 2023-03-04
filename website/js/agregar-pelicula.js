const apiUrl = 'http://localhost:3000/';

async function addData(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const newData = await res.json();

  return newData;
}

window.addEventListener('load', () => {
  const form = document.getElementById('agregar');

  form.addEventListener('submit', async event => {
    // form.addEventListener('submit', async event => {
    event.preventDefault();
    console.log('Agregando datos a la base de datos');

    const form = event.target;
    const formData = new FormData(form);
    /scrum master/IMG-20210727-WA0031_Original.jpg
    const data = {
      titulo: formData.get('titulo'),
      descripcionBusqueda: formData.get('descripcion'),
      imagenUrl: formData.get('url'),
      descargarUrl: formData.get('url-pelicula'),
    };

    console.log(data);

    const newData = await addData(apiUrl, data);

    console.log('Agregando datos a la base de datos');
    console.log('Resultado:', newData);

    await form.reset();
    alert('Se agrego la pelicula, Gracias por ayudarnos');
  });
});
