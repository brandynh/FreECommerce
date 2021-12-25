const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products

  try {

    const catData = await Category.findAll({

      include: [{

        model: Product,

        attributes: ['id', 'category_id', 'product_name', 'price', 'stock']

      }],

    });
    // Status 200 OK
    res.status(200).json(catData);

  } catch (err) {
    // Status 500 Internal Server Error
    res.status(500).json(err);

  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try {

    const singleCatData = await Category.findByPk(req.params.id, {

      include: [
        
        {model: Product,
          attributes: ['id', 'category_id', 'product_name', 'price', 'stock']},

    ],

    });
    // Status 200 OK
    res.status(200).json(singleCatData);

  } catch (err) {
    // Status 500 Internal Server Error
    res.status(500).json(err)

  }

});

router.post('/', async (req, res) => {
  // create a new category

  try {

    const newCatData = await Category.create(req.body);
    // Status 200 OK
    res.status(200).json(newCatData);

  } catch (err) {
    // Status 400 Bad request
    res.statur(400).json(err);

  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

  try {

    const updateCatData = await Category.update(req.body, {

      where: {

        id: req.params.id,

      },

    });

    if (!updateCatData[0]) {
      // Status 404 Not Found
      res.status(404).json({

        message: 'Category does not exist!'});

      return;

    }
    // Status 200 OK
    res.status(200).json(updateCatData);

  } catch (err) {
    // Status 500 Internal Server Error
    res.status(500).json(err);

  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  try {

    const deleteCatData = await Category.destroy({

      where: {

        id: req.params.id

      },

    });

    if (!deleteCatData) {
      // Status 404 Not Found
      res.status(404).json({

        message: 'Category does not exist!'});

      return;

    }
    // Status 200 OK
    res.status(200).json(deleteCatData);

  } catch (err) {
    // Status 500 Internal Server Error
    res.status(500).json(err);

  }

});

module.exports = router;
