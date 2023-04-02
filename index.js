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
    const Brazil =  new Country(2, 'Brazil', 'São Paulo', 'São Paulo-Guarulhos International Airport', 5, 'Brazilian Real', 400, 25)
    const Chile = new Country(3, 'Chile', 'Santiago de Chile', 'Santiago International Airport', 6, 'Chilean Pesos', 440, 45)
    const Mexico = new Country(4, 'Mexico', 'Cancun', 'Cancún International Airport', 4, 'Mexican Pesos', 350, 30)
    const Dominican = new Country(5, 'Dominican Republic', 'Punta Cana', 'Punta Cana International Airport', 4, 'Dominican Pesos', 380, 35)

// Guardamos los paises
const countries = [Argentina, Brazil, Chile, Mexico, Dominican]

// console.log(countries)

const selectNodeDestination = document.querySelector('#destination')
countries.forEach((p)=> {
    const optionDest = document.createElement('option')
    optionDest.innerText = `${p.destination}, ${p.country}`
    optionDest.setAttribute('id',p.id)
    selectNodeDestination.append(optionDest)
})

// Creando las season

class Season {
    constructor(id,called,value) {
        this.id = id
        this.called = called
        this.value = value
    }
}

// Creando las season
const Low = new Season(1,'Low Season', 1)
const Shoulder = new Season(2,'Shoulder Season', 1.5)
const High = new Season(3,'High Season', 2)

    // Guardamos las season
    const seasons = [Low, Shoulder, High]

    const selectNodeSeason = document.querySelector('#season')
    seasons.forEach((p)=> {
        const optionSeas = document.createElement('option')
        optionSeas.innerText = `${p.called}`
        optionSeas.setAttribute('id',p.id)
        selectNodeSeason.append(optionSeas)
    })

    // Tomando los valores del form: 

const form0 = document.getElementById('form0')
const inputName = document.getElementById('full_name')
const inputEmail = document.getElementById('email_address')
const inputDestination = document.getElementById('destination')
const inputSeason = document.getElementById('season')
const inputTravelers= document.getElementById('travelers')
const inputDays= document.getElementById('days')
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
    localStorage.setItem('infoUser',JSON.stringify(infoUser))
    console.log(infoUser);
}

const addButtonClear = document.querySelector('#clear')
addButtonClear.addEventListener('click', function(){
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

// Uso de Function 

// const finalFlight = calcu(calcu(country.flight,season.value,mult),travelers,mult)
// const finalBudget = calcu(calcu(calcu(country.budget,season.value,mult),travelers,mult),days,mult)
// const finalMoney = calcu(finalBudget,finalFlight,sum)

// console.log(finalBudget, finalFlight, finalMoney)



// Mirar si en storage existe infoUser

const infoUser = localStorage.getItem('infoUser')
const infoUserJS = JSON.parse(infoUser)
if(infoUser){
    form0.remove()
    finale.remove()
    edit.innerText = `Thank you for choosing us, ${infoUserJS.name}. Next, you will find the final budget review.

    To stay ${infoUserJS.days} days on ${infoUserJS.destination}, ${infoUserJS.country} during ${infoUserJS.season} for ${infoUserJS.travelers} travelers, we recommend a budget of USD ${finalBudget} to cover accommodation, food, and transportation expenses. Also, we estimate that you may need USD ${finalFlight} approx for flight tickets. The total budget is USD ${finalMoney}.
    
    Moreover, here is some information to have in mind for your trip to ${country.destination}, ${country.country}: The estimated time of flight is ${country.hours} hours, you will arrive to ${country.airport} and the local currency will be ${country.currency}.`
}