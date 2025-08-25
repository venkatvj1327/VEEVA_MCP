/**
 * Function to execute an MDL script asynchronously on Veeva Vault.
 *
 * @param {Object} args - Arguments for executing the MDL script.
 * @param {string} args.sessionId - The session ID for authorization.
 * @param {string} args.clientId - The client ID to identify the request.
 * @returns {Promise<Object>} - The result of the MDL script execution.
 */
const executeMDLAsync = async ({ sessionId, clientId }) => {
  const vaultDNS = ''; // will be provided by the user
  const url = `https://${vaultDNS}/api/mdl/execute_async`;
  
  try {
    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/json',
      'X-VaultAPI-ClientID': clientId
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
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
    console.error('Error executing MDL script asynchronously:', error);
    return {
      error: `An error occurred while executing the MDL script: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for executing MDL scripts asynchronously on Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeMDLAsync,
  definition: {
    type: 'function',
    function: {
      name: 'execute_mdl_async',
      description: 'Execute an MDL script asynchronously on Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          sessionId: {
            type: 'string',
            description: 'The session ID for authorization.'
          },
          clientId: {
            type: 'string',
            description: 'The client ID to identify the request.'
          }
        },
        required: ['sessionId', 'clientId']
      }
    }
  }
};

export { apiTool };