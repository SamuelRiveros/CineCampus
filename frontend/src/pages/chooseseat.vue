<template>
  <div class="bodychooseseat">
    <header>
        <img src="/frontend/public/assets/icons/back.svg" class="back">
        <h3 class="whitetext">Choose Seat</h3>
        <img src="/frontend/public/assets/icons/threedots.svg" class="dots">
    </header>

    <section class="asientos">

        <div class="screenthisway">
            <img src="/frontend/public/assets/images/screenthisway.png">
        </div>

        <form id="myform">
            <article class="asientos__normal">
                <div fila="1">
                    <small class="whitetext">A</small>
                    <div class="asientos__lista">
                        <input type="checkbox" name="seat" value="A1" id="A1"><label for="A1" data-place="1"></label>
                        <input type="checkbox" name="seat" value="A2" id="A2"><label for="A2" data-place="2"></label>
                        <input type="checkbox" name="seat" value="A3" id="A3"><label for="A3" data-place="3"></label>
                        <input type="checkbox" name="seat" value="A4" id="A4"><label for="A4" data-place="4"></label>
                        <input type="checkbox" name="seat" value="A5" id="A5"><label for="A5" data-place="5"></label>
                    </div>
                </div>
                <div fila="2">
                    <small class="whitetext">B</small>
                    <div class="asientos__lista">
                        <input type="checkbox" name="seat" value="B1" id="B1"><label for="B1" data-place="1"></label>
                        <input type="checkbox" name="seat" value="B2" id="B2"><label for="B2" data-place="2"></label>
                        <input type="checkbox" name="seat" value="B3" id="B3"><label for="B3" data-place="3"></label>
                        <input type="checkbox" name="seat" value="B4" id="B4"><label for="B4" data-place="4"></label>
                        <input type="checkbox" name="seat" value="B5" id="B5"><label for="B5" data-place="5"></label>
                        <input type="checkbox" name="seat" value="B6" id="B6"><label for="B6" data-place="6"></label>
                        <input type="checkbox" name="seat" value="B7" id="B7"><label for="B7" data-place="7"></label>
                    </div>
                </div>
            </article>
            <article class="asientos__preferenciales">
                <div colum="3">
                    <small class="whitetext">C</small>
                    <div>
                        <input type="checkbox" name="seat" value="C1" id="C1"><label for="C1" data-place="1"></label>
                        <input type="checkbox" name="seat" value="C2" id="C2"><label for="C2" data-place="2"></label>
                        <input type="checkbox" name="seat" value="C3" id="C3"><label for="C3" data-place="3"></label>
                        <input type="checkbox" checked name="seat" value="C4" id="C4"><label for="C4" data-place="4"></label>
                        <input type="checkbox" checked name="seat" value="C5" id="C5"><label for="C5" data-place="5"></label>
                        <input type="checkbox" checked name="seat" value="C6" id="C6"><label for="C6" data-place="6"></label>
                        <input type="checkbox" name="seat" value="C7" id="C7"><label for="C7" data-place="7"></label>
                        <input type="checkbox" name="seat" value="C8" id="C8"><label for="C8" data-place="8"></label>
                        <input type="checkbox" name="seat" value="C9" id="C9"><label for="C9" data-place="9"></label>
                    </div>
                </div>
                <div colum="4">
                    <small class="whitetext">D</small>
                    <div>
                        <input type="checkbox" disabled class="reserved" name="seat" value="D1" id="D1"><label for="D1" data-place="1"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="D2" id="D2"><label for="D2" data-place="2"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="D3" id="D3"><label for="D3" data-place="3"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="D4" id="D4"><label for="D4" data-place="4"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="D5" id="D5"><label for="D5" data-place="5"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="D6" id="D6"><label for="D6" data-place="6"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="D7" id="D7"><label for="D7" data-place="7"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="D8" id="D8"><label for="D8" data-place="8"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="D9" id="D9"><label for="D9" data-place="9"></label>
                    </div>
                </div>
                <div colum="5">
                    <small class="whitetext">E</small>
                    <div>
                        <input type="checkbox" disabled class="reserved" name="seat" value="E1" id="E1"><label for="E1" data-place="1"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="E2" id="E2"><label for="E2" data-place="2"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="E3" id="E3"><label for="E3" data-place="3"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="E4" id="E4"><label for="E4" data-place="4"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="E5" id="E5"><label for="E5" data-place="5"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="E6" id="E6"><label for="E6" data-place="6"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="E7" id="E7"><label for="E7" data-place="7"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="E8" id="E8"><label for="E8" data-place="8"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="E9" id="E9"><label for="E9" data-place="9"></label>
                    </div>
                </div>
                <div colum="6">
                    <small class="whitetext">F</small>
                    <div>
                        <input type="checkbox" disabled class="reserved" name="seat" value="F1" id="F1"><label for="F1" data-place="1"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="F2" id="F2"><label for="F2" data-place="2"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="F3" id="F3"><label for="F3" data-place="3"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="F4" id="F4"><label for="F4" data-place="4"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="F5" id="F5"><label for="F5" data-place="5"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="F6" id="F6"><label for="F6" data-place="6"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="F7" id="F7"><label for="F7" data-place="7"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="F8" id="F8"><label for="F8" data-place="8"></label>
                        <input type="checkbox" disabled class="reserved" name="seat" value="F9" id="F9"><label for="F9" data-place="9"></label>
                    </div>
                </div>
            </article>
            <article class="asientos__menu">
                <div>
                    <span class="circle available"></span> <label class="whitetext">Available</label>
                </div>
                <div>
                    <span class="circle reserved"></span> <label class="whitetext">Reserved</label>
                </div>
                <div>
                    <span class="circle selected"></span> <label class="whitetext">Selected</label>
                </div>
            </article>
            
            <footer>
                <div class="price whitetext">
                    <p>Price</p>
                    <strong>$24,99</strong>
                </div>
        
                <button type="submit">Buy Ticket</button>
            </footer>
            
        </form>

        <div class="funciondata">
            <section class="day">
                <p>Aug</p>
                <strong>17</strong>
            </section>

            <section class="time">
                <p>10:00</p>
            </section>
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
    padding: 30px;
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

.funciondata .day {
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 50px;
    height: 70px;
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
  
<script>
    export default {
    name: 'ChooseSeat',
    };
</script>