/**
 * Function to build a production vault in Veeva Vault.
 *
 * @param {Object} args - Arguments for building the production vault.
 * @param {string} args.source - The name of the source vault to build.
 * @returns {Promise<Object>} - The result of the build production vault request.
 */
const executeFunction = async ({ source }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    const url = `https://${vaultDNS}/api/${version}/objects/sandbox/actions/buildproduction`;

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-VaultAPI-ClientID': clientId
    };

    // Set up the body for the request
    const body = new URLSearchParams();
    body.append('source', source);

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: body.toString()
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
    console.error('Error building production vault:', error);
    return {
      error: `An error occurred while building the production vault: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for building a production vault in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'build_production_vault',
      description: 'Build a production vault in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          source: {
            type: 'string',
            description: 'The name of the source vault to build.'
          }
        },
        required: ['source']
      }
    }
  }
};

export { apiTool };