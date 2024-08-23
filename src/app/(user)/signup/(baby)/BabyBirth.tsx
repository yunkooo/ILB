'use clent';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format, isAfter, isBefore, parse } from 'date-fns';

import { useFormContext } from 'react-hook-form';

export default function BabyBirth() {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    // 0~24개월 사이 개월 수만 받을 수 있는 validation
    const validateBirthDate = (value: string) => {
        // birth 받은 input값 날짜로 수정
        const inputDate = parse(value, 'yyyyMMdd', new Date());

        // 현재 날짜
        const currentDate = new Date();

        // minDate, maxDate 초기화
        const minDate = new Date();
        const maxDate = new Date();

        // minDate = 현재에서 24개월을 뺀 개월수를 구한다
        minDate.setMonth(currentDate.getMonth() - 24);

        // isAfter - 첫번째 Date는 두번째 Date 이후인지?
        // isBefore - 첫번째 Date는 두번째 Date 이전인지?
        if (isAfter(inputDate, maxDate) || isBefore(inputDate, minDate)) {
            return `현재 날짜 기준으로 0 ~ 24개월 사이여야 합니다. (${format(minDate, 'yyyyMMdd')} ~ ${format(maxDate, 'yyyyMMdd')})`;
        }

        return true;
    };

    return (
        <>
            <h1 className='text-lg text-center font-medium mb-[15vh]'>
                아이의 생일을 알려주세요!
            </h1>
            <Label htmlFor='babyBirthday' className='text-base'>
                생년월일
            </Label>
            <Input
                id='babyBirthday'
                className='border-0 border-b-[1px] rounded-none p-[5px] sborder-txt-foreground w-[97%] mx-1 mt-2'
                type='text'
                placeholder='생년월일을 입력하세요. ex) 20240815'
                {...register('birth', {
                    required: true,
                    pattern: {
                        value: /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/,
                        message:
                            '올바른 형식이 아닙니다. YYYYMMDD 형식으로 입력해주세요.',
                    },
                    minLength: {
                        value: 8,
                        message: '8자리를 입력해주세요.',
                    },
                    maxLength: {
                        value: 8,
                        message: '8자리를 입력해주세요.',
                    },
                    validate: validateBirthDate,
                })}
            />
            {errors.birth && (
                <p className='text-red-500'>
                    {errors.birth.message?.toString()}
                </p>
            )}
        </>
    );
}
