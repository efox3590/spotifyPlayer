(function() { // protect the lemmings!


    const templateSource = document.getElementById('results-template').innerHTML,
      template = Handlebars.compile(templateSource),
      resultsPlaceholder = document.getElementById('results'),
      playingCssClass = 'playing';
     let audioObject = null;





// const fetchTracks = function (albumId, callback) {
//     $.ajax({
//         type: "GET",
//         url: 'https://api.spotify.com/v1/albums/' + albumId,

//          dataType: "json",

//         success: function (response) {
            
//             callback(response);

//         }
//     });
// };

const fetchTracks = function (albumId) {
    return $.ajax({
        url: 'https://api.spotify.com/v1/albums/' + albumId,
        dataType: "json",
    });
};

const searchAlbums = function (query) {
      $.ajax({
        type: "GET",
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'album'
        },
         dataType: "json",
        success: function (response) {
            resultsPlaceholder.innerHTML = template(response);
            console.log(response);
        }
    });
};

results.addEventListener('click', function (e) {
    const target = e.target;
    if (target !== null && target.classList.contains('cover')) {
        if (target.classList.contains(playingCssClass)) {
            audioObject.pause();
        } else {
            if (audioObject) {
                audioObject.pause();
            }

            // fetchTracks(target.getAttribute('data-album-id'), function (data) {
            //     audioObject = new Audio(data.tracks.items[0].preview_url);
            //     audioObject.play();
            //     target.classList.add(playingCssClass);
            //     audioObject.addEventListener('ended', function () {
            //         target.classList.remove(playingCssClass);
            //     });
            //     audioObject.addEventListener('pause', function () {
            //         target.classList.remove(playingCssClass);
            //     });
            // });

        fetchTracks(target.getAttribute('data-album-id'))
        .then(function (data) {
        audioObject = new Audio(data.tracks.items[0].preview_url);
        audioObject.play();
        target.classList.add(playingCssClass);
        audioObject.addEventListener('ended', function () {
            target.classList.remove(playingCssClass);
        });
        audioObject.addEventListener('pause', function () {
            target.classList.remove(playingCssClass);
        });
    });

        }
    }
});

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    searchAlbums(document.getElementById('query').value);
}, false);

})();