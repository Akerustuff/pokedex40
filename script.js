$(document).ready(function() {
    let url = "https://pokeapi.co/api/v2/pokemon/";
    getPokemon(url);

    $("#more-pokemon").click(function(){
        getPokemon(this.dataset.nexturl);
    });
    
    $('#pokedex').click(function(event){
        if(event.target.dataset.pokemon_info){
            var pokemon_name = event.target.dataset.pokemon_info;
            var pokemon_url = event.target.dataset.pokemonurl;
            $("#pokeModalLabel").html(pokemon_name);
            getDataPokemon(pokemon_url)
        }
    })
});

    function getPokemon(url) {
        $.ajax(url)
            .done(function(data){
                data.results.forEach(function(pokemon_info){
                    addPokemon(pokemon_info)
                    console.log(pokemon_info)
                });
                $("#more-pokemon").attr('data-nexturl', data.next)
            })
    }
    
    function addPokemon(pokemon_info){
        var patt = /[0-9]+/g;
        var pokeid = pokemon_info.url.match(patt)[1];
        let details = `<div class='col-md-2'>
                    <div class="card mb-5 mt-5 pt-0 pb-0">
                        <div class="card-body">
                            <img class="card-img-top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeid}.png" alt="${pokemon_info.name} image">

                            <h2 class="card-title text-center text-capitalize">
                                ${pokemon_info.name}
                            </h2>
                            
                            <a id='' href="#" data-pokemonurl="${pokemon_info.url}" class="btn btn-primary btn-pokemodal" data-toggle="modal" data-target="#pokeModal" data-pokemon_info="${pokemon_info.name}">
                                ¡Quiero ver más de este pokémon!
                            </a>
                        </div>
                    </div>
                  </div>`

        $("#pokedex").append(details);
    }
    
    function getDataPokemon(pokemon_url){
        $("#pokemon-types").html("");
        $("#pokemon-generations").html("");
        $("#pokemon-moves").html("");
        $("#pokemon-abilities").html("");

        //console.log(pokemon_url);
        $.ajax(pokemon_url).done(function(data_result){
            // console.log(data_result);
            data_result.types.forEach(function(result){
                let li_type = document.createElement('li');
                li_type.append(result.type.name);
                $("#pokemon-types").append(li_type);
            })

            data_result.game_indices.forEach(function(result){
                let li_gen = document.createElement('li');
                li_gen.append(result.version.name);
                $("#pokemon-generations").append(li_gen);
            })

            move_counter = 0;
            data_result.moves.forEach(function(result){
                move_counter++;
                if(move_counter < 6){
                    let li_move = document.createElement('li');
                    li_move.append(result.move.name);
                    $("#pokemon-moves").append(li_move);
                }
            })

            data_result.abilities.forEach(function(result){
                let li_ability = document.createElement('li');
                li_ability.append(result.ability.name);
                $("#pokemon-abilities").append(li_ability);
            })        
        })
    }
