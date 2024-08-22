<template>
  <div id="contenedor-datos">
    <ul>
      <li v-for="pelicula in peliculas" :key="pelicula.id">
        <h3>{{ pelicula.titulo }}</h3>
        <p>Duración: {{ pelicula.duracion }}</p>
        <p>Género: {{ pelicula.genero }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'MoviesList',
  setup() {
    const peliculas = ref([]);

    // Función para obtener datos
    const fetchPeliculas = async () => {
      try {
        const response = await fetch('http://localhost:3001/movies/v1'); // Reemplaza con la URL de tu API
        const data = await response.json();
        peliculas.value = data.data; // Ajusta según la estructura de tu respuesta
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    // Llama a la función cuando el componente se monte
    onMounted(fetchPeliculas);

    return { peliculas };
  },
};
</script>

<style scoped>
/* Agrega estilos si es necesario */
</style>
