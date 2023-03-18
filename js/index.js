/// <reference types="../@types/jquery" />

$(document).ready(function(){
    $(".loading").fadeOut(500)
    $("body").css("overflow", "auto")
})

let sideBarPosition = $(".sideBarNav-tab").innerWidth();
$(".side-meals").animate({left : -sideBarPosition},1000);
$(".btn-icon").removeClass("fa-x");
$(".btn-icon").addClass("fa-align-justify");

$(".side-meals .sideBar-header i").click(function(){
    console.log("hi" , $(".side-meals").css("left"));
    console.log(sideBarPosition);
    if ($(".side-meals").css("left") == "0px") {
        $(".side-meals").animate({ left : -sideBarPosition},500);
        $(".btn-icon").removeClass("fa-x");
        $(".btn-icon").addClass("fa-align-justify");
        $(".sideBar-links li").animate({top: 300}, 1000)
    } else {
        $(".side-meals").animate({left : "0px"},500);
        $(".btn-icon").removeClass("fa-align-justify");
        $(".btn-icon").addClass("fa-x");
        for (let i = 0; i < 5; i++) {
            $(".sideBar-links li").eq(i).animate({top: 0}, (i + 5) * 200)
        }
    }
})

let meals = document.querySelector("#meals");
let Category = document.querySelector("#Category");
let area = document.querySelector("#area");
let ingredient = document.querySelector("#ingredients");
let search = document.querySelector("#search");
let contact = document.querySelector("#contact");

// START meal

async function getMealData(){
    $(".loading").fadeIn(1)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    response = await response.json();
    console.log(response.meals);
    displayMealData(response.meals)
    $(".loading").fadeOut(500)
    $(".side-meals").animate({left : -sideBarPosition},500);
}
getMealData()

function displayMealData(atrr){
    let cartona =``
    for (var i = 0; i < atrr.length; i++){
        cartona+= `<div class="col-md-3">
        <div onclick="getMealDetails(${atrr[i].idMeal})" class="meal position-relative overflow-hidden rounded-2">
            <img src="${atrr[i].strMealThumb}" class="w-100" alt="">
            <div class="overlay position-absolute d-flex align-items-center text-black p-2">
                <h3>${atrr[i].strMeal}</h3>
            </div>
        </div>
    </div>`
    }
    meals.innerHTML = cartona;
    console.log(cartona);
}

// END meal

// START category

Category.addEventListener("click",function(e){
        console.log(e.target);
        let link = e.target.getAttribute("data-code")
        console.log(link);
        getCategoryData(link)
})

async function getCategoryData(link){
    $(".loading").fadeIn(1)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();
    console.log(response.categories);
    displayCategory(response.categories)
    $(".loading").fadeOut(500)
    $(".side-meals").animate({left : -sideBarPosition},500);
    $(".btn-icon").removeClass("fa-x");
    $(".btn-icon").addClass("fa-align-justify");
}

function displayCategory(atrr){
    let cartona =``
    for (var i = 0; i < atrr.length; i++){
        cartona+= `<div class="col-md-3">
        <div onclick="getCategoryMeals('${atrr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2">
            <img src="${atrr[i].strCategoryThumb}" class="w-100" alt="">
            <div class="overlay position-absolute text-center text-black">
                <h3>${atrr[i].strCategory}</h3>
                <p>${atrr[i].strCategoryDescription}</p>
            </div>
        </div>
    </div>`
    }
    meals.innerHTML = cartona;
    console.log(cartona);
}
// END category

// START AREA
area.addEventListener("click",function(e){
        console.log(e.target);
        let link = e.target.getAttribute("data-code")
        console.log(link);
        getareaData(link)
    })

