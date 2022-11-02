// running the searchTrack() function when you click on the search for track button
// this will be implementing in searching by track name
document.getElementById('searchTrackBtn').addEventListener('click', searchTrack);

function searchTrack(){
    var trackName = document.getElementById('searchTrackText').value;
    var searchList = document.getElementById('searchList');
    
    fetch('/api/trackNames/' + trackName)
    .then(res => res.json()
    .then(data => {

        var header = document.createTextNode('Tracks:');
        searchList.appendChild(header);
        searchList.appendChild(document.createElement('br'));
        
        var tracksNode = document.createTextNode(data);
        searchList.appendChild(tracksNode);
       
    }));





}

