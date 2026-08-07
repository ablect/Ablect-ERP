import Card from "../../../components/ui/Card";

import {
  useAttendanceStatistics,
} from "../hooks/useAttendanceStatistics";

export default function AttendanceStatistics() {

  const {
    total,
    present,
    late,
    absent,
  } = useAttendanceStatistics();

  return (
    <Card>
      <div className="space-y-2">

        <p>
          Total Attendance Records: {total}
        </p>

        <p>
          Present: {present}
        </p>

        <p>
          Late: {late}
        </p>

        <p>
          Absent: {absent}
        </p>

      </div>
    </Card>
  );

}