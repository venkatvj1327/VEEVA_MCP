/**
 * Function to cancel a deployment of configuration changes to a raw object in Veeva Vault.
 *
 * @param {Object} args - Arguments for the cancellation.
 * @param {string} args.object_name - The name of the raw object for which to cancel the deployment.
 * @returns {Promise<Object>} - The result of the cancellation request.
 */
const executeFunction = async ({ object_name }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL for the request
    const url = `https://${vaultDNS}/api/${version}/metadata/vobjects/${object_name}/actions/canceldeployment`;

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
    console.error('Error canceling deployment:', error);
    return {
      error: `An error occurred while canceling the deployment: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for canceling raw object deployment in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'cancel_raw_object_deployment',
      description: 'Cancel a deployment of configuration changes to a raw object in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          object_name: {
            type: 'string',
            description: 'The name of the raw object for which to cancel the deployment.'
          }
        },
        required: ['object_name']
      }
    }
  }
};

export { apiTool };