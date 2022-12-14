const express = require('express'); // importing express module
const app = express(); // creating app object
const port = 3000; // defining the port
const router = express.Router();
const fs = require('fs'); // importing file system module
const csv = require('csvtojson'); // importing csv to json module
const { type } = require('os');
const { send } = require('process');

const cors = require('cors');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const bodyparser = require('body-parser');

const e = require('express');
const { rootCertificates } = require('tls');

// setting up front end
app.use('/', express.static('static'));

// data csv files
var tracksCSV = 'lab3-data/raw_tracks.csv';
var artistsCSV = 'lab3-data/raw_artists.csv';
var albumsCSV = 'lab3-data/raw_albums.csv';
var genresCSV = 'lab3-data/genres.csv';

const db = lowdb(new FileSync('db.json'));

db.defaults({
    playlists: []
}).write();

app.use(cors());
app.use(bodyparser.json());

// get the playlists array (array of json objects)
app.get('/playlists', (req, res) => {
    const data = db.get('playlists').value();
    return res.json(data);
});


// post a new playlist - add a new playlist to the playlists array by adding a playlist name and an empty array of track IDs
app.post('/playlists/new', (req, res) => {
    const data = db.get('playlists');
    const dataArr = data.value();
    
    const newPlaylist = req.body; // holds the new playlist (request body)

    var matchingName; // boolean variable to tell whether the playlist already exists

    // looping through the existing playlists
    for(var i=0; i<dataArr.length; i++){
        // if a matching playlist name already exists, set matchingName variable to true
        if(newPlaylist.name == dataArr[i].name){
            matchingName = true;
            break;
        }
    }

    // if there is a matching playlist name, send playlist already exists
    if(matchingName){
        res.send('playlist name already exists: ' + newPlaylist.name)
    }
    // if there is no matching playlist name, add the new playlist to the array, and send new playlist created
    else{
        data.push(newPlaylist).write();
        res.send('new playlist created: ' + newPlaylist.name);
    }
});

// adding track IDs to a playlist
app.put('/playlists/addTracks/:playlist', (req, res) => {
    const data = db.get('playlists');
    const dataArr = data.value();

    const playlist = req.params.playlist; // storing the name of the playlist to add the tracks to
    const body = req.body; // storing the body
    const trackIDsArr = body.trackIDs; // getting the array of track ids from the body of the request
    
    var matchingName;

    // looping through the existing playlists
    for(var i=0; i<dataArr.length; i++){
        // if a matching playlist is found, add the new tracks to the playlist
        // if there are lready tracks in the playlist, replace them with the new tracks
        if(playlist == dataArr[i].name){
            matchingName = true;
            dataArr[i].trackIDs = trackIDsArr;
        }
    }
    data.write(dataArr); // write the changes to the data array
    

    // if there is a matching playlist, add the tracks to the playlist
    if(matchingName){
        res.send('playlist updated: ' + playlist);
    }
    else{
        res.send('playlist not found: ' + playlist);
    }
});

// delete a playlist by name
app.delete('/playlists/delete/:playlist', (req, res) => {
    const data = db.get('playlists');
    const dataArr = data.value();

    const playlist = req.params.playlist; // storing the playlist to delete

    var matchingPlaylist;

    // looping through the playlists array
    for(var i=0; i<dataArr.length; i++){
        // deleting the playlist corresponding to the given name
        if(dataArr[i].name == playlist){
            matchingPlaylist = true;
            data.splice(i, 1).write();
        }
    }
    // if a match is found, remove the playlist
    if(matchingPlaylist){
        res.send('removed playlist: ' + playlist);
    }
    // if no match is found, send playlist not found
    else{
        res.send('playlist not found: ' + playlist);
    }
});

// get a list of track IDs for a given list name
app.get('/playlists/trackIDs/:playlist', (req, res) => {
    const data = db.get('playlists');
    const dataArr = data.value();

    const playlist = req.params.playlist; // storing the playlist for which we want the track IDs

    var trackIDs = []

    var matchingPlaylist;

    for(var i=0; i<dataArr.length; i++){
        if(dataArr[i].name == playlist){
            trackIDs = dataArr[i].trackIDs;
            matchingPlaylist = true;
        }
    }
    if(matchingPlaylist){
        res.send(trackIDs);
    }
    else{
        res.send('playlist not found: ' + playlist);
    }

})