async function getareaData(link){
    $(".loading").fadeIn(1)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list `);
    response = await response.json();
    console.log(response.meals);
    displayarea(response.meals)
    $(".loading").fadeOut(500)
    $(".side-meals").animate({left : -sideBarPosition},500);
    $(".btn-icon").removeClass("fa-x");
    $(".btn-icon").addClass("fa-align-justify");
}

function displayarea(atrr){
    let cartona =``
    for (var i = 0; i < atrr.length; i++){
        cartona+= `<div class="col-md-3">
        <div onclick="getAreaMeals('${atrr[i].strArea}')" class="text-center">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${atrr[i].strArea}</h3>
        </div>
        </div>`
    }
    meals.innerHTML = cartona;
    console.log(cartona);
}
// END AREA

// START ingredients
ingredient.addEventListener("click",function(e){
    console.log(e.target);
    let link = e.target.getAttribute("data-code")
    console.log(link);
    getIngredientData(link)
})

async function getIngredientData(link){
$(".loading").fadeIn(1)
let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
response = await response.json();
console.log(response.meals);
displayIngredient(response.meals.slice(0, 20));
$(".loading").fadeOut(500)
$(".side-meals").animate({left : -sideBarPosition},500);
$(".btn-icon").removeClass("fa-x");
$(".btn-icon").addClass("fa-align-justify");
}

function displayIngredient(atrr){
let cartona =``
for (var i = 0; i < atrr.length; i++){
    cartona+= `<div class="col-md-3">
    <div onclick="getIngredientsMeals('${atrr[i].strIngredient}')" class="rounded-2 text-center">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${atrr[i].strIngredient}</h3>
        <p>${atrr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
    </div>
</div>`
}
meals.innerHTML = cartona;
console.log(cartona);
}
// END ingredients

// START search and display data
let searchMeal = document.querySelector("#search-meal")

search.addEventListener("click",function(e){
        console.log(e.target);
        let code = e.target.getAttribute("data-code")
        console.log(code);
        displaySearch()
})

function displaySearch() {
        searchMeal.innerHTML = `
        <div class="row py-4 ">
            <div class="col-md-6 ">
                <input onkeyup="findByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="findFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
            </div>
        </div>`
        $(".side-meals").animate({left : -sideBarPosition},500);
        $(".btn-icon").removeClass("fa-x");
        $(".btn-icon").addClass("fa-align-justify");
        meals.innerHTML = ""
}
// START search with name
async function findByName(letter) {
    meals.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`)
    response = await response.json()
    response.meals ? displayMealData(response.meals) : displayMealData([])
}
// START search with firstLetter   
async function findFirstLetter(letter) {
    meals.innerHTML = ""
    letter == "" ? letter = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    response = await response.json()
    response.meals ? displayMealData(response.meals) : displayMealData([])
}
// END search and display data

// START contact
contact.addEventListener("click",function(e){
    console.log(e.target);
    let link = e.target.getAttribute("data-code")
    console.log(link);
    displaycontact()
})

function displaycontact(atrr){
    $(".loading").fadeIn(1)

    let cartona =``
        cartona += `<div class="mealContact vh-100">
    <div class="contain w-75 m-auto text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="inputName" onkeyup="validateInputName()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="alert-name" class="w-100 mt-2 alert-danger d-none rounded-2">
                    <p class=" text-center p-3">Special characters and numbers not allowed</p>
                </div>
            </div>
            <div class="col-md-6">
                <input id="inputEmail" onkeyup="validateInputEmail()" type="email" class="form-control" placeholder="Enter Your e-mail">
                <div id="alert-email" class="w-100 mt-2 alert-danger d-none rounded-2">
                    <p class=" text-center p-3">Email not valid</p>
                </div>
            </div>
            <div class="col-md-6">
                <input id="inputPhone" onkeyup="validateInputPhone()" type="text" class="form-control" placeholder="Enter Your phone">
                <div id="alert-phone" class="w-100 mt-2 alert-danger d-none rounded-2">
                    <p class=" text-center p-3">Enter valid phone number</p>
                </div>
            </div>
            <div class="col-md-6">
                <input id="inputAge" onkeyup="validateInputAge()" type="number" class="form-control" placeholder="Enter Your age">
                <div id="alert-age" class="w-100 mt-2 alert-danger d-none rounded-2">
                    <p class=" text-center p-3">Email valid age</p>
                </div>
            </div>
            <div class="col-md-6">
                <input id="inputPassword" onkeyup="validateInputPassword()" type="password" class="form-control" placeholder="Enter Your password">
                <div id="alert-password" class="w-100 mt-2 alert-danger d-none rounded-2">
                    <p class=" text-center p-3">Enter valid password *Minimum eight characters, at least one letter and one number</p>
                </div>
            </div>
            <div class="col-md-6">
                <input id="inputRepassword" onkeyup="validateInputRePassword()" type="password" class="form-control" placeholder="Repassword">
                <div id="alert-repassword" class="w-100 mt-2 alert-danger d-none rounded-2">
                    <p class=" text-center p-3">Enter valid repassword</p>
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>

    </div>
</div>`
    meals.innerHTML = cartona;
    $(".loading").fadeOut(500)
    $(".side-meals").animate({left : -sideBarPosition},500);
    $(".btn-icon").removeClass("fa-x");
    $(".btn-icon").addClass("fa-align-justify");
    console.log(cartona);
}
// END contact

// START meal details
async function getMealDetails(id){
    $(".loading").fadeIn(1)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    response = await response.json();
    displayMealDetails(response.meals[0])
    console.log(response.meals);
    $(".loading").fadeOut(500)
    $(".side-meals").animate({left : -sideBarPosition},500);
}
getMealDetails()

