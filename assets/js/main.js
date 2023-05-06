// Obtener los elementos del DOM
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

// Función para mostrar el formulario de registro y ocultar el de inicio de sesión
function showRegisterForm() {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
}

// Función para mostrar el formulario de inicio de sesión y ocultar el de registro
function showLoginForm() {
  registerForm.style.display = "none";
  loginForm.style.display = "block";
}

// Evento para cambiar al formulario de registro
document.getElementById("register-switch").addEventListener("click", showRegisterForm);

// Evento para cambiar al formulario de inicio de sesión
document.getElementById("login-switch").addEventListener("click", showLoginForm);

// Formulario Login

let username = document.getElementById("username");
let password = document.getElementById("password");
let btnLogin = document.getElementById("btnLogin");

// Función que trae los elementos que esten guardados en el localStorage del navegador

function storage(){
    return JSON.parse(localStorage.getItem('usersReg'));
}

// Función que verifica si el usuario ingresado está registrado

function login(users){
    let founded = users.find((user) => {
        return user.email == username.value && user.newPass == password.value;
    });
    if (founded){
        window.location.href = "./assets/pages/recetas.html";
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario ingresado no existe'
        })
    }
}

// Escucha del submit del formulario Login

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    if (username.value == "" || password.value == ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El campo "Email" o "Contraseña" no es válido'
        })
    } else {
        const users = storage();
        console.log(users);
        login(users);
    }
    loginForm.reset();   
});

// Formulario Registro

let name = document.getElementById("name");
let email = document.getElementById("email");
let newPass = document.getElementById("new-password");
let userName = document.getElementById("new-username");
let btnRegister = document.getElementById("btnRegister");

// Inicializo variable con el contenido que hay en el localStorage en caso de no estar vacío

let usersReg = JSON.parse(localStorage.getItem("users")) || [];

// Función constructora de usuarios

class usuarioNuevo{
    constructor (name, email, newPass, userName){
    this.name = name;
    this.email = email;
    this.newPass = newPass;
    this.userName = userName;
    }
}

// Función que guarda los usuarios

function saveUser(user){
    return usersReg.push(user)
}

// Función que guarda en el localStorage

function saveStorage(user){
    return localStorage.setItem('usersReg', JSON.stringify(user))
}
saveStorage(usersReg);

// Escucha del submit del formulario de registro

btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    if (email.value == "" || newPass.value == "" || userName.value == "" || name.value == ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos deben estar completos'
        })
        registerForm.reset();    
    } else {
        const nuevoUsuario = new usuarioNuevo(name.value , email.value , newPass.value , userName.value);
        saveUser(nuevoUsuario);
        saveStorage(usersReg);
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Te has registrado correctemente',
            showConfirmButton: false,
            timer: 1500
        })
        registerForm.reset();    
        showLoginForm();
    }
});


// Página de recetas