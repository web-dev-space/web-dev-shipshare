import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MessageIcon from '@mui/icons-material/Message';

export default function GroupCard({key, group})  {

	return(
		<Link to="./post"
					style={{textDecoration: 'none', color: 'inherit'}}>
			<div style={{
				border: '1px solid',
				borderColor: 'rgba(207, 219, 213, 0.6)',
				borderRadius:20,
				marginBottom: 20,
				width: '100%'}}
			>
				<div style={{
					display: "flex",
					flexDirection: "row",
					paddingRight: 40,
				}}>
					<div style={{
						display: 'flex',
						alignItems: 'center',
						padding: 16,
					}}>
						<img src={group.avatar}
								 alt="post image"
								 style={{
									 width: 70,
									 height: 70,
									 objectFit: 'fill',
									 objectPosition: 'center',
									 borderRadius: 12}}/>
					</div>
					<div style={{
						flex: 1,
						height: 'fit-content',
						marginTop: 'auto',
						marginBottom: 'auto',
					}}>
						<div style={{
							fontSize: 16,
							fontWeight: 'bolder'
						}}>
							{group.groupName}
						</div>

						<div style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							marginTop: 4,
						}}>
							<div style={{
								fontSize: 14,
								color: '#929191'
							}}>
								Formed on
								<span style={{ marginLeft: 10}}></span>
								{new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(group.date))}
							</div>

						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}