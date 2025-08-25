/**
 * Function to retrieve all SCIM resource types from Veeva Vault API.
 *
 * @returns {Promise<Object>} - The result of the SCIM resource types retrieval.
 */
const executeFunction = async () => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL for the API request
    const url = `https://${vaultDNS}/api/${version}/scim/v2/ResourceTypes`;

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/scim+json',
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
    console.error('Error retrieving SCIM resource types:', error);
    return {
      error: `An error occurred while retrieving SCIM resource types: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving SCIM resource types from Veeva Vault API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_scim_resource_types',
      description: 'Retrieve all SCIM resource types from Veeva Vault API.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };