const onLoadCallbacks = [];
let onLoadExecuted = false;

function onLoad(callback) {
  if (!onLoadExecuted) {
    onLoadCallbacks.push(callback);
  } else {
    callback();
  }
}

function executeOnLoadCallbacks() {
  onLoadExecuted = true;
  onLoadCallbacks.forEach(callback => callback());
}

if (window.attachEvent) {
  window.attachEvent('onload', executeOnLoadCallbacks);
} else {
  if (window.onload) {
      const currentOnLoad = window.onload;
      const newOnLoad = function(evt) {
        currentOnLoad(evt);
        executeOnLoadCallbacks(evt);
      };
      window.onload = newOnLoad;
  } else {
      window.onload = executeOnLoadCallbacks;
  }
}

function addClass(item, className) {
  const classes = item.className.split(' ');

  if (classes.indexOf(className) === -1) {
    classes.push(className);
  }

  item.className = classes.join(' ');
}

function removeClass(item, className) {
  const classes = item.className.split(' ');

  item.className = classes.filter(name => name !== className);
}

function enableCopyToClipboardFeature (preElem) {

  const code = preElem.childNodes && preElem.childNodes[0];

  if ( code.nodeName !== 'CODE' || !code.textContent ) {
    return;
  }

  const copyButtonWrapper = document.createElement('div');
  copyButtonWrapper.setAttribute('class', 'clipboard');
  const copyButton = document.createElement('button');
  copyButton.textContent = 'Copy';
  copyButton.setAttribute('class', 'clipboard__button a-btn -sm -flat');
  copyButtonWrapper.appendChild(copyButton);
  const textAreaWrapper = document.createElement('div');
  textAreaWrapper.setAttribute('class', 'clipboard__text-wrapper');
  copyButtonWrapper.appendChild(textAreaWrapper);

  preElem.parentNode.insertBefore(copyButtonWrapper, preElem);

  const copy = function() {
    const textArea = document.createElement("textarea");
    textArea.textContent = code.textContent;
    textArea.style.opacity = "0.01";
    textAreaWrapper.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textAreaWrapper.removeChild(textArea);
  };

  copyButton.addEventListener('click', copy);

}

onLoad(() => {

  var examples = document.querySelectorAll('.m-example');

  Array.prototype.forEach.call(examples, function(example) {
    const firstChild = example.querySelector('li:first-child');
    const lastChild = example.querySelector('li:last-child');
    const htmlItem = example.querySelector('.m-example__html');
    const codeItem = example.querySelector('.m-example__code');

    firstChild.onclick = function(evt) {
      evt.preventDefault();

      addClass(firstChild, '-active');
      removeClass(lastChild, '-active');
      removeClass(htmlItem, '-hidden');
      addClass(codeItem, '-hidden');
    };

    lastChild.onclick = function(evt) {
      evt.preventDefault();

      removeClass(firstChild, '-active');
      addClass(lastChild, '-active');
      addClass(htmlItem, '-hidden');
      removeClass(codeItem, '-hidden');
    };
  });

  var codeSnippets = document.getElementsByTagName('pre');
  Array.prototype.forEach.call(codeSnippets, function(codeSnippet) {
    enableCopyToClipboardFeature(codeSnippet);
  });

  // Order checkout flow template
  const numbers = [1,2,3,4,5,6];
  Array.prototype.forEach.call(numbers, function(number) {
    let card = document.getElementById(number);
    const cardTitle = card.querySelector('h5');
    let input = document.getElementById('input-number-' + number);
    let quantityInit = document.getElementById('quantityInit');
    let quantity = document.getElementById('quantity');
    let equipment= document.getElementById('equipment');
    card.style.cursor = 'pointer';
    let cart = document.getElementById('cart');
    let empty = document.getElementById('empty');
    let location = document.getElementById('location');
    let locations = document.getElementById('locations');
    let locationTab = document.getElementById('locationTab');
    let locationActiveTab = document.getElementById('locationActiveTab');
    location.onclick = function(evt) {
      evt.preventDefault();
      locationActiveTab.style.display = 'none';
      addClass(locationActiveTab, '-d--none');
      addClass(locations, '-d--block');
      removeClass(locationTab, '-d--none');
      locationTab.style.display = 'inline-block';
      addClass(locationTab, '-active -d--block -bg--grey-20');
    };
    card.onclick = function(evt) {
      evt.preventDefault();
      if ( card.classList.contains('-active')) {
        if (input.value === '0') {
          removeClass(card, '-active');
          removeClass(cardTitle, '-text--brand');
          if ( card.id < '5') {
            removeClass(cart, '-d--block');
            removeClass(empty, '-d--block');
            quantityInit.style.display = 'block';
            quantity.style.display = 'none';
          } else if ( card.id > '4') {
            equipment.style.display = 'none';
          }
        }
      } else if ( card.id > '4') {
        input.value++;
        addClass(card, '-active');
        addClass(cardTitle, '-text--brand');
        addClass(cart, '-d--block');
        quantityInit.style.display = 'none';
        quantity.style.display = 'block';
        equipment.style.display = 'block';
      } else  {
        input.value++;
        input.dispatchEvent(new Event('change'));
        addClass(card, '-active');
        addClass(cardTitle, '-text--brand');
        addClass(cart, '-d--block');
        removeClass(empty, '-d--block');
        addClass(empty, '-d--none');
        quantityInit.style.display = 'none';
        quantity.style.display = 'block';
      }
    };
  });

  chi.dropdown(document.getElementById('version-dropdown'));
});
