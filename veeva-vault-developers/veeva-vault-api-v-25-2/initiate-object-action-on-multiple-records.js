/**
 * Function to initiate an object action on multiple records in Veeva Vault.
 *
 * @param {Object} args - Arguments for the action initiation.
 * @param {string} args.object_name - The name of the object.
 * @param {string} args.action_name - The action to initiate on the object.
 * @param {string} args.ids - Comma separated list of object record ids on which to initiate the action.
 * @returns {Promise<Object>} - The result of the action initiation.
 */
const executeFunction = async ({ object_name, action_name, ids }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL for the request
    const url = `https://${vaultDNS}/api/${version}/vobjects/${object_name}/actions/${action_name}`;

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'X-VaultAPI-ClientID': clientId
    };

    // Prepare the body data
    const body = new URLSearchParams();
    body.append('ids', ids);

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: body.toString()
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
    console.error('Error initiating object action:', error);
    return {
      error: `An error occurred while initiating the object action: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for initiating object actions on multiple records in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'initiate_object_action',
      description: 'Initiate an object action on multiple records in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          object_name: {
            type: 'string',
            description: 'The name of the object.'
          },
          action_name: {
            type: 'string',
            description: 'The action to initiate on the object.'
          },
          ids: {
            type: 'string',
            description: 'Comma separated list of object record ids on which to initiate the action.'
          }
        },
        required: ['object_name', 'action_name', 'ids']
      }
    }
  }
};

export { apiTool };