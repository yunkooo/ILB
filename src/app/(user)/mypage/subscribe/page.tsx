import { actionUserData } from '@/data/actions/userAction';
import Subscriber from './Subcriber';
import NotSubscriber from './NotSubscriber';

export default async function Subscribe() {
    // 유저 정보를 가져온다(아이 개월수)
    const { item: userData } = await actionUserData();

    const isSubscribe = userData.extra.subscribe.status === 'true';

    // subscribe 유무에 따른 component 렌더링
    return (
        <section>{isSubscribe ? <Subscriber /> : <NotSubscriber />}</section>
    );
}
