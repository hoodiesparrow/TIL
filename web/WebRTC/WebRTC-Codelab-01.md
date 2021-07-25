# WebRTC - google codelab

google codelab 예제를 기반으로 주로 [Capture Audio and Video in HTML5 - HTML5 Rocks](https://www.html5rocks.com/en/tutorials/getusermedia/intro/) 를 참고하여 실습하며 코드를 분석하였다.



# step-01

##### index.html

```html
<!DOCTYPE html>
<html>
<head>
  <title>Realtime communication with WebRTC</title>
  <link rel="stylesheet" href="css/main.css" />
</head>
<body>
  <h1>Realtime communication with WebRTC</h1>

  <video autoplay playsinline></video>
  <script src="js/main.js"></script>
</body>
</html>
```

To use the webcam or microphone, you need to request permission. The parameter to `getUserMedia()` is an object specifying the details and requirements for each type of media you want to access. For example, if you want to access the webcam, the parameter should be `{video: true}`. To use both the microphone and camera, pass `{video: true, audio: true}`:

> Notice that you don't set a `src` attribute or include `<source>` elements on the `<video>` element. Instead of the URL of a media file, you give the video a `MediaStream` from the webcam.

> You also tell the `<video>` to `autoplay`, otherwise it would be frozen on the first frame. The addition of `controls` also works as you'd expect.



##### main.js

```javascript
'use strict';

// On this codelab, you will be streaming only video (video: true).
const mediaStreamConstraints = {
  video: true,
};

// Video element where stream will be placed.
const localVideo = document.querySelector('video');

// Local stream that will be reproduced on the video.
let localStream;

// Handles success by adding the MediaStream to the video element.
function gotLocalMediaStream(mediaStream) {
  localStream = mediaStream;
  localVideo.srcObject = mediaStream;
}

// Handles error by logging a message to the console with the error message.
function handleLocalMediaStreamError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

// Initializes media stream.
navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
  .then(gotLocalMediaStream).catch(handleLocalMediaStreamError);
```

다른 코드([Capture Audio and Video in HTML5 - HTML5 Rocks](https://www.html5rocks.com/en/tutorials/getusermedia/intro/))와 비교해 본다면,

- ```html
  <video autoplay></video>
  
  <script>
  const constraints = {
    video: true,
  };
  
  const video = document.querySelector("video");
  
  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream;
  });
  </script>
  ```

  `getUserMedia` 메서드에 access하고 싶은 미디어의 세부 사항과 요구 조건 등을 명시한 객체를 매개변수로 넘겨주면(여기서는 비디오에 접근하기 위해-권한- `{video: true}` 객체가 매개변수로 주어졌다.), 유저에게 권한을 승인받는다면 stream(정확한 type은 모르겠지만, 영상 그 자체인 것 같다)이 return되고, `.then` 구문에서 `video` 태그의 `srcObject` 속성에 return된 video stream을 할당해준다. 

  이후 video 태그에 `autoplay` 속성이 있어 들어오는 영상이 바로 재생되게 된다. `video` 태그에  `controls` 속성을 주면 전체화면, 정지 등의 버튼이 표시되는 게 흥미롭다.

  위의 코드의 `localStream = mediaStream;` 구문은 아직 선언만 되고 사용은 되지 않아서 아마도 추후 진행할 단계들에서 peer간 통신을 하게 되면 전송할 때 쓰이지 않을까 하는 생각이 들었다.



결과물:

![화면 캡처 2021-07-25 155740](../../../Pictures/coding/0725/화면 캡처 2021-07-25 155740.png)

