module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const getAll = async (req, res) => {
        const page = req.query.page || 1
        const pageSize = req.query.size || 5
        const categoryId = Number(req.query.categoryId) || 0
        const search = req.query.search || ''

        let urls = {
            count: 0,
            data: []
        }

        try {
            urls.count = await app.db('urls')
                .leftJoin('url_has_categories', 'urls.id', 'url_has_categories.url_id')
                .where(function () {
                    this.where('url_has_categories.category_id', categoryId).orWhereRaw(`(${Number(categoryId) == 0 ? true : false})`)
                })
                .andWhere(function () {
                    this.where('url', 'like', `%${search}%`)
                })
                .countDistinct('id', { as: 'count' }).first()
                .then((row) => parseInt(row.count))

            urls.data = await app.db('urls').select('id', 'url')
                .orderBy('url')
                .leftJoin('url_has_categories', 'urls.id', 'url_has_categories.url_id')
                .where(function () {
                    this.where('url_has_categories.category_id', categoryId).orWhereRaw(`(${Number(categoryId) == 0 ? true : false})`)
                })
                .andWhere(function () {
                    this.where('url', 'like', `%${search}%`)
                })
                .groupBy('id', 'url')
                .limit(pageSize).offset(page * pageSize - pageSize)

            res.json({ data: urls.data, count: urls.count })

        } catch (err) { res.status(500).send(err) }
    }

    const save = async (req, res) => {
        const url = {
            id: req.body.id,
            url: req.body.url,
            categories: req.body.categories || [],
            ages: req.body.ages || []
        }

        if (req.params.id) url.id = req.params.id

        try {
            existsOrError(url.url, 'Url não informada')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        try {
            if (url.id) {
                await app.db('urls')
                    .update({ id: url.id, url: url.url })
                    .where({ id: url.id })
                    .catch(err => res.status(500).send(err))
            } else {
                url.id = await app.db('urls')
                    .insert({ id: url.id, url: url.url })
                    .then((row) => row[0])
            }

            let categoryRows = url.categories.map(category => {
                return { url_id: url.id, category_id: category }
            })

            let ageRows = url.ages.map(age => {
                return { url_id: url.id, age_id: age }
            })

            await app.db('url_has_categories')
                .andWhere('url_id', url.id)
                .whereNotIn('category_id', url.categories)
                .del()
            await app.db('url_has_ages')
                .andWhere('url_id', url.id)
                .whereNotIn('age_id', url.ages)
                .del()
            if (url.categories.length > 0) {
                await app.db('url_has_categories')
                    .insert(categoryRows)
                    .onConflict('url_id', 'category_id')
                    .ignore()
            }
            if (url.ages.length > 0) {
                await app.db('url_has_ages')
                    .insert(ageRows)
                    .onConflict('url_id', 'age_id')
                    .ignore()
            }

            res.status(204).send()

        } catch (err) { res.status(500).send(err) }
    }

    const remove = (req, res) => {
        app.db.transaction(async trx => {
            try {
                await trx('url_has_categories')
                    .where({ url_id: req.params.id })
                    .del()
                await trx('url_has_ages')
                    .where({ url_id: req.params.id }).del()
                const deletedRecords = await trx('urls')
                    .where({ id: req.params.id }).del()
                existsOrError(deletedRecords, 'URL não foi encontrada.')
                await trx.commit()
                res.status(204).send()
            } catch (e) {
                await trx.rollback()
                res.status(400).send(msg)
            }
        })
    }

    const getById = async (req, res) => {
        const id = req.params.id
        try {
            const url = await app.db('urls')
                .where({ id: req.params.id })
                .first()
            url.categories = await app.db('url_has_categories')
                .select('category_id')
                .where('url_id', id)
                .then(rows => rows.map(reg => {
                    return `${reg.category_id}`
                }))
            url.ages = await app.db('url_has_ages')
                .select('age_id')
                .where('url_id', id)
                .then(rows => rows.map(reg => {
                    return `${reg.age_id}`
                }))
            res.json(url)
        } catch (err) {
            res.status(500).send(err)
        }

    }

    const all = (req, res) => {
        app.db('urls')
            .orderBy('url', 'asc')
            .then(urls => res.json(urls))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, getAll, getById, all }
}