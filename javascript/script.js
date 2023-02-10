// The main variables we need
const dropList = document.querySelectorAll(".drop-list select"),
  fromCurrency = document.querySelector(".from select"),
  toCurrency = document.querySelector(".to select");

// Get the rate and country code
for (let i = 0; i < dropList.length; i++) {
  for (currency_code in country_code) {
    let selected;
    if (i == 0) {
      selected = currency_code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code == "AED" ? "selected" : "";
    }
    let optionTag = `<option value="${currency_code}" ${selected}> ${currency_code} </option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }

  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

// Get the flag
function loadFlag(element) {
  for (code in country_code) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://countryflagsapi.com/png/${country_code[code]}`;
    }
  }
}

// Swap rate
let exchangeBtn = document.querySelector(".drop-list .icon");
exchangeBtn.addEventListener("click", (e) => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
});
