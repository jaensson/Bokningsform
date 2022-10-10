// Global variables
let form;               // Reference to the form
let totalElem;          // Reference to total cost


// Initializing global variables
function init() {
    // References to element
    form = document.getElementById("booking");
    totalElem = document.getElementById("totalCost");

    // Event handlers
    form.addEventListener("change", checkIfFamilyRoom);
    form.addEventListener("change", updatePrice);

    // Input for campaign code
    form.campaigncode.addEventListener("keypress", e => {
        let value = form.campaigncode.value;                    // Input value campaign code
        let valid = /[a-zA-Z]{3}-[0-9]{2}-[a-zA-Z][0-9]$/;      // Three letters, -, two digits, -, a letter, a digit

        if(valid.test(value)) {                                 // Validates users input
            form.campaigncode.style.backgroundColor = "green";
        } else {
            form.campaigncode.style.backgroundColor = "red";
        }
    });

    // Input for zipcode
    form.zipcode.addEventListener("keypress", e => {
        let value = form.zipcode.value;                                                 // Input value zipcode
        value = value.replace(/[^a-zA-Z0-9 ]/g, "").replace(/[a-zåäöA-ZÅÄÖ ]/g, "");    // Replaces all characters except digits
        form.zipcode.value = value;
        let valid = /^[1-9][0-9]{4}$/;                                                  // First 1-9, four digits

        if(valid.test(value)) {                                                         // Validates users input
            form.zipcode.parentNode.parentNode.childNodes[2].innerText = "";
        } else {
            form.zipcode.parentNode.parentNode.childNodes[2].innerText = "Du får endast ha 5 siffor men inte börja på 0";
        }
    });

    // Input for telephone number
    form.telephone.addEventListener("keypress", e => {
        let value = form.telephone.value;                       // Input value telephone
        value = value.replace(/[a-zåäöA-ZÅÄÖ]/g, "");           // Replaces all characters except digits
        form.telephone.value = value;
        let valid = /^0[0-9]{3}[-/ ]?[0-9]{2,7}$/;              // First 0, Three digits, Either (slash, hyphen or space), Two to Seven digits 
        
        if(valid.test(value)) {                                 // Validates users input
            form.telephone.parentNode.parentNode.childNodes[2].innerText = "";
            form.telephone.style.backgroundColor = "green";
        } else {
            form.telephone.parentNode.parentNode.childNodes[2].innerText = "Du får inte ha några bokstäver och det måste börja på 0";
            form.telephone.style.backgroundColor = "red";
        }
    });

    // Input for mail address
    form.email.addEventListener("keypress", e => {
        let value = form.email.value;
        let valid = /^(?!\.)(\w|-|\.){1,64}(?!\.)@(?!\.)[-.a-zåäö0-9]{4,253}$/;
        let secondValid = /(\W|^)[\w.\-]{0,25}@(yahoo|hotmail|gmail)\.com(\W|$)/;

        if(valid.test(value)) {
            form.email.parentNode.parentNode.childNodes[1].innerText = "";
        } else {
            form.email.parentNode.parentNode.childNodes[1].innerText = "Skriv in en giltig mejladdress";
        }

        console.log(value);
    });

    // Default values for updating input
    form.city.style.textTransform = "Uppercase";
    form.persons.disabled = true;
    form.persons.parentNode.style.color = "#999";
}

/**
 * Checks if it is a family room
 */
function checkIfFamilyRoom() {
    let room;
    for(let i = 0; i < form.roomType.length; i++) {
        if(form.roomType[i].checked) {
            let value = form.roomType[i].value.split(",");
            room = value[0];
        }
    }

    if(room === "familjerum") {
        form.persons.disabled = false;
        form.persons.parentNode.style.color = "#000";
        form.addition[2].disabled = true;
        form.addition[2].parentNode.style.color = "#999";
    } else {
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
    let room = getPriceValueFromInput(form.roomType);
    let nights = parseInt(form.nights.value);
    let extra = getPriceValueFromInput(form.addition);
    let total = (room + extra) * nights;

    totalElem.innerText = total;
}

/**
 * Get prices from checked inputs
 * @param {elementList} 
 * @returns elementValue
 */
function getPriceValueFromInput(elementList) {
    let elementValue = 0;

    for(let i = 0; i < elementList.length; i++) {
        if(elementList[i].checked && elementList[i].disabled === false) {
            let value = elementList[i].value.split(",");
            elementValue += parseInt(value[1]);
        }
    }

    return elementValue;
}

// Runs init when window is loaded
window.onload = init;