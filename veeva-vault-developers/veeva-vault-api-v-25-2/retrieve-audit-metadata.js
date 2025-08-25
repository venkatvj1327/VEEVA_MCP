/**
 * Function to retrieve audit metadata from Veeva Vault API.
 *
 * @param {Object} args - Arguments for the retrieval.
 * @param {string} args.audit_trail_type - The name of the specified audit type (document_audit_trail, object_audit_trail, etc).
 * @returns {Promise<Object>} - The metadata for the specified audit trail.
 */
const executeFunction = async ({ audit_trail_type }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL with the specified audit trail type
    const url = `https://${vaultDNS}/api/${version}/metadata/audittrail/${audit_trail_type}`;

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
    console.error('Error retrieving audit metadata:', error);
    return {
      error: `An error occurred while retrieving audit metadata: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving audit metadata from Veeva Vault API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_audit_metadata',
      description: 'Retrieve audit metadata from Veeva Vault API.',
      parameters: {
        type: 'object',
        properties: {
          audit_trail_type: {
            type: 'string',
            description: 'The name of the specified audit type (document_audit_trail, object_audit_trail, etc).'
          }
        },
        required: ['audit_trail_type']
      }
    }
  }
};

export { apiTool };