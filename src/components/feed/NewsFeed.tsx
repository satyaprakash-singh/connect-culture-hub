
import { CreatePost } from "./CreatePost";
import { PostCard } from "./PostCard";

interface NewsFeedProps {
  posts: any[];
  onAddPost: (post: any) => void;
  currentUser: any;
}

export const NewsFeed = ({ posts, onAddPost, currentUser }: NewsFeedProps) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <CreatePost onAddPost={onAddPost} currentUser={currentUser} />
      
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts yet. Create your first post!</p>
        </div>
      )}
    </div>
  );
};
