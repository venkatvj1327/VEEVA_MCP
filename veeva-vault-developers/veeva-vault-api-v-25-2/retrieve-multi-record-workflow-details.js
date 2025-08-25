/**
 * Function to retrieve multi-record workflow details from Veeva Vault API.
 *
 * @param {Object} args - Arguments for the workflow retrieval.
 * @param {string} args.workflow_name - The name of the multi-record workflow to retrieve details for.
 * @param {string} args.sessionId - The session ID for authorization.
 * @param {string} args.clientId - The client ID for identifying the request.
 * @returns {Promise<Object>} - The details of the multi-record workflow.
 */
const executeFunction = async ({ workflow_name, sessionId, clientId }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  try {
    // Construct the URL for the request
    const url = `https://${vaultDNS}/api/${version}/objects/objectworkflows/actions/${workflow_name}`;

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
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
    console.error('Error retrieving multi-record workflow details:', error);
    return {
      error: `An error occurred while retrieving multi-record workflow details: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving multi-record workflow details from Veeva Vault API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_multi_record_workflow_details',
      description: 'Retrieve details of a specific multi-record workflow from Veeva Vault API.',
      parameters: {
        type: 'object',
        properties: {
          workflow_name: {
            type: 'string',
            description: 'The name of the multi-record workflow to retrieve details for.'
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
        required: ['workflow_name', 'sessionId', 'clientId']
      }
    }
  }
};

export { apiTool };