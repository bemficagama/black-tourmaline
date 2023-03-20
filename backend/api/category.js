module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const category = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description
        }

        if (req.params.id) category.id = req.params.id

        try {
            existsOrError(category.name, 'Nome não informado')
            existsOrError(category.description, 'Descrição não informada')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (category.id) {
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        const category = {
            id: req.params.id,
            urls: [],
            keys: [],
        }
        try {
            category.urls = await app.db('url_has_categories')
                .where({ category_id: req.params.id })
            category.keys = await app.db('key_has_categories')
                .where({ category_id: req.params.id })

            existsOrError(req.params.id, 'Código da Categoria não informado.')
            notExistsOrError(category.urls, 'Categoria possui URLs.')
            notExistsOrError(category.keys, 'Categoria possui Chaves.')


            app.db('categories')
                .where({ id: req.params.id }).del()
                .then((rowsDeleted) => {
                    existsOrError(rowsDeleted, 'Categoria não foi encontrada.')
                    res.status(204).send()
                })
                .catch((e) => console.log(e))
        } catch (msg) { res.status(400).send(msg) }

    }

    const getAll = async (req, res) => {
        const page = req.query.page || 1
        const pageSize = req.query.size || 5
        const search = req.query.search || ''

        let categories = {
            count: 0,
            data: []
        }

        try {
            categories.count = await app.db('categories')
                .orderBy('name')
                .where(function () {
                    this.where('name', 'like', `%${search}%`)
                })
                .count('id', { as: 'count' })
                .first()
                .then((row) => parseInt(row.count))

            categories.data = await app.db('categories')
                .orderBy('name')
                .where(function () {
                    this.where('name', 'like', `%${search}%`)
                })
                .limit(pageSize).offset(page * pageSize - pageSize)

            res.json({ data: categories.data, count: categories.count })
        } catch (err) {
            res.status(500).send(err)
        }
    }

    const all = (req, res) => {
        app.db('categories')
            .orderBy('name', 'asc')
            .then(categories => res.json(categories))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('categories')
            .where({ id: req.params.id })
            .first()
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, getAll, getById, all }
}