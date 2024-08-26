<template>
  <div class="cinemabody">
    <header>
        <img src="/frontend/public/assets/icons/back.svg" class="back">
        <h3>Cinema Selection</h3>
        <img src="/frontend/public/assets/icons/threedots.svg" class="dots">
    </header>

    <section class="bodycinema">
        <div class="movieimgcinema">
            <div class="imgcinema">
                <img src="/frontend/public/assets/images/movieplaceholder.png">
            </div>
        </div>
        <div class="moviedata">
            <h3 class="whitetext">Movie Title Goes Here</h3>
            <small class="graytext">Action, Adventure thing goes here</small>
            <p class="graytext">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, unde, eaque recusandae repudiandae ratione a dignissimos doloribus praesentium eveniet inventore nemo. Earum eos voluptate debitis? Nisi obcaecati reiciendis sunt fugiat?</p>
        </div>

        <div class="castzone">
            <h3 class="whitetext">Cast</h3>
            <div class="cast">
                <div class="castperson">
                    <div class="castpersonimg">
                        <img src="/frontend/public/assets/images/antonio.jpg">
                    </div>
                    <div class="castpersoninfo">
                        <strong class="whitetext">Antonio Banderas</strong>
                        <p class="graytext">Puss in Boots</p>
                    </div>
                </div>
                <div class="castperson">
                    <div class="castpersonimg">
                        <img src="/frontend/public/assets/images/antonio.jpg">
                    </div>
                    <div class="castpersoninfo">
                        <strong class="whitetext">Antonio Banderas</strong>
                        <p class="graytext">Puss in Boots</p>
                    </div>
                </div>
                <div class="castperson">
                    <div class="castpersonimg">
                        <img src="/frontend/public/assets/images/antonio.jpg">
                    </div>
                    <div class="castpersoninfo">
                        <strong class="whitetext">Antonio Banderas</strong>
                        <p class="graytext">Puss in Boots</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="cinemazone">
            <h3 class="whitetext">Cinema</h3>
            <div class="cinemas">
                <div class="cinemark">
                    <div class="cinemarkinfo">
                        <strong class="whitetext">Cinemark Caracoli</strong>
                        <p class="graytext">Centro Comercial Caracolí, Tv. El Bosque #29-145 local 508, Cañaveral, Floridablanca, Santander</p>
                    </div>
                    <div class="cinemarklogo">
                        <img src="/frontend/public/assets/images/cinemarklogo.jpg" >
                    </div>
                </div>
                <div class="cinecolombia">
                    <div class="cinecolombiainfo">
                        <strong class="whitetext">CineColombia Cañaveral</strong>
                        <p class="graytext">Centro Comercial Cañaveral, Cl. 30 #25-71, Bucaramanga, Floridablanca, Santander</p>
                    </div>
                    <div class="cinecolombialogo">
                        <img src="/frontend/public/assets/images/cinecolombialogo.png" >

                    </div>
                </div>
            </div>
        </div>

    </section>
    <footer>
        <button class="booknow">Book Now</button>
    </footer>
  </div>
</template>

<style scoped>

.cinemabody {
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

header {
    color: white;
    padding: 5%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

header img{
    fill: white;
    width: 10%;
}

/* Body Cinema */

.bodycinema {
    padding-left: 20px;  /* Ajusta el valor según sea necesario */
    padding-right: 20px; /* Ajusta el valor según sea necesario */
}

.movieimgcinema {
    width: 100%; /* Ajusta el ancho del contenedor según sea necesario */
    height: 250px; /* Ajusta la altura del contenedor según sea necesario */
    overflow: hidden; /* Oculta cualquier parte de la imagen que se desborde del contenedor */
    display: flex; /* Utiliza flexbox para centrar el contenido */
    align-items: center; /* Centra verticalmente el contenido dentro del contenedor */
    justify-content: center; /* Centra horizontalmente el contenido dentro del contenedor */
}

/* Contenedor para la imagen */
.imgcinema {
width: 95%; /* Ajusta el ancho del contenedor de la imagen según sea necesario */
height: 100%; /* Ajusta la altura del contenedor de la imagen según sea necesario */
display: flex; /* Utiliza flexbox para centrar la imagen dentro de este contenedor */
align-items: center; /* Centra verticalmente la imagen dentro de este contenedor */
justify-content: center; /* Centra horizontalmente la imagen dentro de este contenedor */
}

/* Estilo para la imagen */
.imgcinema img {
    border-radius: 10px;
    width: 100%; /* Ajusta el ancho de la imagen según sea necesario */
    height: 100%; /* Ajusta la altura de la imagen según sea necesario */
    object-fit: cover; /* Ajusta el tamaño de la imagen para llenar el contenedor */
}

/* Movie Data */

.moviedata {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    gap: 5px;
}

/* Cast */


.castzone {
    padding-top: 10px;
}

.cast {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 10px;
    gap: 10px;
}

.castperson {
    display: flex;
    width: 45%;
    align-items: center;
    gap: 10px;
}

.castpersoninfo {
    width: 50%;
    font-size: 10px;
}

.castpersonimg {
    width: 50px; /* Debe ser el mismo tamaño que el contenedor */
    height: 50px; /* Mismo valor que el ancho para mantener el círculo */
    overflow: hidden; /* Asegura que el contenido no se desborde */
    border-radius: 50%; /* Hace que la imagen sea circular */
    display: flex;
    justify-content: center;
    align-items: center;
}

.castpersonimg img {
    width: 100%; /* Ocupa todo el tamaño del contenedor */
    height: 100%;
    object-fit: cover; /* Asegura que la imagen cubra el contenedor */
    border-radius: 50%; /* Hace que la imagen también sea circular */
}

strong, p {
    margin: 5px 0; /* Espacio entre el texto y la imagen */
}


/* Cinema Selection */

.cinemazone {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.cinemas {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.cinemark, .cinecolombia {
    display: flex;
    /* height: 5%; */
    background-color: #2b2b2b;
    padding: 10px;
    border-radius: 10px;
}

.cinemarkinfo p, .cinecolombiainfo p {
    font-size: 10px;
}

.cinemarklogo, .cinecolombialogo {
    width: 60px; /* Debe ser el mismo tamaño que el contenedor */
    height: 50px; /* Mismo valor que el ancho para mantener el círculo */
    overflow: hidden; /* Asegura que el contenido no se desborde */
    border-radius: 10%; /* Hace que la imagen sea circular */
    display: flex;
    justify-content: center;
    align-items: center;
}

.cinemarklogo img, .cinecolombia img {
    width: 100%; /* Ocupa todo el tamaño del contenedor */
    height: 100%;
    object-fit: cover; /* Asegura que la imagen cubra el contenedor */
    border-radius: 10px; /* Hace que la imagen también sea circular */
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
  
<script>
    export default {
    name: 'Cinema',
    };
</script>