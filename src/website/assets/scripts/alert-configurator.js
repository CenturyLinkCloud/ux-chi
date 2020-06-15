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

  Array.prototype.forEach.call(
    configurators,
    function(configurator) {
      configurator.addEventListener('change', function(e) {
        const configuratorType = e.target.getAttribute('id').split('-')[1];

        switch (configuratorType) {
          case 'size':
            alert.size = e.target.value;
            break;
          case 'type':
            alert.type = e.target.value;
            break;
          case 'color':
            alert.color = e.target.value;
            break;
          case 'title':
            handleTitle(e.target.value);
            break;
          case 'message':
            handleMessage(e.target.value);
            break;
          case 'icon':
            alert.icon = e.target.value;
            break;
          case 'center':
            handleCentered(!!e.target.checked);
            break;
          case 'closable':
            alert.closable = !!e.target.checked;
            break;
        }
      });
    }
  );
};
