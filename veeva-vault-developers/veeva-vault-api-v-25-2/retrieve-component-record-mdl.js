/**
 * Function to retrieve a component record from Veeva Vault as MDL.
 *
 * @param {Object} args - Arguments for the retrieval.
 * @param {string} args.componentTypeAndRecordName - The component type name followed by the name of the record (e.g., `Picklist.color__c`).
 * @returns {Promise<Object>} - The result of the component record retrieval.
 */
const executeFunction = async ({ componentTypeAndRecordName }) => {
  const vaultDNS = ''; // will be provided by the user
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL with the component type and record name
    const url = `https://${vaultDNS}/api/mdl/components/${componentTypeAndRecordName}`;

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
    console.error('Error retrieving component record:', error);
    return {
      error: `An error occurred while retrieving the component record: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a component record from Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_component_record_mdl',
      description: 'Retrieve a component record from Veeva Vault as MDL.',
      parameters: {
        type: 'object',
        properties: {
          componentTypeAndRecordName: {
            type: 'string',
            description: 'The component type name followed by the name of the record (e.g., `Picklist.color__c`).'
          }
        },
        required: ['componentTypeAndRecordName']
      }
    }
  }
};

export { apiTool };