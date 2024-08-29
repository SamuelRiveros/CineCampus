<script>
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: "Order",

  setup() {
    const pelicula = ref(null);
    const route = useRoute();
    const router = useRouter();

    const selectedSeats = ref(JSON.parse(sessionStorage.getItem('selectedSeats') || '[]'));
    const selectedDay = ref(JSON.parse(sessionStorage.getItem('selectedDay') || 'null'));
    const selectedHour = ref(JSON.parse(sessionStorage.getItem('selectedHour') || 'null'));

    // Timer state
    const timer = ref(10); // Initial timer in seconds
    let interval = null;

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

    const handleBuyTicket = async () => {
      if (!selectedDay.value || !selectedHour.value || selectedSeats.value.length === 0) {
        alert('Por favor, selecciona un día, una hora y al menos un asiento antes de continuar.');
        return;
      }

      const payload = {
        id_cliente: "66b52ab3416d8d97d3409e26", 
        asiento: selectedSeats.value, 
        sala: 1, 
        id_funcion: "66a595c6f6f7d62733068ac9", 
        fecha: selectedDay.value, 
        hora: selectedHour.value 
      };

      try {
        const response = await fetch('http://localhost:3001/api/buy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
          if (response.status === 409) { // Conflicto - Ticket already exists
            alert(result.errors[0].msg); // Mostrar mensaje de error específico
          } else {
            throw new Error('Error buying ticket');
          }
        } else {
          console.log('Ticket bought successfully:', result);
          gotoTicket();
        }
      } catch (error) {
        console.error('Error buying ticket:', error);
        alert('El ticket no se ha procesado. Por favor, inténtalo de nuevo.');
      }
    };

    const gotoTicket = () => {
      router.push({ name: 'Ticket', params: { id: route.params.id } });
    };

    const startTimer = () => {
      timer.value = 10; // Reset timer to 10 seconds
      if (interval) clearInterval(interval); // Clear any existing intervals
      interval = setInterval(() => {
        timer.value--;
        if (timer.value <= 0) {
          clearInterval(interval);
          alert('Se acabó tu tiempo para pagar.');
          router.go(-1); // Go back
        }
      }, 1000);
    };

    onMounted(() => {
      fetchPelicula();
      startTimer();
    });

    onBeforeUnmount(() => {
      // Clean up the interval when the component is about to be unmounted
      if (interval) clearInterval(interval);
    });

    return {
      pelicula,
      selectedSeats,
      selectedDay,
      selectedHour,
      handleBuyTicket,
      gotoTicket,
      timer
    };
  }
};
</script>

<template>
  <div class="bodyorder" v-if="pelicula">
    <header>
      <div class="ordermainheader">
        <img src="/frontend/public/assets/icons/back.svg" class="back" @click="$router.go(-1)">
        <h3 class="whitetext">Order Summary</h3>
        <img src="/frontend/public/assets/icons/threedots.svg" class="dots">
      </div>

      <div class="moviesummaryimgzone">
        <img :src="pelicula.img">

        <div class="moviesummarytext">
          <div class="moviesummaryinformation">
            <strong class="redtext">{{ pelicula.titulo }}</strong>
            <p class="graytext">{{ pelicula.genero }}</p>
          </div>

          <div class="moviesummarylocation">
            <strong class="whitetext">Cinema</strong>
            <p class="graytext">{{ selectedDay }}, {{ selectedHour }}</p>
          </div>

        </div>
      </div>
    </header>

    <div class="ordernumber">
      <span class="graytext">Order Number: </span><span class="whitetext">-| {{ pelicula._id }}</span>.
    </div>

    <section class="ordermain">
      <div class="order-summary">
        <div class="order-row">
          <span class="left">1 Ticket</span>
          <span class="right">{{ selectedSeats.join(', ') }}</span>
        </div>
        <div class="order-row">
          <span class="left">Regular Seat</span>
          <span class="right">$24,99</span>
        </div>
        <div class="order-row">
          <span class="left">Service Fee</span>
          <span class="right">$1,99</span>
        </div>
      </div>
    </section>
  
    <div class="payment">
      <h3 class="whitetext">Payment Method</h3>

      <div class="paymentTime">
        <span class="graytext">Complete your payment in</span>
        <span class="redtext">{{ timer }}</span>
      </div>
    </div>

    <footer>
      <button class="buyticket" @click="handleBuyTicket">Buy Ticket</button>
    </footer>
  </div>
  <div v-else>
    <p>Loading Order. . .</p>
  </div>
