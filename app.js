const baseURL= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const message = document.querySelector(".message");

const updateExchangeRate = async () => {
    let amount = document.querySelector("input").value;
    if(amount === "" || amount < 1){
        amount  = 1;
    
    }
    console.log(from.value);
    console.log(to.value);
    const url = `${baseURL}/${from.value.toLowerCase()}.json`;
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[from.value.toLowerCase()][to.value.toLowerCase()];
    let finalAmount = amount * rate;
    message.innerText = `${amount} ${from.value} = ${finalAmount} ${to.value}`
}

window.addEventListener("load", () => {
    updateExchangeRate();
})


for(let option of dropdown){
    for(let code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(option.name === "from" && code ==="USD"){
            newOption.selected = "selected";
        }
        if(option.name === "to" && code ==="INR"){
            newOption.selected = "selected";
        }
        option.appendChild(newOption);
    }

    option.addEventListener("change", (event) =>{
        updateFlag(event.target);
    })
}

const updateFlag = (element) => {
    let code = element.value;
    let country = countryList[code];
    let link = `https://flagsapi.com/${country}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = link;
}

button.addEventListener("click", (event) => {
    event.preventDefault(); //prevent the page refresh behaviour
    updateExchangeRate();
})

