import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RouteCard = ({index, route, price, text1, text2, trait1, trait2, trait3}) => {
  const navigate = useNavigate();

  return (
    <Card key={index} sx={{maxWidth: 300, mr:3, mb:3, height: 400}}>
      <CardContent sx={{display: 'flex', flexDirection: 'column'}}>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
            <Typography variant="h3" component="h2">{price}</Typography>
            <Typography sx={{color: 'rgba(4, 4, 4, 0.5)', ml: 1, mt:2}}>/kg</Typography>
          </div>
          <Typography style={{ fontSize: 28, marginBottom:10 }}>{route}</Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <Typography variant="body2" color="text.secondary">
            {text1}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text2}
          </Typography>

          {/*----break----*/}
          <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', margin: '20px 0' }}></div>

          <div style={{display:'flex', flexDirection: 'row', marginBottom: 8}}>
            <CheckCircleIcon style={{ color: 'rgba(253, 189, 107, 0.87)', marginRight:10 }} />
            <Typography variant="body2" color="rgba(54, 54, 54, 1)">
              {trait1}
            </Typography>
          </div>

          <div style={{display:'flex', flexDirection: 'row', marginBottom: 8}}>
            <CheckCircleIcon style={{ color: 'rgba(253, 189, 107, 0.87)', marginRight:10 }} />
            <Typography variant="body2" color="rgba(54, 54, 54, 1)">
              {trait2}
            </Typography>
          </div>

          {trait3 !==  '' &&
            <div style={{display:'flex', flexDirection: 'row', marginBottom: 8}}>
              <CheckCircleIcon style={{ color: 'rgba(253, 189, 107, 0.87)', marginRight:10 }} />
              <Typography variant="body2" color="rgba(54, 54, 54, 1)">
                {trait3}
              </Typography>
            </div>
          }
        </div>
      </CardContent>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem:"center", position: 'absolute', bottom: 20, width: '100%'}}>
        <Button variant="outlined" onClick={()=>navigate('/groups')} sx={{mt: '1rem',  padding: 1, width: '80%'}}>Get Started</Button>
      </div>
    </Card>
  );
};

export default RouteCard;