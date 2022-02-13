// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const theme = {
  grid: {
    line: {
      strokeWidth: 0.2,
    },
  },
  axis: {
    legend: {
      text: {
        fontSize: 12,
        fill: "#999",
      },
    },
    fontSize: "50px",
    tickColor: "#eee",
    ticks: {
      line: {
        stroke: "#555555",
      },
      text: {
        fill: "#999",
      },
    },
  },
  tooltip: {
    container: {
      background: "#ffffff",
      color: "#333333",
      fontSize: 12,
    },
  },
};
export const BreakdownChart = ({ data /* see data tab */ }) => (
  <ResponsiveBar
    data={data}
    theme={theme}
    keys={["win", "draw", "lose"]}
    indexBy="name"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.2}
    layout="horizontal"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "accent" }}
    borderColor={{
      from: "color",
      modifiers: [["brighter", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      ticksfontSize: 36,
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "games",
      legendPosition: "middle",
      legendOffset: 35,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
    }}
    tooltip={({ id, value, color }) => (
      <div
        style={{
          padding: 12,
          color,
          background: "#222222",
        }}
      >
        <strong>
          {id}: {value}
        </strong>
      </div>
    )}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    role="application"
  />
);
