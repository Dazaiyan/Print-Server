const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.role !== role) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        next();
    };
};

module.exports = authorizeRole;