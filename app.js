const apiKey = "2a69e7b68f7ed5ad1e71be3d0f002ab4";
const appId = "6bd183ac";
const card = document.querySelector(".container");
const searchInputText = document.getElementById("search-input");
const food = {}        // empty object create

function getFood(food) {
    const foodApi = "https://api.edamam.com/search?q="+food+"&app_id="+appId+"&app_key="+apiKey;
    fetch(foodApi)
    .then((response) => {
        return response.json();  // json format
    })
     .then((data) => data.hits.length === 0 ? alert("Data Not Found!") : generateHTML(data.hits)); // we can use map only for arrays thats why we're sending hits array
}   
// console.log(food);               // console.log()

function generateHTML(results) {
    var generatedHTML = '';
    results.map(result => {
        generatedHTML += 
        `
        <div class="card">
            <div class='card-image'></div>
                <img src='${result.recipe.image}' profile image' class="profile-img">
                <h2 class="food-name">${result.recipe.label}</h2>
                <div class="details">
                    <p><b>Calories: </b>${result.recipe.calories.toFixed(2)}</p>
                    <p><b>Ingredients: </b>${result.recipe.ingredientLines}</p>
                    <p><b>Meal Type: </b>${result.recipe.mealType == null ? "No data found" : result.recipe.mealType}</p>
                </div>
        </div>
        `
    })
    card.innerHTML = generatedHTML;
}

function searchFood() {
    const foodName = searchInputText.value.trim();
    getFood(foodName);   // calling getFood() function 
}

const searchOnClick = document.getElementById("search-btn")
const searchOnEnter = document.querySelector(".meal-search-bar")

searchOnClick.addEventListener("click", (event) => searchFood());//calling serachFood() fun
searchOnEnter.addEventListener("keyup", (event) => {
    if (event.key == "Enter")  
      searchFood();
  });

