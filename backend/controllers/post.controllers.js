const Post = require("../models/post.model");
const path = require("path");

//Function to create a new post for a found or lost pet
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const addPost = async (req, res) => {
  const added_by = req.user._id;
  let { description, location, type = "FOUND" } = req.body;

  // Validate input parameters
  if (!description || !location || !req.files || !req.files.image) {
    console.log(req.body);
    return res.status(400).send({ message: "all fields are required" });
  }

  // Validate description
  if (description.length < 5) {
    return res.status(400).send({ message: "not enough information given" });
  }

  // Validate location
  const validLocations = [
    "BEIRUT",
    "SOUTH",
    "NORTH",
    "BEKAA",
    "MOUNT LEBANON",
    "OTHER",
  ];
  if (!validLocations.includes(location.toUpperCase())) {
    return res
      .status(400)
      .send({ message: "location does not match available ones" });
  }

  // Validate image
  if (Array.isArray(req.files.image)) {
    return res
      .status(400)
      .send({ message: "Only one image can be uploaded at a time" });
  }

  try {
    const imageFile = req.files.image;
    const imageExtension = path.extname(imageFile.name);
    const imageName = `${added_by}-${Date.now()}${imageExtension}`;
    const imageDir = path.join(__dirname, "../public/images/posts", imageName);

    await imageFile.mv(imageDir);

    // Create a FormData object and append the image
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imageDir));

    // Send POST request to Flask server
    const flaskResponse = await axios.post(
      "http://localhost:5000/predict",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    // Extract breed from Flask response
    const breed = flaskResponse.data.breed;

    // Create a new post with the breed
    const post = new Post({
      added_by,
      description,
      location,
      image: imageName,
      breed,
      type,
    });
    await post.save();
    return res.status(200).send({ post, status: "success" });
  } catch (error) {
    console.error("Error in addPost:", error);
    return res.status(500).send({ message: error.message });
  }
};

