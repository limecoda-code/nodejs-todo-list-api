const restify = require('restify');
const config = require('./config');

const server = restify.createServer();

// Require JSON body parser plugin to parse payloads
server.use(restify.plugins.jsonBodyParser({ mapParams: true }));

// Import database interfaces
const ProjectInterface = require('./database/' + config.db.type + '/interfaces/Project');
const TaskInterface = require('./database/' + config.db.type + '/interfaces/Task');

/**********************************************
 ************** PROJECT ENDPOINTS *************
 **********************************************/

// Create project
server.post('/projects', (req, res, next) => {
  let data = req.body || {};

  ProjectInterface.createProject(data)
  .then((project) => {
    res.send(201, project);
  })
  .catch((error) => {
    console.log(error);
    res.send(400, error);
  });

  next();
});

// Retrieve all projects
server.get('/projects', (req, res, next) => {
  ProjectInterface.retrieveProjects()
  .then((projects) => {
    if (projects) {
      res.send(200, projects);
    } else {
      res.send(404);
    }
  })
  .catch((error) => {
    res.send(400, error);
  });

  next();
});

// Retrieve a project by ID
server.get('/projects/:id', (req, res, next) => {
  ProjectInterface.retrieveProject(req.params.id)
  .then((project) => {
    if (project) {
      res.send(200, project);
    } else {
      res.send(404);
    }
  })
  .catch((error) => {
    console.log(error);
    res.send(400, error);
  });

  next();
});

// Update a project
server.put('/projects/:id', (req, res, next) => {
  let data = req.body || {};

  ProjectInterface.updateProject(req.params.id, data)
  .then((project) => {
    if (project) {
      res.send(200, project);
    } else {
      res.send(404);
    }
  })
  .catch((error) => {
    res.send(400, error);
  });

  next();
});

// Delete a project
server.del('/projects/:id', (req, res, next) => {
  ProjectInterface.deleteProject(req.params.id)
  .then((project) => {
    res.send(204);
  })
  .catch((error) => {
    res.send(400, error);
  });

  next();
});

/**********************************************
 *************** TASK ENDPOINTS ***************
 **********************************************/

// Create task
server.post('/tasks', (req, res, next) => {
  let data = req.body || {};

  TaskInterface.createTask(data)
  .then((task) => {
    res.send(201, task);
  })
  .catch((error) => {
    res.send(400, error);
  });

  next();
});

// Retrieve all tasks
server.get('/tasks', (req, res, next) => {
  TaskInterface.retrieveTasks()
  .then((tasks) => {
    if (tasks) {
      res.send(200, tasks);
    } else {
      res.send(404);
    }
  })
  .catch((error) => {
    res.send(400, error);
  });

  next();
});

// Retrieve a task by ID
server.get('/tasks/:id', (req, res, next) => {
  TaskInterface.retrieveTask(req.params.id)
  .then((task) => {
    if (task) {
      res.send(200, task);
    } else {
      res.send(404);
    }
  })
  .catch((error) => {
    res.send(400, error);
  });

  next();
});

// Update a task
server.put('/tasks/:id', (req, res, next) => {
  let data = req.body || {};

  TaskInterface.updateTask(req.params.id, data)
  .then((task) => {
    if (task) {
      res.send(200, task);
    } else {
      res.send(404);
    }
  })
  .catch((error) => {
    res.send(400, error);
  });

  next();
});

// Delete a task
server.del('/tasks/:id', (req, res, next) => {
  TaskInterface.deleteTask(req.params.id)
  .then((task) => {
    res.send(204);
  })
  .catch((error) => {
    res.send(400, error);
  });

  next();
});

server.listen(config.port, function() {
  console.log('Server listening on port ' + config.port);

  // Connect to database
  const dbType = config.db.type;
  const db = require('./database/' + dbType + '/connect');
});