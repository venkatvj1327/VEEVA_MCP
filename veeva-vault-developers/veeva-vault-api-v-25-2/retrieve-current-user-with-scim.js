/**
 * Function to retrieve the currently authenticated user with SCIM from Veeva Vault.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.sessionId - The session ID for authentication.
 * @param {string} args.clientId - The client ID for identifying the request.
 * @param {string} [args.attributes] - Optional: Include specified attributes only.
 * @param {string} [args.excludedAttributes] - Optional: Exclude specific attributes from the response.
 * @returns {Promise<Object>} - The result of the user retrieval.
 */
const executeFunction = async ({ sessionId, clientId, attributes = '', excludedAttributes = '' }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  try {
    // Construct the URL
    const url = new URL(`https://${vaultDNS}/api/${version}/scim/v2/Me`);

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/scim+json',
      'X-VaultAPI-ClientID': clientId
    };

    // Add query parameters if provided
    const params = new URLSearchParams();
    if (attributes) {
      params.append('attributes', attributes);
    }
    if (excludedAttributes) {
      params.append('excludedAttributes', excludedAttributes);
    }
    if (params.toString()) {
      url.search = params.toString();
    }

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error retrieving current user:', error);
    return {
      error: `An error occurred while retrieving the current user: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving the current user with SCIM from Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_current_user',
      description: 'Retrieve the currently authenticated user with SCIM from Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          sessionId: {
            type: 'string',
            description: 'The session ID for authentication.'
          },
          clientId: {
            type: 'string',
            description: 'The client ID for identifying the request.'
          },
          attributes: {
            type: 'string',
            description: 'Optional: Include specified attributes only.'
          },
          excludedAttributes: {
            type: 'string',
            description: 'Optional: Exclude specific attributes from the response.'
          }
        },
        required: ['sessionId', 'clientId']
      }
    }
  }
};

export { apiTool };