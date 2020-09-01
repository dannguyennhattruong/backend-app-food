const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Category = new Schema({
    name: {
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
    foods : {
        type : Array,
        default :[]
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

Category.set("toJSON", { virtuals: true });

// Export the model
module.exports = mongoose.model('Category', Category);