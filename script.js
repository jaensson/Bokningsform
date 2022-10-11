// Global variables
let form;               // Reference to the form
let totalElem;          // Reference to total cost

// Initializing global variables
function init() {
    // References to element
    form = document.getElementById("booking");
    totalElem = document.getElementById("totalCost");

    // Event handlers
    eventHandlers();

    // Default values for updating/disabling input based on the room type, family
    form.city.style.textTransform = "Uppercase";
    form.persons.disabled = true;
    form.persons.parentNode.style.color = "#999";    
}

/**
 * Checks if it is a family room
 */
function checkIfFamilyRoom() {
    let room;                                                   // Current type of room

    // Gets checked roomType using loop
    for(let i = 0; i < form.roomType.length; i++) {
        if(form.roomType[i].checked) {
            let value = form.roomType[i].value.split(",");      // Separates values by (,) in an array, first index = roomType, second index = cost
            room = value[0];
        }
    }

    if(room === "familjerum") {                                 // If room type is familyroom, disable lake view and enable amount amount of people
        form.persons.disabled = false;
        form.persons.parentNode.style.color = "#000";
        form.addition[2].disabled = true;
        form.addition[2].parentNode.style.color = "#999";
    } else {                                                    // Else enable lake view and disable amount of people
        form.persons.disabled = true;
        form.persons.parentNode.style.color = "#999";
        form.addition[2].disabled = false;
        form.addition[2].parentNode.style.color = "#000";
    }
}

/**
 * Updates current total price
 */
function updatePrice() {
    let room = getPriceValueFromInput(form.roomType);           // Cost of room 
    let nights = parseInt(form.nights.value);                   // For how many nights
    let extra = getPriceValueFromInput(form.addition);          // Cost of extra additions
    let total = (room + extra) * nights;                        // Total cost, (room per night) * nights

    totalElem.innerText = total;
}

/**
 * Get costs from checked inputs
 * @param {elementList} 
 * @returns elementValue
 */
function getPriceValueFromInput(elementList) {
    let elementValue = 0;                                                   // Total cost of checked elements in elementList

    // Gets checked roomType/addition using loop
    for(let i = 0; i < elementList.length; i++) {
        if(elementList[i].checked && elementList[i].disabled === false) {
            let value = elementList[i].value.split(",");                    // Separates values by (,) in an array, first index = roomType/addition, second index = cost
            elementValue += parseInt(value[1]);                             // Adds cost to total
        }
    }

    return elementValue;
}

// Runs init when window is loaded
window.onload = init;