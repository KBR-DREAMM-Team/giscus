import { GCreateDiscussionInput } from '../../lib/types/github';

export async function createDiscussion(
  repo: string,
  input: GCreateDiscussionInput,
): Promise<string> {
  try {
    console.log('Starting the createDiscussion function.');

    // Log the input data
    console.log('Repo:', repo);
    console.log('Input:', input);

    // Make the API request
    const response = await fetch(`/api/discussions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ repo, input }),
    });

    // Check if the response status is not OK
    if (!response.ok) {
      throw new Error(`Failed to create discussion. Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();
    console.log('Response data:', data);

    // Extract the ID from the response data
    const { id } = data;
    console.log('Discussion created with ID:', id);

    return id;
  } catch (error) {
    // Log the error message
    console.error('Error creating discussion:', error);
    throw error; // Re-throw the error to ensure the caller is aware of it
  }
}