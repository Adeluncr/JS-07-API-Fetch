//Funcion para obtener los usuarios de la API y guardarlos en el LocalStorage 
function getUsers() {
  fetch("https://reqres.in/api/users?delay=3") //Obtenemos los datos de la API
    .then((response) => response.json()) //Convertimos los datos a JSON
    .then((data) => { //Obtenemos los datos de ese JSON
      localStorage.setItem("users", JSON.stringify(data.data)); //Guardamos los datos en localstorage
        showUsers(); //Mostramos los datos en el DOM
    });
}


//Funcion para guardar los datos en el LocalStorage con tiempo de expiracion de 1 minuto
function setLocalStorage() {
    let users = JSON.parse(localStorage.getItem("users")); //Obtenemos los datos del LocalStorage
    let time = new Date(); //Obtenemos la fecha actual
    time.setMinutes(time.getMinutes() + 1); //Agregamos 1 minuto a la fecha actual para el tiempo de expiracion del LocalStorage
    localStorage.setItem("users", JSON.stringify(users)); //Guardamos los datos en el LocalStorage
    localStorage.setItem("time", time); //Guardamos la fecha en el LocalStorage con el tiempo de expiracion
}


//Funcion para mostrar los usuarios en el DOM (en el HTML)
function showUsers() {
    const users = JSON.parse(localStorage.getItem("users")); //Obtenemos los datos del LocalStorage
    const container = document.getElementById("userContainer"); //Obtenemos el contenedor del DOM que se llama userContainer que esta en el HTML
    users.forEach((user) => { //Recorremos los datos
        container.innerHTML += showUser(user); //Mostramos los datos en el DOM
    });
    }


//Plantilla para mostrar la informacion del usuario
const showUser = ({ avatar, id, email, first_name, last_name }) => { //Estos son los datos que necesitamos de la API
    //Esto es una card de Bootstrap, donde usando ${} podemos mostrar los datos de la API que necesitamos
    return `<div class="container text-center my-3"> 
    <div class="card mb-3" style="max-width: 100%;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${avatar}" class="rounded mx-auto d-block" width="200px">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Id: ${id}</h5>
          <p class="card-text">Email: ${email}</p>
          <p class="card-text"><small class="text-muted">First Name: ${first_name}</small></p>
          <p class="card-text"><small class="text-muted">Last Name: ${last_name}</small></p>
        </div>
      </div>
    </div>
  </div>`;
};



//Funcion para mostrar los usuarios que estan almacenados en el LocalStorage a manera de lista
function getLocalStorage() {
    //Funcion para recuperar los datos del formulario
    if (localStorage.users != undefined) { //Si el LocalStorage no esta vacio
      document.getElementById("datos").innerHTML = 
        "Usuarios: " + localStorage.users ; //Mostramos los datos del LocalStorage
    } else { //Si el LocalStorage esta vacio
      document.getElementById("datos").innerHTML =
        "No se han almacenado datos"; //Mostramos un mensaje
    }
  }
  

//Funcion para eliminar los datos del LocalStorage
function deleteLocalStorage() {
    localStorage.removeItem("users"); //Eliminamos los datos del LocalStorage
    document.getElementById("datos").innerHTML = "Datos eliminados"; //Mostramos un mensaje
  }