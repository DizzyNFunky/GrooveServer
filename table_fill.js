var song_table = $("#song_table");
var song_table_body = $("#song_table_body");

var played_table = $("#played_table");
var played_table_body = $("#played_table_body");



function create_table() {
    // Take the song_table and input all of the songs
    for(i = 0; i < songs_to_play.length; i++) {
        song = songs_to_play[i];
        // Create the table row and input the song data
        song_table_row = $('<tr/>', {
            class: 'table_row'
        });
        song_table_row.appendTo(song_table_body)
        $('<td class="table_data">' + song.title + '</td>').appendTo(song_table_row);
        $('<td class="table_data">' + song.artist + '</td>').appendTo(song_table_row);
        $('<td class="table_data">' + song.album + '</td>').appendTo(song_table_row);
    }

    for(i = 0; i < songs_played.length; i++) {
		song = songs_played[i];
		played_table_row = $('<tr/>', {
            class: 'table_row'
        });
        played_table_row.appendTo(played_table_body)
        $('<td class="table_data">' + song.title + '</td>').appendTo(played_table_row);
        $('<td class="table_data">' + song.artist + '</td>').appendTo(played_table_row);
        $('<td class="table_data">' + song.album + '</td>').appendTo(played_table_row);
    
    }
};

function add_data_to_queue(data) {
	alert(data);
    // Only add the relevant parts of the data to an object
    var new_song = {};
    new_song['title'] = data['title'];
    new_song['album'] = data['album'];
    new_song['artist'] = data['artist'];
    new_song['url'] = data['url'];
    add_song(new_song);
}

function update_table() {
	var song_table_body = $("#song_table_body");
    song_table_body.empty();
    var played_table_body = $("#played_table_body");
    played_table_body.empty();
    create_table();
};

function add_song(song) {
    songs_to_play.push(song);

}

$(document).ready(function() {
	$('.song_table .table_data').oncontextmenu = function() {
		return false;
	};
	$('.song_table .table_row').mousedown(function(event) {
		if (event.button == 0) {
			// Left click, do something
		} else if (event.button == 2) {
			// Right click, do something else
		}
	});
});