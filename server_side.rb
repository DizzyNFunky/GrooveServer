require 'rack'
require 'grooveshark'

class GrooveServer

	@song_queue = []

	def call env
		request = Rack::Request.new env
		case request.request_method
		when 'POST'
			# Given a search to input into the grooveshark client
			puts request.params
			search_term = request.params['search_term']		
		when 'PUT'
			# Not sure how this will work yet, but potentially change song index here
		when 'GET'
			# Send out the current song list
			[200, {"Content-Type" => "text/plain"}, nil]
		end
	end

	def init_client
		@client = Grooveshark::Client.new
		# This session can be stored for 7 days if desired
		@session = @client.session
	end

	def change_queue_to_params params

	end

	def get_song_from_search song_info
		song_potentials = @client.search_songs song_info
		song = song_potentials.first
		return song
	end

	def get_correct_song song
		return get_song_from_search(song.title + " " + song.artist)
	end

	def insert_song_to_queue song
		if client.get_song_url(song).is_nil?
			song = get_correct_song song
		end
		@song_queue << song
	end

	def move_song_to_index song new_index
		# Check if the song is currently in the song queue first
		current_index = @song_queue.index(song)
		if not current_index.is_nil?
			@song_queue.delete_at(current_index)
		end
		@song_queue.insert(new_index, song)
	end

	def parse_songs_to_json
		# Take the @song_queue and turn it into a json object that the
		# view will understand with [{title:x, artist:y, album:z, url:w}, ...]

	end
end

map '/groove_server' do
	run GrooveServer.new
end