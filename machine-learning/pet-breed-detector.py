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

