import express from 'express';
import { createTour, deleteTour, getAllTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from '../../controllers/admin.controller.js';
import upload from '../../config/multer.js';
import { search } from '../../controllers/searchController.js';

const router = express.Router()

router.post('/search', search)

router.post('/create', upload.single('image'), createTour);

router.put('/:id', updateTour);

router.delete('/:id', deleteTour);

router.get('/:id', getSingleTour);

router.get('/', getAllTour);

router.get('/search', getTourBySearch);

router.get('/search/getTourCount', getTourCount);

export default router