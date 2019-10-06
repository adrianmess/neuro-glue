import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/exh283uh/";

  render() {
    const { cards, currentCardSetID } = this.props;
    const scores = cards[currentCardSetID]["Scores"];
    const lastFiveScores = [];
    const scoreBoolean = scores !== undefined;

    if (scores !== undefined) {
      if (scores.length > 5) {
        for (let i = scores.length - 1; i >= scores.length - 5; i--) {
          lastFiveScores.push(scores[i]);
        }
      } else {
        for (let i = 0; i < scores.length; i++) {
          lastFiveScores.push(scores[i]);
        }
      }
    }

    return (
      <div id="smallGraphContainer">
        {scoreBoolean ? (
          <div id="arrayWithData">
            <LineChart width={120} height={40} data={lastFiveScores}>
              <CartesianGrid
                strokeDasharray="1 1"
                horizontalPoints={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]}
                fillOpacity={1}
              />
              <YAxis
                tick={false}
                domain={[0, 100]}
                // ticks={[25, 50, 75, 100]}
                // tick={{ stroke: "red", strokeWidth: 1, fontSize: 0 }}
                // tickSize={10}
                // minTickGap={0.01}
                hide
              />
              <XAxis tick={true} domain={[0, 8]} hide />
              <Line
                type="monotone"
                dataKey={"scorePercentAsNum"}
                stroke="#8884d8"
                strokeWidth={1}
                // animationDuration={0}
                isAnimationActive={true}
              />
              {/* <Area dataKey="scorePercentAsNum" dot={true} /> */}
            </LineChart>
          </div>
        ) : (
          <div id="emptyArray">
            {" "}
            <LineChart width={120} height={40}>
              <CartesianGrid
                strokeDasharray="1 1"
                horizontalPoints={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]}
                fillOpacity={1}
              />
              <YAxis
                tick={false}
                domain={[0, 100]}
                // ticks={[25, 50, 75, 100]}
                // tick={{ stroke: "red", strokeWidth: 1, fontSize: 0 }}
                // tickSize={10}
                // minTickGap={0.01}
                hide
              />
              <XAxis tick={true} domain={[0, 8]} hide />
              <Line
                type="monotone"
                dataKey={"scorePercentAsNum"}
                stroke="#8884d8"
                strokeWidth={1}
                // animationDuration={0}
                isAnimationActive={true}
              />
              {/* <Area dataKey="scorePercentAsNum" dot={true} /> */}
            </LineChart>
          </div>
        )}
      </div>
    );
  }
}
