# 유니네 공부방 출석체크봇 김해리

> 출석체크 채널에 메세지를 보내면 자동으로 출석체크를 해주는 고양이



```
/start subject(optional)

- 공부 시작

/end

- 공부 끝

/setmyname

- DB에 이름 저장
```

#### Stacks

- discordjs + MongoDB + AWS + Notion API

#### How it works

- nodejs server deployed in AWS in order to maintain the bot 24/7
  - Private Subnet EC2 -> NAT Gateway
    - used Session Manager to build environment
  - connected to discord channel using discordjs
- Free tier MongoDB instance
  - used to save discord userId && username && study status

- Calls Notion API to log studies

### Refs

- [How To Make A Discord Bot(Fusion Terror)_Youtube](https://www.youtube.com/playlist?list=PLv0io0WjFNn9LDsv1W4fOWygNFzY342Jm)
