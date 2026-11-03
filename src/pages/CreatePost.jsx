
import { useState } from 'react'
import './CreatePost.css'

import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function CreatePost() {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')


  
  const handleSubmit = async (event) => {
    event.preventDefault()
  
    if (isSubmitting) return
  
    // Validate title
    if (title.trim() === '') {
      setSubmitError('Please enter a post title.')
      return
    }
  
    setIsSubmitting(true)
    setSubmitError('')
  
    // Prepare data for the database
    const newPost = {
      title: title.trim(),
      content: content.trim() || null,
      image_url: imageUrl.trim() || null
    }
  
    try {
      const { error } = await supabase
        .from('posts')
        .insert([newPost])
  
      if (error) {
        throw error
      }
  
      // Clear fields after successful insert
      setTitle('')
      setContent('')
      setImageUrl('')
  
      // Return to the Home feed
      navigate('/')
    } catch (error) {
      console.error('Error creating post:', error)
      setSubmitError('Could not create your post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
        {submitError && (
          <p className="submit-error" role="alert">
            {submitError}
          </p>
        )}
        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Publishing...' : 'Create Post'}
        </button>
      </form>
    </main>
  )
}

export default CreatePost
