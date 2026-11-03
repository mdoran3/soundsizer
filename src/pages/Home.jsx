
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import PostCard from '../components/PostCard'

function Home() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
      const fetchPosts = async () => {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching posts:', error)
        } else {
          setPosts(data)
        }
      }

      fetchPosts()
    }, [])

    return (
        <main>
            <h2>Community Feed</h2>
            <p>
                Explore Discussions from Music Producers.
            </p>

            <section className="posts-feed">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
            </section>
        </main>
    )
}

export default Home