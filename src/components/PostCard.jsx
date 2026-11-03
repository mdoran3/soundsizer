
import './PostCard.css'
import { Link } from 'react-router-dom'

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

      <Link to={`/posts/${post.id}`} className="post-link">
        <h3 className="post-title">{post.title}</h3>
      </Link>

      <div className="post-upvotes">
        <span>▲</span>
        <span>{post.upvotes} upvotes</span>
      </div>
    </article>
  )
}

export default PostCard
