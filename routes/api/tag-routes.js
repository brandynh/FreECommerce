const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  try {

    const tagData = await Tag.findAll({
      include: [

        {model: Product,
          attributes: ['id', 'category_id', 'product_name', 'price', 'stock'],
        
      }

      ]

    });
    // Status 200 OK
    res.status(200).json(tagData)

  } catch (err) {
    // Status 500 Internal Server Error
    res.status(500).json(err);

  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {

    const singleTagData = await Tag.findByPk(req.params.id, {
      include: [

        {model: Product,
          attributes: ['id', 'category_id', 'product_name', 'price', 'stock'],

        }]

    });
    // Status 200 OK
    res.status(200).json(singleTagData);

  } catch (err) {
    // Status 500 Internal Server Error
    res.status(500).json(err);

  }

});

router.post('/', async (req, res) => {
  // create a new tag

  try {

    const tagData = await Tag.create({

      tag_name: req.body.tag_name

    });
    // Status 200 OK
    res.status(200).json(tagData);

  } catch (err) {
    // Error 400 Bad Request
    res.status(400).json(err);

  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value

  try {

    const tagData = await Tag.update(req.body, {
      where: {

        id: req.params.id,

      }
    
    });

    if (!tagData[0]) {
      // Status 404 Not Found
      res.status(404).json({

        message: 'Tag does not exist'})

        return;
        
    }
    // Status 200 OK
    res.status(200).json(tagData);

  } catch (err) {
    // Status 500 Internal Server Error
    res.status(500).json(err);

  }

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value

  try {

    const tagData = await Tag.destroy({

      where: {

        id: req.params.id

      },

    });

    if (!tagData) {
      // Status 404 Not Found
      res.status(404).json({

        message: 'Tag does not exist!'});

      return;

    }
    // Status 200 OK
    res.status(200).json(tagData);

  } catch (err) {
    // Status 500 Internal Server Error
    res.status(500).json(err);

  }
});

module.exports = router;
