const CategoryModel = require('./category_model');

module.exports = (app) => {
    // Create new a food record
    app.post('/category', async (req, res) => {
        // console.log(req.body)
        try {
            const createCategory = await CategoryModel.create(req.body);
            // console.log(createFood);
            res.status(201).send(createCategory);
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    })

    // GET list food
    app.post('/categories', async (req, res) => {
        try {
            const list__categories = await CategoryModel.find({});
            res.status(200).send(list__categories);
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    });

    // GET food by id
    app.post('/category-by-id', async (req, res) => {
        try {
            const { id } = req.body;
            const category_by_id = await CategoryModel.findById(id);
            res.status(200).send(category_by_id);
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    })

    //DELETE a food by id
    app.post('/delete-category', async (req, res) => {
        try {
            const { id } = req.body;
            const delete_a_category = await CategoryModel
                .findByIdAndUpdate(
                    id,
                    { isDelete: true },
                    { new: true }
                );
            res.status(200).send(delete_a_category);
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    })

    //UPDATE a food by id
    app.post('/update-category', async (req, res) => {
        try {
            const { id } = req.body;
            const update_a_category = await CategoryModel
                .findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).send(update_a_category);
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    })

}