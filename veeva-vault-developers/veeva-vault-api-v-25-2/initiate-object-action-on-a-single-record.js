/**
 * Function to initiate an action on a specific object record in Veeva Vault.
 *
 * @param {Object} args - Arguments for the action initiation.
 * @param {string} args.object_name - The name of the object.
 * @param {string} args.object_record_id - The ID of the object record.
 * @param {string} args.action_name - The name of the action to initiate.
 * @param {string} [args.storyEventkey] - Optional: The ID of the target Story Event object record.
 * @returns {Promise<Object>} - The result of the action initiation.
 */
const executeFunction = async ({ object_name, object_record_id, action_name, storyEventkey }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL for the request
    const url = `https://${vaultDNS}/api/${version}/vobjects/${object_name}/${object_record_id}/actions/${action_name}`;

    // Prepare the request body
    const body = new URLSearchParams();
    if (storyEventkey) {
      body.append('storyEventkey', storyEventkey);
    }

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'X-VaultAPI-ClientID': clientId
    };

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
 * Tool configuration for initiating an action on a specific object record in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'initiate_object_action',
      description: 'Initiate an action on a specific object record in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          object_name: {
            type: 'string',
            description: 'The name of the object.'
          },
          object_record_id: {
            type: 'string',
            description: 'The ID of the object record.'
          },
          action_name: {
            type: 'string',
            description: 'The name of the action to initiate.'
          },
          storyEventkey: {
            type: 'string',
            description: 'Optional: The ID of the target Story Event object record.'
          }
        },
        required: ['object_name', 'object_record_id', 'action_name']
      }
    }
  }
};

export { apiTool };