<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: "ChooseSeat",

  setup() {
    const route = useRoute();
    const router = useRouter()

    const pelicula = ref(null); // Aquí se almacenará la película
    const selectedDay = ref(null); // Estado para almacenar el día seleccionado

    const fetchPelicula = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/getmoviebyid/${route.params.id}`);
        if (!response.ok) {
          throw new Error('Error fetching movie');
        }
        const data = await response.json();
        pelicula.value = data.data; // Guardamos los datos de la película
      } catch (error) {
        console.error('Error al obtener los detalles de la película:', error);
      }
    };

    // Función para extraer días únicos de las funciones
    const uniqueDays = computed(() => {
      if (!pelicula.value || !pelicula.value.funciones) return [];
      
      const days = pelicula.value.funciones.map(funcion => {
        return new Date(funcion).toISOString().split('T')[0]; // Extrae solo la parte de la fecha
      });

      return [...new Set(days)]; // Remueve días duplicados
    });

    // Computed para obtener las horas correspondientes al día seleccionado
    const hoursForSelectedDay = computed(() => {
      if (!pelicula.value || !pelicula.value.funciones || !selectedDay.value) return [];

      return pelicula.value.funciones
        .filter(funcion => new Date(funcion).toISOString().split('T')[0] === selectedDay.value)
        .map(funcion => new Date(funcion).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); // Formato HH:mm
    });

    
    const gotoOrder = () => {
            router.push({ name: 'Order', params: { id: route.params.id } }); // Navegamos a la página de order con el id de la película
    };

    onMounted(() => {
      fetchPelicula()
    })

    return { uniqueDays, hoursForSelectedDay, selectedDay, pelicula, gotoOrder };

  },

  data() {
    return {
      selectedSeats: [], // Usamos v-model para enlazar asientos seleccionados
    };
  },
  methods: {
    handleSubmit() {
      console.log("Asientos seleccionados:", this.selectedSeats);
      // Aquí podemos agregar lógica para enviar los datos al servidor o procesar la compra
    },
  },
};
</script>


<template>
    <div class="bodychooseseat">
      <header>
        <img src="/frontend/public/assets/icons/back.svg" class="back" @click="$router.go(-1)" />
        <h3 class="whitetext">Choose Seat</h3>
        <img src="/frontend/public/assets/icons/threedots.svg" class="dots" />
      </header>
  
      <section class="asientos">
        <div class="screenthisway">
          <img src="/frontend/public/assets/images/screenthisway.png" />
        </div>
  
        <form @submit.prevent="handleSubmit">
          <article class="asientos__normal">
            <div fila="1">
              <small class="whitetext">A</small>
              <div class="asientos__lista">
                <input type="checkbox" name="seat" value="A1" id="A1" v-model="selectedSeats"/><label for="A1" data-place="1"></label>
                <input type="checkbox" name="seat" value="A2" id="A2" v-model="selectedSeats"/><label for="A2" data-place="2"></label>
                <input type="checkbox" name="seat" value="A3" id="A3" v-model="selectedSeats"/><label for="A3" data-place="3"></label>
                <input type="checkbox" name="seat" value="A4" id="A4" v-model="selectedSeats"/><label for="A4" data-place="4"></label>
                <input type="checkbox" name="seat" value="A5" id="A5" v-model="selectedSeats"/><label for="A5" data-place="5"></label>
              </div>
            </div>
            <div fila="2">
              <small class="whitetext">B</small>
              <div class="asientos__lista">
                <input type="checkbox" name="seat" value="B1" id="B1" v-model="selectedSeats"/><label for="B1" data-place="1"></label>
                <input type="checkbox" name="seat" value="B2" id="B2" v-model="selectedSeats"/><label for="B2" data-place="2"></label>
                <input type="checkbox" name="seat" value="B3" id="B3" v-model="selectedSeats"/><label for="B3" data-place="3"></label>
                <input type="checkbox" name="seat" value="B4" id="B4" v-model="selectedSeats"/><label for="B4" data-place="4"></label>
                <input type="checkbox" name="seat" value="B5" id="B5" v-model="selectedSeats"/><label for="B5" data-place="5"></label>
                <input type="checkbox" name="seat" value="B6" id="B6" v-model="selectedSeats"/><label for="B6" data-place="6"></label>
                <input type="checkbox" name="seat" value="B7" id="B7" v-model="selectedSeats"/><label for="B7" data-place="7"></label>
              </div>
            </div>
          </article>
          <article class="asientos__preferenciales">
              <div colum="3">
                  <small class="whitetext">C</small>
                  <div>
                      <input type="checkbox" name="seat" value="C1" id="C1" v-model="selectedSeats"><label for="C1" data-place="1"></label>
                      <input type="checkbox" name="seat" value="C2" id="C2" v-model="selectedSeats"><label for="C2" data-place="2"></label>
                      <input type="checkbox" name="seat" value="C3" id="C3" v-model="selectedSeats"><label for="C3" data-place="3"></label>
                      <input type="checkbox" checked name="seat" value="C4" id="C4" v-model="selectedSeats"><label for="C4" data-place="4"></label>
                      <input type="checkbox" checked name="seat" value="C5" id="C5" v-model="selectedSeats"><label for="C5" data-place="5"></label>
                      <input type="checkbox" checked name="seat" value="C6" id="C6" v-model="selectedSeats"><label for="C6" data-place="6"></label>
                      <input type="checkbox" name="seat" value="C7" id="C7" v-model="selectedSeats"><label for="C7" data-place="7"></label>
                      <input type="checkbox" name="seat" value="C8" id="C8" v-model="selectedSeats"><label for="C8" data-place="8"></label>
                      <input type="checkbox" name="seat" value="C9" id="C9" v-model="selectedSeats"><label for="C9" data-place="9"></label>
                  </div>
              </div>
              <div colum="4">
                  <small class="whitetext">D</small>
                  <div>
                      <input type="checkbox" disabled class="reserved" name="seat" value="D1" id="D1" v-model="selectedSeats"><label for="D1" data-place="1"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="D2" id="D2" v-model="selectedSeats"><label for="D2" data-place="2"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="D3" id="D3" v-model="selectedSeats"><label for="D3" data-place="3"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="D4" id="D4" v-model="selectedSeats"><label for="D4" data-place="4"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="D5" id="D5" v-model="selectedSeats"><label for="D5" data-place="5"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="D6" id="D6" v-model="selectedSeats"><label for="D6" data-place="6"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="D7" id="D7" v-model="selectedSeats"><label for="D7" data-place="7"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="D8" id="D8" v-model="selectedSeats"><label for="D8" data-place="8"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="D9" id="D9" v-model="selectedSeats"><label for="D9" data-place="9"></label>
                  </div>
              </div>
              <div colum="5">
                  <small class="whitetext">E</small>
                  <div>
                      <input type="checkbox" disabled class="reserved" name="seat" value="E1" id="E1" v-model="selectedSeats"><label for="E1" data-place="1"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="E2" id="E2" v-model="selectedSeats"><label for="E2" data-place="2"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="E3" id="E3" v-model="selectedSeats"><label for="E3" data-place="3"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="E4" id="E4" v-model="selectedSeats"><label for="E4" data-place="4"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="E5" id="E5" v-model="selectedSeats"><label for="E5" data-place="5"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="E6" id="E6" v-model="selectedSeats"><label for="E6" data-place="6"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="E7" id="E7" v-model="selectedSeats"><label for="E7" data-place="7"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="E8" id="E8" v-model="selectedSeats"><label for="E8" data-place="8"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="E9" id="E9" v-model="selectedSeats"><label for="E9" data-place="9"></label>
                  </div>
              </div>
              <div colum="6">
                  <small class="whitetext">F</small>
                  <div>
                      <input type="checkbox" disabled class="reserved" name="seat" value="F1" id="F1" v-model="selectedSeats"><label for="F1" data-place="1"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="F2" id="F2" v-model="selectedSeats"><label for="F2" data-place="2"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="F3" id="F3" v-model="selectedSeats"><label for="F3" data-place="3"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="F4" id="F4" v-model="selectedSeats"><label for="F4" data-place="4"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="F5" id="F5" v-model="selectedSeats"><label for="F5" data-place="5"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="F6" id="F6" v-model="selectedSeats"><label for="F6" data-place="6"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="F7" id="F7" v-model="selectedSeats"><label for="F7" data-place="7"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="F8" id="F8" v-model="selectedSeats"><label for="F8" data-place="8"></label>
                      <input type="checkbox" disabled class="reserved" name="seat" value="F9" id="F9" v-model="selectedSeats"><label for="F9" data-place="9"></label>
                  </div>
              </div>
          </article>
          
  
          <article class="asientos__menu">
            <div>
              <span class="circle available"></span>
              <label class="whitetext">Available</label>
            </div>
            <div>
              <span class="circle reserved"></span>
              <label class="whitetext">Reserved</label>
            </div>
            <div>
              <span class="circle selected"></span>
              <label class="whitetext">Selected</label>
            </div>
          </article>
  
          <footer>
            <div class="price whitetext">
              <p>Price</p>
              <strong>$24,99</strong>
            </div>
  
            <button type="submit" @click="gotoOrder()">Buy Ticket</button>
          </footer>
        </form>
  
        <div class="funciondata">

          <div class="daycarousel">
            
            <div class="day" v-for="(day, index) in uniqueDays" :key="index" @click="selectedDay = day" :class="{ active: selectedDay === day }">
              <p>{{ new Date(day).toLocaleDateString() }}</p> <!-- Mostramos el día en formato legible -->
              <strong>{{ new Date(day).toLocaleDateString('es-ES', { weekday: 'long' }) }}</strong> <!-- Mostrar nombre del día -->
            </div>

          </div>

          <div class="timecarousel" v-for="(hour, index) in hoursForSelectedDay" :key="index">

            <div class="time">
              <p>{{ hour }}</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  </template>
  
<style scoped>
  
  .bodychooseseat {
      background-color: #121212;
      padding-bottom: 80px;
      margin: 0;
      overflow-x: hidden;
      font-family: 'Arial', sans-serif;
  }
  
  
  header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px;
  }

  header img {
    fill: white;
    width: 10%;
  }
  
  .whitetext {
      color: white;
  }
    
  .redtext {
      color: red;
  }
    
  .graytext {
      color: gray;
  }
  
  .screenthisway {
      display: flex;
      justify-content: center;
  }
  
  
  .asientos{
      padding: 0 15px;
  }
  
  .asientos__normal{
      margin-bottom: 30px !important;
  }
  
  .asientos__normal, 
  .asientos__preferenciales{
      display: flex;
      gap: 10px;
      margin: 15px 0;
      flex-direction: column;
      align-items: center;
  }
  
  .asientos__normal div,
  .asientos__preferenciales div{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  
  .asientos__lista input[type="checkbox"],
  .asientos__preferenciales input[type="checkbox"]{
      display: none;
  }
  
  .asientos__lista input[type="checkbox"] + label:before,
  .asientos__preferenciales input[type="checkbox"] + label:before {
      content: "";
      float: left;
      margin: 0.5em 0.5em 0 0;
      font-family: "Inter_18pt-Regular";
      outline: none;
      border: none;
      width: 30px;
      height: 30px;
      margin: 0 5px;
      background: #323232;
      border-radius: 5px;
  }
  
  .asientos__lista input[type="checkbox"]:checked + label:after,
  .asientos__preferenciales input[type="checkbox"]:checked + label:after {
      content: attr(data-place);
      color: #fff;
      display: flex;
      justify-content: center;
      font-family: "Inter_18pt-Regular";
      align-items: center;
      float: left;
      background: #FE0000;
      width: 30px;
      height: 30px;
      border-radius: 5px;
      margin-left: -2.2em;
  }
  
  .asientos__lista input[type="checkbox"] + label:hover::before,
  .asientos__preferenciales input[type="checkbox"] + label:hover::before {
      background: #FE0000;
  }
  
  .asientos__lista input[type="checkbox"] + label:hover::after,
  .asientos__preferenciales input[type="checkbox"] + label:hover::after {
      cursor: pointer;
      content: attr(data-place);
      color: #fff;
      display: flex;
      justify-content: center;
      font-family: "Inter_18pt-Regular";
      align-items: center;
      float: left;
      background: #FE0000;
      width: 30px;
      height: 30px;
      border-radius: 5px;
      margin-left: -2.2em;
  }
  
  .asientos__lista input[type="checkbox"].reserved + label:before,
  .asientos__preferenciales input[type="checkbox"].reserved + label:before{
      content: "";
      background: #CECECE ;
  }
  
  .asientos__lista input[type="checkbox"].reserved + label:hover::after,
  .asientos__preferenciales input[type="checkbox"].reserved + label:hover::after{
      content: attr(data-place);
      background: #CECECE ;
      cursor: default;
  }
  
  
  /* Estilo para el contenedor de los círculos */
  .asientos__menu {
      padding: 20px;
      display: flex;
      justify-content: center;
      gap: 20px; /* Espacio entre los elementos */
  }
  
  .asientos__menu div {
      display: flex;
      align-items: center;
  }
  
  
  /* Estilo para los círculos */
  .circle {
      display: inline-block;
      width: 20px; /* Tamaño del círculo */
      height: 20px; /* Tamaño del círculo */
      border-radius: 50%; /* Hace que el elemento sea un círculo */
      margin-right: 10px; /* Espacio entre el círculo y el texto */
  }
  
  /* Colores para los círculos */
  .available {
      background-color: #323232; /* Color para Disponible */
  }
  
  .reserved {
      background-color: #CECECE; /* Color para Reservado */
  }
  
  .selected {
      background-color: #FE0000; /* Color para Seleccionado */
  }
  
  .funciondata {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding-top: 20px;
      gap: 30px;
  }

  .daycarousel {
    display: flex;
    justify-content: center;
    gap: 30px;
    width: 100%;
  }
  
  .day {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    border-radius: 10px;
    padding: 10px;
    border: 1px solid #ffffff;
    margin: 5px;
    transition: background-color 0.3s;
  }

  .day.active {
    background-color: #ffffff; /* Cambia al color que desees para el estado activo */
    color: rgb(0, 0, 0);
  }

  .time {
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 5px;
  }

  .timecarousel {
    display: flex;
    justify-content: center;
    gap: 30px;
    width: 100%;
  }
  
  .funciondata .time {
      background-color: white;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      width: 70px;
      height: 50px;
  }
  
  
  /* Footer */
  
  
  footer {
      display: flex;
      bottom: 0;
      width: 100%;
      height: 10%;
      justify-content: space-around;
      align-items: center;
      position: fixed;
      left: 0;
  }
  
  footer button {
      position: relative;
      padding: 20px 100px; /* Define el tamaño del botón principalmente con padding */
      border-radius: 6px;
      border: none;
      color: #fff;
      cursor: pointer;
      background-color: red;
      transition: all 0.2s ease;
  }
  
  footer button:active {
      transform: scale(0.96);
  }
  
  footer button:before,
  footer button:after {
      position: absolute;
      content: "";
      width: 150%; /* Proporcional al tamaño del botón */
      left: 50%;
      height: 100%;
      transform: translateX(-50%);
      z-index: -1000;
      background-repeat: no-repeat;
  }
  
  footer button:hover:before {
      top: -70%;
      background-image: radial-gradient(circle, red 20%, transparent 20%),
          radial-gradient(circle, transparent 20%, red 20%, transparent 30%),
          radial-gradient(circle, red 20%, transparent 20%),
          radial-gradient(circle, red 20%, transparent 20%),
          radial-gradient(circle, transparent 10%, red 15%, transparent 20%),
          radial-gradient(circle, red 20%, transparent 20%),
          radial-gradient(circle, red 20%, transparent 20%),
          radial-gradient(circle, red 20%, transparent 20%),
          radial-gradient(circle, red 20%, transparent 20%);
      background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%,
          10% 10%, 18% 18%;
      background-position: 50% 120%;
      animation: redtopBubbles 0.6s ease;
  }
  
  @keyframes redtopBubbles {
      0% {
          background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%,
              40% 90%, 55% 90%, 70% 90%;
      }
  
      50% {
          background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
              50% 50%, 65% 20%, 90% 30%;
      }
  
      100% {
          background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
              50% 40%, 65% 10%, 90% 20%;
          background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
      }
  }
  
  footer button:hover::after {
      bottom: -70%;
      background-image: radial-gradient(circle, red 20%, transparent 20%),
          radial-gradient(circle, red 20%, transparent 20%),
          radial-gradient(circle, transparent 10%, red 15%, transparent 20%),
          radial-gradient(circle, red 20%, transparent 20%),
          radial-gradient(circle, red 20%, transparent 20%),
          radial-gradient(circle, red 20%, transparent 20%),
          radial-gradient(circle, red 20%, transparent 20%);
      background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 20% 20%, 18% 18%;
      background-position: 50% 0%;
      animation: redbottomBubbles 0.6s ease;
  }
  
  @keyframes redbottomBubbles {
      0% {
          background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,
              70% -10%, 70% 0%;
      }
  
      50% {
          background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%,
              105% 0%;
      }
  
      100% {
          background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%,
              110% 10%;
          background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
      }
  }
</style>