import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getRandomAvatar } from "utils/getRandomAvatar";

export default function GroupCard({key, group}) {

  const {users} = useSelector((state) => state.users);
  const leader = users.find((user) => user.email === group.leader);
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => {
        navigate(`/groups/group-details?groupId=${group._id}`)
      }}
      style={{textDecoration: 'none', color: 'inherit'}}>
      <div
        style={{
          border: '1px solid',
          borderColor: 'rgba(207, 219, 213, 0.6)',
          borderRadius: 20,
          marginBottom: 20,
          width: '100%'
        }}
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
            <img src={leader ? (leader.avatar || getRandomAvatar(leader.name)) : ""}
                 alt="post image"
                 style={{
                   width: 70,
                   height: 70,
                   objectFit: 'cover',
                   objectPosition: 'center',
                   borderRadius: 12
                 }}/>
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
              {group.name}
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
                <span style={{marginLeft: 10}}></span>
                {new Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric'
                }).format(group.created ? new Date(group.created) : Date.now())}
              </div>

            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}