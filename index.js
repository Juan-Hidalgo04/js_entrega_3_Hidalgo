// Primero, definimos los destinos:


// Creamos los paises destino: 
class Country {
    constructor(id, country, destination, airport, hours, currency, flight, budget) {
        this.id = id
        this.country = country
        this.destination = destination
        this.airport = airport
        this.hours = hours
        this.currency = currency
        this.flight = flight
        this.budget = budget
    }
}


// Creamos los paises destino: 


const Argentina = new Country(1, 'Argentina', 'Buenos Aires', 'Ministro Pistarini International Airport', 7, ' Argentine Pesos', 500, 23)
const Brazil = new Country(2, 'Brazil', 'São Paulo', 'São Paulo-Guarulhos International Airport', 5, 'Brazilian Real', 400, 25)
const Chile = new Country(3, 'Chile', 'Santiago de Chile', 'Santiago International Airport', 6, 'Chilean Pesos', 440, 45)
const Mexico = new Country(4, 'Mexico', 'Cancun', 'Cancún International Airport', 4, 'Mexican Pesos', 350, 30)
const Dominican = new Country(5, 'Dominican Republic', 'Punta Cana', 'Punta Cana International Airport', 4, 'Dominican Pesos', 380, 35)

// Guardamos los paises
const countries = [Argentina, Brazil, Chile, Mexico, Dominican]

// console.log(countries)

const selectNodeDestination = document.querySelector('#destination')
countries.forEach((p) => {
    const optionDest = document.createElement('option')
    optionDest.innerText = `${p.destination}`  // , ${p.country}
    optionDest.setAttribute('id', p.id)
    selectNodeDestination.append(optionDest)
})

// Creando las season

class Season {
    constructor(id, called, value) {
        this.id = id
        this.called = called
        this.value = value
    }
}

// Creando las season
const Low = new Season(1, 'Low Season', 1)
const Shoulder = new Season(2, 'Shoulder Season', 1.5)
const High = new Season(3, 'High Season', 2)

// Guardamos las season
const seasons = [Low, Shoulder, High]

const selectNodeSeason = document.querySelector('#season')
seasons.forEach((p) => {
    const optionSeas = document.createElement('option')
    optionSeas.innerText = `${p.called}`
    optionSeas.setAttribute('id', p.id)
    selectNodeSeason.append(optionSeas)
})

// Tomando los valores del form: 

const form0 = document.getElementById('form0')
const inputName = document.getElementById('full_name')
const inputEmail = document.getElementById('email_address')
const inputDestination = document.getElementById('destination')
const inputSeason = document.getElementById('season')
const inputTravelers = document.getElementById('travelers')
const inputDays = document.getElementById('days')
const inputDate = document.getElementById('date')


// Click sobre el botón Submit. 

form0.onsubmit = (e) => {
    // e.preventDefault() Ya que queremos que nos de la respuesta al dar Submit.
    const infoUser = {
        name: inputName.value,
        email: inputEmail.value,
        destination: inputDestination.value,
        season: inputSeason.value,
        travelers: inputTravelers.value,
        days: inputDays.value,
        Date: inputDate.value
    }

    const infoUserJSON = JSON.stringify(infoUser);
    console.log(infoUserJSON);
    localStorage.setItem('infoUser', infoUserJSON);

}



// Botón para limpiar el localstorage. 
const addButtonClear = document.querySelector('#clear')
addButtonClear.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
})


// Funciones para calculo final: 

function sum(a, b) {
    return a + b
}
function rest(a, b) {
    return a - b
}
function mult(a, b) {
    return a * b
}
function div(a, b) {
    return a / b
}

function calcu(n1, n2, fn) {
    const result = fn(n1, n2)
    return result
}

// retomar info del storage

const infoUser0 = localStorage.getItem('infoUser')
console.log(infoUser0);
const infoUser1 = JSON.parse(infoUser0)
console.log(infoUser1);

console.log(infoUser1.season);

// reconocer el country and the season based on the answer. 
const country0 = countries.find(c => {
    return c.destination === infoUser1.destination
})

console.log(country0);

const season0 = seasons.find(s => {
    return s.called === infoUser1.season
})

console.log(season0);

// Calculos para el presupuesto del viaje
const finalFlight = calcu(calcu(country0.flight, season0.value, mult), infoUser1.travelers, mult)
const finalBudget = calcu(calcu(calcu(country0.budget, season0.value, mult), infoUser1.travelers, mult), infoUser1.days, mult)
const finalMoney = calcu(finalBudget, finalFlight, sum)

console.log(finalBudget, finalFlight, finalMoney)


// Modificar el HTML para respuesta final.

let final_answer = document.getElementById("final_answer");

const infoUser = localStorage.getItem('infoUser')
const infoUserJS = JSON.parse(infoUser)
if (infoUser) {
    form0.remove()
    finale.remove()
    finale1.remove()
    final_answer.innerHTML = `<p>Thank you for choosing us, ${infoUser1.name}. Next, you will find the final budget review.</p> <br>

    <p>To stay ${infoUser1.days} days on ${country0.destination}, ${country0.country} during ${season0.called} for ${infoUser1.travelers} travelers, we recommend a budget of USD ${finalBudget} to cover accommodation, food, and transportation expenses. Also, we estimate that you may need USD ${finalFlight} approx for flight tickets departing from El Dorado - Bogota. </p>
    <br>
    <p>The total budget is <b> USD ${finalMoney}.</b></p>
    <br> 
    <p>Moreover, here is some information to have in mind for your trip to ${country0.destination}, ${country0.country}: The estimated time of flight is ${country0.hours} hours, you will arrive to ${country0.airport} and the local currency will be ${country0.currency}.</p>
    <br>
    <p>We hope this information is useful for you.</p>
    `;
}