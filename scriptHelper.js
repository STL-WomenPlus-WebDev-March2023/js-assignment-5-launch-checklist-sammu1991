// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let missionTarget = document.getElementById('missionTarget');
   missionTarget.innerHTML = ` <h2>Mission Destination</h2>
                 <ol>
                    <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                </ol>
                <img src= "${imageUrl}">`;

}

function validateInput(testInput) {

    if (testInput === "" || testInput === null || testInput === 0) {
        return "Empty"
    } else if ((isNaN(Number(testInput))===true)) {
        return 'Not a Number'
    } else if ((isNaN(testInput)===false)) {
        return "Is a Number"
    }
}

function formSubmission(document, pilot, copilot, fuelLevel, cargoLevel) {

    
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let launchStatus = document.getElementById('launchStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let faultyItems = document.getElementById("faultyItems");
    
    if (validateInput(pilot.value) === `Empty`|| validateInput(copilot.value) === `Empty`|| validateInput(fuelLevel.value) === `Empty`||validateInput(cargoLevel.value) === `Empty`) {
        alert(`All fields are required`);
    }
    
    else if (validateInput(fuelLevel.value) === "Not a Number"|| validateInput(cargoLevel.value) === "Not a Number") {
        alert(`Please enter numerical values for Fuel Level and Cargo Mass`);
    } else if (validateInput(pilot.value)==='Is a Number'||validateInput(copilot.value)==='Is a Number') {
        alert('Please do not enter numbers for name of pilot or co-pilot');
    } 
    else {
    pilotStatus.innerHTML = `Pilot ready`;
    copilotStatus.innerHTML = `Co-pilot ready`;
    faultyItems.style.visibility = 'hidden';
    }
    
    if ((fuelLevel.value) < 10000) {
        fuelStatus.innerHTML = "Not enough fuel";
        faultyItems.style.visibility = 'visible';
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
    } else if ((cargoLevel.value) > 10000) {
        cargoStatus.innerHTML = "Cargo too heavy for takeoff";
        faultyItems.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
    } else if ((cargoLevel.value) < 10000 && (fuelLevel.value) > 10000) {
        faultyItems.style.visibility = "visible";
        fuelStatus.innerHTML = "Enough fuel for journey";
        cargoStatus.innerHTML = "Cargo good enough for takeoff";
        launchStatus.innerHTML = "Shuttle is ready for launch";
        launchStatus.style.color = "green";
    }

} 



async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        console.log(response)
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {

    let planet = planets[Math.floor(Math.random() * planets.length)];
    return planet;
}


module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
