import { Card } from "@/components/ui/card";
import { MessageColumn } from "@/app/(root)/(routes)/messages/components/columns";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { MessageCircle, Mail, User, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface LatestMessagesProps {
  messages: MessageColumn[];
}

export const LatestMessages: React.FC<LatestMessagesProps> = ({ messages }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <MessageCircle className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Son Mesajlar</h2>
      </div>
      <div className="grid gap-3">
        {messages.map((message, index) => (
          <Card 
            key={message.id} 
            className={cn(
              "p-4 hover:shadow-md transition-shadow duration-200",
              index === 0 && "border-l-4 border-l-blue-500"
            )}
          >
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{message.name}</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <p>{format(message.createdAt, "d MMM yyyy HH:mm", { locale: tr })}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <p>{message.email}</p>
              </div>
              <p className="text-sm border-t pt-2 mt-1 line-clamp-2">
                {message.message}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
