// Frontend utility to call our secure `/api/chat` route

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export const sendChatMessage = async (message: string, history: ChatMessage[]) => {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, history })
        });

        if (!response.ok) {
            throw new Error('API route responded with status ' + response.status);
        }

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        return data.reply || data.text;
    } catch (error) {
        console.error("Chat Service Error:", error);
        throw new Error('Natya is having trouble connecting right now. Please try again.');
    }
}
