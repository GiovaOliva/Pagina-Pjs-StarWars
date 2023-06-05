class Personaje {
    constructor(nombre, altura, peso) {
        this.nombre = nombre;
        this.altura = altura;
        this.peso = peso;
    }
}
let traerPersonaje = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let url = "https://swapi.dev/api/people/" + id;
            let respuesta = await fetch(url);
            let datos = await respuesta.json();
            let { name, height, mass } = datos

            let nuevoPersonaje = new Personaje(name, height, mass)
            resolve(nuevoPersonaje);
        } catch (error) {
            reject();
        }
    })
}

function* primerGenerador() {
    yield traerPersonaje(1)
    yield traerPersonaje(2)
    yield traerPersonaje(3)
    yield traerPersonaje(4)
    yield traerPersonaje(5)
    return "terminado"
}

function* segundoGenerador() {
    yield traerPersonaje(6)
    yield traerPersonaje(7)
    yield traerPersonaje(8)
    yield traerPersonaje(9)
    yield traerPersonaje(10)
    return "terminado"
}

function* tercerGenerador() {
    yield traerPersonaje(11)
    yield traerPersonaje(12)
    yield traerPersonaje(13)
    yield traerPersonaje(14)
    yield traerPersonaje(15)
    return "terminado"
}

let primerIniciador = primerGenerador();
let segundoIniciador = segundoGenerador();
let tercerIniciador = tercerGenerador();

function siguienteEstacion(iniciador, id, color) {
    let pasos = iniciador.next();
    pasos.value
        .then((personaje) => {
            let card = document.getElementById(id);
            card.innerHTML += ` <div class="col-12 col-md-6 col-lg-4">
            <div class="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
                <div class="timeline-icon circulo${color}"></div>
                <div class="timeline-text">
                    <h6>${personaje.nombre}</h6>
                    <p>Estatura: ${personaje.altura} cm. Peso: ${personaje.peso} kg.</p>
                </div>
            </div>
        </div>`
        }).catch((error) => {
            console.log(error)
        })
}

let contador1 = 0;
document.getElementById("cardRoja").addEventListener("mouseout", () => {
    contador1++;
    if (contador1 <= 5){
    siguienteEstacion(primerIniciador, "cardRoja", "Rojo");}
})
let contador2 = 0;
document.getElementById("cardVerde").addEventListener("mouseout", () => {
    contador2++;
    if (contador2 <= 5){
    siguienteEstacion(segundoIniciador, "cardVerde", "Verde");}
})
let contador3 = 0;
document.getElementById("cardAzul").addEventListener("mouseout", () => {
    contador3++;
    if (contador3 <= 5){
    siguienteEstacion(tercerIniciador, "cardAzul", "Azul");}
})


