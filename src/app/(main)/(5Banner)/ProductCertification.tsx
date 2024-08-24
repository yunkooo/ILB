import Image from 'next/image';

export default function ProductCertification() {
    return (
        <article className='bg-gradient-to-b from-[#FFF0F2] via-[#FFFFFF] via-85% to-[#EAF0EE] flex flex-col px-5 pt-[104px] pb-24'>
            <h2 className='mb-[38px] text-3xl font-bold text-center leading-[150%]'>
                아이들에게 이로운
                <br />
                제품만을 엄선합니다
            </h2>
            <div className='grid grid-cols-2 justify-items-center gap-y-16'>
                <div className='flex flex-col justify-center items-center text-center w-[156px] h-[156px]'>
                    <Image
                        className='text-center'
                        width={100}
                        height={100}
                        src='/icon/icon_ban.svg'
                        alt='원산지 관리 인증 마크'
                    />
                    <p className='font-medium mt-[8px]'>원산지 관리</p>
                    <p className='text-sm font-light mt-[5px]'>
                        중국,일본산 미사용
                    </p>
                </div>
                <div className='flex flex-col justify-center items-center text-center w-[156px] h-[156px]'>
                    <Image
                        className='text-center'
                        width={100}
                        height={100}
                        src='/icon/icon_safety.svg'
                        alt='안전 인증 마크'
                    />
                    <p className='font-medium mt-[8px]'>안전 인증</p>
                    <p className='text-sm font-light mt-[5px]'>
                        아이에게 안전한 제품 보장
                    </p>
                </div>
                <div className='flex flex-col justify-center items-center text-center w-[156px] h-[156px]'>
                    <Image
                        className='text-center'
                        width={100}
                        height={100}
                        src='/icon/icon_gmo.svg'
                        alt='안전한 원료 사용 인증 마크'
                    />
                    <p className='font-medium mt-[8px]'>Non-GMO</p>
                    <p className='text-sm font-light mt-[5px]'>
                        안전한 원료만 사용
                    </p>
                </div>
                <div className='flex flex-col justify-center items-center text-center w-[156px] h-[156px]'>
                    <Image
                        className='text-center'
                        width={100}
                        height={100}
                        src='/icon/icon_eco.svg'
                        alt='친환경 패키징 인증 마크'
                    />
                    <p className='font-medium mt-[8px]'>친환경 포장</p>
                    <p className='text-sm font-light mt-[5px]'>
                        지구를 생각하는 패키징
                    </p>
                </div>
            </div>
        </article>
    );
}
