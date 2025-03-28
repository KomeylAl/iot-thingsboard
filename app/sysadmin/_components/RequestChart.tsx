import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

const chartConfig = {
   desktop: {
     label: "Desktop",
     color: "#2563eb",
   }
 } satisfies ChartConfig;

 const chartData = [
   { month: "January", desktop: 186 },
   { month: "February", desktop: 305 },
   { month: "March", desktop: 237 },
   { month: "April", desktop: 73 },
   { month: "May", desktop: 209 },
   { month: "June", desktop: 214 },
 ]

const RequestChart = () => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
         <CartesianGrid vertical={false}/>
         <XAxis 
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
         />
         <ChartTooltip content={<ChartTooltipContent />}/>
         <Bar dataKey="desktop" fill='var(--color-desktop)' radius={4}/>
      </BarChart>
    </ChartContainer>
  )
}

export default RequestChart