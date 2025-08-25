/**
 * Function to upload a content file to Veeva Vault.
 *
 * @param {Object} args - Arguments for the file upload.
 * @param {File} args.file - The file to be uploaded.
 * @param {string} args.sessionId - The session ID for authorization.
 * @param {string} args.clientId - The client ID for identifying the request.
 * @param {string} args.vaultDNS - The DNS of the Veeva Vault instance.
 * @returns {Promise<Object>} - The result of the file upload.
 */
const executeFunction = async ({ file, sessionId, clientId, vaultDNS }) => {
  const url = `https://${vaultDNS}/api/mdl/files`;
  const formData = new FormData();
  formData.append('file', file);

  try {
    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/json',
      'X-VaultAPI-ClientID': clientId
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData
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
    console.error('Error uploading file:', error);
    return {
      error: `An error occurred while uploading the file: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for uploading a content file to Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'upload_content_file',
      description: 'Upload a content file to Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            description: 'The file to be uploaded.'
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
            description: 'The DNS of the Veeva Vault instance.'
          }
        },
        required: ['file', 'sessionId', 'clientId', 'vaultDNS']
      }
    }
  }
};

export { apiTool };