const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Food = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "NEW"
    },
    isDelete: {
        type: Boolean,
        default : false
    },
    images : {
        type : Array,
        default : []
    }
}, {
    timestamps: true,
});
//createAt, updatedAt

//trigger where saving
// Food.pre("save", async (next) => {
//     const food = this;
//     if(food) {
//         food.status = "NEW"
//     }
// })

Food.set("toJSON", { virtuals: true });

// Export the model
module.exports = mongoose.model('Food', Food);