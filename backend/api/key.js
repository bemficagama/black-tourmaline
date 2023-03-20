module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const getAll = async (req, res) => {
        const page = req.query.page || 1
        const pageSize = req.query.size || 5
        const categoryId = Number(req.query.categoryId) || 0
        const search = req.query.search || ''

        let keys = {
            count: 0,
            data: []
        }

        try {
            keys.count = await app.db('keys')
                .leftJoin('key_has_categories', 'keys.id', 'key_has_categories.key_id')
                .where(function () {
                    this.where('key_has_categories.category_id', categoryId).orWhereRaw(`(${Number(categoryId) == 0 ? true : false})`)
                })
                .andWhere(function () {
                    this.where('key', 'like', `%${search}%`)
                })
                .countDistinct('id', { as: 'count' }).first()
                .then((row) => parseInt(row.count))

            keys.data = await app.db('keys').select('id', 'key')
                .orderBy('key')
                .leftJoin('key_has_categories', 'keys.id', 'key_has_categories.key_id')
                .where(function () {
                    this.where('key_has_categories.category_id', categoryId).orWhereRaw(`(${Number(categoryId) == 0 ? true : false})`)
                })
                .andWhere(function () {
                    this.where('key', 'like', `%${search}%`)
                })
                .groupBy('id', 'key')
                .limit(pageSize).offset(page * pageSize - pageSize)

            res.json({ data: keys.data, count: keys.count })

        } catch (err) { res.status(500).send(err) }
    }

    const save = async (req, res) => {
        const key = {
            id: req.body.id,
            key: req.body.key,
            categories: req.body.categories || [],
            ages: req.body.ages || []
        }

        if (req.params.id) key.id = req.params.id

        try {
            existsOrError(key.key, 'Chave não informada')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        try {
            if (key.id) {
                await app.db('keys')
                    .update({ id: key.id, key: key.key })
                    .where({ id: key.id })
                    .catch(err => res.status(500).send(err))
            } else {
                key.id = await app.db('keys')
                    .insert({ id: key.id, key: key.key })
                    .then((row) => row[0])
            }

            let categoryRows = key.categories.map(category => {
                return { key_id: key.id, category_id: category }
            })

            let ageRows = key.ages.map(age => {
                return { key_id: key.id, age_id: age }
            })

            await app.db('key_has_categories')
                .andWhere('key_id', key.id)
                .whereNotIn('category_id', key.categories)
                .del()
            await app.db('key_has_ages')
                .andWhere('key_id', key.id)
                .whereNotIn('age_id', key.ages)
                .del()
            if (key.categories.length > 0) {
                await app.db('key_has_categories')
                    .insert(categoryRows)
                    .onConflict('key_id', 'category_id')
                    .ignore()
            }
            if (key.ages.length > 0) {
                await app.db('key_has_ages')
                    .insert(ageRows)
                    .onConflict('key_id', 'age_id')
                    .ignore()
            }

            res.status(204).send()

        } catch (err) { res.status(500).send(err) }
    }

    const remove = (req, res) => {
        app.db.transaction(async trx => {
            try {
                await trx('key_has_categories')
                    .where({ key_id: req.params.id })
                    .del()
                await trx('key_has_ages')
                    .where({ key_id: req.params.id }).del()
                const deletedRecords = await trx('keys')
                    .where({ id: req.params.id }).del()
                existsOrError(deletedRecords, 'Chave não foi encontrada.')
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
            const key = await app.db('keys')
                .where({ id: req.params.id })
                .first()
            key.categories = await app.db('key_has_categories')
                .select('category_id')
                .where('key_id', id)
                .then(rows => rows.map(reg => {
                    return `${reg.category_id}`
                }))
            key.ages = await app.db('key_has_ages')
                .select('age_id')
                .where('key_id', id)
                .then(rows => rows.map(reg => {
                    return `${reg.age_id}`
                }))
            res.json(key)
        } catch (err) {
            res.status(500).send(err)
        }

    }

    return { save, remove, getAll, getById }
}