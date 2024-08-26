# 🧸 ILB

# 배포 url

-   https://ilovebaby.shop

# 테스트 계정

-   email : test@test.com
-   pw : 123!@#qwe

# 프로젝트 소개

-   우리 프로젝트는 어쩌구 저쩌구 합니다.

# 기획 배경

-   현시점 대한민국의 출산율이 홀리몰리해서
-   이러쿵 저러쿵 만들게 되었다.
-   궁극적인 목표는 출산율에 기여하여 보다 나은 삶

# 팀원 소개

신승민
여소희
이윤구

# 역할 분담

신승민

여소희

이윤구

# 개발 환경

-   nextjs (프레임워크)
-   react (라이브러리)
-   js (개발 언어)
-   tailwind (css)

#### 개발 기간 : 2024.07.29 ~ 2024.08.27

#### 기술 스택 : next.js / react / javascript / tailwind 뱃지

# 폴더 구조

```
📦public
📦src
 ┣ 📂app
 ┃ ┣ 📂(main)
 ┃ ┃ ┣ 📂(Banner)
 ┃ ┃ ┗ 📂(footer)
 ┃ ┃
 ┃ ┣ 📂(products)
 ┃ ┃ ┣ 📂list
 ┃ ┃ ┃ ┗ 📂(stepList)
 ┃ ┃ ┃   ┗ 📂(stepCard)
 ┃ ┃ ┃
 ┃ ┃ ┗ 📂order
 ┃ ┃ 	 ┣ 📂complete
 ┃ ┃ 	 ┣ 📂delivery
 ┃ ┃ 	 ┣ 📂fail
 ┃ ┃ 	 ┗ 📂payment
 ┃ ┃ 		 ┗ 📂check
 ┃ ┃
 ┃ ┣ 📂(user)
 ┃ ┃ ┣ 📂checklogin
 ┃ ┃ ┃ ┗ 📂babyinfo
 ┃ ┃ ┃
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┣ 📂editprofile
 ┃ ┃ ┃ ┣ 📂subscribe
 ┃ ┃ ┃ ┗ 📂updatebody
 ┃ ┃ ┃
 ┃ ┃ ┗ 📂signup
 ┃ ┃ 	 ┣ 📂(baby)
 ┃ ┃ 	 ┗ 📂(user)
 ┃ ┃
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📂auth
 ┃ ┃ 	 ┗ 📂[...nextauth]
 ┃ ┃  		┗ 📜route.ts
 ┃ ┗ 📜globals.css
 ┃
 ┣ 📂components
 ┃ ┣ 📂layout
 ┃ ┣ 📂subscribe
 ┃ ┗ 📂ui
 ┣ 📂data
 ┃ ┗ 📂actions
 ┣ 📂hooks
 ┣ 📂lib
 ┃ ┗ 📂util
 ┣ 📂types
 ┣ 📂zustand
 ┣ 📜auth.ts
 ┗ 📜middleware.ts

```

# 주요 기능 (페이지 시연, 기능 소개)

-   gif로 설명해주기

1. 메인페이지, 헤더 스크롤 / 캐러셀과 메인페이지 배너 봉주기
2. 세션값에 따른 / nav바
3. 세션의 정보를 보고 맞게 포커싱 / 리스트페이지
4. validation 바로바로 체크 되게끔 하기 / 회원가입
5. 소셜 로그인 연동, 그냥 로그인 / 로그인
6. 차트 띄워주기, 아이 정보입력 / 마이페이지
7. 배송현황 / 마이페이지
8. 내 정보 수정 / 마이페이지
9. 내 구독상품 조회 리스트
10. 구독의 일련 과정 다 결제까지

# 주요 **코드** 요약

#### 📜 useScroll Custom Hook

각 헤더 컴포넌트의 스타일링을 변화시켜주기 위해서 스크롤의 위치를 감지하고 그 상태값에 따라 스타일링을 하기 위해서 코드를 작성

```ts
// hooks/useScroll.ts

'use client';

export default function useScrollPosition() {
    // 스크롤의 상태를 표시하기 위한 useState
    const [scrollPosition, setScrollPosition] = useState<boolean>(false);

    // scroll 위치에 따른 상태 관리
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrollPosition(true);
        } else {
            setScrollPosition(false);
        }
    };

    // 상태에 따라 이벤트를 등록하고 삭제한다.
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return {
        scrollPosition,
    };
}
```

