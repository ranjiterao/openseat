module.exports = function (app, express) {
  app.get('/api/keepalive', function(req, res){
    res.status(200).json({message: "all ok from the server"});
  });
};