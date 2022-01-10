// name spacing object for covidApp
const covidApp = {};

// call init function
covidApp.init = () => {
    covidApp.getCovidCases()
    covidApp.getCovidNewsData();
    covidApp.scrollNewsSection();
}

// create function get covid data 
covidApp.getCovidCases = () => {

    fetch("https://api.covid19api.com/summary")
    .then(function (res) {
        return res.json();
    }).then(function (jsonResults) {
        covidApp.displayCanadaCases(jsonResults.Countries);
    })
}



// print covid data on website
covidApp.displayCanadaCases = (arrayData) => {
    const CovidCasesData = document.querySelector('.covid-cases-data')
    arrayData.forEach((listOfData) => {
        if (listOfData.Country === "Canada") {
            const ulElement = document.createElement('ul');

            ulElement.innerHTML = `
            <li> Country : <span> ${listOfData.Country}</span></li>
            <li> New Confirmed Cases : <span> ${listOfData.NewConfirmed}</span></li>
            <li> New deaths : <span> ${listOfData.NewDeaths}</span></li>
            <li> Total Deaths : <span> ${listOfData.TotalDeaths}</span></li>
            <li> Total Confirmed : <span> ${listOfData.TotalConfirmed}</span></li>
            `
            CovidCasesData.append(ulElement);

        }
    }) 
}


// =====================
// covid-19 news section
// =========================

// api key
covidApp.apiKey = 'SUxZDfFHk_7an43AS0COUpTWC6lPF_LGXB1UKdWS2iojoBNq';  

// create function tpo get covid news form api
covidApp.getCovidNewsData = () => {
    const url = new URL('https://api.currentsapi.services/v1/search');

    url.search = new URLSearchParams({
        apiKey: covidApp.apiKey,
        keywords: "covid",
        country : "CA"
    });

    fetch(url)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            covidApp.filterImgArray(data.news);
            covidApp.displayCovidNews(covidApp.filterImgArray);
        })
}

// create new array to filter none image object
covidApp.filterImgArray = [];

covidApp.filterImgArray = (arrayData) => {
    covidApp.filterImgArray = arrayData.filter((listOfImg) => {
        return listOfImg = listOfImg.image !== "None"    
    })
}

// create new function to scroll news section right and left
covidApp.scrollNewsSection = () => {
    const scrollingWindow = document.querySelector('#covid-news-box');
    const searchleftBtn = document.querySelector('.covid-left-btn');
    const searchRightBtn = document.querySelector('.covid-right-btn');

    searchleftBtn.addEventListener('click', () => {
        scrollingWindow.scrollLeft -= 300;
    })
    searchRightBtn.addEventListener('click', () => {
        scrollingWindow.scrollLeft += 300;
    })
}


// create print function to print news in website
covidApp.displayCovidNews = (listOfNews) => {
    const ulElement = document.querySelector('.list-of-covid-news');
    ulElement.innerHTML = " ";

    listOfNews.forEach((newsData) => {

        const liElement = document.createElement('li');
        const headerElement = document.createElement('h3');
        const imageElement = document.createElement('img');
        const paraElement = document.createElement('p');
        const buttonElement = document.createElement('button');
        const anchorElement = document.createElement('a');

        headerElement.innerHTML = newsData.title;
        imageElement.src = newsData.image;
        imageElement.alt = newsData.title;
        paraElement.innerHTML = newsData.description;
        anchorElement.href = newsData.url;
        anchorElement.innerHTML = 'Read more';
        anchorElement.target = '_blank';

        ulElement.appendChild(liElement);
        liElement.append(headerElement, imageElement, paraElement, anchorElement);

    })
}

// called init function
covidApp.init();