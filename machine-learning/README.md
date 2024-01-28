# Dataset:

Dataset consists of 37 different breeds of dogs and cats divided between training and testing, in the train, each folder is a breed(37 folders) and each breed folder contains 160 images of the specified breed (the label in the training is the folder name of the images).
In the testing it is a total of random breeds divided to 1500 images with no labels given.

# ML Paradign:

My model uses supervised learning, where you train a model on a labeled dataset. In this case, the dataset consists of images of various cat and dog breeds, each labeled with its corresponding breed. The model learns to associate images with these labels.

# Purpose:

The specific task here is classification, where the model is trained to categorize each image into one of several predefined classes (the different breeds)

# Model Architecture:

The model is built using a Convolutional Neural Network (CNN), which is highly effective for image classification tasks. The architecture includes several convolutional layers, pooling layers, and fully connected layers. I leverage transfer learning by utilizing a pre-trained model, DenseNet121, as the base. The pre-trained model's weights are frozen, and custom layers are added on top to fine-tune the model for my specific classification task.

## Transfer Learning:

- Base Model: DenseNet121 trained on the ImageNet dataset.
- Custom Layers: A Dense layer with 128 neurons and ReLU activation, followed by a final output layer with softmax activation corresponding to the number of classes (37 breeds).

# Training Process:

The model is trained using the following configurations:

- Optimizer: Adam
- Loss Function: Categorical Crossentropy
- Metrics: Accuracy
- Epochs: The model is trained for 30 epochs.
- Batch Size: 32
- Data Augmentation: To make the model robust against overfitting and to increase its generalization capabilities, I apply data augmentation techniques such as horizontal flip, vertical flip, random rotations, zoom, width shift, height shift, and shear transformations.

# Evaluation:

After training, the model is evaluated on a separate test set. The following metrics are computed to assess the performance of the model:

- Accuracy: The percentage of correctly classified images in the test set.
- Loss: The value of the loss function on the test set, indicating how well the model is performing.
- Classification Report: Includes precision, recall, f1-score for each breed.

# Prediction:

For making predictions:

- The input image is preprocessed to match the input requirements of the model (resizing to 180x180 pixels, setting grayscale, RGB and scaling pixel values).
- The preprocessed image is fed into the model, and the softmax layer outputs the probabilities for each class.
- The class with the highest probability is considered the model's prediction for the input image.

# Visualizing Results:

- Training vs Validation Accuracy Graph: Plotted to visualize the accuracy of the model on the training and validation data across epochs.
- Training vs Validation Loss Graph: Plotted to visualize the loss on the training and validation data across epochs, helping in understanding if the model is overfitting or underfitting.

# Using the Model:

To use the model for making predictions on new data:

1. Load the trained model.
2. Preprocess the input image (resizing, normalization).
3. Use the `model.predict()` method to get the predicted class.
4. Map the predicted class index to the corresponding breed name using the mapping dictionary.

# Conclusion:

This model demonstrates the capabilities of CNNs (Convolutional Neural Networks) and transfer learning in classifying images into various categories. By leveraging a pre-trained DenseNet121 model and adding custom layers, the model efficiently learns to distinguish between 37 different breeds of dogs and cats, showcasing the power of deep learning in handling complex image classification tasks.

# Project Use:

The model is used throughout the project to:
-Search for a lost pet by uploading its image (plus additional information to refine the search) in the website.
-Report a found pet by uploading its image in the website.
-Identify the breed of the user's pet in the mobile application.
