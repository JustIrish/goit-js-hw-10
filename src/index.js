import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput() {
  const countryName = inputEl.value.trim();

  fetchCountries(countryName)
    .then(data => {
      const markup = createMarkupList(data);
      listEl.innerHTML = markup;
    })
    .catch(err => {});
}

function createMarkupList(arr) {
  return arr
    .map(
      country => `<li class="country-list-item">
  <img src="${country.flags.svg}" alt="flag ${country.name.official}" width = "30" />
  <h2 class="country-title">${country.name.official}</h2>
  </li>`
    )
    .join('');
}
