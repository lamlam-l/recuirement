import mongoose from 'mongoose'
const { Schema } = mongoose

const tradeSchema = new Schema({
    walletId: { type: String, required: true },
    group: { type: String, required: true },
    description: { type: String, default: "" },
    amount: { type: Number, required: true },
    type: { type: String, required: true, enum: ['spend', 'income'] },
    date: { type: Date, required: true }
})

export default mongoose.model('trade', tradeSchema)
