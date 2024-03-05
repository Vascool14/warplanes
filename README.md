<h1 style="text-align: center; font-size: 4rem">Warplanes</h1>

> The game "Warplanes" is an adaptation of a popular childhood game, played between 2 opponents on paper called "Avioane".

## RULES:
- Each player has 2 "radars". In the first one, the player positions 3 planes, and in the second one tries to figure out the positions and hit the opponent's planes. The 2 radars are 10x10 matrices.
- The players take turns to choose a position on the game board, and the opponent must say if the position is a hit or a miss, but this version of the game automatically marks the position, without the need for the opponent to say anything.

## THE GOAL:
- Destroy enemy planes by choosing positions on the game board. The game is similar to "Battleship", but instead of ships, players must find and destroy enemy planes.
- The first player to destroy all 3 enemy planes wins the game.

___

## FEATURES:

### The game can be played in singleplayer or multiplayer mode. 
1. **Singleplayer mode** is avaliable even offline, the player plays against an AI bot that has 3 difficulty levels: 
    > **Easy - Bot Ioana**  - takes anywhere from **18-25 moves** to win

    > **Medium - Bot Andrei** - takes **15-20 moves** to win

    > **Hard - Bot Vasile**  - takes **12-18 moves** to win  

2. **Multiplayer mode** is best used when next to aonther person on a different device, players can create secure accounts and link a connection through WebSockets where they can play against each other.

___

# INSTALLATION:

### 1. Clone the repository:  

```bash
git clone https://github.com/Vascool14/warplanes
```

### 2. Install and Run the "client":

```bash
cd client
npm install
npm run dev  # and open -> http://localhost:5173
```

### 3 (Optional). Install and Run the "server":

```bash
# continue ONLY if you want to run app online ⬇️
cd server
npm install

# create ".env" file in the "server" directory with the following command:
echo "PORT=8080" > .env

# open server on PORT=8080
npm run dev 

# Create MongoDB account and create a cluster to connect to sever:
MONGO_URI=.... # add it to the .env file
```
___

## Technical details:

<h3>Client-side:</h3>

- **Typescript** - Core language
- **ReactJs** - User interface
- **ReactContext** - Global state management
- **Tailwind** - Styling
- **Socket.io** - Real-time 2-way communication
- **ServiceWorker** - PWA (Progressive Web App)
- **Vite** - Build tool (bundle, minify, etc.)

---
<h3>Server-side:</h3>

- **Typescript** - Core language
- **NodeJs** - Runtime environment
- **Express** - Web server framework
- **Socket.io** - Real-time 2-way communication
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **Nodemon** - Development server
- **Bcrypt** - Password hashing
- **JsonWebToken** - Secure authentication (cookies)

<h3>Testing:</h3>

- **Jest** - Unit and integration testing
- **Cypress** - End-to-end testing
- **Postman** - API testing
- **Lighthouse** - PWA testing

___

<h3>DevOps:</h3>

- **GitHub** - Version control
- **Docker** - Containerization
- **Jenkins** - CI/CD (Continuous Integration/Continuous Deployment)
- **Let's Encrypt** - SSL certificate
- **Firebase** - Hosting


___


![in-browser](./screenshots/in-browser.png)

![light-mode](./screenshots/light-mode.png)

![recording](./screenshots/pwa-recording.mov)

![log-in](./screenshots/log-in.png)

![game-1](https://lh3.googleusercontent.com/fife/ALs6j_Hm6ZKCH60DnOLr-tp1Vp4VcA6TyCbq7NXfeJKqdrLelC_x2740aqHtDPZJgkYzUwG6a4vBMLBFaGvYRh1Xr9HKLfulwoT3IYtoDia85PCiIwBpf2V-3Pn-38J_wut7iFAnEzmGsU7E0M7jpbwoKlbFfCTT7LMbyXvXlltFO29MTVk3YX_wx_YpBgKKKXBNSFv5HCh_iaL7QhTpir04kDY6ZRFIVse2J8fV9W2PsGd0hYC9TGouG9kPoytzZmwUEb1nNEPYzmevFDv7nW19yQS0V-3uE-NVHX1Ch4_1t6G_on9dBbF-dkyjWQmA-c8ky94d05h9XaLbxgznyBXIpT2p6w3QCArYMdfsNLGu09kKDqYMkFGTFckoc_ORpT9nRYM4WG54klB8Q5Xq3YV1AJCw8xBn3tAVAL3OsncnceqEijPq3cmdpcA_qJzw7ESGMpQ1ghFIhf7rORuRce0VmYtAT5zGTBSIsP_VAeHFFmTbu-Od_cV_QUvXr-m9dTF8qwRJgYbDKx_JqgfrMCEoMlmCZ4WUUFWMvWfnNUdsmM0Ohh_ae1XEXkyox5K7Nb4YbmaqlSLN1rbY8NF3O8HQxXSeGRdNALy3jnCwM1LLaYDg3MYBlcUfGE9LSa_r10S5I7CDt97Vdeun9Afqj4THrln-l9gCtCi531DmzymwFjkjm38EWEC3pWQv9i0iBG9D4LMaBWPt_sr5nlQ4yemyoQXdoSsdZT5vtBSxrYFa423yaNUE3CZj6-dgTPIvIio0g6T_8h16nZQ_rDPdEFevuDnpBiBV4NvKStu9_3paOrVDW0u3oblYGEix0reGiugpmbp6OWdQrxRghrsmH2q_kwJZyuSyoAlC-7FnUNfMr6Ac2hgVpX_QklIsOnubMytbId1wbGrzjjwODd8VhUuoXg_OC-Kk3b6VBZA2U6oMTjcIKdd_KwHyjkJvazkcKga9Ir5akzuws1G4HQlfWwRO9vl-rHWaxpcDTaBt5ZST-jp8W3dQDEE9iUTMU7mslJ8sSxzIgOVpD-QwIriY91xGMDyGW929rHDvwjMgZudDIq0wsvGsjcWccZniuB_XnkaVLe5w2v5Jm_BcYH2tZRB-zfLc0tRaCyK9TIEZlwPSNjWiKWtrdI-WN1vzss7hQIeZ6Yp27Kzr8LihhvSEDvQGviyja_m-k0_Qd9f0DVqF0Gof8lLlOyplsBcpk6GRuWW_KO1_vuZfLzeE50LYkHIAhZMq9696wdas7jyFwMg6KY7uJh6paEWBvZGG-8HNf38QJahM9SVadiAfcoGYXSfLMRQEo5OGmzw9DEJ8m1P2eejEdWctgbdJmji7whtKlRMN_zDV0oiBWoqENg-RGeJorBt1ZiMpfLh6l3oyR-OddVivLZJSqTDh_3vAH_etk7nOTU6IYRj--FFjpfGKL-e2DMRk5Tuswp7MnrdUx8G5QJPNJwwMup6OjDPsPgcAn4O64bCpZa2_FMj9ZT-6mV-GWxKGU0TzjSrH9-6kwHYxdOv7qMD5GywhIE0fgAeZL7w3Ss0=w1044-h1664)

![game-2](./screenshots/game-2.png)

![game-3](./screenshots/game-3.png)

![menu](./screenshots/menu.png)
