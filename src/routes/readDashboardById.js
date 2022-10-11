const { Dashboard } = require('../db/sequelize');

const readDashboardById = (app) => {
  app.get('/api/dashboard/:id', (req, res) => {
    Dashboard.findByPk(req.params.id).then((dashboard) => {
      const message = 'Le tableau de bord a bien été récupéré';
      res.json({ message, data: dashboard });
    });
  });
};

module.exports = readDashboardById;
