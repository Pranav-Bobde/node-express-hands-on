const authorise = (req, res, next) => {
    const {user} = req.query;
    if(user == 'gojo'){
        req.user = user;
        next()
    }else{
        res.send('No resource found')
    }
}

module.exports = authorise;