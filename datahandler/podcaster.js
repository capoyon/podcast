function addPosition(position){
  var h4 = document.createElement("h4");
  h4.innerHTML = position;
  var container = document.getElementById("podcastPodcaster");
  container.appendChild(h4);
}

function addMemberDiv(picture, name, designation ) {
  // Create the HTML structure for the div
  var div = document.createElement("div");
  div.className = "carousel-item-right";
  div.setAttribute("data-aos", "fade-up");
  div.innerHTML = `
  <div class="col-md-3">
    <div class="video-card">
      <img src="${picture}" alt="Picture of ${name}">
      <h4>${name}</h4>
      <p>${designation}</p>
    </div>
  </div>
  `;

  // Append the div to the desired container in the HTML
  var container = document.getElementById("podcastPodcaster");
  container.appendChild(div);
}

function readPodcasterData() {
    fetch('../data/podcaster.json')
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          const position = data[i].position;
          const members = data[i].members;
          addPosition(position);
          for (let j = 0; j < members.length; j++) {
            addMemberDiv(members[j].photo, members[j].name, members[j].designation)
          }
        }
      })
      .catch(error => console.error('Error:', error));
  }

readPodcasterData();