</template>


<style scoped>

.bodyorder {
  background-color: #121212;
  padding-bottom: 80px;
  margin: 0;
  overflow-x: hidden;
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

/* default config */

.ordernumber, .ordermain, .payment {
    padding-left: 30px;
    padding-right: 30px;
}

/* Header */

header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #202020;
    width: 100vw;
    padding: 25px;
}


header .ordermainheader {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 5%;
}

.ordermainheader img {
    fill: white;
    width: 10%;
}

.moviesummaryimgzone {
    display: flex;
    justify-content: center;
    width: 100%; /* Ajustar a 100% para evitar desbordamiento */
    gap: 10px;
}

.moviesummaryimgzone img {
    width: 33%; /* Este valor depende del tamaño del contenedor padre */
    max-width: 100%; /* Asegúrate de que las imágenes no excedan el ancho disponible */
}

.moviesummarytext {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

/* Order */

.ordernumber {
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
}

.ordermain {
    display: flex;
    justify-content: center;
    align-items: center;
}

.order-summary {
    display: flex;
    flex-direction: column;
    width: 500px; /* Ancho del contenedor, ajusta según sea necesario */
    padding: 10px; /* Espaciado interno */
    border-radius: 5px; /* Bordes redondeados */
}

.order-row {
    display: flex; /* Usamos flexbox para alinear los elementos en la fila */
    justify-content: space-between; /* Alinea los elementos en los extremos */
    padding: 8px 0; /* Espaciado vertical entre filas */
    border-bottom: 1px solid #ddd; /* Línea divisoria inferior */
}

/* Estilo para los elementos alineados a la izquierda */
.left {
    color: #585858;
    font-weight: bold; /* Negrita para destacar */
    font-size: 20px;
}

/* Estilo para los elementos alineados a la derecha */
.right {
    color: #585858; /* Color del texto */
    font-size: 20px;
}
  


/* Payment method */

.payment {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.payment-method {
    display: flex; /* Usamos Flexbox para alinear el logo y los detalles en una fila */
    align-items: center; /* Centra los elementos verticalmente */
    border: 1px solid #ccc; /* Borde alrededor del contenedor */
    padding: 10px; /* Espaciado interno */
    border-radius: 5px; /* Bordes redondeados */
    width: 350px; /* Ancho del contenedor, ajusta según sea necesario */
    height: 80px;
    background-color: #202020; /* Color de fondo del contenedor */
  }
  
  /* Estilo del logo de la tarjeta */
  .card-logo {
    width: 50px; /* Ancho del logo */
    max-width: 50px;
    height: auto; /* Mantiene la proporción del logo */
    margin-right: 15px; /* Espaciado a la derecha del logo */
  }
  
  /* Estilo del contenedor de detalles de la tarjeta */
  .card-details {
    display: flex; /* Usamos Flexbox para alinear verticalmente */
    flex-direction: column; /* Coloca el nombre y número de la tarjeta en una columna */
  }
  
  /* Estilo del nombre de la tarjeta */
  .card-name {
    font-size: 16px; /* Tamaño de fuente del nombre de la tarjeta */
    font-weight: bold; /* Negrita para el nombre */
    color: #ffffff; /* Color del texto */
    margin-bottom: 5px; /* Espacio inferior entre el nombre y el número */
  }
  
  /* Estilo del número de la tarjeta */
  .card-number {
    font-size: 14px; /* Tamaño de fuente del número de la tarjeta */
    color: #ffffff; /* Color del texto */
  }
  
.paymentTime {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    border-radius: 10px;
    background-color: rgba(255, 0, 0, 0.158) ;
}



/* Footer */




footer {
    display: flex;
    bottom: 0;
    width: 100%;
    height: 10%;
    justify-content: center;
    align-items: center;
    position: fixed;
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