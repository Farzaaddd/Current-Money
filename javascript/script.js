const dropList = document.querySelectorAll(".drop-list select"),
  fromCurrency = document.querySelector(".from select"),
  toCurrency = document.querySelector(".to select"),
  getBtn = document.querySelector("form button");

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

function loadFlag(element) {
  for (code in country_code) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/w80/${country_code[code]}.png`;
    }
  }
}

window.addEventListener("load", (e) => {
  getExchangeRate();
});

getBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

let exchnageBtn = document.querySelector(".drop-list .icon");
exchnageBtn.addEventListener("click", (e) => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector(".amount input"),
    totalExchangeRateTxt = document.querySelector(".exchange-rate");

  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }

  totalExchangeRateTxt.innerText = "Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/5d71578e4cc7a6c131f1aa2d/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExchangeRate = amountVal * exchangeRate.toFixed(2);
      totalExchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
      console.log(totalExchangeRate);
    })
    .catch((err) => {
      totalExchangeRateTxt.innerText = "Something went wrong !";
      console.log(err);
    });
}
