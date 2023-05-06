// Elementos obtenidos del DOM

const nombre = document.getElementById("recipe-name");
const autor = document.getElementById("recipe-author");
const ingredientes = document.getElementById("recipe-ingredients");
const pasos = document.getElementById("recipe-steps");
const btnReceta = document.getElementById("recipe-btn");
const cards = document.getElementById("cards");
const form = document.getElementById("recipe-form");
const cerrarSesion = document.getElementById("endSession-btn");
const search = document.getElementById("search-card");
const btnSearch = document.getElementById("search-btn");

// Variables que obtienen del localStorage si hay recetas existentes

let recetasActuales = [];
let recetas = JSON.parse(localStorage.getItem("recetasActuales")) || recetasActuales;
      
//Función creadora de recetas

class recetaNueva{
    constructor (nombre, autor, ingredientes, pasos){
    this.nombre = nombre;
    this.autor = autor || "Anónimo";
    this.ingredientes = ingredientes;
    this.pasos = pasos;
    }
}

// Función agregar al localStorage

function AddLocSto(arr) {
    localStorage.setItem("recetasActuales", JSON.stringify(arr));
}

// Función que genera las tarjetas con las recetas

const renderRecetas = (arr) => {
    cards.innerHTML = "";
    let html = "";
    arr.forEach((obj) => { 
        const {nombre, autor, ingredientes, pasos} = obj;
        html = 
        `<div class="card">
            <h2 class="cardTitle">${nombre}</h2>
            <h3 class="cardAuthor">${autor}</h3><br>
            <h3 class="cardIngre">${ingredientes}</h3><br>
            <p class="cardSteps">${pasos}</p><br>
            <button type="button" class="cardBtn">Ver Completo</button>
        </div>`;
        cards.innerHTML += html;
        });
      };

// Función agrega recetas al array de recetas      
      
function agregarReceta(arr,receta){
    arr.push(receta);
}      

// Función asíncrona que trae los elementos del data.json

async function fetchAPI(){
    const response = await fetch("../data/datos.json");
    const data = await response.json();
    for (const obj of data) {
       agregarReceta(recetas,obj); 
    }
    renderRecetas(data);
} 

// Ejecución de funcionalidades

// Creo las tarjetas que existan

fetchAPI();
renderRecetas(recetas);

// Escucho botón "Compartir"

btnReceta.addEventListener("click", (e) => {
    e.preventDefault();
    if (nombre.value == "" || ingredientes.value == "" || pasos.value == ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los campos "Nombre de la receta", "Ingredientes" y "Pasos a seguir" deben estar completos'
        })
    } else{
        const newRecet = new recetaNueva(
            nombre.value,
            autor.value,
            ingredientes.value,
            pasos.value,
        );
        agregarReceta(recetas, newRecet);
        AddLocSto(recetas);
        renderRecetas(recetas);
        form.reset();
    }    
});

// Escucho botón "Cerrar Sesión"

cerrarSesion.addEventListener("click", () => {
    window.location.href = "../../index.html"
    localStorage.clear();
});

btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    const filtro = search.value.toLowerCase();
    const recetasFiltradas = recetas.filter((receta) => receta.nombre.toLowerCase().includes(filtro));
    renderRecetas(recetasFiltradas);
  });