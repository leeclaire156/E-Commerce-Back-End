const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  })
    .then((category) => res.json(category))
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: { id: req.params.id },
    include: [Product]
  })
    .then((category) => res.json(category))
});

router.post('/', (req, res) => {
  // create a new category
  /* req.body should look like this:
    {
      "category_name": "Desserts"
    }
  */
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  /* req.body should look like this:
    {
      "category_name": "Snacks"
    }
  */
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.json({ message: "Successfully updated Category" })
  })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json({ message: 'Successfully deleted category.' });


  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
