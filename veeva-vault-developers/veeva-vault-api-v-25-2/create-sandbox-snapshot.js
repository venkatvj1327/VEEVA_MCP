/**
 * Function to create a sandbox snapshot in Veeva Vault.
 *
 * @param {Object} args - Arguments for creating the snapshot.
 * @param {string} args.source_sandbox - The name of the sandbox Vault to take a snapshot of.
 * @param {string} args.name - The name of the new snapshot.
 * @param {string} [args.description] - The description of the new snapshot.
 * @param {boolean} [args.include_data=false] - Set to true to include data as part of the snapshot.
 * @returns {Promise<Object>} - The result of the snapshot creation.
 */
const executeFunction = async ({ source_sandbox, name, description = '', include_data = false }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  const url = `https://${vaultDNS}/api/${version}/objects/sandbox/snapshot`;

  // Prepare the form data
  const formData = new URLSearchParams();
  formData.append('source_sandbox', source_sandbox);
  formData.append('name', name);
  if (description) formData.append('description', description);
  formData.append('include_data', include_data.toString());

  // Set up headers for the request
  const headers = {
    'Authorization': sessionId,
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-VaultAPI-ClientID': clientId
  };

  try {
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
    console.error('Error creating sandbox snapshot:', error);
    return {
      error: `An error occurred while creating the sandbox snapshot: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a sandbox snapshot in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_sandbox_snapshot',
      description: 'Create a new snapshot for the indicated sandbox Vault.',
      parameters: {
        type: 'object',
        properties: {
          source_sandbox: {
            type: 'string',
            description: 'The name of the sandbox Vault to take a snapshot of.'
          },
          name: {
            type: 'string',
            description: 'The name of the new snapshot.'
          },
          description: {
            type: 'string',
            description: 'The description of the new snapshot.'
          },
          include_data: {
            type: 'boolean',
            description: 'Set to true to include data as part of the snapshot.'
          }
        },
        required: ['source_sandbox', 'name']
      }
    }
  }
};

export { apiTool };