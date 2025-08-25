/**
 * Function to retrieve user action details for a specific object in Veeva Vault.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.object_name - The object name__v field value.
 * @param {string} args.object_record_id - The object record id field value from which to retrieve user actions.
 * @param {string} args.action_name - The name of the Objectaction or Objectlifecyclestateuseraction to initiate.
 * @returns {Promise<Object>} - The details of the user action.
 */
const executeFunction = async ({ object_name, object_record_id, action_name }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL with path variables
    const url = `https://${vaultDNS}/api/${version}/vobjects/${object_name}/:${object_record_id}/actions/${action_name}`;

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
    console.error('Error retrieving user action details:', error);
    return {
      error: `An error occurred while retrieving user action details: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving user action details in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_object_user_actions_details',
      description: 'Retrieve details for a specific user action in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          object_name: {
            type: 'string',
            description: 'The object name__v field value.'
          },
          object_record_id: {
            type: 'string',
            description: 'The object record id field value from which to retrieve user actions.'
          },
          action_name: {
            type: 'string',
            description: 'The name of the Objectaction or Objectlifecyclestateuseraction to initiate.'
          }
        },
        required: ['object_name', 'object_record_id', 'action_name']
      }
    }
  }
};

export { apiTool };