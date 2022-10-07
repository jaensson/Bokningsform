let form;
let totalElem;


function init() {
    form = document.getElementById("booking");
    totalElem = document.getElementById("totalCost");

    form.persons.disabled = true;
    form.persons.parentNode.style.color = "#999";

    form.addEventListener("change", checkIfFamilyRoom);
    form.addEventListener("change", updatePrice);

    form.city.style.textTransform = "Uppercase";

    form.zipcode.addEventListener("keyup", e => {
        console.log(form.zipcode.value);
        let value = form.zipcode.value;
        value = parseInt(form.zipcode.value);
        let valid = /(^\d{5}$)|(^\d{5}-\d{4}$)/;


        if(valid.test(value)) {
            form.zipcode.parentNode.parentNode.childNodes[2].innerText = "";
        } else {
            form.zipcode.parentNode.parentNode.childNodes[2].innerText = "Du får inte ha några bokstäver eller färre än 5 siffror.";
        }
    });

    form.telephone.addEventListener("keyup", e => {
        console.log(form.telephone.value);
        let valid = /^0/;
        let value = form.telephone.value;

        if(valid.test(value)) {
            form.telephone.parentNode.parentNode.childNodes[2].innerText = "";
        } else {
            form.telephone.parentNode.parentNode.childNodes[2].innerText = "Du får inte ha några bokstäver och det måste börja på 0";
        }

    });
   
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
 * Updates total price
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

window.onload = init;