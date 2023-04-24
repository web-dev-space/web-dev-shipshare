import { useSettingsContext } from '@mui-library/components/settings';
import {
  EcommerceBestSalesman,
  EcommerceYearlySales,
} from '@mui-library/e-commerce';
import { FileGeneralDataActivity } from '@mui-library/file';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMemo } from "react";
import { getRandomAvatar } from 'utils/getRandomAvatar';
import { useWindowWidth } from 'utils/useWindowsWidth';


function MyGridItem({ children }) {
  const maxHeight = "455px";

  return (
    <Box maxHeight={maxHeight}>
      {children}
    </Box>
  );
}

const DashboardCommonPart = ({ stats, isMerchant }) => {
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();
  const windowWidth = useWindowWidth();
  const isSmallScreen = windowWidth < 600;
  const isExtremeSmallScreen = windowWidth < 400;

  const topLeaders = useMemo(() => {
    return stats?.topFiveLeaders === undefined
      ? []
      : stats?.topFiveLeaders.map((leader, index) => {
        return {
          ...leader,
          total: isExtremeSmallScreen ? undefined : leader.amount,
          key: index,
          id: index,
          rank: isSmallScreen ? undefined : leader.rank,
          avatar: getRandomAvatar(leader?.name),
        }
      });
  }, [stats?.topFiveLeaders, isSmallScreen, isExtremeSmallScreen]);

  const topUsers = useMemo(() => {
    return stats?.topFiveUsers === undefined
      ? []
      : stats?.topFiveUsers.map((user, index) => {
        return {
          ...user,
          total: isExtremeSmallScreen ? undefined : user.amount,
          key: index,
          id: index,
          rank: isSmallScreen ? undefined : user.rank,
          avatar: getRandomAvatar(user?.name),
        }
      });
  }, [stats?.topFiveUsers, isSmallScreen, isExtremeSmallScreen]);

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


  const recentParcelActivity = useMemo(() => {
    return stats?.recentParcelActivity || [];
  }, [stats]);

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

  const tableLabelsForTopLeader = useMemo(() => {
    const result = [
      { id: 'groupLeader', label: 'Group Leader' },
      { id: 'amount', label: 'Amount' },
      { id: 'rank', label: 'Rank', align: 'right' },
    ]
    return isExtremeSmallScreen ? result.slice(0, 1) : isSmallScreen ? result.slice(0, 2) : result;
  }, [isSmallScreen, isExtremeSmallScreen]);

  const tableLabelsForTopUser = useMemo(() => {
    const result = [
      { id: 'buyer', label: 'Buyer' },
      { id: 'amount', label: 'Amount' },
      { id: 'rank', label: 'Rank', align: 'right' },
    ]
    return isExtremeSmallScreen ? result.slice(0, 1) : isSmallScreen ? result.slice(0, 2) : result;
  }, [isSmallScreen, isExtremeSmallScreen]);

  return <>
    {timeLabels !== undefined && <Grid item xs={12} md={6} lg={6}>
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
        style={{ height: '455px' }}
      />
    </Grid>
    }

    <Grid item xs={12} md={6} lg={6}>
      <EcommerceYearlySales
        title="Parcel recieved"
        chart={{
          categories: timeLabels?.week || [],
          series: [
            {
              year: 'Week',
              data: [
                { name: 'Parcel recieved', data: recentParcelActivity.yValues || [] },
              ],
            },
          ],
        }}
        style={{ height: '455px' }}
        defaultSeries="Week"
      />
    </Grid>

    <Grid item xs={12} md={12} lg={12} xl={6}>
      <EcommerceBestSalesman
        title="Top Group Leaders (Forming Groups)"
        tableData={topLeaders}
        tableLabels={tableLabelsForTopLeader}
        style={{ height: '555px' }}
      />
    </Grid>

    <Grid item xs={12} md={12} lg={12} xl={6}>
      <EcommerceBestSalesman
        title="Top Buyers (Joining Groups)"
        tableData={topUsers}
        tableLabels={tableLabelsForTopUser}
        style={{ height: '555px' }}
      />
    </Grid>
  </>
};

export default DashboardCommonPart;
