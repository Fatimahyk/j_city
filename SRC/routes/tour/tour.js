import express from 'express';
import { createTour, deleteTour, getAllTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from '../../controllers/admin.controller.js';
import { searchTours } from '../../controllers/search.controller.js';
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v2 as cloudinary } from 'cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tour_cover_photos",
    format: async (req, file) => "jpg", // Optionally specify the file format
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const upload = multer({ storage: storage });



const router = express.Router()

router.get('/search/:key', searchTours)

router.post('/createTour', upload.array('file', 1), createTour);

router.put('/:id', updateTour);

router.delete('/:id', deleteTour);

router.get('/:id', getSingleTour);

router.get('/all', getAllTour);

router.get('/search/getTourBySearch', getTourBySearch);

router.get('/search/getTourCount', getTourCount);

export default router


