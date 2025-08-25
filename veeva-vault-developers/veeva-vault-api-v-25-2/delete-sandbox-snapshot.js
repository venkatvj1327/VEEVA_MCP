/**
 * Function to delete a snapshot in Veeva Vault.
 *
 * @param {Object} args - Arguments for the delete snapshot request.
 * @param {string} args.api_name - The Vault ID of the sandbox snapshot to delete.
 * @returns {Promise<Object>} - The result of the delete snapshot operation.
 */
const executeFunction = async ({ api_name }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL for the delete request
    const url = `https://${vaultDNS}/api/${version}/objects/sandbox/snapshot/${api_name}`;

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/json',
      'X-VaultAPI-ClientID': clientId
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Return a success message or empty response
    return { message: 'Snapshot deleted successfully.' };
  } catch (error) {
    console.error('Error deleting snapshot:', error);
    return {
      error: `An error occurred while deleting the snapshot: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a snapshot in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_snapshot',
      description: 'Delete a snapshot in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          api_name: {
            type: 'string',
            description: 'The Vault ID of the sandbox snapshot to delete.'
          }
        },
        required: ['api_name']
      }
    }
  }
};

export { apiTool };