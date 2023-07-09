var totalPages;
var currentPage=1;

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function deleteAllPodcastandPages(){
  var container = document.getElementById("podcastEpisodes");
  var divsToDelete = container.querySelectorAll("#individual-episode");
  var pageToDelete = container.querySelectorAll("#page-numbers");
  divsToDelete.forEach(function(div) {
  div.remove();
  });
  pageToDelete.forEach(function(div) {
  div.remove();
});
}

function scrollToTopOfDiv() {
  var div = document.getElementById("podcastEpisodes");
  div.scrollIntoView({ behavior: "smooth" });
}
// Function to change the active page number
function changeActive(element) {
  currentPage = element.querySelector("a").innerText;
  deleteAllPodcastandPages();
  scrollToTopOfDiv();
  readPodcastData(currentPage);

  // var activePage = document.querySelector('.site-block-27 li.active');
  // readPodcastData(element.querySelector("a").innerText)
  // activePage.classList.remove('active');
  // element.classList.add('active');
}

// Function to decrement the active page number
function decrementActive() {
  scrollToTopOfDiv();
  var activePage = document.querySelector('.site-block-27 li.active');
  var previousPage = activePage.previousElementSibling;
  if (activePage.querySelector("a").innerText>1) {
    currentPage = previousPage.querySelector("a").innerText;
    deleteAllPodcastandPages();
    scrollToTopOfDiv();
    readPodcastData(currentPage);
  }
}

// Function to increment the active page number
function incrementActive() {
  scrollToTopOfDiv();
  var activePage = document.querySelector('.site-block-27 li.active');
  var nextPage = activePage.nextElementSibling;
  if (activePage.querySelector("a").innerText<totalPages) {
    currentPage = nextPage.querySelector("a").innerText;
    deleteAllPodcastandPages();
    scrollToTopOfDiv();
    readPodcastData(currentPage);
  }
}

// This will add a podcast html element
function addPodcastDiv(title, author, date, episodeNumber, link, thumbnail, playerId) {
  // Create the HTML structure for the div
  playerId = getRandomInteger(1, 100);
  console.log(playerId);
  var div = document.createElement("div");
  div.id = "individual-episode"
  div.className = "d-block d-md-flex podcast-entry bg-white mb-5";
  div.setAttribute("data-aos", "fade-up");
  div.innerHTML = `
    <div class="image" style="background-image: url('${thumbnail}'); margin: 20px, 0px, 20px, 20px;"></div>
    <div class="text">
      <h3 class="font-weight-light"><a href="single-post.html" style="color: #f6436d;">${title}</a></h3>
      <div class="text-white mb-3"><span class="text-black-opacity-05" style="color: black;"><small>By ${author} <span class="sep">/</span> ${date} <span class="sep">/</span> Episode #${episodeNumber}</small></span></div>
      <div class="player">
        <audio id="player${playerId}" preload="none" controls style="max-width: 100%">
          <source src="${link}" type="">
        </audio>
      </div>
    </div>
  `;

  // Append the div to the desired container in the HTML
  var container = document.getElementById("podcastEpisodes");
  container.appendChild(div);
}

// This will add a podcast page
function addPodcastPage() {
  var div = document.createElement("div");
  div.className = "container";
  div.id = "page-numbers";
  div.setAttribute("data-aos", "fade-up");
  var page = `
  <div class="container" data-aos="fade-up">
    <div class="row">
      <div class="col-md-12 text-center">
        <div class="site-block-27">
          <ul>
          <li><a class="icon-keyboard_arrow_left" onclick="decrementActive()"></a></li>
          `;
          for (var i = 1; i <= totalPages; i++) {
            if (i === parseInt(currentPage)) {
              page += `<li class="active" onclick="changeActive(this)"><a>${i}</a></li>`;
            } else {
              page += `<li onclick="changeActive(this)"><a>${i}</a></li>`;
            }
          }
  page += `  <li><a class="icon-keyboard_arrow_right" onclick="incrementActive()"></a></li>
        </ul>
        </div>
      </div>
    </div>
  </div>
  `;
  div.innerHTML = page;
  // Append the div to the desired container in the HTML
  var container = document.getElementById("podcastEpisodes");
  container.appendChild(div);
}


function readPodcastData(page) {
  fetch('../data/podcast.json')
    .then(response => response.json())
    .then(data => {
      var itemsPerPage = 3; // Number of podcast episodes per page
      totalPages = Math.ceil(data.length / itemsPerPage); // Calculate the total number of pages

      for (let i = itemsPerPage*page-itemsPerPage; i < itemsPerPage*page && i < data.length; i++) {
        const podcast = data[i];
        addPodcastDiv(podcast.title, podcast.podcaster, podcast.date, podcast.episodeNumber, podcast.ytlink, podcast.thumbnail, i);
      }
      addPodcastPage();
    })
    .catch(error => console.error('Error:', error));
}

readPodcastData(currentPage);


