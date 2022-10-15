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

  if (countryName === '') {
    listEl.innerHTML = '';
  } else {
    fetchCountries(countryName)
      .then(data => {
        console.log(data);

        if (data.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          listEl.innerHTML = '';
          return;
        } else {
          const markup =
            data.length === 1 ? createMarkupCard(data) : createMarkupList(data);

          listEl.innerHTML = markup;
        }
      })
      .catch(err => {
        Notify.failure('Oops, there is no country with that name');
        listEl.innerHTML = '';
      });
  }
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

function createMarkupCard(arr) {
  return arr
    .map(
      country => `<img src="${country.flags.svg}" alt="flag ${
        country.name.official
      }" width = "30" />
  <h2>${country.name.official}</h2>
  <p>Capital: ${country.capital}</p>
  <p>Population: ${country.population}</p>
  <p>Languages: ${(Object.values(country.languages)).join(', ')}</p>`
    )
    .join('');
}
