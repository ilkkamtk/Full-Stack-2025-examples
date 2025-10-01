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

export { restaurantRow };
