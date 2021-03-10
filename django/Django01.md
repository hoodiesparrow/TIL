## Django

**python** 기반의 web framework이다. 클라이언드와 서버를 모두 다룰 수 있어 Dynamic web을 만들 수 있다.

보통의 MVC (Model View Control) 모델과 구조는 동일하지만 부르는 명칭이 MTV (Model Template View)로 약간 다르다. 따라서 HTTP Request가 들어오면 Urls를 거쳐 View에서 필요하다면 데이터베이스에서 정보를 받아 View에 정보를 담아 회신한다.

Django의 기본 철학은 표현과 로직을 분리하는 것이다. 따라서 Templates에서는 표현만 하고, 로직은 view에서 처리하는 것이 제작 의도를 따르는 코딩 방법이 될 것이다. 또한 Template에는 상속을 통해 중복을 배제하고자 하는 목적이 담겨있다. (대부분의 웹사이트는 navbar, header, footer 등 사이트 내 다른 페이지들 간에 공유되는 공통 디자인을 갖는다.)



Django로 프로젝트를 생성하고 초기 설정을 하는 방법은 아래와 같다.



**\# 프로젝트  생성**

$ django-admin startproject projectName

$ cd projectName

$ python manage.py runserver

> 구동되는 것을 확인한다.



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

**urlpatterns** = [ 

​	path('**pageName/**', **views.pageName**)

]

> 여기서는 views 안에 있는 함수를 호출하는 것이기 때문에 String이 아님.



`projectName / projectName / urls.py`

 path('applicationName/', include('**applicationName.urls**'))

> include 내부에는 String으로 인자를 넘겨준 것에 유의하자. applicationName.urls라는 변수는 없고 파일명을 넘겨준다고 생각하면 된다.



`projectName / applicationName / templates (create) / pageName (create)`

{% extends 'base.html' %}

{% block content %}

> 이곳에 개별 내용을 넣는다.

{% endblock content %}



`projectName / applicationName / views.py`

def **pageName**(request):

somethinginformation = ...

content = {

​	'key': value

}

  return render(request, **'pageName.html'**, content)

> 역시 파일명이므로 따옴표를 붙인다. 데이터를 같이 넘긴다면 content 딕셔너리에 담아 인자로 content만 넘기게 되면 html에서는 간단하게 {{ variableName }} 으로 사용할 수 있다.





**# Variable Routing**

`urls.py` 

`path('hello/<str:name>/', views.hello)`



`views.py` 

`def hello(request, name):`

매개변수의 이름은 `urls.py` 에서 정의한 변수명과 같아야 한다.

`str` 은 기본값으로, 생략가능: `<name>`

정수는 `int` 로 표현 `<int:age>`

> 변수를 매개변수로 만들어서 받아준다.





**# URL Namespace**

![11](Django01.assets/11.PNG)

`appName / urls.py`

path 함수의 세번째 자리에 name='urlName'의 형태로 작성한다.

경로가 필요한 부분에 `{% url 'urlName' %}` 의 형태로 사용하면 되나,

어플리케이션이 다양해지는 경우 'index' 페이지 같이 흔히 쓰이는 페이지는 동일한 별명이 있을 수 있음.

이러한 경우 어떤 url인지 구별이 힘든 데, 이런 단점을 해결하기 위해서 상단의 `app_name`을 appName과 똑같이 할당해준다.

이렇게 `app_name`을 할당한 뒤에는 

![22](Django01.assets/22.PNG)

이런 식으로 `{% url 'appName:urlName' %}`의 형태로 사용하면 된다. 쌍따옴표 안에서 태그가 시작되는 것에 유의.



**# Template Namespace**

바로 위의 경우처럼 어플리케이션이 다양해지는 경우 html의 이름이 같은 경우가 생기는데, django는 `projectName / projectName / settings.py / INSTALLED_APPS` 에서 등록된 순서대로 templates 폴더를 탐색하기 때문에 어떤 어플리케이션의 template 파일인지 구분을 할 수 가 없게 된다.

이런 경우 templates 폴더 내부에 해당 어플리케이션 이름으로 폴더를 하나 더 작성하고,![333](Django01.assets/333.PNG)

이렇게 `appName / pathName.html`로 호출하여 다른 어플리케이션의 페이지를 불러오는 것을 방지한다.



**# ORM**

DB에서 쓰는 SQL과 python은 서로 언어가 달라서 api가 필요한데, django에서는 `ORM`을 사용하여 python과 SQL을 상호간에 번역한다. 

이 `ORM`은 SQL을 잘 알지 못하더라도 DB조작이 가능하고 기존 SQL의 절차적 접근이 아닌 OOP적 접근으로 인한 높은 생산성을 누릴 수 있지만, `ORM`만으로는 완전한 서비스를 구현하기 어려운 경우가 있다는 한계점 또한 가지고 있다.

간단하게 테이블은 field=column=속성, record=row=tuple, 개별 record에 대응하는 각각의 field가 가지는 값, 그리고 필드중 하나인 primary key로 이루어져 있다.

`projectName / appName / models.py`

```python
class Tablename(models.Model):  # Tablename should be in singular form

    fieldName = models.FieldType(option)

    fieldName = models.FieldType(option)
```

이렇게 `class`로 appName을 단수형으로 만든 이름을 사용하고, 