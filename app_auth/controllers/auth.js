const logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

const unlink = function(req, res) {
    var user = req.user;
    user.id = undefined;
    user.save(function(err) {
        res.redirect('/');
    });
};

module.exports = {
  unlink, logout
}; 