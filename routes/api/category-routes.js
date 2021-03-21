const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  // be sure to include its associated Products
  try {
    const catData = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [
        { model: Product }
      ],
    })
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  // be sure to include its associated Products
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{
        model: Product
      }],
    })

    if(!catData) {
      res.status(404).json({
        message: 'No category found with that ID!'
      });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCat = await Category.create(req.body)
    res.status(200).json(newCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateCat = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then((updateCat) => res.json(updateCat));
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteCat = await Category.destroy({
      where: {
        id: req.params.id
      }
    }).then(deleteCat => (deleteCat) ? res.status(200).json : res.status(404).json({
      message: 'No category found with that ID!'
    }));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
