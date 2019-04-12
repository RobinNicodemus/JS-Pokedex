var pokemonRepository = (function () {
	var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


//it uses - isTrueEqualKeysObj -(see below) to compare the new entry with the first one in the array.
//returns what is wrong if something does not fit.
	function add(pokemon){
		if (typeof(pokemon) === 'object') {
			// if (isTrueEqualKeysObj (pokemonRepository.getAll()[0], pokemon)) {
				repository.push(pokemon);
		// 	} else {
		// 		console.log('Please ensure your pokemon has the correct format: {name: (string), height: (number), types: [array of strings]}');
		// 	}
		} else {
			console.log('Please add an object');
		}
	}

	function getAll() {
		return repository;
	}


//filter the repository by checking whether a given string in lowercase is part ...
//of the value (in lowercase) of the name property of objects in the repository.
//returns an array of objects whose name value correspond to the given string or an empty one
	function searchByName(inputNameString) {
		return repository.filter(function (repositoryObject){
			return repositoryObject.name.toLowerCase().indexOf(inputNameString.toLowerCase()) != -1;
		})
	}

//create new list-items and buttons, append them to the pokelist,
//attach ftting classes for the css.
//the button should show the pokemon`s name and should show it`s details in the console
	function addListItem(pokemonObject) {
		var $newListItem = document.createElement('li');
		var $newButton = document.createElement('button');
		var $pokeList = document.querySelector('#pokemon-list')

		$newListItem.setAttribute('class', 'pokemon-list__item');
		$newButton.setAttribute('class', 'list-item__button');
		$newListItem.appendChild($newButton);
		$pokeList.appendChild($newListItem);
		$newButton.innerText = pokemonObject.name;
		$newButton.addEventListener('click', function(event) {
			showDetails(pokemonObject);
		});
	}

	function loadList() {
		return fetch(apiUrl).then(function (response) {
			return response.json();
		}).then(function(json) {
			json.results.forEach(function (item) {
				var pokemon = {
					name: item.name,
					detailsUrl: item.url
				};
				add(pokemon);
			});
		}).catch(function (e) {
			console.error(e);
		})
	}

	function loadDetails(item) {
		var url = item.detailsUrl;
		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details) {
			item.imageUrl = details.sprites.front_default;
			item.heigth = details.height;
			item.types = Object.keys(details.types);
	}).catch(function (e) {
		console.error(e);
	});
	}

	return {
		add: add,
		getAll: getAll,
		searchByName: searchByName,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails
	};
})();

//-----------------------------
function ledToggleOnOff() {
	var $led = document.querySelector('.led');
	$led.classList.toggle('led-blink');
}

//----------------------------
pokemonRepository.loadList().then(function() {
	pokemonRepository.getAll().forEach(function(pokemonObj) {
		pokemonRepository.addListItem(pokemonObj);
	});
});

function showDetails(pokemonObject) {
	ledToggleOnOff();
	pokemonRepository.loadDetails(pokemonObject).then(function() {
		console.log(pokemonObject);
	ledToggleOnOff();
	});
}
