import mongoose, { Mongoose } from "mongoose";

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
    },

    address:{
        type:String,
        required:true
    },

    link:{
        type:String,
    }
});

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;