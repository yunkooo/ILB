# 🧸 ILB

**[배포 URL]**

`URL` : https://www.ilovebaby.shop

`계정`  
&ensp;&ensp;&ensp;&ensp;&ensp; `ID` : test@test.com  
&ensp;&ensp;&ensp;&ensp;&ensp; `PassWord` : 123!@#qwe

<br />

## 🍼 프로젝트 소개

```
아기 맞춤형 육아 용품 구독 서비스는 아기의 출생일을 기준으로 개월 수에 맞춘 육아 용품을 정기적으로 부모님들께 보내드립니다. 이 서비스는 아기의 성장단계에 맞춰 필요한 용품을 추천하고, 제때에 배송드리는 스마트한 구독 서비스입니다.

맞춤형 솔루션 아기의 출생일을 기준으로 주요 성장 단계에 맞춰 필수 육아 용품 큐레이션 합니다.

편리한 구독 방식 부모님들은 단 한 번의 구독 신청만으로 아기 성장 단계에 맞는 용품을 제때에 받아보실 수 있습니다. 더이상 어떤 제품이 필요한지 고민할 필요가 없습니다.

검증된 품질: 저희는 품질이 입증된 브랜드와 협력하여 안전하고 믿을 수 있는 제품만을 제공합니다. 부모님들의 신뢰를 최우선으로 하여 안심하여 사용할 수 있는 제품을 큐레이션 합니다
```

<br/>
<br/>

## 🖼️ 기획 배경

```
맞벌이 부부의 증가와 바쁜 일상 속에서 많은 부모들이 출산과 육아에 대한 부담을 크게 느끼고 있습니다. 특히 초보 부모들은 아이가 태어난 후 어떤 용품이 필요한지, 어떤 시기에 어떤 제품을 사용해야 하는지에 대한 정보가 부족해 고민이 많습니다. 이러한 이유로 출산과 육아에 대한 부담은 저출산 문제를 더욱 심화시킨다
```

<br/>
<br/>
<br/>

## 👶🏻 팀원 소개

|                                                             **신승민**                                                              |                                                                **여소희**                                                                |                                                               **이윤구**                                                                |
| :---------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: |
|          <img src="https://github.com/user-attachments/assets/5f0b835b-7ce8-4aa8-ac58-212f07159d86" height=180 width=180>           |             <img src="https://github.com/user-attachments/assets/efe4e184-7c18-4876-b809-695b27557a8a" height=180 width=180>             |            <img src="https://github.com/user-attachments/assets/c2768d89-bc5e-44dc-bb24-d2a256b6fdb6" height=180 width=180>             |
| <a href="https://github.com/M-Moong"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/> | <a href="https://github.com/soheeyeo"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> | <a href="https://github.com/yunkooo"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> |

<br/>
<br/>
<br/>

## 🛠️ 개발 환경

  <img src="https://github.com/user-attachments/assets/f43a08b7-d8b3-4856-8dce-6eb84e958424">

<br/>
<br/>
<br/>

## 📔 폴더 구조

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

<br/>
<br/>

## 📸 주요 기능

|                                                         **메인페이지**                                                          |                                                        **사이드 바**                                                         |
| :-----------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/d4c68d2e-9288-467e-acf2-ada086eab872" width="100%" height="100%" alt="" /> | <img src='https://github.com/user-attachments/assets/84018bea-1c63-44eb-9394-87d6cb3b9e2d' width='90%' height='100%' alt=''> |

|                                                       **일반 회원 가입**                                                        |                                                       **아이 정보 입력**                                                        |                                                       **소셜 회원 가입**                                                        |
| :-----------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------: |
| <img src='https://github.com/user-attachments/assets/6e42cf8c-2a3b-4f82-8be0-89a5b4024a26' width="100%" height="100%" alt="" /> | <img src='https://github.com/user-attachments/assets/2b37d3bd-2eb9-4997-990d-50543d25a698' width="100%" height="100%" alt="" /> | <img src='https://github.com/user-attachments/assets/9704d5fa-7db9-413e-b549-3d5832e4d1c8' width="100%" height="100%" alt="" /> |

|                                                           **로그인**                                                            |                                                      **구독 상품 리스트**                                                       |                                                       **소셜 회원 가입**                                                        |
| :-----------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------: |
| <img src='https://github.com/user-attachments/assets/5de05514-75ff-47b4-bdf3-2ea1dd74272c' width="100%" height="100%" alt="" /> | <img src='https://github.com/user-attachments/assets/aee10a39-4b93-496f-97c4-19a30d2dcdde' width="100%" height="100%" alt="" /> | <img src='https://github.com/user-attachments/assets/9704d5fa-7db9-413e-b549-3d5832e4d1c8' width="100%" height="100%" alt="" /> |

<br/>
<br/>
<br/>

## 📜 주요 **코드** 요약

### 📍 `useScroll Custom Hook`

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

<br/>

### 📍 `react-hook-form` 라이브러리

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

<br/>
<br/>

## 💥 에러 핸들링

### 📍 `box-sizing: border-box` 적용 실패

```
처음에 피그마 시안대로 버튼 크기를 10으로 설정하고 패딩을 45씩 주어 전체 크기를 100으로 맞추려 했으나, border를 포함한 102가 되었습니다.
이는 내부 컨텐츠에 width 값을 주지 않아 발생한 문제였습니다.
이를 해결하기 위해 내부 컨텐츠에 width를 설정하여 border-box가 제대로 적용되도록 했습니다.
```

<br/>

### 📍 `.next` 캐시로 인한 데이터 오류

```
Next.js 프로젝트를 진행하면서 데이터 값이 변경되었음에도 불구하고 한 팀원의 화면에서는 여전히 이전 데이터가 불러와지는 문제가 발생했습니다. 처음에는 로직에 문제가 있다고 판단했으나, 코드에는 이상이 없었습니다. 조사 결과, .next 폴더에서 데이터를 캐싱하고 있어 이로 인해 오류가 발생한 것을 알게 되었습니다.

이를 해결하기 위해 다음과 같은 조치를 취했습니다:

1. 캐시 삭제: .next 폴더를 삭제하여 캐시된 데이터를 제거했습니다.
2. 빌드 재실행: 프로젝트를 다시 빌드하여 최신 데이터를 반영했습니다.
3. 캐싱 전략 검토: 데이터 캐싱 전략을 검토하고, 필요에 따라 캐싱을 비활성화하거나 적절한 캐싱 정책을 설정했습니다.

이 과정을 통해 데이터가 올바르게 반영되도록 하였고, 팀원 모두가 최신 데이터를 확인할 수 있게 되었습니다.
이번 경험을 통해 캐싱 메커니즘의 중요성을 다시 한 번 깨닫게 되었고, 앞으로 유사한 문제가 발생하지 않도록 주의할 것입니다.
```
