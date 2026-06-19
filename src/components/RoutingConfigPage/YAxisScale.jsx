import { SM } from '@zendeskgarden/react-typography';
import { CHART_HEIGHT, getYAxisTickTop } from './chart-constants';

export default function YAxisScale({ ticks, maxAxisValue, tickColor }) {
  return (
    <div className="capacity-graph-modal__chart-y-axis-scale" style={{ height: CHART_HEIGHT }}>
      {ticks.map((tick) => (
        <SM
          key={tick}
          tag="span"
          className="capacity-graph-modal__chart-y-axis-tick"
          style={{
            top: getYAxisTickTop(tick, maxAxisValue),
            color: tickColor,
          }}
        >
          {tick}
        </SM>
      ))}
    </div>
  );
}
