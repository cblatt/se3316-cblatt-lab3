const express = require('express'); // importing express module
const app = express(); // creating app object
const port = 3000; // defining the port
const router = express.Router();
const fs = require('fs'); // importing file system module
const csv = require('csvtojson'); // importing csv to json module
const { type } = require('os');

// setting up front end
app.use('/', express.static('static'));

// data csv files
var tracksCSV = 'lab3-data/raw_tracks.csv';
var artistsCSV = 'lab3-data/raw_artists.csv';
var albumsCSV = 'lab3-data/raw_albums.csv';
var genresCSV = 'lab3-data/genres.csv';

// parsing TRACKS data to json array

csv().fromFile(tracksCSV) 
.then((tracks) => {  

    // get list of tracks
    app.get('/api/tracks', (req, res) => {
        res.send(tracks);
    })

    // get track details for given track info
    app.get('/api/tracks/:trackInfo', (req, res) => {

        // if the track info is NaN (string), treat it as title or album and send track IDs for the first 30 matching tracks
        // if the track info is a number, treat it as track ID and get track details for given ID
        
        const titleOrAlbum = req.params.trackInfo; // storing track info as string (to be treated as title or album)
        const id = Number(req.params.trackInfo); // storing track info as a number (to be treated as ID)

        // if input is NaN (input is a string) - treat as title/album and send track IDs for first 30 matches
        if(isNaN(id)){ 
            var trackIDs = [];
            // looping through tracks array
            for(var i=0; i<tracks.length; i++){
                // if a matching track title or album title is found, push the track ID to the trackIDs array
                if(tracks[i].track_title.toLowerCase().includes(titleOrAlbum.toLowerCase()) || tracks[i].album_title.toLowerCase().includes(titleOrAlbum.toLowerCase())){ 
                    trackIDs.push(tracks[i].track_id);
                }
                // breaking from the loop once the track IDs array reaches 30
                if(trackIDs.length == 30){
                    break;
                }
            }
            res.send(trackIDs);
        }
        // if input is not NaN (input is a number) - treat as track ID and send track details for given ID
        else{ // input is a number - 
            const track = tracks.find(tr => tr.track_id == id); 
            if(track){
                // if the given track ID matches a track, send an array containing the track details
                var trackDetails = [];
                trackDetails.push(track.album_id, track.album_title, track.artist_id, track.artist_name, 
                    track.tags, track.track_date_created, track.track_date_recorded, track.track_duration, 
                    track.track_genres, track.track_number, track.track_title);
                res.send(trackDetails);
            }
            else{
                // if the given track ID does not match a track, send response status and an error message
                res.status(404).send('Track ID ' + id + ' not found')
                console.log(Number('1f'));
            }
        }
    });
});

// parsing ARTISTS data to json array

csv().fromFile(artistsCSV)
.then((artists) => { 

    // get list of artists
    app.get('/api/artists', (req, res) => {
        res.send(artists);
    });
    
    // getting artist details given an artist ID
    app.get('/api/artists/:artistId', (req, res) => {
        const id = req.params.artistId;
        const artist = artists.find(ar => ar.artist_id == id);
        if(artist){
            // if the given artist ID matches an artist, send an array containing the artist details
            artistDetails = [];
            artistDetails.push(artist.artist_name, artist.artist_members, artist.artist_location, 
                artist.artist_associated_labels, artist.artist_contact, artist.artist_website)
            res.send(artistDetails);
        }
        else{
            // if no match is found for the given artist ID, send the response status and an error message
            res.status(404).send('Artist ID ' + id + ' not found');
        }
    });
    
});

// parsing ALBUMS data to json array

csv().fromFile(albumsCSV)
.then((albums) => {

});

// parsing GENRES data to json array

csv().fromFile(genresCSV)
.then((genres) => {

});



// print a message to indicate the app has started and which port the app is listening on
app.listen(port, () => {
    console.log('Listening on port ' + port);
});

