const { server, port, url } = require('./src/utils/config');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');
const readAlltasks = require('./src/routes/readAllTasks');
const readTaskById = require('./src/routes/readTaskById');
const createTask = require('./src/routes/createTask');
const updateTask = require('./src/routes/updateTask');
const deleteTask = require('./src/routes/deleteTask');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocs = yaml.load('./swagger.yaml');

server
  .use(favicon(__dirname + '/favicon.ico'))
  .use(morgan('dev'))
  .use(bodyParser.json());

sequelize.connectDb();
sequelize.initDb();

server.get('/', (req, res) => res.send('My Kanban API'));
readAlltasks(server);
readTaskById(server);
createTask(server);
updateTask(server);
deleteTask(server);

server.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.listen(port, () => console.log(`Server listening on : ${url}:${port}`));
