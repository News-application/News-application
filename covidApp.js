const covidApp = {};


covidApp.init = () => {
    covidApp.getCovidCases()
    covidApp.getCovidNewsData();
    covidApp.scrollNewsSection();
}


covidApp.getCovidCases = () => {

    fetch("https://api.covid19api.com/summary")
    .then(function (res) {
        return res.json();
    }).then(function (jsonResults) {
        // console.log(jsonResults.Countries);
        covidApp.displayCanadaCases(jsonResults.Countries);
    })
}




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

// covid-19 news section
covidApp.apiKey = 'SUxZDfFHk_7an43AS0COUpTWC6lPF_LGXB1UKdWS2iojoBNq';  

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
            console.log(data.news);
            covidApp.filterImgArray(data.news);
            covidApp.displayCovidNews(covidApp.filterImgArray);
        })
}
covidApp.filterImgArray = [];

covidApp.filterImgArray = (arrayData) => {
    covidApp.filterImgArray = arrayData.filter((listOfImg) => {
        return listOfImg = listOfImg.image !== "None"
        
    })

}

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
        buttonElement.appendChild(anchorElement);
        liElement.append(headerElement, imageElement, paraElement, buttonElement);

    })
}

covidApp.init();