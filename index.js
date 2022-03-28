function getEarningValue() {
  function currencyStringValueToNumber(currency) {
    return Number(currency.replace(".", "").replace(",", "."));
  };

  function numberToCurrencyStringValue(number) {
    return Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
    }).format(number);
  }

  const totalValueField = document.querySelector("div.mr-3 > strong.d-flex > span.sensitive-field");
  const currentValueField = document.querySelector("div > strong.d-flex > span.sensitive-field");
  const currentValueDiv = document.querySelector("div > div.card.p-1.pl-3.pr-3.white-text.bg-main-green.d-flex.d-sm-block.justify-between.align-items-center.border-0");

  const totalValueCurrency = currencyStringValueToNumber(totalValueField.innerText);
  const currentValueCurrency = currencyStringValueToNumber(currentValueField.innerText);

  if (!totalValueCurrency || !currentValueCurrency) return;

  const earningValue = currentValueCurrency - totalValueCurrency;

  const span = document.createElement('span');

  span.classList.add("fw-700");

  if (earningValue < 0) {
    span.classList.add("text-main-secondary");
  }

  span.setAttribute('data-item', "total_F");

  span.innerText = "R$ " + numberToCurrencyStringValue(earningValue.toFixed(2));

  const quantityOfCurrentValueDivChildren = currentValueDiv.children.length;

  if (quantityOfCurrentValueDivChildren >= 3) {
    currentValueDiv.removeChild(currentValueDiv.lastChild);
    currentValueDiv.appendChild(span);
  } else {
    currentValueDiv.appendChild(span);
  }
}

const main = () => {
  const MILISECONDS = 1000;

  setTimeout(() => {
    getEarningValue();
    setInterval(getEarningValue, 15 * MILISECONDS);
  }, 3 * MILISECONDS);
};

main();


