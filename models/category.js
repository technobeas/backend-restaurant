const mongoose = require('mongoose');



const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  hide: {
    type: Boolean,
    default: false,
  },
});


module.exports = mongoose.model('category' , categorySchema);