/**
 * Function to retrieve all records for a specific component type from Veeva Vault.
 *
 * @param {Object} args - Arguments for the retrieval.
 * @param {string} args.component_type - The type of component to retrieve records for.
 * @param {string} args.sessionId - The session ID for authentication.
 * @param {string} args.clientId - The client ID for identifying the request.
 * @param {string} args.vaultDNS - The DNS of the Veeva Vault.
 * @param {string} args.version - The API version to use.
 * @returns {Promise<Object>} - The result of the component record retrieval.
 */
const executeFunction = async ({ component_type, sessionId, clientId, vaultDNS, version }) => {
  const url = `https://${vaultDNS}/api/${version}/configuration/${component_type}`;
  
  // Set up headers for the request
  const headers = {
    'Authorization': sessionId,
    'Accept': 'application/json',
    'X-VaultAPI-ClientID': clientId
  };

  try {
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
    console.error('Error retrieving component records:', error);
    return {
      error: `An error occurred while retrieving component records: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving component records from Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_component_records',
      description: 'Retrieve all records for a specific component type from Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          component_type: {
            type: 'string',
            description: 'The type of component to retrieve records for.'
          },
          sessionId: {
            type: 'string',
            description: 'The session ID for authentication.'
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
        required: ['component_type', 'sessionId', 'clientId', 'vaultDNS', 'version']
      }
    }
  }
};

export { apiTool };