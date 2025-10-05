import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { NutritionInfo } from '../types';

interface NutritionChartProps {
  nutrition: NutritionInfo;
}

const colors = ['#16a34a', '#4f46e5', '#db2777', '#f59e0b', '#10b981'];

export const NutritionChart: React.FC<NutritionChartProps> = ({ nutrition }) => {
  const data = [
    { name: 'Protein', value: nutrition.protein, unit: 'g' },
    { name: 'Carbs', value: nutrition.carbohydrates, unit: 'g' },
    { name: 'Fat', value: nutrition.fat, unit: 'g' },
    { name: 'Sugar', value: nutrition.sugar ?? 0, unit: 'g' },
    { name: 'Fiber', value: nutrition.fiber ?? 0, unit: 'g' },
  ].filter(item => item.value > 0);

  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: 'rgba(var(--color-muted), 0.5)' }}
            contentStyle={{
              backgroundColor: 'rgb(var(--color-card))',
              borderColor: 'rgb(var(--color-border))',
              borderRadius: '0.5rem'
            }}
            formatter={(value: number, name, props) => [`${value}${props.payload.unit}`, props.payload.name]}
          />
          <Bar dataKey="value" barSize={20} radius={[0, 4, 4, 0]}>
             {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};