$(document).ready(function() {
	
	var html_audio = $('#audio_play .html_audio').get(0);
	html_audio.intialized = false;

	create_table();

	$('#audio_play .play').bind('click', function(event) {
		event.preventDefault();
		if (!html_audio.initialized) {
			if (songs_to_play.length > 0) {
				html_audio.initialized = true;
				var current_song = songs_to_play[0];
				html_audio.setAttribute('src', current_song.url);
				set_audio_info(current_song);
				html_audio.play();
			}
		} else {
			html_audio.play();
		}
	});

	$('#audio_play .pause').bind('click', function(event) {
		event.preventDefault();
		html_audio.pause();
	});

	$('#audio_play .next').bind('click', function(event) {
		event.preventDefault();
		html_audio.pause();
		// Move onto the next song in the queue
		// Pop the song from songs_to_play and push it to songs_played
		var played_song = songs_to_play.shift();
		songs_played.unshift(played_song);
		if (songs_to_play.length > 0) {
			var current_song = songs_to_play[0];
			html_audio.setAttribute('src', current_song.url);
			set_audio_info(current_song);
			html_audio.load();
			html_audio.play();
			update_table();
		} else {
			html_audio.pause();
			update_table();
			html_audio.setAttribute('src', "");
			set_audio_info(false);
			html_audio.initialized = false;
		}
	});

	$('#audio_play .previous').bind('click', function(event) {
		event.preventDefault();
		html_audio.pause();
		// Grab the first song from the played list if available
		var song_to_play = songs_played.shift();
		songs_to_play.unshift(song_to_play);
		html_audio.setAttribute('src', song_to_play.url);
		set_audio_info(song_to_play);
		html_audio.load();
		html_audio.play();
		update_table();
	});


	function set_audio_info(song) {
		$('#audio_play #audio_info').empty();
		if(song) {
			$('#audio_play #audio_info').append('<li>' + song.title + '</li>');
			$('#audio_play #audio_info').append('<li>' + song.artist + '</li>');
			$('#audio_play #audio_info').append('<li>' + song.album + '</li>');		
		}
	}
})