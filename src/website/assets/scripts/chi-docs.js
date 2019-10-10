const onLoadCallbacks = [];
let onLoadExecuted = false;
const processedAnchors = {
  all: [],
  latestH3: ''
};

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

function addId(item) {
  var id = item.textContent.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();

  if (item.nodeName === 'H3') {
    processedAnchors.latestH3 = id;
  } else if (processedAnchors.latestH3) {
    id = processedAnchors.latestH3 + '-' + id;
  }
  let counter = 1;
  while (processedAnchors.all.indexOf(id) !== -1) {
    id = id.replace(/^(.*?)(-\d+)?$/, '$1-' + counter);
    counter++;
  }
  item.id = id;
  processedAnchors.all.push(id);
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

  var anchors = document.querySelectorAll('h3,h4');

 // Polyfill element.closest IE9+
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      var el = this;

      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }

  Array.prototype.forEach.call(anchors, function(anchor) {
    const spanContainer = document.createElement('span');
    const anchorLink = document.createElement('a');
    if (anchor.closest(".example")) {
      return;
    } else {
      addClass(anchor, '-anchor');
      addId(anchor);
      spanContainer.appendChild(anchorLink);
      anchorLink.textContent = '#';
      anchorLink.setAttribute('class', '-ml--1');
      anchorLink.setAttribute('href', '#'+anchor.id);
      anchor.appendChild(spanContainer);
      if (window.location.hash === '#'+anchor.id) {
        window.location.hash = '#';
        window.location.hash = '#'+anchor.id;
      }
    }
  });

  var codeSnippets = document.getElementsByTagName('pre');
  Array.prototype.forEach.call(codeSnippets, function(codeSnippet) {
    enableCopyToClipboardFeature(codeSnippet);
  });

  var dropdownButton = document.getElementById('version-dropdown');
  var versions;
  
  dropdownButton.innerText = window.chiCurrentVersion;
  chi.dropdown(dropdownButton);
  chi.dropdown(document.getElementById('support'));
  
  if (window.location.hostname === 'assets.ctl.io') {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
              versions = JSON.parse(xmlhttp.responseText);
              fillDropdown();
              checkChiCurrentVersion(versions[0]);
            }
        }
    };

    xmlhttp.open("GET", "https://assets.ctl.io/chi/versions.json", true);
    xmlhttp.send();
  }

  function fillDropdown() {
    var drop = document.getElementById('versionDropdown');

    drop.innerHTML = "";
    for (let version in versions) {
      var versionAnchor = document.createElement('a');
      
      versionAnchor.setAttribute("href", "https://assets.ctl.io/chi/"+versions[version]);
      versionAnchor.setAttribute("class", "m-dropdown__menu-item");
      versionAnchor.innerText = "v" + versions[version];
      drop.appendChild(versionAnchor);
    }
  }

  function checkChiCurrentVersion(currentVersion) {
      if (window.chiCurrentVersion.toString() !== currentVersion.toString()) {
        var docsContainerSelector = document.querySelector('.docs-container');
        var chiVersionCheckSelector = document.querySelector('.docs-header');
        var newVersionMessage = document.createElement('div');

        newVersionMessage.setAttribute("class", "m-alert -banner -center -info -w--100");
        newVersionMessage.setAttribute("role", "alert");
        newVersionMessage.innerHTML = `<i class="a-icon -sm--2 icon-circle-info -text--info"></i> A new version of Chi is available! &nbsp;<a href="https://assets.ctl.io/chi/">Learn more &#8250;</a>`;

        chiVersionCheckSelector.insertBefore(newVersionMessage, chiVersionCheckSelector.childNodes[0]);

        docsContainerSelector.classList.add("outdated-version");

      }
  }

});
