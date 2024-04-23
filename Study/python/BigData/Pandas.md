# PANDAS

##### 변수에 csv파일을 할당하기

df = pd.read_csv(fileDir)



##### 데이터 모양으로 확인하기

print(df.shape)

(r, c) 형태로 출력됨. r = 튜플의 수, c = cardinality



##### 컬럼 확인하기

print(df.columns)



##### 컬럼으로 데이터 분리하기

independent = df[['col1', 'col2', 'col3']]

dependent = df[['col4']]



##### 5개의 데이터만 보기

df.head()



