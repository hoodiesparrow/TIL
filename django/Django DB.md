# Django DB



Django는 기본적으로 `sqlite`를 사용하여 데이터를 저장합니다. (MTV 중 Model 부분)

그러나 Django가 작성되는 `python`과 DB가 관리되는 `SQL`은 서로 다른 언어이기 때문에, `ORM`: object relational mapping 을 사용하여 두 언어 간의 소통을 가능하게 합니다. 

Django에서 1:N 관계를 가지는 테이블과 N:M 관계를 가지는 테이블에 어떻게 관계를 설정하는 지에 대해 정리했습니다.



## Many-To-One relationship

Django에서는 1:N관계에 있는 두 테이블을  `ForeignKey` 필드를 지정하여 표현합니다.

- 참조하는 테이블(자식)에 참조되는 테이블의 `PK`를 한 개의 필드로 생성합니다.
  - 참조하는 테이블과 참조되는 테이블이 동일할 수도 있습니다. e.g) 대댓글
  - 필드명은 단수형(singular form)으로 지정하는 것이 바람직합니다.
  - 해당 테이블에 `필드명_id` 형태로 된 필드가 추가됩니다. (`makemigrations`를 할 때)

##### models.py  @appName

```python
class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
```

예시 코드입니다. 'Comment' 테이블에 'Article'의 PK를 값으로 가지는 필드를 생성합니다. (글:댓글 == 1:N관계)

- `on_delete` 속성을 이용하여 1:N 관계에서 필수적으로 설정해야 하는 부모가 삭제될 때 자식에 대한 DB의 처리 방침을 정의합니다. CASCADE, PROTECT 등이 있습니다.





## Many-To-Many relationship

M:N 관계에 있는 두 테이블을 `ManyToManyField` 필드를 지정하여 표현합니다.

- 사용자의 편의에 따라 두 테이블의 관계를 설정할 테이블 하나에 해당 필드를 지정합니다.
  - 마찬가지로 스스로를 참조할 수 있습니다. (`'self'`인자 사용) e.g) 유저 간 팔로우
  - 이번에는 필드의 이름을 복수형(plural form)으로 지정하는 것이 바람직합니다.
  - 해당 테이블이 아닌 `필드를 추가한 테이블명_지정한 필드 이름`을 가진 새로운 테이블이 생성되고, `ID`을 제외하면 M:N관계를 가지는 두 테이블의 `PK`값이 `테이블명_id`필드에 각각 저장됩니다.
- 중개 테이블을 만든 후 `ForeignKey`필드를 이용하여 직접 두 부모 테이블에 대해 관계를 설정할 수도 있습니다.
  - 다만 `ManyToManyField`필드를 이용한다면 추가적인 정보를 갖지 않는 다대다 관계의 설정을 간편하게 할 수 있으며, `through`속성을 통해 추가적인 정보를 갖는 중개 테이블과 연결할 수도 있습니다. 

##### models.py  @appName

```python
class Article(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_articles')
```

예시 코드입니다. 'Article' 테이블에 현재 '커스텀된 유저 모델'과의 M:N 관계를 정의하였습니다.

- 위의 코드에서 'Article' 테이블과 '커스텀 유저 모델'은 두개 이상의 관계를 가지기에 `related_name`이라는 속성이 추가적으로 필요합니다.
  - 'Article' 객체의 인스턴스에서 `user`필드와 `like_users`필드에 접근하는 매니저는 각각 필드 이름이지만, 반대로 'User' 객체의 인스턴스에서 역참조를 할 때는 두 매니저 모두 같은 `article_set`이라는 이름을 가지게 되고, 이로 인해 제대로 DB생성이 되지 않고 오류가 나게 됩니다.
    - 따라서 서로 두개 이상의 관계를 가지는 테이블들 간에 `ManyToManyField` 필드를 이용해 관계 설정을 하게 된다면, `related_name` 속성의 지정이 필수입니다.







