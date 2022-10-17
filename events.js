function eventHandlers() {
    form.addEventListener("change", checkIfFamilyRoom);
    form.addEventListener("change", updatePrice);

    // Input for campaign code
    form.campaigncode.addEventListener("keyup", e => {
        let value = form.campaigncode.value;                    // Input value campaign code
        let valid = /[a-zA-Z]{3}-[0-9]{2}-[a-zA-Z][0-9]$/;      // Three letters, -, two digits, -, a letter, a digit

        if(valid.test(value)) {                                 // Validates users input
            form.campaigncode.style.backgroundColor = "green";
        } else {
            form.campaigncode.style.backgroundColor = "red";
        }
    });

    // Input for zipcode
    form.zipcode.addEventListener("keyup", e => {
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
    form.telephone.addEventListener("keyup", e => {
        let value = form.telephone.value;                       // Input value telephone
        value = value.replace(/[a-zåäöA-ZÅÄÖ]/g, "");           // Replaces all characters except digits
        form.telephone.value = value;
        let valid = /^0[0-9]{3}[-/ ]?[0-9]{2,7}$/;              // First 0, Three digits, Either (slash, hyphen or space), Two to Seven digits 
        
        if(valid.test(value)) {                                 // Validates users input
            form.telephone.parentNode.parentNode.childNodes[2].innerText = "";
        } else {
            form.telephone.parentNode.parentNode.childNodes[2].innerText = "Du får inte ha några bokstäver och det måste börja på 0";
        }
    });

    // Input for mail address
    form.email.addEventListener("keyup", e => {
        let value = form.email.value;                               // Input value email address
        let valid = /^[a-zA-Z0-9]{1,64}@[.a-z0-9]{4,253}/;          // (Minimum 1, maximum 64) Letters or digits, @, (Minimum 4, maximum 253) lowercase letters or dot or digits

        if(valid.test(value)) {                                     // Validates users input
            form.email.parentNode.parentNode.childNodes[1].innerText = "";
        } else {
            form.email.parentNode.parentNode.childNodes[1].innerText = "Skriv in en giltig mejladdress";
        }
    });
}