module.exports = {
  appRoutes: {
    basePath: '/dbd-randomiser',
    lambdaPath: 'http://dbd-server:9001/2015-03-31/functions/-/invocations',
    routes: [
      '/killer/:id',
      '/survivor/:id',
      '/item/:id',
      '/perk/:character',
      '/perk/:character',
      '/perk/:character/:id',
      '/perk/:character/:id'
    ]
  }
}