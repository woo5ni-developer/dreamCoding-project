//fetch the items from the Json file
const loadItems = () => {
  return fetch('data/data.json')
  .then((response) => response.json())
  .then((json) => json.items);
}

//async awit함수
// const loadItems = async () => {
//   const response = await fetch('data/data.json');
//   const json = await response.json();
//   return json.items;
// }

//Update the list with the given items
const displayItems = (items) => {
  const container = document.querySelector('.items');
  container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

//create HTML list itme from the given data item
const createHTMLString = (item) => {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

const onButtonClick = (event, items) => {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  //필터링 정보가 없는 버튼
  if(key === null || value === null ){
    return;
  }

  displayItems(items.filter(item => item[key] === value));
}

const setEventListeners = (items) => {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => {
    displayItems(items);
  })
  buttons.addEventListener('click', (event) => {
    onButtonClick(event, items)
  })
}


//큰 틀을 잡고, 하나씩 함수를 만들어가보자!
loadItems()
.then(items => {
  displayItems(items);
  setEventListeners(items);
})
.catch(console.log)
