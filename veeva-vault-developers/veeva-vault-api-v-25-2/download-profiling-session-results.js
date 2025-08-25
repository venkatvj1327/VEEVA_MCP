/**
 * Function to download profiling session results from Veeva Vault.
 *
 * @param {Object} args - Arguments for the download.
 * @param {string} args.session_name - The name of the profiling session.
 * @param {string} args.vaultDNS - The DNS of the Veeva Vault.
 * @param {string} args.version - The API version to use.
 * @param {string} args.sessionId - The session ID for authorization.
 * @param {string} args.clientId - The client ID for the request.
 * @returns {Promise<Buffer>} - The binary data of the downloaded file.
 */
const executeFunction = async ({ session_name, vaultDNS, version, sessionId, clientId }) => {
  const url = `https://${vaultDNS}/api/${version}/code/profiler/${session_name}/results`;
  
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
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Return the response as a buffer (binary data)
    const data = await response.buffer();
    return data;
  } catch (error) {
    console.error('Error downloading profiling session results:', error);
    throw new Error(`An error occurred while downloading profiling session results: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
  }
};

/**
 * Tool configuration for downloading profiling session results from Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'download_profiling_session_results',
      description: 'Download the Profiler Log for a specific profiling session.',
      parameters: {
        type: 'object',
        properties: {
          session_name: {
            type: 'string',
            description: 'The name of the session, for example, baseline__c.'
          },
          vaultDNS: {
            type: 'string',
            description: 'The DNS of the Veeva Vault.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          sessionId: {
            type: 'string',
            description: 'The session ID for authorization.'
          },
          clientId: {
            type: 'string',
            description: 'The client ID for the request.'
          }
        },
        required: ['session_name', 'vaultDNS', 'version', 'sessionId', 'clientId']
      }
    }
  }
};

export { apiTool };