/**
 * Function to retrieve a single SCIM resource type from Veeva Vault.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.type - The specific resource type to retrieve.
 * @param {string} args.sessionId - The session ID for authorization.
 * @param {string} args.clientId - The client ID for identifying the request.
 * @param {string} args.vaultDNS - The DNS of the Veeva Vault.
 * @param {string} args.version - The API version to use.
 * @returns {Promise<Object>} - The result of the SCIM resource type retrieval.
 */
const executeFunction = async ({ type, sessionId, clientId, vaultDNS, version }) => {
  const baseUrl = `https://${vaultDNS}/api/${version}/scim/v2/ResourceTypes/${type}`;
  
  try {
    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/scim+json',
      'X-VaultAPI-ClientID': clientId
    };

    // Perform the fetch request
    const response = await fetch(baseUrl, {
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
    console.error('Error retrieving SCIM resource type:', error);
    return {
      error: `An error occurred while retrieving the SCIM resource type: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a single SCIM resource type from Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_scim_resource_type',
      description: 'Retrieve a single SCIM resource type from Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: 'The specific resource type to retrieve.'
          },
          sessionId: {
            type: 'string',
            description: 'The session ID for authorization.'
          },
          clientId: {
            type: 'string',
            description: 'The client ID for identifying the request.'
          },
          vaultDNS: {
            type: 'string',
            description: 'The DNS of the Veeva Vault.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          }
        },
        required: ['type', 'sessionId', 'clientId', 'vaultDNS', 'version']
      }
    }
  }
};

export { apiTool };