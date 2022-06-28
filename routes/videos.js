const express = require('express')
const router = express.Router();
const data = require('../data/videos.json')
const fs = require('fs');
const path = require("path");
const { v4: newId } = require('uuid');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

router.get('/', (req,res) => {
    const videos = data.map(video => {
        return {
            'id':video.id,
            'title': video.title,
            'channel': video.channel,
            'image': video.image
        }
    });
    res.send(videos)
    res.status(200)
})

router.get('/:id', (req,res) => {
    const currentVideo = data.find(data => data.id === req.params.id)
    res.status(200)
    res.send(currentVideo)
})

router.get('/photo/:id', (req, res) => {
    res.sendFile('C:\\Users\\denve\\Desktop\\Brainflix\\denver-reghelini-brainflix-api\\public\\images\\' + req.params.id);
});

router.post('/', (req,res) => {
    let newVideo = {
        "id": newId(),
        "title":req.body.title,
        "description":req.body.description,
        "channel": lorem.generateWords(2),
        "timestamp": new Date(),
        "image": "http://localhost:8000/videos/photo/image1.jpeg",
        "views": Math.floor(Math.random()*100000),
        "likes": Math.floor(Math.random()*10000),
        "duration": "4:01",
        "video": "https://project-2-api.herokuapp.com/stream",
        "comments": [
            
        ]
    }

    data.push(newVideo)
    let newData = JSON.stringify(data)

    fs.writeFileSync(path.resolve(__dirname, "../data/videos.json"), newData, err => {
        if (err) {
            console.error(err);
        }
    })
    res.send(newData)

   
    
})

module.exports = router