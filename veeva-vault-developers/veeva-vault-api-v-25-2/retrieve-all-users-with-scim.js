/**
 * Function to retrieve all users with SCIM from Veeva Vault.
 *
 * @param {Object} args - Arguments for the user retrieval.
 * @param {string} args.vaultDNS - The DNS of the Veeva Vault.
 * @param {string} args.version - The API version to use.
 * @param {string} [args.filter] - Optional: Filter for a specific attribute value.
 * @param {string} [args.attributes] - Optional: Include specified attributes only.
 * @param {string} [args.excludedAttributes] - Optional: Exclude specific attributes from the response.
 * @param {string} [args.sortBy] - Optional: Specify an attribute to order the response.
 * @param {string} [args.sortOrder] - Optional: Specify the order in which the sortBy parameter is applied.
 * @param {number} [args.count] - Optional: Specify the number of query results per page.
 * @param {number} [args.startIndex] - Optional: Specify the index of the first result.
 * @returns {Promise<Object>} - The result of the user retrieval.
 */
const executeFunction = async ({ vaultDNS, version, filter, attributes, excludedAttributes, sortBy, sortOrder, count, startIndex }) => {
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user
  const baseUrl = `https://${vaultDNS}/api/${version}/scim/v2/Users`;
  
  try {
    // Construct the URL with query parameters
    const url = new URL(baseUrl);
    if (filter) url.searchParams.append('filter', filter);
    if (attributes) url.searchParams.append('attributes', attributes);
    if (excludedAttributes) url.searchParams.append('excludedAttributes', excludedAttributes);
    if (sortBy) url.searchParams.append('sortBy', sortBy);
    if (sortOrder) url.searchParams.append('sortOrder', sortOrder);
    if (count) url.searchParams.append('count', count.toString());
    if (startIndex) url.searchParams.append('startIndex', startIndex.toString());

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
    console.error('Error retrieving users:', error);
    return {
      error: `An error occurred while retrieving users: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving all users with SCIM from Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_all_users',
      description: 'Retrieve all users with SCIM from Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          vaultDNS: {
            type: 'string',
            description: 'The DNS of the Veeva Vault.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
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
          },
          sortBy: {
            type: 'string',
            description: 'Optional: Specify an attribute to order the response.'
          },
          sortOrder: {
            type: 'string',
            enum: ['ascending', 'descending'],
            description: 'Optional: Specify the order in which the sortBy parameter is applied.'
          },
          count: {
            type: 'integer',
            description: 'Optional: Specify the number of query results per page.'
          },
          startIndex: {
            type: 'integer',
            description: 'Optional: Specify the index of the first result.'
          }
        },
        required: ['vaultDNS', 'version']
      }
    }
  }
};

export { apiTool };