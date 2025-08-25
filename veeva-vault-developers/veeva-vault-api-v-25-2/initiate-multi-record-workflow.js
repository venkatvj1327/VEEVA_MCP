/**
 * Function to initiate a multi-record workflow in Veeva Vault.
 *
 * @param {Object} args - Arguments for initiating the workflow.
 * @param {string} args.workflow_name - The name of the workflow to initiate.
 * @param {string} args.contents__sys - A comma-separated list of records in the format Object:{objectname}.{record_ID}.
 * @param {string} args.description__sys - Description of the workflow.
 * @param {string} args.sessionId - The session ID for authorization.
 * @param {string} args.clientId - The client ID for the request.
 * @param {string} [args.vaultDNS] - The DNS of the Veeva Vault instance.
 * @param {string} [args.version] - The API version to use.
 * @returns {Promise<Object>} - The result of the workflow initiation.
 */
const executeFunction = async ({ workflow_name, contents__sys, description__sys, sessionId, clientId, vaultDNS, version }) => {
  const baseUrl = `https://${vaultDNS}/api/${version}/objects/objectworkflows/actions/${workflow_name}`;
  const headers = {
    'Authorization': sessionId,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'X-VaultAPI-ClientID': clientId
  };

  // Prepare the request body
  const body = new URLSearchParams();
  body.append('contents__sys', contents__sys);
  body.append('description__sys', description__sys);

  try {
    // Perform the fetch request
    const response = await fetch(baseUrl, {
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
    console.error('Error initiating multi-record workflow:', error);
    return {
      error: `An error occurred while initiating the workflow: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for initiating a multi-record workflow in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'initiate_multi_record_workflow',
      description: 'Initiate a multi-record workflow in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          workflow_name: {
            type: 'string',
            description: 'The name of the workflow to initiate.'
          },
          contents__sys: {
            type: 'string',
            description: 'A comma-separated list of records in the format Object:{objectname}.{record_ID}.'
          },
          description__sys: {
            type: 'string',
            description: 'Description of the workflow.'
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
            description: 'The DNS of the Veeva Vault instance.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          }
        },
        required: ['workflow_name', 'contents__sys', 'description__sys', 'sessionId', 'clientId', 'vaultDNS', 'version']
      }
    }
  }
};

export { apiTool };