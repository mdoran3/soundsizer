
import './PostCard.css'

function PostCard({ post }) {
  const formattedDate = new Date(
    post.created_at
  ).toLocaleDateString()

  return (
    <article className="post-card">
      <div className="post-card-header">
        <span className="post-category">
          {post.category}
        </span>

        <span className="post-date">
          {formattedDate}
        </span>
      </div>

      <h3 className="post-title">
        {post.title}
      </h3>

      <div className="post-upvotes">
        <span>▲</span>
        <span>{post.upvotes} upvotes</span>
      </div>
    </article>
  )
}

export default PostCard
