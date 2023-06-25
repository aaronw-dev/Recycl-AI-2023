from ultralytics import YOLO
from flask import Flask, render_template, request, Response
from waitress import serve
from PIL import Image
import json
#import torch
# Import Flask Class, and render_template
app = Flask(__name__) # Create an Instance

@app.route('/')
def homepage():
  return render_template('index.html')

@app.route('/inference')
def inferencepage():
  return render_template('inference.html')
  
@app.errorhandler(500)
def fivehundrederror(error):
  return render_template('error_500.html')
  
@app.errorhandler(404)
def invalid_route(error):
  return render_template('error_404.html')


# Albert's code'

@app.route("/detect", methods=["POST"])
def detect():
    buf = request.files["image_file"]
    boxes = detect_objects_on_image(Image.open(buf.stream))
    return Response(
      json.dumps(boxes),  
      mimetype='application/json'
    )

def detect_objects_on_image(buf):
    model = YOLO("best.pt")
    results = model.predict(buf)
    result = results[0]
    output = []
    for box in result.boxes:
        x1, y1, x2, y2 = [
          round(x) for x in box.xyxy[0].tolist()
        ]
        class_id = box.cls[0].item()
        prob = round(box.conf[0].item(), 2)
        output.append([
          x1, y1, x2, y2, result.names[class_id], prob
        ])
    return output


#Albet's code
app.run(host='0.0.0.0', port=3000, debug=False)