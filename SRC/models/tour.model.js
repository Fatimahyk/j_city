import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
    {
        image:[{
            type:String,
            required: true,
        }],
        title: {
            type: String,
            required: true,
            unique: true,
        },
        rating:{
            type: String,
            // min: 0,
            // max: 5,
        },
        description: {
            type: String
        },
        date:{
            type: String,      
        },
        address: {
            type: String,
            required: true,
        },
        amenities: {
            type: String, 
        },
        rules: {
            type: String,
        },
        category: {
            type: String,
            enum: ['markets','4+ rating','culture','wedding','sports','tech','seminar','networking', 'hotels','current events', 'upcoming events', 'apartments', 'hospitals', 'resturants', 'markets and malls', 'attractions', 'Culture','Wedding','Sports', 'Tech', 'Seminar','Networking','Hotels','Current events', 'Upcoming events', 'Apartments', 'Hospitals', 'Resturants', 'Jos', 'Markets', 'Water Fall', 'All', 'Amusement Parks', 'Mountains', 'Museums', 'Markets and Malls', 'Attractions'],
            required: true
        }

    },{
        timestamps: true
    }
);

const Tour = mongoose.model('Tour', tourSchema)
export default Tour;