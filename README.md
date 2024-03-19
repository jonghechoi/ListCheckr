# 목차
1. [ListCheckr 프로젝트 개요](#Catchmind-프로젝트-개요)
2. [담당 페이지 및 기능](#담당-페이지-및-기능)
3. [아키텍처](#아키텍처)
4. [🚀 고도화](#-고도화)
5. [💡 느낀점](#-느낀점)  
   <br/><br/>

# ListCheckr 프로젝트 개요
사용자의 일정을 관리하고 그룹과 실시간 공유할 수 있는 Todo Task 서비스입니다. <br/>
<img src="" width="800" height="400">

<br/>

# 담당 페이지 및 기능
총 3개의 페이지를 담당했습니다.

- ### Login
  <img src="" width="400" height="200">

- ### 회원 가입
  <img src="" width="400" height="200">
  <img src="" width="400" height="200">

- ### 채팅
  <img src="" width="400" height="200">

<br/>

# 아키텍처
Domian Driven Design 설계를 기반으로 총 5개의 도메인(회원 관리, 로그인, task, 결제, 채팅)을 도출했습니다. → [링크](https://jonghe.notion.site/a6c069b0f88e47daa54b16ec47a68c14?pvs=4) <br/>
각 도메인은 마이크로서비스 애플리케이션으로 구성됩니다. 

- ## 인프라
  ### local
  #### 로컬에서는 각 애플리케이션 별 개발과 단위테스트를 할 수 있습니다. 통합테스트가 필요한 부분에서는 카프카를 이용해 데이터를 공유하며 진행했습니다.
  ![Infra_Local](https://github.com/jonghechoi/dicom-bridge/assets/57426066/0aeedafb-201e-45b2-b908-c106960b5818)
  ### dev
  #### 모든 애플리케이션은 도커 파일로 빌드(CI 파이프라인 사용하자. Github Actions or Jenkins)되고 도커 컴포즈로 한번에 조작될 수 있도록 구성했습니다.
  ![Infra_Dev](https://github.com/jonghechoi/dicom-bridge/assets/57426066/edff9ffa-f980-4971-b197-1db098e165f7)

- ## 애플리케이션
  ![Application_Architecture](https://github.com/jonghechoi/dicom-bridge/assets/57426066/1b6a0ac4-c4ea-4c37-92d9-f059985ea61f)

# 🚀 고도화
- CI/CD <br/>
  Jenkins로 파이프라인을 구성했습니다. → [링크](https://github.com/jonghechoi/ListCheckr_member/blob/master/Jenkinsfile) <br/> 
  각 애플리케이션의 레포지토리 master브랜치에 커밋이 발생하면 자동으로 dev 환경에 있는 애플리케이션이 업데이트됩니다.
- AOP <br/> 
  Logging, Exception 처리
- TDD <br/>

<br/>

# 💡 느낀점 및 개선점
- ### 느낀점
  1. 리팩토링을 어떻게 해야 할지에 대한 고민이 많았습니다. 특히, 객체 지향적으로 설계하고자 노력했습니다.
  2. 
- ### 개선점
  1. DB의 read/write 측면을 고려하여 읽기전용 복제본을 만들 필요는 없는가?
  2. AWS 배포시 Beanstalk를 사용해볼 수도 있지 않은가? 컨테이너로 올린다면 EKS를 사용하는건 어떤가?
  3. HTTPS 적용
  4. 보안 측면에서 더 적용해야 할 점은 없는가?