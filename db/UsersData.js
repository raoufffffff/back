import mongoose from "mongoose"

const User = mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        tel: Number,
        adderss: String,
        NubderOrder: Number,
        type: String
    },
    {
        timestamps: true,
    }
)

export const Users = mongoose.model('User', User);

