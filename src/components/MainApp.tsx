
import { useState, useEffect } from "react";
import { Header } from "./layout/Header";
import { Sidebar } from "./layout/Sidebar";
import { NewsFeed } from "./feed/NewsFeed";
import { Profile } from "./profile/Profile";
import { Friends } from "./friends/Friends";
import { Notifications } from "./notifications/Notifications";

interface MainAppProps {
  currentUser: any;
  onLogout: () => void;
}

export const MainApp = ({ currentUser, onLogout }: MainAppProps) => {
  const [activeTab, setActiveTab] = useState("feed");
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Initialize with some sample data
    const samplePosts = [
      {
        id: 1,
        author: {
          name: "John Doe",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        },
        content: "Just had an amazing day at the beach! 🏖️",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 15,
        comments: [
          { id: 1, author: "Jane Smith", content: "Looks amazing!" }
        ]
      },
      {
        id: 2,
        author: {
          name: "Sarah Wilson",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        },
        content: "Working on some new coding projects. React is so powerful! 💻",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        likes: 8,
        comments: []
      }
    ];
    setPosts(samplePosts);

    const sampleFriends = [
      { id: 1, name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", status: "online" },
      { id: 2, name: "Sarah Wilson", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face", status: "offline" }
    ];
    setFriends(sampleFriends);

    const sampleNotifications = [
      { id: 1, type: "like", message: "John Doe liked your post", timestamp: new Date(Date.now() - 30 * 60 * 1000) },
      { id: 2, type: "comment", message: "Sarah Wilson commented on your post", timestamp: new Date(Date.now() - 60 * 60 * 1000) }
    ];
    setNotifications(sampleNotifications);
  }, []);

  const addPost = (newPost) => {
    const post = {
      id: Date.now(),
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar
      },
      content: newPost.content,
      image: newPost.image,
      timestamp: new Date(),
      likes: 0,
      comments: []
    };
    setPosts([post, ...posts]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "feed":
        return <NewsFeed posts={posts} onAddPost={addPost} currentUser={currentUser} />;
      case "profile":
        return <Profile user={currentUser} posts={posts.filter(p => p.author.name === currentUser.name)} />;
      case "friends":
        return <Friends friends={friends} />;
      case "notifications":
        return <Notifications notifications={notifications} />;
      default:
        return <NewsFeed posts={posts} onAddPost={addPost} currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentUser={currentUser} 
        onLogout={onLogout}
        notificationCount={notifications.length}
      />
      
      <div className="flex max-w-7xl mx-auto">
        <Sidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="hidden md:block"
        />
        
        <main className="flex-1 p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
