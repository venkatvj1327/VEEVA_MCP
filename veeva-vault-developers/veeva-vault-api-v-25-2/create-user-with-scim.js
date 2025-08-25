/**
 * Function to create a user with SCIM in Veeva Vault.
 *
 * @param {Object} user - The user details to create.
 * @param {string} user.userName - The username for the user.
 * @param {Array} user.emails - The email addresses associated with the user.
 * @param {Object} user.name - The name of the user.
 * @param {string} user.preferredLanguage - The preferred language of the user.
 * @param {string} user.locale - The locale of the user.
 * @param {string} user.timezone - The timezone of the user.
 * @param {string} user.securityProfile - The security profile for the user.
 * @returns {Promise<Object>} - The result of the user creation.
 */
const executeFunction = async ({ user }) => {
  const vaultDNS = ''; // will be provided by the user
  const version = '25.2'; // API version
  const sessionId = ''; // will be provided by the user
  const clientId = ''; // will be provided by the user

  const url = `https://${vaultDNS}/api/${version}/scim/v2/Users`;

  // Set up headers for the request
  const headers = {
    'Authorization': sessionId,
    'Accept': 'application/scim+json',
    'Content-Type': 'application/scim+json',
    'X-VaultAPI-ClientID': clientId
  };

  // Prepare the request body
  const body = {
    schemas: [
      "urn:ietf:params:scim:schemas:extension:veevavault:2.0:User",
      "urn:ietf:params:scim:schemas:core:2.0:User"
    ],
    userName: user.userName,
    emails: user.emails,
    name: user.name,
    preferredLanguage: user.preferredLanguage,
    locale: user.locale,
    timezone: user.timezone,
    "urn:ietf:params:scim:schemas:extension:veevavault:2.0:User": {
      securityProfile: {
        value: user.securityProfile
      }
    }
  };

  try {
    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
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
    console.error('Error creating user:', error);
    return {
      error: `An error occurred while creating the user: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for creating a user with SCIM in Veeva Vault.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_user_scim',
      description: 'Create a user with SCIM in Veeva Vault.',
      parameters: {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              userName: {
                type: 'string',
                description: 'The username for the user.'
              },
              emails: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    value: {
                      type: 'string',
                      description: 'The email address.'
                    },
                    type: {
                      type: 'string',
                      description: 'The type of email (e.g., work).'
                    }
                  },
                  required: ['value', 'type']
                },
                description: 'The email addresses associated with the user.'
              },
              name: {
                type: 'object',
                properties: {
                  familyName: {
                    type: 'string',
                    description: 'The family name of the user.'
                  },
                  givenName: {
                    type: 'string',
                    description: 'The given name of the user.'
                  }
                },
                required: ['familyName', 'givenName'],
                description: 'The name of the user.'
              },
              preferredLanguage: {
                type: 'string',
                description: 'The preferred language of the user.'
              },
              locale: {
                type: 'string',
                description: 'The locale of the user.'
              },
              timezone: {
                type: 'string',
                description: 'The timezone of the user.'
              },
              securityProfile: {
                type: 'string',
                description: 'The security profile for the user.'
              }
            },
            required: ['userName', 'emails', 'name', 'preferredLanguage', 'locale', 'timezone', 'securityProfile']
          }
        },
        required: ['user']
      }
    }
  }
};

export { apiTool };