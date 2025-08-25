/**
 * Function to retrieve picklist values from Veeva Vault.
 *
 * @param {Object} args - Arguments for the picklist retrieval.
 * @param {string} args.picklist_name - The name of the picklist to retrieve values for.
 * @returns {Promise<Object>} - The result of the picklist retrieval.
 */
const executeFunction = async ({ picklist_name }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL for the request
    const url = `https://${vaultDNS}/api/${version}/objects/picklists/${picklist_name}`;

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/json',
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
    console.error('Error retrieving picklist values:', error);
    return {
      error: `An error occurred while retrieving picklist values: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving picklist values from Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_picklist_values',
      description: 'Retrieve all available values configured on a picklist.',
      parameters: {
        type: 'object',
        properties: {
          picklist_name: {
            type: 'string',
            description: 'The picklist name field value (license_type__v, product_family__c, region__c, etc.).'
          }
        },
        required: ['picklist_name']
      }
    }
  }
};

export { apiTool };