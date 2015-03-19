var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.artists = [];
    $scope.albums = [];
	$scope.tracks = [];
	$scope.albumImage = "";
	$scope.searchArtist = true;
	$scope.searchAlbum = true;
	$scope.showTracks = false;
	$scope.selectedArtistIndex = -1;
	$scope.selectedAlbumIndex = -1;

	$scope.searchClicked = function() {
		if($scope.searchString != undefined && $scope.searchString != "") {
			resetResults();
			if($scope.searchArtist) {
				searchArtists();
			} if($scope.searchAlbum) {
				searchAlbums();
			}
		}
	}

	function resetResults() {
		$scope.showTracks = false;
		$scope.selectedAlbumIndex = -1;
		$scope.selectedArtistIndex = -1;
	}


    function searchArtists() {
    	var urlBeginning = "https://api.spotify.com/v1/search?q=";
		var urlEndArtist = "&type=artist";
		var url = urlBeginning + $scope.searchString + urlEndArtist;
	    $http.get(url)
	    .success(function(response) {
	    	$scope.artists = response.artists.items;
	    	if(!$scope.searchAlbum)
	    		$scope.albums = [];
	    });
	}

	function searchAlbums() {
		var urlBeginning = "https://api.spotify.com/v1/search?q=";
		var urlEndAlbum = "&type=album";
		var url = urlBeginning + $scope.searchString + urlEndAlbum;
	    $http.get(url)
	    .success(function(response) {
	    	$scope.albums = response.albums.items;
	    	if(!$scope.searchArtist)
	    		$scope.artists = [];
	    });
	}

	$scope.listAlbumsByArtist = function(artistId, $index) {
		$scope.selectedAlbumIndex = -1;
		$scope.selectedArtistIndex = $index;
		var url = "https://api.spotify.com/v1/artists/" + artistId + "/albums"
	    $http.get(url)
			.success(function(response) {
		    	$scope.albums = response.items;
		    	$scope.tracks = [];
		    	$scope.showTracks = false;
		    });
	}

	$scope.listTracksByAlbum = function(album, $index) {
		$scope.selectedAlbumIndex = $index;
		var url = "https://api.spotify.com/v1/albums/" + album.id + "/tracks";
	    $http.get(url)
			.success(function(response) {
		    	$scope.tracks = response.items;
		    	$scope.albumImage = album.images[0].url;
		    	$scope.showTracks = true;
		    });
	}
});

