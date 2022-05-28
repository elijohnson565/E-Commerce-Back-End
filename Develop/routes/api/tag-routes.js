const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: [
      'id',
      'tag_name',
    ],
  // be sure to include its associated Product data
  include: [
    {
    model: Product,
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    }
  ]
})
.then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    attributes: [
      'id',
      'tag_name',
    ],
  // be sure to include its associated Product data
  include: [
    {
    model: Product,
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    }
  ]
})
.then(dbCategoryData => {
  if (!dbCategoryData) {
    res.status(404).json({ message: 'No category found with this id' });
    return;
  }
  res.json(dbCategoryData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
  
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    Tag_name: req.body.Tag_name
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No Tag found with this id' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  console.log('id', req.params.id);
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No Tag found with this id' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;