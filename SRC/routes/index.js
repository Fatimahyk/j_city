import express from 'express';
// import tourRoutes from '../routes/tour/tour.router.js'
import tourRoutes from './tour/tour.js'

const router = express.Router()

router.use('/tour',tourRoutes)

export default router