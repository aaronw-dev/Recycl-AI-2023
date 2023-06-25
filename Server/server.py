from flask import Flask, render_template
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
  return render_template('error.html', errorcode = error)
  
@app.errorhandler(404)
def invalid_route(error):
  return render_template('error.html')
app.run(host='0.0.0.0', port=5000, debug=False)