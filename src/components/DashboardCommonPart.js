import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMemo, Fragment } from "react";
import { useSelector } from 'react-redux';
import {
  EcommerceBestSalesman
} from 'third-party/e-commerce';
import { FileGeneralDataActivity } from 'third-party/file';
import useDebugWhenChange from 'utils/useDebugWhenChange';

const DashboardCommonPart = ({ stats }) => {
  const theme = useTheme();

  const topLeaders = stats?.topFiveLeaders === undefined
    ? []
    : stats?.topFiveLeaders.map((leader, index) => {
      return {
        ...leader,
        total: leader.amount,
        key: index,
        id: index,
      }
    });

  const topUsers = stats?.topFiveUsers === undefined
    ? []
    : stats?.topFiveUsers.map((user, index) => {
      return {
        ...user,
        total: user.amount,
        key: index,
        id: index,
      }
    });

  const weeklyData = useMemo(() => {
    return stats?.activityWeekly === undefined ? {} : stats?.activityWeekly?.map((activity, index) => {
      return {
        name: activity.route,
        data: activity.data,
      }
    })
  }, [stats?.activityWeekly]);

  const monthlyData = useMemo(() => {
    return stats?.activityMonthly === undefined ? {} : stats?.activityMonthly?.map((activity, index) => {
      return {
        name: activity.route,
        data: activity.data,
      }
    })
  }, [stats?.activityMonthly]);


  const timeLabels = useMemo(() => {
    const rotateArray = (arr, index) => {
      if (index === -1) {
        return arr;
      }
      return arr.slice(index, arr.length).concat(arr.slice(0, index));
    }

    function getLastSevenWeekDates() {
      const dates = [];
      const today = new Date();

      for (let i = 6; i >= 0; i--) {
        // Calculate past week date
        const pastWeekDate = new Date(today);
        pastWeekDate.setDate(today.getDate() - 1 - 7 * i);

        // Format the date as 'M/D'
        const formattedDate = `${pastWeekDate.getMonth() + 1}/${pastWeekDate.getDate()}`;

        // Add it to our array of dates
        dates.push(formattedDate);
      }

      return dates;
    }


    const timeLabels = {
      week: getLastSevenWeekDates(),
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      year: ['2018', '2019', '2020', '2021', '2022'],
    };

    const todayMonth = new Date().getMonth();
    timeLabels.month = rotateArray(timeLabels.month, todayMonth);
    return timeLabels;

  }, []);

  return <Fragment>
    {timeLabels !== undefined && <Grid item xs={12} md={12} lg={12}>
      <FileGeneralDataActivity
        title="Shipment Activity"
        chart={{
          labels: timeLabels,
          colors: [
            theme.palette.success.main,
            theme.palette.error.main,
            theme.palette.info.main,
            theme.palette.warning.main,
          ],
          series: [
            {
              type: 'Week',
              data: weeklyData,
            },
            {
              type: 'Month',
              data: monthlyData,
            },
          ],
        }}
      />
    </Grid>
    }

    <Grid item xs={12} md={6} lg={6}>
      <EcommerceBestSalesman
        title="Top Group Leaders (Forming Groups)"
        tableData={topLeaders}
        tableLabels={[
          { id: 'groupLeader', label: 'Group Leader' },
          { id: 'amount', label: 'Amount' },
          { id: 'rank', label: 'Rank', align: 'right' }, //delete if not needed
        ]}
      />
    </Grid>

    <Grid item xs={12} md={6} lg={6}>
      <EcommerceBestSalesman
        title="Top Buyers (Joining Groups)"
        tableData={topUsers}
        tableLabels={[
          { id: 'buyer', label: 'Buyer' },
          { id: 'amount', label: 'Amount' },
          { id: 'rank', label: 'Rank', align: 'right' }, //delete if not needed
        ]}
      />
    </Grid>
  </Fragment>
};

export default DashboardCommonPart;
