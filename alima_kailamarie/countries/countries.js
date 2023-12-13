async function searchCountry() {
const countryInput = document.getElementById('countryInput').value;
        
const countryResponse = await 
    fetch(`https://restcountries.com/v3.1/name/${countryInput}`);
const countryData = await countryResponse.json();
        
if (countryData.length > 0) {
    const countryDetails = document.getElementById('countryDetails');
    countryDetails.innerHTML = `<h2>${countryData[0].name.common}</h2>
                                <p>Region: ${countryData[0].region}</p>
                                <p>Capital: ${countryData[0].capital}</p>
                                <p>Population: ${countryData[0].population}</p>
                                <p>Area: ${countryData[0].area} sq km</p>
                                <p>Language: ${Object.values(countryData[0]
                                    .languages).join(', ')}</p>`;
            
const regionResponse = await 
    fetch(`https://restcountries.com/v3.1/region/${countryData[0].region}`);
const regionData = await regionResponse.json();
            
const countriesInRegion = document.getElementById('countriesInRegion');
countriesInRegion.innerHTML = '<h2>Other Countries in the Same Region</h2>';
            
regionData.forEach(country => {
    if (country.name.common !== countryData[0].name.common) {
        countriesInRegion.innerHTML += `<p>${country.name.common}</p>`;
    }
    });
    } else {
        alert('Country not found. Please enter a valid country name.');
    }
}