const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

  try {

    const catData = await Category.findAll({

      include: [{

        model: Product,

        attributes: ['id', 'category_id', 'product_name', 'price', 'stock']

      }],

    });

    res.status(200).json(catData);

  } catch (err) {

    res.status(500).json(err);

  }

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try {

    const singleCatData = await Category.findByPk(req.params.id, {

      include: [{

        model: Product,

        attributes: ['id', 'category_id', 'product_name', 'price', 'stock']

      }],

    });

    res.status(200).json(singleCatData);

  } catch (err) {

    res.status(500).json(err)

  }

});

router.post('/', (req, res) => {
  // create a new category

  try {

    const newCatData = await Category.create(req.body);

    res.status(200).json(newCatData);

  } catch (err) {

    res.statur(400).json(err);

  }

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value

  try {

    const updateCatData = await Category.update(req.body, {

      where: {

        id: req.params.id

      }

    });

    if (!updateCatData[0]) {

      res.status(404).json({

        message: 'Category not available!'});

      return;

    }

    res.status(200).json(updateCatData);

  } catch (err) {

    res.status(500).json(err);

  }

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value

  try {

    const deleteCatData = await Category.destroy({

      where: {

        id: req.params.id

      },

    });

    if (!deleteCatData) {

      res.status(404).json({

        message: 'Category not available!'});

      return;

    }

    res.status(200).json(deleteCatData);

  } catch (err) {

    res.status(500).json(err);

  }

});

module.exports = router;
