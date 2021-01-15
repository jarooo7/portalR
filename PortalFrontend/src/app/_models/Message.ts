
export interface Message {
    id: number;
    senderId: number;
    senderUsername: string;
    senderPhotoUrl: string;
    recipientId: number;
    recipientUsername: string;
    recipientPhotoUrl: string;
    senderGender: string;
    recipientGender: string;
    content: string;
    isRead: boolean;
    dateRead: Date;
    dateSent: Date;
    messageContainer: string;
}
export interface SendMsg{
    recipientId: number;
    content: string;
}
