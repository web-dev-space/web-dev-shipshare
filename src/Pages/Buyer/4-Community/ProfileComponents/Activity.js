import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Typography from '@mui/material/Typography';

export default function Activity() {
	const activities = [
		{
			id: 1,
			date: 'Mar 13 2023',
			content: 'Joined the group',
		},
		{
			id: 2,
			date: "Mar 13 2023",
			content: 'Created a new project',
		},
		{
			id: 3,
			date: 'Mar 13 2023',
			content: 'Added a new task',
		},
		{
			id: 4,
			date: 'Mar 13 2023',
			content: 'Added a new task',
		},]
	return (
		<Timeline align="alternate" style={{marginLeft:-400}}>
			{activities.map((activity, index) => (
				<TimelineItem key={activity.id}>
					<TimelineSeparator>
						<TimelineDot color='primary' />
						{/* No TimelineConnector if it is the last item */}
						{index !== activities.length - 1 && <TimelineConnector />}
					</TimelineSeparator>
					<TimelineContent style={{ display: 'flex'}} >
						<Typography variant="subtitle2" color="textSecondary" style={{marginRight:10}}>{activity.date}</Typography>
						<Typography variant="body1">{activity.content}</Typography>
					</TimelineContent>
				</TimelineItem>
			))}
		</Timeline>
	);
}