import { useState, useMemo, useRef, useCallback, useLayoutEffect } from 'react';
import { useTheme } from 'styled-components';
import { getColor } from '@zendeskgarden/react-theming';
import { Modal, Header, Body, Footer, FooterItem, Close } from '@zendeskgarden/react-modals';
import { Button } from '@zendeskgarden/react-buttons';
import { Field, Label, Input } from '@zendeskgarden/react-forms';
import { SM, MD, Span } from '@zendeskgarden/react-typography';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { generateGraphData } from './workload-pacing';
import { createLineHoverDot } from './LineHoverDot';
import { getXAxisDisplayTicks } from './chart-axis-ticks';

function getAxisTicks(maxValue) {
  return Array.from({ length: maxValue + 1 }, (_, index) => index);
}

const CHART_HEIGHT = 360;
const CHART_MARGIN = {
  top: 8,
  right: 16,
  bottom: 8,
  left: 16,
};

const DEFAULT_TOOLTIP_TRANSFORM = 'translate(-50%, calc(-100% - var(--spacing-xs)))';

function getTooltipTransform(vertical, horizontal) {
  const gap = 'var(--spacing-xs)';
  const translateY = vertical === 'top' ? `calc(-100% - ${gap})` : gap;

  if (horizontal === 'left') {
    return `translate(0, ${translateY})`;
  }
  if (horizontal === 'right') {
    return `translate(-100%, ${translateY})`;
  }
  return `translate(-50%, ${translateY})`;
}

function getTooltipPlacement(point, tooltipSize, plotBounds) {
  const gap = 8;
  const { width: tooltipWidth, height: tooltipHeight } = tooltipSize;
  const { top: plotTop, left: plotLeft, width: plotWidth, height: plotHeight } = plotBounds;

  const plotRelativeY = point.top - plotTop;
  const plotRelativeX = point.left - plotLeft;

  const fitsAbove = plotRelativeY - gap - tooltipHeight >= 0;
  const fitsBelow = plotRelativeY + gap + tooltipHeight <= plotHeight;

  let vertical = 'top';
  if (!fitsAbove && fitsBelow) {
    vertical = 'bottom';
  } else if (!fitsAbove && !fitsBelow) {
    vertical = plotRelativeY < plotHeight / 2 ? 'bottom' : 'top';
  }

  const fitsCenter =
    plotRelativeX - tooltipWidth / 2 >= 0 &&
    plotRelativeX + tooltipWidth / 2 <= plotWidth;

  let horizontal = 'center';
  if (!fitsCenter) {
    horizontal = plotRelativeX < plotWidth / 2 ? 'left' : 'right';
  }

  return getTooltipTransform(vertical, horizontal);
}

function ChartLegend({ items }) {
  if (items.length === 0) return null;

  return (
    <div className="capacity-graph-modal__chart-legend" role="list">
      {items.map((item) => (
        <div
          key={item.name}
          className="capacity-graph-modal__chart-legend-item"
          role="listitem"
        >
          <span
            className="capacity-graph-modal__chart-legend-swatch"
            style={{ backgroundColor: item.color }}
            aria-hidden="true"
          />
          <SM className="capacity-graph-modal__chart-legend-label">{item.name}</SM>
        </div>
      ))}
    </div>
  );
}

function TooltipRow({ label, value }) {
  return (
    <SM className="capacity-graph-modal__series-tooltip-row">
      {label}
      <Span className="capacity-graph-modal__series-tooltip-value-amount">{value}</Span>
    </SM>
  );
}

function SeriesTooltip({ point, plotRef }) {
  const tooltipRef = useRef(null);
  const [transform, setTransform] = useState(DEFAULT_TOOLTIP_TRANSFORM);

  useLayoutEffect(() => {
    if (!point || !tooltipRef.current || !plotRef.current) {
      setTransform(DEFAULT_TOOLTIP_TRANSFORM);
      return;
    }

    const tooltipEl = tooltipRef.current;
    const plotEl = plotRef.current;

    setTransform(
      getTooltipPlacement(
        point,
        { width: tooltipEl.offsetWidth, height: tooltipEl.offsetHeight },
        {
          top: plotEl.offsetTop,
          left: plotEl.offsetLeft,
          width: plotEl.offsetWidth,
          height: plotEl.offsetHeight,
        }
      )
    );
  }, [point, plotRef]);

  if (!point) return null;

  return (
    <div
      ref={tooltipRef}
      className="capacity-graph-modal__series-tooltip"
      style={{ left: point.left, top: point.top, transform }}
    >
      <MD className="capacity-graph-modal__series-tooltip-label">{point.channelTitle}</MD>
      <div className="capacity-graph-modal__series-tooltip-values">
        <TooltipRow label="Time (MSO): " value={`${point.time} min`} />
        <TooltipRow label="Agent capacity (tickets): " value={point.tickets} />
        <TooltipRow label="Capacity ramp-up: " value={`${point.capacityPercent}%`} />
      </div>
    </div>
  );
}

