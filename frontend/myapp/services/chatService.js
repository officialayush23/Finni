import { api } from './api';

export const chatService = {
  /**
   * POST /api/v1/chat/
   * @param {string} message - The text from the user (or voice-to-text)
   * @param {string} sessionId - Optional ID to keep track of the conversation
   */
  sendMessage: async (message, sessionId = null) => {
    try {
      const response = await api.post('/chat/', {
        message: message,
        session_id: sessionId
      });
      return response.data; // Returns { response: "AI Text", session_id: "..." }
    } catch (error) {
      console.error("Chat Service Error:", error);
      throw error;
    }
  }
};