<script>
import { ref, onMounted, reactive } from 'vue';

export default {
  name: 'Home',
  setup() {
    const peliculas = ref([]);
    const usuario = ref({});
    const activeIndex = ref(0); // Índice de la película actualmente visible
    const scroller = ref(null); // Referencia al contenedor de películas

    // obtener datos de las peliculas
    const fetchPeliculas = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/getallmovies');
        const data = await response.json();
        peliculas.value = data.data; // Ajusta según la estructura de tu respuesta
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    // obtener datos de un usuario
    const fetchUsuario = async (id) => {
      try {
        const response = await fetch(`http://localhost:3001/api/getuserbyid/${id}`);
        const data = await response.json();
        usuario.value = data.data;
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    // Función para desplazarse a una película específica
    const scrollToMovie = (index) => {
      if (scroller.value) {
        const movieElement = scroller.value.children[index];
        movieElement.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        activeIndex.value = index; // Actualizamos el índice activo
      }
    };

    // Actualizamos el índice activo basado en el desplazamiento
    const updateActiveIndex = () => {
      const scrollerElement = scroller.value;
      if (scrollerElement) {
        const scrollLeft = scrollerElement.scrollLeft;
        const movieWidth = scrollerElement.children[0].offsetWidth;
        activeIndex.value = Math.round(scrollLeft / movieWidth);
      }
    };

    // podemos agregar un event listener para el scroll en el movie scroller
    onMounted(() => {
      fetchPeliculas();
      fetchUsuario('66b52ab3416d8d97d3409e26');
      
      if (scroller.value) {
        scroller.value.addEventListener('scroll', updateActiveIndex);
      }
    });

    return { peliculas, usuario, activeIndex, scroller, scrollToMovie };
  }
};
</script>



<template>
  <div class="bodyhome">
    <header class="headerhome">
      <img :src=usuario.img class="usericon">
      <div class="greeting">
        <p v-if="usuario">Hi, {{ usuario.nombre }} !</p>
        <p v-else>Loading user. . .</p>
        <p>Lets watch a movie together!</p>
      </div>
      <img src="/frontend/public/assets/icons/notification.png" class="notification" />
    </header>

    <section class="homebody">
      <div class="searchmovie">
        <input type="text" name="searchmovie" id="searchmoviehome" placeholder="Search movie, genre" />
      </div>

      <div class="nowplaying">
        <h3 class="whitetext">Now Playing</h3>
        <p class="redtext">See all</p>
      </div>

      <!-- Movie Scroller -->

      <div class="movie-scroller" ref="scroller">
        
        <div class="movie" v-for="(pelicula, index) in peliculas" :key="pelicula.id">

          <img :src="pelicula.img" alt="Imagen de la película" />
          <div class="movieDetails">

            <h3 class="whitetext">{{ pelicula.titulo }}</h3>
            <p>{{ pelicula.genero }}</p>
            
          </div>
        </div>
      </div>

      <div class="navigation-dots">
          <span
          v-for="(pelicula, index) in peliculas"
          :key="'dot-' + index"
          class="dot"
          :class="{ active: activeIndex === index }"
          @click="scrollToMovie(index)"
        ></span>
      </div>

      <div class="comingsoonhome">
        <div class="comingsoon">
          <h3 class="whitetext">Coming Soon</h3>
          <p class="redtext">See all</p>
        </div>
        <div class="comingsoonmovie">
          <div class="comingsoonmovieplace">
            <img src="/frontend/public/assets/images/comingsoonmovie.png" />
            <div class="comingsoonMovieDetails">
              <h3 class="whitetext">Coming Soon (2013)</h3>
              <p class="whitetext">Action, Adventure</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <img src="/frontend/public/assets/icons/homefooter.png" />
      <img src="/frontend/public/assets/icons/browsefooter.png" />
      <img src="/frontend/public/assets/icons/ticketsfooter.png" />
      <img src="/frontend/public/assets/icons/profilefooter.png" />
    </footer>
  </div>
</template>

<style scoped>

.bodyhome {
  background-color: #121212;
  padding-bottom: 80px;
  margin: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  font-family: 'Arial', sans-serif;
}

/* Text colors */

.whitetext {
  color: white;
}

.redtext {
  color: red;
}

.graytext {
  color: white;
  opacity: 50%;
}

/* HEADER */

.headerhome {
  margin-top: 5%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
}

.headerhome .usericon {
  border-radius: 50%;
  height: 70px;
  width: 70px;
  max-height: 70px;
  max-width: 70px;
}

.headerhome .notification {
  width: 5%;
}

/* BODY */

.searchmovie {
  display: flex;
  align-items: center;
  justify-content: center;
}

#searchmoviehome {
  color: #9e9e9e;
  padding: 12px 20px;
  border: solid 1.5px #9e9e9e;
  border-radius: 0.5rem;
  width: 80%;
  height: 40px;
  margin-top: 5%;
  background: none;
}

.nowplaying {
  display: flex;
  padding: 3%;
  justify-content: space-around;
}

/* Movie Scroller */

.movie-scroller {
  height: 450px;
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 10px;
  scroll-snap-type: x mandatory;
}

.movie {
  flex: 0 0 auto;
  scroll-snap-align: start;
  width: 250px; /* Ajusta según el diseño */
  margin-right: 16px;
}

.movie img {
  width: 240px;
  min-height: 360px;
  max-width: 250px;
  cursor: pointer;
  scroll-snap-align: center;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.movieDetails {
  padding-top: 10px;
  text-align: center;
}

.movieDetails h3 {
  font-size: 15px;
}

.movieDetails p {
  font-size: 12px;
  color: #9e9e9e;
}

/* Movie Details home */

.navigation-dots {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.dot {
  height: 10px;
  width: 10px;
  margin: 0 5px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dot.active {
  background-color: #717171;
}

/* Coming Soon */

.comingsoonhome {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.comingsoon {
  display: flex;
  padding: 2%;
  justify-content: space-around;
}

.comingsoonmovie {
  display: flex;
  justify-content: center;
}

.comingsoonmovieplace {
  display: flex;
  background-color: #303030;
  border-radius: 20px;
  width: 85%;
  padding: 10px;
  gap: 10px;
}

footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid #424242;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #1b1b1b;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
}

footer img {
  width: 40px;
  height: auto;
  cursor: pointer;
}

footer img:hover {
  opacity: 0.8;
  transition: opacity 0.3s ease;
}
</style>