csv().fromFile(tracksCSV)
.then((tracks) => {

    app.get('/playlists/allInfo/:playlist', (req, res) => {
        const data = db.get('playlists');
        const dataArr = data.value();

        const playlist = req.params.playlist; // storing the playlist for which we want all the info

        var trackIDs = [];
        var trackNames = [];
        var artistNames = [];
        var albumNames = [];
        var lengths = [];

        var matchingPlaylist;

        // this fills the track IDs array with the matching track IDs for the given playlist name
        for(var i=0; i<dataArr.length; i++){
            if(dataArr[i].name == playlist){
                trackIDs = dataArr[i].trackIDs;
                matchingPlaylist = true;
            }
        }

        
        for(var i=0; i<trackIDs.length; i++){
            var track = tracks.find(tr => tr.track_id == trackIDs[i]);
            if(track){
                trackNames.push(track.track_title);
                artistNames.push(track.artist_name);
                albumNames.push(track.album_title);
                lengths.push(track.track_duration);
            }
            else{
                trackNames.push('n/a');
                artistNames.push('n/a');
                albumNames.push('n/a');
                lengths.push('n/a');
            }
        }
        
        var trackInfo = [];
        trackInfo.push(trackNames);
        trackInfo.push(artistNames);
        trackInfo.push(albumNames);
        trackInfo.push(lengths);

        var listInfo = '';

        for(var i=0; i<trackNames.length; i++){
            listInfo += 'Track Title: ' + trackNames[i] + ', ' + 'Artist Name: ' + artistNames[i] + ', ' + 'Album Title: ' + albumNames[i] + ', ' + 'Length: ' + lengths[i] + ';';
        }

        res.send(listInfo);

    })

});

// get names of all lists, number of tracks in each list, and total duration of each list
app.get('/playlists/allLists', (req, res) => {
            
    const data = db.get('playlists');
    const dataArr = data.value();

    var listsInfo = '';

    for(var i=0; i<dataArr.length; i++){
        listsInfo += 'List Name: ' + dataArr[i].name + ', ' + 'Number of Tracks: ' + dataArr[i].trackIDs.length + ';';
    }

    res.send(listsInfo)

})

// search for tracks by track title
csv().fromFile(tracksCSV)
.then((trackNames) => {
    
    app.get('/api/trackNames/:trackName', (req, res) => {
        const name = req.params.trackName; // storing the track title that is being requested
        var trackNamesArr = []; // array to hold the track titles matching the request
        // looping through the tracks array
        for(var i=0; i<trackNames.length; i++){ // if matches are found, push the track titles to the array
            if(trackNames[i].track_title.toLowerCase().includes(name.toLowerCase())){
                trackNamesArr.push(trackNames[i].track_title);
            }
        }
        if(trackNamesArr.length == 0){ // if no matches are found, send status and an error message
            res.status(404).send('Track title ' + name + ' not found');
        }
        else{ // if one or more matches are found, send the track names string
            var trackNamesStr = ''
            for(var i=0; i<trackNamesArr.length; i++){
                trackNamesStr += trackNamesArr[i] + ';'; // string containing track names, separated by commas
            }
            res.send(trackNamesStr);
            
        }
    })
})

// search for artists by artist name
csv().fromFile(artistsCSV)
.then((artistNames) => {

    app.get('/api/artistNames/:artistName', (req, res) => {
        const name = req.params.artistName; // storing the artist name that is being requested
        var artistNamesArr = []; // array to hold the artist names matching the request
        // looping through the artists array
        for(var i=0; i<artistNames.length; i++){ // if matches are found, push the artist names to the array
            if(artistNames[i].artist_name.toLowerCase().includes(name.toLowerCase())){
                artistNamesArr.push(artistNames[i].artist_name);
            }
        }
        if(artistNamesArr.length == 0){ // if no maches are found, send status and an error message
            res.status(404).send('Artist name ' + name + ' not found');
        }
        else{ // if one or more matches are found, send the artist names string
            var artistNamesStr = '';
            for(var i=0; i<artistNamesArr.length; i++){
                artistNamesStr += artistNamesArr[i] + ';'; // string containing artist names, separated by commas
            }
            res.send(artistNamesStr);
        }

    })
});

// search for albums by album name
csv().fromFile(albumsCSV)
.then((albumNames) => {

    app.get('/api/albumNames/:albumName', (req, res) => {
        const name = req.params.albumName; // storing the album name that is being requested
        var albumNamesArr = []; // array to hold the album names matching the request
        // looping through the albums array
        for(var i=0; i<albumNames.length; i++){ // if matches are found, push the album names to the array
            if(albumNames[i].album_title.toLowerCase().includes(name.toLowerCase())){
                albumNamesArr.push(albumNames[i].album_title);
            }
        }
        if(albumNamesArr.length == 0){ // if no matches are found, send status and an error message
            res.status(404).send('Album name ' + name + ' not found');
        }
        else{ // if one or more matches are found, send the album names string
            var albumNamesStr = '';
            for(var i=0; i<albumNamesArr.length; i++){
                albumNamesStr += albumNamesArr[i] + ';'; // string containing album names, separated by commas
            }
            res.send(albumNamesStr);
        }
    })
})

// get all genre titles, IDs, and parent IDs
csv().fromFile(genresCSV)
.then((genreDetails) => {

    app.get('/api/genreDetails', (req, res) => {
        // array to hold the arrays containing genre name, ID, and parent ID
        var allGenres = ''
        // looping through the genres array
        for(var i=0; i<genreDetails.length; i++){
            // pushing an array of name, ID, and parent for each genre to allGenres array
            allGenres += ('Name: ' + genreDetails[i].title + ', ID: ' + genreDetails[i].genre_id + ', Parent ID: ' + genreDetails[i].parent + ';');
        }
        // if no genres are found, send response status and an error message
        if(allGenres.length == 0){
            res.status(404).send('No genres found');
        }
        // if one or more genres are found, send the resulting string
        else{
            res.send(allGenres);
        }
    });

});

