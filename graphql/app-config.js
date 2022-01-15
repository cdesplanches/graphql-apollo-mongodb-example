const PORT = 5000;
const environment = {
    development: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: 'mongodb://mongo:27017/gql?retryWrites=true&w=majority'
    },
    production: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: 'mongodb://mongo:27017/gql?retryWrites=true&w=majority'
    }
}

module.exports = { PORT, environment }
