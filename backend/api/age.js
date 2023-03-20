module.exports = app => {

    const getAll = (req, res) => {
        return app.db('ages')
            .then(keys => res.json(keys))
            .catch(err => res.status(500).send(err))
    }

    return { getAll }
}