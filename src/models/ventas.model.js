import mongoose from 'mongoose'


const VentasSchema = new mongoose.Schema({
    productoID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      nombreProducto: {
        type: String,
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
      precioUnitario: {
        type: String,
        required: true,
        match: /^S\/\d+(?:\.\d{2})?$/,
      },
      total: {
        type: String,
        required: true,
        match: /^S\/\d+(?:\.\d{2})?$/,
      },
      fechaVenta: {
        type: Date,
        required: true,
      },
      ClienteID: {
        type: String,
        required: true,
      }
}
)

export default mongoose.model('Ventas', VentasSchema)