export default function CapacityGraphModal({ email, messaging, onClose }) {
  const theme = useTheme();
  const emailColor = getColor({ theme, variable: 'foreground.default' });
  const messagingColor = getColor({ theme, variable: 'foreground.primary' });
  const gridColor = getColor({ theme, variable: 'border.subtle' });

  const chartContainerRef = useRef(null);
  const chartPlotRef = useRef(null);
  const lineHoverRef = useRef(null);
  const [tooltipPoint, setTooltipPoint] = useState(null);
  const [, setLineHoverVersion] = useState(0);

  const [emailMaxCapacity, setEmailMaxCapacity] = useState(10);
  const [messagingMaxCapacity, setMessagingMaxCapacity] = useState(5);

  const graphData = useMemo(
    () => generateGraphData(email, messaging, emailMaxCapacity, messagingMaxCapacity),
    [email, messaging, emailMaxCapacity, messagingMaxCapacity]
  );

  const maxAxisValue = Math.max(
    email.enabled ? emailMaxCapacity : 0,
    messaging.enabled ? messagingMaxCapacity : 0,
    1
  );

  const yAxisTicks = useMemo(
    () => getAxisTicks(maxAxisValue),
    [maxAxisValue]
  );

  const maxTimeValue = useMemo(() => {
    if (graphData.length === 0) return 0;
    return graphData[graphData.length - 1].time;
  }, [graphData]);

  const xAxisDisplayTicks = useMemo(
    () => getXAxisDisplayTicks(maxTimeValue),
    [maxTimeValue]
  );

  const showTooltip = useCallback((point) => {
    setTooltipPoint(point);
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltipPoint(null);
  }, []);

  const showLineHover = useCallback((hover) => {
    lineHoverRef.current = hover;
    setLineHoverVersion((version) => version + 1);
  }, []);

  const hideLineHover = useCallback((seriesKey) => {
    if (lineHoverRef.current?.seriesKey !== seriesKey) return;
    lineHoverRef.current = null;
    setLineHoverVersion((version) => version + 1);
  }, []);

  const dotConfig = useMemo(
    () => ({
      chartContainerRef,
      lineHoverRef,
      onPointHover: showTooltip,
      onPointLeave: hideTooltip,
      onLineHover: showLineHover,
      onLineLeave: hideLineHover,
    }),
    [showTooltip, hideTooltip, showLineHover, hideLineHover]
  );

  const emailDot = useMemo(
    () =>
      createLineHoverDot({
        ...dotConfig,
        seriesKey: 'email',
        color: emailColor,
        channelTitle: 'Email tickets',
        getCapacityPercent: (payload) => payload.emailCapacity,
      }),
    [dotConfig, emailColor]
  );

  const messagingDot = useMemo(
    () =>
      createLineHoverDot({
        ...dotConfig,
        seriesKey: 'messaging',
        color: messagingColor,
        channelTitle: 'Messaging tickets',
        getCapacityPercent: (payload) => payload.messagingCapacity,
      }),
    [dotConfig, messagingColor]
  );

  const legendItems = useMemo(() => {
    const items = [];
    if (email.enabled) {
      items.push({ name: 'Email', color: emailColor });
    }
    if (messaging.enabled) {
      items.push({ name: 'Messaging', color: messagingColor });
    }
    return items;
  }, [email.enabled, messaging.enabled, emailColor, messagingColor]);

  const chartMargin = CHART_MARGIN;

  return (
    <Modal className="capacity-graph-modal" onClose={onClose} isLarge>
      <Header>Agent capacity ramp-up simulation</Header>
      <Body>
        <div className="capacity-graph-modal__content">
          <div className="capacity-graph-modal__chart" ref={chartContainerRef}>
            <div className="capacity-graph-modal__chart-plot" ref={chartPlotRef}>
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <LineChart data={graphData} margin={chartMargin}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis
                    dataKey="time"
                    domain={[0, maxTimeValue]}
                    ticks={xAxisDisplayTicks}
                    allowDecimals={false}
                    tickMargin={8}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, maxAxisValue]}
                    ticks={yAxisTicks}
                    allowDecimals={false}
                    tickMargin={8}
                    axisLine={false}
                    tickLine={false}
                    width={48}
                    label={{
                      value: 'Agent capacity (tickets)',
                      angle: -90,
                      position: 'insideLeft',
                      offset: 8,
                      style: { textAnchor: 'middle' },
                    }}
                  />
                  {email.enabled && (
                    <Line
                      type="monotone"
                      dataKey="emailTickets"
                      stroke={emailColor}
                      strokeWidth={2}
                      name="Email"
                      dot={emailDot}
                      activeDot={false}
                      isAnimationActive={false}
                    />
                  )}
                  {messaging.enabled && (
                    <Line
                      type="monotone"
                      dataKey="messagingTickets"
                      stroke={messagingColor}
                      strokeWidth={2}
                      name="Messaging"
                      dot={messagingDot}
                      activeDot={false}
                      isAnimationActive={false}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="capacity-graph-modal__chart-footer">
              <SM className="capacity-graph-modal__chart-axis-label">
                Time - minutes since online (MSO)
              </SM>
              <ChartLegend items={legendItems} />
            </div>
            <SeriesTooltip point={tooltipPoint} plotRef={chartPlotRef} />
          </div>

          <div className="capacity-graph-modal__capacity-inputs">
            {email.enabled && (
              <Field>
                <Label>Agent capacity (email)</Label>
                <Input
                  type="number"
                  value={emailMaxCapacity}
                  onChange={(e) =>
                    setEmailMaxCapacity(
                      Math.min(100, Math.max(1, parseInt(e.target.value, 10) || 1))
                    )
                  }
                  min={1}
                  max={100}
                />
              </Field>
            )}
            {messaging.enabled && (
              <Field>
                <Label>Agent capacity (messaging)</Label>
                <Input
                  type="number"
                  value={messagingMaxCapacity}
                  onChange={(e) =>
                    setMessagingMaxCapacity(
                      Math.min(50, Math.max(1, parseInt(e.target.value, 10) || 1))
                    )
                  }
                  min={1}
                  max={50}
                />
              </Field>
            )}
          </div>
        </div>
      </Body>
      <Footer>
        <FooterItem>
          <Button isBasic onClick={onClose}>
            Close
          </Button>
        </FooterItem>
      </Footer>
      <Close aria-label="Close modal" />
    </Modal>
  );
}
