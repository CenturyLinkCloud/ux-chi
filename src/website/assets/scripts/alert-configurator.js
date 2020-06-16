window.alertConfigurator = (configurator, alert) => {
  const configurators = configurator.querySelectorAll(
    `#configurator-color,
    #configurator-type,
    #configurator-size,
    #configurator-title,
    #configurator-message,
    #configurator-icon,
    #configurator-center,
    #configurator-closable
    `
  );

  let color;
  let type;
  let size;
  let title;
  let message;
  let icon;
  let center;
  let closable;

  const handleTitle = (newTitle) => {
    const invalidTitleMessage = configurator.querySelector('#configurator-title + .-status');

    if (alert.center && newTitle !== '') {
      invalidTitleMessage.classList.remove('-d--none');
      alert.title = '';
    } else {
      invalidTitleMessage.classList.add('-d--none');
      alert.title = newTitle;
    }
  };

  const handleMessage = (message) => {
    alert.querySelector('.chi-alert__text').innerText = message;
  };

  const handleCentered = (centered) => {
    const titleValue = document.querySelector('#configurator-title').value;

    alert.center = centered;
    handleTitle(titleValue);
  };

  const generateCodeSnippet = () => {
    const colorAttribute = this.color ? ` color="${this.color}"` : '';
    const typeAttribute = this.type ? ` type="${this.type}"` : '';
    const sizeAttribute = this.size ? ` size="${this.size}"` : '';
    const titleAttribute = this.title && !this.center ? ` title="${this.title}"` : '';
    const alertMessage = this.message ? this.message : 'This is an info alert';
    const iconAttribute = this.icon ? ` icon="${this.icon}"` : '';
    const centerAttribute = this.center ? ' center' : '';
    const closableAttribute = this.closable ? ' closable' : '';
    const webComponentCodeSnippet = `&lt;chi-alert${colorAttribute}${typeAttribute}${sizeAttribute}${titleAttribute}${iconAttribute}${centerAttribute}${closableAttribute}&gt;
  ${alertMessage}
&lt;/chi-alert&gt;`;
    const dynamicCodeSnippetContainer = document.querySelector('#dynamic-code-snippet');
    const dynamicCodeSnippet = document.createElement('code');
    const preCodeSnippet = document.createElement('pre');
    dynamicCodeSnippet.classList.add('language-markup');
    dynamicCodeSnippet.innerHTML = webComponentCodeSnippet;
    preCodeSnippet.classList.add('language-markup');
    preCodeSnippet.appendChild(dynamicCodeSnippet);
    while (dynamicCodeSnippetContainer.firstChild) {
      dynamicCodeSnippetContainer.removeChild(dynamicCodeSnippetContainer.lastChild);
    }
    dynamicCodeSnippetContainer.appendChild(preCodeSnippet);
    Prism.highlightAll();
  };

  Array.prototype.forEach.call(
    configurators,
    (configurator) => {
      configurator.addEventListener('change', (e) => {
        const configuratorType = e.target.getAttribute('id').split('-')[1];

        switch (configuratorType) {
          case 'size':
            this.size = e.target.value;
            alert.size = e.target.value;
            break;
          case 'type':
            this.type = e.target.value;
            alert.type = e.target.value;
            break;
          case 'color':
            this.color = e.target.value;
            alert.color = e.target.value;
            break;
          case 'title':
            this.title = e.target.value;
            handleTitle(e.target.value);
            break;
          case 'message':
            this.message = e.target.value;
            handleMessage(e.target.value);
            break;
          case 'icon':
            this.icon = e.target.value;
            alert.icon = e.target.value;
            break;
          case 'center':
            this.center = !!e.target.checked;
            handleCentered(!!e.target.checked);
            break;
          case 'closable':
            this.closable = !!e.target.checked;
            alert.closable = !!e.target.checked;
            break;
        }

        generateCodeSnippet();
      });
    }
  );
};
