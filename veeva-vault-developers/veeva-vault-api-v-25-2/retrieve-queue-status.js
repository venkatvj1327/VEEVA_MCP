/**
 * Function to retrieve the status of a specific queue from Veeva Vault API.
 *
 * @param {Object} args - Arguments for the queue status retrieval.
 * @param {string} args.queue_name - The name of the specific queue to retrieve status for.
 * @returns {Promise<Object>} - The status of the specified queue.
 */
const executeFunction = async ({ queue_name }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user
  
  try {
    // Construct the URL for the request
    const url = `https://${vaultDNS}/api/${version}/services/queues/${queue_name}`;

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
    console.error('Error retrieving queue status:', error);
    return {
      error: `An error occurred while retrieving queue status: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving queue status from Veeva Vault API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_queue_status',
      description: 'Retrieve the status of a specific queue from Veeva Vault API.',
      parameters: {
        type: 'object',
        properties: {
          queue_name: {
            type: 'string',
            description: 'The name of the specific queue to retrieve status for.'
          }
        },
        required: ['queue_name']
      }
    }
  }
};

export { apiTool };