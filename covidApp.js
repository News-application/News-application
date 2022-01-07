const covidApp = {};


covidApp.init = () => {
    covidApp.getCovidCases()
}


covidApp.getCovidCases = () => {

    fetch("https://api.covid19api.com/summary")
        .then(function (res) {
            return res.json();
        }).then(function (jsonResults) {
            console.log(jsonResults.Countries);
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
covidApp.init();