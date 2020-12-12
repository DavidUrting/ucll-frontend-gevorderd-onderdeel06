// Event handler voor submit button.
document.querySelector('input[type="submit"]').addEventListener("click", async (e) => {
    // Dit zorgt ervoor dat de form niet gepost wordt (= dus geen refresh)!
    e.preventDefault(); 

    try {
        // bericht POST'en
        await fetch("/api/chat",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nickname: document.querySelector('input[name="nickname"]').value,
                    message: document.querySelector('input[name="message"]').value
                })
            });
        document.querySelector('input[name="message"]').value = "";
    } catch (ex) {
        console.error(error);
    }
});

// Berichten om de seconde ophalen
async function getMessages() {
    try {
        let response = await fetch("/api/chat");
        let chatMessages = await response.json(); // Omzetten van de JSON body naar een JS object

        // Dan kan het JS object gebruikt worden
        let chatHistory = "";
        for (let i = 0; i < chatMessages.length; i++) {
            chatHistory +=
                chatMessages[i].nickname + ": " + chatMessages[i].message + '\n';
        }
        document.querySelector("textarea").value = chatHistory;
    } catch (ex) {
        console.error(error);
    }
}

// Een eerste maal de messages ophalen...
// Aangezien await een async function vereist werd onderstaande constructie gebruikt.
// (Onderstaande constructie noemt men ook wel een IIFE.) 
// Meer info: https://stackoverflow.com/questions/46515764/how-can-i-use-async-await-at-the-top-level
(async () => {
    await getMessages();
})();

// En vervolgens elke seconde de messages opnieuw ophalen.
setInterval(getMessages, 1000);