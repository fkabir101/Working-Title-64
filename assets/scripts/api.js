var player;
var imageUrl;

// function to create embeded video
function createYoutube(divId, videoId) {
  player = new YT.Player(String(divId), {
    height: '390',
    width: '640',
    videoId: videoId,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  // The API will call this function when the video player is ready Required for youtube player
  function onPlayerReady(event) {
    event.target.stopVideo();
  }


  // variable and function to handle the youtube player
  var done = false;

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  }

  function stopVideo() {
    player.stopVideo();
  }
}

// Twitter stuff
function createTweet(id, status) {
  var tweet = document.getElementById(String(id));
  var tweetId = status;

  twttr.widgets.createTweet(
    tweetId, tweet, {
      conversation: 'none', // or all
      cards: 'hidden', // or visible 
      linkColor: '#cc0000', // default is blue
      theme: 'dark' // or dark
    });
}

// Giphy Api call
function getGiph(search, index) {
  var queryUrl =  `https://api.giphy.com/v1/gifs/search?q=${search}
  &api_key=ra70xorxvoPiBArlJQBpj3SmfmXSw2sX&limit=1`;
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    var imageUrl = response.data[0].images.fixed_height.url;;
    var image = $("<img>");
    image.attr("src", imageUrl);
    $(`#${index}`).prepend(image);
  });
}