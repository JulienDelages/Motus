<a name="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/JulienDelages/Tosum">
    <img src="images/TOSUM.png" alt="Logo" width="100" height="100">
  </a>

<h3 align="center">TOSUM</h3>

  <p align="center">
    Inspired by <a href="https://sutom.nocle.fr"><strong>SOTUM</strong></a> website
    <br />
    <a href="https://github.com/JulienDelages/Tosum"><strong>Explore the docs »</strong></a>
</div>

### Description 

Microservice course's project on reproducing the <a href="https://sutom.nocle.fr"><strong>SOTUM</strong></a> website.

```mermaid
sequenceDiagram
    Client->>+Server: HTTP Request
    Server->>+Client: tosum.js
    Note left of Client: Waiting for sign-up or log in
    alt Client chose to sign-up
        Client->>Server: Sign-up
        Server->>DB_Info: Send username + password
        DB_Info->>DB_Info: Checking username + password
        alt Username is unique
            DB_Info->>Server: Username does not exist
            Server->>DB_Info: Save the username + password
            Server->>Client: alert "account created"
        else Username already exist
        DB_Info->>Server: Username already exist
        Server->>Client: Show a warning about username 
        end
    else Client chose to sign in
        Client->>Server: Sign in
        Server->>DB_Info: Send username + login
        DB_Info->>DB_Info: Checking username + login
        alt Login data is correct
            DB_Info->>Server: User login accepted
            Server->>Client: Successful login
        else Login data is incorrect
        DB_Info->>Server: User login denied
        Server->>Client: Show a warning about username and clear the field
        end
    end
```

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/JulienDelages/Tosum.git
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

