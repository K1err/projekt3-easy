const url = "https://tinkr.tech/sdb/keirwander/wander"


async function join(username) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'join', username })
    });
    const result = await response.json();
    if (result.ok) {
        playerKey = result.player_key;
        console.log('Joined as', username);
    } else {
        console.error('Join failed:', result);
    }
}

document.getElementById('joinBtn').addEventListener('click', function() {
    const username = document.getElementById('usernameInput').value;
    if (username) {
        join(username);
    }
});

