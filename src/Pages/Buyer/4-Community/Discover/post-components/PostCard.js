import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MessageIcon from '@mui/icons-material/Message';

export default function PostCard({
    title,
    post,
    author,
    date,
    image,
    commentsNumber,
    viewsNumber})  {

    return(
    <Link to="./post"
        style={{textDecoration: 'none', color: 'inherit'}}>
        <div style={{
                border: '1px solid',
                borderColor: 'rgba(207, 219, 213, 0.6)',
                borderRadius:20}}
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
                    <img src={image}
                         alt="post image"
                         style={{
                             width: 90,
                             height: 90,
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
                        {title}
                    </div>
                    <div style={{
                        fontSize: 14,
                        color: '#5d5d5b',
                        marginTop: 4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>
                        {post}
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 4,
                    }}>
                        <div style={{
                            fontSize: 14,
                            fontWeight: 600
                        }}>
                            {author}
                        </div>
                        <div style={{
                            fontSize: 14,
                            color: '#929191'
                        }}>
                            <span style={{ marginLeft: 10,marginRight: 10}}>·</span>
                            {new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(date))}
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: "auto",
                            color: "rgb(144, 158, 171)"
                        }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center"}}>
                                <MessageIcon
                                    sx={{ fontSize: 14 }}
                                    style={{marginRight: 8}}/>
                                <div style={{ fontSize: 12}}>
                                    {commentsNumber > 1000 ?
                                        (commentsNumber / 1000) + 'k' : commentsNumber}
                                </div>
                            </div>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                marginLeft: 16
                            }}>
                                <VisibilityIcon sx={{ fontSize: 14 }} style={{marginRight: 8}}/>
                                <div style={{ fontSize: 12, marginRight: 2}}>
                                    {viewsNumber > 1000 ?
                                        (viewsNumber / 1000) + 'k' : viewsNumber}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Link>
    )
}