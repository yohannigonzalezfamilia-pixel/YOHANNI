// Lista de consejos (adaptados a tu tema galáctico)
const tips = [
{ category: "Piel grasa", tip: "Usa limpiadores en gel para controlar el sebo.", details: "Prueba mascarillas de arcilla 1-2 veces por semana." },
{ category: "Piel seca", tip: "Hidrata con cremas con ácido hialurónico.", details: "Aplica protector solar diario." },
{ category: "Maquillaje natural", tip: "Usa una BB cream ligera para un look fresco.", details: "Combina con un gloss transparente." },
{ category: "Autoestima", tip: "Tu belleza interior brilla tanto como la exterior.", details: "Escribe algo que ames de ti cada día." },
{ category: "Cuidado de cabello", tip: "Usa aceites naturales como argán.", details: "Aplica en puntas para hidratar." }
];

// Cargar favoritos y consejos compartidos
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let sharedTips = JSON.parse(localStorage.getItem('sharedTips')) || [];

// Mostrar consejos en cards
function showTips(tipsToShow) {
const tipsContainer = document.getElementById('tipsContainer');
tipsContainer.innerHTML = '';
tipsToShow.forEach(tip => {
const tipDiv = document.createElement('div');
tipDiv.className = 'tip';
tipDiv.innerHTML = `
<h3>${tip.category}</h3>
<p><strong>Consejo:</strong> ${tip.tip}</p>
<p><small>${tip.details}</small></p>
<button onclick="addToFavorites('${tip.category}')">Agregar a Favoritos ✨</button>
`;
tipsContainer.appendChild(tipDiv);
});
}

// Mostrar favoritos
function showFavorites() {
const favoritesList = document.getElementById('favoritesList');
favoritesList.innerHTML = '';
favorites.forEach((fav, index) => {
const li = document.createElement('li');
li.className = 'favorite-item';
li.innerHTML = `
<h3>${fav.category}</h3>
<p>${fav.tip}</p>
<button onclick="removeFavorite(${index})">Eliminar 🌟</button>
`;
favoritesList.appendChild(li);
});
}

// Agregar a favoritos
function addToFavorites(category) {
const tip = tips.find(t => t.category === category);
if (tip && !favorites.some(f => f.category === category)) {
favorites.push(tip);
localStorage.setItem('favorites', JSON.stringify(favorites));
showFavorites();
}
}

// Eliminar favorito
function removeFavorite(index) {
favorites.splice(index, 1);
localStorage.setItem('favorites', JSON.stringify(favorites));
showFavorites();
}

// Formulario de compartir
const shareForm = document.getElementById('shareForm');
shareForm.addEventListener('submit', (e) => {
e.preventDefault();
const userTipInput = document.getElementById('userTip');
const userTip = userTipInput.value.trim();
if (userTip === '') {
alert('¡Envía un consejo estelar! No puede estar vacío. 🌟');
return;
}
sharedTips.push(userTip);
localStorage.setItem('sharedTips', JSON.stringify(sharedTips));
showSharedTips();
userTipInput.value = '';
});

// Mostrar consejos compartidos
function showSharedTips() {
const sharedTipsList = document.getElementById('sharedTipsList');
sharedTipsList.innerHTML = '';
sharedTips.forEach(tip => {
const li = document.createElement('li');
li.className = 'shared-tip';
li.innerHTML = `<p>💫 ${tip}</p>`;
sharedTipsList.appendChild(li);
});
}

// Búsqueda
document.getElementById('searchInput').addEventListener('input', (e) => {
const searchTerm = e.target.value.toLowerCase();
const filteredTips = tips.filter(tip =>
tip.category.toLowerCase().includes(searchTerm)
);
showTips(filteredTips);
});

// Iniciar
showTips(tips);
showFavorites();
showSharedTips();

