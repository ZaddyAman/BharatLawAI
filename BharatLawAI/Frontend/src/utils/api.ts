export interface ChatResponse {
  answer: string;
  source: 'vector_db' | 'fallback_llm';
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const chatWithAI = async (question: string): Promise<ChatResponse> => {
  try {
    console.log('📡 Making API request to:', `${API_BASE_URL}/chat`);
    console.log('📤 Request payload:', { question });
    console.log('🌐 Env VITE_API_URL:', import.meta.env.VITE_API_URL);

    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ question }),
      mode: 'cors',
    });

    console.log('📥 Response status:', response.status, '✅ OK:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    console.log('📦 API Response data:', data);

    if (!data.answer) {
      console.error('❌ Invalid response structure (no answer):', data);
      throw new Error('Invalid response format: missing answer field');
    }

    const final: ChatResponse = {
      answer: data.answer,
      source: data.source === 'vector_db' ? 'vector_db' : 'fallback_llm',
    };

    console.log('✅ Final Parsed ChatResponse:', final);
    return final;

  } catch (error) {
    console.error('🚨 Error calling chat API:', error);

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('🌐 Network error: Unable to connect to the API server. Ensure backend is running at http://127.0.0.1:8000 and CORS is allowed.');
    }

    if (error instanceof Error && error.message.includes('CORS')) {
      throw new Error('🚫 CORS error: Backend must allow requests from this frontend. Please fix CORS settings.');
    }

    throw error;
  }
};
