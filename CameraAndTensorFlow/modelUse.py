import tensorflow as tf
import numpy as np
from tensorflow.keras.models import load_model
# Categorizar una imagen de internet
from PIL import Image
import requests
from io import BytesIO
import cv2

# load model
savedModel = load_model('carpeta_salida/modelo_cocina/1')
savedModel.summary()


def categorizar(url):
    respuesta = requests.get(url)
    img = Image.open(BytesIO(respuesta.content))
    img = np.array(img).astype(float)/255

    img = cv2.resize(img, (224, 224))

    print("begin prediction")

    prediccion = savedModel.predict(img.reshape(-1, 224, 224, 3))
    return np.argmax(prediccion[0], axis=-1)


# 0 = cuchara, 1 = cuchillo, 2 = tenedor
# url = 'https://th.bing.com/th/id/R.e44940120b7b67680af246c3b3e936f2?rik=XZPLfxf4nHlzyw&pid=ImgRaw&r=0' #debe ser 2
# url = 'https://http2.mlstatic.com/D_NQ_NP_849130-MCO45458863289_042021-O.webp' #debe ser 2
# url = 'https://i.pinimg.com/564x/a5/da/bc/a5dabc952c44f4f5ebd61f2207b40e66.jpg' #debe ser 0
# url = 'https://i.pinimg.com/564x/1a/3c/e6/1a3ce6f96eb181bc776e6f3dbd3de65f.jpg' #debe ser 0
# url = 'https://i.pinimg.com/564x/99/1b/4a/991b4a2db20335d592451e3616ef2bf9.jpg' #debe ser 1
# url = 'https://i.pinimg.com/564x/32/6b/8f/326b8fa4a359c07c3f3cc249a4c73ad2.jpg' #debe ser 1

# url = 'https://tse3.mm.bing.net/th?id=OIP.ZCz_SCM5cbUgWHjR5UHBUwHaDM&pid=Api&P=0&w=396&h=171'  # debe ser 0
# url = 'https://tse2.mm.bing.net/th?id=OIP.8nVFxf9j99dKJoAB5oMZsgHaHa&pid=Api&P=0&w=175&h=175'  # debe ser 1
url = 'https://tse3.mm.bing.net/th?id=OIP.NRCDGEHDW-CZejKKhLSigAHaFh&pid=Api&P=0&w=222&h=165'  # debe ser 2

prediccion = categorizar(url)
print(prediccion)
