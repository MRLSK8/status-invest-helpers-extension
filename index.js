// seta o valor que eu to ganhando ou perdendo do patrimonio.
function setEarningValue() {
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


// seta os valores das porcentagens ideal para cada ativo.
function setIdealPercentages() {
  const activePercentages = {
    ALUP4: 2,
    BBAS3: 2,
    EGIE3: 2,
    FLRY3: 2,
    SAPR4: 2,
    ALZR11: 10,
    BCFF11: 10,
    HGLG11: 10,
    IRDM11: 7,
    KNRI11: 10,
    MXRF11: 10,
    XPLG11: 10,
  };

  function teste(CODE) {
    const field = `div.card div.collapsible-body table > tbody td[title='${CODE}'] ~ td[data-key='walletPercent']`;
    const totalPercentageValueField = document
      .querySelector(field);

    if (!totalPercentageValueField) return;
    const currentValue = totalPercentageValueField.innerText.replace("%", '');

    totalPercentageValueField.innerText = `${currentValue}% -> ( ${activePercentages[CODE]}% ) `;
  }

  Object.keys(activePercentages).map(key => {
    console.log(key)
    teste(key)
  });
}

// Chama as apis pra atualizar os valores da carteira no status invest.
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

// cria botão pra atualizar a carteira no status invest.
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

  setTimeout(() => {
    setEarningValue();
    setIdealPercentages();
  }, 3 * MILISECONDS);
};


main();

