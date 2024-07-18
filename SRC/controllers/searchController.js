import Tour from "../models/tour.model.js";

export const search = async (req, res) => {
    try {

      const search = req.body.search
      const regex = new RegExp(search, 'i');
  
      const searchedItems = await Promise.all([
        searchTour(search, regex),
      ]);

     
      const tourResults =  searchedItems.flat().filter(Boolean);
  
      if (tourResults.length === 0) {

        return res.status(404).json({ error: 'No matching tours found' });
      }

      res.json(tourResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  async function searchTour( regex, search) {
    return Tour.find({
      $or: [
        { title: regex, title: search },
        { address: regex, address: search },
        { category: regex , category: search},
      ],
    }).exec();
  }