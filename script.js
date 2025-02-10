const API_URL = "https://script.google.com/macros/s/AKfycbxAuzgY2NvYafArQvz0vUkMjpLzlecsgCbejCIztA0zhxaVwFjgqgshm1KIjnT14TcI/exec"; 

async function fetchMessages(house) {
    let response = await fetch(`${API_URL}?house=${house}`);
    let messages = await response.json();
    let messageDiv = document.getElementById("messages");
    messageDiv.innerHTML = messages.map(m => `<p><b>${m[1]}</b>: ${m[2]}</p>`).join("");
}

async function sendMessage() {
    const house = document.getElementById("house").value; // Selected house
    const username = document.getElementById("username").value; // User's name
    const message = document.getElementById("message").value; // Message content

    // Validate input fields
    if (!house || !username || !message) {
        alert("Please select a house, enter your name, and write a message.");
        return;
    }

    try {
        // Send data to Google Apps Script
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ house, username, message }),
        });

        if (!response.ok) throw new Error("Failed to send message");

        // Clear the message input field after successful submission
        document.getElementById("message").value = "";

        // Refresh messages
        fetchMessages(house);
    } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send the message. Please try again.");
    }
}
setInterval(() => {
    let house = document.getElementById("house").value;
    if (house) fetchMessages(house);
}, 3000);
