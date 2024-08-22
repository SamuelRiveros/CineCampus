fetch('http://localhost:3001/movies/v1') // Reemplaza con la URL de tu API
  .then(response => response.json())
  .then(data => {
    // Guardar los datos en una variable
    const peliculas = data.data; 
    console.log(peliculas)
    // Crear la lista
    const lista = document.createElement('ul');

    // Iterar sobre los datos y crear elementos de lista
    peliculas.forEach(pelicula => {
      const elementoLista = document.createElement('li');
      elementoLista.innerHTML = 
        `
        <h3>${pelicula.titulo}</h3>
        <p>Duración: ${pelicula.duracion}</p>
        <p>Género: ${pelicula.genero}</p>
      `;
      lista.appendChild(elementoLista);
    });

    // Agregar la lista al documento
    const contenedor = document.getElementById('contenedor-datos'); // Reemplaza con el ID de tu contenedor
    contenedor.appendChild(lista);
  })
  .catch(error => console.error('Error al obtener datos:', error));