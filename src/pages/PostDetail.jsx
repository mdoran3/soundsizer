
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './PostDetail.css'

function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isUpvoting, setIsUpvoting] = useState(false)

  const [comments, setComments] = useState([])
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [commentsError, setCommentsError] = useState(null)

  const [newComment, setNewComment] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [commentSubmitError, setCommentSubmitError] = useState('')


  useEffect(() => {
    let active = true
  
    const fetchPost = async () => {
      setLoading(true)
      setError(null)
      setPost(null)
  
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()
  
      if (!active) return
  
      if (fetchError) {
        console.error('Error fetching post:', fetchError)
        setError('Unable to load this post.')
      } else {
        setPost(data)
      }
  
      setLoading(false)
    }
  
    fetchPost()
  
    return () => {
      active = false
    }
  }, [id])


  useEffect(() => {
    let active = true

    const fetchComments = async () => {
      setCommentsLoading(true)
      setCommentsError(null)
      setComments([])

      const { data, error: fetchError } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: true })

      if (!active) return

      if (fetchError) {
        console.error('Error fetching comments:', fetchError)
        setCommentsError('Unable to load comments.')
      } else {
        setComments(data)
      }

      setCommentsLoading(false)
    }

    fetchComments()

    return () => {
      active = false
    }
  }, [id])


    
  
  const handleUpvote = async () => {
    if (isUpvoting) return

    setIsUpvoting(true)

    try {
      const { data, error: upvoteError } = await supabase
        .rpc('upvote_post', { post_id: id })

      if (upvoteError) throw upvoteError

      setPost((currentPost) => {
        if (!currentPost || currentPost.id !== id) {
          return currentPost
        }

        return {
          ...currentPost,
          upvotes: data
        }
      })
    } catch (error) {
      console.error('Error upvoting post:', error)
    } finally {
      setIsUpvoting(false)
    }
  }


  const handleCommentSubmit = async (event) => {
    event.preventDefault()

    if (isSubmittingComment) return

    const content = newComment.trim()

    if (!content) {
      setCommentSubmitError('Please enter a comment.')
      return
    }

    setIsSubmittingComment(true)
    setCommentSubmitError('')

    try {
      const { data, error: insertError } = await supabase
        .from('comments')
        .insert([
          {
            post_id: id,
            content: content
          }
        ])
        .select()
        .single()

      if (insertError) throw insertError

      setComments((currentComments) => [
        ...currentComments,
        data
      ])

      setNewComment('')
    } catch (error) {
      console.error('Error submitting comment:', error)
      setCommentSubmitError('Could not post your comment. Please try again.')
    } finally {
      setIsSubmittingComment(false)
    }
  }


  if (loading) {
    return (
      <main>
        <p>Loading post...</p>
      </main>
    )
  }
  if (error) {
    return (
      <main>
        <p>{error}</p>
      </main>
    )
  }
  if (!post) {
    return (
      <main>
        <p>Post not found.</p>
      </main>
    )
  }
  
  return (
    <main className="post-detail-page">
      <Link to="/" className="back-link">
        ← Back to discussions
      </Link>

      <article className="post-detail-card">
        <div className="post-detail-meta">
          <span className="post-detail-category">
            {post.category}
          </span>

          <span className="post-detail-date">
            {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>

        <h2 className="post-detail-title">
          {post.title}
        </h2>

        {post.content && (
          <p className="post-detail-content">
            {post.content}
          </p>
        )}

        {post.image_url && (
          <img
            src={post.image_url}
            alt="Post attachment"
            className="post-detail-image"
          />
        )}

        <div className="post-detail-footer">
          <button
            type="button"
            className="upvote-button"
            onClick={handleUpvote}
            disabled={isUpvoting}
          >
            ▲ {isUpvoting ? 'Upvoting...' : 'Upvote'}
          </button>

          <span>{post.upvotes} upvotes</span>
        </div>
      </article>
      <section className="comments-section">
        <h3>Comments ({comments.length})</h3>

        {commentsLoading ? (
          <p>Loading comments...</p>
        ) : commentsError ? (
          <p>{commentsError}</p>
        ) : comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <div className="comments-list">
            {comments.map((comment) => (
              <div className="comment-card" key={comment.id}>
                <p className="comment-content">
                  {comment.content}
                </p>
            
                <span className="comment-date">
                  {new Date(comment.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}

        <form
          className="comment-form"
          onSubmit={handleCommentSubmit}
        >
          <label htmlFor="new-comment">
            Add a comment
          </label>

          <textarea
            id="new-comment"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            required
          />

          {commentSubmitError && (
            <p className="comment-submit-error">
              {commentSubmitError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmittingComment}
          >
            {isSubmittingComment ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </section>

    </main>
  )
}

export default PostDetail
