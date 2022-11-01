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

    // get track details for a given track ID
    app.get('/api/tracks/:trackId', (req, res) => {
        const id = req.params.trackId;
        const track = tracks.find(tr => tr.track_id == id);
        if(track){
            // MUST FORMAT THIS
            res.send(track.album_id + track.album_title + track.artist_id + track.artist_name
                 + track.tags + track.track_date_created + track.track_date_recorded + track.track_duration
                  + track.track_genres + track.track_number + track.track_title);
        }
        else{
            res.status(404).send('Track ID ' + id + ' not found')
        }
    })
    
});

// parsing ARTISTS data to json array

csv().fromFile(artistsCSV)
.then((artists) => { 

    // get list of artists
    app.get('/api/artists', (req, res) => {
        console.log(artists);
        res.send(artists);
    });
    
    // getting artist details given an artist ID
    app.get('/api/artists/:artistId', (req, res) => {
        const id = req.params.artistId;
        const artist = artists.find(ar => ar.artist_id == id);
        if(artist){
            // MUST FORMAT THIS
            res.send(artist.artist_name + artist.artist_members + artist.artist_location + 
                artist.artist_associated_labels + artist.artist_contact + artist.artist_website); 
        }
        else{
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

