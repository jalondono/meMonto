const app = require('./server')
const {PORT} = require('./src/config')

async function main() {
    app.listen(PORT, () => {
        console.log('listen on port : 3000')
    })
}
main()