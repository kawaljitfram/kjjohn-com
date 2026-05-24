(function () {
  var KEY = 'kjjohn-disclaimer-accepted';
  try {
    if (localStorage.getItem(KEY) === 'yes') return;
  } catch (e) {
    /* localStorage unavailable — show on every visit, fail-open is the right behaviour for a compliance notice */
  }

  var html = ''
    + '<div class="disclaimer-overlay" id="kj-disclaimer" role="dialog" aria-labelledby="kj-disclaimer-h" aria-modal="true">'
    + '  <div class="disclaimer-modal">'
    + '    <h2 id="kj-disclaimer-h">Disclaimer</h2>'
    + '    <p>This website has been designed only for the purposes of dissemination of basic information on law firm KJ John; information which is otherwise available on the internet, various public platforms and social media. Careful attention has been given to ensure that the information provided herein is accurate and up-to-date. However, law firm KJ John is not responsible for any reliance that a reader places on such information and shall not be liable for any loss or damage caused due to any inaccuracy in or exclusion of any information, or its interpretation thereof. Reader is advised to confirm the veracity of the same from independent and expert sources.</p>'
    + '    <div class="disclaimer-actions">'
    + '      <button class="disclaimer-btn accept" id="kj-disclaimer-accept" type="button">Accept</button>'
    + '      <button class="disclaimer-btn reject" id="kj-disclaimer-reject" type="button">Reject</button>'
    + '    </div>'
    + '  </div>'
    + '</div>';

  function mount() {
    document.body.insertAdjacentHTML('afterbegin', html);
    document.body.classList.add('disclaimer-locked');

    var overlay = document.getElementById('kj-disclaimer');
    var accept = document.getElementById('kj-disclaimer-accept');
    var reject = document.getElementById('kj-disclaimer-reject');

    accept.addEventListener('click', function () {
      try { localStorage.setItem(KEY, 'yes'); } catch (e) {}
      overlay.style.transition = 'opacity 0.25s ease';
      overlay.style.opacity = '0';
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        document.body.classList.remove('disclaimer-locked');
      }, 250);
    });

    reject.addEventListener('click', function () {
      window.location.replace('https://www.google.com/');
    });

    accept.focus();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
