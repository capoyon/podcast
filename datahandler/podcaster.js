function readPodcasterData() {
    fetch('../data/podcaster.json')
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          const podcast = data[i];
          addPodcastDiv(podcast.title, podcast.podcaster, podcast.date, podcast.episodeNumber, podcast.ytlink, podcast.thumbnail, i) 
        }
      })
      .catch(error => console.error('Error:', error));
  }
