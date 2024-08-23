'use server';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export async function actionProducts() {
    try {
        const res = await fetch(`${SERVER}/products`, {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                'client-id': '05-ILB',
            },
        });

        const resData = await res.json();
        return resData;
    } catch (error) {
        console.error('에러 발생~~~');
    }
}

export async function actionCodes() {
    try {
        const res = await fetch(`${SERVER}/codes/step`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'client-id': '05-ILB',
            },
        });

        const resData = await res.json();
        return resData;
    } catch (error) {
        console.error('에러 발생~~~');
    }
}
