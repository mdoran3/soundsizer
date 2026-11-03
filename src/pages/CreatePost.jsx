
import { useState } from 'react'
import './CreatePost.css'

function CreatePost() {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')


  const handleSubmit = (event) => {
    event.preventDefault()
  
    // Validate the post title
    if (title.trim() === '') {
      alert('Please enter a post title.')
      return
    }
  
    // Construct the new post object
    const newPost = {
      id: crypto.randomUUID(),
      title: title.trim(),
      content: content.trim(),
      image_url: imageUrl.trim(),
      created_at: new Date().toISOString(),
      upvotes: 0
    }
  
    // Temporary: inspect the post in the console
    console.log('New post created:', newPost)
  
    // Clear the form
    setTitle('')
    setContent('')
    setImageUrl('')
  }


  return (
    <main className="create-post-page">
      <div className="create-post-header">
        <h2>Create a Post</h2>
        <p>
          Share your ideas with the SoundSizer community.
        </p>
      </div>

      <form 
        className="create-post-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="title">Post Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Give your discussion a title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            placeholder="What would you like to share?"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows="6"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image_url">Image URL</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button type="submit" className="submit-button">
          Create Post
        </button>
      </form>
    </main>
  )
}

export default CreatePost
