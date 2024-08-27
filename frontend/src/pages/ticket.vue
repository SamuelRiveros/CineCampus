<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

    export default {
    name: 'Ticket',
    props: ['id'],

    setup() {
        const route = useRoute();

        const pelicula = ref(null);

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

        onMounted(fetchPelicula);
        return { pelicula };
    }
    };
</script>



<template>
<div class="bodyticket" v-if="pelicula">
    <header>
        <div class="ticketmainheader">
            <img src="/frontend/public/assets/icons/back.svg" class="back" @click="$router.go(-1)">
            <h3 class="whitetext">Ticket</h3>
            <img src="/frontend/public/assets/icons/threedots.svg" class="dots">
        </div>
    </header>

    <div class="ticket">
        <div class="MainTicket">
            <div class="movieimgcinema">
                <div class="imgcinema">
                    <img :src="pelicula.img">
                </div>
            </div>
            <div class="moviedata">
                <h3>{{ pelicula.titulo }}</h3>
                <p class="graytext">Show this ticket to the entrance</p>
            </div>
    
            <div class="ticketbody">
                <div class="cinemainfo">
                    <div class="cinemainfotext">
                        <p>Cinema</p>
                        <strong>Cinemark Caracoli</strong>
                    </div>
                    <div class="cinemarklogo">
                        <img src="/frontend/public/assets/images/cinemarklogo.jpg">
                    </div>
                </div>
    
                <div class="ticket-info">
                    <div class="row">
                        <div class="label">Date</div>
                        <div class="content">Sun, Feb 12th 2023</div>
                    </div>
                    <div class="row">
                        <div class="label">Time</div>
                        <div class="content">13:00</div>
                    </div>
                    <div class="row">
                        <div class="label">Cinema Hall</div>
                        <div class="content">Cinema A</div>
                    </div>
                    <div class="row">
                        <div class="label">Seat</div>
                        <div class="content">C5</div>
                    </div>
                    <div class="row">
                        <div class="label">Cost</div>
                        <div class="content">$26.99</div>
                    </div>
                    <div class="row">
                        <div class="label">Order ID</div>
                        <div class="content">123456789</div>
                    </div>
                </div>
                
                
            </div>
    
            <div class="BarCode">
                <img src="/frontend/public/assets/images/barcode.png">
            </div>
        </div>
    </div>
</div>
<div v-else>
    <p>Loading Ticket. . .</p>
</div>
</template>

<style scoped>

.bodyticket {
  width: 100%;
  height: 100%;
  background-color: #121212;
  margin: 0;
  overflow-x: hidden;
  font-family: 'Arial', sans-serif;
}

/* Colors */

.whitetext {
    color: white;
}
  
.redtext {
    color: red;
}
  
.graytext {
    color: gray;
}

header .ticketmainheader {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 10%;
}

.ticketmainheader img {
    fill: white;
    width: 10%;
}


.ticket {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 10%;
}

.MainTicket {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 80%;
    height: 80%;
    border-radius: 30px;
    background-color: white;
    padding: 10px;
}

/* Movie Img */

.movieimgcinema {
    width: 100%; 
    height: 100px; 
    max-height: 100px; 
    
    display: flex; 
    align-items: flex-start; /* Alinea el contenido desde el inicio (parte superior) */
    justify-content: center; 
}

.imgcinema {
    width: 100%;
    height: 100%; 
    display: flex; 
    align-items: flex-end; /* Alinea la imagen al fondo del contenedor */
    justify-content: center; 
}

.imgcinema img {
    border-radius: 10px;
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    transform: translateY(10px); /* Ajusta este valor para mover la imagen hacia abajo */
}


/* Movie Data */

.moviedata {
    display: flex;
    flex-direction: column;
}

.ticketbody {
    border-top: 1px solid #333333;
    border-bottom: 1px dashed #000;
}

.cinemainfo {
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.cinemarklogo {
    border: 1px solid #333333;
    width: 60px; /* Debe ser el mismo tamaño que el contenedor */
    height: 50px; /* Mismo valor que el ancho para mantener el círculo */
    overflow: hidden; /* Asegura que el contenido no se desborde */
    border-radius: 10%; /* Hace que la imagen sea circular */
    display: flex;
    justify-content: center;
    align-items: center;
}

.cinemarklogo img{
    width: 100%; /* Ocupa todo el tamaño del contenedor */
    height: 100%;
    object-fit: cover; /* Asegura que la imagen cubra el contenedor */
    border-radius: 10px; /* Hace que la imagen también sea circular */
}


/* Ticket Info */

.ticket-info {
    display: grid;
    grid-template-columns: 2fr 1fr; /* Dos columnas, la segunda es el doble de ancha que la primera */
    gap: 10px; /* Espacio entre filas */
    width: 100%; /* Se ajusta al contenedor padre */
    padding: 10px;
    margin-top: 30px;
    padding-bottom: 30px;
}

.row .content {
    padding-top: 5px;
}

.label {
    font-size: 12px; /* Tamaño más pequeño para los títulos en dispositivos móviles */
    color: #555; /* Color de texto más oscuro */
    text-align: left; /* Alineación del texto a la izquierda */
}

.content {
    font-size: 16px; /* Tamaño más grande para el contenido, pero aún adecuado para móviles */
    color: #000; /* Color de texto más oscuro */
    text-align: left; /* Alineación del texto a la izquierda */
    font-weight: bold;
}


.MainTicket .BarCode {
    width: 100%;
    display: flex;
    justify-content: center;
}

.MainTicket .BarCode img {
    max-width: 250px;
}

</style>