import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';

export default function BabyProfile() {
    const { register } = useFormContext();

    return (
        <>
            <h1 className='text-lg text-center font-medium mb-[15vh]'>
                아이의 사진을 넣어주세요
            </h1>
            <Label htmlFor='attach' className='text-base text-txt-foreground'>
                아이 프로필
            </Label>
            <Input
                type='file'
                id='attach'
                accept='image/*'
                placeholder='이미지를 선택하세요'
                className='w-full px-3 py-2 border rounded-lg dark:bg-gray-700'
                {...register('attach')}
            />
        </>
    );
}
