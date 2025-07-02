
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageSquare, UserPlus, Share } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NotificationsProps {
  notifications: any[];
}

export const Notifications = ({ notifications }: NotificationsProps) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'comment':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'friend_request':
        return <UserPlus className="h-5 w-5 text-green-500" />;
      case 'share':
        return <Share className="h-5 w-5 text-purple-500" />;
      default:
        return <Heart className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Notifications</CardTitle>
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                    
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Heart className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-gray-500">No notifications yet</p>
              <p className="text-sm text-gray-400 mt-1">
                When people interact with your posts, you'll see it here
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
