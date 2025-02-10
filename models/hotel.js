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

    Address:{
        type:String,
        required:true
    }
});

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;