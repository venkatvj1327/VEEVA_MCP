/**
 * Function to create a debug log in Veeva Vault.
 *
 * @param {Object} args - Arguments for creating the debug log.
 * @param {string} args.name - The UI-friendly name for the debug log (max 128 characters).
 * @param {string} args.user_id - The ID of the user who will trigger entries into this debug log.
 * @param {string} [args.log_level='all__sys'] - The level of error messages to capture in this log.
 * @param {string} [args.class_filters] - Class filters to restrict log entries to specific classes.
 * @returns {Promise<Object>} - The result of the debug log creation.
 */
const executeFunction = async ({ name, user_id, log_level = 'all__sys', class_filters }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL
    const url = `https://${vaultDNS}/api/${version}/logs/code/debug`;

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'X-VaultAPI-ClientID': clientId
    };

    // Prepare the form data
    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('user_id', user_id);
    if (log_level) formData.append('log_level', log_level);
    if (class_filters) formData.append('class_filters', class_filters);

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
    console.error('Error creating debug log:', error);
    return {
      error: `An error occurred while creating the debug log: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a debug log in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_debug_log',
      description: 'Create a new debug log session for a user in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The UI-friendly name for the debug log (max 128 characters).'
          },
          user_id: {
            type: 'string',
            description: 'The ID of the user who will trigger entries into this debug log.'
          },
          log_level: {
            type: 'string',
            enum: ['all__sys', 'exception__sys', 'error__sys', 'warn__sys', 'info__sys', 'debug__sys'],
            description: 'The level of error messages to capture in this log.'
          },
          class_filters: {
            type: 'string',
            description: 'Class filters to restrict log entries to specific classes.'
          }
        },
        required: ['name', 'user_id']
      }
    }
  }
};

export { apiTool };