// This will add a podcast html element
function addPodcastDiv(title, author, date, episodeNumber, link, thumbnail, playerId) {
    // Create the HTML structure for the div
    var div = document.createElement("div");
    div.innerHTML = `
    <div class="d-block d-md-flex podcast-entry bg-white mb-5" data-aos="fade-up">
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
  </div>
    `;

    // Append the div to the desired container in the HTML
    var container = document.getElementById("all-episode");
    container.appendChild(div);
  }

function logPodcastData() {
    fetch('../data/podcast.json')
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          const podcast = data[i];
          addPodcastDiv(podcast.title, podcast.podcaster, podcast.date, podcast.episodeNumber, podcast.ytlink, podcast.thumbnail, i) 
        }
      })
      .catch(error => console.error('Error:', error));
  }
  
  logPodcastData();
