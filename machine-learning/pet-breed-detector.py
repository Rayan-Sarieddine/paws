
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

'''Mounted at /content/drive'''


#Getting the pet breed labels from the files
Name=[]
for file in os.listdir(directory):
    Name+=[file]
print(Name)
print(len(Name))
'''['siamese', 'yorkshire_terrier', 'staffordshire_bull_terrier', 'sphynx', 'shiba_inu', 'wheaten_terrier', 'scottish_terrier', 'samoyed', 'saint_bernard', 'pug', 'pomeranian', 'russian_blue', 'newfoundland', 'ragdoll', 'persian', 'miniature_pinscher', 'leonberger', 'maine_coon', 'keeshond', 'great_pyrenees', 'japanese_chin', 'havanese', 'german_shorthaired', 'british_shorthair', 'chihuahua', 'boxer', 'egyptian_mau', 'english_setter', 'english_cocker_spaniel', 'bombay', 'birman', 'bengal', 'beagle', 'basset_hound', 'american_bulldog', 'abyssinian', 'american_pit_bull_terrier']
 37'''

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


#transforming the categorical labels into a format that's more suitable for use in training classification models, especially neural networks.
labels1=to_categorical(labels0)
labels=np.array(labels1)

#converting the lists data and test into NumPy arrays which helps in effeciency
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
'''(4712, 180, 180, 3)
 (1178, 180, 180, 3)
 (4712, 37)
 (1178, 37)'''


# initializing an ImageDataGenerator in TensorFlow's Keras API.
datagen = ImageDataGenerator(horizontal_flip=True,vertical_flip=True,rotation_range=20,zoom_range=0.2,
                        width_shift_range=0.2,height_shift_range=0.2,shear_range=0.1,fill_mode="nearest")
pretrained_model3 = tf.keras.applications.DenseNet121(input_shape=(180,180,3),include_top=False,weights='imagenet',pooling='avg')
pretrained_model3.trainable = False

'''Downloading data from https://storage.googleapis.com/tensorflow/keras-applications/densenet/densenet121_weights_tf_dim_ordering_tf_kernels_notop.h5
 29084464/29084464 [==============================] - 0s 0us/step'''


#continuation of setting up a convolutional neural network for image classification using transfer learning with TensorFlow's Keras API.
inputs3 = pretrained_model3.input
x3 = tf.keras.layers.Dense(128, activation='relu')(pretrained_model3.output)
outputs3 = tf.keras.layers.Dense(37, activation='softmax')(x3)
model = tf.keras.Model(inputs=inputs3, outputs=outputs3)


#model is compiled in TensorFlow's Keras API, which is an essential step in preparing the model for training
model.compile(optimizer='adam',loss='categorical_crossentropy',metrics=['accuracy'])

#training model
his=model.fit(datagen.flow(trainx,trainy,batch_size=32),validation_data=(testx,testy),epochs=30)

