/**
 * Function to update the current user in Veeva Vault using SCIM.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.sessionId - The session ID for authorization.
 * @param {string} args.clientId - The client ID for identifying the request.
 * @param {Object} args.userData - The user data to update.
 * @param {string} args.userData.familyName - The family name of the user.
 * @param {string} args.userData.givenName - The given name of the user.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ sessionId, clientId, userData }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const url = `https://${vaultDNS}/api/${version}/scim/v2/Me`;
  
  const payload = {
    schemas: [
      "urn:ietf:params:scim:schemas:extension:veevavault:2.0:User",
      "urn:ietf:params:scim:schemas:core:2.0:User"
    ],
    name: {
      familyName: userData.familyName,
      givenName: userData.givenName
    }
  };

  try {
    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/scim+json',
      'Content-Type': 'application/scim+json',
      'X-VaultAPI-ClientID': clientId
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload)
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
 * Tool configuration for updating the current user in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_current_user',
      description: 'Update the currently authenticated user with SCIM.',
      parameters: {
        type: 'object',
        properties: {
          sessionId: {
            type: 'string',
            description: 'The session ID for authorization.'
          },
          clientId: {
            type: 'string',
            description: 'The client ID for identifying the request.'
          },
          userData: {
            type: 'object',
            properties: {
              familyName: {
                type: 'string',
                description: 'The family name of the user.'
              },
              givenName: {
                type: 'string',
                description: 'The given name of the user.'
              }
            },
            required: ['familyName', 'givenName']
          }
        },
        required: ['sessionId', 'clientId', 'userData']
      }
    }
  }
};

export { apiTool };