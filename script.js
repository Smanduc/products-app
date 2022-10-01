let products = [
  {
    title: 'Pills',
    calories: 100,
    price: 42,
    isExpired: false,
    category: 'Booster',
    fabricationYear: 2022,
    isFavorite: false,
  },
  {
    title: 'Protein Shake',
    calories: 2000,
    price: 20,
    isExpired: false,
    category: 'Supplement',
    fabricationYear: 2021,
    isFavorite: false,
  },
  {
    title: 'Pre-Workout',
    calories: 200,
    price: 15,
    isExpired: false,
    category: 'Supplement',
    fabricationYear: 2022,
    isFavorite: false,
  },
  {
    title: 'Recovery Powder',
    calories: 400,
    price: 40,
    isExpired: false,
    category: 'Recovery',
    fabricationYear: 2021,
    isFavorite: false,
  },
  {
    title: 'Ice Cream',
    calories: 3200,
    price: 32,
    isExpired: false,
    category: 'Dessert',
    fabricationYear: 2021,
    isFavorite: false,
  }
]

let titleInput = document.getElementById("title-input");
let categoryInput = document.getElementById("category-input");
let caloriesInput = document.getElementById("calorie-input");
let priceInput = document.getElementById("price-input");
let button = document.getElementById("create-button");
let totalPriceSpan = document.getElementById("total-price-span")
let tbody = document.getElementById("products-tbody")
let categoryFilterInput = document.getElementById("category-filter-input")
let categoryFilterButton = document.getElementById("filter-button")
let priceSortButton = document.getElementById("price-sort-button")
let totalCalorieSpan = document.getElementById("total-calorie-span")
let favProductsSpan = document.getElementById("fav-products-span")

// totalCalorieSpan.innerHTML = computeTotalCalories();
// favProductsSpan.innerHTML = getFavoriteProductsTitles();

function displayProducts() {
  tbody.innerHTML = ""
  for (let i = 0; i < products.length; i++) {
    insertProductInTable(products[i])
  }
  totalCalorieSpan.innerHTML = computeTotalCalories();
  totalPriceSpan.innerHTML = computeTotalPrice();
  favProductsSpan.innerHTML = getFavoriteProductsTitles();
} 

function computeTotalPrice() {
  let sum = 0;
  for (let i = 0; i < products.length; i++) {
    sum += products[i].price;
  }
  return sum;
}

function insertProductInTable(product) {
  // let tbody = document.getElementById("products-tbody")
  let newRow = document.createElement("tr") // prin variabila newRow se creaza un nou tr

  let newTitleTd = document.createElement("td") // td
  newTitleTd.innerHTML = product.title
  newRow.appendChild(newTitleTd)

  let newCategoryTd = document.createElement("td") // td
  newCategoryTd.innerHTML = product.category
  newRow.appendChild(newCategoryTd)

  let newCalorieTd = document.createElement("td") // td
  newCalorieTd.innerHTML = product.calories
  newRow.appendChild(newCalorieTd)

  let newPriceTd = document.createElement("td") // td
  newPriceTd.innerHTML = product.price
  newRow.appendChild(newPriceTd)

  let deleteTd = document.createElement("td")
  deleteTd.innerHTML = `<button onclick = deleteProduct(this)>Delete</button>`
  newRow.appendChild(deleteTd)

  let favoriteTd = document.createElement("td");
  // if (product.isFavorite == true) {
  if (product.isFavorite) {
    favoriteTd.innerHTML = `<button class="favorite-button" onclick = markFavoriteProduct(this)>Delete Favorite</button>`;
  }
  else {
    favoriteTd.innerHTML = `<button class="notfavorite-button" onclick = markFavoriteProduct(this)>Add Favorite</button>`;
  }
  newRow.appendChild(favoriteTd);

  tbody.appendChild(newRow);

  // tbody.appendChild(newRow);
}

function markFavorite(buttonElem) {

}

displayProducts()

function addProduct() {
  let product = {};
  product.title = titleInput.value;
  product.category = categoryInput.value;
  product.calories = caloriesInput.value;
  product.price = priceInput.value;

  products[products.length] = product;

  insertProductInTable(product);
}

function filterProducts() {
  // let filter = []
  tbody.innerHTML = ""
  for (let i = 0; i < products.length; i++) {
    if (products[i].category == categoryFilterInput.value) {
      insertProductInTable(products[i])
    }
  }
}

categoryFilterButton.addEventListener("click", filterProducts)

button.addEventListener("click", addProduct)

function sortProductsByPrice() {
  products.sort(sortByPrice)
  displayProducts()
  // for (let i=0; i< products.length; i++) {
  //   if (products[i].category ===)
}

function sortByPrice(prod1, prod2) {
  if (prod1.price < prod2.price) {
    return -1
  }
  if (prod1.price > prod2.price) {
    return 1
  }
  return 0;
}

priceSortButton.addEventListener("click", sortProductsByPrice)

function deleteProduct(buttonElem) { //cand apasam butonul se sterge produsul din tabel
  let trow = buttonElem.parentNode.parentNode
  let productTitle = trow.cells[0].innerHTML;
  tbody.removeChild(trow)
  let productIndex = getProductIndexByTitle(productTitle)
  removeProduct(productIndex);
}

function removeProduct(productIndex) {  //trebuie aflat indexul pe care era produsul sters mai sus din tabel. Indexul il aflam prin apelarea functiei getProductInd...
  for (let i = productIndex; i < products.length - 1; i++) {
    products[i] = products[i + 1]
  }
  products.length--
}

function markFavoriteProduct(buttonElem) {
  let tr = buttonElem.parentNode.parentNode;
  //luam titlul produsului din randul pe care s-a apasat but de fav (luam valoarea primei celule din randul din tabel tr)
  let productTitle = tr.cells[0].innerHTML;
  //cautam produs dupa titlul luat din tabel
  let productIndex = getProductIndexByTitle(productTitle)  //let product = getProductIndexByTitle(productTitle)
  // if (products[productIndex].isFavorite === true) {
  //   products[productIndex].isFavorite = false;
  // }
  // else {
  //   products[productIndex].isFavorite = true) 
  // }
  console.log(products[productIndex])
  products[productIndex].isFavorite = !products[productIndex].isFavorite
  displayProducts();
  // tbody.Child(tr)
}
// "1" == 1true.. daca e "1" === 1 e false ca verifica si tipul string sau nr sau etc

// function getProductByTitle(productTitle) {
//   for(let i = 0; i<products.length; i++) {
//     if (products[i].title === productTitle)
//       return products[i];
//   }
// }

function getProductIndexByTitle(productTitle) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].title === productTitle)
      return i;
  }
}


function computeTotalCalories() {
  let sum = 0;
  for (let i = 0; i < products.length; i++) {
    sum += products[i].calories;
  }
  return sum;
}

function getFavoriteProductsTitles() {
  let titles = []
  j = 0;
  for (let i = 0; i < products.length; i++) {
    if (products[i].isFavorite == true) {
      titles[j++] = products[i].title
    }
  }
  return titles;
}
// let titles = getFavoriteProductsTitles

displayProducts()


