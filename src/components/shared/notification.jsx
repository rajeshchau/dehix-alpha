'use client';

import React, { useEffect, useState } from 'react';
import {
  Bell,
  Check,
  DollarSign,
  FileText,
  Gavel,
  LaptopMinimal,
  Settings,
  Ticket,
  User,
  UsersRound,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';

import { Avatar } from '../components/ui/avatar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../components/ui/popover';
import { Button } from '../components/ui/button';
import { cn } from '../../lib/utils';
import {
  markAllNotificationsAsRead,
  subscribeToUserNotifications,
} from '../../utils/common/firestoreUtils';

const NotificationButton = () => {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    let unsubscribe;

    if (user?.uid) {
      unsubscribe = subscribeToUserNotifications(user.uid, (data) => {
        setNotifications(data);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  function iconGetter(entity) {
    switch (entity) {
      case 'Account':
        return <User />;
      case 'Settings':
        return <Settings />;
      case 'Document':
        return <FileText />;
      case 'Bid':
        return <Gavel />;
      case 'Interview':
        return <LaptopMinimal />;
      case 'Hire':
        return <UsersRound />;
      case 'Transaction':
        return <DollarSign />;
      case 'Verification':
        return <Check />;
      case 'Ticket':
        return <Ticket />;
      default:
        return <Bell />;
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:scale-105 transition-transform"
        >
          <Bell className="w-6 h-6 relative rounded-full hover:scale-105 transition-transform" />
          {unreadCount > 0 && (
            <span className="absolute top-1 left-9 flex h-4 w-7 items-center justify-center rounded-full bg-red-500 text-white text-xs transform -translate-x-1/2 -translate-y-1/2">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="ml-auto text-xs text-muted-foreground">
              {unreadCount} unread
            </p>
          </div>
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No notifications available.
            </p>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  onClick={() => router.push(notification.path)}
                  key={notification.id}
                  className="rounded py-4 mb-4 items-start cursor-pointer hover:bg-muted hover:opacity-75 transition"
                >
                  <div>
                    {!notification.isRead && (
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    )}
                  </div>
                  <div className="space-y-1 px-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="h-6 w-6 text-white flex items-center justify-center p-1 ring-1 ring-white">
                        {iconGetter(notification.entity)}
                      </Avatar>
                      <p className="text-sm font-medium leading-none">
                        {notification.message}
                      </p>
                    </div>
                    <p className="flex justify-end text-xs text-muted-foreground">
                      {formatDistanceToNow(notification.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {notifications.length > 0 && (
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                markAllNotificationsAsRead(user.uid);
              }}
            >
              <Check className="mr-2 h-4 w-4" /> Mark all as read
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export { NotificationButton };