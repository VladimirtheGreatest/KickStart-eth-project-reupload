const routes = require("next-routes")();

routes
  .add("/campaigns/new", "/campaigns/new")
  .add("/campaigns/:address", "/campaigns/show")
  .add("/campaigns/:address/requests", "/campaigns/requests/index");
//route                //in which directory next should find that page

module.exports = routes;
