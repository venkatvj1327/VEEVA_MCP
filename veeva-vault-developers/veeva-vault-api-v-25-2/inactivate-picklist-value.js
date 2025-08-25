/**
 * Function to inactivate a picklist value in Veeva Vault.
 *
 * @param {Object} args - Arguments for inactivating the picklist value.
 * @param {string} args.picklist_name - The name of the picklist to inactivate the value from.
 * @param {string} args.picklist_value_name - The name of the picklist value to be inactivated.
 * @returns {Promise<Object>} - The result of the inactivation request.
 */
const executeFunction = async ({ picklist_name, picklist_value_name }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL for the DELETE request
    const url = `https://${vaultDNS}/api/${version}/objects/picklists/${picklist_name}/${picklist_value_name}`;

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/json',
      'X-VaultAPI-ClientID': clientId
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
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
    console.error('Error inactivating picklist value:', error);
    return {
      error: `An error occurred while inactivating the picklist value: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for inactivating a picklist value in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'inactivate_picklist_value',
      description: 'Inactivate a picklist value in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          picklist_name: {
            type: 'string',
            description: 'The name of the picklist to inactivate the value from.'
          },
          picklist_value_name: {
            type: 'string',
            description: 'The name of the picklist value to be inactivated.'
          }
        },
        required: ['picklist_name', 'picklist_value_name']
      }
    }
  }
};

export { apiTool };