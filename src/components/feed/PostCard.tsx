import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageSquare, Share, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: any;
}

export const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: "You",
      content: newComment.trim()
    };
    
    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="p-4 flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>
              {post.author.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3">
          <p className="text-gray-800 leading-relaxed">{post.content}</p>
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="mb-3">
            <img
              src={post.image}
              alt="Post content"
              className="w-full max-h-96 object-cover"
            />
          </div>
        )}

        {/* Like/Comment Count */}
        <div className="px-4 py-2 text-sm text-gray-500">
          {likeCount > 0 && (
            <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
          )}
          {comments.length > 0 && likeCount > 0 && <span> • </span>}
          {comments.length > 0 && (
            <span>{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</span>
          )}
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="px-4 py-2 flex justify-around">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center space-x-2 ${
              liked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            <span>Like</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Comment</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
          >
            <Share className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <>
            <Separator />
            <div className="p-4 space-y-3">
              {/* Existing Comments */}
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {comment.author.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2">
                    <p className="font-semibold text-sm">{comment.author}</p>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>
              ))}

              {/* Add Comment */}
              <form onSubmit={handleComment} className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="sm" disabled={!newComment.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
