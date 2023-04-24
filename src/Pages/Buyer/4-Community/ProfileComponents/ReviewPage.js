import { Pagination } from "@mui/lab";
import ReviewCard from "Pages/Buyer/4-Community/ProfileComponents/ReviewCard";
import React, { useMemo } from "react";

const MAX_REVIEWS_PER_PAGE = 10;

const ReviewPage = ({ reviews, visibleProfile, onReviewCardClick }) => {
    const [page, setPage] = React.useState(1);

    const visibleReviews = useMemo(() => {
        return reviews.slice(
            (page - 1) * MAX_REVIEWS_PER_PAGE,
            page * MAX_REVIEWS_PER_PAGE
        )
    }, [reviews]);

    if (!reviews) return null;

    return <div>
        {visibleReviews
            .map(post =>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: 16,
                    width: '90%'
                }}>
                    <ReviewCard
                        title={post.title}
                        post={post.post}
                        author={visibleProfile?.name}
                        date={post.created}
                        image={post.image}
                        comments={post.comments}
                        viewsNumber={post.viewsAmount}
                        repostsNumber={post.repostsNumber}
                        onPostCardClick={() => onReviewCardClick(post.asin)}
                    />

                </div>
            )
        }

        {/* Pagination */}
        <div div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
        }}>
            <Pagination count={Math.ceil((visibleReviews || []).length / MAX_REVIEWS_PER_PAGE)}
                onChange={(event, page) => setPage(page)} />
        </div>
    </div>
};

export default ReviewPage;
