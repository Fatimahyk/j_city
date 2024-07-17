import Tour from "../models/tour.model.js"

export const searchTours = async(req, res) => {
    let result = await Tour.find({
        '$or': [
            {
                place: {$regex: req.params.key, $options: 'i'},
                address: {$regex: req.params.key, $options: 'i'},
                ratings: {$regex: req.params.key, $options: 'i'}
            }
        ]
    });
    res.send(result);
}