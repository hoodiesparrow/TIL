클래스 결과물 이미지 url들을 도큐먼트 내부에 `classResultThumbnailImages` 배열에 저장했는데, 해상도를 올려야 할 일이 생겼다.

이미지는 firebase에 저장되며, 사용자가 업로드할 때 400과 1024로 리사이징었으며 url에 사이즈가 `400x400`의 형태로 명시되어 저장되었다.

일일이 수작업으로 수정하기에는 도큐먼트가 많아서 검색한 결과, 

- https://stackoverflow.com/questions/12589792/how-to-replace-substring-in-mongodb-document

위의 스택오버플로를 참고하여 파이프라인을 짤 수 있었다.

하지만 배열에 저장된 값들이라 제대로 적용이 되지 않았는데, 

- https://www.mongodb.com/community/forums/t/using-replaceone-on-arrays/115837/2
- https://www.mongodb.com/docs/manual/reference/operator/aggregation/map/

첫 번째 링크를 본 후 `$map`을 알게되어 문서를 참고하여 해결할 수 있었다. 파이프라인은 MongoDB Compass aggregation pipeline builder를 이용해 작성했다.



```js
[{$match: {
 classResultThumbnailImages: {
  $regex: RegExp('400x400')
 }
}}, {$set: {
 classResultThumbnailImages: {
  $map: {
   input: '$classResultThumbnailImages',
   as: 'image',
   'in': {
    $replaceOne: {
     input: '$$image',
     find: '400x400',
     replacement: '1024x1024'
    }
   }
  }
 }
}}, {$merge: {
 into: 'classes',
 on: '_id',
 whenMatched: 'merge',
 whenNotMatched: 'fail'
}}]
```

- `$map`의 경우 자바스크립트의 그것을 쓰는 게 아닐까 싶은 생각이 들었다. 

  ```js
  input.map((image) => in(image))
  ```

  이런 느낌으로 `input`으로 배열을 받고 `in`은 콜백함수, `as`는 변수명의 역할을 한다.

