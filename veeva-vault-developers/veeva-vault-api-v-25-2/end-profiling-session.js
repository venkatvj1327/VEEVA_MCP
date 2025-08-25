/**
 * Function to end a profiling session in Veeva Vault.
 *
 * @param {Object} args - Arguments for ending the profiling session.
 * @param {string} args.session_name - The name of the session to end.
 * @param {string} args.sessionId - The session ID for authorization.
 * @param {string} args.clientId - The client ID for the request.
 * @returns {Promise<Object>} - The result of the end profiling session request.
 */
const executeFunction = async ({ session_name, sessionId, clientId }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const url = `https://${vaultDNS}/api/${version}/code/profiler/${session_name}/actions/end`;

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
    console.error('Error ending profiling session:', error);
    return {
      error: `An error occurred while ending the profiling session: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for ending a profiling session in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'end_profiling_session',
      description: 'End a profiling session in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          session_name: {
            type: 'string',
            description: 'The name of the session to end.'
          },
          sessionId: {
            type: 'string',
            description: 'The session ID for authorization.'
          },
          clientId: {
            type: 'string',
            description: 'The client ID for the request.'
          }
        },
        required: ['session_name', 'sessionId', 'clientId']
      }
    }
  }
};

export { apiTool };