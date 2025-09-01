const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img');
const countryNameH1 = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name');
const PopulationCount = document.querySelector('.Population');
const regionName = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capitalName = document.querySelector('.capital');
const topLevelDomain = document.querySelector('.top');
const currencies = document.querySelector('.Euro');
const languages = document.querySelector('.languages');
const borderCountries = document.querySelector('.border-countries')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    // console.log([country])
    flagImage.src = country.flags.svg
    countryNameH1.innerText = country.name.common;
    PopulationCount.innerText= country.population.toLocaleString('en-IN');
    regionName.innerText = country.region;
    // subRegion.innerText = country.subregion;
    // capitalName.innerText = country.capital;
    topLevelDomain.innerText = country.tld.join(', ')

    if(country.capital) {
        capitalName.innerText = country.capital;
    }

    if(country.subregion) {
        subRegion.innerText = country.subregion; 
    }

    if(country.name.nativeName) {
        // console.log(Object.values(country.name.nativeName)[0].common)
        nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    }else {
        nativeName.innerText = country.name.common
    }

    if(country.currencies) {
        currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ')
    }
    if(country.languages) {
        languages.innerText = Object.values(country.languages).join(', ')
    }

    if(country.borders) {
        country.borders.forEach((border) => {
            console.log(border);
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => {
                // console.log(borderCountry)
                const borderCountryTag = document.createElement('a')
                borderCountryTag.innerText = borderCountry.name.common
                borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                // console.log(borderCountryTag);
                borderCountries.append(borderCountryTag);
            })
        })
    }
  })