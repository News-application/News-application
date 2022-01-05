// pseudo codes
// -create globa variable\
// -create init function
// -call init function

// create getData function 
// fetch api to get data from server
// -check that are we getting dat back or not 
// -create parameters for required data
// - call printNews in getData function 
//  api key :   SUxZDfFHk_7an43AS0COUpTWC6lPF_LGXB1UKdWS2iojoBNq
// url :  https://api.currentsapi.services/v1/search


// create printNews function to print news on website

const newsApp = {};

newsApp.init = () =>{
    newsApp.getSearchNewsData();
}
newsApp.apiKey = 'SUxZDfFHk_7an43AS0COUpTWC6lPF_LGXB1UKdWS2iojoBNq';

newsApp.getSearchNewsData = () => {
    const url = new URL('https://api.currentsapi.services/v1/search');

    url.search = new URLSearchParams ({
        apiKey : newsApp.apiKey,
        keywords : "car"
    });

    fetch(url)
    .then((results) => {
        return results.json();
    })
    .then((data) => {
        // console.log(data.news);
        newsApp.displayNews(data.news);
    })
}

newsApp.displayNews = (listOfNews) => {
    const searchNewsContainer = document.querySelector('#user-search-news');

    listOfNews.forEach((newsData) => {

        const ulElement = document.createElement('ul');
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

        searchNewsContainer.appendChild(ulElement);
        ulElement.appendChild(liElement);
        buttonElement.appendChild(anchorElement);
        liElement.append(headerElement, imageElement, paraElement, buttonElement);



    })
}




newsApp.init();