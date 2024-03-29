document.addEventListener('DOMContentLoaded', function (){
    const form = document.querySelector('.search-box');
    const input = document.querySelector('input[type="search"]');
    const resultBlock = document.querySelector('.result-block');
    const resultCounter = document.querySelector('header p');
    const moreButton = document.querySelector('.more');
    let currentResults = [];
    let wikiIndex = 0;

    form.addEventListener('submit', function (event){
        event.preventDefault();
        const searchTerm = input.value;
        if(searchTerm){
            searchWikipedia(searchTerm);
        }
    });

    function searchWikipedia(searchTerm) {
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=500&srsearch=${encodeURIComponent(searchTerm)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                currentResults = data.query.search;
                displayNextResults(); // Display the first 5 results
                if (currentResults.length > 5) {
                    moreButton.style.display = 'block'; // Show the More button if there are more results
                }
            })
            .catch(error => alert('Error : ' + error));
    }

    function displayNextResults() {
        const endIndex = Math.min(wikiIndex + 5, currentResults.length);
        const nextResults = currentResults.slice(wikiIndex, endIndex); // Get the next 5 results
        displayResultsWithDelay(nextResults, 1000); // Display results with a delay of 1 second
        wikiIndex += 5;
        if (wikiIndex >= currentResults.length) {
            moreButton.style.display = 'none'; // Hide the More button if there are no more results
        }
    }

    function displayResultsWithDelay(results, delay) {
        resultCounter.textContent = `Results Count: ${currentResults.length}`;
        results.forEach((result, resultIndex) => {
            setTimeout(() => {
                const resultElement = document.createElement('div');
                resultElement.className = 'result';
                resultElement.innerHTML = `
                    <h3>${result.title}</h3>
                    <p>${result.snippet}</p>
                    <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Read More</a>
                `;
                resultBlock.appendChild(resultElement);
                setTimeout(() => {
                    resultElement.classList.add('transition');
                }, 100)
            }, resultIndex * delay); // Set a delay for each result
        });
    }

    moreButton.addEventListener('click', function() {
        displayNextResults(); // Display the next 5 results when More button is clicked
    });
});
