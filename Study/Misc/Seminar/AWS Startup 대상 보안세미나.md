# AWS Startup 기업대상 보안세미나

## 클라우드 보안관제 트렌드

### 클라우드 보안 사고

클라우드 보안 사고의 80% 이상은 설정 오류, 95% 이상은 고객사의 잘못으로 인해 발생

- 새로운 환경 및 설정에의 적응
  - 현황과 역대 사고 사례들을 학습하자
  - Cloud Security Breaches and Vunerabilies
  - Aws-customer-security-incidents



#### Stolen Long-Lived Credentials

- Stop using IAM users
- instance roles



#### Public S3 Buckets

- Amazon S3 Block Public Access - aws docs



#### SSRFs

- IMDS



#### AWS 보안을 위한 마인드맵

- https://github.com/christophetd/mindmaps/blob/master/pdf/aws-cloud-security-101.pdf



## 서비스 연속성 확보를 위한 클라우드 보안 방안

### 업무 연속성

업무, 서비스 등을 중단없이 운영이 가능하도록 유지하는 능력

- 화재, 태풍 등 천재지변 / 시스템 오류, 외부 해킹



### 클라우드 운영 보안

사용자 부주의로 인한 클라우드 보안 사고

- 샤넬: 클라우드 서버 관리자 계정 비밀번호를 누구나 쉽게 추측 가능하도록 설정 => 과징금 1억 2천만원
  - 만약 공격자가 데이터를 훼손한다면?



##### 체계적인 내부정책 수립

- 내부자의 관리 실수 줄이기
  - 관리 담당자의 역할과 책임 정의
  - 개인정보보호법
    - 암호화 및 정보공개 등 수시로 확인



##### 보안 취약점 도출 및 개선

- AWS 공동책임 모델: 상당한 사용자의 책임



##### 사용자 인증 및 접근제어 강화

- 클라우드 서비스별 계정 및 권한관리 정책 적용
- 서비스별 접근통제 정책
- 강화된 비밀번호 정책(다중 보안)



##### 백업 및 복구 대책 수립

- 중요 데이터의 암호화 및 주기적인 백업
- 서비스 중단 시 복구/대체 방안 수립
- 업무 연속성 계획의 수립



## IAM Role Setting Best Practice

### AWS IAM?

보안 자격 증명을 통해 AWS console, CLI, SDK를 통해 리소스에 접근

루트 계정은 리소스에 대하여 무제한 액세스 가능

- 역할을 사용하여 권한 위임



AWS Identity and Access Management(IAM): 인증 및 인가



### IAM 작동 방식

사용자가 인증된 후 상시 자격 증명인 User, Group 또는 임시 자격 증명인 Role을 통해 작업을 수행할 수 있는 권한을 부여받음

- S3를 사용하고 싶은 경우
  - 사용자의 정책, 사용자가 속한 그룹의 정책, 위임된 역할의 정책 순으로 확인



### IAM 역할 설정

IAM 사용자와 연결된 장기 자격 증명 대신 IAM 역할과 임시 보안 자격 증명 활용



### IAM 역할 관리 전략

역할 기반 액세스 제어 RBAC

- 직무에 따라 역할 정의
- 권한 부여 작업 간소화
- 새 리소스를 추가할 때마다 정책 업데이트 필요



속성 기반 액세스 제어 ABAC

- 리소스 태그와 IAM 역할 보안 주체 태그를 사용
  - 보안 주체의 태그가 리소스 태그와 일치할 때 작업 허용
- 증가하는 클라우드 환경, 정책 업데이트가 번거로운 상황에 사용