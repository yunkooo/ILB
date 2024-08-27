import { useFormContext } from 'react-hook-form';

export default function BabyProfile() {
    const { register } = useFormContext();

    return (
        <>
            <h1 className='text-lg text-center font-medium mb-[15vh]'>
                아이의 사진을 넣어주세요
            </h1>
            <div className='flex flex-col items-center gap-4'>
                <label
                    htmlFor='attach'
                    className='self-start text-txt-foreground'>
                    아이 프로필
                </label>
                <input
                    type='file'
                    id='attach'
                    accept='image/*'
                    placeholder='이미지를 선택하세요'
                    className='w-full text-lg text-txt-foreground file:w-1/3 file:mr-5 file:py-2 file:px-6 file:rounded-3xl file:border-0 file:font-medium file:bg-[#FFEBEC] file:text-txt hover:file:cursor-pointer hover:file:bg-primary-foreground'
                    {...register('attach')}
                />
            </div>
        </>
    );
}
