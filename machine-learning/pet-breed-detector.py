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