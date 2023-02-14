const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({ include: [{ model: Product, through: ProductTag }] })
    .then((tags) => res.json(tags))
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: [{ model: Product, through: ProductTag }]
  })
    .then((tags) => res.json(tags))
});

router.post('/', (req, res) => {
  // create a new tag
  /* req.body should look like this:
    {
      "tag_name": "game"
    }
 */
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  /* req.body should look like this:
    {
      "tag_name": "snacks"
    }
  */
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.json({ message: "Successfully updated tag" })
  })
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json({ message: 'Successfully deleted tag.' });


  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
