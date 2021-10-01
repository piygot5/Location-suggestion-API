# Location-suggestion-API

REST API endpoint that provides autocomplete suggestions for large cities.
The endpoint is exposed at /suggestions.
The partial (or complete) search term is passed as a query string parameter q.
The caller's location can optionally be supplied via query string parameters latitude and longitude to help improve relative scores.
</br>
</br>
The endpoint returns a JSON response with an array of scored suggested matches.
The suggestions are sorted by descending score.
Each suggestion has a score between 0 and 1 (inclusive) indicating confidence in the suggestion (1 is most confident).
Technology used: NodeJS and ExpressJS

Data is downloaded from https://raw.githubusercontent.com/keubikhq/backend-task/master/data/cities_canada-usa.tsv and saved in the data folder. Data downloading logic is written utils/dataDownload.js.
Location name similarity algorithm is written in utils/similarity.js based on Levenshtein distance. 
</br>
</br>
Latitude and longitude similarity is calculated using cosine similarity and is written in utils/similarity.js
The average of the above two similarities is stored as the score and suggestions are sorted by descending score. 
The pagination feature is also added to and 10 results per page is shown to the user at a time and it is used as “page” in the request URL which denotes page number. For example https://agile-garden-94943.herokuapp.com/suggestions?q=Londo&latitude=43.70011&longitude=-79.4163&page=2
