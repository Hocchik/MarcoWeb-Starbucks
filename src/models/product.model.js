import mongoose from 'mongoose'


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
    },

    category: {
        type: String,
        required: true
    },

    type:{
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    urlimagen: {
        type: String,
    },

}, {
    timestamps: true
}
)

export default mongoose.model('Product', ProductSchema)

