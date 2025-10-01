'use strict';
import { restaurantModal, restaurantRow } from './components.js';
import { fetchData } from './utils/commonFunctions.js';
import { apiUrl } from './utils/variables.js';

// your code here

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
const sortAlphabeticallyByName = (list) => {
  list.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (aName > bName) {
      return 1;
    }

    if (aName < bName) {
      return -1;
    }

    return 0;
  });
};

const highlight = 'highlight';

const removeHighlight = () => {
  table.querySelectorAll('tr').forEach((tr) => {
    tr.classList.remove(highlight);
  });
};

// https://stackoverflow.com/questions/1801732/how-do-i-link-to-google-maps-with-a-particular-longitude-and-latitude
const googleMaps = (restaurant) => {
  return `https://maps.google.com/?q=${restaurant.address},${restaurant.postalCode},${restaurant.city}`;
};

const showModal = (restaurant, courses) => {
  const dialog = document.querySelector('dialog');
  dialog.showModal();

  dialog.innerHTML = restaurantModal(restaurant, googleMaps, courses);

  dialog.querySelector('button').addEventListener('click', () => {
    dialog.close();

    removeHighlight();
  });
};

const table = document.querySelector('table');

// create function which receives restaurant value from restaurants array
const addRestaurantToTable = (restaurant) => {
  const tr = restaurantRow(restaurant);

  table.append(tr);

  tr.addEventListener('click', async () => {
    removeHighlight();

    tr.classList.add(highlight);

    const todaysMenu = await fetchData(
      `${apiUrl}/restaurants/daily/${restaurant._id}/en`,
    );
    console.log(todaysMenu.courses);
    showModal(restaurant, todaysMenu.courses);
  });
};

const getRestaurants = async () => {
  try {
    const restaurants = await fetchData(apiUrl + '/restaurants');
    console.log(restaurants);
    sortAlphabeticallyByName(restaurants);
    restaurants.forEach(addRestaurantToTable);
  } catch (error) {
    console.error(error.message);
  }
};

getRestaurants();
