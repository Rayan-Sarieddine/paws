const Post = require("../models/post.model");
const path = require("path");
const tf = require("@tensorflow/tfjs");

let model;

async function loadModel() {
  const modelUrl =
    "https://tfhub.dev/google/imagenet/resnet_v2_50/classification/4";
  model = await tf.loadLayersModel(modelUrl);
  console.log("Model loaded successfully");
}

loadModel().catch(console.error);

const addPost = async (req, res) => {
  const added_by = req.user._id;
  let { description, location, type = "FOUND", image } = req.body;
  if (!description || !location || !req.files || !req.files.image) {
    console.log(req.body);
    return res.status(400).send({ message: "all fileds are required" });
  }
  try {
    if (description.length < 5) {
      return res.status(400).send({ message: "not enough information given" });
    }

    //location
    const validLocations = [
      "BEIRUT",
      "SOUTH",
      "NORTH",
      "BEKAA",
      "MOUNT LEBANON",
      "OTHER",
    ];
    if (!validLocations.includes(location)) {
      return res
        .status(400)
        .send({ message: "location does not match available ones" });
    }

    //image
    if (Array.isArray(req.files.image)) {
      return res
        .status(400)
        .send({ message: "Only one image can be uploaded at a time" });
    }
    const imageFile = req.files.image;

    const imageExtension = path.extname(imageFile.name);
    const imageName = `${added_by}-${Date.now()}${imageExtension}`;

    const imageDir = path.join(__dirname, "../public/images/posts", imageName);
    await imageFile.mv(imageDir).catch((err) => {
      console.error(err);
      return res.status(500).send({ message: "Error uploading image" });
    });

    image = imageName;

    const post = new Post({
      added_by,
      description,
      location,
      image,
      type,
    });
    await post.save();
    return res.status(200).send({ post, status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

module.exports = {
  addPost,
};
