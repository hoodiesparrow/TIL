# VENV



여러 프로젝트를 진행하거나 프로젝트 배포시에 같은 패키지라도 서로 다른 버전을 사용할 수 있도록 해주는 것이 바로 VENV이다.

```bash
python -m venv venv
```

- 첫 venv는 내장모듈명, 두번째 venv는 가상환경의 이름이다.
  - 가상환경에 필요한 파일들이 만들어진다.

```python
source venv/Scripts/activate
```

- 가상환경상에서 터미널이 실행된다.
  - 이후 `VS code`기준으로 `f1`을 눌러 Python: Select Interpreter을 눌러 venv를 설정해주면, 배시창을 종료해도 다시 터미널을 열면 자동으로 venv상에서 실행된다.



```bash
pip freeze > requirements.txt
```

- 현재 패키지 상태를 requirements에 저장한다.

```bash
pip install -r requirements.txt
```

- requirements.txt에 저장된 패키지 목록(버전 정보 포함)을 설치한다.