'''Epoch 1/30
 148/148 [==============================] - 604s 4s/step - loss: 2.2135 - accuracy: 0.3969 - val_loss: 0.8026 - val_accuracy: 0.7521
 Epoch 2/30
 148/148 [==============================] - 592s 4s/step - loss: 1.2568 - accuracy: 0.6201 - val_loss: 0.6278 - val_accuracy: 0.7997
 Epoch 3/30
 148/148 [==============================] - 605s 4s/step - loss: 1.0191 - accuracy: 0.6857 - val_loss: 0.5717 - val_accuracy: 0.8107
 Epoch 4/30
 148/148 [==============================] - 554s 4s/step - loss: 0.9258 - accuracy: 0.7114 - val_loss: 0.5693 - val_accuracy: 0.8124
 Epoch 5/30
 148/148 [==============================] - 581s 4s/step - loss: 0.8720 - accuracy: 0.7317 - val_loss: 0.5441 - val_accuracy: 0.8328
 Epoch 6/30
 148/148 [==============================] - 583s 4s/step - loss: 0.8272 - accuracy: 0.7451 - val_loss: 0.5810 - val_accuracy: 0.8209
 Epoch 7/30
 148/148 [==============================] - 580s 4s/step - loss: 0.8028 - accuracy: 0.7475 - val_loss: 0.4926 - val_accuracy: 0.8404
 Epoch 8/30
 148/148 [==============================] - 584s 4s/step - loss: 0.7417 - accuracy: 0.7615 - val_loss: 0.5517 - val_accuracy: 0.8336
 Epoch 9/30
 148/148 [==============================] - 582s 4s/step - loss: 0.7081 - accuracy: 0.7782 - val_loss: 0.5257 - val_accuracy: 0.8328
 Epoch 10/30
 148/148 [==============================] - 583s 4s/step - loss: 0.7126 - accuracy: 0.7721 - val_loss: 0.5190 - val_accuracy: 0.8311
 Epoch 11/30
 148/148 [==============================] - 580s 4s/step - loss: 0.6966 - accuracy: 0.7806 - val_loss: 0.5256 - val_accuracy: 0.8345
 Epoch 12/30
 148/148 [==============================] - 542s 4s/step - loss: 0.6873 - accuracy: 0.7776 - val_loss: 0.5615 - val_accuracy: 0.8192
 Epoch 13/30
 148/148 [==============================] - 583s 4s/step - loss: 0.6429 - accuracy: 0.7950 - val_loss: 0.5393 - val_accuracy: 0.8294
 Epoch 14/30
 148/148 [==============================] - 536s 4s/step - loss: 0.6695 - accuracy: 0.7810 - val_loss: 0.4828 - val_accuracy: 0.8463
 Epoch 15/30
 148/148 [==============================] - 542s 4s/step - loss: 0.6128 - accuracy: 0.8039 - val_loss: 0.5125 - val_accuracy: 0.8404
 Epoch 16/30
 148/148 [==============================] - 578s 4s/step - loss: 0.6057 - accuracy: 0.8007 - val_loss: 0.5061 - val_accuracy: 0.8379
 Epoch 17/30
 148/148 [==============================] - 578s 4s/step - loss: 0.6086 - accuracy: 0.7986 - val_loss: 0.5174 - val_accuracy: 0.8328
 Epoch 18/30
 148/148 [==============================] - 581s 4s/step - loss: 0.5668 - accuracy: 0.8122 - val_loss: 0.5291 - val_accuracy: 0.8387
 Epoch 19/30
 148/148 [==============================] - 598s 4s/step - loss: 0.5883 - accuracy: 0.8124 - val_loss: 0.5279 - val_accuracy: 0.8353
 Epoch 20/30
 148/148 [==============================] - 589s 4s/step - loss: 0.5496 - accuracy: 0.8217 - val_loss: 0.5146 - val_accuracy: 0.8430
 Epoch 21/30
 148/148 [==============================] - 548s 4s/step - loss: 0.5574 - accuracy: 0.8205 - val_loss: 0.5172 - val_accuracy: 0.8413
 Epoch 22/30
 148/148 [==============================] - 588s 4s/step - loss: 0.5537 - accuracy: 0.8175 - val_loss: 0.5014 - val_accuracy: 0.8404
 Epoch 23/30
 148/148 [==============================] - 593s 4s/step - loss: 0.5409 - accuracy: 0.8285 - val_loss: 0.5156 - val_accuracy: 0.8438
 Epoch 24/30
 148/148 [==============================] - 550s 4s/step - loss: 0.5285 - accuracy: 0.8205 - val_loss: 0.5422 - val_accuracy: 0.8489
 Epoch 25/30
 148/148 [==============================] - 548s 4s/step - loss: 0.5332 - accuracy: 0.8219 - val_loss: 0.5093 - val_accuracy: 0.8489
 Epoch 26/30
 148/148 [==============================] - 553s 4s/step - loss: 0.5263 - accuracy: 0.8289 - val_loss: 0.5051 - val_accuracy: 0.8430
 Epoch 27/30
 148/148 [==============================] - 578s 4s/step - loss: 0.5117 - accuracy: 0.8298 - val_loss: 0.5148 - val_accuracy: 0.8362
 Epoch 28/30
 148/148 [==============================] - 593s 4s/step - loss: 0.4857 - accuracy: 0.8425 - val_loss: 0.4864 - val_accuracy: 0.8506
 Epoch 29/30
 148/148 [==============================] - 579s 4s/step - loss: 0.4983 - accuracy: 0.8323 - val_loss: 0.5419 - val_accuracy: 0.8353
 Epoch 30/30
 148/148 [==============================] - 584s 4s/step - loss: 0.4996 - accuracy: 0.8340 - val_loss: 0.5018 - val_accuracy: 0.8514'''


