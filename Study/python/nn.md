```python
import tensorflow as tf
import pandas as pd

파일경로 = 'https://raw.githubusercontent.com/blackdew/tensorflow1/master/csv/lemonade.csv'
레모네이드 = pd.read_csv(파일경로)

# 데이터 모양으로 확인하기
print(레모네이드.shape)
# (6, 2)

print(레모네이드.columns)
# Index(['온도', '판매량'], dtype='object')

독립 = 레모네이드[['온도']]
종속 = 레모네이드[['판매량']]

# 모델의 구조를 만든다
X = tf.keras.layers.Input(shape=[1])  # 독립변수의 칼럼이 하나
Y = tf.keras.layers.Dense(1)(X)  # 종속변수의 칼럼이 하나
model = tf.keras.models.Model(X, Y)
model.compile(loss='mse')
# 데이터로 모델을 학습 (FIT)합니다.
model.fit(독립, 종속, epochs=10000, verbose=0)  # verbose=0 : 출력하지 않음

model.fit(독립, 종속, epochs=1) # 확인용 출력

model.predict(독립)  # 현재 데이터 셋 예측
model.predict([[15]])  # 15값에 대해 
```

