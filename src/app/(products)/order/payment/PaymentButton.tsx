'use client';

import { Button } from '@/components/ui/button';
import { actionSubscribeModify } from '@/data/actions/payAction';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

function generateRandomString() {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 8;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}

export default function PaymentButton() {
    const router = useRouter();

    const requestPay = () => {
        if (window.IMP) {
            const { IMP } = window;

            IMP.init('imp14397622');
            IMP.request_pay(
                {
                    pg: 'tosspayments.iamporttest_3',
                    pay_method: 'card',
                    merchant_uid: `payment-${generateRandomString()}`,
                    name: '테스트 결제',
                    amount: 100,
                    buyer_name: 'ILB',
                    buyer_tel: '010-0000-0000',
                    m_redirect_url: 'http://localhost:3000/order/payment/check',
                },
                function (rsp: any) {
                    // 결제 성공 시 로직
                    if (!rsp.error_code) {
                        actionSubscribeModify();
                        // 결제 완료 페이지로 이동
                        router.push('/order/complete');
                    } else {
                        // 결제 실패 시 로직
                        console.log('결제 실패', rsp);
                        alert(
                            '결제에 실패하였습니다. 에러 내용: ' +
                                rsp.error_msg,
                        );
                        router.push('/order/fail');
                    }
                },
            );
        }
    };

    return (
        <div>
            <Button
                className='fixed bottom-[60px] w-default font-notoSansKr'
                variant={'default'}
                onClick={requestPay}>
                결제하기
            </Button>
            <Script src='https://cdn.iamport.kr/v1/iamport.js' />
        </div>
    );
}
