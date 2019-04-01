var repository = [];

pokemon_0 = {
	name: 'Bulbasaur',
	height: 0.7,           //height data stored in meters
	types: ['grass']
}; 

pokemon_1 = {
	name: 'Charmander',
	height: 0.6,
	types: ['fire']
}; 

pokemon_2 = {
	name: 'Squirtle',
	height: 0.5,
	types: ['water']
};

console.log(repository.length);
repository.push(pokemon_0);
repository.push(pokemon_1);
repository.push(pokemon_2);
console.log(repository.length);


//document.write content could be merged, but i split it for better readability. 
for (var i = 0; i <= 2; i++) {
	document.write('<br />', repository[i].name); //the <br /> has only aesthetic function and should be replaced with something better soon.
	document.write("(" + repository[i].height + "m, types: "); 
	//Here i try to change the background color of the types display
	if (repository[i].types[0] === 'grass') {
		document.write('<span class="green_bg">', repository[i].types, '</span>')
		document.write(")");
	} else if (repository[i].types[0] === 'water') {
		document.write('<span class="blue_bg">', repository[i].types, '</span>')
		document.write(")");
	} else if (repository[i].types[0] === 'fire') {
		document.write('<span class="red_bg">', repository[i].types, '</span>')
		document.write(")");
	} else { 
		document.write(repository[i].types + ")")
	}

	if (repository[i].height >= 0.7) {
		document.write(" Wow, that`s big!");
	}
		else if (repository[i].height <= 0.5) {
			document.write(" Look how cute it is!");
		}
	} 
