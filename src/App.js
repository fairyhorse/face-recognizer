import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import * as faceapi from 'face-api.js';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: 'https://64.media.tumblr.com/18976c0d0278e1f4f80a5abf57ec1a16/tumblr_n63ctyn0ZU1sn75h6o1_640.jpg',
      imageUrl: ''
    }
  }

  async start () {
    const imageUpload = document.getElementById('image')
    const container = document.getElementById('container')
    let image
    let canvas
    imageUpload.addEventListener('change', async () => {
      if (image) image.remove()
      if (canvas) canvas.remove()
      image = await faceapi.bufferToImage(imageUpload.files[0])
      container.append(image)
      canvas = faceapi.createCanvasFromMedia(image)
      container.append(canvas)
      const displaySize = { width: image.width, height: image.height }
      faceapi.matchDimensions(canvas, displaySize)
      const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      resizedDetections.forEach((result, i) => {
        const box = resizedDetections[i].detection.box
        const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
        drawBox.draw(canvas)
      })
    })
  }
    

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    faceapi.loadFaceRecognitionModel('/model')
    .then(this.start)
    .catch(e => console.log(e))
  }
  
  render() {
    return ( 
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.input} />
      </div>
    );
  }
}

export default App;
