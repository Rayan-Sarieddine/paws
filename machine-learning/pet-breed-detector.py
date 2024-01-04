#imports needed
import numpy as np
import pandas as pd
import os
import matplotlib.pyplot as plt
import tensorflow as tf

from tensorflow.keras.utils import to_categorical
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.preprocessing.image import ImageDataGenerator

from sklearn.metrics import classification_report, log_loss, accuracy_score
from sklearn.model_selection import train_test_split

from google.colab import drive
drive.mount('/content/drive', force_remount=True)

#importing test and train files from drive
directory = '/content/drive/MyDrive/paws-dataset/Cats-and-Dogs-Breed-Dataset-main/TRAIN'
directory2 = '/content/drive/MyDrive/paws-dataset/Cats-and-Dogs-Breed-Dataset-main/TEST'

#Getting the pet breed labels from the files
Name=[]
for file in os.listdir(directory):
    Name+=[file]
print(Name)
print(len(Name))

#mapping labels to numbers
mapping={ 'basset_hound':0, 'beagle':1, 'russian_blue':2, 'pomeranian':3, 'ragdoll':4,
         'staffordshire_bull_terrier':5, 'keeshond':6, 'siamese':7, 'pug':8, 'shiba_inu':9,
         'american_pit_bull_terrier':10, 'bengal':11, 'british_shorthair':12, 'newfoundland':13,
         'havanese':14, 'japanese_chin':15, 'german_shorthaired':16, 'birman':17, 'maine_coon':18,
         'english_cocker_spaniel':19, 'scottish_terrier':20, 'wheaten_terrier':21, 'chihuahua':22,
         'american_bulldog':23, 'abyssinian':24, 'boxer':25, 'yorkshire_terrier':26, 'miniature_pinscher':27,
         'sphynx':28, 'samoyed':29, 'leonberger':30, 'bombay':31, 'english_setter':32, 'persian':33,
         'great_pyrenees':34, 'egyptian_mau':35, 'saint_bernard':36 }


#loading and preprocessing the images from  dataset, and organizing them into a format suitable for training a machine learning model.
dataset=[]
count=0 
for file in os.listdir(directory): 
    path=os.path.join(directory,file) 
    for im in os.listdir(path):
        image=load_img(os.path.join(path,im), grayscale=False, color_mode='rgb', target_size=(180,180)) 
        image=img_to_array(image) 
        image=image/255.0 
        dataset.append([image,count])
    count=count+1

#same preprocessing for test folder without the labels
    test=[] 
testfile=[] 
for file in os.listdir(directory2):
    path=os.path.join(directory2,file)
    image=load_img(path, grayscale=False, color_mode='rgb', target_size=(180,180))
    image=img_to_array(image)
    image=image/255.0
    test+=[image]
    testfile+=[file]

# getting the dataset in the format of dataset = [[image1, label1], [image2, label2], [image3, label3]]
    data,labels0=zip(*dataset)


#transforming your categorical labels into a format that's more suitable for use in training classification models, especially neural networks.
labels1=to_categorical(labels0)
labels=np.array(labels1)

#converting the lists data and test into NumPy arrays which helps in effeciency, functionality (NumPy provides a wide array of mathematical functions) and framework compatibility (Machine learning frameworks like TensorFlow and Keras typically expect data in the form of NumPy arrays)
data=np.array(data)
test=np.array(test)

#reshaping the data to a 4 dimensional array because CNNs expect input in that form
data2=data.reshape(-1,180,180,3)
test2=test.reshape(-1,180,180,3)


# to split a dataset into training and testing subsets
trainx,testx,trainy,testy=train_test_split(data,labels,test_size=0.2,random_state=44)

#(number of training samples, image height, image width, number of color channels).
print(trainx.shape)
print(testx.shape)
print(trainy.shape)
print(testy.shape)


# initializing an ImageDataGenerator in TensorFlow's Keras API.
datagen = ImageDataGenerator(horizontal_flip=True,vertical_flip=True,rotation_range=20,zoom_range=0.2,
                        width_shift_range=0.2,height_shift_range=0.2,shear_range=0.1,fill_mode="nearest")
pretrained_model3 = tf.keras.applications.DenseNet121(input_shape=(180,180,3),include_top=False,weights='imagenet',pooling='avg')
pretrained_model3.trainable = False
#continuation of setting up a convolutional neural network for image classification using transfer learning with TensorFlow's Keras API.
inputs3 = pretrained_model3.input
x3 = tf.keras.layers.Dense(128, activation='relu')(pretrained_model3.output)
outputs3 = tf.keras.layers.Dense(37, activation='softmax')(x3)
model = tf.keras.Model(inputs=inputs3, outputs=outputs3)


#model is compiled in TensorFlow's Keras API, which is an essential step in preparing the model for training
model.compile(optimizer='adam',loss='categorical_crossentropy',metrics=['accuracy'])

#training model
his=model.fit(datagen.flow(trainx,trainy,batch_size=32),validation_data=(testx,testy),epochs=30)

#model results
y_pred=model.predict(testx)
pred=np.argmax(y_pred,axis=1)
ground = np.argmax(testy,axis=1)
print(classification_report(ground,pred))


#Training vs validation accuracy graph
get_acc = his.history['accuracy']
value_acc = his.history['val_accuracy']
get_loss = his.history['loss']
validation_loss = his.history['val_loss']
epochs = range(len(get_acc))
plt.plot(epochs, get_acc, 'r', label='Accuracy of Training data')
plt.plot(epochs, value_acc, 'b', label='Accuracy of Validation data')
plt.title('Training vs validation accuracy')
plt.legend(loc=0)
plt.figure()
plt.show()

#Training vs validation loss graph
epochs = range(len(get_loss))
plt.plot(epochs, get_loss, 'r', label='Loss of Training data')
plt.plot(epochs, validation_loss, 'b', label='Loss of Validation data')
plt.title('Training vs validation loss')
plt.legend(loc=0)
plt.figure()
plt.show()

#test1
image=load_img("/content/drive/MyDrive/paws-dataset/Cats-and-Dogs-Breed-Dataset-main/TEST/1006.jpg",target_size=(180,180))
image=img_to_array(image)
image=image/255.0
prediction_image=np.array(image)
prediction_image= np.expand_dims(image, axis=0)

#reverse mapping
reverse_mapping={  0:'basset_hound', 1:'beagle', 2:'russian_blue', 3:'pomeranian', 4:'ragdoll',
         5:'staffordshire_bull_terrier', 6:'keeshond', 7:'siamese', 8:'pug', 9:'shiba_inu',
         10:'american_pit_bull_terrier', 11:'bengal', 12:'british_shorthair', 13:'newfoundland',
         14:'havanese', 15:'japanese_chin', 16:'german_shorthaired', 17:'birman', 18:'maine_coon',
         19:'english_cocker_spaniel', 20:'scottish_terrier', 21:'wheaten_terrier', 22:'chihuahua',
         23:'american_bulldog', 24:'abyssinian', 25:'boxer', 26:'yorkshire_terrier', 27:'miniature_pinscher',
         28:'sphynx', 29:'samoyed', 30:'leonberger', 31:'bombay', 32:'english_setter', 33:'persian',
         34:'great_pyrenees', 35:'egyptian_mau', 36:'saint_bernard' }

def mapper(value):
    return reverse_mapping[value]

prediction=model.predict(prediction_image)
value=np.argmax(prediction)#np.argmax is used to find the index of the maximum value in the prediction array, which corresponds to the most likely class label.
move_name=mapper(value)
print("Prediction is {}.".format(move_name))