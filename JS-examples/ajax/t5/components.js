const restaurantRow = (restaurant) => {
  const { name, address, company } = restaurant;
  const tr = document.createElement('tr');
  const tdName = document.createElement('td');
  const tdAddress = document.createElement('td');
  const tdCompany = document.createElement('td');

  tdName.innerText = name;
  tdAddress.innerText = address;
  tdCompany.innerText = company;

  tr.append(tdName, tdAddress, tdCompany);
  return tr;
};

const restaurantModal = (restaurant, googleMaps) => {
  const { name, address, postalCode, city, phone, company } = restaurant;
  let restaurantHtml = `
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
  `;

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

  return restaurantHtml + coursesHtml;
};

export { restaurantRow, restaurantModal };
