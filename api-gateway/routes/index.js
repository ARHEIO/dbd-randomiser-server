module.exports = (app, BASE_PATH) => {
  app.all(`${BASE_PATH}/killer/:id`, (req, res, next) => {
    console.log(req.params);
    res.locals.lambdaBody.pathParameters = { id: req.params.id }
    next();
  })
  
  app.all(`${BASE_PATH}/survivor/:id`, (req, res, next) => {
    res.locals.lambdaBody.pathParameters = { id: req.params.id }
    next();
  })

  app.all(`${BASE_PATH}/item/:id`, (req, res, next) => {
    res.locals.lambdaBody.pathParameters = { id: req.params.id }
    next();
  })

  app.all(`${BASE_PATH}/perk/:character`, (req, res, next) => {
    res.locals.lambdaBody.pathParameters = {
      character: req.params.character
    }
    next();
  })

  app.all(`${BASE_PATH}/perk/:character`, (req, res, next) => {
    res.locals.lambdaBody.pathParameters = {
      character: req.params.character
    }
    next();
  })

  app.all(`${BASE_PATH}/perk/:character/:id`, (req, res, next) => {
    res.locals.lambdaBody.pathParameters = {
      character: req.params.character,
      id: req.params.id
    }
    next();
  })

  app.all(`${BASE_PATH}/perk/:character/:id`, (req, res, next) => {
    res.locals.lambdaBody.pathParameters = {
      character: req.params.character,
      id: req.params.id
    }
    next();
  })
}