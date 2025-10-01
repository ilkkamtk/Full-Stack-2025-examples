'use strict';
import { restaurantRow } from './components.js';
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
  const { name, address, postalCode, city, phone, company } = restaurant;
  let coursesHtml = `
  <table>
    <thead>
        <tr>
            <th>
                Name
            </th>
            <th>
                Price
            </th>
            <th>
                Diet
            </th>
        </tr>
    </thead>
    <tbody>`;
  for (const { name, price, diets } of courses) {
    coursesHtml += `
    <tr>
        <td>${name}</td>
        <td>${price || 'no price definded'}</td>
        <td>${diets || 'no diets definded'}</td>
    </tr>`;
  }
  coursesHtml += '</tbody>';

  const dialog = document.querySelector('dialog');

  // use showModal() method, as .open = true; or .show() opens the modal in the bottom of the page
  // "JavaScript should be used to display the <dialog> element. Use the .showModal() method to display a modal dialog and the .show() method to display a non-modal dialog."
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
  dialog.showModal();

  dialog.innerHTML = `
  <div class="dialog-head">
    <h1>${name}</h1>

    <button type="button">❌</button>
  </div>

  <p>
  Address: <a href="${googleMaps(restaurant)}">${address}</a><br>
  Postal code: ${postalCode}<br>
  City: ${city}<br>
  Phone number: <a href="tel:${phone}">${phone}</a><br>
  Company: ${company}
  </p>
  ${coursesHtml}
  `;

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
