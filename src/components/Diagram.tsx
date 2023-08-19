import React from 'react';
import { capitalize, segmentStats } from './Statistic';
import './Diagram.css'


interface diagramProps {
  segments: segmentStats[];
};

export const Diagram = (diagramStats: diagramProps) => {

  const cx = 50;
  const cy = 50;
  const r = 40;
  //const colors = ['#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#3498db'];

  const percentages: number[] = [];
  const labels: string[] = [];
  const percentLabels: string[] = [];
  diagramStats.segments.forEach(item => {
    percentages.push(item.percent);
    labels.push(item.name);
    percentLabels.push(`(${item.percent}%)`);
  });

  const generateSVGPath = (
    startAngle: number,
    endAngle: number
  ): string => {
    const startRadians = (startAngle - 90) * (Math.PI / 180);
    const endRadians = (endAngle - 90) * (Math.PI / 180);

    const startX = cx + r * Math.cos(startRadians);
    const startY = cy + r * Math.sin(startRadians);
    const endX = cx + r * Math.cos(endRadians);
    const endY = cy + r * Math.sin(endRadians);

    return `M${cx},${cy} L${startX},${startY} A${r},${r} 0 ${(endAngle - startAngle) > 180 ? 1 : 0
      },1 ${endX},${endY} Z`;
  };

  return (
    <svg viewBox="0 0 100 100" width="480" height="480">
      {percentages.map((percentage, index) => {
        const startAngle = index === 0 ? 0 : percentages.slice(0, index).reduce((acc, val) => acc + (360 * (val / 100)), 0);
        const endAngle = startAngle + (360 * (percentage / 100));
        const labelAngle = startAngle + (endAngle - startAngle) / 2;
        const labelRadius = r * 0.6; // Adjusts label distance from center

        const shouldDisplayLabel = percentage > 9;

        return (
          <g key={index}>
            <path
              d={generateSVGPath(startAngle, endAngle)}
              fill={diagramStats.segments[index].colorScheme}
            />
            {shouldDisplayLabel && (
              <text className='label-text'
                x={cx + labelRadius * Math.cos((labelAngle - 90) * (Math.PI / 180))}
                y={cy + labelRadius * Math.sin((labelAngle - 90) * (Math.PI / 180))}
                dy="0.4em" // Adjust this value to vertically align the label
              >
                {capitalize(labels[index])}{' '}{percentLabels[index]}

              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};
