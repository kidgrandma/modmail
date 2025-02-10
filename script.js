const API_URL = "https://script.google.com/macros/s/AKfycbwspss7A5ntDoDHw6zEkq-AOANvlGjjgbzGd4JhW_m69Uisp235_JndalagBr6NwrQ8xw/exec"; 

async function fetchMessages(house) {
    let response = await fetch(`${API_URL}?house=${house}`);
    let messages = await response.json();
    let messageDiv = document.getElementById("messages");
    messageDiv.innerHTML = messages.map(m => `<p><b>${m[1]}</b>: ${m[2]}</p>`).join("");
}

async function sendMessage() {
    let username = document.getElementById("username").value;
    let message = document.getElementById("message").value;
    let house = document.getElementById("house").value; // Selected house

    if (!username || !message || !house) return;

    await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ house, username, message }),
        headers: { "Content-Type": "application/json" }
    });

    document.getElementById("message").value = "";
    fetchMessages(house);
}

setInterval(() => {
    let house = document.getElementById("house").value;
    if (house) fetchMessages(house);
}, 3000);
