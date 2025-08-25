/**
 * Function to reset a specific queue in Veeva Vault.
 *
 * @param {Object} args - Arguments for the reset queue operation.
 * @param {string} args.queue_name - The name of the specific queue to reset.
 * @param {string} args.sessionId - The session ID for authorization.
 * @param {string} args.clientId - The client ID for identifying the request.
 * @param {string} args.vaultDNS - The DNS of the Veeva Vault.
 * @param {string} args.version - The API version to use.
 * @returns {Promise<Object>} - The result of the reset queue operation.
 */
const executeFunction = async ({ queue_name, sessionId, clientId, vaultDNS, version }) => {
  const baseUrl = `https://${vaultDNS}/api/${version}/services/queues/${queue_name}/actions/reset`;
  
  try {
    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/json',
      'X-VaultAPI-ClientID': clientId
    };

    // Perform the fetch request
    const response = await fetch(baseUrl, {
      method: 'PUT',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Return the response data
    return await response.json();
  } catch (error) {
    console.error('Error resetting the queue:', error);
    return {
      error: `An error occurred while resetting the queue: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for resetting a queue in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'reset_queue',
      description: 'Reset a specific queue in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          queue_name: {
            type: 'string',
            description: 'The name of the specific queue to reset.'
          },
          sessionId: {
            type: 'string',
            description: 'The session ID for authorization.'
          },
          clientId: {
            type: 'string',
            description: 'The client ID for identifying the request.'
          },
          vaultDNS: {
            type: 'string',
            description: 'The DNS of the Veeva Vault.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          }
        },
        required: ['queue_name', 'sessionId', 'clientId', 'vaultDNS', 'version']
      }
    }
  }
};

export { apiTool };