#model results
y_pred=model.predict(testx)
pred=np.argmax(y_pred,axis=1)
ground = np.argmax(testy,axis=1)
print(classification_report(ground,pred))

'''37/37 [==============================] - 109s 3s/step
              precision    recall  f1-score   support

           0       0.78      0.82      0.80        22
           1       0.91      0.91      0.91        33
           2       0.78      0.78      0.78        27
           3       0.82      0.90      0.86        31
           4       0.89      0.89      0.89        28
           5       0.97      0.86      0.91        35
           6       0.97      0.89      0.93        37
           7       0.87      0.97      0.92        34
           8       0.96      0.69      0.81        39
           9       1.00      0.97      0.98        31
          10       1.00      0.88      0.93        32
          11       0.78      0.81      0.79        31
          12       0.87      0.90      0.88        29
          13       0.79      0.68      0.73        34
          14       0.94      0.83      0.88        35
          15       0.82      0.79      0.81        34
          16       0.84      0.94      0.89        33
          17       0.71      0.87      0.78        31
          18       0.93      0.90      0.92        30
          19       0.89      0.87      0.88        38
          20       0.90      0.92      0.91        38
          21       0.93      0.84      0.89        32
          22       0.91      0.91      0.91        34
          23       0.66      0.86      0.75        29
          24       0.95      0.77      0.85        26
          25       0.62      0.95      0.75        21
          26       1.00      0.74      0.85        31
          27       0.86      0.97      0.91        31
          28       0.81      0.84      0.83        31
          29       1.00      0.93      0.96        29
          30       0.78      0.86      0.82        37
          31       0.86      0.92      0.89        39
          32       0.88      0.67      0.76        42
          33       0.77      0.88      0.82        34
          34       0.68      0.90      0.78        31
          35       0.79      0.71      0.75        21
          36       0.79      0.68      0.73        28

    accuracy                           0.85      1178
   macro avg       0.86      0.85      0.85      1178
weighted avg       0.86      0.85      0.85      1178'''

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
'''Refer to figure1.png'''

#Training vs validation loss graph
epochs = range(len(get_loss))
plt.plot(epochs, get_loss, 'r', label='Loss of Training data')
plt.plot(epochs, validation_loss, 'b', label='Loss of Validation data')
plt.title('Training vs validation loss')
plt.legend(loc=0)
plt.figure()
plt.show()
'''Refer to figure2.png'''

#test1
image=load_img("/content/drive/MyDrive/paws-dataset/Cats-and-Dogs-Breed-Dataset-main/TEST/1006.jpg",target_size=(180,180))
'''Refer to testImg.png'''
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
'''1/1 [==============================] - 0s 103ms/step
Prediction is saint_bernard.'''

#test2
print(test.shape)
prediction2=model.predict(test)
print(prediction2.shape)
pred2=[]
for item in prediction2:
    value2=np.argmax(item)
    move_name2=mapper(value2)
    pred2+=[move_name2]
'''(1500, 180, 180, 3)
47/47 [==============================] - 137s 3s/step
(1500, 37)'''


#test2 results
print(testfile[0:3])
print(pred2[0:3])
print(len(testfile))
print(len(pred2))
'''['1413.jpg', '1417.jpg', '1433.jpg']
['bengal', 'boxer', 'great_pyrenees']
1500
1500'''

#number extraction for each image
numbers=[]
for item in testfile:
    s=item[0:-4]
    numbers+=[int(s)]


#print results for all test folder
result = pd.DataFrame(testfile)
result[1] = pred2
result[2] = numbers
result.columns = ['Filename','Class','Numbers']
print(result)
'''      Filename           Class  Numbers
0     1413.jpg          bengal     1413
1     1417.jpg           boxer     1417
2     1433.jpg  great_pyrenees     1433
3     1410.jpg      pomeranian     1410
4     1435.jpg       shiba_inu     1435
...        ...             ...      ...
1495   142.jpg           boxer      142
1496  1415.jpg       chihuahua     1415
1497  1444.jpg          beagle     1444
1498  1400.jpg      abyssinian     1400
1499  1450.jpg    egyptian_mau     1450

[1500 rows x 3 columns]'''


#save the model
model.save('/content/paws-model')