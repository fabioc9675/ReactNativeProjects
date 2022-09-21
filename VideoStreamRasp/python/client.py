import cv2
import socketio
import base64
import imutils
import time


def main():

    # standard definition for python
    sio = socketio.Client()
    sio.connect("https://greenhouse-vid.herokuapp.com")
    print("my id is: ", sio.sid)

    # video capturing
    cap = cv2.VideoCapture(0)

    if cap.isOpened():
        ret, frame = cap.read()
    else:
        ret = False

    while ret:

        ret, frame = cap.read()
        frame = imutils.resize(frame, width=320)
        frame = cv2.flip(frame, 1)
        # cv2.imshow('frame', frame)
        # res, image = cv2.imencode(
        #     '.webp', frame, [cv2.IMWRITE_WEBP_QUALITY, 50])
        res, image = cv2.imencode('.png', frame)
        # img = cv2.imdecode(image, 1)
        # cv2.imshow('frame', img)
        data = base64.urlsafe_b64encode(image)
        size = len(data)

        sio.emit('stream', "data:image/png;base64," + data.decode('utf-8'))

        # print(image)
        time.sleep(0.5)

        # the 'q' button is set as the
        # quitting button you may use any
        # desired button of your choice
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cv2.destroyAllWindows()
    cap.release()


if __name__ == "__main__":
    main()
