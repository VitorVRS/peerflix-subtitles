var Hash = require('./hash')
var OpenSubtitles = require('opensubtitles-api')
var fs = require('fs')
var http = require('http')

var OS_UserAgent = 'OSTestUserAgent'
var OS_LanguageId = 'pob'
var OS_LanguageKey = 'pb'

var PeerflixSubtitle = function (mediaFile) {
  this.hash = new Hash(mediaFile)
};

(function () {
  PeerflixSubtitle.prototype.getSubtitleFile = function (callback) {
    this.hash.generate(function (hashText) {
      downloadSubtitles(hashText, callback)
    })
  }

  var downloadSubtitles = function (hashText, callback) {
    var openSubtitlesService = new OpenSubtitles(OS_UserAgent)

    openSubtitlesService.search({
        sublanguageid: OS_LanguageId,
        extensions: ['srt'],
        hash: hashText
    }).then(function (subtitles) {
      if (!subtitles[OS_LanguageKey]) throw new Error('OS_LanguageKey: ' + OS_LanguageKey + ' not found')

      var subtitleFilename = '/tmp/' + hashText + '.srt'

      var file = fs.createWriteStream(subtitleFilename)
      http.get(subtitles[OS_LanguageKey].url, function (response) {
        console.log(response.statusCode)
        response.pipe(file)
        file.on('finish', function () {
          callback(subtitleFilename)
        })
      })
    }).catch(function (err) {
      console.error('Could not download subtitles: ', err.message)
      callback(null)
    })
  }
})()

module.exports = PeerflixSubtitle
