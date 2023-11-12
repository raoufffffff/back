import mongoose from "mongoose"

const order = mongoose.Schema(
    {
        pitId: String,
        cleintId: String,
        livId: Number,
        body: String,
        packje: String,
        status: String
    },
    {
        timestamps: true,
    }
)

export const orders = mongoose.model('order', order);

