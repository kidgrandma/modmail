const API_URL = "https://script.google.com/macros/s/AKfycbxG_ONQAW3WY4iq04AkJXEFR6BuByAQn_r6kfSOibN5m7wrHpdGZTdmVDUhwe-Vu718Uw/exec";

async function fetchMessages() {
    let response = await fetch(API_URL);
    let messages = await response.json();
    let messageDiv = document.getElementById("messages");
    messageDiv.innerHTML = messages.map(m => `<p><b>${m[1]}</b>: ${m[2]}</p>`).join("");
}

async function sendMessage() {
    let username = document.getElementById("username").value;
    let message = document.getElementById("message").value;
    if (!username || !message) return;
    
    await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ username, message }),
        headers: { "Content-Type": "application/json" }
    });

    document.getElementById("message").value = "";
    fetchMessages();
}

setInterval(fetchMessages, 3000);