function displayMealDetails(meal) {
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    if (!tags) tags = []
    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let box = `
               <div class="col-md-4">
                    <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="">
                    <h2>${meal.strMeal}</h2>
                </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

            meals.innerHTML = box
}
// END meal details

// START category details
async function getCategoryMeals(category) {
    $(".loading").fadeIn(1)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMealData(response.meals.slice(0, 20))
    $(".loading").fadeOut(500)
    $(".side-meals").animate({left : -sideBarPosition},500);

}
// END category details

// START Area details
async function getAreaMeals(area) {
    $(".inner-loading").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMealData(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)
    $(".side-meals").animate({left : -sideBarPosition},500);
}
// End Area details

// START Ingredient details
async function getIngredientsMeals(ingredients) {
    $(".inner-loading").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    displayMealData(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300);
    $(".side-meals").animate({left : -sideBarPosition},500);
}
// END Ingredient details

//validation Input

let submitBtn = document.getElementById("submitBtn")

function validateInputName(){
    let inputName = document.getElementById("inputName").value
    console.log(inputName);
        var regex = /^[a-zA-Z ]+$/;
    if (regex.test(inputName) == true) {
        console.log(true);
        document.getElementById("alert-name").classList.replace("d-block", "d-none");
    } else {
        document.getElementById("alert-name").classList.replace("d-none", "d-block");
        console.log(false);
    }
}

function validateInputEmail(){
    let inputEmail = document.getElementById("inputEmail").value
    console.log(inputEmail);
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(inputEmail) == true) {
        console.log(true);
        document.getElementById("alert-email").classList.replace("d-block", "d-none");
    } else {
        document.getElementById("alert-email").classList.replace("d-none", "d-block");
        console.log(false);

    }
}

function validateInputPhone(){
    let inputPhone = document.getElementById("inputPhone").value
    console.log(inputPhone);
    var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (regex.test(inputPhone) == true) {
        console.log(true);
        document.getElementById("alert-phone").classList.replace("d-block", "d-none");
    } else {
        document.getElementById("alert-phone").classList.replace("d-none", "d-block");
        console.log(false);
    }
}

function validateInputAge(){
    let inputAge = document.getElementById("inputAge").value
    console.log(inputAge);
    var regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    if (regex.test(inputAge) == true) {
        console.log(true);
        document.getElementById("alert-age").classList.replace("d-block", "d-none");
    } else {
        document.getElementById("alert-age").classList.replace("d-none", "d-block");
        console.log(false);
    }
}

function validateInputPassword(){
    let inputPassword = document.getElementById("inputPassword").value
    console.log(inputPassword);
    var regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    if (regex.test(inputPassword) == true) {
        console.log(true);
        document.getElementById("alert-password").classList.replace("d-block", "d-none");
    } else {
        document.getElementById("alert-password").classList.replace("d-none", "d-block");
        console.log(false);
    }
}

function validateInputRePassword(){
    let inputPassword = document.getElementById("inputPassword").value
    let inputRepassword = document.getElementById("inputRepassword").value
    console.log(inputRepassword);
    var regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    if (regex.test(inputRepassword) == true) {
        if (inputRepassword == inputPassword) {
                console.log(true);
                document.getElementById("alert-repassword").classList.replace("d-block", "d-none");
                document.getElementById("submitBtn").disabled = false;
            }
    } else {
        document.getElementById("alert-repassword").classList.replace("d-none", "d-block");
        console.log(false);
    }
}






























// function dataInvaled(){
//     if (validateInputName() && validateInputEmail() && validateInputPhone() && validateInputAge()
//      && validateInputPassword() && validateInputRePassword()) {
//         document.getElementById("submitBtn").disabled = false;
//     } else {
//         document.getElementById("submitBtn").disabled = true;
//     }
// }


/*
START search and display data
let searchMeal = document.getElementById("search-meal");

search.addEventListener("click",function(e){
    console.log(e.target);
    let link = e.target.getAttribute("data-code")
    console.log(link);
    displaySearch()
})

function displaySearch(atrr){
    let cartona =``
        cartona += `<div class="col-md-6" id="search-meal">
        <input onkeyup="findByName(this.value)" type="text" class="form-control" placeholder="Search By Name">
    </div>
    <div class="col-md-6" id="search-meal">
        <input onkeyup="findFirstLetter(this.value)" type="text" class="form-control" maxlength="1" placeholder="Search By First Letter">
    </div>`
    meals.innerHTML = cartona;
    $(".side-meals").animate({left : -sideBarPosition},500);
    $(".btn-icon").removeClass("fa-x");
    $(".btn-icon").addClass("fa-align-justify");
    console.log(cartona);
}

START search with name
async function findByName(letter) {
    $(".inner-loading").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`)
    response = await response.json()
    response.meals ? displayMealData(response.meals) : displayMealData([])
    $(".inner-loading").fadeOut(300)

}
START search with firstLetter
async function findFirstLetter(letter) {
    $(".inner-loading").fadeIn(300)
    letter == "" ? letter = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    response = await response.json()
    response.meals ? displayMealData(response.meals) : displayMealData([])
    $(".inner-loading").fadeOut(300)
}
END search and display data
*/






