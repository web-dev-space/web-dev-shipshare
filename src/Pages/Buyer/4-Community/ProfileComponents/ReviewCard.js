import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ReviewCard({
    title,
    post,
    author,
    date,
    image,
    comments = [],
    viewsNumber,
    onPostCardClick }) {

    const [isPhoneScreen, setIsPhoneScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsPhoneScreen(window.innerWidth < 480);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={{
            border: '1px solid',
            borderColor: 'rgba(207, 219, 213, 0.6)',
            borderRadius: 20,
            padding: 16,
        }}
            onClick={onPostCardClick}
        >
            <div style={{
                display: "flex",
                flexDirection: "row",
                paddingRight: 20,
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: isPhoneScreen ? 6 : 16,
                }}>
                    <img src={image ?
                        image :
                        require('images/placeholder.png')}

                        alt="post image"
                        style={{
                            width: 72,
                            height: 72,
                            objectFit: 'cover',
                            objectPosition: 'center',
                            borderRadius: 12
                        }} />
                </div>
                <div style={{
                    flex: 1,
                    height: 'fit-content',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                }}>
                    <Typography variant={isPhoneScreen ? "body2" : "subtitle2"} component="div" style={{ fontWeight: isPhoneScreen ? '600' : 'regular', fontSize: isPhoneScreen && 13, }}>
                        {title}
                    </Typography>
                    <Typography variant={isPhoneScreen ? "caption" : "body1"} style={{
                        color: '#5d5d5b',
                        marginTop: isPhoneScreen ? 0 : 4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {post}
                    </Typography>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 4,
                    }}>
                        {/* <Typography variant="body2" style={{
                            color: 'primary',
                            fontWeight: 600,
                            marginTop: 4,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            textOverflow: 'ellipsis',
                            fontSize: isPhoneScreen && 12,
                        }}>
                            {author}
                        </Typography> */}
                        <Typography variant="caption" style={{
                            color: '#5d5d5b',
                            marginTop: 4,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: isPhoneScreen && 10,
                        }}>
                            {/* <span style={{ marginLeft: isPhoneScreen?4:10,marginRight: isPhoneScreen?4:10}}>·</span> */}
                            {new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(date))}
                        </Typography>
                        {/* <div style={{
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
                                    sx={{ fontSize: isPhoneScreen?12:14 }}
                                    style={{marginRight: isPhoneScreen?4:8}}/>
                                <div style={{ fontSize: isPhoneScreen?10:12}}>
                                    {comments && comments.length > 1000 ?
                                        (comments.length / 1000) + 'k' : comments.length}
                                </div>
                            </div>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                marginLeft: isPhoneScreen?6:16
                            }}>
                                <VisibilityIcon sx={{ fontSize: isPhoneScreen?12:14 }} style={{marginRight: isPhoneScreen?4:8}}/>
                                <div style={{ fontSize: isPhoneScreen?10:12, marginRight: 2}}>
                                    {viewsNumber > 1000 ?
                                        (viewsNumber / 1000) + 'k' : viewsNumber}
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}