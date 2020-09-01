const FoodModel = require('./model');

module.exports = (app) => {
    // Create new a food record
    app.post('/food', async (req, res) => {
        console.log(req.body)
        try {
            const createFood = await FoodModel.create(req.body);
            // console.log(createFood);
            res.status(201).send(createFood);
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    })

    // GET list food
    app.post('/foods', async (req, res) => {
        try {
            const list__food = await FoodModel.find({});
            res.status(200).send(list__food);
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    });

    // GET food by id
    app.post('/food-by-id', async (req, res) => {
        try {
            const { id } = req.body;
            const food_by_id = await FoodModel.findById(id);
            res.status(200).send(food_by_id);
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    })

    //DELETE a food by id
    app.post('/delete-food', async (req, res) => {
        try {
            const { id } = req.body;
            const delete_a_food = await FoodModel
                .findByIdAndUpdate(
                    id,
                    { isDelete: true },
                    { new: true }
                );
            res.status(200).send(delete_a_food);
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    })

    //UPDATE a food by id
    app.post('/update-food', async (req, res) => {
        try {
            const { id } = req.body;
            const update_a_food = await FoodModel
                .findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).send(update_a_food);
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    })

}