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


![in-browser](./screenshots/in-browser.png)

![light-mode](./screenshots/light-mode.png)

![recording](./screenshots/pwa-recording.mov)

![log-in](./screenshots/log-in.png)

![game-1](./screenshots/game-1.png)

![game-2](./screenshots/game-2.png)

![game-3](./screenshots/game-3.png)

![menu](./screenshots/menu.png)
