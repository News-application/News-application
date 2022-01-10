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


// name spacing object
const newsApp = {};

// init function
newsApp.init = () =>{
    newsApp.getUserInput();
    newsApp.scrollNewsSection();
}

newsApp.filteredArray = [];

newsApp.filterImgArray = (arrayData) => {
    newsApp.filteredArray =  arrayData.filter((listOfImg) => {
        return listOfImg = listOfImg.image !== "None";
    })
    
}

// api key
newsApp.apiKey = 'SUxZDfFHk_7an43AS0COUpTWC6lPF_LGXB1UKdWS2iojoBNq';

//create function to get data from api 
newsApp.getSearchNewsData = (userSearch) => {
    const url = new URL('https://api.currentsapi.services/v1/search');

    url.search = new URLSearchParams ({
        apiKey : newsApp.apiKey,
        keywords : userSearch 
    });

    fetch(url)
    .then((results) => {
        return results.json();
    })
    .then((data) => {
        console.log(data.news);
        newsApp.filterImgArray(data.news);
        newsApp.displayNews(newsApp.filteredArray);
        newsApp.invalidInputMsg(newsApp.filteredArray);
    })
}


// create new array to filter none image object

// create function to show invalid input message to user.
newsApp.invalidInputMsg = (array) => {
    const invalidMsg = document.querySelector('#invalid-search-msg');
    console.log(array.length);
    if (array.length < 1) {
        invalidMsg.classList.remove('hide');
    }
}

// create function to print news on website
newsApp.displayNews = (listOfNews) => {
    const ulElement = document.querySelector('.list-of-news');
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

// create function to add feature on left and right button to scroll news section
newsApp.scrollNewsSection = () => {
    const scrollingWindow = document.querySelector('#user-search-news-box');
    const searchleftBtn = document.querySelector('.search-left-btn');
    const searchRightBtn = document.querySelector('.search-right-btn');

    searchleftBtn.addEventListener('click' , () => {
        scrollingWindow.scrollLeft -= 300;
    })
    searchRightBtn.addEventListener('click' , () => {
        scrollingWindow.scrollLeft += 300;
    })
}

newsApp.getSearchNewsData('world');

// submit event to store user input and give argumnet to fetch fuunction
newsApp.getUserInput = () => {
    const form = document.querySelector('#home-form')
    const searchOutput = document.querySelector('.search-output');
    form.addEventListener('submit', (e) => {
        const userInput = document.querySelector('.search-input').value;
        searchOutput.innerHTML = userInput;
        newsApp.getSearchNewsData(userInput);
        e.preventDefault();
        document.querySelector('.search-input').value = '';        
    })
}

//  called init function
newsApp.init();