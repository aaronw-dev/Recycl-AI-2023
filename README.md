# Recycl.ai
## An AI image classifier to aid with disposing of recyclable containers.

Have you ever just thrown a bunch of garbage in the trash can, not knowing where the individual pieces of garbage should have gone? It’s okay. Lots of people run into this dilemma, and because of this, only **9%** of recyclable material in Canada is actually recycled properly, and only **5%** in the US. Introducing Recycl.ai, an AI tool powered by computer vision that helps you learn how to sort your trash. 
## Why we built it
We built Recycl.ai because we were inspired by our recycling club at school, which was composed of a body of students dedicated to helping others and the environment, volunteering their time to help sort recycling from the trash. We felt that this idea was not as far-reaching in the school district as we thought it should be. Despite our continued efforts, hundreds of volunteer hours and training, we realized that no matter how much time we spend ensuring our school is clean and doing its part for the environment, people are still ignorant about recycling. They don’t have the time to learn what each symbol means, that's where Recycl.ai comes into play. VSHacks gave us a good opportunity to bring our dreams into reality, teaching people how to care for the environment in our own way. 

## How it works
Recycl.ai is powered by Flask and Ultralytics, and it runs the latest training algorithm for its computer vision model. We created our own dataset of 4.6K images trained on different classes and annotated using Roboflow. The training was done on Google Colab. Other than Roboflow and YOLOv8, Recycl.ai uses a Flask server to run the Python code for image inference and detection.

## Into the future
We plan to turn this small hackathon project into a startup at some point in time, buut only time will tell. Thank you for yor consideration in judging. 