var pokemonRepository = (function () {
	var repository = [
		{
			name: 'AllTypeTestMon',
			height: 0.6,
			types: ['water','fire','grass']
		},
		{
			name: 'Bulbasaur',
			height: 0.7,         
			types: ['grass']
		},
		{
			name: 'Charmander',
			height: 0.6,
			types: ['fire']
		},
		{
			name: 'Squirtle',
			height: 0.5,
			types: ['water']
		},
	];
 
//it uses - isTrueEqualKeysObj -(see below) to compare the new entry with the first one in the array.
//returns what is wrong if something does not fit.
	function add(pokemon){
		if (typeof(pokemon) === 'object') {
			if (isTrueEqualKeysObj (pokemonRepository.getAll()[0], pokemon)) {
				repository.push(pokemon);
			} else {
				console.log('Please ensure your pokemon has the correct format: {name: (string), height: (number), types: [array of strings]}');
			}
		} else {
			console.log('Please add an object');
		}
	}

//filter the repository by checking whether a given string in lowercase is part ...
//of the value (in lowercase) of the name property of objects in the repository.
//returns an array of objects whose name value correspond to the given string or an empty one
	function searchByName(inputNameString) {
		return repository.filter(function (repositoryObject){
			return repositoryObject.name.toLowerCase().indexOf(inputNameString.toLowerCase()) != -1;
		})
	}

	function getAll() {
		return repository;
	}

	return {
		add: add,
		getAll: getAll,
		searchByName: searchByName
	};
})();

//----------------------------------------------------------------------------------------------------
//compares object keys after checking that the number of keys in two objects is the same.
//does not work with objects that have functions as properties.
function isTrueEqualKeysObj (obj1, obj2) {
	if (Object.keys(obj1).length === Object.keys(obj2).length) {
		var i = 0;
		while (i < Object.keys(obj1).length && (Object.keys(obj1)[i] === Object.keys(obj2)[i])) {
			i++;
		}
		if (i === Object.keys(obj1).length) { //if the number of corresponding keys is equal to the number of keys, return true
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

//---------------------------------------------------------------------------------------------------
var allPokemon = pokemonRepository.getAll();

function getHeightDescription(singlePokemon) {
	return singlePokemon.height + 'm';
}

function getHeightEmphasis(singlePokemon) {
	if (singlePokemon.height >= 0.7) {
		return 'Look how big it is!';
	} else if (singlePokemon.height <= 0.5){
		return 'It is so cute!';
	} else {
		return null;   //if the pokemon is not special regarding height the function should return something falsy
	}
}

function getTypesDescription(singlePokemon) {
	return singlePokemon.types;
}

function getPokeDescription(singlePokemon) {
	return singlePokemon.name + ' (' + getHeightDescription(singlePokemon) + ', ' + getTypesDescription(singlePokemon) + ')';
}

//if getHeightEmphasis() returns something truthy, return the pokedescription and the emphasis, with fitting characters as separation.
//otherwise return only the pokedescription.
function getForPrintPokeDescription(singlePokemon) {
	if (getHeightEmphasis(singlePokemon)) {   
		return getPokeDescription(singlePokemon) + ' - ' + getHeightEmphasis(singlePokemon);
	} else {
		return getPokeDescription(singlePokemon);
	} 
}

allPokemon.forEach(function (pokemon) {
	document.write(getForPrintPokeDescription(pokemon) + '<br>');
});