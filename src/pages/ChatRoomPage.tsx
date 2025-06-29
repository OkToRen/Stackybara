import React, { useEffect, useState, useRef } from "react";
import { backend } from "@/declarations/backend";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/lib/AuthContext";
import { Principal } from "@dfinity/principal";
import { MessageResponse } from "@/declarations/backend/backend.did";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Store, Send, Check } from 'lucide-react';

export default function ChatRoomPage() {
    const auth = useAuthContext();
    const { sellerPrincipal } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [input, setInput] = useState("");
    const [sellerName, setSellerName] = useState<string>("");
    const [sellerAvatar, setSellerAvatar] = useState<string>("");
    const [search, setSearch] = useState("");
    const [sidebarChats, setSidebarChats] = useState<any[]>([]); // [{principal, name, lastMessage, ...}]
    const [loadingSidebar, setLoadingSidebar] = useState(true);
    const [showAddChat, setShowAddChat] = useState(false);
    const [allUsers, setAllUsers] = useState<any[]>([]); // [{principal, name}]
    const [addChatSearch, setAddChatSearch] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch all users and sidebar chat info (name and last message)
    useEffect(() => {
        let isMounted = true;
        async function fetchSidebarChats() {
            if (!auth.principal) return;
            setLoadingSidebar(true);
            try {
                const users = await backend.getAllUsers();
                // Filter out self
                const sellers = users.filter(([principal, user]) => principal.toString() !== auth.principal.toString());
                const results = await Promise.all(
                    sellers.map(async ([principal, user]) => {
                        let name = user.name || principal.toString().slice(0, 8);
                        let lastMessage = "";
                        try {
                            const principalObj = Principal.fromText(principal.toString());
                            // Fetch last message
                            const msgs = await backend.getMessages(auth.principal, principalObj);
                            if (msgs && msgs.length > 0) {
                                const lastMsg = msgs[msgs.length - 1];
                                lastMessage = lastMsg.message.content;
                            }
                        } catch {}
                        return {
                            principal: principal.toString(),
                            name,
                            lastMessage,
                            avatar: "https://randomuser.me/api/portraits/men/32.jpg", // Placeholder
                            order: "ORD-2024-001", // Placeholder
                            time: "", // Placeholder
                            unread: 0, // Placeholder
                            online: true, // Placeholder
                        };
                    })
                );
                if (isMounted) {
                    setSidebarChats(results);
                    setLoadingSidebar(false);
                }
            } catch {
                setSidebarChats([]);
                setLoadingSidebar(false);
            }
        }
        fetchSidebarChats();
        return () => { isMounted = false; };
    }, [auth.principal]);

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

    // Filtered chat list for sidebar search
    const filteredChats = sidebarChats.filter(chat =>
        chat.name.toLowerCase().includes(search.toLowerCase())
    );

    // Fetch all users for add chat modal
    useEffect(() => {
        async function fetchAllUsers() {
            try {
                const users = await backend.getAllUsers();
                // Exclude self
                const filtered = users.filter(([principal, user]) => principal.toString() !== auth.principal?.toString());
                setAllUsers(filtered.map(([principal, user]) => ({ principal: principal.toString(), name: user.name })));
            } catch {
                setAllUsers([]);
            }
        }
        if (showAddChat) fetchAllUsers();
    }, [showAddChat, auth.principal]);

    return (
        <div className="h-[95vh] overflow-auto bg-[#fff8ee] flex">
            {/* Sidebar */}
            <aside className="w-[340px] bg-[#fff6e3] border-r border-amber-200 flex flex-col p-4 rounded-l-2xl">
                <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-amber-900 flex-1">Chats</span>
                    <Button size="sm" className="ml-2 bg-teal-500 text-white px-3 py-1 rounded" onClick={() => setShowAddChat(true)}>+ New Chat</Button>
                </div>
                <Input
                    placeholder="Search conversations..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="mb-4 bg-white border-amber-200 focus:border-teal-400 rounded-full px-4"
                />
                <div className="flex-1 overflow-y-auto pr-2">
                    {loadingSidebar ? (
                        <div className="text-gray-400">Loading chats...</div>
                    ) : filteredChats.length === 0 ? (
                        <div className="text-gray-400">No chats found.</div>
                    ) : filteredChats.map(chat => (
                        <div
                            key={chat.principal}
                            className={`flex items-center gap-3 p-3 rounded-lg mb-2 cursor-pointer transition hover:bg-amber-100 ${sellerPrincipal === chat.principal ? 'bg-amber-50 border-l-4 border-teal-400' : ''}`}
                            onClick={() => navigate(`/chat/${chat.principal}`)}
                        >
                            <div className="relative">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={chat.avatar} alt={chat.name} />
                                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                                </Avatar>
                                {chat.online && <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></span>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-amber-900 truncate">{chat.name}</div>
                                <div className="text-xs text-gray-500 truncate">{chat.lastMessage}</div>
                                <div className="text-xs text-amber-500">Order: {chat.order}</div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-xs text-gray-400">{chat.time}</span>
                                {chat.unread > 0 && <span className="bg-teal-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">{chat.unread}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
            {/* Add Chat Modal */}
            {showAddChat && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-lg font-bold text-amber-900">Start New Chat</div>
                            <Button variant="ghost" onClick={() => setShowAddChat(false)}>✕</Button>
                        </div>
                        <Input
                            placeholder="Search user by name..."
                            value={addChatSearch}
                            onChange={e => setAddChatSearch(e.target.value)}
                            className="mb-4"
                        />
                        <div className="max-h-60 overflow-y-auto">
                            {allUsers.filter(u => u.name.toLowerCase().includes(addChatSearch.toLowerCase())).length === 0 ? (
                                <div className="text-gray-400 text-center">No users found.</div>
                            ) : (
                                allUsers.filter(u => u.name.toLowerCase().includes(addChatSearch.toLowerCase())).map(u => (
                                    <div key={u.principal} className="flex items-center justify-between p-2 hover:bg-amber-100 rounded cursor-pointer">
                                        <span className="font-semibold text-amber-900">{u.name}</span>
                                        <Button size="sm" className="bg-teal-500 text-white" onClick={() => {
                                            setShowAddChat(false);
                                            navigate(`/chat/${u.principal}`);
                                        }}>Chat</Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col h-[90vh] bg-[#fff8ee]</div>">
                {/* Header */}
                <div className="flex items-center gap-4 px-8 py-5 border-b border-amber-200 bg-[#fff6e3] rounded-tr-2xl">
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
                        <div className="font-semibold text-lg text-amber-900">{sellerName ? sellerName : "Chat"}</div>
                        <div className="flex items-center gap-2 text-sm text-green-600">
                            <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                            Online <span className="text-gray-400 ml-2">Usually responds within an hour</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button 
                            variant="outline" 
                            className="border-amber-300 text-amber-700 hover:bg-amber-100" 
                            onClick={() => sellerPrincipal && navigate(`/seller/${sellerPrincipal}`)}
                        >
                            View Store
                        </Button>
                    </div>
                </div>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-12 py-8 space-y-4 bg-[#fff8ee]">
                    {messages.length === 0 && (
                        <div className="text-gray-400 text-center mt-8">No messages yet. Start the conversation!</div>
                    )}
                    {messages.map((msg, idx) => {
                        const isSender = msg.message.sender.toString() === auth.principal?.toString();
                        return (
                            <div key={idx} className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[60%] px-5 py-3 rounded-xl shadow-sm border ${isSender ? 'bg-teal-100 border-teal-200 text-teal-900' : 'bg-white border-amber-200 text-amber-900'}`}
                                    style={{ position: 'relative' }}
                                >
                                    <div className="text-xs font-semibold mb-1 opacity-80 flex items-center gap-1">
                                        {isSender ? "You" : msg.name || msg.message.sender.toString().slice(0,8)}
                                    </div>
                                    <div className="text-base whitespace-pre-line">{msg.message.content}</div>
                                    <div className={`flex items-center gap-1 mt-2 text-xs ${isSender ? 'text-teal-700 justify-end' : 'text-amber-600'}`}
                                        style={{ fontSize: '0.85em' }}
                                    >
                                        <span>{msg.message.timestamp ? new Date(Number(msg.message.timestamp) / 1000000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}</span>
                                        {isSender && <Check className="h-4 w-4 ml-1 text-teal-400" />}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
                {/* Input */}
                <form onSubmit={sendMessage} className="border-t border-amber-200 px-8 py-5 bg-[#fff6e3] rounded-b-2xl">
                    <div className="flex items-center gap-3">
                        <Input
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 border-amber-300 focus:border-teal-400 rounded-full bg-white px-5 py-3 shadow-sm"
                            maxLength={1000}
                        />
                        <Button
                            type="submit"
                            disabled={!input.trim()}
                            className="bg-teal-500 hover:bg-teal-600 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-md"
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
