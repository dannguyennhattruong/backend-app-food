const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "NEW"
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
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

User.set("toJSON", { virtuals: true });

// Export the model
module.exports = mongoose.model('User', User);