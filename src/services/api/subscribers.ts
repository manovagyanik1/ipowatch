import { API_CONFIG } from '../../config/constants';

export async function subscribeToNewsletter(email: string) {
  const response = await fetch(`${API_CONFIG.BASE_URL}/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to subscribe');
  }

  return response.json();
}