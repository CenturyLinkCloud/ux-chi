const NO_FOCUS_CLASS = 'no-focus-outline';

export default function focusVisibility() {
  document.body.classList.add(NO_FOCUS_CLASS);

  window.addEventListener("keyup", function (e) {
    if (e.which === 9) {
      document.body.classList.remove(NO_FOCUS_CLASS);
    }
  });

  Array.prototype.forEach.call(
    document.querySelectorAll('a, input, button'),
    function(focusableElement) {
      focusableElement.addEventListener("blur", function (e) {
        if (!e.relatedTarget) {
          document.body.classList.add(NO_FOCUS_CLASS);
        }
      });
    }
  );
}
