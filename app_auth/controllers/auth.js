const logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

module.exports = {
  logout
}; 