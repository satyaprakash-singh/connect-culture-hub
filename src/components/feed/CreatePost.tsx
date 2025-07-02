
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreatePostProps {
  onAddPost: (post: any) => void;
  currentUser: any;
}

export const CreatePost = ({ onAddPost, currentUser }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsPosting(true);
    
    // Simulate posting delay
    setTimeout(() => {
      onAddPost({
        content: content.trim(),
        image: null // For now, we're not handling image uploads
      });
      
      setContent("");
      setIsPosting(false);
      
      toast({
        title: "Post created!",
        description: "Your post has been shared successfully.",
      });
    }, 500);
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Avatar>
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>
              {currentUser.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-3">
              <Textarea
                placeholder={`What's on your mind, ${currentUser.name}?`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border-none resize-none focus:ring-0 text-lg"
                rows={3}
              />
              
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Image className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                
                <Button
                  type="submit"
                  disabled={!content.trim() || isPosting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isPosting ? "Posting..." : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Post
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
