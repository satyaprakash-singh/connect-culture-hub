
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserPlus, MessageSquare } from "lucide-react";

interface FriendsProps {
  friends: any[];
}

export const Friends = ({ friends }: FriendsProps) => {
  const onlineFriends = friends.filter(f => f.status === 'online');
  const offlineFriends = friends.filter(f => f.status === 'offline');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Friends</h1>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Find Friends
        </Button>
      </div>

      {/* Friend Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Friend Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            No pending friend requests
          </div>
        </CardContent>
      </Card>

      {/* Online Friends */}
      {onlineFriends.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Online Friends</span>
              <Badge variant="secondary">{onlineFriends.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {onlineFriends.map((friend) => (
                <div key={friend.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>
                        {friend.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium">{friend.name}</h3>
                    <p className="text-sm text-green-600">Online</p>
                  </div>
                  
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Friends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>All Friends</span>
            <Badge variant="secondary">{friends.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {friends.map((friend) => (
              <div key={friend.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback>
                      {friend.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {friend.status === 'online' && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium">{friend.name}</h3>
                  <p className={`text-sm ${friend.status === 'online' ? 'text-green-600' : 'text-gray-500'}`}>
                    {friend.status === 'online' ? 'Online' : 'Offline'}
                  </p>
                </div>
                
                <Button size="sm" variant="outline">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
