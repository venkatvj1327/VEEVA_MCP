/**
 * Function to create a profiling session in Veeva Vault.
 *
 * @param {Object} args - Arguments for creating the profiling session.
 * @param {string} args.label - The UI label for this request.
 * @param {string} [args.user_id=null] - The user ID of the user to associate with this session. Defaults to null.
 * @param {string} [args.description=null] - An Admin-facing description of the session. Defaults to null.
 * @returns {Promise<Object>} - The result of the profiling session creation.
 */
const executeFunction = async ({ label, user_id = null, description = null }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    const url = `https://${vaultDNS}/api/${version}/code/profiler`;

    // Prepare the request body
    const body = new URLSearchParams();
    body.append('label', label);
    if (user_id) body.append('user_id', user_id);
    if (description) body.append('description', description);

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'X-VaultAPI-ClientID': clientId
    };

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
    console.error('Error creating profiling session:', error);
    return {
      error: `An error occurred while creating the profiling session: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a profiling session in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_profiling_session',
      description: 'Create a new SDK request profiling session in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          label: {
            type: 'string',
            description: 'The UI label for this request.'
          },
          user_id: {
            type: 'string',
            description: 'The user ID of the user to associate with this session.'
          },
          description: {
            type: 'string',
            description: 'An Admin-facing description of the session.'
          }
        },
        required: ['label']
      }
    }
  }
};

export { apiTool };