<a name="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/JulienDelages/Tosum">
    <img src="static/images/TOSUM.png" alt="Logo" width="100" height="100">
  </a>

<h3 align="center">TOSUM</h3>

  <p align="center">
    Inspired by <a href="https://sutom.nocle.fr"><strong>SOTUM</strong></a> website
    <br />
    <a href="https://github.com/JulienDelages/Tosum"><strong>Explore the docs »</strong></a>
</div>

### Description 

Microservice course's project on reproducing the <a href="https://sutom.nocle.fr"><strong>SOTUM</strong></a> website.

#### TOSUM game
```mermaid

```

#### Score
```mermaid

```

#### Authentification
```mermaid
sequenceDiagram
    Client->>+auth.js: /get_user
    loop
        auth.js->>auth.js: Check if user is logged in
    end
    alt is Logged in
        auth.js->>+Client: Redirects to mainapp
    else not Logged in
        auth.js->>+Client: Redirects to register page
    end
    auth.js-->>Client: username
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

