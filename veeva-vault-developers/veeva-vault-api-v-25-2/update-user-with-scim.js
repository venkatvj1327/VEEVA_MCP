/**
 * Function to update a user in Veeva Vault using SCIM.
 *
 * @param {Object} args - Arguments for the user update.
 * @param {string} args.id - The ID of the user to update.
 * @param {string} args.sessionId - The session ID for authorization.
 * @param {string} args.clientId - The client ID for the request.
 * @param {Object} args.userData - The user data to update.
 * @returns {Promise<Object>} - The result of the user update.
 */
const executeFunction = async ({ id, sessionId, clientId, userData }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const url = `https://${vaultDNS}/api/${version}/scim/v2/Users/${id}`;
  
  const headers = {
    'Authorization': sessionId,
    'Accept': 'application/scim+json',
    'Content-Type': 'application/scim+json',
    'X-VaultAPI-ClientID': clientId
  };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(userData)
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
    console.error('Error updating user:', error);
    return {
      error: `An error occurred while updating the user: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for updating a user in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_user',
      description: 'Update a user in Veeva Vault using SCIM.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The ID of the user to update.'
          },
          sessionId: {
            type: 'string',
            description: 'The session ID for authorization.'
          },
          clientId: {
            type: 'string',
            description: 'The client ID for the request.'
          },
          userData: {
            type: 'object',
            description: 'The user data to update.'
          }
        },
        required: ['id', 'sessionId', 'clientId', 'userData']
      }
    }
  }
};

export { apiTool };