import mongoose from 'mongoose'


const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
)

export default mongoose.model('Admin', AdminSchema)