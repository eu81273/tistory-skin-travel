## 티스토리 스킨 - 여행

가족과 함께하는 시간을 남기고 싶어 티스토리 블로그를 개설하면서 예쁜 스킨이 있으면 좋겠다 싶어 하루 시간을 들여 만들어봤습니다.

반응형 웹디자인으로 개발되었기 때문에 PC와 모바일 모두 좋은 가독성을 보여줍니다. 모바일에서는 `뒤로가기` 버튼에 적절히 대응하도록 개발되었습니다.

방명록, 위치로그 등 (제가 판단하기에) 불필요한 기능은 지원되지 않습니다.

IE10+, Chrome, Safari, FireFox 를 지원하며, IE9 이하에서 접근시 페이지의 내용을 가리고 지원 브라우저를 사용하라는 메시지만 보여줍니다.



### 설치 방법

```bash
# 프로젝트를 clone 한 뒤,
$ git clone https://github.com/eu81273/tistory-skin-travel

# clone 받은 프로젝트로 이동해서,
$ cd tistory-skin-travel

# 디펜던시를 설치하고,
$ npm install

# 빌드를 수행
$ npm start
```

빌드가 완료되면, dist 폴더에 빌드된 파일들이 위치하게 되는데, 이 파일들을 티스토리에 업로드해서 적용하면 됩니다.


### 티스토리 설정

- 기본적으로 페이지 당 하나의 포스트가 보여지도록 설정해야 합니다.
- 검색 결과는 목록만 출력하도록 설정해야 합니다.
- 블로그의 가로폭은 1000px 로 설정해야 합니다.
- 모바일웹 스킨은 OFF 로 설정합니다. (반응형 웹디자인으로 개발)
- 티스토리 플러그인들과의 충돌 여부는 테스트되지 않았고, 플러그인을 사용하지 않는다고 가정하고 개발되었습니다.


## 사용된 라이브러리와 리소스
- jQuery v2.1.4
- Meyer reset 2.0
- Twitter Bootstrap v3.3.5
- Font Awesome v4.3.0
- 배달의민족 한나체


### 라이센스
MIT License.