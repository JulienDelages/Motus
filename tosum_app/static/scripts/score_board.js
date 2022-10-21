// let user_score_word =  JSON.parse(localStorage.score_current_word) 

// if (user_score_word.average_try==null){
//     user_score_word.average_try = "No Data Available"
// }


// var is_find = "Word not Find"
// if (user_score_word.score != 0){
//     is_find = "Word has been Find"
// }
// $("#score_value").html(is_find)
// $("#score_avgtry").html(user_score_word.average_try)



// let user_score_all_word = JSON.parse(localStorage.score_all_word)
// if (user_score_all_word.average_try==null){
//     user_score_all_word.average_try = "No Data Available"
// }


// $("#total_words").html(user_score_all_word.all_words)
// $("#total_score").html(user_score_all_word.all_score)
// $("#total_attemps").html(user_score_all_word.all_try)
// $("#total_average_attempts").html(user_score_all_word.average_try)

fetch('http://localhost:4100/get_user')
.then(response => {
    if(response.ok){
        return response.text();
    }
}).then(text => {
    if (text) {
        user_id = JSON.parse(text)
        fetch(`http://localhost:4200/get_user_information/?username=${user_id["user"]}`)
        .then(response => {
            if(response.ok){
                return response.text();
            }
        }).then(text => {
            if (text) {
                let total_try = 0
                let nb_games = 0
                let nb_wins = 0
                user_score = JSON.parse(text)
                for (word in user_score) {
                    total_try = total_try + user_score[word]["nb_try"]
                    nb_games = nb_games + 1
                    if (user_score[word]["found"] == true){
                        nb_wins = nb_wins + 1
                    }
                    
                }
                avg_try = Number((total_try / nb_games).toFixed(1))
                avg_win = Number(((nb_wins / nb_games)*100).toFixed(1))
                current_word = Object.keys(user_score)[nb_games - 1]
                nb_try_current_word = user_score[current_word]["nb_try"]
                let found_current_word = 'NON'
                if (user_score[current_word]["found"]==true){
                    found_current_word = "OUI"
                }
                else{
                    found_current_word = "NON"
                }
                
                document.getElementById("last_word").innerHTML = current_word
                document.getElementById("last_nb_try").innerHTML = nb_try_current_word
                document.getElementById("last_found").innerHTML = found_current_word

                document.getElementById("total_played").innerHTML = nb_games
                document.getElementById("total_wins").innerHTML = nb_wins
                document.getElementById("win_pct").innerHTML = avg_win
                document.getElementById("try_mean").innerHTML = avg_try
            }
        })
    }
})