const url = "https://tinkr.tech/sdb/keirwander/wander"
let playerKey = localStorage.getItem("playerKey");
let myUsername = localStorage.getItem("myUsername");
const deleteBtn = document.getElementById("kustuta");
const worldEl = document.getElementById('world');

async function fetchWorld() {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to load world state');
    return response.json();
}

function renderWorld(state) {
    worldEl.innerHTML = '';
    worldEl.style.width = `${state.map_width}px`;
    worldEl.style.height = `${state.map_height}px`;

    for (const player of state.players) {
        const playerEl = document.createElement('div');
        playerEl.className = 'player';
        playerEl.style.left = `${player.x}px`;
        playerEl.style.top = `${player.y}px`;

        if (player.message) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.textContent = player.message;
            playerEl.appendChild(bubble);
        }

        const img = document.createElement('img');
        img.src = player.image;
        img.alt = player.username;
        playerEl.appendChild(img);

        const nameEl = document.createElement('div');
        nameEl.className = 'name';
        nameEl.textContent = player.username;
        playerEl.appendChild(nameEl);

        worldEl.appendChild(playerEl);
    }
}

async function updateWorld() {
    try {
        const state = await fetchWorld();
        renderWorld(state);
    } catch (error) {
        console.error(error);
    }
}

setInterval(updateWorld, 1000);
updateWorld();

async function post(data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

document.getElementById('joinBtn').addEventListener('click', async function() {
    const username = document.getElementById('usernameInput').value;
    if (username) {
        const result = await post({ action: 'join', username });
        if (result.ok) {
            playerKey = result.player_key;
            localStorage.setItem("playerKey", playerKey);
        }
    }
});

document.getElementById('sendBtn').addEventListener('click', async function() {
    const message = document.getElementById('messageInput').value;
    if (message && playerKey) {
        await post({ action: 'talk', player_key: playerKey, message });
        document.getElementById('messageInput').value = '';
    }
});