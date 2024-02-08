require('dotenv').config();

if (!process.env.REACT_APP_API_ORIGIN) {
    console.error('Error: The environment variable REACT_APP_API_ORIGIN is required.');
    process.exit(1);
}

if (!process.env.REACT_APP_WEB_ORIGIN) {
    console.error('Error: The environment variable REACT_APP_WEB_ORIGIN is required.');
    process.exit(1);
}