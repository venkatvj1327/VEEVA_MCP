/**
 * Function to retrieve all debug logs from Veeva Vault.
 *
 * @param {Object} args - Arguments for the retrieval.
 * @param {string} [args.user_id] - Filter results to retrieve the debug log for this user ID only.
 * @param {boolean} [args.include_inactive=false] - Set to `true` to include inactive debug log sessions in the response.
 * @returns {Promise<Object>} - The result of the debug log retrieval.
 */
const executeFunction = async ({ user_id, include_inactive = false }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL
    const url = new URL(`https://${vaultDNS}/api/${version}/logs/code/debug`);
    if (user_id) {
      url.searchParams.append('user_id', user_id);
    }
    url.searchParams.append('include_inactive', include_inactive.toString());

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/json',
      'X-VaultAPI-ClientID': clientId
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error retrieving debug logs:', error);
    return {
      error: `An error occurred while retrieving debug logs: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving debug logs from Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_all_debug_logs',
      description: 'Retrieve all debug logs from Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          user_id: {
            type: 'string',
            description: 'Filter results to retrieve the debug log for this user ID only.'
          },
          include_inactive: {
            type: 'boolean',
            description: 'Set to `true` to include inactive debug log sessions in the response.'
          }
        }
      }
    }
  }
};

export { apiTool };