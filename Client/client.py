from tkinter import *
from tkinter import ttk
import cv2
from PIL import Image, ImageTk
import numpy as np
cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

imagewidth = 800
imageheight = 800

cap.set(cv2.CAP_PROP_FRAME_WIDTH, imagewidth)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, imageheight)

root = Tk()
root.attributes('-fullscreen', True)
root.title = "Recycl.ai Client GUI"

style = ttk.Style()
style.configure("BW.TLabel", foreground="white", background="#ff00ff")

label = Label(root, text="Image")
label.pack()

label.place(
    relx=0.0,
    rely=0.5,
    anchor='w')


def openCameraFeed():
    while True:
        _, img = cap.read()
        b, g, r = cv2.split(img)
        img = cv2.merge((r, g, b))
        img = cv2.resize(img, (800, 600))
        img = Image.fromarray(img)
        imtk = ImageTk.PhotoImage(image=img)
        label.configure(image=imtk)
        label.image = imtk
        label.update()


root.after(0, openCameraFeed)
root.mainloop()
