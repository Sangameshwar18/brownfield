import Icon from "./Icon";
import "./componentscss.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Graph = ({ revenue, graph }) => {
  console.log(graph);

  const graphData = ["oct", "dec", "nov"].map((i) => {
    const revenue = 500 + Math.random() * 2000;
    const expectedRevenue = Math.max(revenue + (Math.random() - 0.5) * 2000, 0);
    return {
      name: i,
      graph,
      // expectedRevenue,
      // sales: Math.floor(Math.random() * 500),
    };
  });
  // console.log(graphData)

  const CustomTooltip = ({ active, payload }) => (
    <div className="rounded-xl overflow-hidden tooltip-head">
      <div className="flex items-center justify-between p-2">
        <div className="">Total Revenue</div>
        <Icon path="res-react-dash-options" className="w-2 h-2" />
      </div>
      <div className="tooltip-body text-center p-3">
        <div className="text-white font-bold">
          {active && payload[0].payload.totalRevenue}
        </div>
        {/* <div className="">Revenue from 230 sales</div> */}
      </div>
    </div>
  );

  return (
    <div className="flex p-4 h-full flex-col">
      <div className="">
        <div className="flex items-center">
          <div className="font-bold text-white">Revenue Generated</div>
          <div className="flex-grow" />

          <Icon path="res-react-dash-graph-range" className="w-4 h-4" />
          <div className="ml-2">Last 15 Days</div>
          {/* <div className="ml-6 w-5 h-5 flex justify-center items-center rounded-full icon-background">
            ?
          </div> */}
        </div>
        {/* <div className="font-bold ml-5">Nov - July</div> */}
      </div>

      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={graph}>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#6B8DE3" />
                <stop offset="1" stopColor="#7D1C8D" />
              </linearGradient>
            </defs>
            <CartesianGrid
              horizontal={false}
              strokeWidth="1"
              stroke="#a3a3a3"
            />
            <XAxis
              dataKey="dateOfBooking"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={10} />
            <Tooltip content={<CustomTooltip />} cursor={true} />
            {/* <Line
              activeDot={false}
              type="monotone"
              dataKey="totalRevenue"
              stroke="#242424"
              strokeWidth="3"
              dot={false}
              strokeDasharray="15 15"
            /> */}
            <Line
              type="monotone"
              dataKey="totalRevenue"
              stroke="url(#paint0_linear)"
              strokeWidth="3"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
