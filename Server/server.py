from flask import Flask, render_template, request, jsonify
import base64
import shutil
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
  image = image[...,::-1]
  results = model.predict(image, save=True)
  for r in results:
    boxes = r.boxes
    speed = r.speed['inference']
    confidencelist = []
    classlist = []
    for box in boxes:
      boxclass = box.cls.tolist()[0]
      classlist.append(boxclass)
      confidencelist.append(box.conf.tolist()[0])
  print(confidencelist)
  confidencelist.sort(reverse=True)
  print(confidencelist)
  try:
    didfail = classlist[0] is None
  except Exception as e:
    didfail = True
  print(didfail)
  jsonresults = {
    "nameid" : int(classlist[0]) if not didfail else 0,
    "confidence" : confidencelist[0] if not didfail else 0,
    "speed" : speed,
    "failed" : didfail
  }
  shutil.move("runs\detect\predict\image0.jpg", "Server/static/output.png")
  shutil.rmtree("runs")
  print(jsonresults)
  return jsonify(jsonresults)

@app.route("/500")
def fakefivehundo():
  print(1 + "asdasd")
  return "how in the hell does this still work"

@app.errorhandler(500)
def fivehundrederror(error):
  return render_template('error_500.html')
  
@app.errorhandler(404)
def invalid_route(error):
  return render_template('error_404.html')

print("Starting server...")
app.run(host='0.0.0.0', port=3000, debug=False)