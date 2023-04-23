import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { fNumber, fPercent } from '../utils/formatNumber';
// components
import Iconify from '../components/iconify';
import Chart, { useChart } from '../components/chart';

// ----------------------------------------------------------------------

EcommerceWidgetSummary.propTypes = {
  sx: PropTypes.object,
  chart: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  percent: PropTypes.number,
};

const MyChart = ({ chart }) => {
  const { colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    chart: {
      animations: {
        enabled: true,
      },
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      width: 2,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
      marker: {
        show: false,
      },
    },
    ...options,
  });

  return <Chart
    type="line"
    series={[{ data: series }]}
    options={chartOptions}
    width={120}
    height={80}
  />

}

export default function EcommerceWidgetSummary({ title, percent, total, chart, sx, ...other }) {

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" paragraph>
          {title}
        </Typography>

        <Typography variant="h3" gutterBottom>
          {fNumber(total)}
        </Typography>

        {percent !== undefined && <TrendingInfo percent={percent} />}
      </Box>

      {chart !== undefined && <MyChart chart={chart} />}

    </Card>
  );
}

// ----------------------------------------------------------------------

TrendingInfo.propTypes = {
  percent: PropTypes.number,
};

function TrendingInfo({ percent }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mt: 2, mb: 1 }}>
      <Iconify
        icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'}
        sx={{
          mr: 1,
          p: 0.5,
          width: 24,
          height: 24,
          borderRadius: '50%',
          color: 'success.main',
          bgcolor: (theme) => alpha(theme.palette.success.main, 0.16),
          ...(percent < 0 && {
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
          }),
        }}
      />

      <Typography variant="subtitle2" component="div" noWrap>
        {percent >= 0 && '+'}

        {percent === 0 ? '0%' : fPercent(percent)}

        <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
          {' than last week'}
        </Box>
      </Typography>
    </Stack>
  );
}
