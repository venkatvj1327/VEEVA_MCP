/**
 * Function to retrieve a single user with SCIM from Veeva Vault.
 *
 * @param {Object} args - Arguments for the user retrieval.
 * @param {string} args.id - The ID of the user to retrieve.
 * @param {string} [args.filter] - Optional: Filter for a specific attribute value.
 * @param {string} [args.attributes] - Optional: Include specified attributes only.
 * @param {string} [args.excludedAttributes] - Optional: Exclude specific attributes from the response.
 * @returns {Promise<Object>} - The result of the user retrieval.
 */
const executeFunction = async ({ id, filter, attributes, excludedAttributes }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL for the request
    const url = new URL(`https://${vaultDNS}/api/${version}/scim/v2/Users/${id}`);

    // Set up query parameters if provided
    const params = new URLSearchParams();
    if (filter) params.append('filter', filter);
    if (attributes) params.append('attributes', attributes);
    if (excludedAttributes) params.append('excludedAttributes', excludedAttributes);
    if (params.toString()) url.search = params.toString();

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/scim+json',
      'X-VaultAPI-ClientID': clientId
    };

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
    console.error('Error retrieving user:', error);
    return {
      error: `An error occurred while retrieving the user: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a single user with SCIM from Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_single_user',
      description: 'Retrieve a specific user with SCIM from Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The ID of the user to retrieve.'
          },
          filter: {
            type: 'string',
            description: 'Optional: Filter for a specific attribute value.'
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
        required: ['id']
      }
    }
  }
};

export { apiTool };