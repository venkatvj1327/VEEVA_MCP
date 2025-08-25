/**
 * Function to promote a pre-production vault to a production vault in Veeva Vault.
 *
 * @param {Object} args - Arguments for the promotion.
 * @param {string} args.name - The name of the pre-production vault to promote.
 * @returns {Promise<Object>} - The result of the promotion request.
 */
const executeFunction = async ({ name }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL for the promotion request
    const url = `https://${vaultDNS}/api/${version}/objects/sandbox/actions/promoteproduction`;

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-VaultAPI-ClientID': clientId
    };

    // Prepare the body data
    const body = new URLSearchParams();
    body.append('name', name);

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
    console.error('Error promoting vault to production:', error);
    return {
      error: `An error occurred while promoting the vault: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for promoting a vault to production in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'promote_to_production',
      description: 'Promote a pre-production vault to a production vault in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the pre-production vault to promote.'
          }
        },
        required: ['name']
      }
    }
  }
};

export { apiTool };