/**
 * Function to delete a debug log in Veeva Vault.
 *
 * @param {Object} args - Arguments for the delete operation.
 * @param {string} args.id - The ID of the debug log to delete.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ id }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user
  
  try {
    // Construct the URL for the delete request
    const url = `https://${vaultDNS}/api/${version}/logs/code/debug/${id}/actions/reset`;

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

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting debug log:', error);
    return {
      error: `An error occurred while deleting the debug log: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a debug log in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_debug_log',
      description: 'Delete a debug log in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The ID of the debug log to delete.'
          }
        },
        required: ['id']
      }
    }
  }
};

export { apiTool };