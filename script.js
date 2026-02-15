const countryData = {
  "united states": {
    name: "United States",
    nukes: 5244,
    soldiers: 1328000,
    population: 333000000,
    carriers: 11,
    olympicMedals: 2980,
    gdp: 27360900000000,
    gdpPerCapita: 81695,
  },
  china: {
    name: "China",
    nukes: 500,
    soldiers: 2035000,
    population: 1412000000,
    carriers: 3,
    olympicMedals: 713,
    gdp: 17794700000000,
    gdpPerCapita: 12614,
  },
  russia: {
    name: "Russia",
    nukes: 5580,
    soldiers: 1150000,
    population: 146000000,
    carriers: 1,
    olympicMedals: 590,
    gdp: 2240400000000,
    gdpPerCapita: 15345,
  },
  "united kingdom": {
    name: "United Kingdom",
    nukes: 225,
    soldiers: 184000,
    population: 67800000,
    carriers: 2,
    olympicMedals: 964,
    gdp: 3340030000000,
    gdpPerCapita: 49040,
  },
  france: {
    name: "France",
    nukes: 290,
    soldiers: 203000,
    population: 68000000,
    carriers: 1,
    olympicMedals: 889,
    gdp: 3051832000000,
    gdpPerCapita: 44152,
  },
  india: {
    name: "India",
    nukes: 172,
    soldiers: 1455000,
    population: 1438000000,
    carriers: 2,
    olympicMedals: 41,
    gdp: 3573910000000,
    gdpPerCapita: 2485,
  },
  japan: {
    name: "Japan",
    nukes: 0,
    soldiers: 247000,
    population: 124500000,
    carriers: 0,
    olympicMedals: 497,
    gdp: 4212945000000,
    gdpPerCapita: 33834,
  },
};

const countryInput = document.getElementById("country-input");
const countryOptions = document.getElementById("country-options");
const scoreForm = document.getElementById("score-form");
const message = document.getElementById("message");
const result = document.getElementById("result");
const resultCountry = document.getElementById("result-country");
const resultScore = document.getElementById("result-score");
const resultBreakdown = document.getElementById("result-breakdown");

Object.values(countryData).forEach((country) => {
  const option = document.createElement("option");
  option.value = country.name;
  countryOptions.appendChild(option);
});

function calculateScore(country) {
  const components = {
    "nuke × 0.1": country.nukes * 0.1,
    "soldiers / population": country.soldiers / country.population,
    "aircraft carriers × 0.001": country.carriers * 0.001,
    "Olympic medals × 0.0001": country.olympicMedals * 0.0001,
    "GDP × 0.0000001": country.gdp * 0.00000001,
    "GDP per capita × 0.0001": country.gdpPerCapita * 0.0001,
  };

  const total = Object.values(components).reduce((sum, value) => sum + value, 0);

  return { components, total };
}

function renderResult(country, scoreData) {
  resultCountry.textContent = country.name;
  resultScore.textContent = scoreData.total.toFixed(4);

  resultBreakdown.innerHTML = "";
  Object.entries(scoreData.components).forEach(([label, value]) => {
    const item = document.createElement("li");
    item.textContent = `${label}: ${value.toFixed(6)}`;
    resultBreakdown.appendChild(item);
  });

  result.classList.remove("hidden");
}

scoreForm.addEventListener("submit", (event) => {
  event.preventDefault();
  message.textContent = "";

  const key = countryInput.value.trim().toLowerCase();

  if (!key) {
    result.classList.add("hidden");
    message.textContent = "Please enter a country name.";
    return;
  }

  const country = countryData[key];

  if (!country) {
    result.classList.add("hidden");
    message.textContent = `No data found for \"${countryInput.value.trim()}\".`;
    return;
  }

  const scoreData = calculateScore(country);
  renderResult(country, scoreData);
});
