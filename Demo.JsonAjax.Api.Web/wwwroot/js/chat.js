// Event handler voor submit button.
document.querySelector('input[type="submit"]').addEventListener("click", function (e) {
    // bericht POST'en
    fetch("/api/chat",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: document.querySelector('input[name="nickname"]').value,
                message: document.querySelector('input[name="message"]').value
            })
        })
        .then(() => {
            document.querySelector('input[name="message"]').value = "";
        })
        .catch((error) => {
            console.error(error);
        });

    // Dit zorgt ervoor dat de form niet gepost wordt (= dus geen refresh)!
    e.preventDefault(); 
});

// Berichten om de seconde ophalen
function getMessages() {
    fetch("/api/chat")
        .then((response) => { // Omzetten van de JSON body naar een JS object
            return response.json();
        })
        .then((chatMessages) => { // Dan kan het JS object gebruikt worden
            let chatHistory = "";
            for (let i = 0; i < chatMessages.length; i++) {
                chatHistory +=
                    chatMessages[i].nickname + ": " + chatMessages[i].message + '\n';
            }
            document.querySelector("textarea").value = chatHistory;           
        })
        .catch((error) => { // Als er iets misloopt in de ‘ketting’
            console.error(error);
        });
}

// Een eerste maal de messages ophalen
getMessages();

// Elke seconden de messages opnieuw ophalen.
setInterval(getMessages, 1000);