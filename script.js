const url = "https://tinkr.tech/sdb/keirwander/wander"
let playerKey = localStorage.getItem("playerKey");
let myUsername = localStorage.getItem("myUsername");
const deleteBtn = document.getElementById("kustuta");



async function join(username) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'join', username })
    });

    const result = await response.json();
    if (result.ok) {
        playerKey = result.player_key;
        localStorage.setItem("playerKey", playerKey);
        console.log("Joined as", username);
        console.log(playerKey);
    } else {
        console.error('Join failed:', result);
    }
}


document.getElementById('joinBtn').addEventListener('click', function () {
    const username = document.getElementById('usernameInput').value;
    if (username) {
        join(username);
    }
});


async function post(data) {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    return res.json();
}

document.getElementById('joinBtn').addEventListener('click', async function() {
    const username = document.getElementById('usernameInput').value;
    if (username) {
        const result = await post({ action: 'join', username });
        if (result.ok) { playerKey = result.player_key; localStorage.setItem("playerKey", playerKey); }
    }
});

document.getElementById('sendBtn').addEventListener('click', async function() {
    const message = document.getElementById('messageInput').value;
    if (message && playerKey) {
        await post({ action: 'talk', player_key: playerKey, message });
        document.getElementById('messageInput').value = '';
    }
});