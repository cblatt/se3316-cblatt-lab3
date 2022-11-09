
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
    .then(res => res.text() // gets response as a string
    .then(data => {

        dataArr = data.split(';'); // splitting string response into an array

        searchList.appendChild(document.createTextNode('Tracks matching ' + trackName + ':'));
        searchList.appendChild(document.createElement('br'));
        
        for(var i=0; i<dataArr.length; i++){ // adding each track to the search list and skipping lines between tracks
            searchList.appendChild(document.createTextNode(dataArr[i]));
            searchList.appendChild(document.createElement('br'));
        }

    }));
}
document.getElementById('searchTrackBtn').addEventListener('click', clearSearchResults); // clearing search results when button is pressed
document.getElementById('searchTrackBtn').addEventListener('click', searchTrack); // searching by track name

// search by artist name
function searchArtist(){
    var artistName = document.getElementById('searchArtistText').value;

    fetch('/api/artistNames/' + artistName)
    .then(res => res.text()
    .then(data => {

        dataArr = data.split(';'); // splitting string response into an array

        searchList.appendChild(document.createTextNode('Artists matching ' + artistName + ':'));
        searchList.appendChild(document.createElement('br'));
        
        for(var i=0; i<dataArr.length; i++){ // adding each artist to the search list and skipping lines between artists
            searchList.appendChild(document.createTextNode(dataArr[i]));
            searchList.appendChild(document.createElement('br'));
        }

    }));
}
document.getElementById('searchArtistBtn').addEventListener('click', clearSearchResults); // clearing search results when button is pressed
document.getElementById('searchArtistBtn').addEventListener('click', searchArtist); // searching by artist name

// search by album name
function searchAlbum(){
    var albumName = document.getElementById('searchAlbumText').value;

    fetch('/api/albumNames/' + albumName)
    .then(res => res.text()
    .then(data => {

        dataArr = data.split(';'); // splitting string response into an array

        searchList.appendChild(document.createTextNode('Albums matching ' + albumName + ':'));
        searchList.appendChild(document.createElement('br'));
        
        for(var i=0; i<dataArr.length; i++){ // adding each album to the search list and skipping lines between albums
            searchList.appendChild(document.createTextNode(dataArr[i]));
            searchList.appendChild(document.createElement('br'));
        }

    }));
}
document.getElementById('searchAlbumBtn').addEventListener('click', clearSearchResults); // clearing search results when button is pressed
document.getElementById('searchAlbumBtn').addEventListener('click', searchAlbum); // searching by album name

// get all available genre names, IDs, and parent IDs
function getGenres(){
    fetch('/api/genreDetails')
    .then(res => res.text()
    .then(data => {

        dataArr = data.split(';')

        searchList.appendChild(document.createTextNode('All available genre names, IDs, and parent IDs:'));
        searchList.appendChild(document.createElement('br'));

        for(var i=0; i<dataArr.length; i++){ // adding each genre to the search list and skipping lines between genres
            searchList.appendChild(document.createTextNode(dataArr[i]));
            searchList.appendChild(document.createElement('br'));
        }
    }))
}
document.getElementById('genreDetailsBtn').addEventListener('click', clearSearchResults); // clearing search results when button is pressed
document.getElementById('genreDetailsBtn').addEventListener('click', getGenres); // getting genre details

// get artist details by artist ID
function getArtistDetails(){
    var artistID = document.getElementById('artistDetailsTextField').value;

    fetch('/api/artistDetails/' + artistID)
    .then(res => res.text()
    .then(data => {

        dataArr = data.split(';')

        searchList.appendChild(document.createTextNode('Artist details for artist ID ' + artistID + ':'));
        searchList.appendChild(document.createElement('br'));

        for(var i=0; i<dataArr.length; i++){ // adding all artist details to the search list and skipping lines between artists
            searchList.appendChild(document.createTextNode(dataArr[i]));
            searchList.appendChild(document.createElement('br'));
        }

    }))
}
document.getElementById('artistDetailsBtn').addEventListener('click', clearSearchResults); // clearing search results when button is pressed
document.getElementById('artistDetailsBtn').addEventListener('click', getArtistDetails); // getting artist details for given artist ID