-   스크롤의 위치에 따라 css를 조정하기 위해 커스텀 훅으로 분리하였습니다.
-   useState()로 상태값의 변화를 감지하여, useEffect로 이벤트를 등록하고 삭제합니다

#### 📜 react-hook-form 라이브러리

다양한 입력을 처리하기 위해 react-hook-form을 사용했습니다. 이 라이브러리는 validation 검사를 간편하게 설정할 수 있으며, 입력 값을 useState로 관리할 필요 없이 편리하게 사용할 수 있습니다.

```tsx
// (users)/signup/page.tsx

'use client';

import { emailCheck, signup } from '@/data/actions/userAction';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
...

export default function Signup() {
    const [isEmailDuplicate, setIsEmailDuplicate] = useState(false); // 중복을 확인하기 위한 상태

    const form = useForm<UserSignUpForm>({
        defaultValues: {
            name: '',
            email: '',
            ...
        },
    });

    const { formState: { isValid }, setError, clearErrors,
    } = form;

    const email = form.watch('email');

    // email Input값을 바로 API통신을 통해 중복 데이터의 경우 오류 메세지를 표출한다.
    useEffect(() => {
        const emailPattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,4}$/;

        clearErrors('email');

	// user의 입력값의 변화를 감지하여 디바운스로 API통신을 시작한다.
        const checkEmail = _.debounce(async () => {
            if (emailPattern.test(email)) {
                const res = await emailCheck(email);
		// if (성공)
		// else (실패)
            }
        }, 300);

        checkEmail();
    }, [email, setError, clearErrors]);

    // 회원가입시 formData 전송
    async function onSubmit(formData: UserSignUpForm) {
	(...객체 복사하여 필요한 데이터 전송)
        try {
            const resData = await signup(formData);
        } catch (error) {
            (...에러표시)
        }
    }

    return (
	<Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        rules={{
                            (... validation 규칙 설정)
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Input Label</FormLabel>
                                <FormControl>
                                    <Input
                                       ...
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage /> // 오류 메세지
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <Button type='submit'>다음</Button>
    );
}
```

# 에러 핸들링

#### box-sizing: border-box 적용 실패

```
처음에 피그마 시안대로 버튼 크기를 10으로 설정하고 패딩을 45씩 주어 전체 크기를 100으로 맞추려 했으나, `border`를 포함한 102가 되었습니다.
이는 내부 컨텐츠에 `width` 값을 주지 않아 발생한 문제였습니다.
이를 해결하기 위해 내부 컨텐츠에 `width`를 설정하여 `border-box`가 제대로 적용되도록 했습니다.
```

<hr/>

#### next캐시로 인한 데이터 오류

```
넥스트 프로젝트를 진행하면서 데이터 값이 변경되었음에도 불구하고 한 팀원의 화면에서는 여전히 이전 데이터가 불러와지는 문제가 발생했습니다. 처음에는 로직에 문제가 있다고 판단했으나, 코드에는 이상이 없었습니다. 조사 결과, .next 폴더에서 데이터를 캐싱하고 있어 이로 인해 오류가 발생한 것을 알게 되었습니다.

이를 해결하기 위해 다음과 같은 조치를 취했습니다:

1. 캐시 삭제: .next 폴더를 삭제하여 캐시된 데이터를 제거했습니다.
2. 빌드 재실행: 프로젝트를 다시 빌드하여 최신 데이터를 반영했습니다.
3. 캐싱 전략 검토: 데이터 캐싱 전략을 검토하고, 필요에 따라 캐싱을 비활성화하거나 적절한 캐싱 정책을 설정했습니다.

이 과정을 통해 데이터가 올바르게 반영되도록 하였고, 팀원 모두가 최신 데이터를 확인할 수 있게 되었습니다.
이번 경험을 통해 캐싱 메커니즘의 중요성을 다시 한 번 깨닫게 되었고, 앞으로 유사한 문제가 발생하지 않도록 주의할 것입니다.
```

<hr/>
