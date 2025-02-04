import mongoose from "mongoose";

const hotelSchema = mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    pricePerNight:{
        type:Number,
        required: true
    },


    rating:{
        type:Number
    }
});

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;