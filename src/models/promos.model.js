import mongoose from "mongoose";

const PromosSchema = new mongoose.Schema({
producto: {
    type: String,
    required: true,
},

descuento: {
    type: String,
    required: true,
},

dateString :{
    type: String,
    required: true
},

date:{
    type: Date,
    required: true
},

duration:{
    type:Number,
    required:true
},

admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
}
},{
    timestamps : true
})

export default mongoose.model('Promociones', PromosSchema);