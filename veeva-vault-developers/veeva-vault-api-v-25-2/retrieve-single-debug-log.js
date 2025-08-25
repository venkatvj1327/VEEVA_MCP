/**
 * Function to retrieve a single debug log from Veeva Vault.
 *
 * @param {Object} args - Arguments for the retrieval.
 * @param {string} args.id - The ID of the debug log to retrieve.
 * @returns {Promise<Object>} - The details of the debug log.
 */
const executeFunction = async ({ id }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL for the request
    const url = `https://${vaultDNS}/api/${version}/logs/code/debug/${id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/json',
      'X-VaultAPI-ClientID': clientId
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
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
    console.error('Error retrieving debug log:', error);
    return {
      error: `An error occurred while retrieving the debug log: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a single debug log from Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_single_debug_log',
      description: 'Retrieve details about a single debug log from Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The ID of the debug log to retrieve.'
          }
        },
        required: ['id']
      }
    }
  }
};

export { apiTool };