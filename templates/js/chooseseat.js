let myform = document.querySelector('#myform');

myform.addEventListener('submit', (e) => {
    e.preventDefault();
    let input = new FormData(e.target);
    console.log('Datos del formulario:', [...input.entries()]);
    let seat = [];
    for (let [name, value] of input) seat.unshift(value);
    console.log('Asientos:', seat);
});
