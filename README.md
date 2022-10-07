<a name="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/JulienDelages/Motus">
    <img src="images/TOSUM.png" alt="Logo" width="100" height="100">
  </a>

<h3 align="center">TOSUM</h3>

  <p align="center">
    Inspired by <a href="https://sutom.nocle.fr"><strong>SOTUM</strong></a> website
    <br />
    <a href="https://github.com/JulienDelages/Motus"><strong>Explore the docs »</strong></a>
</div>

### Description 

Microservice course's project on reproducing the <a href="https://sutom.nocle.fr"><strong>SOTUM</strong></a> website.

```mermaid
sequenceDiagram;
    Client->>+Server: /;
    Server->>+Client: index;
    Client->>Server:/word;
    Server->>Client:Word_TO_GUESS;
    Note left of Client: Guessing;
    Client->>Client: Guessing and storing info to localstorage;
    Client->>Server:score.html;
    Server->>Client: score.html;
    Client->>Client: load score from local storage;
    Client->>front_secu: /;
    front_secu->>Client: /login.html;
    Client-->front_secu: login /password;
    front_secu->>DB_SECURITE: login /password;
    DB_SECURITE->>front_secu: OK;
    note right of front_secu: storing Client in session;
    front_secu->>Client: OK;
    Client->>front_secu:liste de mes comptes;
    front_secu->>server_compte:liste des comptes + client issu de la session;
    server_compte->>DB_compte:liste des comptes + client;
    DB_compte->>server_compte: liste;
    server_compte->>front_secu:liste;
    front_secu->>Client:liste;
```

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/JulienDelages/Motus.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Mount the app
    ```
    node tosum.js
    ``` 
4. Go to http://localhost:3000

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Fedi Lahmar - lahmarfedi@cy-tech.fr

Julien Delages - delagesjul@cy-tech.fr

<p align="right">(<a href="#readme-top">back to top</a>)</p>

