// src/index.ts
import { Canister, query, text, update, Void } from 'azle';

// This is a global variable that is stored on the heap
let message = '';

const CanisterMethods = Canister({
    // Query calls complete quickly because they do not go through consensus
    getMessage: query([], text, () => {
        return message;
    }),
    // Update calls take a few seconds to complete
    // This is because they persist state changes and go through consensus
    setMessage: update([text], Void, (newMessage) => {
        message = newMessage; // This change will be persisted
    })
});

// Custom function to display the "Welcome to Rides" message with beautiful fonts and animation
function displayWelcomeMessage(): void {
    if (typeof document !== 'undefined') {
        const styledMessage = `
            <div style="font-family: 'Arial', sans-serif; font-size: 24px; color: #ff0000; animation: fadeIn 2s ease-in-out;">
                Welcome to Rides
            </div>
        `;
        document.body.innerHTML = styledMessage;
    }
}

// Call the custom function to display the welcome message
displayWelcomeMessage();

export default CanisterMethods;
