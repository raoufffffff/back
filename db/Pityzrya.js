import mongoose from "mongoose"

const Pitirai = mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        tel: Number,
        adderss: String,
        NubderOrder: Number,
        type: String,
        menu: []
    },
    {
        timestamps: true,
    }
)

export const Pitirais = mongoose.model('Pitirai', Pitirai);

