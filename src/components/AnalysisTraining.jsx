import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Label,
} from "recharts";
import { getTraining } from "../customerTrainingAPI";
import _ from "lodash";
import { StyledHeading, CenteredContainer } from "./style";

const AnalysisTraining = () => {
  const [activityStats, setActivityStats] = useState([]);

  const calculateActivityStatistics = (trainingData) => {
    // Group by activity and calculate total duration for each activity
    const groupedByActivity = _.groupBy(trainingData, "activity");
    const stats = _.map(groupedByActivity, (activities, activityName) => ({
      activity: activityName,
      totalDuration: _.sumBy(activities, "duration"), // Sum durations for each activity
    }));

    setActivityStats(stats);
  };
  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const data = await getTraining(); // Fetch training data
        calculateActivityStatistics(data); // Calculate statistics
      } catch (error) {
        console.error("Error fetching training data:", error);
      }
    };

    fetchTrainingData(); // Fetch data on component mount
  }, []); // Run once on component mount
  
  return (
    <div>
      <StyledHeading>Training Statistics</StyledHeading>
      <CenteredContainer>
      <BarChart
        width={600} // Set width
        height={300} // Set height
        data={activityStats} // Pass calculated statistics
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="activity">
          <Label value="Training Activity" offset={-10} position="insideBottom" />{" "}
          {/* X-axis name */}
        </XAxis>
        <YAxis>
          <Label
            value="Duration (min)"
            angle={-90}
            position="insideLeft"
          />{" "}
          {/* Y-axis name */}
        </YAxis>
        <Tooltip /> // Show tooltip on hover
        <Bar dataKey="totalDuration" fill="#4B9CD3" /> // Bar with fill color
      </BarChart>
      </CenteredContainer>
    </div>
  );
};

export default AnalysisTraining;
// function AnalysisTraining() {
//     return (
//         <>
//         <p>Statistics</p></>
//     )
// }
// export default AnalysisTraining;
