async function searchCountry() {
    const countryName = document.getElementById('country-name').value;
    const response = await
        axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
        
    if (response.data.length > 0) {
        const country = response.data[0];
        const countryInfo = `
            <h2>${country.name.common}</h2>
            <p>Capital: ${country.capital[0]}</p>
            <p>Population: ${country.population}</p>
            <p>Area: ${country.area}</p>
            <p>Timezones: ${country.timezones.join(', ')}</p>
            `;

        const region = country.region;
        const similarCountries = await
            axios.get(`https://restcountries.com/v3.1/region/${region}`);
    
    const similarCountriesList = `
        <h3>Countries in the same region</h3>
            <ul>
            ${similarCountries.data.map(country => `<li>
                ${country.name.common}</li>`).join('')}
            </ul>
            `;

        document.getElementById('country-info').innerHTML = countryInfo;
        document.getElementById('similar-countries').innerHTML = 
            similarCountriesList;
    } else {
        document.getElementById('country-info').innerHTML =
            '<p>No country found</p>';
        document.getElementById('similar-countries').innerHTML = '';
    }
}