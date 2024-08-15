'use client';

import Link from 'next/link';
import { Bar, BarChart, LabelList, XAxis } from 'recharts';
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { GrowType } from '@/types';
import { chartDateCaculate } from '@/util/calculate';
import { Great_Vibes } from 'next/font/google';

import { useEffect, useState } from 'react';
import { getBabyData } from '@/data/actions/babyAction';

const chartConfig = {
    height: {
        label: '키',
        color: '#9BD9A8',
    },
    weight: {
        label: '몸무게',
        color: '#FF8087',
    },
} satisfies ChartConfig;

export default function ChartCard() {
    const [growData, setGrowData] = useState<GrowType[]>([]);
    // height, weight 차이값 비율 조정 스케일링
    let remakeGrowArray: GrowType[] = [];
    // grow 배열의 요소가 5개 미만이 일 경우 그래프 틀(5개)을 만들어 주기 위해
    // grow 배열을 넣고 나머지 요소들은 빈 grow를 넣어준다.
    if (growData !== undefined) {
        remakeGrowArray = Array.from({ length: 5 }, (_, index) =>
            index < growData.length
                ? growData[index]
                : { weight: '', height: '', date: '' },
        );
    }

    const convertedChartData = remakeGrowArray?.map(data => {
        if (data.height === '' && data.weight === '') {
            return null;
        }
        return {
            date: chartDateCaculate(data.date),
            heightValue: `${data.height}cm`,
            weightValue: `${data.weight}kg`,
            height: Math.log(parseInt(data.height) + 1) * 100,
            weight: Math.log(parseInt(data.weight) + 1) * 100,
        };
    });
    console.log('convertedChartData', convertedChartData);

    useEffect(() => {
        const resGrowData = async () => {
            try {
                const response = await getBabyData();
                setGrowData(response.item.extra.baby.grow);
            } catch (error) {
                console.log(error);
            }
        };

        resGrowData();
    }, []);
    return (
        <>
            <div className='flex justify-between items-end mb-4 text-sm'>
                <span className='font-bold'>우리 아이 성장 그래프</span>
                <Link
                    className='text-10 font-medium text-txt-foreground leading-3'
                    href={'/mypage/updatebody'}>
                    아이 신체 정보 입력하기
                </Link>
            </div>
            <ChartContainer
                config={chartConfig}
                className='mb-5 p-4 h-[250px] w-full bg-card rounded-2xl'>
                <BarChart accessibilityLayer data={convertedChartData}>
                    <XAxis
                        className='text-xs'
                        dataKey='date'
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey='height' fill='var(--color-height)' radius={4}>
                        <LabelList
                            dataKey='heightValue'
                            position='top'
                            className='text-[10px]'
                        />
                    </Bar>
                    <Bar dataKey='weight' fill='var(--color-weight)' radius={4}>
                        <LabelList
                            dataKey='weightValue'
                            position='top'
                            className='text-[10px]'
                        />
                    </Bar>
                </BarChart>
            </ChartContainer>
        </>
    );
}
