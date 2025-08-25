/**
 * Function to delete a profiling session in Veeva Vault.
 *
 * @param {Object} args - Arguments for the delete session request.
 * @param {string} args.session_name - The name of the session to delete.
 * @param {string} args.sessionId - The session ID for authorization.
 * @param {string} args.clientId - The client ID for the request.
 * @param {string} args.vaultDNS - The DNS of the Veeva Vault.
 * @param {string} args.version - The API version.
 * @returns {Promise<Object>} - The result of the delete session request.
 */
const executeFunction = async ({ session_name, sessionId, clientId, vaultDNS, version }) => {
  const url = `https://${vaultDNS}/api/${version}/code/profiler/${session_name}`;
  
  // Set up headers for the request
  const headers = {
    'Authorization': sessionId,
    'Accept': 'application/json',
    'X-VaultAPI-ClientID': clientId
  };

  try {
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
    console.error('Error deleting profiling session:', error);
    return {
      error: `An error occurred while deleting the profiling session: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for deleting a profiling session in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_profiling_session',
      description: 'Delete an inactive profiling session in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          session_name: {
            type: 'string',
            description: 'The name of the session to delete.'
          },
          sessionId: {
            type: 'string',
            description: 'The session ID for authorization.'
          },
          clientId: {
            type: 'string',
            description: 'The client ID for the request.'
          },
          vaultDNS: {
            type: 'string',
            description: 'The DNS of the Veeva Vault.'
          },
          version: {
            type: 'string',
            description: 'The API version.'
          }
        },
        required: ['session_name', 'sessionId', 'clientId', 'vaultDNS', 'version']
      }
    }
  }
};

export { apiTool };