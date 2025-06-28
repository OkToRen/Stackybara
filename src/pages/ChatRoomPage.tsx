import React, { useEffect, useState, useRef } from "react";
import { backend } from "@/declarations/backend";
import { useParams } from "react-router-dom";
import { useAuthContext } from "@/lib/AuthContext";
import { Principal } from "@dfinity/principal";
import { MessageResponse } from "@/declarations/backend/backend.did";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Store, Send } from 'lucide-react';

export default function ChatRoomPage() {
    const auth = useAuthContext();
    const { sellerPrincipal } = useParams();
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [input, setInput] = useState("");
    const [sellerName, setSellerName] = useState<string>("");
    const [sellerAvatar, setSellerAvatar] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sellerPrincipal) return;
        const fetchSellerName = async () => {
            try {
                const principalObj = Principal.fromText(sellerPrincipal);
                const user = await backend.getUserByPrincipal(principalObj);
                setSellerName(user && user.length > 0 && user[0]?.name ? user[0].name : "Seller");
            } catch {
                setSellerName("Seller");
            }
        };
        fetchSellerName();
    }, [sellerPrincipal]);

    useEffect(() => {
        if (!sellerPrincipal || !auth.principal) return;
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [sellerPrincipal, auth.principal]);


    const fetchMessages = async () => {
        if (!sellerPrincipal || !auth.principal) return;
        try {
            const userPrincipalObj = auth.principal;
            const sellerPrincipalObj = Principal.fromText(sellerPrincipal);
            const msgs = await backend.getMessages(userPrincipalObj, sellerPrincipalObj);
            setMessages(msgs);
        } catch (e) {
            setMessages([]);
        }
    };

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !sellerPrincipal || !auth.principal) return;
        const userPrincipalObj = auth.principal;
        const sellerPrincipalObj = Principal.fromText(sellerPrincipal);
        await backend.sendMessage(userPrincipalObj, sellerPrincipalObj, input);
        setInput("");
        fetchMessages();
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
            <div className="w-full max-w-2xl mx-auto h-[80vh] flex flex-col rounded-xl shadow-lg bg-white border border-amber-200">
                {/* Header */}
                <div className="flex items-center gap-4 px-6 py-4 border-b border-amber-200 bg-gray-50">
                    <div className="relative">
                        <Avatar className="h-12 w-12">
                            {sellerAvatar ? (
                                <AvatarImage src={sellerAvatar} alt={sellerName} />
                            ) : (
                                <AvatarFallback>
                                    <Store className="h-6 w-6 text-teal-500" />
                                </AvatarFallback>
                            )}
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                        <div className="font-semibold text-lg text-amber-900">{sellerName ? `Chat with ${sellerName}` : "Chat"}</div>
                        <div className="flex items-center gap-2 text-sm text-green-600">
                            <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                            Online <span className="text-gray-400 ml-2">Usually responds within an hour</span>
                        </div>
                    </div>
                </div>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.length === 0 && (
                        <div className="text-gray-400 text-center mt-8">No messages yet. Start the conversation!</div>
                    )}
                    {messages.map((msg, idx) => {
                        const isSender = msg.message.sender.toString() === auth.principal?.toString();
                        return (
                            <div key={idx} className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isSender ? 'bg-teal-500 text-white' : 'bg-white border border-amber-200 text-amber-900'}`}>
                                    <div className="text-xs font-semibold mb-1 opacity-80">{isSender ? "You" : msg.name || msg.message.sender.toString().slice(0,8)}</div>
                                    <div className="text-base">{msg.message.content}</div>
                                    <div className={`flex items-center justify-between mt-1 ${isSender ? 'text-teal-100' : 'text-amber-600'}`}>
                                        <span className="text-xs">{msg.message.timestamp ? new Date(Number(msg.message.timestamp) / 1000000).toLocaleString() : ""}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
                {/* Input */}
                <form onSubmit={sendMessage} className="border-t border-amber-200 p-4 bg-white">
                    <div className="flex items-center space-x-2">
                        <Input
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 border-amber-300 focus:border-teal-400"
                            maxLength={1000}
                        />
                        <Button
                            type="submit"
                            disabled={!input.trim()}
                            className="bg-teal-500 hover:bg-teal-600 text-white"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
