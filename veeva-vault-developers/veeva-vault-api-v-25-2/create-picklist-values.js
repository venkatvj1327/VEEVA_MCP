/**
 * Function to create picklist values in Veeva Vault.
 *
 * @param {Object} args - Arguments for creating picklist values.
 * @param {string} args.picklist_name - The name of the picklist to which values will be added.
 * @param {Array<string>} args.values - An array of values to add to the picklist.
 * @returns {Promise<Object>} - The result of the picklist creation.
 */
const executeFunction = async ({ picklist_name, values }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    const url = `https://${vaultDNS}/api/${version}/objects/picklists/${picklist_name}`;
    
    // Prepare the form data
    const formData = new URLSearchParams();
    values.forEach(value => formData.append('values[]', value));

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-VaultAPI-ClientID': clientId
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData
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
    console.error('Error creating picklist values:', error);
    return {
      error: `An error occurred while creating picklist values: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating picklist values in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_picklist_values',
      description: 'Create new values for a specified picklist in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          picklist_name: {
            type: 'string',
            description: 'The name of the picklist to which values will be added.'
          },
          values: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'An array of values to add to the picklist.'
          }
        },
        required: ['picklist_name', 'values']
      }
    }
  }
};

export { apiTool };