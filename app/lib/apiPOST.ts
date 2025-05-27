/* 'use client'

const apiRequest = async <GenericResponseType>(endpoint: string, payload: Record<string, string>): Promise<GenericResponseType> => {
    console.log('apiRequest', endpoint, payload);
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        console.log(response);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
};

export const apiSignIn = (email: string, password: string): Promise<unknown> =>
    apiRequest(`/auth/sign-in`, { email, password });
 */