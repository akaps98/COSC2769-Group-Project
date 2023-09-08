const checkAuth = (req, res) => {
    if (req.session.user) {
        return res.send({loggedIn: true, user: req.session.user});
    } else {
        return res.send({loggedIn: false });
    }
};

module.exports = { checkAuth };