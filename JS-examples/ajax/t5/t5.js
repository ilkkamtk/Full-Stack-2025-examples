// your code here
const apiUrl = 'https://media1.edu.metropolia.fi/restaurant/api/v1';

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

const showModal = (restaurant) => {
  const dialog = document.querySelector('dialog');

  // use showModal() method, as .open = true; or .show() opens the modal in the bottom of the page
  // "JavaScript should be used to display the <dialog> element. Use the .showModal() method to display a modal dialog and the .show() method to display a non-modal dialog."
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
  dialog.showModal();

  dialog.innerHTML = `
  <div class="dialog-head">
    <h1>${restaurant.name}</h1>

    <button type="button">❌</button>
  </div>

  <p>
  Address: <a href="${googleMaps(restaurant)}">${restaurant.address}</a><br>
  Postal code: ${restaurant.postalCode}<br>
  City: ${restaurant.city}<br>
  Phone number: <a href="tel:${restaurant.phone}">${restaurant.phone}</a><br>
  Company: ${restaurant.company}
  </p>

  `;

  dialog.querySelector('button').addEventListener('click', () => {
    dialog.close();

    removeHighlight();
  });
};

const table = document.querySelector('table');

// create function which receives restaurant value from restaurants array
const addRestaurantToTable = (restaurant) => {
  const tr = document.createElement('tr');
  const tdName = document.createElement('td');
  const tdAddress = document.createElement('td');

  tdName.innerText = restaurant.name;
  tdAddress.innerText = restaurant.address;

  tr.append(tdName);
  tr.append(tdAddress);

  table.append(tr);

  tr.addEventListener('click', () => {
    removeHighlight();

    tr.classList.add(highlight);

    showModal(restaurant);
  });
};

async function getRestaurants() {
  try {
    const restaurants = await fetchData(apiUrl + '/restaurants');
    console.log(restaurants);
    sortAlphabeticallyByName(restaurants);
    restaurants.forEach(addRestaurantToTable);
  } catch (error) {
    console.error(error.message);
  }
}

getRestaurants();
