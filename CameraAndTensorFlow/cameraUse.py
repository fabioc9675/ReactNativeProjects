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


def categorizar(frame):
    # respuesta = requests.get(url)
    # img = Image.open(BytesIO(respuesta.content))
    img = frame
    img = np.array(img).astype(float)/255

    img = cv2.resize(img, (224, 224))

    # print("begin prediction")

    prediccion = savedModel.predict(img.reshape(-1, 224, 224, 3))
    return np.argmax(prediccion[0], axis=-1)


def main():

    windowName = ['Binary', 'Binary Inv', 'Zero', 'Zero Inv', 'Trunc']

    cap = cv2.VideoCapture(1)

    texto = ''

    if cap.isOpened():
        ret, frame = cap.read()
    else:
        ret = False

    while ret:

        ret, frame = cap.read()

        th = 127
        max_val = 255

        ret, o1 = cv2.threshold(frame, th, max_val, cv2.THRESH_BINARY)
        # ret, o2 = cv2.threshold(frame, th, max_val, cv2.THRESH_BINARY_INV)
        # ret, o3 = cv2.threshold(frame, th, max_val, cv2.THRESH_TOZERO)
        # ret, o4 = cv2.threshold(frame, th, max_val, cv2.THRESH_TOZERO_INV)
        # ret, o5 = cv2.threshold(frame, th, max_val, cv2.THRESH_TRUNC)

        font = cv2.FONT_HERSHEY_SIMPLEX

        # Use putText() method for
        # inserting text on video
        cv2.putText(frame,
                    texto,
                    (50, 50),
                    font, 1,
                    (0, 255, 255),
                    2,
                    cv2.LINE_4)

        cv2.imshow(windowName[0], frame)
        # cv2.imshow(windowName[0], o1)
        # cv2.imshow(windowName[1], o2)
        # cv2.imshow(windowName[2], o3)
        # cv2.imshow(windowName[3], o4)
        # cv2.imshow(windowName[4], o5)

        prediccion = categorizar(frame)
        # print(prediccion)

        if (prediccion == 0):
            texto = 'Spoon'
            print('spoon')
        elif (prediccion == 1):
            texto = 'Knife'
            print('knife')
        elif (prediccion == 2):
            texto = 'Fork'
            print('fork')

        if cv2.waitKey(1) == 27:
            break

    cv2.destroyAllWindows()
    cap.release()


if __name__ == "__main__":
    main()
