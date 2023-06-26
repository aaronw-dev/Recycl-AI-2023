from flask import Flask, render_template, request, jsonify
import base64
print("Importing AI Packages...")
print("Importing YOLO...")
from ultralytics import YOLO
print("YOLO imported. Importing numpy...")
import numpy as np
print("numpy imported. Importing PIL...")
from PIL import Image
print("PIL imported.")

print("Loading model...")
model = YOLO("Server\\best.pt")
print("Model loaded.")

app = Flask(__name__) # Create an Instance
@app.route('/')
def homepage():
  return render_template('index.html')

@app.route('/inference')
def inferencepage():
  return render_template('inference.html')

@app.route('/processimage', methods=["GET","POST"])
def processimage():
  filecontents = request.json["file"][22:]
  filecontents = str.encode(filecontents)
  with open("output.png", "wb") as file:
    file.write(base64.decodebytes(filecontents))
    
  image = Image.open("output.png").convert('RGB')
  image = np.asarray(image)
  results = model.predict(image)
  for r in results:
    boxes = r.boxes
    speed = r.speed['inference']
    for box in boxes:
      boxbounds = box .xyxy[0] # get box coordinates in (top, left, bottom, right) format
      boxbounds = boxbounds.tolist()
      classlist = box.cls
      classlist = classlist.tolist()
      confidencelist = box.conf.tolist()
  jsonresults = {
    "nameid" : int(classlist[0]),
    "boundingbox" : str(boxbounds),
    "confidence" : confidencelist[0],
    "speed" : speed
  }
  print(jsonresults)
  return jsonify(jsonresults)

@app.errorhandler(500)
def fivehundrederror(error):
  return render_template('error_500.html')
  
@app.errorhandler(404)
def invalid_route(error):
  return render_template('error_404.html')

print("Starting server...")
app.run(host='0.0.0.0', port=3000, debug=False)