/**
 * Function to retrieve user actions for a specific object record in Veeva Vault.
 *
 * @param {Object} args - Arguments for the retrieval.
 * @param {string} args.object_name - The name of the object.
 * @param {string} args.object_record_id - The ID of the object record.
 * @param {boolean} [args.loc=false] - Optional: When true, retrieves localized (translated) strings for the label.
 * @returns {Promise<Object>} - The result of the user actions retrieval.
 */
const executeFunction = async ({ object_name, object_record_id, loc = false }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user
  
  try {
    // Construct the URL with path variables
    const url = `https://${vaultDNS}/api/${version}/vobjects/${object_name}/${object_record_id}/actions?loc=${loc}`;

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
    console.error('Error retrieving user actions:', error);
    return {
      error: `An error occurred while retrieving user actions: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving user actions on a specific object record in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_object_record_user_actions',
      description: 'Retrieve all available user actions for a specific object record in Veeva Vault.',
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
          loc: {
            type: 'boolean',
            description: 'Optional: When true, retrieves localized (translated) strings for the label.'
          }
        },
        required: ['object_name', 'object_record_id']
      }
    }
  }
};

export { apiTool };