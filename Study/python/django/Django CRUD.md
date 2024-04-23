# CRUD Walk-Through

> - 회원 관리
>   - 로그인, 로그아웃
>   - 회원 가입, 회원정보 수정, 회원 탈퇴
> - 커뮤니티
>   - 게시글 작성, 조회, 수정, 삭제
>     - 작성자만 삭제 및 수정 가능
>   - 댓글 작성, 조회, 삭제
>     - 작성자만 삭제 및 수정 가능
>
> 상기한 기능을 갖춘 웹페이지를 django 프레임워크를 사용하여 구현하는 순서를 정리해 보았다.



$ python -m venv venv

- 2번째 venv는 이름, 첫번째 venv는 모듈의 이름을 뜻한다.
- 가상환경을 통해 프로젝트를 관리한다.
- `F1`: Python: Select Interpreter를 선택하여 python venv를 택한 뒤 터미널을 종료한 후 다시 실행한다.



$ django-admin startproject projectName .

- 프로젝트명 뒤의 `.`은 현재 폴더에 `manage.py`및 기타 파일과 폴더를 생성한다.



$ python manage.py startapp appName

- 이후 `settings.py`에서 앱을 등록한다.



`urls.py`에서 주석에 따라 `include`를 import한 뒤

- path('appName/', include('appName.urls')), 의 형태로 `path`를 추가한다.

  - 해당 앱 폴더에 `urls.py`를 생성한다

    - ```python
      from django.urls import path
      from . import views
      
      app_name = ''
      urlpatterns = [
      ]   
      ```

      기본 형태를 잡아준다.



커스텀 User 모델을 설정한다. (커스텀하지 않더라도, 이 작업을 하지 않으면 추후에 커스텀이 필요한 경우 힘들어질 수 있음)

`models.py`  @accounts

```python
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass
```

- AbstractUser은 완전한 유저 모델로 기능하며, AbstractBase...는 비밀번호 등 일부의 기능만 가지고 있음에 유의

  - `settings.py`에서 AUTH_USER_MODEL = 'accounts.User' 구문을 추가한다.

    - 위 설정은 원래 적혀져 있는 구문은 아니지만, 내부 기본값은 'auth.User'로, 내장 앱인 auth앱의 User가 기본 유저 모델임을 뜻한다.

  - 커스텀 유저 모델을 설정하게 되면, 이후 UserChangeForm 및 UserCreationForm을 사용하게 된다면, 기본값으로 auth앱의 User모델을 참조하므로 `forms.py`를 생성하여 수정할 필요가 있다.

    - `forms.py`  @accounts

    ```python
    from django.contrib.auth.forms import UserCreationForm, UserChangeForm
    from django.contrib.auth import get_user_model
    
    class CustomUserChangeForm(UserChangeForm):
        class Meta:
            model = get_user_model()
            fields = ('first_name', 'last_name', 'email',)
    
    
    class CustomUserCreationForm(UserCreationForm):
        class Meta:
            model = get_user_model()
            fields = '__all__'
    ```

    - 여기서는 get_user_model() 메서드를 가져와서 모델을 참조했다.

  - 또한 1:N 관계 등 User 클래스의 객체(개별 유저)를 참조해야 한다면, settings를 import한 뒤, settigs.AUTH_USER_MODEL이라는 변수명으로 현재 `settings.py`에서 정의한 유저 모델을 불러올 수 있다. 이것은 models.py가 로드되는 순서와, 앱들이 로드되는 순서와 관련되어 오류가 나지 않는 방법이다.

    - `models.py`  @articles

    ```
    from django.conf import settings
    
    class Article(models.Model):
        user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ```

    - 임포트문에서 settings를 가져온 후, 외래키를 정의하며 위에서 설정한 커스텀 유저 모델을 참조했다.



templates - base.html + base.html 폴더 설정

appFolder - templates - appName - html (namespace 설정)





### Before gettings started...





### accounts CRUD

> urls - views - templates로 이어지는 흐름은 동일하다.
>
> 모델에서 정의한 테이블(클래스)에 대해 보통은 모델폼, 로그인 관련된 부분은 일반 폼을 사용하여 사용자로부터 정보를 전달받고, 유효성 검사를 한 뒤 DB에 저장한다.

##### signup

처음으로 등장한 함수이기 때문에 자세히 서술한다.

```python
def signup(request):
    if request.user.is_authenticated:
        return redirect('articles.index')

    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect('articles:index')
    else:
        form = CustomUserCreationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/forms.html', context)
```

- 유저 모델을 커스텀하였기 때문에 기본으로 제공되는 모델폼인 `UserCreationForm`을 수정한 후에 사용한다.
- 모델폼이기 때문에, request.POST에 담긴 정보를 받아오는 인자 하나만을 가져간다.
- 유효성 검사를 진행한다.
- 기타 작업(회원가입 후 로그인 등이 필요한 경우, save()메서드는 해당 인스턴스를 리턴하기 때문에 다른 변수에 할당하여 사용한다.)
- POST  메서드가 아닌 경우, 회원가입을 위한 빈 폼을 보여준다.
- 로그인된 상태라면 index 페이지를 보여준다.



##### login

- Authentication form을 사용한다. 해당 폼은 일반 폼이므로 POST로 요청이 오는 경우 request, request.POST로 인자를 두개 사용해야 한다.

- 이후 as auth_login으로 받은 로그인 함수에 request, **form.get_user()**를 인자로 사용하여 사용자를 로그인 시킨다.
- redirect(request.GET.get('next') or 'articles:index') 문으로 **@login_require** 데코레이터를 통해 리다이렉트된 사용자를 다시 리다이렉트된 곳으로 보내줄 수 있다.



##### logout

- as auth_logout으로 받은 로그아웃 함수를 사용한다.



##### update(회원정보수정)

커스텀한 UserChangeForm을 사용한다.

- 커스텀 유저 모델을 참조하기도 하지만, 기본으로 제공되는 폼은 여러 권한 설정을 포함하여 모든 필드가 포함되어 있기 때문에 해당 필드들을 없애기 위함이기도 하다.

form =CustomUserChangeForm(instance=request.user) instance를 사용하여 기 입력된 정보를 보여준다

form = CustomUserChangeForm(request.POST, instance=request.user) 구문을 통해 request.POST로 들어온 정보를 입력한다.



##### update_pw(비밀번호수정)

PasswordChangeForm을 사용한다. 해당 폼 또한 일반폼이나, request 자리에 user 인스턴스가 들어가야 하므로, request.user를 넣어야 한다.

- form = PasswordChangeForm(request.user)
- form = PasswordChangeForm(request.user, request.POST)

사용자로부터 받은 비밀번호를 저장할 때 세션이 업데이트되며 로그인이 풀리게 되므로, 

- ```python
              user = form.save()
              update_session_auth_hash(request, user)
  ```

  update_session_auth_hash 함수를 통해 세션의 해시를 업데이트하여 로그인이 풀리는 것을 방지해 준다.



##### delete(탈퇴)

  request.user.delete()

  auth_logout(request)

로그아웃부터 하게 되는 경우, request에 있는 유저 정보가 없어지는 것에 유의.



### articles CRUD

> urls - views - templates로 이어지는 흐름은 동일하다



##### index





