from flask import Flask, render_template, redirect, url_for, request

app = Flask(__name__)

colors={}

colors['choices']=[['1','Pink'],['2','Red'],['3','Blue']]
colors['results']=[0,0,0]

@app.route('/')
def hello():
    return render_template('home.html')

@app.route('/show_survey')
def show_survey():
    return colors

@app.route('/add', methods=['GET','POST'])
def add():
    if request.method=='POST':
        if request.json['vote']=='1':
            colors['results'][0]+=1
        if request.json['vote']=='2':
            colors['results'][1]+=1
        if request.json['vote']=='3':
            colors['results'][2]+=1
        return colors
    return colors

if __name__ == '__main__':
    app.run(debug=True)