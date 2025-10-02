const createRecipeCard = (recipe) => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('main_recommendations-item');
    recipeCard.innerHTML = `
        <img class="recipe_image" src="${recipe.strMealThumb}" alt="Recipe Image">
        <h3 class="recipe_info-title">${recipe.strMeal}</h3>
        <div class="recipe_info">
            <button class="recipe_info-button">View Recipe</button>
        </div>
    `;
    const viewButton = recipeCard.querySelector('.recipe_info-button');
    viewButton.addEventListener('click', () => {
        if (recipe.strYoutube) {
            window.open(recipe.strYoutube, '_blank');
        } else {
            alert('No hay video disponible para esta receta.');
        }
    })
    return recipeCard;
}

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el contenedor principal del HTML
    const mainContainer = document.getElementById('recipeContainer');
    mainContainer.innerHTML = ''; // Limpia el contenido inicial

    for (let i = 0; i < 5; i++) {
        // Crea un contenedor individual para cada receta
        const recipeSpace = document.createElement('div');
        recipeSpace.classList.add('recipeSpace');
        mainContainer.appendChild(recipeSpace);

        axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => {
            const recipe = res.data.meals[0];
            const recipeCard = createRecipeCard(recipe);
            recipeSpace.appendChild(recipeCard);
        })
        .catch(err => {
            console.error(err);
        });
    }
});

const searchRecipe = async () => {
    const recipeName = document.getElementById('searchInput').value.toLowerCase();
    if (recipeName) {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`);
            const meals = response.data.meals;
            if (meals) {
                const mainContainer = document.getElementById('recipeContainer');
                mainContainer.innerHTML = '';
                const recipe = createRecipeCard(meals[0]);
                mainContainer.appendChild(recipe);
            } else {
                alert('No se encontraron recetas.');
            }
        } catch (error) {
            console.error(error);
        }
    }
}
document.getElementById('searchButton').addEventListener('click', searchRecipe);
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchRecipe();
    }
});