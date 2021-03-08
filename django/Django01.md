## Django

**python** 기반의 web framework이다. 클라이언드와 서버를 모두 다룰 수 있어 Dynamic web을 만들 수 있다.

보통의 MVC (Model View Control) 모델과 구조는 동일하지만 부르는 명칭이 MTV (Model Template View)로 약간 다르다. 따라서 HTTP Request가 들어오면 Urls를 거쳐 View에서 필요하다면 데이터베이스에서 정보를 받아 View에 정보를 담아 회신한다.

Django의 기본 철학은 표현과 로직을 분리하는 것이다. 따라서 Templates에서는 표현만 하고, 로직은 view에서 처리하는 것이 제작 의도를 따르는 코딩 방법이 될 것이다. 또한 Template에는 상속을 통해 중복을 배제하고자 하는 목적이 담겨있다. (대부분의 웹사이트는 navbar, header, footer 등 사이트 내 다른 페이지들 간에 공유되는 공통 디자인을 갖는다.)



Django로 프로젝트를 생성하고 초기 설정을 하는 방법은 아래와 같다.



**\# 프로젝트  생성**

$ django-admin startproject projectName

$ cd projectName

$ python manage.py runserver

구동되는 것을 확인한다.



**\# Locale & Timezone**

`projectName / projectName / settings.py`

LANGUAGE_CODE = '**ko-kr**'

TIME_ZONE = '**Asia/Seoul**'



**\# application 생성**

$ python manage.py startapp applicationName  # applicationName should be in plural form. e.g.) article**s**

`projectName / projectName / settings.py` 

INSTALLED_APPS = [

  'applicationName',

> The order for INSTALLED_APPS goes 1. local apps 2. 3rd-party apps 3. django apps



**\# 템플릿 확장 (setting base.html)**

choose where to store base.html: 설정폴더 또는 프로젝트폴더

make a new directory (projectName / **templates**)

`projectName / projectName / settings.py` 

TEMPLATES = [

  { ...

​    'DIRS': [**BASE_DIR / 'templates'**],

> BASE_DIR = root

`projectName / templates / base.html`

{% block **content** %}

{% endblock **content** %}

> 여러 개의 블록이 있을 수 있으며, body안의 내용을 담당하는 블록은 보통 content 또는 body이름 부여



**\# URL분리**

`projectName / projectName / urls.py`

>  urls.py **상단의 주석**을 참조 !!

from django.urls import path**, include**

`projectName / applicationName / urls.py (create)`

from django.urls import path

from . import views

> 현재 파일이 있는 디렉토리에서 views를 가져온다.

urlpatterns = [ 

​	path('pageName/', views.pageName)

]

> 여기서는 views 안에 있는 함수를 호출하는 것이기 때문에 String이 아님.



`projectName / projectName / urls.py`

 path('applicationName/', include('**applicationName.urls**'))

> include 내부에는 String으로 인자를 넘겨준 것에 유의하자. applicationName.urls라는 변수는 없고 파일명을 넘겨준다고 생각하면 된다.



`projectName / applicationName / templates (create) / pageName`

