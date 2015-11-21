#peerflix-subtitles

This project its a *module* for [VitorVRS/peerflix](http://github.com/VitorVRS/peerflix) that download subtitles for movie/series automatically.

##Usage:

```javascript

// torrent stream (used on peerflix)
engine.on('ready', function () {

  var peerflixSubtitle, mediaFile

  // torrent files
  // search for the largest one
  // (peerflix already do this)
  engine.files.forEach(function (file) {
    if (!mediaFile) {
      mediaFile = file
      return
    }

    if (mediaFile.length < file.length) {
      mediaFile = file
    }
  })

  // repass torrent-stream File to PeerflixSubtitle module
  peerflixSubtitle = new PeerflixSubtitle(mediaFile)
  // returns srt's path
  peerflixSubtitle.getSubtitleFile(function (filename) {
    console.log(filename)
  })
})

```
