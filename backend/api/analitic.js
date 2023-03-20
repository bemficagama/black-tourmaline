module.exports = app => {
    const count = (req, res) => {
        const result = app.db
        .raw (
            'select ' +
            '(select count(id) from `categories`) as `category`, ' +
            '(select count(id) from `keys`) as `key`, ' +
            '(select count(id) from `urls`) as `url`'
        )
        .then(data => res.json(data[0][0]))
    }

    return { count }
}