// get artist details for a given artist ID
csv().fromFile(artistsCSV)
.then((artistDetails) => {
    
    app.get('/api/artistDetails/:artistID', (req, res) => {
        const id = req.params.artistID; // storing the artist ID that is being requested
        const artist = artistDetails.find(ar => ar.artist_id == id); // finding the first artist that matches the requested artist ID
        // if the given artist ID matches an artist, send an array containing the artist details
        if(artist){
            var artistDetailsArr = [];
            artistDetailsArr.push('Name: ' + artist.artist_name,'Members: ' + artist.artist_members, 'Location: ' + artist.artist_location,  
                'Labels: ' + artist.artist_associated_labels, 'Contact: ' + artist.artist_contact, 'Website: ' + artist.artist_website);

            var artistDetailsStr = '';
            for(var i=0; i<artistDetailsArr.length; i++){
                artistDetailsStr += artistDetailsArr[i] + ';';
            }
            res.send(artistDetailsStr);
        }
        // if no match is found for the given artist ID, send response status and an error message
        else{
            res.status(404).send('Artist ID ' + id + ' not found');
        }
        
    })
});

// get artist IDs for given artist name
csv().fromFile(artistsCSV)
.then((artistIDs) => {

    app.get('/api/artistIDs/:artistName', (req, res) => {
        const name = req.params.artistName; // storing the artist name that is being requested
        var artistIDsStr = ''; // array to hold the artist IDs that are being requested
        // looping through the artists array
        for(var i=0; i<artistIDs.length; i++){ // if matching artist names are found, push the artist IDs to the array
            if(artistIDs[i].artist_name.toLowerCase().includes(name.toLowerCase())){
                artistIDsStr += (artistIDs[i].artist_id + ';');
            }
        }
        if(artistIDsStr.length === 0){ // if no matches are found, send status and an error message
            res.status(404).send('Artist name ' + name + ' not found');
        }
        else{ // if one or more matches are found, send the artist IDs array
            res.send(artistIDsStr);
        }
    })
});

// get track details for a given track ID
csv().fromFile(tracksCSV)
.then((trackDetails) => {
    app.get('/api/trackDetails/:trackID', (req, res) => {
        const id = req.params.trackID; // storing the track ID that is being requested
        const track = trackDetails.find(tr => tr.track_id == id); // finding the first track that matches the requested track ID
        // if the given track ID matches a track, send an array containing the track details
        if(track){
            var trackDetailsArr = [];
            trackDetailsArr.push('Album ID: ' + track.album_id, 'Album Title: ' + track.album_title, 'Artist ID: ' + track.artist_id, 'Artist Name: ' + track.artist_name,  
                'Track Tags: ' + track.tags, 'Date Created: ' + track.track_date_created, 'Date Recorded: ' + track.track_date_recorded, 'Duration: ' + track.track_duration, 
                'Genre: ' + track.track_genres, 'Track Number: ' + track.track_number, 'Track Title: ' + track.track_title);

            var trackDetailsStr = '';
            for(var i=0; i<trackDetailsArr.length; i++){
                trackDetailsStr += trackDetailsArr[i] + ';';
            }
            res.send(trackDetailsStr);
        }
        // if no match is found for the given artist ID, send response status and an error message
        else{
            res.status(404).send('Track ID ' + id + ' not found');
        }
    })
});

// get first 30 track IDs for a given search matching the track title or album
csv().fromFile(tracksCSV)
.then((trackIDs) => {
    app.get('/api/trackIDs/:trackOrAlbumTitle', (req, res) => {
        const trackOrAlbum = req.params.trackOrAlbumTitle; // storing the track title or album that is being requested
        var trackIDsArr = []; // array to hold the track IDs that are being requested
        // looping through tracks array
        for(var i=0; i<trackIDs.length; i++){
            // if a matching track title or album title is found, push the track ID to the trackIDs array
            if(trackIDs[i].track_title.toLowerCase().includes(trackOrAlbum.toLowerCase()) || trackIDs[i].album_title.toLowerCase().includes(trackOrAlbum.toLowerCase())){ 
                trackIDsArr.push(trackIDs[i].track_id);
            }
            // breaking from the loop once the track IDs array reaches 30
            if(trackIDsArr.length == 30){
                break;
            }
        }
        if(trackIDsArr.length == 0){ // if no matches are found, send response status and an error message
            res.status(404).send('Track title or album name ' + trackOrAlbum + ' not found');
        }
        else{ // if one or more matches are found, send the track IDs string
            var trackIDsStr = '';
            for(var i=0; i<trackIDsArr.length; i++){
                trackIDsStr += trackIDsArr[i] + ';';
            }
            res.send(trackIDsStr);
        }
    })
});

// print a message to indicate the app has started and which port the app is listening on
app.listen(port, () => {
    console.log('Listening on port ' + port);
});


