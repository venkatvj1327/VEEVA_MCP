/**
 * Function to retrieve a component record from Veeva Vault.
 *
 * @param {Object} args - Arguments for the retrieval.
 * @param {string} args.componentTypeAndRecordName - The component type name followed by the name of the record (e.g., `Picklist.color__c`).
 * @param {boolean} [args.loc=false] - When localized strings are available, set to true to retrieve them.
 * @returns {Promise<Object>} - The metadata of the specified component record.
 */
const executeFunction = async ({ componentTypeAndRecordName, loc = false }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL
    const url = `https://${vaultDNS}/api/${version}/configuration/${componentTypeAndRecordName}`;
    
    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/json',
      'X-VaultAPI-ClientID': clientId
    };

    // Add query parameters if needed
    const queryParams = new URLSearchParams();
    if (loc) {
      queryParams.append('loc', 'true');
    }

    // Perform the fetch request
    const response = await fetch(`${url}?${queryParams.toString()}`, {
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
    console.error('Error retrieving component record:', error);
    return {
      error: `An error occurred while retrieving the component record: ${error instanceof Error ? error.message : JSON.stringify(error)}`
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
      name: 'retrieve_component_record',
      description: 'Retrieve metadata of a specific component record from Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          componentTypeAndRecordName: {
            type: 'string',
            description: 'The component type name followed by the name of the record (e.g., `Picklist.color__c`).'
          },
          loc: {
            type: 'boolean',
            description: 'When localized strings are available, set to true to retrieve them.'
          }
        },
        required: ['componentTypeAndRecordName']
      }
    }
  }
};

export { apiTool };