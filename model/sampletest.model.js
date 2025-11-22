import mongoose, { Schema } from "mongoose";

const testdata = Schema({
    customerId: { type: String },
    customerName: { type: String },
    items: [
        {
            product: { type: String, required: true },
            price: { type: Number, required: true },
            qty: { type: Number, required: true },
        },
    ],
    orderDate: { type: Number },
    status: { type: String },
    paymentMethod: { type: String },
    location: { city: { type: String }, pincode: { type: Number } }
},
    {
        timestamps: true, collection: "testdata" 
    }
);

const SampleData = mongoose.model("testdata", testdata, "testdata");

export default SampleData;