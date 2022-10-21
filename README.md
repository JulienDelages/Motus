<a name="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/JulienDelages/Tosum">
    <img src="tosum_app/static/images/TOSUM.png" alt="Logo" width="100" height="100">
  </a>

<h3 align="center">TOSUM</h3>

  <p align="center">
    Inspired by <a href="https://sutom.nocle.fr"><strong>SOTUM</strong></a> website
    <br />
    <a href="https://github.com/JulienDelages/Tosum"><strong>Explore the docs »</strong></a>
</div>

### Description 

Microservice course's project on reproducing the <a href="https://sutom.nocle.fr"><strong>SOTUM</strong></a> website. This project is composed by 3 micro-services:
* A login api that allow the user to create or log in into an account.
* The TOSUM app which consist of the reproduction of the MOTUS or WORDLE game. Each day you have a random word to find with a given amount of try. If the word you entered has a letter at the right place, its color become green, if it is in the word but not at the right place, its color become yellow, otherwise its stays gray.
* A score api that shows the user its statistics from his past games.

#### Authentification
```mermaid
sequenceDiagram
    Client->>+Log in Page: Gives username/login
    Log in Page->>+auth.js: /get_user
    auth.js->>auth.js: Check user info (/check_login)
    alt login is correct
        auth.js->>+Client: Redirects to TOSUM app
    else not Logged in
        auth.js->>+Client: Redirects to register page
    end
    Client->>+Register Page: Gives username/login
    Register Page->>+auth.js: /get_user
    auth.js->>auth.js: Check user info
    alt User info already exist
        auth.js->>+Client: Redirects to Log in page
    else User info do not exist
        auth.js->>auth.js: Create a new user (/register)
        score.js->>auth.js: Create a new user info (/registerscore)
        auth.js->>+Client: Redirects to TOSUM app
    end
```
#### TOSUM game
```mermaid
sequenceDiagram
    auth.js->>+index.js: Get the user id (/get_user)
    Client->>+Client: Wait for input
    Client->>+TOSUM app: Enter a word
    TOSUM app->>+index.js: Look at the daily word (/word)
    index.js->>+index.js: Compare the two words
    alt The words are identic
        index.js->>+score.js: Insert the new game in the user info (/add_score)
        index.js->>+TOSUM app: Congrats the user the game end
    else The words are not the same
        alt There are remaining guesses
            Client->>+Client: Wait for input
        else There is no remaining guess
            index.js->>+score.js: Insert the new game in the user info (/add_score)
        end
    end
```

#### Score
```mermaid
sequenceDiagram
    auth.js->>+node.js: Get the user id (/get_user)
    Client->>+Score page: Goes
    Score page->>+node.js: Ask for the history of games (/get_user_information)
    node.js->>+Score page: Gives the history of games
```

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/JulienDelages/Tosum.git
    ```
2. Make sure to download docker <a href="https://docs.docker.com/desktop/install/windows-install/"><strong>here</strong></a>    
    
3. Mount the app
    ```
    docker-compose up -d
    ``` 
4. Go to http://localhost:4000

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Fedi Lahmar - lahmarfedi@cy-tech.fr

Julien Delages - delagesjul@cy-tech.fr

<p align="right">(<a href="#readme-top">back to top</a>)</p>

