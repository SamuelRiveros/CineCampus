<script>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: "ChooseSeat",

  setup() {
    const pelicula = ref(null);
    const boletas = ref(null);
    const route = useRoute();
    const router = useRouter();
    
    const selectedSeats = ref([]);
    const selectedDay = ref(null);
    const selectedHour = ref(null);

    const saveToSessionStorage = () => {
      sessionStorage.setItem('selectedSeats', JSON.stringify(selectedSeats.value));
      sessionStorage.setItem('selectedDay', JSON.stringify(selectedDay.value));
      sessionStorage.setItem('selectedHour', JSON.stringify(selectedHour.value));
    };

    const fetchPelicula = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/getmoviebyid/${route.params.id}`);
        if (!response.ok) {
          throw new Error('Error fetching movie');
        }
        const data = await response.json();
        pelicula.value = data.data;
      } catch (error) {
        console.error('Error al obtener los detalles de la película:', error);
      }
    };

    const fetchBoleta = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/seats`);
        const data = await response.json();
        boletas.value = data.data;
      } catch (error) {
        console.error('Error al obtener boletas', error);
      }
    }

    const uniqueDays = computed(() => {
      if (!pelicula.value || !pelicula.value.funciones) return [];
      
      const days = pelicula.value.funciones.map(funcion => {
        const date = new Date(funcion);
        return date.toISOString().split('T')[0]; // Extraer solo la parte de la fecha
      });

      return [...new Set(days)]; // Removemos días duplicados
    });

    const hoursForSelectedDay = computed(() => {
      if (!pelicula.value || !pelicula.value.funciones || !selectedDay.value) return [];

      return pelicula.value.funciones
        .filter(funcion => new Date(funcion).toISOString().split('T')[0] === selectedDay.value)
        .map(funcion => {
          const date = new Date(funcion);
          return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
        });
    });

    const formatDate = (dateString) => {
      const date = new Date(dateString + 'T00:00:00.000Z'); // Asignar la hora en UTC
      return date.toLocaleDateString('es-ES', {timeZone: 'UTC'}); // Ajustar el formato de la fecha
    };

    const formatDayName = (dateString) => {
      const date = new Date(dateString + 'T00:00:00.000Z'); // Asignar la hora en UTC
      return date.toLocaleDateString('es-ES', { weekday: 'long', timeZone: 'UTC' }); // Mostrar el nombre del día
    };

    const isReserved = (seat) => {
      if (!boletas.value) return false;
  
      // Iterar sobre las boletas para verificar si el asiento está reservado
      return boletas.value.some(boleta => boleta.asiento.includes(seat));
    };

    const toggleSeat = (seat) => {
      if (selectedSeats.value.includes(seat)) {
        // Si el asiento ya está seleccionado, lo quitamos
        selectedSeats.value = selectedSeats.value.filter(s => s !== seat);
      } else {
        // Si el asiento no está seleccionado y ya hay 5 asientos seleccionados
        if (selectedSeats.value.length >= 5) {
          alert('Solo puedes seleccionar hasta 5 asientos.');
          return;
        }
        selectedSeats.value.push(seat);
      }
      saveToSessionStorage(); // Guardar en sessionStorage cada vez que se actualice
    };

    const handleProceedToOrder = () => {
      // Validar que se ha seleccionado un día, una hora y al menos un asiento
      if (!selectedDay.value || !selectedHour.value || selectedSeats.value.length === 0) {
        alert('Por favor, selecciona un día, una hora y al menos un asiento antes de continuar.');
        return; // Detener la navegación si la validación falla
      }
      saveToSessionStorage(); // Guardar en sessionStorage antes de navegar
      router.push({ name: 'Order', params: { id: route.params.id } });
    };

    onMounted(() => {
      fetchPelicula();
      fetchBoleta();
    });

    // Observadores para actualizar sessionStorage cuando cambian las selecciones
    watch(selectedSeats, saveToSessionStorage);
    watch(selectedDay, saveToSessionStorage);
    watch(selectedHour, saveToSessionStorage);

    return {
      uniqueDays,
      hoursForSelectedDay,
      selectedSeats,
      selectedDay,
      selectedHour,
      pelicula,
      handleProceedToOrder, 
      toggleSeat,
      isReserved,
      formatDate,
      formatDayName
    };
  }
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

      <form @submit.prevent="handleProceedToOrder">
        <article class="asientos__normal">
          <div fila="1">
            <small class="whitetext">A</small>
            <div class="asientos__lista">
              <div v-for="(seat, index) in ['A1', 'A2', 'A3', 'A4', 'A5']" :key="seat" 
                   :class="['seat', { 'selected': selectedSeats.includes(seat), 'reserved': isReserved(seat) }]" 
                   @click="isReserved(seat) ? null : toggleSeat(seat)">
                <span>{{ index + 1 }}</span>
              </div>
            </div>
          </div>

          <div fila="2">
            <small class="whitetext">B</small>
            <div class="asientos__lista">
              <div v-for="(seat, index) in ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7']" :key="seat" 
                   :class="['seat', { 'selected': selectedSeats.includes(seat), 'reserved': isReserved(seat) }]" 
                   @click="isReserved(seat) ? null : toggleSeat(seat)">
                <span>{{ index + 1 }}</span>
              </div>
            </div>
          </div>
        </article>

        <article class="asientos__preferenciales">
          <div fila="3">
            <small class="whitetext">C</small>
            <div class="asientos__lista">
              <div v-for="(seat, index) in ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9']" :key="seat" 
                   :class="['seat', { 'selected': selectedSeats.includes(seat), 'reserved': isReserved(seat) }]" 
                   @click="isReserved(seat) ? null : toggleSeat(seat)">
                <span>{{ index + 1 }}</span>
              </div>
            </div>
          </div>

          <div fila="4">
            <small class="whitetext">D</small>
            <div class="asientos__lista">
              <div v-for="(seat, index) in ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9']" :key="seat" 
                   :class="['seat', { 'selected': selectedSeats.includes(seat), 'reserved': isReserved(seat) }]" 
                   @click="isReserved(seat) ? null : toggleSeat(seat)">
                <span>{{ index + 1 }}</span>
              </div>
            </div>
          </div>

          <div fila="5">
              <small class="whitetext">E</small>
              <div class="asientos__lista">
                <div v-for="(seat, index) in ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9']" :key="seat" 
                     :class="['seat', { 'selected': selectedSeats.includes(seat), 'reserved': isReserved(seat) }]" 
                     @click="isReserved(seat) ? null : toggleSeat(seat)">
                  <span>{{ index + 1 }}</span>
                </div>
              </div>
            </div>
  
            <div fila="6">
              <small class="whitetext">F</small>
              <div class="asientos__lista">
                <div v-for="(seat, index) in ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9']" :key="seat" 
                     :class="['seat', { 'selected': selectedSeats.includes(seat), 'reserved': isReserved(seat) }]" 
                     @click="isReserved(seat) ? null : toggleSeat(seat)">
                  <span>{{ index + 1 }}</span>
                </div>
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

          <button type="submit">Proceed to Order</button>
        </footer>
      </form>

      <div class="funciondata">
        <div class="daycarousel">
          <div class="day" v-for="(day, index) in uniqueDays" :key="index" @click="selectedDay = day" :class="{ active: selectedDay === day }">
            <p>{{ formatDate(day) }}</p> <!-- Mostramos el día en formato legible -->
            <strong>{{ formatDayName(day) }}</strong> <!-- Mostrar nombre del día -->
          </div>
        </div>

        <div class="timecarousel">
          <div class="time" v-for="(hour, index) in hoursForSelectedDay" :key="index" @click="selectedHour = hour" :class="{ active: selectedHour === hour }">
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

  .asientos {
    padding: 0 15px;
  }

  .asientos__normal {
    margin-bottom: 30px !important;
  }

  .asientos__normal,
  .asientos__preferenciales {
    display: flex;
    gap: 10px;
    margin: 15px 0;
    flex-direction: column;
    align-items: center;
  }

  .asientos__normal div,
  .asientos__preferenciales div {
    color: #323232;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .seat {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin: 0 5px;
    border-radius: 5px;
    background: #323232;
    cursor: pointer;
  }

  .seat.selected {
    background: #FE0000;
    color: white;
  }

  .seat.reserved {
    background: #CECECE;
    cursor: not-allowed;
  }

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
    height: 100px;
    justify-content: space-around;
    width: 85px;
    background-color: white;
    color: #000000;
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
    background-color: red; /* Cambia al color que desees para el estado activo */
    border: none;
    color: white;
  }

  .timecarousel {
    display: flex;
    justify-content: center;
    gap: 30px;
    width: 100%;
  }

  .time {
    justify-content: space-around;
    background-color: white;
    color: #000000;
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

  
  .time.active {
    background-color: red; /* Cambia al color que desees para el estado activo */
    border: none;
    color: white;
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