const filterDescription = (description) => {
  const commonWords = [
    "the",
    "how",
    "what",
    "is",
    "a",
    "an",
    "in",
    "on",
    "at",
    "for",
    "with",
    "without",
    "and",
    "of",
    "to",
    "from",
    "by",
    "as",
    "or",
    "but",
    "not",
    "this",
    "that",
    "these",
    "those",
    "here",
    "there",
    "are",
    "be",
    "it",
    "its",
    "I",
    "you",
    "he",
    "she",
    "we",
    "they",
    "them",
    "our",
    "your",
    "his",
    "her",
    "their",
    "my",
    "me",
    "was",
    "were",
    "been",
    "being",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "should",
    "could",
    "can",
    "may",
    "might",
    "must",
    "shall",
    "into",
    "onto",
    "within",
    "upon",
    "under",
    "over",
    "among",
    "between",
    "across",
    "through",
    "above",
    "below",
    "after",
    "before",
    "while",
    "during",
    "since",
    "until",
    "unless",
    "else",
    "any",
    "some",
    "all",
    "many",
    "few",
    "most",
    "more",
    "less",
    "only",
    "just",
    "even",
    "now",
    "then",
    "than",
    "thus",
    "hence",
    "so",
    "therefore",
    "however",
    "otherwise",
    "also",
    "again",
    "already",
    "almost",
    "always",
    "often",
    "sometimes",
    "never",
    "ever",
    "once",
    "twice",
    "thrice",
    "here",
    "there",
    "where",
    "when",
    "why",
    "which",
    "whom",
    "whose",
    "whether",
    "whatsoever",
  ];
  return description
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .split(" ") // Split by space
    .filter((word) => word.length > 1 && !commonWords.includes(word));
};
//Functio to find a lost pet
const findPets = async (req, res) => {
  const { description, location } = req.body;

  // Validate input parameters
  if (!description || !location || !req.files || !req.files.image) {
    console.log(req.body);
    return res.status(400).send({ message: "all fields are required" });
  }

  // Validate description
  if (description.length < 5) {
    return res.status(400).send({ message: "not enough information given" });
  }

  // Validate location
  const validLocations = [
    "BEIRUT",
    "SOUTH",
    "NORTH",
    "BEKAA",
    "MOUNT LEBANON",
    "OTHER",
  ];
  if (!validLocations.includes(location.toUpperCase())) {
    return res
      .status(400)
      .send({ message: "location does not match available ones" });
  }

  // Validate image
  if (Array.isArray(req.files.image)) {
    return res
      .status(400)
      .send({ message: "Only one image can be uploaded at a time" });
  }
  try {
    const imageFile = req.files.image;
    const formData = new FormData();
    formData.append("image", imageFile.data, imageFile.name);

    // Send POST request to Flask server
    const flaskResponse = await axios.post(
      "http://localhost:5000/predict",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    // Extract breed from Flask response
    const breed = flaskResponse.data.breed;
    const filterByBreed = await Post.find({ breed: breed });
    if (filterByBreed.length == 0) {
      return res
        .status(200)
        .send({ message: "no animals found in our Database" });
    }
    filterByLocation = [];
    filterByBreed.forEach((post) => {
      if (post.location === location) {
        filterByLocation.push(post);
      }
    });
    if (filterByLocation.length == 0) {
      return res.status(200).send({
        message: "no animals found that location but breed is found",
        result: filterByBreed,
      });
    }

    const filteredByDescription = filterDescription(description);
    let mostSimilar = null;
    let count = 0;
    filterByLocation.forEach((post) => {
      let descriptionOfPostFiltered = filterDescription(post.description);
      const commonWordsCount = descriptionOfPostFiltered.filter((word) =>
        filteredByDescription.includes(word)
      ).length;
      if (commonWordsCount > count) {
        count = commonWordsCount;
        mostSimilar = post;
      }
    });
    if (mostSimilar === null) {
      return res.status(200).send({
        message:
          "no animals found with that description but location and breed match",
        result: filterByLocation,
      });
    }
    return res.status(200).send({
      message: "match found",
      result: mostSimilar,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
//Function to edit an existing post
const editPost = async (req, res) => {
  let { description, location, type, image, id } = req.body;
  let updatedValues = {};
  try {
    const post = await Post.findOne({ _id: id });
    //Post validation
    if (!post) {
      return res.status(404).send({ message: "post not found" });
    }
    //Post type validation
    if (type) {
      const validtypes = ["LOST", "FOUND"];
      if (!validtypes.includes(type)) {
        return res.status(400).send({ message: "type does not exist" });
      }
      updatedValues.type = type;
    }

    //Location validation
    if (location) {
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
      updatedValues.location = location;
    }

    //Description validation
    if (description) {
      if (description.length < 5) {
        return res
          .status(400)
          .send({ message: "not enough information given" });
      }
      updatedValues.description = description;
    }
    //Image validation
    if (req.files && req.files.image) {
      if (Array.isArray(req.files.image)) {
        return res
          .status(400)
          .send({ message: "Only one image can be uploaded at a time" });
      }
      const imageFile = req.files.image;

      const imageExtension = path.extname(imageFile.name);
      const imageName = `${id}-${Date.now()}${imageExtension}`;

      const imageDir = path.join(
        __dirname,
        "../public/images/posts",
        imageName
      );
      await imageFile.mv(imageDir).catch((err) => {
        console.error(err);
        return res.status(500).send({ message: "Error uploading image" });
      });
      updatedValues.image = imageName;
    }
    await Post.findByIdAndUpdate(id, updatedValues);
    return res.status(200).send({ message: "post updated" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate(
      "added_by",
      "_id name phone email"
    );
    return res.status(200).json({ posts: posts });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to get a specific post by id
const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({ _id: id }).populate(
      "added_by",
      "_id name phone email"
    );

    if (!post) {
      return res.status(404).send({ message: "post not found" });
    }

    return res.status(200).json({ post: post });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to delete a post
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    return res.status(200).send({ message: "post deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: "post not found" });
  }
};

module.exports = {
  addPost,
  editPost,
  getAllPosts,
  getPost,
  deletePost,
  findPets,
};
