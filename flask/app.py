from flask import Flask, request, jsonify
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
from PIL import Image
import io
import requests

app = Flask(__name__)

model = tf.keras.Sequential([
    hub.KerasLayer("https://tfhub.dev/google/imagenet/resnet_v2_50/classification/4", trainable=False)])
model.build([None, 224, 224, 3])

# for labels
labels_response = requests.get('https://storage.googleapis.com/download.tensorflow.org/data/ImageNetLabels.txt')
imagenet_labels = labels_response.text.splitlines()

def preprocess_image(image):
    image = Image.open(io.BytesIO(image))
    image = image.resize((224, 224))
    image = np.array(image)
    image = image / 255.0
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']

    if file:
        img_bytes = file.read()
        image = preprocess_image(img_bytes)
        predictions = model.predict(image)
        predicted_class = np.argmax(predictions[0])
        predicted_class_name = imagenet_labels[predicted_class]
        return jsonify({'breed': predicted_class_name})
    else:
        return jsonify({'error': 'Invalid image'}), 400

if __name__ == '__main__':
    app.run(debug=True)
