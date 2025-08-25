/**
 * Function to retrieve audit details from Veeva Vault.
 *
 * @param {Object} args - Arguments for the audit retrieval.
 * @param {string} args.audit_trail_type - The type of audit trail to retrieve (e.g., document_audit_trail, object_audit_trail).
 * @param {string} [args.start_date] - Specify a start date to retrieve audit information (YYYY-MM-DDTHH:MM:SSZ format).
 * @param {string} [args.end_date] - Specify an end date to retrieve audit information (YYYY-MM-DDTHH:MM:SSZ format).
 * @param {boolean} [args.all_dates] - Set to true to request audit information for all dates.
 * @param {string} [args.format_result] - To request a downloadable CSV file of your audit details, use 'csv'.
 * @param {number} [args.limit] - Paginate the results by specifying the maximum number of histories per page.
 * @param {number} [args.offset] - Specify the amount of offset from the entry returned for pagination.
 * @param {string} [args.objects] - A comma-separated list of object names to retrieve their audit details.
 * @param {string} [args.events] - A comma-separated list of audit events to retrieve their audit details.
 * @returns {Promise<Object>} - The result of the audit details retrieval.
 */
const executeFunction = async ({ audit_trail_type, start_date, end_date, all_dates, format_result, limit, offset, objects, events }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  try {
    // Construct the URL with path variable
    const url = new URL(`https://${vaultDNS}/api/${version}/audittrail/${audit_trail_type}`);

    // Set up query parameters if provided
    const params = new URLSearchParams();
    if (start_date) params.append('start_date', start_date);
    if (end_date) params.append('end_date', end_date);
    if (all_dates) params.append('all_dates', all_dates);
    if (format_result) params.append('format_result', format_result);
    if (limit) params.append('limit', limit);
    if (offset) params.append('offset', offset);
    if (objects) params.append('objects', objects);
    if (events) params.append('events', events);

    // Append query parameters to the URL
    url.search = params.toString();

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
    console.error('Error retrieving audit details:', error);
    return {
      error: `An error occurred while retrieving audit details: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving audit details from Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_audit_details',
      description: 'Retrieve audit details from Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          audit_trail_type: {
            type: 'string',
            description: 'The type of audit trail to retrieve.'
          },
          start_date: {
            type: 'string',
            description: 'Specify a start date to retrieve audit information.'
          },
          end_date: {
            type: 'string',
            description: 'Specify an end date to retrieve audit information.'
          },
          all_dates: {
            type: 'boolean',
            description: 'Set to true to request audit information for all dates.'
          },
          format_result: {
            type: 'string',
            description: 'To request a downloadable CSV file of your audit details.'
          },
          limit: {
            type: 'integer',
            description: 'Paginate the results by specifying the maximum number of histories per page.'
          },
          offset: {
            type: 'integer',
            description: 'Specify the amount of offset from the entry returned for pagination.'
          },
          objects: {
            type: 'string',
            description: 'A comma-separated list of object names to retrieve their audit details.'
          },
          events: {
            type: 'string',
            description: 'A comma-separated list of audit events to retrieve their audit details.'
          }
        },
        required: ['audit_trail_type']
      }
    }
  }
};

export { apiTool };