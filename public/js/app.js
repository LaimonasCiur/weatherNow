const message1 = document.querySelector('.message1');
const message2 = document.querySelector('.message2');
const message3 = document.querySelector('.message3');
const message4 = document.querySelector('.message4');
const icon = new Skycons({ color: 'black' });

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  fetch(`http://localhost:3000/weather?address=${document.querySelector('input').value}`)
    .then(response => response.json())
    .then(results => {
      if (results.error) {
        message1.textContent = results.error;
        message2.textContent = '';
        message3.textContent = '';
        message4.textContent = '';
      } else {
        const { dailyData, currTemp, chanceOfRain } = results.forecastData;
        message1.textContent = `${dailyData}`;
        message4.textContent = `The temperature is: ${currTemp}`;
        message3.textContent = `The chance of rain is: ${chanceOfRain}`;
        message2.textContent = `Location: ${results.location}`;
      }
    });
});

(function() {
  // Variables
  let $curve = document.getElementById('curve');
  let last_known_scroll_position = 0;
  let defaultCurveValue = 350;
  let curveRate = 3;
  let ticking = false;
  let curveValue;

  // Handle the functionality
  function scrollEvent(scrollPos) {
    if (scrollPos >= 0 && scrollPos < defaultCurveValue) {
      curveValue = defaultCurveValue - parseFloat(scrollPos / curveRate);
      $curve.setAttribute('d', 'M 800 300 Q 400 ' + curveValue + ' 0 300 L 0 0 L 800 0 L 800 300 Z');
    }
  }

  // Scroll Listener
  // https://developer.mozilla.org/en-US/docs/Web/Events/scroll
  window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        scrollEvent(last_known_scroll_position);
        ticking = false;
      });
    }

    ticking = true;
  });
})();

icon.set('icon', 'clear-day');
icon.play();

let contInput = document.getElementById('continput');
let gInput = document.getElementById('input-group');
let input = document.getElementById('searchtext');
let button = document.getElementById('icon-src');
let logo = document.getElementById('logo');
let results = document.getElementById('results');
let redBg = document.getElementById('header');

var element = [redBg, contInput, gInput, button, logo, results];

input.addEventListener(
  'focus',
  function() {
    for (var i = 0; i < element.length; i++) {
      element[i].classList.add('focus' + i);
    }
  },
  false
);
