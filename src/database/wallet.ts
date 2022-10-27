import mongoose from 'mongoose'
const { Schema } = mongoose

const walletSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: "" },
    balance: { type: Number, required: true },
    teamId: { type: Number, required: true }
}, {
    timestamps: true
})

export default mongoose.model('wallet', walletSchema)
