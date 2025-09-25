/**
 * Environment Variable Validation
 * Validates required environment variables and provides fallback handling
 */

const requiredEnvVars = {
  SPOTIFY_CLIENT_ID: {
    required: true,
    description: 'Spotify API Client ID - required for music data',
    fallback: null
  },
  SPOTIFY_CLIENT_SECRET: {
    required: true,
    description: 'Spotify API Client Secret - required for music data', 
    fallback: null
  }
};

const optionalEnvVars = {
  NODE_ENV: {
    required: false,
    description: 'Application environment',
    fallback: 'development'
  },
  VERCEL_ENV: {
    required: false,
    description: 'Vercel environment',
    fallback: null
  }
};

/**
 * Validates environment variables and returns validation result
 */
export function validateEnvironment() {
  const errors: Array<{variable: string, description: string, message: string}> = [];
  const warnings: Array<{variable: string, description: string, message: string}> = [];
  const config: {[key: string]: string | null} = {};

  // Check required variables
  for (const [key, { required, description, fallback }] of Object.entries(requiredEnvVars)) {
    const value = process.env[key];
    
    if (!value) {
      if (required && !fallback) {
        errors.push({
          variable: key,
          description,
          message: `Missing required environment variable: ${key}`
        });
      } else if (fallback) {
        warnings.push({
          variable: key,
          description,
          message: `Using fallback value for ${key}: ${fallback}`
        });
        config[key] = fallback;
      }
    } else {
      config[key] = value;
    }
  }

  // Check optional variables
  for (const [key, { description, fallback }] of Object.entries(optionalEnvVars)) {
    const value = process.env[key];
    config[key] = value || fallback;
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    config
  };
}

/**
 * Validates environment on app startup
 * Throws error in production if required variables missing
 */
export function validateOnStartup() {
  const result = validateEnvironment();
  
  if (!result.isValid) {
    const errorMessage = [
      '❌ Environment validation failed:',
      ...result.errors.map(err => `  • ${err.message}`),
      '',
      '💡 Required environment variables:',
      ...result.errors.map(err => `  • ${err.variable}: ${err.description}`),
      '',
      '📝 Create a .env.local file with the required variables.',
      '🔗 See README.md for setup instructions.'
    ].join('\n');

    if (process.env.NODE_ENV === 'production') {
      throw new Error(errorMessage);
    }
  }

  return result;
}