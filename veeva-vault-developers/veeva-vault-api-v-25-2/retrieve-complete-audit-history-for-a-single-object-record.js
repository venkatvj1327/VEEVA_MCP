/**
 * Function to retrieve the complete audit history for a single object record in Veeva Vault.
 *
 * @param {Object} args - Arguments for the audit history retrieval.
 * @param {string} args.object_name - The object name__v field value.
 * @param {string} args.object_record_id - The object record id field value from which to retrieve user actions.
 * @param {string} [args.start_date] - Specify a start date to retrieve audit history in YYYY-MM-DDTHH:MM:SSZ format.
 * @param {string} [args.end_date] - Specify an end date to retrieve audit history in YYYY-MM-DDTHH:MM:SSZ format.
 * @param {string} [args.format_result] - To request a CSV file of your audit history, use 'csv'.
 * @param {number} [args.limit] - Maximum number of histories per page in the response (1-1000).
 * @param {number} [args.offset] - Amount of offset from the entry returned for pagination.
 * @param {string} [args.events] - Comma-separated list of one or more audit events to retrieve their audit history.
 * @returns {Promise<Object>} - The result of the audit history retrieval.
 */
const executeFunction = async ({ object_name, object_record_id, start_date, end_date, format_result, limit, offset, events }) => {
  const vaultDNS = ''; // will be provided by the user
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user
  const version = '25.2'; // API version

  try {
    // Construct the URL with path variables and query parameters
    const url = new URL(`https://${vaultDNS}/api/${version}/vobjects/${object_name}/${object_record_id}/audittrail`);
    if (start_date) url.searchParams.append('start_date', start_date);
    if (end_date) url.searchParams.append('end_date', end_date);
    if (format_result) url.searchParams.append('format_result', format_result);
    if (limit) url.searchParams.append('limit', limit.toString());
    if (offset) url.searchParams.append('offset', offset.toString());
    if (events) url.searchParams.append('events', events);

    // Set up headers for the request
    const headers = {
      'Authorization': sessionId,
      'Accept': 'application/json',
      'X-VaultAPI-ClientID': clientId
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error retrieving audit history:', error);
    return {
      error: `An error occurred while retrieving audit history: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving audit history in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_audit_history',
      description: 'Retrieve complete audit history for a single object record in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          object_name: {
            type: 'string',
            description: 'The object name__v field value.'
          },
          object_record_id: {
            type: 'string',
            description: 'The object record id field value from which to retrieve user actions.'
          },
          start_date: {
            type: 'string',
            description: 'Specify a start date to retrieve audit history in YYYY-MM-DDTHH:MM:SSZ format.'
          },
          end_date: {
            type: 'string',
            description: 'Specify an end date to retrieve audit history in YYYY-MM-DDTHH:MM:SSZ format.'
          },
          format_result: {
            type: 'string',
            description: 'To request a CSV file of your audit history, use "csv".'
          },
          limit: {
            type: 'integer',
            description: 'Maximum number of histories per page in the response (1-1000).'
          },
          offset: {
            type: 'integer',
            description: 'Amount of offset from the entry returned for pagination.'
          },
          events: {
            type: 'string',
            description: 'Comma-separated list of one or more audit events to retrieve their audit history.'
          }
        },
        required: ['object_name', 'object_record_id']
      }
    }
  }
};

export { apiTool };