$(function() {
	$('#search_form').submit(function(event) {
		// Send an ajax call to the server
		event.preventDefault();
		('#search_form').focus();
		var search_term = ('#search_form').val();
		$.ajax({
			url: "192.168.1.11/groove_player.html",
			type: 'POST',
			data: {'search_term':search_term},
		})
		.done(function(data) {
			// Once the data comes back, add this object to the end of queue
			add_data_to_queue(data);
		});
		// or something like this
		// Listen upon completion for the json of the song object

	});
});