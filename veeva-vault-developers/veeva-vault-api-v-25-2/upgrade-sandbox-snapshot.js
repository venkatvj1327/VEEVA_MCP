/**
 * Function to upgrade a sandbox snapshot in Veeva Vault.
 *
 * @param {Object} args - Arguments for the upgrade.
 * @param {string} args.api_name - The Vault ID of the sandbox to upgrade.
 * @param {string} args.sessionId - The session ID for authorization.
 * @param {string} args.clientId - The client ID for identifying the request.
 * @param {string} args.vaultDNS - The DNS of the Veeva Vault.
 * @param {string} args.version - The API version to use.
 * @returns {Promise<Object>} - The result of the upgrade request.
 */
const executeFunction = async ({ api_name, sessionId, clientId, vaultDNS, version }) => {
  const url = `https://${vaultDNS}/api/${version}/objects/sandbox/snapshot/${api_name}/actions/upgrade`;
  
  const headers = {
    'Authorization': sessionId,
    'Accept': 'application/json',
    'X-VaultAPI-ClientID': clientId
  };

  try {
    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
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
    console.error('Error upgrading sandbox snapshot:', error);
    return {
      error: `An error occurred while upgrading the sandbox snapshot: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for upgrading a sandbox snapshot in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'upgrade_sandbox_snapshot',
      description: 'Upgrade a sandbox snapshot in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          api_name: {
            type: 'string',
            description: 'The Vault ID of the sandbox to upgrade.'
          },
          sessionId: {
            type: 'string',
            description: 'The session ID for authorization.'
          },
          clientId: {
            type: 'string',
            description: 'The client ID for identifying the request.'
          },
          vaultDNS: {
            type: 'string',
            description: 'The DNS of the Veeva Vault.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          }
        },
        required: ['api_name', 'sessionId', 'clientId', 'vaultDNS', 'version']
      }
    }
  }
};

export { apiTool };