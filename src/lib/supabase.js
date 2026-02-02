const SUPABASE_URL = "https://uqjmfmitpiodxsmpqesj.supabase.co";
const SUPABASE_KEY = "sb_publishable_2elCAr5bK1DnZW2DLdEtiQ_naZ-f6sE";

const headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
};

const syncOfflineMessages = async () => {
    if (!navigator.onLine) return;
    const queue = JSON.parse(localStorage.getItem("antique_chat_queue") || "[]");
    if (queue.length === 0) return;

    for (const msg of queue) {
        try {
            await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    sender: msg.sender,
                    content: msg.content,
                    created_at: msg.created_at
                })
            });
        } catch (e) {
            console.error("Sync failed for message:", msg);
        }
    }
    localStorage.setItem("antique_chat_queue", "[]");
};

export const supabaseFetch = {
    getMessages: async () => {
        if (navigator.onLine) await syncOfflineMessages();

        const response = await fetch(`${SUPABASE_URL}/rest/v1/messages?select=*&order=created_at.asc`, {
            headers
        });
        if (!response.ok) throw new Error("Failed to fetch messages");
        return response.json();
    },

    sendMessage: async (sender, content) => {
        if (!navigator.onLine) {
            const queue = JSON.parse(localStorage.getItem("antique_chat_queue") || "[]");
            const tempId = Date.now();
            queue.push({ sender, content, id: tempId, created_at: new Date().toISOString(), is_offline: true });
            localStorage.setItem("antique_chat_queue", JSON.stringify(queue));
            return { id: tempId, is_offline: true };
        }

        const response = await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
            method: "POST",
            headers,
            body: JSON.stringify({ sender, content, created_at: new Date().toISOString() })
        });
        if (!response.ok) throw new Error("Failed to send message");
        return response.json();
    },

    deleteMessage: async (id) => {
        if (!navigator.onLine) return;
        const response = await fetch(`${SUPABASE_URL}/rest/v1/messages?id=eq.${id}`, {
            method: "DELETE",
            headers
        });
        if (!response.ok) throw new Error("Failed to delete message");
        return true;
    }
};

window.addEventListener('online', syncOfflineMessages);
