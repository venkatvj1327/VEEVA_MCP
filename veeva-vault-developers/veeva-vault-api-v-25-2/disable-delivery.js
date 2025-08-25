/**
 * Function to disable delivery of messages in a specified queue on Veeva Vault.
 *
 * @param {Object} args - Arguments for disabling delivery.
 * @param {string} args.queue_name - The name of the specific queue.
 * @param {string} args.sessionId - The session ID for authorization.
 * @param {string} args.clientId - The client ID for identifying the request.
 * @returns {Promise<Object>} - The result of the disable delivery operation.
 */
const executeFunction = async ({ queue_name, sessionId, clientId }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const url = `https://${vaultDNS}/api/${version}/services/queues/${queue_name}/actions/disable_delivery`;

  try {
    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/json',
      'X-VaultAPI-ClientID': clientId
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
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
    console.error('Error disabling delivery:', error);
    return {
      error: `An error occurred while disabling delivery: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for disabling delivery of messages in a queue on Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'disable_delivery',
      description: 'Disable delivery of messages in a specified queue on Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          queue_name: {
            type: 'string',
            description: 'The name of the specific queue.'
          },
          sessionId: {
            type: 'string',
            description: 'The session ID for authorization.'
          },
          clientId: {
            type: 'string',
            description: 'The client ID for identifying the request.'
          }
        },
        required: ['queue_name', 'sessionId', 'clientId']
      }
    }
  }
};

export { apiTool };