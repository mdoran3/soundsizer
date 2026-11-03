
import PostCard from '../components/PostCard'
import { samplePosts } from '../data/posts.js'

function Home() {
    return (
        <main>
            <h2>Community Feed</h2>
            <p>
                Explore Discussions from Music Producers.
            </p>

            <section className="posts-feed">
                { samplePosts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                    />
                ))}
            </section>
        </main>
    )
}

export default Home