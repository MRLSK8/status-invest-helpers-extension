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

  if (!totalValueField || !currentValueField || !currentValueDiv) return;

  const totalValueCurrency = currencyStringValueToNumber(totalValueField.innerText);
  const currentValueCurrency = currencyStringValueToNumber(currentValueField.innerText);

  if (!totalValueCurrency || !currentValueCurrency) return;

  const earningValue = currentValueCurrency - totalValueCurrency;

  const span = document.createElement('span');

  span.classList.add("fw-700");

  // if (earningValue < 0) {
  //   span.classList.add("text-main-secondary");
  // }

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

const updateInfo = async () => {
  let formDataId = new FormData();
  formDataId.append('id', '296055');

  let formDataWalletId = new FormData();
  formDataWalletId.append('walletId', '296055');

  const promise1 = fetch('https://statusinvest.com.br/AdmWallet/ConsolidateWallet',
    {
      method: 'POST',
      body: formDataId
    }
  );

  const promise2 = fetch('https://statusinvest.com.br/AdmWallet/GetMyWallet', {
    method: 'POST',
  });

  const promise3 = fetch('https://statusinvest.com.br/AdmWallet/getwalletinconsistencies', {
    method: 'POST',
    body: formDataId
  });

  const promise4 = fetch('https://statusinvest.com.br/AdmWallet/GetWalletCorporativeEvents', {
    method: 'POST',
    body: formDataId
  });

  const promise5 = fetch('https://statusinvest.com.br/admwallet/getwalletintegrationhistory', {
    method: 'POST',
    body: formDataId
  });

  const promise6 = fetch('https://statusinvest.com.br/admbrokerintegration/getintegrations', {
    method: 'POST',
    body: formDataWalletId
  });

  const promise7 = fetch('https://statusinvest.com.br/admwallet/status', {
    method: 'POST',
  });

  const response = await Promise.all([promise1, promise2, promise3, promise4, promise5, promise6, promise7]);
  const result = await response[0].json();

  if (result?.success) {
    alert("Atualização da carteira inicializada com sucesso!");
  } else {
    alert("Erro ao atualizar a carteira: " + result?.message);
  }
};

const createUpdateButton = () => {
  const notificationTag = document.querySelectorAll("li.nav-item")[8];

  if (!notificationTag) return;

  const liTag = document.createElement('li');
  liTag.classList.add("nav-item", "d-none", "d-md-block");

  const buttonTag = document.createElement('button');
  buttonTag.classList.add("nav-link", "btn", "btn-sm", "btn-outline-secondary", "btn-rounded");
  buttonTag.innerText = "Atualiar";
  buttonTag.addEventListener('click', updateInfo);

  liTag.appendChild(buttonTag);

  notificationTag.insertAdjacentElement("beforebegin", liTag);
};

const main = () => {
  const MILISECONDS = 1000;

  setTimeout(createUpdateButton, 2 * MILISECONDS);

  setTimeout(getEarningValue, 3 * MILISECONDS);
};

main();