/**
 * Function to update the label of a picklist value in Veeva Vault.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.picklist_name - The name of the picklist to update.
 * @param {string} args.sessionId - The session ID for authorization.
 * @param {string} args.clientId - The client ID for the request.
 * @param {Object} args.data - The data to update the picklist value label.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ picklist_name, sessionId, clientId, data }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const url = `https://${vaultDNS}/api/${version}/objects/picklists/${picklist_name}`;

  try {
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
      body: new URLSearchParams(data).toString()
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating picklist value label:', error);
    return {
      error: `An error occurred while updating the picklist value label: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating picklist value labels in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_picklist_value_label',
      description: 'Update the label of a picklist value in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          picklist_name: {
            type: 'string',
            description: 'The name of the picklist to update.'
          },
          sessionId: {
            type: 'string',
            description: 'The session ID for authorization.'
          },
          clientId: {
            type: 'string',
            description: 'The client ID for the request.'
          },
          data: {
            type: 'object',
            description: 'The data to update the picklist value label.'
          }
        },
        required: ['picklist_name', 'sessionId', 'clientId', 'data']
      }
    }
  }
};

export { apiTool };