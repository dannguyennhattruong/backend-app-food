const FoodModel = require('./model');
const CategoryModel = require('./category_model');

module.exports = (app) => {
    // Create new a food record
    app.post('/food', async (req, res) => {
        console.log(req.body)
        try {
            const {category,name} = req.body;
            const findCategory = await CategoryModel.findOne({name : category});
            const findFood = await FoodModel.findOne({name});
            console.log(findFood)
            if(findCategory && !findFood) {
                const createFood = await FoodModel.create(req.body);
                const addFoodIdToCategory = await CategoryModel
                                            .findByIdAndUpdate(findCategory.id,
                                                {foods : 
                                                    [...findCategory.foods,
                                                        createFood.id
                                                    ]
                                                })
                res.status(201).send(createFood);
            }
            else {
                res.status(400).send({
                    message : [
                        {
                            messageId : 'FOOD',
                            message : findFood && "Food's name is exist"
                        }, 
                        {
                            messageId : 'CATEGORY',
                            message : !findCategory && 'This category is not exist!!'
                        }
                    ]
                })
            }
            
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
            const findFood = await FoodModel.findOne({_id : id});
            if(findFood) {
                const delete_a_food = await FoodModel
                .findByIdAndUpdate(
                    id,
                    { isDelete: !findFood.isDelete },
                    { new: true }
                );
            res.status(200).send(delete_a_food);
            }
            else {
                res.status(400).send({
                    messageId : 'delete-food',
                    message : "Id's food doesn't exist"
                })
            }
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