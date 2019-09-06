var pokemonRepository = (function () {
	var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	var $modalContainer = document.querySelector('#modal-container');

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
	// function searchByName(inputNameString) {
	// 	return repository.filter(function (repositoryObject){
	// 		return repositoryObject.name.toLowerCase().indexOf(inputNameString.toLowerCase()) != -1;
	// 	})
	// }

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
			if (details.types.length == 2 ) {
			item.types = [details.types[0].type.name, details.types[1].type.name];
		} else {
			item.types = [details.types[0].type.name];
		}
	}).catch(function (e) {
		console.error(e);
	});
	}

//TODO research time, jobstack, etc to understand when ledToggleOnOff() will be called
	function showDetails(pokemonObject) {
		ledToggleOnOff();
		pokemonRepository.loadDetails(pokemonObject).then(function() {
			console.log(pokemonObject);
			showModal(pokemonObject);
		ledToggleOnOff();
		});
	}

	function showModal(pokemonObject) {
		//var $modalContainer set at beginning of this document
		$modalContainer.innerHTML = '';

		var modal = document.createElement('div');
		modal.classList.add('modal');

		var modalCloseButton = document.createElement('button');
		modalCloseButton.classList.add('modal-close');
		modalCloseButton.innerText = 'Close';
		modalCloseButton.addEventListener('click', hideModal);

		var modalPokeName = document.createElement('h2');
		modalPokeName.innerText = pokemonObject.name;
		modalPokeName.classList.add('modal-title')

		var modalPokeImg = document.createElement('Img');
		modalPokeImg.src = pokemonObject.imageUrl;
		modalPokeImg.classList.add('modal-img')

		var modalPokeDetails = document.createElement('p');
		modalPokeDetails.innerText = 'It is ' + pokemonObject.heigth/10 + ' meters tall!' ;
		modalPokeDetails.classList.add('modal-details');

		var modalPokeDetails2 = document.createElement('p');
		modalPokeDetails2.innerText = 'Types: ' + pokemonObject.types;
		modalPokeDetails2.classList.add('modal-details2');

		//repeat above for content
		modal.appendChild(modalCloseButton);
		modal.appendChild(modalPokeName);
		modal.appendChild(modalPokeImg);
		modal.appendChild(modalPokeDetails);
		modal.appendChild(modalPokeDetails2);
		$modalContainer.appendChild(modal);

		$modalContainer.classList.add('is-visible');
	}

	function hideModal() {
		//var $modalContainer set at beginning of this document
		$modalContainer.classList.remove('is-visible');
	}

	//[esc] to hide the pokeModal:
	window.addEventListener('keydown', (e) => {
		//var $modalContainer set at beginning of this document
		//if escape is pressed, and $modalContainer is visible: call hideModal()
		if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible'))
		hideModal();
	});

	//click on modal container to close the modal:
	$modalContainer.addEventListener('click', (e) => {
			var target = e.target;
			//only fire when the click is on no other div than the container
			if (target === $modalContainer) {
				hideModal();
			}
	});

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
