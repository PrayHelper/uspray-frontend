require('dotenv').config();

function isValidWebHost(url) {
    const pattern = /^(http:\/\/|https:\/\/)[a-zA-Z0-9-\.]+(:[0-9]+)?$/;
    return pattern.test(url);
}

if (!process.env.REACT_APP_API_ORIGIN) {
    console.error('Error: The environment variable REACT_APP_API_ORIGIN is required.');
    process.exit(1);
}

if (!isValidWebHost(process.env.REACT_APP_API_ORIGIN)) {
    console.error(`Error: The environment variable REACT_APP_API_ORIGIN is invalid. given: ${process.env.REACT_APP_API_ORIGIN}}`);
    process.exit(1);
}

if (!process.env.REACT_APP_WEB_ORIGIN) {
    console.error('Error: The environment variable REACT_APP_WEB_ORIGIN is required.');
    process.exit(1);
}

if (!isValidWebHost(process.env.REACT_APP_WEB_ORIGIN)) {
    console.error(`Error: The environment variable REACT_APP_WEB_ORIGIN is invalid. given: ${process.env.REACT_APP_WEB_ORIGIN}}`);
    process.exit(1);
}