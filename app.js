$(function() {

    const render = function (NYTData) {
  
      // Get from the form the number of results to display
      // API doesn't have a 'limit' parameter, so we have to do this ourselves
      const numArticles = $('#article-count').val();
      const articles = NYTData.response.docs.slice(0, numArticles);
  
      articles.forEach(function(article) {
  
        // Append the article
        $('#article-section').append(buildArticle(article));
      });
    }
  
    const buildArticle = function(article) {
  
      // Create the  list group to contain the articles and add the article content for each
      const articleList = $('<ul>');
  
      // If the article has a headline, log and append to $articleList
      const headline = article.headline;
  
      const articleListItem = $('<li>')
  
      if (headline && headline.main) {
        console.log(headline.main);
        articleListItem.append(
          $('<h3>')
            .text(headline.main)
        );
      }
  
      // If the article has a byline, log and append to $articleList
      const byline = article.byline;
  
      if (byline && byline.original) {
        articleListItem.append($('<h5>').text(byline.original));
      }
  
      // Log section, and append to document if exists
      const section = article.section_name;
  
      if (section) {
        articleListItem.append($('<h5>').text(`Section: ${section}`));
      }
  
      // Log published date, and append to document if exists
      const pubDate = article.pub_date;
  
      if (pubDate) {
        articleListItem.append($('<p>').text(formatDate(article.pub_date)));
      }
  
      const articleLink = $('<a>')
        .attr('href', article.web_url)
        .attr('target', '_blank');
  
      articleLink.append(articleListItem)
  
      return articleLink;
    }
  
    const formatDate = function(date) {
      const months = [
        'January', 
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
  
      // Create a new JavaScript Date object from the passed in date
      const dateObj = new Date(date);
  
      // return the date as a string in format 'Month DD, YYYY'
      return `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`
    }
  
    const search = function (event) {
  
      // This line allows us to take advantage of the HTML 'submit' property
      // This way we can hit enter on the keyboard and it registers the search
      // (in addition to clicks). Prevents the page from reloading on form submit.
      event.preventDefault();
  
      // Empty the region associated with the articles
      clear();
  
      // Build the query URL for the ajax request to the NYT API
      const queryURL = buildQueryURL();
  
      // Make the AJAX request to the API - GETs the JSON data at the queryURL.
      // The data then gets passed as an argument to the render function
      $.ajax({
        url: queryURL,
        method: 'GET'
      }).then(render);
    }
  
    const buildQueryURL = function () {
    
      // queryURL is the url we'll use to query the API
      let queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
  
      // Begin building an object to contain our API call's query parameters
      // Set the API key
      const queryParams = { 'api-key': 'b9f91d369ff59547cd47b931d8cbc56b:0:74623931' };
  
      // Grab text the user typed into the search input, add to the queryParams object
      queryParams.q = $('#search-term')
        .val()
        .trim();
  
      // If the user provides a startYear, include it in the queryParams object
      const startYear = $('#start-year')
        .val()
        .trim();
  
      if (parseInt(startYear)) {
        queryParams.begin_date = `${startYear}0101`;
      }
  
      // If the user provides an endYear, include it in the queryParams object
      const endYear = $('#end-year')
        .val()
        .trim();
  
      if (parseInt(endYear)) {
        queryParams.end_date = `${endYear}0101`;
      }
  
      // Logging the URL so we have access to it for troubleshooting
      console.log('---------------\nURL: ' + queryURL + '\n---------------');
      console.log(queryURL + $.param(queryParams));
      return queryURL + $.param(queryParams);
    }
  
    // Function to empty out the articles
    const clear = function () {
      $('#article-section').empty();
    }
  
    // CLICK HANDLERS
    // ==========================================================
  
    // .on('click') function associated with the Search Button
    $('#run-search').on('click', search);
  
    //  .on('click') function associated with the clear button
    $('#clear-all').on('click', clear);
  });
  