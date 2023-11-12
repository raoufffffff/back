import mongoose from "mongoose"

const Liv = mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        tel: Number,
        adderss: String,
        NubderOrder: Number,
        type: String,
    },
    {
        timestamps: true,
    }
)

export const Livs = mongoose.model('Liv', Liv);

