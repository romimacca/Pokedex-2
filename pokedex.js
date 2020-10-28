$(document).ready(function () {
    getPokemones("https://pokeapi.co/api/v2/pokemon/", 1)

    $("#more_pokemons").click(function(){
        if (this.dataset.next){
            getPokemones(this.dataset.next, parseInt(this.dataset.next.split('=')[1].split('&')[0]) + 1)
        }
    });

    $('#pokedex').click(function(e){
        if(e.target.dataset.pokemon){
            var pokemon_url = e.target.dataset.pokemonurl
            getDataPokemon(pokemon_url)
        }
    });
})

$('#pokemon-types').click(function(e){
    if(e.target.dataset.type){
        // console.log('damageData')
        url_types = 'https://pokeapi.co/api/v2/type/'+e.target.dataset.type
        damageData(url_types)
    }
});
$('#pokemon-abilities').click(function(e){
    if(e.target.dataset.ability){
        url_types = 'https://pokeapi.co/api/v2/ability/'+e.target.dataset.ability
        otherPokemonsWithAbility(url_types)
    }
});

function damageData(url){
    fetch(url)
    .then(function(response){
        return response.json() 
    })
    .then(function(data){
        $("#double_damage_from").html("")
        $("#double_damage_to").html("")
        $("#half_damage_from").html("")
        $("#half_damage_to").html("")
        $("#no_damage_from").html("")
        $("#no_damage_to").html("")

        $("#PokemonDamageModalLabel").html("Tipo "+data.name+" :: Relaciones de daño")

        data.damage_relations.double_damage_from.forEach(function(damage){
            $('#double_damage_from').append("<li class='py-2 border-bottom'>"+damage.name+"</li>")
        })
        data.damage_relations.double_damage_to.forEach(function(damage){
            $('#double_damage_to').append("<li class='py-2 border-bottom'>"+damage.name+"</li>")
        })
        data.damage_relations.half_damage_from.forEach(function(damage){
            $('#half_damage_from').append("<li class='py-2 border-bottom'>"+damage.name+"</li>")
        })
        data.damage_relations.half_damage_to.forEach(function(damage){
            $('#half_damage_to').append("<li class='py-2 border-bottom'>"+damage.name+"</li>")
        })
        data.damage_relations.no_damage_from.forEach(function(damage){
            $('#no_damage_from').append("<li class='py-2 border-bottom'>"+damage.name+"</li>")
        })
        data.damage_relations.no_damage_to.forEach(function(damage){
            $('#no_damage_to').append("<li class='py-2 border-bottom'>"+damage.name+"</li>")
        })
    })
    $('#PokemonDamageModal').modal('show')
}

function otherPokemonsWithAbility(url){
    $('#same_ability').html('')
    fetch(url)
    .then(function(response){
        return response.json() 
    })
    .then(function(data){
        $("#PokemonAbilityModalLabel").html("Pokemones con habilidad :: "+ data.name)
        data.pokemon.forEach(function(result){
            $('#same_ability').append("<div class='my-4 mx-2'><span class='p-3 border rounded-pill'>"+result.pokemon.name+"</span></div>")
        })
    })
    $('#PokemonAbilityModal').modal('show')
}

function getDataPokemon(pokemon_url){
    // limpiar informacion del modal
    $("#pokemon-types").html("")
    $("#pokemon-abilities").html("")
    $("#pokemon-moves").html("")


    fetch(pokemon_url)
        .then(function(data_result){
            return data_result.json()
        })
        .then(function(data){
            $("#pokemonmodalLabel").html(data.name)
            data.types.forEach(function(result){
                temp_button = "<button type='button' class='btn btn-outline-success btn-sm float-right' data-type='"+result.type.name+"'>Ver relaciones de daño</button>"
                $("#pokemon-types").append("<li class='py-3 border-bottom'>"+result.type.name+" "+temp_button+"</li>")
            });
            data.abilities.forEach(function(result){
                temp_button = "<button type='button' class='btn btn-outline-info btn-sm float-right' data-ability='"+result.ability.name+"'>Otros pokémon que tienen esta habilidad</button>"
                $("#pokemon-abilities").append("<li class='py-3 border-bottom'>"+result.ability.name+" "+temp_button+"</li>")
            });
            data.moves.slice(-5).forEach(function(result){
                $("#pokemon-moves").append("<div class='my-4 mx-2'><span class='p-3 border rounded-pill'>"+result.move.name+"</span></div>")
            });
        })
};

function getPokemones(url, count){
    fetch(url)
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            i = count
            data.results.forEach(function(pokemon, index){
                index = i++;
                addPokemon(pokemon, index)
            });
            $("#more_pokemons").attr('data-next', data.next);
        });
};

function addPokemon(pokemon, index){
    $("#pokedex").append(
        '<div class="col-3 my-2">'+
            '<div class="card ">'+
                '<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/'+index+'.svg" class="card-img-top p-3" style="height: 200px;" alt="'+pokemon.name+'">'+
                '<div class="card-body">'+
                    '<h5 class="card-title text-capitalize">'+pokemon.name+'</h5>'+
                    '<a href="#" class="btn btn-primary btn-modal-pokemomn" data-toggle="modal" data-target="#pokemonmodal"  data-pokemonurl="'+pokemon.url+'" data-pokemon="'+pokemon.name+'" >¡Quiero saber más de este pokémon!</a>'+
                '</div>'+
            '</div>'+
        '</div>'
    )
}