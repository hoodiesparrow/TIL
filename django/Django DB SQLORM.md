# Django DB SQL/ORM



##### DB란?

체계화된 데이터의 모임



##### RDB란?

데이터를 담은 2차원 테이블들과 테이블들의 연결 관계를 표현한 KEY들로 구성된 데이터베이스

- 중복 최소화, 무결성(정확한 정보), 일관성, 독립성(물리적/논리적), 표준화, 보안 유지(sqlite는 제외)

  - Degree: 어트리뷰트(필드)의 수

    Cardinality: 튜플(레코드)의 수

    Schema: DB의 명세서와 같은 설계도



### SQL

RDBMS의 데이터를 관리하는 언어: 자료의 검색, 관리, 스키마 생성과 수정, 데이터베이스 접근 객체 조정 등



##### DDL: definition

데이터를 정의: 테이블과 스키마를 정의

- CREATE, DROP, ALTER

##### DML: manipulation

저장, 수정, 삭제, 조회

- INSERT, UPDATE, DELETE, SELECT == C, U, D, R

##### DCL: control

데이터베이스 사용자의 권한 제어

- GRANT, REVOKE, COMMIT, ROLLBACK



