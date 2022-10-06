let form;
let totalElem;


function init() {
    form = document.getElementById("booking");
    totalElem = document.getElementById("totalCost");


    form.persons.disabled = true;
    form.persons.parentNode.style.color = "#999";

    form.addEventListener("change", updatePrice)
}

function updatePrice() {
    let room = getValueFromInput(form.roomType);
    if(room === 950) {
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

    let nights = parseInt(form.nights.value);
    let extra = getValueFromInput(form.addition);
    let total = (room + extra) * nights;

    totalElem.innerText = total;
}


/**
 * @param {elementList} elementList 
 * @returns element
 */
function getValueFromInput(elementList) {
    let element = 0;

    for(let i = 0; i < elementList.length; i++) {
        if(elementList[i].checked && elementList[i].disabled === false) {
            console.log("inne");
            let value = elementList[i].value.split(",");
            if(elementList[i].type === "radio" || element === undefined) {
                element = parseInt(value[1]);
            } else {
                element += parseInt(value[1]);
            }
        }
    }

    return element;
}

window.onload = init;