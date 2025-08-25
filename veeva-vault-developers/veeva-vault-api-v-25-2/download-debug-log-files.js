/**
 * Function to download debug log files from Veeva Vault.
 *
 * @param {Object} args - Arguments for the download.
 * @param {string} args.id - The ID of the debug log to download.
 * @param {string} args.sessionId - The session ID for authorization.
 * @param {string} args.clientId - The client ID for the request.
 * @param {string} args.vaultDNS - The DNS for the Veeva Vault instance.
 * @param {string} args.version - The API version to use.
 * @returns {Promise<Buffer>} - The downloaded debug log files as a ZIP buffer.
 */
const executeFunction = async ({ id, sessionId, clientId, vaultDNS, version }) => {
  const url = `https://${vaultDNS}/api/${version}/logs/code/debug/${id}/files`;
  
  // Set up headers for the request
  const headers = {
    'Authorization': sessionId,
    'Accept': 'application/json',
    'X-VaultAPI-ClientID': clientId
  };

  try {
    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`Failed to download debug log files: ${response.statusText}`);
    }

    // Return the response as a buffer
    const data = await response.buffer();
    return data;
  } catch (error) {
    console.error('Error downloading debug log files:', error);
    throw new Error(`An error occurred while downloading debug log files: ${error.message}`);
  }
};

/**
 * Tool configuration for downloading debug log files from Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'download_debug_log_files',
      description: 'Download debug log files from Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The ID of the debug log to download.'
          },
          sessionId: {
            type: 'string',
            description: 'The session ID for authorization.'
          },
          clientId: {
            type: 'string',
            description: 'The client ID for the request.'
          },
          vaultDNS: {
            type: 'string',
            description: 'The DNS for the Veeva Vault instance.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          }
        },
        required: ['id', 'sessionId', 'clientId', 'vaultDNS', 'version']
      }
    }
  }
};

export { apiTool };