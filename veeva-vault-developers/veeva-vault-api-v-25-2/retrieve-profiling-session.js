/**
 * Function to retrieve details about a specific SDK request profiling session from Veeva Vault.
 *
 * @param {Object} args - Arguments for the retrieval.
 * @param {string} args.session_name - The name of the session to retrieve details for.
 * @param {string} args.vaultDNS - The DNS of the Veeva Vault instance.
 * @param {string} args.version - The API version to use.
 * @param {string} args.sessionId - The session ID for authorization.
 * @param {string} args.clientId - The client ID to identify the request.
 * @returns {Promise<Object>} - The result of the profiling session retrieval.
 */
const executeFunction = async ({ session_name, vaultDNS, version, sessionId, clientId }) => {
  const baseUrl = `https://${vaultDNS}/api/${version}/code/profiler/${session_name}`;
  try {
    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/json',
      'X-VaultAPI-ClientID': clientId
    };

    // Perform the fetch request
    const response = await fetch(baseUrl, {
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
    console.error('Error retrieving profiling session:', error);
    return {
      error: `An error occurred while retrieving the profiling session: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving profiling session details from Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_profiling_session',
      description: 'Retrieve details about a specific SDK request profiling session.',
      parameters: {
        type: 'object',
        properties: {
          session_name: {
            type: 'string',
            description: 'The name of the session to retrieve details for.'
          },
          vaultDNS: {
            type: 'string',
            description: 'The DNS of the Veeva Vault instance.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          sessionId: {
            type: 'string',
            description: 'The session ID for authorization.'
          },
          clientId: {
            type: 'string',
            description: 'The client ID to identify the request.'
          }
        },
        required: ['session_name', 'vaultDNS', 'version', 'sessionId', 'clientId']
      }
    }
  }
};

export { apiTool };