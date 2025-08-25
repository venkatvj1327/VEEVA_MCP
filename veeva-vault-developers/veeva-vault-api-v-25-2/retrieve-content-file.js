/**
 * Function to retrieve the content file of a specified component from Veeva Vault.
 *
 * @param {Object} args - Arguments for the content file retrieval.
 * @param {string} args.component_type_and_record_name - The component type and record name in the format `{Componenttype}.{record_name}`.
 * @returns {Promise<Object>} - The result of the content file retrieval.
 */
const executeFunction = async ({ component_type_and_record_name }) => {
  const vaultDNS = ''; // will be provided by the user
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL for the request
    const url = `https://${vaultDNS}/api/mdl/components/${component_type_and_record_name}/files`;

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
    console.error('Error retrieving content file:', error);
    return {
      error: `An error occurred while retrieving the content file: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving content files from Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_content_file',
      description: 'Retrieve the content file of a specified component from Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          component_type_and_record_name: {
            type: 'string',
            description: 'The component type and record name in the format `{Componenttype}.{record_name}`.'
          }
        },
        required: ['component_type_and_record_name']
      }
    }
  }
};

export { apiTool };