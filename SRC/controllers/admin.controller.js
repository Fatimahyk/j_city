import Tour  from "../models/tour.model.js"
// const cloudinaryMediaUpload = require("../config/cloudinary.js");
import dotenv from 'dotenv'
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary'


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



const cloudinaryMediaUpload = async (filePath, folder) => {
  return cloudinary.uploader.upload(filePath, { folder: folder });
};

 export const createTour = async (req, res) => {
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
  
    const files = req.file;
  
    try {
      if (!files || files.length === 0) {
        return res.status(400).json({
          statusCode: 400,
          message: "At least one tour cover photo is required",
        });
      }
  
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const result = await cloudinaryMediaUpload(file.path, "tour_cover_photos");
          return result.url;
        })
      );
  
      const newTour = new Tour({
        title,
        description,
        date,
        address,
        amenities,
        rules,
        category,
        rating,
        images: uploadedImages,
      });
  
      const savedTour = await newTour.save();
  
      res.status(200).json({
        success: true,
        message: "Successfully created",
        data: savedTour,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create",
        error: error.message,
      });
    }
  };


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
            .skip((page - 1) * 10)
            .limit(10)

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