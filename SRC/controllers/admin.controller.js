import { cloudinaryMediaUpload } from "../config/cloudinary.js";
import Tour  from "../models/tour.model.js"
import dotenv from 'dotenv'
dotenv.config();

 export const createTour = async (req, res) => {
    try {
    const {
      title,
      description,
      date,
      address,
      amenities,
      rules,
      category,
      rating,
    } = req.body;
    let  image = req.file;
  
    if (!image) {
        return  res.status(404).json({message: 'At least one image is required'})
      }
      const uploadedImages = await cloudinaryMediaUpload(req.file.path, 'tours')
      image = uploadedImages.url
  
      const newTour = new Tour({
        title,
        description,
        date,
        address,
        amenities,
        rules,
        category,
        rating,
        image
      });
  
      const savedTour = await newTour.save();
  
      res.status(200).json({
        success: true,
        message: "Successfully created",
        data: savedTour,
      });
      console.log("Saved successfully", savedTour);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create",
        error: error.message,
      });
    }
 }

export const updateTour = async(req,res) => {

    const id = req.params.id;
    try{

        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, {new: true})

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedTour,
        });
    

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update',
        });
    }

};


export const deleteTour = async(req,res) => {
    const id = req.params.id;
    try{

        await Tour.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        });
    

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete',
        });
    }

};


export const getSingleTour = async(req,res) => {
    const id = req.params.id;
    try{

        const tour = await Tour.findById(id)

        res.status(200).json({
            success: true,
            message: 'Successfully found',
            data: tour,
        });
    

    }catch(error) {
        res.status(404).json({
            success: false,
            message: 'Not found',
        });
    }

};

export const getAllTour = async(req,res) => {

//pagination
    const page= parseInt(req.query.page);

    try{

        const tours = await Tour.find({})
            .skip((page - 1) * 50)
            .limit(50)

        res.status(200).json({
            success: true,
            count: tours.length,
            message: 'Found successfully',
            data: tours,
        })
    

    }catch(error) {
        res.status(404).json({
            success: false,
            message: 'Failed to find',
        })  
    }

};

export const getTourBySearch = async(req, res) =>{

    const place= new RegExp(req.query.place, "i")
    const address = new RegExp(req.query.address, "i")
    
    try{
        const tours = await Tour.find(place, address)

        res.status(200).json({
            success: true,
            message: 'Found successfully',
            data: tours,
        })
    }catch(error) {
        res.status(404).json({
            success: false,
            message: 'Failed to find',
        })  
    }
}

export const getTourCount = async(req, res)=>{
    try {
        const tourCount= Tour.estimatedDocumentCount()
        res.status(200).json({
            success: true,
            data:tourCount,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch'})
    }
}