// get artist IDs by artist name
function getArtistIDs(){
    var artistName = document.getElementById('artistIDsTextField').value;

    fetch('/api/artistIDs/' + artistName)
    .then(res => res.text()
    .then(data => {

        dataArr = data.split(';')

        searchList.appendChild(document.createTextNode('Artist IDs matching artist name ' + artistName + ':'));
        searchList.appendChild(document.createElement('br'));

        for(var i=0; i<dataArr.length; i++){ // adding each artist ID to the search list and skipping lines between IDs
            searchList.appendChild(document.createTextNode(dataArr[i]));
            searchList.appendChild(document.createElement('br'));
        }
    }))
}
document.getElementById('artistIDsBtn').addEventListener('click', clearSearchResults); // clearing search results when button is pressed
document.getElementById('artistIDsBtn').addEventListener('click', getArtistIDs); // getting artist IDs for given artist name

// get track details by track ID
function getTrackDetails(){
    var trackID = document.getElementById('trackDetailsTextField').value;

    fetch('/api/trackDetails/' + trackID)
    .then(res => res.text()
    .then(data => {

        dataArr = data.split(';')

        searchList.appendChild(document.createTextNode('Track details for track ID ' + trackID + ':'));
        searchList.appendChild(document.createElement('br'));

        for(var i=0; i<dataArr.length; i++){ // adding all track details to the search list and skipping lines between tracks
            searchList.appendChild(document.createTextNode(dataArr[i]));
            searchList.appendChild(document.createElement('br'));
        }
    }))
}
document.getElementById('trackDetailsBtn').addEventListener('click', clearSearchResults); // clearing search results when button is pressed
document.getElementById('trackDetailsBtn').addEventListener('click', getTrackDetails); // getting track detais for given track ID

// get first 30 track IDs for given track title or album
function getTrackIDs(){
    var trackOrAlbum = document.getElementById('trackIDsTextField').value;

    fetch('/api/trackIDs/' + trackOrAlbum)
    .then(res => res.text()
    .then(data => {

        dataArr = data.split(';')

        searchList.appendChild(document.createTextNode('Track IDs matching track title or album name ' + trackOrAlbum + ':'));
        searchList.appendChild(document.createElement('br'));

        for(var i=0; i<dataArr.length; i++){ // adding all track IDs to the search list and skipping lines between tracks
            searchList.appendChild(document.createTextNode(dataArr[i]));
            searchList.appendChild(document.createElement('br'));
        }
    }))
}
document.getElementById('trackIDsBtn').addEventListener('click', clearSearchResults); // clearing search results when button is pressed
document.getElementById('trackIDsBtn').addEventListener('click', getTrackIDs); // getting first 30 track IDs for given track title or album



// create a new playlist with a playlist name and an empty array of track IDs
function createList(){

    const newPlaylist = {
        name: document.getElementById('createListTextField').value,
        trackIDs: []
    }
    fetch('/playlists/new', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newPlaylist)
    })
    .then(res => {
        if(res.ok){
            res.text()
            .then(data => {


                alert(data);


            })
            .catch(err => alert('failed to get json object'))
        }
        else{
            alert('error: ' + res.status)
        }
    })
    .catch()

}
document.getElementById('createListBtn').addEventListener('click', createList);

// save a list of track IDs to a given list
function addToList(){

    var trackIDsArrStr = document.getElementById('addTracksTrackID').value.split(', ');
    var trackIDsArr = trackIDsArrStr.map(Number);

    const addTracks = {
        trackIDs: trackIDsArr
    }
    fetch('/playlists/addTracks/' + document.getElementById('addTracksListName').value, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(addTracks)
    })
    .then(res => {
        if(res.ok){
            res.text()
            .then(data => {


                alert(data);


            })
            .catch(err => alert('failed to get json object'))
        }
        else{
            alert('error: ' + res.status)
        }
    })
    .catch()

}
document.getElementById('addTracksBtn').addEventListener('click', addToList);

// delete a list by name
function deleteList(){
    fetch('/playlists/delete/' + document.getElementById('deleteListName').value, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'}
    })
    .then(res => {
        if(res.ok){
            res.text()
            .then(data => {


                alert(data);


            })
            .catch(err => alert('failed to get json object'))
        }
        else{
            alert('error: ' + res.status)
        }
    })
    .catch()
}
document.getElementById('deleteListBtn').addEventListener('click', deleteList);

// get the track IDs for a given list
function getListTrackIDs(){
    fetch('/playlists/trackIDs/' + document.getElementById('getTrackIDsTextField').value, {
        method: 'GET',
        headers: {'Content-type': 'application/json'}
    })
    .then(res => {
        if(res.ok){
            res.text()
            .then(data => {


                alert(data);


            })
            .catch(err => alert('failed to get json object'))
        }
        else{
            alert('error: ' + res.status)
        }
    })
    .catch()

}
document.getElementById('getTrackIDsBtn').addEventListener('click', getListTrackIDs);



















