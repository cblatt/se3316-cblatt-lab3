
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

        searchList.appendChild(document.createTextNode('Tracks matching ' + trackName + ':'));
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

        searchList.appendChild(document.createTextNode('Artists matching ' + artistName + ':'));
        searchList.appendChild(document.createElement('br'));
        searchList.appendChild(document.createTextNode(data));

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

        searchList.appendChild(document.createTextNode('Albums matching ' + albumName + ':'));
        searchList.appendChild(document.createElement('br'));
        searchList.appendChild(document.createTextNode(data));

    }));
}
document.getElementById('searchAlbumBtn').addEventListener('click', clearSearchResults); // clearing search results when button is pressed
document.getElementById('searchAlbumBtn').addEventListener('click', searchAlbum); // searching by album name

// get all available genre names, IDs, and parent IDs
function getGenres(){
    fetch('/api/genreDetails')
    .then(res => res.json()
    .then(data => {
        searchList.appendChild(document.createTextNode('All available genre names, IDs, and parent IDs:'));
        searchList.appendChild(document.createElement('br'));
        searchList.appendChild(document.createTextNode(data));
    }))
}
document.getElementById('genreDetailsBtn').addEventListener('click', clearSearchResults); // clearing search results when button is pressed
document.getElementById('genreDetailsBtn').addEventListener('click', getGenres); // getting genre details

// get artist details by artist ID
function getArtistDetails(){
    var artistID = document.getElementById('artistDetailsTextField').value;

    fetch('/api/artistDetails/' + artistID)
    .then(res => res.json()
    .then(data => {

        searchList.appendChild(document.createTextNode('Artist details for artist ID ' + artistID + ':'));
        searchList.appendChild(document.createElement('br'));
        searchList.appendChild(document.createTextNode(data));

    }))
}
document.getElementById('artistDetailsBtn').addEventListener('click', clearSearchResults); // clearing search results when button is pressed
document.getElementById('artistDetailsBtn').addEventListener('click', getArtistDetails); // getting artist details for given artist ID

// get artist IDs by artist name
function getArtistIDs(){
    var artistName = document.getElementById('artistIDsTextField').value;

    fetch('/api/artistIDs/' + artistName)
    .then(res => res.json()
    .then(data => {

        searchList.appendChild(document.createTextNode('Artist IDs matching artist name ' + artistName + ':'));
        searchList.appendChild(document.createElement('br'));
        searchList.appendChild(document.createTextNode(data));
    }))
}
document.getElementById('artistIDsBtn').addEventListener('click', clearSearchResults); // clearing search results when button is pressed
document.getElementById('artistIDsBtn').addEventListener('click', getArtistIDs); // getting artist IDs for given artist name

// get track details by track ID
function getTrackDetails(){
    var trackID = document.getElementById('trackDetailsTextField').value;

    fetch('/api/trackDetails/' + trackID)
    .then(res => res.json()
    .then(data => {

        searchList.appendChild(document.createTextNode('Track details for track ID ' + trackID + ':'));
        searchList.appendChild(document.createElement('br'));
        searchList.appendChild(document.createTextNode(data));
    }))
}
document.getElementById('trackDetailsBtn').addEventListener('click', clearSearchResults); // clearing search results when button is pressed
document.getElementById('trackDetailsBtn').addEventListener('click', getTrackDetails); // getting track detais for given track ID

// get first 30 track IDs for given track title or album
function getTrackIDs(){
    var trackOrAlbum = document.getElementById('trackIDsTextField').value;

    fetch('/api/trackIDs/' + trackOrAlbum)
    .then(res => res.json()
    .then(data => {

        searchList.appendChild(document.createTextNode('Track IDs matching track title or album name ' + trackOrAlbum + ':'));
        searchList.appendChild(document.createElement('br'));
        searchList.appendChild(document.createTextNode(data));
    }))
}
document.getElementById('trackIDsBtn').addEventListener('click', clearSearchResults); // clearing search results when button is pressed
document.getElementById('trackIDsBtn').addEventListener('click', getTrackIDs); // getting first 30 track IDs for given track title or album



// FOR ALL THE ABOVE FUNCTIONS, NEED TO MAKE IT SO THAT IT DISPLAYS '... NOT FOUND' WHEN YOUR INPUT IS NOT FOUND
// RIGHT NOW IT DOES NOT DISPLAY ANYTHING






















