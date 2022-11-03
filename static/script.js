
// stores the unordered list of search results
var searchList = document.getElementById('searchList');

// clear search results when the button is clicked
function clearSearchResults(){
    while(searchList.firstChild){
        searchList.removeChild(searchList.firstChild);
    }
}
document.getElementById('clearSearchResults').addEventListener('click', clearSearchResults); // clearing search results when clear button is pressed

// search by track name
function searchTrack(){
    var trackName = document.getElementById('searchTrackText').value;

    fetch('/api/trackNames/' + trackName)
    .then(res => res.json()
    .then(data => {

        searchList.appendChild(document.createTextNode('Tracks:'));
        searchList.appendChild(document.createElement('br'));
        searchList.appendChild(document.createTextNode(data));

    }));
}
document.getElementById('searchTrackBtn').addEventListener('click', clearSearchResults); // clearing search results when button is pressed
document.getElementById('searchTrackBtn').addEventListener('click', searchTrack); // searching by track name

// search by artist name
function searchArtist(){
    var artistName = document.getElementById('searchArtistText').value;

    fetch('/api/artistNames/' + artistName)
    .then(res => res.json()
    .then(data => {

        searchList.appendChild(document.createTextNode('Artists:'));
        searchList.appendChild(document.createElement('br'));
        searchList.appendChild(document.createTextNode(data))

    }));
}
document.getElementById('searchArtistBtn').addEventListener('click', clearSearchResults); // clearing search results when button is pressed
document.getElementById('searchArtistBtn').addEventListener('click', searchArtist); // searching by artist name

// search by album name
function searchAlbum(){
    var albumName = document.getElementById('searchAlbumText').value;

    fetch('/api/albumNames/' + albumName)
    .then(res => res.json()
    .then(data => {

        searchList.appendChild(document.createTextNode('Albums:'));
        searchList.appendChild(document.createElement('br'));
        searchList.appendChild(document.createTextNode(data))

    }));
}
document.getElementById('searchAlbumBtn').addEventListener('click', clearSearchResults); // clearing search results when button is pressed
document.getElementById('searchAlbumBtn').addEventListener('click', searchAlbum); // searching by album name



















