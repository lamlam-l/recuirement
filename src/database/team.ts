import mongoose from 'mongoose'
const { Schema } = mongoose

const teamSchema = new Schema({
    index: { type: Number, required: true }
}, {
    timestamps: true
})

export default mongoose.model('team', teamSchema)
