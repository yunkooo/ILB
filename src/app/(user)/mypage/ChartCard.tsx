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

export default function ChartCard({ grow }: { grow?: GrowType[] }) {
    // height, weight 차이값 비율 조정 스케일링
    const convertedChartData = grow?.map(data => ({
        date: chartDateCaculate(data.date),
        heightValue: `${data.height}cm`,
        weightValue: `${data.weight}kg`,
        height: Math.log(data.height + 1) * 100,
        weight: Math.log(data.weight + 1) * 100,
    }));

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
                className='mb-5 p-4 h-[230px] w-full bg-card rounded-2xl'>
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
                        className='text-[11px]'
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
