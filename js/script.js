const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// Vector para almacenar los usuarios
let userList = [];

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);


// Función que obtiene de la API un nombre aleatorio,
// genera una cantidad de dinero aleatoria cuyo máximo es 1.000.000
// y añade al usuario con ambos datos
async function getRandomUser() {
  let res = await fetch('https://randomuser.me/api');
  let data = await res.json();
  let user = data.results[0];

  let newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.random() * 100000
  }
  // TODO: Crea un objeto usuario (newUser) que tenga como atributos: name y money
  addData(newUser);
}

// TODO: Función que añade un nuevo usuario (objeto) al listado de usuarios (array)
function addData(obj) {
  userList.push(obj)
  updateDOM()
}

// TODO: Función que dobla el dinero de todos los usuarios existentes
function doubleMoney() {
  // TIP: Puedes usar map()
  userList = userList.map(element => ({
    name: element.name,
    money: element.money * 2
  }));

  updateDOM()
}

// TODO: Función que ordena a los usuarios por la cantidad de dinero que tienen
function sortByRichest() {
  // TIP: Puedes usar sort()
  userList.sort((a, b) => b.money - a.money);
  updateDOM()
}

// TODO: Función que muestra únicamente a los usuarios millonarios (tienen más de 1.000.000)
function showMillionaires() {
  // TIP: Puedes usar filter()
  userList = userList.filter(element => element.money > 70000);
  updateDOM()
}

// TODO: Función que calcula y muestra el dinero total de todos los usuarios
function calculateWealth() {
  // TIP: Puedes usar reduce ()
  let wealth = userList.reduce((acc, user) => (acc += user.money), 0);
  let wealthElement = document.createElement('div');
  let wealthFormated = formatMoney(wealth);
  wealthElement.innerHTML = `<h3>Dinero total: <strong>${wealthFormated}</strong></h3>`;
  main.appendChild(wealthElement)
}

// TODO: Función que actualiza el DOM
function updateDOM() {
  // TIP: Puedes usar forEach () para actualizar el DOM con cada usuario y su dinero
  main.innerHTML = '<h2><strong>Persona</strong> Dinero</h2>';

  userList.forEach(user => {
    let userElement = document.createElement("div");
    userElement.classList.toggle("person");
    let moneyFormated = formatMoney(user.money);
    userElement.innerHTML = `<strong>${user.name} </strong> ${moneyFormated}`;
    main.appendChild(userElement);
  });
}

// Función que formatea un número a dinero
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '€';
}

