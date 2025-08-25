/**
 * Function to update a picklist value in Veeva Vault.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.picklist_name - The name of the picklist to update.
 * @param {string} args.picklist_value_name - The name of the picklist value to update.
 * @param {string} [args.name] - The new name for the picklist value. Special characters and double underscores __ are not allowed.
 * @param {string} [args.status] - The new status for the picklist value. Valid values are 'active' or 'inactive'.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ picklist_name, picklist_value_name, name, status }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL for the request
    const url = `https://${vaultDNS}/api/${version}/objects/picklists/${picklist_name}/${picklist_value_name}`;

    // Prepare the form data
    const formData = new URLSearchParams();
    if (name) formData.append('name', name);
    if (status) formData.append('status', status);

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-VaultAPI-ClientID': clientId
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
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
    console.error('Error updating picklist value:', error);
    return {
      error: `An error occurred while updating the picklist value: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a picklist value in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_picklist_value',
      description: 'Update a picklist value in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          picklist_name: {
            type: 'string',
            description: 'The name of the picklist to update.'
          },
          picklist_value_name: {
            type: 'string',
            description: 'The name of the picklist value to update.'
          },
          name: {
            type: 'string',
            description: 'The new name for the picklist value. Special characters and double underscores __ are not allowed.'
          },
          status: {
            type: 'string',
            enum: ['active', 'inactive'],
            description: 'The new status for the picklist value.'
          }
        },
        required: ['picklist_name', 'picklist_value_name']
      }
    }
  }
};

export { apiTool };