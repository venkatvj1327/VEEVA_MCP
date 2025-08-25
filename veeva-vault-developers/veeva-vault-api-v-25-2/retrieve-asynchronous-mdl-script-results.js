/**
 * Function to retrieve asynchronous MDL script results from Veeva Vault.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.job_id - The job ID for which to retrieve results.
 * @returns {Promise<Object>} - The results of the MDL script execution.
 */
const executeFunction = async ({ job_id }) => {
  const vaultDNS = ''; // will be provided by the user
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL with the job_id path variable
    const url = `https://${vaultDNS}/api/mdl/execute_async/${job_id}/results`;

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
    console.error('Error retrieving MDL script results:', error);
    return {
      error: `An error occurred while retrieving MDL script results: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving asynchronous MDL script results from Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_async_mdl_results',
      description: 'Retrieve asynchronous MDL script results from Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          job_id: {
            type: 'string',
            description: 'The job ID for which to retrieve results.'
          }
        },
        required: ['job_id']
      }
    }
  }
};

export { apiTool };