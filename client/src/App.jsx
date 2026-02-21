import React, { useState, useEffect, useRef } from 'react';
import {
    Home, Compass, Map as MapIcon, Heart, Sparkles, Palette, Utensils, MapPin, Landmark, TreePine,
    MessageCircle, X, Send, Loader2, Calendar, Tag, ArrowRight, Search, Star,
    Navigation, Car, Clock, ChevronRight, User, ChevronLeft, Share2, IndianRupee,
    Check, MessageSquare, Users, BarChart3, LogOut, Shield, Inbox, Handshake,
    TrendingUp, Settings, Bell, Lock, Globe, Database, ExternalLink, Download,
    Trash2, RefreshCcw, Eye, EyeOff, Mail, Phone, HelpCircle, Info, Moon, FileText
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';l
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE CLIENT ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not configured. Check your .env file.');
}

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;


export const BottomNavItem = ({ icon: _Icon, label, active, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200 ${active ? 'text-mysore-700 scale-110' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}
        >
            <_Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold">{label}</span>
            {active && <div className="w-1 h-1 bg-mysore-600 rounded-full absolute bottom-2"></div>}
        </button>
    );
};

export const BottomNav = ({ activeTab, setActiveTab }) => {
    return (
        <div className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-t border-white/20 dark:border-gray-800 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] h-24 pb-6 md:pb-2 z-50 shrink-0 transition-colors duration-200 rounded-t-[2rem]">
            <div className="flex justify-around items-center h-full px-2">
                <BottomNavItem
                    icon={Home}
                    label="Home"
                    active={activeTab === 'home'}
                    onClick={() => setActiveTab('home')}
                />
                <BottomNavItem
                    icon={Compass}
                    label="Explore"
                    active={activeTab === 'explore'}
                    onClick={() => setActiveTab('explore')}
                />
                <BottomNavItem
                    icon={MapIcon}
                    label="Map"
                    active={activeTab === 'map'}
                    onClick={() => setActiveTab('map')}
                />
                <BottomNavItem
                    icon={Heart}
                    label="Saved"
                    active={activeTab === 'saved'}
                    onClick={() => setActiveTab('saved')}
                />

            </div>
        </div>
    );
};


export const CategoryItem = ({ icon: _Icon, label, color, bgColor }) => (
    <div className="flex flex-col items-center gap-3 min-w-[80px] group cursor-pointer">
        <div className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}>
            <_Icon className={`w-7 h-7 ${color}`} />
        </div>
        <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 text-center tracking-tight group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{label}</span>
    </div>
);

export const Categories = ({ onSeeAllClick }) => {
    const categories = [
        { icon: Sparkles, label: "Hidden Gems", color: "text-mysore-600 dark:text-mysore-400", bgColor: "bg-mysore-100 dark:bg-mysore-900/20" },
        { icon: Palette, label: "Artisans", color: "text-rose-600 dark:text-rose-400", bgColor: "bg-rose-50 dark:bg-rose-900/20" },
        { icon: Utensils, label: "Food", color: "text-emerald-600 dark:text-emerald-400", bgColor: "bg-emerald-50 dark:bg-emerald-900/20" },
        { icon: MapPin, label: "Near You", color: "text-purple-600 dark:text-purple-400", bgColor: "bg-purple-50 dark:bg-purple-900/20" },
        { icon: Landmark, label: "Heritage", color: "text-amber-700 dark:text-amber-500", bgColor: "bg-amber-100 dark:bg-amber-900/30" },
        { icon: TreePine, label: "Nature", color: "text-green-600 dark:text-green-400", bgColor: "bg-green-50 dark:bg-green-900/20" },
    ];

    return (
        <div className="py-6 transition-colors duration-200">
            <div className="flex justify-between items-center px-6 mb-4">
                <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Browse Categories</h3>
                <button
                    onClick={onSeeAllClick}
                    className="text-mysore-700 text-xs font-bold hover:text-mysore-800 dark:hover:text-mysore-300 uppercase tracking-widest px-3 py-1 bg-mysore-100 dark:bg-mysore-900/30 rounded-full transition-colors"
                >
                    View All
                </button>
            </div>

            <div className="flex overflow-x-auto gap-4 px-6 pb-4 custom-scrollbar snap-x md:grid md:grid-cols-6 md:px-0 md:justify-items-center md:pb-0 md:overflow-visible md:gap-8">
                {categories.map((cat, index) => (
                    <CategoryItem key={index} {...cat} />
                ))}
            </div>
        </div>
    );
};


export const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hello! I\'m your Mysuru travel assistant. Ask me anything about places to visit, local culture, food recommendations, or travel tips!'
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = inputMessage.trim();
        setInputMessage('');

        // Add user message to chat
        const newMessages = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            // Call our secure backend API instead of OpenAI directly
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: newMessages
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Chat API Error:', errorData);
                throw new Error(errorData.error || 'Failed to get response from ChatGPT');
            }

            const data = await response.json();
            const assistantMessage = data.message;

            setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
        } catch (error) {
            console.error('ChatGPT Error:', error);

            // More detailed error message
            let errorMessage = 'Sorry, I encountered an error. ';

            if (error.message.includes('Incorrect API key')) {
                errorMessage += 'Your OpenAI API key appears to be invalid. Please check your .env file.';
            } else if (error.message.includes('quota')) {
                errorMessage += 'You have exceeded your OpenAI API quota. Please check your billing settings.';
            } else if (error.message.includes('rate_limit')) {
                errorMessage += 'Rate limit exceeded. Please wait a moment and try again.';
            } else {
                errorMessage += `Error: ${error.message}. Please make sure your OpenAI API key is configured correctly in the .env file.`;
            }

            setMessages([
                ...newMessages,
                {
                    role: 'assistant',
                    content: errorMessage
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-[9999] w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
                    aria-label="Open chat"
                >
                    <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-[9999] w-[380px] h-[600px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 animate-in slide-in-from-bottom-4 duration-300">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] p-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">Mysuru Assistant</h3>
                                <p className="text-white/80 text-[10px]">Powered by ChatGPT</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                        ? 'bg-[#D4AF37] text-white'
                                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600'
                                        }`}
                                >
                                    <p
                                        className="text-sm leading-relaxed whitespace-pre-wrap"
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(message.content, {
                                                ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br'],
                                                ALLOWED_ATTR: []
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-3">
                                    <Loader2 className="w-5 h-5 text-[#D4AF37] animate-spin" />
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-end gap-2">
                            <textarea
                                ref={inputRef}
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about Mysuru..."
                                className="flex-1 resize-none bg-gray-100 dark:bg-gray-800 border-none rounded-2xl px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 max-h-24"
                                rows="1"
                                disabled={isLoading}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!inputMessage.trim() || isLoading}
                                className="w-10 h-10 bg-[#D4AF37] hover:bg-[#B8941F] disabled:bg-gray-300 dark:disabled:bg-gray-700 rounded-full flex items-center justify-center transition-colors disabled:cursor-not-allowed"
                            >
                                <Send className="w-5 h-5 text-white" />
                            </button>
                        </div>
                        <p className="text-[9px] text-gray-400 mt-2 text-center">
                            AI responses may vary. Always verify travel information.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};


export const EventCard = ({ event }) => (
    <div className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group cursor-pointer">
        <div className="relative h-40 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
                src={event.image || `https://images.unsplash.com/photo-1590740608759-6799516ca4d0?auto=format&fit=crop&q=80&w=400`}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 bg-[#D4AF37] text-black text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg">
                    {event.event_type || event.type}
                </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-20">
                <h4 className="text-white font-serif text-lg leading-tight line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                    {event.title}
                </h4>
            </div>
        </div>
        <div className="p-5 space-y-4">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-[#D4AF37]" />
                    <span>{new Date(event.event_date || event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Tag size={14} className="text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">{event.price || 'Free'}</span>
                </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {event.description}
            </p>

            <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">
                    <MapPin size={14} />
                    <span className="truncate max-w-[120px]">{event.spot_name}</span>
                </div>
                <button className="p-2 bg-gray-50 dark:bg-gray-700 rounded-xl group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                    <ArrowRight size={14} />
                </button>
            </div>
        </div>
    </div>
);

export const EventsSection = ({ events = [] }) => {
    if (events.length === 0) return null;

    return (
        <div className="py-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex justify-between items-center px-5 mb-6">
                <div>
                    <h3 className="text-2xl font-serif text-gray-900 dark:text-white">Upcoming Events</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mt-1">Heritage festivals & workshops</p>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#D4AF37] transition-colors">
                    View All
                </button>
            </div>

            <div className="flex space-x-5 overflow-x-auto px-5 pb-6 custom-scrollbar scroll-smooth">
                {events.map((event, index) => (
                    <EventCard key={event.id || index} event={event} />
                ))}
            </div>
        </div>
    );
};


export const Explore = ({ places, onCardClick, savedPlaceIds = [], onToggleSave }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPlaces = places.filter(place =>
        place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="pb-20">
            <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 px-4 py-3 border-b border-gray-100 dark:border-gray-800 transition-colors">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search hidden gems, artisans, food..."
                        className="w-full bg-gray-100 dark:bg-gray-800 rounded-full py-2 pl-10 pr-4 text-sm dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors placeholder-gray-500 dark:placeholder-gray-400"
                    />
                </div>
            </div>

            <Categories />

            <div className="px-4 py-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    {searchQuery ? `Search Results (${filteredPlaces.length})` : 'All Experiences'}
                </h3>
                {filteredPlaces.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {filteredPlaces.map(place => (
                            <PlaceCard
                                key={place.id}
                                {...place}
                                onClick={() => onCardClick(place)}
                                isSaved={savedPlaceIds.includes(place.id)}
                                onToggleSave={(e) => onToggleSave(e, place.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        No places found matching "{searchQuery}"
                    </div>
                )}
            </div>
        </div>
    );
};

export const FeaturedCard = ({ place, onClick, isSaved, onToggleSave }) => (
    <div
        onClick={() => onClick(place)}
        className="flex-shrink-0 w-64 md:w-full bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] scale-100 hover:scale-[1.02] transition-all duration-500 ease-out group cursor-pointer relative"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(place);
            }
        }}
    >
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 z-20">
            <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-gray-100 dark:border-gray-800">
                <span className={`text-[10px] font-black uppercase tracking-widest ${place.categoryColor?.replace('bg-', 'text-') || 'text-amber-600'}`}>
                    {place.category}
                </span>
            </div>
        </div>

        {/* Image Container */}
        <div className="relative h-64 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gray-900 animate-pulse -z-10" />
            <img
                src={place.image}
                alt={place.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Save Button */}
            <button
                onClick={(e) => onToggleSave(e, place.id)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 z-20 group/heart"
            >
                <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'text-red-500 fill-current' : 'text-white group-hover/heart:text-red-500'}`} />
            </button>
        </div>

        {/* Content Overlay - Now floating over the bottom of the image for a more immersive look */}
        <div className="absolute bottom-0 inset-x-0 p-6 text-white transform transition-transform duration-500">
            <div className="flex items-center gap-2 mb-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                <div className="flex items-center gap-1 bg-[#D4AF37] text-black px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide">
                    <Star size={10} className="fill-black" />
                    {place.rating}
                </div>
                <div className="flex items-center gap-1 text-gray-300 text-[10px] font-medium tracking-wide">
                    <MapPin size={10} />
                    {place.location}
                </div>
            </div>

            <h4 className="font-serif text-2xl leading-none mb-2 drop-shadow-md group-hover:text-[#D4AF37] transition-colors duration-300">
                {place.title}
            </h4>

            <p className="text-gray-300 text-xs line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                {place.description}
            </p>
        </div>
    </div>
);

export const FeaturedSection = ({ places = [], onCardClick, savedPlaceIds = [], onToggleSave, onSeeAllClick }) => {
    // Show first 5 places from the dynamic list for mobile scroll, or 4 for desktop grid
    const displayPlaces = places.length > 0 ? places.slice(0, 5) : featuredPlaces;

    return (
        <div className="py-8 transition-colors duration-200">
            <div className="flex justify-between items-end px-5 md:px-0 mb-8">
                <div>
                    <span className="text-[#D4AF37] font-black text-xs uppercase tracking-[0.3em] mb-2 block">Curated Collection</span>
                    <h3 className="text-3xl md:text-5xl font-serif text-gray-900 dark:text-white leading-none">Featured Spots</h3>
                </div>
                <button
                    onClick={onSeeAllClick}
                    className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                    See All Collection <MapPin size={14} />
                </button>
            </div>

            {/* Responsive Container: Horizontal Scroll on Mobile, Grid on Desktop */}
            <div className="flex space-x-6 overflow-x-auto px-5 pb-8 md:px-0 md:pb-0 md:space-x-0 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-8 custom-scrollbar md:overflow-visible snap-x">
                {displayPlaces.map((place, index) => (
                    <div
                        key={place.id}
                        className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-backwards"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <FeaturedCard
                            place={place}
                            onClick={onCardClick}
                            isSaved={savedPlaceIds.includes(place.id)}
                            onToggleSave={onToggleSave}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};


export const FeedbackSection = ({ userEmail, onSuccess }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Use local supabase instance

            if (supabase) {
                const feedbackData = {
                    user_email: userEmail || 'Anonymous',
                    comment: comment,
                    created_at: new Date().toISOString()
                };

                // Determine which table to use
                if (window.location.href.includes('admin') || !onSuccess) {
                    // Admin/General Feedback
                    const { error } = await supabase
                        .from('admin_feedback')
                        .insert([{ ...feedbackData, subject: 'General' }]);
                    if (error) throw error;
                } else {
                    // Partner/Spot Feedback (assuming we are on a place details view)
                    const { error } = await supabase
                        .from('partner_feedback')
                        .insert([{
                            ...feedbackData,
                            rating: rating,
                            spot_name: document.querySelector('h1')?.innerText || 'Unknown Spot'
                        }]);
                    if (error) throw error;
                }
            }

            // Fallback to local storage for instant UI update
            const feedback = {
                id: Date.now(),
                userEmail,
                rating,
                comment,
                timestamp: new Date().toISOString()
            };

            const isSiteFeedback = window.location.href.includes('admin') || !onSuccess;
            const storageKey = isSiteFeedback ? 'admin_feedback_local' : 'partner_feedback_local';
            const existingFeedback = JSON.parse(localStorage.getItem(storageKey) || '[]');
            localStorage.setItem(storageKey, JSON.stringify([feedback, ...existingFeedback]));

            setSubmitted(true);
            setComment('');
            if (onSuccess) onSuccess();
            setTimeout(() => setSubmitted(false), 3000);
        } catch (err) {
            console.error("Feedback error:", err);
            // Error is handled by console or parent
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl">
                    <MessageSquare className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                    <h3 className="text-xl font-serif text-gray-900 dark:text-white">Share Your Feedback</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Help us preserve Mysuru's spirit</p>
                </div>
            </div>

            {submitted ? (
                <div className="py-8 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="h-6 w-6 text-emerald-600" />
                    </div>
                    <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Feedback Received!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => setRating(num)}
                                className={`p-2 transition-all ${rating >= num ? 'text-amber-500 scale-110' : 'text-gray-300 dark:text-gray-600'}`}
                            >
                                <Star fill={rating >= num ? 'currentColor' : 'none'} size={24} />
                            </button>
                        ))}
                    </div>

                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us about your experience..."
                        required
                        className="w-full h-32 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all resize-none"
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 bg-black dark:bg-[#D4AF37] text-white dark:text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg hover:scale-[1.02] active:scale-95 transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Sending Heritage Echo...' : 'Submit Feedback'}
                    </button>
                </form>
            )}
        </div>
    );
};


export const Hero = ({ onExploreClick }) => {
    return (
        <div className="px-5 pt-8 pb-4 space-y-8 md:px-0 md:pt-12 md:pb-12">
            {/* Modern Search Bar */}
            <div className="relative group z-30 md:max-w-2xl md:mx-auto transform hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-14 pr-32 py-5 border-none rounded-[2rem] leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all font-medium text-sm md:text-base"
                    placeholder="Search for hidden gems, culture, food..."
                />
                <div className="absolute inset-y-2 right-2 flex items-center">
                    <button className="px-5 py-2.5 bg-black dark:bg-[#D4AF37] rounded-[1.5rem] text-white dark:text-black font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/20 dark:shadow-[#D4AF37]/20">
                        Filter
                    </button>
                </div>
            </div>

            {/* Immersive Hero Card */}
            <div
                className="relative w-full h-[26rem] md:h-[36rem] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] group cursor-pointer"
                onClick={onExploreClick}
            >
                <div className="absolute inset-0 bg-gray-900 animate-pulse" /> {/* Loading state placeholder */}
                <img
                    src="/src/assets/mysore-palace-daytime.jpg"
                    alt="Mysore Palace"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

                {/* Top Badge */}
                <div className="absolute top-8 left-8">
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full shadow-2xl">
                        <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_10px_#D4AF37]" />
                        <span className="text-white font-bold text-[10px] tracking-[0.2em] uppercase">Featured Destination</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="absolute bottom-10 left-8 right-8 md:left-12 md:bottom-12 max-w-2xl">
                    <div className="space-y-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                            <div className="bg-[#D4AF37] p-1.5 rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                                <Compass className="w-4 h-4 text-black" />
                            </div>
                            <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.3em] drop-shadow-md">Beyond the Palace</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-serif text-white leading-[0.9] tracking-tight drop-shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                            Discover the <br />
                            <span className="italic relative inline-block">
                                Soul of Mysuru
                            </span>

                        </h2>

                        <p className="text-gray-200 text-sm md:text-lg font-medium leading-relaxed max-w-lg drop-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                            Uncover hidden gems, local artisans & authentic experiences that usually go unnoticed by the casual eye.
                        </p>
                    </div>

                    {/* Explore Button */}
                    <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                        <button
                            className="group/btn relative overflow-hidden bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
                        >
                            <span className="relative z-10">
                                Start Exploring
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const Loader = ({ onFinish }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onFinish) onFinish();
        }, 4500); // 4.5 seconds to appreciate the premium animation

        return () => clearTimeout(timer);
    }, [onFinish]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f8f9fa] flex-col overflow-hidden transition-opacity duration-1000">
            <div className="relative flex flex-col items-center">

                {/* Logo Text */}
                <div className="flex items-baseline space-x-3 z-10 scale-110 sm:scale-125">
                    <h1 className="text-5xl font-serif text-black tracking-tight opacity-0 animate-fade-in-up"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        Mysuru
                    </h1>
                    <h1 className="text-5xl font-bold text-[#D4AF37] tracking-tight opacity-0 animate-fade-in-up-delay">
                        marga
                    </h1>
                </div>


                {/* Progress bar or subtle indicator */}
                <div className="mt-20 w-40 h-[1.5px] bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#D4AF37] animate-loading-progress shadow-[0_0_10px_#D4AF37]"></div>
                </div>

                <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-gray-400 opacity-0 animate-fade-in-slow">
                    Exploring Hidden Treasures
                </p>
            </div>

            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(15px);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 0.6; }
        }
        @keyframes loading-progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s forwards;
        }
        .animate-fade-in-up-delay {
          animation: fade-in-up 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.8s forwards;
        }
        .animate-fade-in-slow {
          animation: fade-in 2s ease-out 1.5s forwards;
        }
        .animate-loading-progress {
          animation: loading-progress 4.5s cubic-bezier(0.1, 0, 0.3, 1) forwards;
        }
      `}</style>
        </div>
    );
};


// Fix for default marker icons

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

export const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, zoom || 15, { animate: true });
        }
    }, [center, zoom, map]);
    return null;
};

export const MapComponent = ({ places, destination, interactive = true }) => {
    const defaultCenter = [12.3051, 76.6551]; // Mysuru Palace Area
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activePlace, setActivePlace] = useState(destination || null);
    const [showBookingPanel, setShowBookingPanel] = useState(false);
    const [bookingStage, setBookingStage] = useState('select'); // 'select', 'confirm', 'success'
    const [selectedCab, setSelectedCab] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const categories = ['All', 'Nature', 'Heritage', 'Food', 'Artisan', 'Stay'];

    const filteredPlaces = (places || []).filter(place => {
        const matchesSearch = place.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || place.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const suggestions = searchQuery.length > 1
        ? (places || []).filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
        : [];

    const handlePlaceSelect = (place) => {
        setActivePlace(place);
        setSearchQuery(place.title);
        setShowSuggestions(false);
        setShowBookingPanel(false);
        setBookingStage('select');
        setSelectedCab(null);
    };

    const cabOptions = [
        { id: 'bike', type: 'Bike / Two-Wheeler', price: '₹42', time: '2 min', icon: '', description: 'Fastest in traffic' },
        { id: 'auto', type: 'Auto Rickshaw', price: '₹68', time: '3 min', icon: '', description: 'Affordable for 3' },
        { id: 'mini', type: 'Cab Mini', price: '₹142', time: '5 min', icon: '', description: 'Compact AC cars' },
        { id: 'prime', type: 'Cab Prime', price: '₹198', time: '6 min', icon: '', description: 'Premium sedans' },
    ];

    const handleBookNow = (cab) => {
        setSelectedCab(cab);
        setBookingStage('confirm');
    };

    const confirmBooking = () => {
        setBookingStage('success');
        setTimeout(() => {
            setShowBookingPanel(false);
            setBookingStage('select');
        }, 3000);
    };

    const center = activePlace?.coords || defaultCenter;
    const zoom = activePlace ? 16 : 13;

    return (
        <div className="w-full relative overflow-hidden bg-gray-100" style={{ height: 'calc(100vh - 100px)' }}>
            {/* Search Bar Overlay - Only if Interactive */}
            {interactive && (
                <div className={`absolute top-4 left-4 right-4 z-[1000] space-y-3 transition-all duration-500 ${showBookingPanel ? '-translate-y-24 opacity-0' : 'translate-y-0 opacity-100'}`}>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-full"></div>
                        <div className="relative flex items-center bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-100 dark:border-gray-700 p-1">
                            <div className="p-3 text-gray-400">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search hidden gems..."
                                className="flex-1 bg-transparent border-none outline-none text-sm py-2 dark:text-gray-100 placeholder-gray-400"
                                value={searchQuery}
                                onFocus={() => setShowSuggestions(true)}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && suggestions.length > 0) {
                                        handlePlaceSelect(suggestions[0]);
                                    }
                                }}
                            />
                            {searchQuery && (
                                <button onClick={() => { setSearchQuery(''); setActivePlace(null); }} className="p-2 text-gray-400 hover:text-gray-600">
                                    <X size={16} />
                                </button>
                            )}
                            <button
                                onClick={() => suggestions.length > 0 && handlePlaceSelect(suggestions[0])}
                                className="p-2 mr-1 bg-mysore-gold/10 hover:bg-mysore-gold/20 text-mysore-gold rounded-xl transition-colors"
                            >
                                <Navigation size={20} className="fill-current" />
                            </button>
                        </div>

                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in">
                                {suggestions.map(place => (
                                    <button
                                        key={place.id}
                                        onClick={() => handlePlaceSelect(place)}
                                        className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left border-b border-gray-50 last:border-0"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-mysore-gold/10 flex items-center justify-center">
                                            <MapPin size={16} className="text-mysore-gold" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{place.title}</p>
                                            <p className="text-[10px] text-gray-500">{place.location}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${selectedCategory === cat
                                    ? 'bg-mysore-gold border-mysore-gold text-white shadow-lg shadow-mysore-gold/30'
                                    : 'bg-white border-white shadow-md text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* MapComponent Container - Explicit height to fix rendering issues */}
            <div className="w-full h-full absolute inset-0 z-0" onClick={() => setShowSuggestions(false)}>
                <MapContainer
                    center={center}
                    zoom={zoom}
                    scrollWheelZoom={true}
                    className="w-full h-full z-0 outline-none"
                    zoomControl={false}
                    style={{ height: '100%', width: '100%' }}
                >


                    <ChangeView center={center} zoom={zoom} />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap'
                    />

                    {filteredPlaces.map(place => (
                        <Marker
                            key={place.id}
                            position={place.coords}
                            eventHandlers={{
                                click: () => handlePlaceSelect(place),
                            }}
                        >
                            <Popup>
                                <div className="p-1 min-w-[150px]">
                                    <h4 className="font-bold text-sm text-gray-900">{place.title}</h4>
                                    <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
                                        <Star size={10} className="text-yellow-500 fill-current" />
                                        <span>{place.rating}</span>
                                        <span>₹€¢</span>
                                        <span>{place.category}</span>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            {/* Floating Actions */}
            {interactive && (
                <div className={`absolute bottom-24 right-4 z-[1000] flex flex-col gap-3 transition-transform ${activePlace ? '-translate-y-48' : ''}`}>
                    <button
                        onClick={() => { setActivePlace(null); setShowBookingPanel(false); setSearchQuery(''); }}
                        className="p-3 bg-white dark:bg-gray-800 shadow-xl rounded-full text-gray-600 dark:text-gray-300 hover:scale-110 active:scale-95 transition-all border border-gray-100 dark:border-gray-700"
                    >
                        <Navigation size={22} />
                    </button>
                </div>
            )}

            {/* Bottom Info Card / Cab Facility */}
            {interactive && activePlace && (
                <div className="absolute bottom-6 left-4 right-4 z-[1000] transition-all duration-500">
                    <div className={`bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-500 ${showBookingPanel ? 'h-[420px]' : 'h-max'}`}>
                        {/* Header Image */}
                        <div className={`relative transition-all duration-500 ${showBookingPanel ? 'h-20' : 'h-32'}`}>
                            <img src={activePlace.image} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <button
                                onClick={() => { setActivePlace(null); setShowBookingPanel(false); setSearchQuery(''); }}
                                className="absolute top-3 right-3 p-1.5 bg-black/40 text-white rounded-full backdrop-blur-md hover:bg-black/60 transition-colors"
                            >
                                <X size={16} />
                            </button>
                            <div className="absolute bottom-3 left-4 text-white">
                                <h3 className="font-bold leading-tight">{activePlace.title}</h3>
                                <p className="text-[10px] opacity-80">{activePlace.location}</p>
                            </div>
                        </div>

                        <div className="p-5 h-full overflow-y-auto no-scrollbar">
                            {!showBookingPanel ? (
                                <div className="flex items-center justify-between animate-in">
                                    <div className="flex gap-6">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Rating</span>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Star size={14} className="text-yellow-500 fill-current" />
                                                <span className="font-bold text-base">{activePlace.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col border-l border-gray-100 dark:border-gray-800 pl-6">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Estimate</span>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Car size={14} className="text-mysore-gold" />
                                                <span className="font-bold text-base">₹‚¹142</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowBookingPanel(true)}
                                        className="bg-mysore-gold text-white px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-xl shadow-mysore-gold/30 hover:scale-[1.05] active:scale-[0.95] transition-all"
                                    >
                                        <Car size={18} />
                                        Book Ride
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in">
                                    {bookingStage === 'select' && (
                                        <>
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">Choose your vehicle</h4>
                                                <button onClick={() => setShowBookingPanel(false)} className="text-[10px] font-bold text-gray-400 uppercase">Cancel</button>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2">
                                                {cabOptions.map(cab => (
                                                    <div
                                                        key={cab.id}
                                                        onClick={() => handleBookNow(cab)}
                                                        className="flex items-center justify-between p-3.5 bg-gray-50 dark:bg-gray-800/50 border border-transparent hover:border-mysore-gold/30 rounded-2xl transition-all cursor-pointer group"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">{cab.icon}</div>
                                                            <div>
                                                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{cab.type}</p>
                                                                <p className="text-[10px] text-gray-500">{cab.description}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-bold text-gray-900 dark:text-gray-100">{cab.price}</p>
                                                            <p className="text-[10px] text-green-500 font-bold">{cab.time}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    {bookingStage === 'confirm' && selectedCab && (
                                        <div className="space-y-6 py-2">
                                            <div className="text-center space-y-2">
                                                <div className="w-20 h-20 bg-mysore-gold/10 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 animate-pulse">
                                                    {selectedCab.icon}
                                                </div>
                                                <h4 className="text-lg font-bold">Confirm your {selectedCab.type}</h4>
                                                <p className="text-sm text-gray-500">Pick-up: Current Location<br />Drop-off: {activePlace.title}</p>
                                            </div>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => setBookingStage('select')}
                                                    className="flex-1 py-4 border-2 border-gray-100 dark:border-gray-800 rounded-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors"
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    onClick={confirmBooking}
                                                    className="flex-[2] py-4 bg-black text-white rounded-2xl font-bold shadow-2xl hover:bg-gray-800 transition-colors"
                                                >
                                                    Confirm & Pay {selectedCab.price}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {bookingStage === 'success' && (
                                        <div className="flex flex-col items-center justify-center py-10 space-y-4 fade-in">
                                            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                                                <Clock size={32} />
                                            </div>
                                            <div className="text-center">
                                                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">Booking Confirmed!</h4>
                                                <p className="text-sm text-gray-500 mt-1">Your driver is arriving in {selectedCab?.time}</p>
                                            </div>
                                            <div className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-dashed border-gray-300 dark:border-gray-600">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Driver Info</p>
                                                        <p className="text-sm font-bold">Suresh Kumar</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase">OTP</p>
                                                        <p className="text-sm font-bold tracking-widest text-mysore-gold">4821</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};



export const Navbar = ({ onProfileClick, activeTab, setActiveTab }) => {
    const NavLink = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${activeTab === id
                ? 'bg-mysore-100 dark:bg-mysore-900/30 text-mysore-700 dark:text-mysore-400 font-bold'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
        >
            <Icon size={18} />
            <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
        </button>
    );

    return (
        <nav className="flex justify-between items-center px-6 py-6 border-b border-transparent md:border-gray-100 md:dark:border-gray-800 transition-colors duration-200">
            <div className="flex flex-col cursor-pointer" onClick={() => setActiveTab && setActiveTab('home')}>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide hidden md:block">Welcome to</span>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                    Mysuru <span className="text-mysore-600">Marga</span>
                </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl p-1.5 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
                <NavLink id="home" icon={Home} label="Home" />
                <NavLink id="explore" icon={Compass} label="Explore" />
                <NavLink id="MapComponent" icon={MapComponent} label="MapComponent" />
                <NavLink id="saved" icon={Heart} label="Saved" />
            </div>

            <button
                onClick={onProfileClick}
                className="w-12 h-12 rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all shadow-sm group"
                aria-label="Profile"
            >
                <div className="relative">
                    <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
            </button>
        </nav>
    );
};


export const PlaceCard = ({ image, category, title, description, location, rating, onClick, isSaved, onToggleSave }) => {
    return (
        <div
            onClick={onClick}
            className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none dark:border dark:border-gray-800 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 cursor-pointer relative"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                <button
                    onClick={onToggleSave}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-transform active:scale-90 group-hover:bg-white/30"
                >
                    <Heart className={`w-5 h-5 transition-colors ${isSaved ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                </button>

                {/* Category Badge */}
                <span className={`absolute top-4 left-4 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest text-white backdrop-blur-md
                    ${category === 'Hyperlocal Food' ? 'bg-emerald-500/80' :
                        category === 'Hidden Gems' ? 'bg-mysore-500/80' :
                            category === 'Heritage' ? 'bg-amber-600/80' : 'bg-gray-500/80'}`}>
                    {category}
                </span>

                {/* Rating Badge (Floating) */}
                <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-white">{rating}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-2 group-hover:text-mysore-700 transition-colors">
                    {title}
                </h3>

                <div className="flex items-start gap-2 text-gray-400 dark:text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-medium line-clamp-1">{location}</span>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};


export const PlaceDetails = ({ place, onBack, isSaved, onToggleSave, userEmail, onGetDirections }) => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [localFeedbacks, setLocalFeedbacks] = useState([]);

    useEffect(() => {
        // Load initial feedbacks
        const feedbacks = JSON.parse(localStorage.getItem('user_feedback') || '[]');
        setLocalFeedbacks(feedbacks);

        // Listen for new feedbacks
        const handleStorageChange = () => {
            const updatedFeedbacks = JSON.parse(localStorage.getItem('user_feedback') || '[]');
            setLocalFeedbacks(updatedFeedbacks);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    if (!place) return null;

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: place.title,
                text: place.description,
                url: window.location.href,
            }).catch(console.error);
        } else {
            // Fallback for browsers without share API
            navigator.clipboard.writeText(window.location.href);
            // We could add a toast here, but for now simple clipboard is better than ugly alert
        }
    };

    return (
        <div className="relative flex flex-col h-full bg-white dark:bg-gray-900 animate-in fade-in slide-in-from-right duration-300 overflow-hidden">
            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto pb-6 custom-scrollbar">
                {/* Hero Image Section */}
                <div className="relative h-80 w-full shrink-0">
                    <img
                        src={place.image}
                        alt={place.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

                    {/* Top Controls */}
                    <div className="absolute top-6 inset-x-0 px-6 flex items-center justify-between">
                        <button
                            onClick={onBack}
                            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="flex gap-3">
                            <button
                                onClick={handleShare}
                                className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={(e) => onToggleSave(e, place.id)}
                                className={`p-2 backdrop-blur-md rounded-full transition-colors ${isSaved ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Section - Overlapping Card */}
                <div className="relative -mt-10 bg-white dark:bg-gray-900 rounded-t-[32px] px-6 pt-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${place.categoryColor || 'bg-amber-600'}`}>
                                {place.category}
                            </span>
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                <span className="text-sm font-bold text-gray-900 dark:text-white">{place.rating}</span>
                                <span className="text-xs text-gray-500">(128)</span>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{place.title}</h1>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {place.description}
                            </p>
                        </div>

                        {/* Quick Info */}
                        <div className="flex flex-wrap gap-4 py-4 border-y border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                </div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">{place.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                </div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">6:00 AM - 8:00 PM</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <IndianRupee className="w-4 h-4 text-gray-500" />
                                </div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">Budget Friendly</span>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {['#heritage', '#culture', '#mysore'].map(tag => (
                                <span key={tag} className="text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* About Section */}
                        <div className="mt-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">About</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {place.title} is a landmark destination in Mysore that offers an authentic glimpse into local life.
                                The vibrant atmosphere, historic architecture, and unique offerings make it a must-visit for anyone
                                exploring the cultural landscape of the city.
                            </p>
                        </div>

                        {/* Highlights */}
                        <div className="mt-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Highlights</h2>
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    "150+ year old heritage market",
                                    "Famous for Mysore jasmine garlands",
                                    "Traditional spices and sandalwood",
                                    "Best local street food"
                                ].map((highlight, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-emerald-50/50 dark:bg-emerald-900/10 p-3 rounded-xl border border-emerald-100/50 dark:border-emerald-800/30">
                                        <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{highlight}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Best Time to Visit */}
                        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-800/50">
                            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-400 mb-1">Best Time to Visit</h3>
                            <p className="text-sm text-amber-700 dark:text-amber-500 font-medium leading-relaxed">
                                Early morning (6-8 AM) for the freshest flowers and produce
                            </p>
                        </div>

                        {/* Reviews Section */}
                        <div className="mt-8 mb-10">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Reviews</h2>
                                <button
                                    onClick={() => setShowReviewForm(!showReviewForm)}
                                    className="text-sm font-bold text-amber-600 hover:text-amber-700"
                                >
                                    {showReviewForm ? 'View Reviews' : 'Write Review'}
                                </button>
                            </div>

                            {showReviewForm ? (
                                <FeedbackSection
                                    userEmail={userEmail}
                                    onSuccess={() => {
                                        // Update local state immediately after submission
                                        const updatedFeedbacks = JSON.parse(localStorage.getItem('user_feedback') || '[]');
                                        setLocalFeedbacks(updatedFeedbacks);
                                        // Optionally close the form after a delay or instantly
                                        setTimeout(() => setShowReviewForm(false), 2000);
                                    }}
                                />
                            ) : (
                                <div className="space-y-4">
                                    {localFeedbacks.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-10 px-6 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
                                            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm mb-4">
                                                <MessageSquare className="w-6 h-6 text-gray-300" />
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No reviews yet. Be the first!</p>
                                        </div>
                                    ) : (
                                        localFeedbacks.map((fb) => (
                                            <div key={fb.id} className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 dark:text-amber-400 font-bold text-xs">
                                                            {fb.userEmail?.charAt(0).toUpperCase() || 'U'}
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-gray-900 dark:text-white">{fb.userEmail}</p>
                                                            <div className="flex gap-0.5">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <Star key={star} size={10} className={star <= fb.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="text-[10px] text-gray-400 uppercase font-bold">
                                                        {new Date(fb.timestamp).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic">"{fb.comment}"</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Actions Container */}
            <div className="bg-white dark:bg-gray-900 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            const url = `https://m.uber.com/ul/?action=setPickup&client_id=YOUR_CLIENT_ID&pickup=my_location&dropoff[formatted_address]=${place.title}+Mysore&dropoff[nickname]=${place.title}`;
                            window.open(url, '_blank');
                        }}
                        className="flex-1 bg-black dark:bg-gray-800 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                    >
                        <Car className="w-5 h-5" />
                        Book Ride
                    </button>
                    <button
                        onClick={() => {
                            const url = `https://www.google.com/maps/dir/?api=1&destination=${place.title}+Mysore`;
                            window.open(url, '_blank');
                        }}
                        className="flex-1 bg-[#D4AF37] hover:bg-[#B8962F] text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20 transition-all active:scale-95"
                    >
                        <Navigation className="w-5 h-5 fill-current" />
                        Directions
                    </button>
                </div>
            </div>
        </div>
    );
};


export const Saved = ({ savedPlaceIds = [], allPlaces = [], onToggleSave, onCardClick }) => {
    const savedPlaces = allPlaces.filter(place => savedPlaceIds.includes(place.id));

    if (savedPlaces.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] px-4 text-center">
                <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4 transition-colors">
                    <Heart className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Saved Places Yet</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
                    Start exploring and save your favorite hidden gems to create your personal itinerary.
                </p>
            </div>
        );
    }

    return (
        <div className="px-4 py-4 pb-20">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Saved Places ({savedPlaces.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedPlaces.map(place => (
                    <PlaceCard
                        key={place.id}
                        {...place}
                        isSaved={true}
                        onToggleSave={(e) => onToggleSave(e, place.id)}
                        onClick={() => onCardClick && onCardClick(place)}
                    />
                ))}
            </div>
        </div>
    );
};





export const AdminDashboard = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [userFilter, setUserFilter] = useState('all'); // 'all', 'user', 'partner'
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [adminSettings, setAdminSettings] = useState({
        publicRegistration: true,
        partnerVerification: true,
        globalBroadcasts: true
    });
    const [siteFeedback, setSiteFeedback] = useState([]);
    const [spotsCount, setSpotsCount] = useState(allPlaces.length);
    const [confirmModal, setConfirmModal] = useState({ show: false, title: '', message: '', onConfirm: null, type: 'danger' });
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

    // Load users from Supabase
    const loadUsers = async () => {
        setLoading(true);
        try {
            // Use local supabase instance

            if (supabase) {
                // Fetch all profiles from the custom table we created
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .order('updated_at', { ascending: false });

                if (!error && data) {
                    const supabaseUsers = data.map(u => ({
                        fullName: u.full_name || u.fullName || 'Resident',
                        email: u.email,
                        phone: u.phone || '-',
                        role: u.role || 'user',
                        joinedAt: u.updated_at || u.created_at,
                        source: 'Supabase'
                    }));
                    setUsers(supabaseUsers);
                } else {
                    console.error("Supabase fetch error:", error);
                    // Fallback to local if Supabase fails or table doesn't exist yet
                    const storedUsers = localStorage.getItem('usersDB');
                    if (storedUsers) setUsers(JSON.parse(storedUsers));
                }
            } else {
                // Pure demo mode fallback
                const storedUsers = localStorage.getItem('usersDB');
                if (storedUsers) setUsers(JSON.parse(storedUsers));
            }
        } catch (error) {
            console.error("Critical failure loading users", error);
        }
        setLoading(false);
    };

    const loadSpotsCount = async () => {
        try {
            // Use local supabase instance
            if (supabase) {
                const { count, error } = await supabase
                    .from('heritage_spots')
                    .select('*', { count: 'exact', head: true });

                if (!error && count !== null) {
                    setSpotsCount(count);
                }
            }
        } catch (err) {
            console.error("Error loading spots count:", err);
        }
    };

    const loadFeedback = async () => {
        try {
            // Use local supabase instance
            if (supabase) {
                const { data, error } = await supabase
                    .from('admin_feedback')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (data) {
                    setSiteFeedback(data.map(f => ({
                        id: f.id,
                        userEmail: f.email || 'Anonymous Traveler',
                        rating: f.rating,
                        comment: f.comment,
                        timestamp: f.created_at
                    })));
                }
            }
        } catch (err) {
            console.error("Error loading feedback:", err);
        }
    };

    useEffect(() => {
        loadUsers();
        loadFeedback();
        loadSpotsCount();
    }, []);

    const totalUsers = users.length;
    const partnersCount = users.filter(u => u.role === 'partner').length;

    const handleTabChange = (tab, filter = 'all') => {
        setActiveTab(tab);
        setUserFilter(filter);
    };

    const handleDeleteUser = async (email) => {
        setConfirmModal({
            show: true,
            title: 'Remove Resident',
            message: `Are you sure you want to remove ${email} from the registry? This action cannot be undone.`,
            type: 'danger',
            onConfirm: async () => {
                try {
                    // Use local supabase instance

                    // 1. Delete from Supabase profiles table
                    if (supabase) {
                        const { error } = await supabase
                            .from('profiles')
                            .delete()
                            .eq('email', email);

                        if (error) {
                            console.error("Supabase deletion error:", error.message);
                        }
                    }

                    // 2. Fallback/Cleanup for Local Storage
                    const storedUsers = JSON.parse(localStorage.getItem('usersDB') || '[]');
                    const updatedUsers = storedUsers.filter(u => u.email !== email);
                    localStorage.setItem('usersDB', JSON.stringify(updatedUsers));

                    // 3. Update UI State
                    setUsers(prev => prev.filter(u => u.email !== email));
                    showNotification(`${email} has been removed.`);
                } catch (err) {
                    console.error("Critical error during deletion:", err);
                    showNotification("Deletion failed.", "error");
                }
                setConfirmModal(prev => ({ ...prev, show: false }));
            }
        });
    };

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
    };

    const toggleSetting = (key) => {
        setAdminSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleReset = () => {
        setConfirmModal({
            show: true,
            title: 'System Reset',
            message: 'CRITICAL ACTION: This will reset all administrative overrides. Are you absolutely sure?',
            type: 'danger',
            onConfirm: () => {
                showNotification("System state normalized.");
                setConfirmModal(prev => ({ ...prev, show: false }));
            }
        });
    };

    return (
        <div className="min-h-screen bg-mysore-light dark:bg-mysore-dark font-sans transition-colors duration-500 flex selection:bg-[#D4AF37]/30">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl w-72 border-r border-gray-100 dark:border-gray-800 shadow-2xl z-30 hidden lg:flex flex-col">
                <div className="p-10 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
                        <Shield className="h-6 w-6 text-black" />
                    </div>
                    <div>
                        <h1 className="text-xl font-serif text-black dark:text-white leading-none">Mysuru</h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]">Administration</p>
                    </div>
                </div>

                <nav className="flex-1 px-6 space-y-3">
                    <NavItem icon={<TrendingUp />} label="Overview" active={activeTab === 'overview'} onClick={() => handleTabChange('overview')} />
                    <NavItem icon={<Users />} label="Residents" active={activeTab === 'users'} onClick={() => handleTabChange('users', 'all')} />
                    <NavItem icon={<Inbox />} label="Invitations" active={activeTab === 'invites'} onClick={() => handleTabChange('invites')} />
                    <NavItem icon={<Settings />} label="Settings" active={activeTab === 'settings'} onClick={() => handleTabChange('settings')} />
                </nav>

                <div className="p-8">
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-4 w-full px-6 py-4 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all font-bold text-sm"
                    >
                        <LogOut className="h-5 w-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="lg:ml-72 flex-1 h-screen overflow-y-auto custom-scrollbar">
                {/* Mobile Header */}
                <div className="lg:hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center sticky top-0 z-40">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                            <Shield className="h-5 w-5 text-black" />
                        </div>
                        <span className="font-serif text-lg text-black dark:text-white">Admin Core</span>
                    </div>
                    <button onClick={onLogout} className="p-2 text-gray-500 hover:text-red-500">
                        <LogOut className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-8 lg:p-12 max-w-7xl mx-auto">
                    {activeTab === 'overview' && (
                        <OverviewTab
                            totalUsers={totalUsers}
                            partnersCount={partnersCount}
                            activeLocations={spotsCount}
                            siteFeedback={siteFeedback}
                            onNavigate={handleTabChange}
                        />
                    )}
                    {activeTab === 'users' && (
                        <UsersTab
                            users={users}
                            loading={loading}
                            filter={userFilter}
                            setFilter={setUserFilter}
                            onDeleteUser={handleDeleteUser}
                        />
                    )}
                    {activeTab === 'invites' && (
                        <InvitationsTab showNotification={showNotification} />
                    )}
                    {activeTab === 'settings' && (
                        <SettingsTab settings={adminSettings} onToggle={toggleSetting} loadUsers={loadUsers} handleReset={handleReset} />
                    )}
                </div>
            </main>

            {/* Custom Confirmation Modal */}
            {confirmModal.show && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setConfirmModal(prev => ({ ...prev, show: false }))}></div>
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 w-full max-w-md relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-8 sm:p-10">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${confirmModal.type === 'danger' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                                <Shield className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-serif text-black dark:text-white mb-3">{confirmModal.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">{confirmModal.message}</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => setConfirmModal(prev => ({ ...prev, show: false }))}
                                    className="flex-1 py-4 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:text-black dark:hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmModal.onConfirm}
                                    className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95 ${confirmModal.type === 'danger' ? 'bg-rose-500 text-white shadow-rose-500/20' : 'bg-black dark:bg-[#D4AF37] text-white dark:text-black shadow-black/20'}`}
                                >
                                    Confirm Action
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Toast Notification */}
            {notification.show && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[101] animate-in slide-in-from-bottom-10 duration-500">
                    <div className="bg-black dark:bg-gray-800 text-white px-8 py-4 rounded-[1.5rem] shadow-2xl flex items-center gap-4 border border-white/10">
                        <div className={`w-2 h-2 rounded-full ${notification.type === 'error' ? 'bg-rose-500' : 'bg-emerald-500'} animate-pulse`}></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{notification.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export const NavItem = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${active
            ? 'bg-black dark:bg-[#D4AF37] text-white dark:text-black shadow-xl shadow-black/10 dark:shadow-[#D4AF37]/20 scale-[1.02]'
            : 'text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800/50 hover:text-black dark:hover:text-white'
            }`}>
        {React.cloneElement(icon, { size: 20 })}
        <span className="font-bold text-sm">{label}</span>
    </button>
);

export const StatCard = ({ title, value, change, icon, bg, onClick }) => (
    <button
        onClick={onClick}
        className="text-left w-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 hover:scale-[1.02] transition-all group"
    >
        <div className="flex justify-between items-start mb-6">
            <div className={`p-4 rounded-2xl ${bg} group-hover:scale-110 transition-transform duration-500`}>
                {icon}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-black">
                <TrendingUp size={12} />
                <span>{change}</span>
            </div>
        </div>
        <h3 className="text-4xl font-serif text-black dark:text-white mb-2 leading-none">{value}</h3>
        <p className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">{title}</p>
    </button>
);

export const OverviewTab = ({ totalUsers, partnersCount, activeLocations, siteFeedback, onNavigate }) => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header>
            <h2 className="text-5xl font-serif text-black dark:text-white leading-tight">Welcome Back</h2>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard
                title="Total Residents"
                value={totalUsers}
                change="+12.4%"
                icon={<Users className="h-7 w-7 text-blue-600" />}
                bg="bg-blue-100 dark:bg-blue-900/30"
                onClick={() => onNavigate('users', 'user')}
            />
            <StatCard
                title="Verified Heritage Spots"
                value={activeLocations}
                change="+5.2%"
                icon={<MapComponent className="h-7 w-7 text-emerald-600" />}
                bg="bg-emerald-100 dark:bg-emerald-900/30"
            />
            <StatCard
                title="Active Partners"
                value={partnersCount}
                change="+24.8%"
                icon={<BarChart3 className="h-7 w-7 text-amber-600" />}
                bg="bg-amber-100 dark:bg-amber-900/30"
                onClick={() => onNavigate('users', 'partner')}
            />
        </div>

        {/* Heritage Pulse MapComponent Integration */}
        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-[3rem] shadow-2xl p-10 border border-gray-100 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h3 className="text-2xl font-serif text-black dark:text-white">Live Heritage Pulse</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Real-time spatial activity across Mysuru</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">System Nominal</span>
                </div>
            </div>

            <div className="h-[450px] rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-700 relative shadow-inner group">
                <MapComponent />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute bottom-8 left-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 pointer-events-none opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                    <p className="text-white text-xs font-bold uppercase tracking-widest leading-relaxed">Global Heritage Node Override Active</p>
                </div>
            </div>
        </div>

        {/* Recent Feedback Section */}
        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-[3rem] shadow-2xl p-10 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                    <MessageSquare className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-serif text-black dark:text-white">Recent Feedback</h3>
                </div>
            </div>

            <div className="space-y-6">
                {(() => {
                    const feedback = siteFeedback;
                    if (feedback.length === 0) {
                        return (
                            <div className="py-12 text-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2rem]">
                                <p className="text-gray-400 font-serif italic">Silence in the halls of feedback...</p>
                            </div>
                        );
                    }
                    return feedback.slice(0, 5).map((item) => (
                        <div key={item.id} className="bg-white dark:bg-gray-800/40 p-6 rounded-[2rem] border border-gray-50 dark:border-gray-700/50 hover:scale-[1.01] transition-all duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 font-black text-sm">
                                        {item.userEmail.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-black dark:text-white">{item.userEmail}</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{new Date(item.timestamp).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star size={12} fill="currentColor" />
                                    <span className="text-sm font-black">{item.rating}</span>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm italic leading-relaxed">"{item.comment}"</p>
                        </div>
                    ));
                })()}
            </div>
        </div>
    </div>
);

export const UsersTab = ({ users, filter, setFilter, onDeleteUser }) => {
    const filteredUsers = (filter === 'all'
        ? [...users]
        : users.filter(user => user.role === filter))
        .sort((a, b) => new Date(b.joinedAt || 0) - new Date(a.joinedAt || 0));

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] mb-3">Resident Management</p>
                    <h2 className="text-4xl font-serif text-black dark:text-white capitalize">
                        {filter === 'all' ? 'The Collective' : `${filter} Directory`}
                    </h2>
                </div>

                <div className="flex flex-wrap gap-2 p-1.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-100 dark:border-gray-700">
                    {['all', 'user', 'partner', 'admin'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${filter === f
                                ? 'bg-black dark:bg-[#D4AF37] text-white dark:text-black shadow-lg'
                                : 'text-gray-400 hover:text-black dark:hover:text-white'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </header>

            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800">
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Identity</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Role</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Contact</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Date</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {filteredUsers.map((user, index) => (
                                <tr key={index} className="group hover:bg-white dark:hover:bg-gray-800/80 transition-colors">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-5">
                                            <div className="h-14 w-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-black text-xl shadow-inner">
                                                {user.fullName ? user.fullName.charAt(0).toUpperCase() : '?'}
                                            </div>
                                            <div>
                                                <div className="font-serif text-lg text-black dark:text-white leading-tight mb-1">{user.fullName}</div>
                                                <div className="text-xs text-gray-400 font-medium lowercase tracking-tighter">{user.email || 'No email'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest
                                        ${user.role === 'admin' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600' :
                                                user.role === 'partner' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600' :
                                                    'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="text-xs font-bold text-gray-500">{user.phone || '₹€“'}</div>
                                    </td>
                                    <td className="px-10 py-8 text-xs font-bold text-gray-400">
                                        {user.joinedAt ? new Date(user.joinedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Heritage Epoch'}
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <button
                                            onClick={() => onDeleteUser(user.email)}
                                            className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
                                        >
                                            <X size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


export const InvitationsTab = ({ showNotification }) => {
    const [invites, setInvites] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        let allApps = [];

        // 1. Try Supabase
        try {
            // Use local supabase instance
            if (supabase) {
                const { data, error } = await supabase
                    .from('partner_applications')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (!error && data) {
                    allApps = data.map(inv => ({
                        id: inv.id,
                        partnerName: inv.full_name,
                        partnerEmail: inv.email,
                        spotName: inv.spot_name,
                        status: inv.status,
                        timestamp: inv.created_at,
                        source: 'cloud'
                    }));
                }
            }
        } catch (err) {
            console.warn("Supabase fetch failed for apps:", err);
        }

        // 2. Load Local Invites
        const local = JSON.parse(localStorage.getItem('collaboration_invites') || '[]');
        const localApps = local.map(inv => ({
            ...inv,
            source: 'local',
            // Ensure schema compatibility
            partnerName: inv.partnerName || inv.full_name,
            partnerEmail: inv.partnerEmail || inv.email,
            timestamp: inv.timestamp || inv.created_at
        }));

        // 3. Merge
        const combined = [...allApps, ...localApps].sort((a, b) =>
            new Date(b.timestamp) - new Date(a.timestamp)
        );
        setInvites(combined);
    };

    const handleStatusUpdate = async (invite, newStatus) => {
        try {
            // Use local supabase instance

            // 1. Update Cloud (if applicable)
            if (supabase && invite.source === 'cloud') {
                const { error: updateError } = await supabase
                    .from('partner_applications')
                    .update({ status: newStatus })
                    .eq('id', invite.id);

                if (updateError) throw updateError;
            }

            // 2. Update Local (always, to be safe or if local source)
            const local = JSON.parse(localStorage.getItem('collaboration_invites') || '[]');
            const updatedLocal = local.map(inv => {
                if (inv.id === invite.id || inv.partnerEmail === invite.partnerEmail) {
                    return { ...inv, status: newStatus };
                }
                return inv;
            });
            localStorage.setItem('collaboration_invites', JSON.stringify(updatedLocal));

            // 3. Update UI state
            setInvites(prev => prev.map(inv =>
                (inv.id === invite.id) ? { ...inv, status: newStatus } : inv
            ));

            // 4. If accepted, sync to the verified_partners table (Cloud)
            if (newStatus === 'accepted' && supabase) {
                await supabase
                    .from('verified_partners')
                    .upsert({
                        partner_name: invite.partnerName,
                        partner_email: invite.partnerEmail,
                        spot_name: invite.spotName,
                        category: invite.category || 'Heritage',
                        status: 'verified'
                    }, { onConflict: 'partner_email' });
            }
            showNotification(`Application ${newStatus}.`);
        } catch (err) {
            console.error("Error updating status:", err);
            showNotification("Protocol update failed.", "error");
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] mb-3">Partnership Protocol</p>
                <h2 className="text-5xl font-serif text-black dark:text-white truncate">Collaboration Requests</h2>
            </header>

            <div className="grid grid-cols-1 gap-6">
                {invites.length === 0 ? (
                    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-[2.5rem] p-24 text-center border border-dashed border-gray-200 dark:border-gray-800">
                        <Inbox size={64} className="mx-auto text-gray-200 dark:text-gray-700 mb-6" />
                        <p className="text-gray-400 font-serif text-2xl italic tracking-wide">No petitioners at the gate...</p>
                    </div>
                ) : (
                    invites.map(invite => (
                        <div key={invite.id} className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:scale-[1.01] transition-all duration-300">
                            <div className="flex items-center gap-8">
                                <div className="w-20 h-20 rounded-3xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 font-serif text-3xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                                    {invite.partnerName ? invite.partnerName.charAt(0) : '?'}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <h4 className="text-2xl font-serif text-black dark:text-white">{invite.partnerName}</h4>
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${invite.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                                            invite.status === 'accepted' ? 'bg-emerald-100 text-emerald-600' :
                                                'bg-rose-100 text-rose-600'
                                            }`}>
                                            {invite.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4 text-xs font-bold text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Handshake size={14} className="text-[#D4AF37]" />
                                            <span className="uppercase tracking-widest">{invite.spotName}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} />
                                            <span>{new Date(invite.timestamp).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {invite.status === 'pending' && (
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleStatusUpdate(invite, 'rejected')}
                                        className="h-14 w-14 flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-2xl transition-all"
                                    >
                                        <X size={24} />
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(invite, 'accepted')}
                                        className="h-14 px-10 bg-black dark:bg-[#D4AF37] text-white dark:text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:scale-105 transition-all"
                                    >
                                        Accept Invite
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export const SettingsTab = ({ settings, onToggle, loadUsers }) => {
    const downloadCSV = (filename, content) => {
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/csv' });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
    };

    const handleExportUsers = () => {
        const users = JSON.parse(localStorage.getItem('usersDB') || '[]');
        if (!users.length) {
            alert('No residents found in registry.');
            return;
        }

        // Sanitize data: Remove sensitive fields like passwords
        const sanitizedUsers = users.map(({ password, confirmPassword, ...rest }) => rest);

        const headers = Object.keys(sanitizedUsers[0]).join(',');
        const rows = sanitizedUsers.map(u => Object.values(u).map(v => `"${v}"`).join(',')).join('\n');
        downloadCSV('mysuru_residents.csv', headers + '\n' + rows);
    };

    const handleClearCache = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] mb-3">Core Configuration</p>
                <h2 className="text-5xl font-serif text-black dark:text-white truncate">Administrative Settings</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Visual Governance (State Toggles) */}
                <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl">
                            <Shield className="h-6 w-6 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-serif text-black dark:text-white">General Governance</h3>
                    </div>
                    {/* Keeps existing toggles */}
                    <div className="space-y-4">
                        <AdminSettingItem icon={<Globe />} label="Public Registration" description="Allow new user identities" checked={settings.publicRegistration} onToggle={() => onToggle('publicRegistration')} />
                        <AdminSettingItem icon={<Lock />} label="Partner Verification" description="Require manual approval" checked={settings.partnerVerification} onToggle={() => onToggle('partnerVerification')} />
                        <AdminSettingItem icon={<Bell />} label="Global Broadcasts" description="Enable announcements" checked={settings.globalBroadcasts} onToggle={() => onToggle('globalBroadcasts')} />
                    </div>
                </div>

                {/* Data Actions (New) */}
                <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                            <Database className="h-6 w-6 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-serif text-black dark:text-white">Data Management</h3>
                    </div>

                    <div className="space-y-4">
                        <button onClick={handleExportUsers} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all group">
                            <div className="flex items-center gap-4">
                                <Download className="text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" size={20} />
                                <div className="text-left">
                                    <h4 className="text-sm font-bold text-black dark:text-white">Export Registry</h4>
                                    <p className="text-[10px] text-gray-400 font-medium">Download resident data (CSV)</p>
                                </div>
                            </div>
                        </button>

                        <button onClick={loadUsers} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all group">
                            <div className="flex items-center gap-4">
                                <RefreshCcw className="text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" size={20} />
                                <div className="text-left">
                                    <h4 className="text-sm font-bold text-black dark:text-white">Refresh Nodes</h4>
                                    <p className="text-[10px] text-gray-400 font-medium">Re-synchronize with database</p>
                                </div>
                            </div>
                        </button>

                        <button onClick={handleClearCache} className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-all group border border-transparent hover:border-red-200">
                            <div className="flex items-center gap-4">
                                <Trash2 className="text-red-400 group-hover:text-red-600 transition-colors" size={20} />
                                <div className="text-left">
                                    <h4 className="text-sm font-bold text-red-600 dark:text-red-400">Purge Local Cache</h4>
                                    <p className="text-[10px] text-red-400/70 font-medium">Clear app state & logout</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const AdminSettingItem = ({ icon, label, description, checked, onToggle }) => (
    <div
        onClick={onToggle}
        className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 rounded-2xl transition-all cursor-pointer"
    >
        <div className="flex items-center gap-4">
            <div className="text-gray-400">{icon}</div>
            <div>
                <h4 className="text-sm font-bold text-black dark:text-white">{label}</h4>
                <p className="text-[10px] text-gray-400 font-medium">{description}</p>
            </div>
        </div>
        <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${checked ? 'bg-black dark:bg-[#D4AF37]' : 'bg-gray-200 dark:bg-gray-800'}`}>
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ${checked ? 'translate-x-7' : 'translate-x-1'}`}></div>
        </div>
    </div>
);


export const AuthPage = ({ onLogin, onSignUp }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    // Login State
    const [loginIdentifier, setLoginIdentifier] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Sign-Up State
    const [signUpData, setSignUpData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        agreeToTerms: false
    });
    const [signUpErrors, setSignUpErrors] = useState({});
    const [showSignUpPassword, setShowSignUpPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // --- Login Handlers ---
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');
        setIsLoggingIn(true);

        // 1. Quick Testing Credentials (REMOVED FOR SECURITY)
        // Hardcoded backdoors have been removed to ensure production security.


        // 2. Local Registry Check (Username support)
        const usersDB = JSON.parse(localStorage.getItem('usersDB') || '[]');
        const localUser = usersDB.find(u => u.email === loginIdentifier || u.fullName.toLowerCase() === loginIdentifier.toLowerCase());

        // SECURITY NOTICE: This logic allowed password-less login for local usernames.
        // It has been disabled to ensure the website is safe.
        /*
        // If it's a username login or known local user, let them in immediately
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginIdentifier);
        if (!isEmail && localUser) {
            localStorage.setItem('userData', JSON.stringify(localUser));
            onLogin(localUser.role, localUser);
            setIsLoggingIn(false);
            return;
        }
        */

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginIdentifier);

        // 3. Supabase Cloud Check
        if (supabase) {
            if (!isEmail) {
                setLoginError('Security Update: Please use your Email Address to log in. Username login is no longer supported.');
                setIsLoggingIn(false);
                return;
            }

            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: loginIdentifier,
                    password: loginPassword
                });

                if (!error && data.user) {
                    const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
                    const role = profile?.role || 'user';
                    onLogin(role, { ...profile, email: data.user.email });
                    setIsLoggingIn(false);
                    return;
                }
            } catch (err) {
                console.error("Cloud login attempt failed");
            }
        }

        // 4. Final Fallback (For unverified Supabase emails stored locally)
        // 4. Fallback: If Supabase login failed or wasn't available, we CANNOT verify password locally anymore.
        // We only allow login if Supabase verified it, OR if we are in a pure offline demo mode where we don't check security.
        // However, for strict security requested by USER, we should not allow fallback login if Supabase exists.

        if (!supabase && localUser) {
            // DEMO MODE ONLY: If no Supabase client exists, allow simplistic login
            localStorage.setItem('userData', JSON.stringify(localUser));
            onLogin(localUser.role, localUser);
        } else if (localUser && !supabase) {
            // This branch is redundant but keeps logic clear: if Supabase exists, we already tried and failed above.
            // So we do NOT allow local password check because we deleted local passwords.
        } else {
            setLoginError('No account found or incorrect credentials.');
        }
        setIsLoggingIn(false);
    };

    // --- Sign-Up Handlers ---
    const validateSignUp = () => {
        const newErrors = {};
        if (!signUpData.fullName.trim()) newErrors.fullName = 'Required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!signUpData.email || !emailRegex.test(signUpData.email)) newErrors.email = 'Invalid email';
        if (signUpData.password.length < 8) {
            newErrors.password = 'Min 8 chars';
        } else if (!/(?=.*[a-z])/.test(signUpData.password)) {
            newErrors.password = 'Need lowercase letter';
        } else if (!/(?=.*[A-Z])/.test(signUpData.password)) {
            newErrors.password = 'Need uppercase letter';
        } else if (!/(?=.*\d)/.test(signUpData.password)) {
            newErrors.password = 'Need a number';
        } else if (!/(?=.*[@$!%*?&#])/.test(signUpData.password)) {
            newErrors.password = 'Need special char (@$!%*?&#)';
        }
        if (signUpData.password !== signUpData.confirmPassword) newErrors.confirmPassword = 'No match';
        if (!signUpData.agreeToTerms) newErrors.agreeToTerms = 'Required';
        setSignUpErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [verificationSent, setVerificationSent] = useState(false);

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (!validateSignUp()) return;

        const newUser = {
            fullName: signUpData.fullName,
            email: signUpData.email,
            phone: signUpData.phone,
            // Password intentionally omitted for security - stored only in Supabase
            role: signUpData.role,
            joinedAt: new Date().toISOString(),
            status: 'Active'
        };

        /* LEGACY LOCAL STORAGE - DISABLED FOR SECURITY
        const usersDB = JSON.parse(localStorage.getItem('usersDB') || '[]');
        if (!usersDB.some(u => u.email === signUpData.email)) {
             usersDB.push(newUser);
             localStorage.setItem('usersDB', JSON.stringify(usersDB));
        }
        */

        if (!supabase) {
            localStorage.setItem('userData', JSON.stringify(newUser));
            onSignUp(signUpData.role, newUser);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email: signUpData.email,
                password: signUpData.password,
                options: { data: { full_name: signUpData.fullName, role: signUpData.role, phone: signUpData.phone } }
            });
            if (error) throw error;

            // If email confirmation is ON, session will be null
            if (data.user && !data.session) {
                setVerificationSent(true);
            } else if (data.session) {
                // If email confirmation is OFF, we get a session immediately
                onSignUp(signUpData.role, { full_name: signUpData.fullName, email: signUpData.email, phone: signUpData.phone, role: signUpData.role });
            }
        } catch (error) {
            console.error("Sign Up Error:", error);

            let displayError = error.message;
            if (error.message.includes("Database error")) {
                displayError = "System Update: We are upgrading our heritage registry. Please try again later.";
                console.warn("DEVELOPER NOTE: This error is likely coming from a Postgres Trigger in Supabase (e.g., 'handle_new_user'). Check if the Trigger is failing to insert into the 'profiles' table, possibly due to RLS policies or missing columns.");
            }

            setSignUpErrors(prev => ({ ...prev, submit: displayError }));
        }
    };

    const handleSignUpChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSignUpData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    return (
        <div className="min-h-screen bg-mysore-light dark:bg-mysore-dark flex items-center justify-center p-6 transition-colors duration-500 overflow-hidden font-sans">
            {/* Background Decorative Blurs */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/20 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-black/10 rounded-full blur-[150px]"></div>
            </div>

            {/* Main Auth Container */}
            <div className={`relative w-full max-w-6xl h-[85vh] bg-white/70 dark:bg-gray-900/70 backdrop-blur-3xl rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-1000 border border-white/20 dark:border-gray-800`}>

                {/* Visual Branding Overlay (The Sliding Part) */}
                <div
                    className={`absolute top-0 bottom-0 z-30 w-full md:w-[60%] transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) transform overflow-hidden ${isSignUp ? 'translate-x-0 md:translate-x-[66.6%]' : 'translate-x-0 md:translate-x-0'
                        }`}
                >
                    <div className="absolute inset-0 z-40 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <img
                        src="/src/assets/mysore-palace-daytime.jpg"
                        alt="Mysore Palace"
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[2500ms] ${isSignUp ? 'scale-125 md:translate-x-10' : 'scale-110 translate-x-0'}`}
                    />

                    <div className="absolute bottom-16 left-16 right-16 z-50 text-white">
                        <p className="text-sm font-bold uppercase tracking-[0.6em] text-[#D4AF37] mb-4 drop-shadow-md">Beyond the Palace</p>
                        <h2 className="text-5xl lg:text-7xl font-serif mb-8 drop-shadow-lg leading-tight">Discover the <br />Soul of Mysuru</h2>
                        <p className="text-lg text-gray-200 max-w-md drop-shadow-md font-light leading-relaxed opacity-90">
                            Uncover hidden gems, local artisans & authentic experiences that usually go unexplored.
                        </p>
                    </div>
                </div>

                {/* Form Panels Container */}
                <div className="relative w-full h-full flex flex-col md:flex-row">

                    {/* LEFT PANEL (Sign Up) */}
                    <div className={`w-full md:w-[40%] h-full flex items-center justify-center p-8 lg:p-16 transition-all duration-1000 ease-in-out ${isSignUp ? 'opacity-100 translate-x-0 z-20' : 'opacity-0 translate-x-20 pointer-events-none z-10'
                        }`}>
                        <div className="w-full max-w-sm">
                            <div className="mb-10">
                                <h1 className="text-4xl font-serif text-gray-900 dark:text-white mb-4">Create Account</h1>
                            </div>

                            {verificationSent ? (
                                <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
                                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                                        <Mail className="w-10 h-10 text-emerald-600" />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-3xl font-serif text-gray-900 dark:text-white">Heritage Registry Active</h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                            Your account has been recorded in the Supabase database.
                                            A verification scroll was sent to <span className="font-bold text-gray-900 dark:text-white">{signUpData.email}</span>.
                                        </p>
                                        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/20">
                                            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest">Success</p>
                                            <p className="text-[10px] text-emerald-500 font-medium">Data preserved. You may proceed to explore while verification is pending.</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => {
                                                const newUser = {
                                                    fullName: signUpData.fullName,
                                                    email: signUpData.email,
                                                    phone: signUpData.phone,
                                                    role: signUpData.role,
                                                    joinedAt: new Date().toISOString(),
                                                };
                                                localStorage.setItem('userData', JSON.stringify(newUser));
                                                onSignUp(signUpData.role, newUser);
                                            }}
                                            className="w-full py-5 bg-black dark:bg-[#D4AF37] text-white dark:text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:scale-[1.02] transition-all"
                                        >
                                            Proceed to Dashboard
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsSignUp(false);
                                                setVerificationSent(false);
                                            }}
                                            className="w-full py-5 border-2 border-gray-100 dark:border-gray-800 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all"
                                        >
                                            Sign In Manually
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <form onSubmit={handleSignUpSubmit} className="space-y-4">
                                        <div className="flex gap-4 mb-8">
                                            {['user', 'partner'].map(r => (
                                                <button
                                                    key={r}
                                                    type="button"
                                                    onClick={() => setSignUpData(prev => ({ ...prev, role: r }))}
                                                    className={`flex-1 flex items-center justify-center gap-3 py-4 px-4 rounded-2xl border transition-all duration-300 ${signUpData.role === r
                                                        ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]/20 shadow-sm'
                                                        : 'border-gray-200 dark:border-gray-800 text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-transparent'
                                                        }`}
                                                >
                                                    {r === 'user' ? <User size={18} strokeWidth={2} /> : <Handshake size={18} strokeWidth={2} />}
                                                    <span className="text-xs font-bold uppercase tracking-widest">{r}</span>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="space-y-4">
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#D4AF37] transition-colors" />
                                                <input type="text" name="fullName" value={signUpData.fullName} onChange={handleSignUpChange} placeholder="Full Name" className={`w-full pl-12 pr-4 py-4 border ${signUpErrors.fullName ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'} rounded-2xl bg-gray-50 dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all`} />
                                                {signUpErrors.fullName && <p className="text-[10px] text-red-500 font-bold mt-1 px-4">{signUpErrors.fullName}</p>}
                                            </div>
                                            <div className="relative group">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#D4AF37] transition-colors" />
                                                <input type="email" name="email" value={signUpData.email} onChange={handleSignUpChange} placeholder="Email" className={`w-full pl-12 pr-4 py-4 border ${signUpErrors.email ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'} rounded-2xl bg-gray-50 dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all`} />
                                                {signUpErrors.email && <p className="text-[10px] text-red-500 font-bold mt-1 px-4">{signUpErrors.email}</p>}
                                            </div>
                                            <div className="relative group">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#D4AF37] transition-colors" />
                                                <input type="tel" name="phone" value={signUpData.phone} onChange={handleSignUpChange} placeholder="Phone Number" className="w-full pl-12 pr-4 py-4 border border-gray-100 dark:border-gray-800 rounded-2xl bg-gray-50 dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="relative">
                                                    <input
                                                        type={showSignUpPassword ? "text" : "password"}
                                                        name="password"
                                                        value={signUpData.password}
                                                        onChange={handleSignUpChange}
                                                        placeholder="Password"
                                                        className={`w-full pl-5 pr-10 py-4 border ${signUpErrors.password ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'} rounded-2xl bg-gray-50 dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37] transition-colors"
                                                    >
                                                        {showSignUpPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                    </button>
                                                    {signUpErrors.password && <p className="text-[10px] text-red-500 font-bold mt-1 px-1">{signUpErrors.password}</p>}
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        name="confirmPassword"
                                                        value={signUpData.confirmPassword}
                                                        onChange={handleSignUpChange}
                                                        placeholder="Confirm"
                                                        className={`w-full pl-5 pr-10 py-4 border ${signUpErrors.confirmPassword ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'} rounded-2xl bg-gray-50 dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37] transition-colors"
                                                    >
                                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                    </button>
                                                    {signUpErrors.confirmPassword && <p className="text-[10px] text-red-500 font-bold mt-1 px-1">{signUpErrors.confirmPassword}</p>}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 px-2 py-2">
                                                <input
                                                    type="checkbox"
                                                    name="agreeToTerms"
                                                    id="agreeToTerms"
                                                    checked={signUpData.agreeToTerms}
                                                    onChange={handleSignUpChange}
                                                    className="w-4 h-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                                                />
                                                <label htmlFor="agreeToTerms" className={`text-[10px] font-bold uppercase tracking-widest ${signUpErrors.agreeToTerms ? 'text-red-500' : 'text-gray-400'}`}>
                                                    I agree to the Heritage Protocol
                                                </label>
                                            </div>
                                        </div>

                                        {signUpErrors.submit && (
                                            <p className="text-red-500 text-[10px] font-black text-center uppercase tracking-widest bg-red-50 dark:bg-red-900/10 py-4 rounded-2xl border border-red-100 dark:border-red-900/20">
                                                {signUpErrors.submit}
                                            </p>
                                        )}

                                        <button type="submit" className="w-full py-5 bg-black dark:bg-[#D4AF37] text-white dark:text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all mt-6 shadow-black/20">
                                            Create Heritage ID
                                        </button>
                                    </form>

                                    <p className="mt-12 text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                        Already a resident? {' '}
                                        <button onClick={() => setIsSignUp(false)} className="text-[#D4AF37] ml-2 hover:underline">Log In</button>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* RIGHT PANEL (Login) */}
                    <div className={`w-full md:w-[40%] h-full ml-auto flex items-center justify-center p-8 lg:p-16 transition-all duration-1000 ease-in-out ${!isSignUp ? 'opacity-100 translate-x-0 z-20' : 'opacity-0 -translate-x-20 pointer-events-none z-10'
                        }`}>
                        <div className="w-full max-w-sm">
                            <div className="mb-12 text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start mb-10 group cursor-default">
                                    <span className="text-5xl font-serif text-black dark:text-white tracking-tighter group-hover:tracking-normal transition-all duration-700">Mysuru</span>
                                    <span className="text-5xl font-bold text-[#D4AF37] ml-2">Marga</span>
                                </div>
                                <h1 className="text-4xl font-serif text-gray-900 dark:text-white mb-3">Welcome Back</h1>
                                <p className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">Access the heritage core</p>
                            </div>

                            <form onSubmit={handleLoginSubmit} className="space-y-6">
                                <div className="space-y-5">
                                    <div className="relative group">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#D4AF37] transition-colors" />
                                        <input
                                            type="text"
                                            value={loginIdentifier}
                                            onChange={(e) => setLoginIdentifier(e.target.value)}
                                            placeholder="Email Address"
                                            className="w-full pl-16 pr-6 py-6 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all shadow-inner"
                                            required
                                        />
                                    </div>
                                    <div className="relative group">
                                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#D4AF37] transition-colors" />
                                        <input
                                            type={showLoginPassword ? 'text' : 'password'}
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            placeholder="Password"
                                            className="w-full pl-16 pr-16 py-6 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all shadow-inner"
                                            required
                                        />
                                        <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37] transition-colors">
                                            {showLoginPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                                        </button>
                                    </div>
                                </div>

                                {loginError && <p className="text-red-500 text-[10px] font-black text-center uppercase tracking-widest bg-red-50 dark:bg-red-900/10 py-4 rounded-2xl border border-red-100 dark:border-red-900/20">{loginError}</p>}

                                <button
                                    type="submit"
                                    disabled={isLoggingIn}
                                    className="w-full py-6 bg-black dark:bg-[#D4AF37] text-white dark:text-black rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.4em] shadow-[0_25px_50px_-15px_rgba(212,175,55,0.4)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-500 mt-4 flex items-center justify-center"
                                >
                                    {isLoggingIn ? (
                                        <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        'Enter The Gates'
                                    )}
                                </button>
                            </form>

                            <p className="mt-16 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                New to the City? {' '}
                                <button onClick={() => setIsSignUp(true)} className="text-[#D4AF37] ml-2 hover:underline">Register Now</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LayoutDashboard,
    Store,
    MessageSquare,
    Settings,
    LogOut,
    TrendingUp,
    Users,
    Star,
    Camera,
    Plus,
    Clock,
    MapPin,
    Utensils,
    Palette,
    Sparkles,
    Send,
    Inbox,
    Calendar,
    Ticket

export const PartnerDashboard = ({ onLogout, partnerData }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [feedbacks, setFeedbacks] = useState([]);
    const [confirmModal, setConfirmModal] = useState({ show: false, title: '', message: '', onConfirm: null, type: 'danger' });
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

    React.useEffect(() => {
        loadSpotFeedback();
    }, [partnerData]);

    const loadSpotFeedback = async () => {
        try {
            // Use local supabase instance
            if (supabase && partnerData?.spotName) {
                const { data, error } = await supabase
                    .from('partner_feedback')
                    .select('*')
                    .eq('spot_name', partnerData.spotName)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setFeedbacks(data || []);
            }
        } catch (err) {
            console.error("Error loading spot feedback:", err);
            // Local fallback
            const local = JSON.parse(localStorage.getItem('user_feedback') || '[]');
            setFeedbacks(local);
        }
    };

    const realReviewsCount = feedbacks.length;
    const realAvgRating = feedbacks.length > 0
        ? (feedbacks.reduce((acc, f) => acc + (f.rating || 5), 0) / feedbacks.length).toFixed(1)
        : "5.0";

    // Mock data for the partner's spot with dynamic reviews/rating
    const spotData = {
        name: partnerData?.spotName || "Karanji Lake",
        category: partnerData?.category || "Nature",
        rating: realAvgRating,
        reviewsCount: realReviewsCount,
        totalVisits: 842 + realReviewsCount, // Added real reviews to visit count for demo
        status: "Online",
        images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
        description: "Serene nature trail with butterfly park and panoramic palace views. A pristine sanctuary in the heart of Mysore.",
        openingHours: "6:00 AM - 8:00 PM",
        location: "Siddhartha Layout, Mysuru"
    };

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <PartnerOverviewTab spot={spotData} setActiveTab={setActiveTab} feedbacks={feedbacks} />;
            case 'manage':
                return <ManageSpotTab spot={spotData} showNotification={showNotification} />;
            case 'reviews':
                return <ReviewsTab feedbacks={feedbacks} />;
            case 'invites':
                return <PartnerInvitationsTab partner={partnerData} spot={spotData} showNotification={showNotification} />;
            case 'events':
                return <EventsTab partner={partnerData} spot={spotData} setConfirmModal={setConfirmModal} showNotification={showNotification} />;
            case 'settings':
                return <PartnerSettingsTab partner={partnerData} />;
            default:
                return <PartnerOverviewTab spot={spotData} setActiveTab={setActiveTab} feedbacks={feedbacks} />;
        }
    };

    return (
        <div className="min-h-screen bg-mysore-light dark:bg-mysore-dark font-sans flex transition-colors duration-200">
            {/* Sidebar */}
            <aside className="w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-100 dark:border-gray-800 hidden md:flex flex-col fixed h-full z-30">
                <div className="p-8 border-b border-gray-100 dark:border-gray-800">
                    <h1 className="text-2xl font-serif text-black dark:text-white tracking-tight">
                        Mysuru <span className="font-bold text-[#D4AF37]">Partner</span>
                    </h1>
                </div>

                <nav className="flex-1 p-6 space-y-3">
                    <PartnerNavItem
                        icon={<LayoutDashboard />}
                        label="Dashboard"
                        active={activeTab === 'overview'}
                        onClick={() => setActiveTab('overview')}
                    />
                    <PartnerNavItem
                        icon={<Store />}
                        label="Manage Spot"
                        active={activeTab === 'manage'}
                        onClick={() => setActiveTab('manage')}
                    />
                    <PartnerNavItem
                        icon={<MessageSquare />}
                        label="Reviews"
                        active={activeTab === 'reviews'}
                        onClick={() => setActiveTab('reviews')}
                    />
                    <PartnerNavItem
                        icon={<Inbox />}
                        label="Invitations"
                        active={activeTab === 'invites'}
                        onClick={() => setActiveTab('invites')}
                    />
                    <PartnerNavItem
                        icon={<Calendar />}
                        label="Events & Offers"
                        active={activeTab === 'events'}
                        onClick={() => setActiveTab('events')}
                    />
                    <PartnerNavItem
                        icon={<Settings />}
                        label="Settings"
                        active={activeTab === 'settings'}
                        onClick={() => setActiveTab('settings')}
                    />
                </nav>

                <div className="p-6 border-t border-gray-100 dark:border-gray-800">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all font-bold text-sm"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 md:p-12 h-screen overflow-y-auto custom-scrollbar">
                <div className="max-w-6xl mx-auto">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-4xl font-serif text-black dark:text-white">
                                Welcome, {partnerData?.fullName?.split(' ')[0] || "Partner"}
                            </h2>
                            <p className="text-gray-400 dark:text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">
                                Managing <span className="text-[#D4AF37]">"{spotData.name}"</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-black uppercase tracking-widest text-green-600 dark:text-green-400">Live Status</span>
                        </div>
                    </header>

                    {renderContent()}
                </div>
            </main>

            {/* Custom Confirmation Modal */}
            {confirmModal.show && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setConfirmModal(prev => ({ ...prev, show: false }))}></div>
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 w-full max-w-md relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-8 sm:p-10">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${confirmModal.type === 'danger' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                                <Settings className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-serif text-black dark:text-white mb-3">{confirmModal.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">{confirmModal.message}</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => setConfirmModal(prev => ({ ...prev, show: false }))}
                                    className="flex-1 py-4 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:text-black dark:hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmModal.onConfirm}
                                    className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95 ${confirmModal.type === 'danger' ? 'bg-rose-500 text-white shadow-rose-500/20' : 'bg-black dark:bg-[#D4AF37] text-white dark:text-black shadow-black/20'}`}
                                >
                                    Confirm Action
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Toast Notification */}
            {notification.show && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[101] animate-in slide-in-from-bottom-10 duration-500">
                    <div className="bg-black dark:bg-gray-800 text-white px-8 py-4 rounded-[1.5rem] shadow-2xl flex items-center gap-4 border border-white/10">
                        <div className={`w-2 h-2 rounded-full ${notification.type === 'error' ? 'bg-rose-500' : 'bg-emerald-500'} animate-pulse`}></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{notification.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export const PartnerNavItem = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${active
            ? 'bg-black dark:bg-[#D4AF37] text-white dark:text-black shadow-xl shadow-[#D4AF37]/10 translate-x-1'
            : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
            }`}
    >
        {React.cloneElement(icon, { size: 20 })}
        <span>{label}</span>
    </button>
);


export const PartnerOverviewTab = ({ spot, setActiveTab, feedbacks }) => (
    <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <PartnerStatCard
                label="Reviews"
                value={spot.reviewsCount}
                trend="+5 new"
                icon={<MessageSquare className="text-purple-600" />}
                bgColor="bg-purple-50 dark:bg-purple-900/20"
                onClick={() => setActiveTab('reviews')}
            />
            <PartnerStatCard
                label="Profile Views"
                value="8"
                trend="+18%"
                icon={<Users className="text-emerald-600" />}
                bgColor="bg-emerald-50 dark:bg-emerald-900/20"
                onClick={() => setActiveTab('overview')}
            />
        </div>

        {/* Live Heritage Map Spotlight */}
        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-[2.5rem] shadow-xl p-10 border border-gray-100 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h3 className="text-2xl font-serif text-black dark:text-white">Heritage Map Presence</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Your spot's spatial identity in the Mysuru ecosystem</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Live Elevation</span>
                </div>
            </div>
            <div className="h-[400px] rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-700 relative shadow-inner group">
                <MapComponent interactive={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-8 left-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 pointer-events-none opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <p className="text-white text-xs font-bold uppercase tracking-widest">Sovereign Explorer View</p>
                </div>
            </div>
        </div>

        {/* Spot Preview */}
        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-xl border border-gray-100 dark:border-gray-800 transition-all hover:scale-[1.01]">
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="w-full lg:w-1/3 h-64 rounded-3xl overflow-hidden shadow-2xl relative">
                    <img src="/karanji.jpg" alt="Spot Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-4 py-1.5 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-[#D4AF37]/20">{spot.category}</span>
                    </div>
                    <h3 className="text-3xl font-serif text-black dark:text-white mb-4">{spot.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 line-clamp-2 md:line-clamp-none mb-8 font-medium leading-relaxed text-sm">
                        {spot.description}
                    </p>
                    <div className="flex flex-wrap gap-8 text-[11px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        <div className="flex items-center gap-3">
                            <MapPin size={16} className="text-[#D4AF37]" />
                            <span>{spot.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock size={16} className="text-[#D4AF37]" />
                            <span>{spot.openingHours}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black dark:bg-[#D4AF37] rounded-[2rem] p-10 text-white dark:text-black relative overflow-hidden group shadow-2xl">
                <div className="relative z-10">
                    <h3 className="text-2xl font-serif mb-2">Boost your visibility</h3>
                    <p className="opacity-80 font-medium mb-8 text-sm">Create a special offer for visitors and get featured on the "Near You" section.</p>
                    <button
                        onClick={() => setActiveTab('events')}
                        className="bg-[#D4AF37] dark:bg-black text-black dark:text-[#D4AF37] px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl text-sm"
                    >
                        <Sparkles size={20} />
                        <span>Create Offer</span>
                    </button>
                </div>
                <Sparkles className="absolute -bottom-4 -right-4 w-40 h-40 opacity-10 group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-10 border border-gray-100 dark:border-gray-800 shadow-xl flex flex-col justify-center">
                <h3 className="text-2xl font-serif text-black dark:text-white mb-2">Update your photos</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium text-sm">Clear photos of your work and workspace increase visitor trust by 40%.</p>
                <div className="flex items-center gap-3">
                    <button className="bg-gray-50 dark:bg-gray-800 text-black dark:text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-sm shadow-sm ring-1 ring-gray-100 dark:ring-gray-800">
                        <Camera size={20} className="text-[#D4AF37]" />
                        <span>Upload Photos</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
);


export const ManageSpotTab = ({ spot }) => (
    <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden px-10 py-12">
        <h3 className="text-3xl font-serif text-black dark:text-white mb-10">Curation Details</h3>
        <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Heritage Spot Name</label>
                    <input
                        type="text"
                        defaultValue={spot.name}
                        className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all font-medium text-sm shadow-inner"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Classification</label>
                    <select
                        defaultValue="Hidden Gem"
                        className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all font-bold text-sm shadow-inner appearance-none cursor-pointer"
                    >
                        <option>Local Artisan</option>
                        <option>Hyperlocal Food</option>
                        <option>Hidden Gem</option>
                        <option>Cultural Experience</option>
                        <option>Nature</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Soulful Narrative</label>
                <textarea
                    rows="4"
                    defaultValue={spot.description}
                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all font-medium text-sm shadow-inner resize-none"
                ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Sacred Location</label>
                    <div className="relative">
                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={18} />
                        <input
                            type="text"
                            defaultValue={spot.location}
                            className="w-full pl-14 pr-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37]/20 transition-all font-medium text-sm shadow-inner"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Traditional Hours</label>
                    <div className="relative">
                        <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={18} />
                        <input
                            type="text"
                            defaultValue={spot.openingHours}
                            className="w-full pl-14 pr-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37]/20 transition-all font-medium text-sm shadow-inner"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Contact Presence</label>
                    <input
                        type="text"
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37]/20 transition-all font-medium text-sm shadow-inner"
                    />
                </div>
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        showNotification("Heritage records preserved.");
                    }}
                    className="bg-black dark:bg-[#D4AF37] text-white dark:text-black px-12 py-5 rounded-2xl font-black shadow-2xl shadow-[#D4AF37]/20 active:scale-95 transition-all text-xs uppercase tracking-[0.2em]"
                >
                    Preserve Changes
                </button>
            </div>
        </form>
    </div>
);

export const ReviewsTab = ({ feedbacks }) => (
    <div className="space-y-8">
        <h3 className="text-3xl font-serif text-black dark:text-white mb-4">Traveler Echoes</h3>
        <div className="space-y-6">
            {feedbacks.length === 0 ? (
                <div className="py-24 text-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-[2rem] border border-dashed border-gray-200 dark:border-gray-800">
                    <MessageSquare size={64} className="mx-auto text-gray-200 dark:text-gray-800 mb-6" />
                    <p className="text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest text-[10px]">No traveler echoes yet</p>
                </div>
            ) : (
                feedbacks.map((feedback, i) => (
                    <div key={feedback.id} className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-800 transition-all hover:translate-x-1 group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-black text-xl shadow-inner group-hover:scale-110 transition-transform">
                                    {feedback.userEmail ? feedback.userEmail.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{feedback.userEmail || "Anonymous Traveler"}</h4>
                                    <div className="flex text-[#D4AF37] mt-1.5 gap-0.5">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <Star key={star} size={12} className={star <= feedback.rating ? "fill-current" : "text-gray-300 dark:text-gray-600"} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                {new Date(feedback.timestamp).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed text-sm italic">
                            "{feedback.comment}"
                        </p>
                        <button className="mt-6 text-[#D4AF37] font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-2">
                            <MessageSquare size={14} />
                            <span>Acknowledge Thought</span>
                        </button>
                    </div>
                ))
            )}
        </div>
    </div>
);

export const PartnerSettingsTab = ({ partner }) => (
    <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 p-12">
        <h3 className="text-3xl font-serif text-black dark:text-white mb-12">Heritage Identity</h3>
        <div className="space-y-12">
            <div className="flex items-center gap-8 pb-12 border-b border-gray-100 dark:border-gray-800">
                <div className="w-24 h-24 rounded-3xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shadow-inner">
                    <Users size={40} />
                </div>
                <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{partner?.fullName || "Heritage Partner"}</h4>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1.5">{partner?.email || "curator@mysurumarga.com"}</p>
                </div>
                <button className="ml-auto bg-black dark:bg-[#D4AF37] text-white dark:text-black px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Relocate Photo</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">Echo Notifications</h4>
                    <p className="text-xs text-gray-400 font-medium mb-6">Receive spiritual alerts when traveler echoes are recorded.</p>
                    <div className="w-14 h-7 bg-[#D4AF37] rounded-full relative cursor-pointer ring-4 ring-[#D4AF37]/10">
                        <div className="absolute right-1 top-1 w-5 h-5 bg-black rounded-full shadow-lg"></div>
                    </div>
                </div>
                <div className="p-8 rounded-3xl bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">Heritage Visibility</h4>
                    <p className="text-xs text-gray-400 font-medium mb-6">Toggle your spot's presence in the physical soul of the app.</p>
                    <div className="w-14 h-7 bg-[#D4AF37] rounded-full relative cursor-pointer ring-4 ring-[#D4AF37]/10">
                        <div className="absolute right-1 top-1 w-5 h-5 bg-black rounded-full shadow-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


export const PartnerInvitationsTab = ({ partner, spot, showNotification }) => {
    const [invites, setInvites] = useState(() => {
        const stored = localStorage.getItem('collaboration_invites');
        const allInvites = stored ? JSON.parse(stored) : [];
        return allInvites.filter(inv => inv.partnerEmail === partner?.email);
    });

    const [isSending, setIsSending] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    React.useEffect(() => {
        loadInvites();
    }, [partner]);

    const loadInvites = async () => {
        let allInvites = [];

        // 1. Try Supabase
        try {
            // Use local supabase instance
            if (supabase && partner?.email) {
                const { data, error } = await supabase
                    .from('partner_applications')
                    .select('*')
                    .eq('email', partner.email)
                    .order('created_at', { ascending: false });

                if (!error && data) {
                    allInvites = data.map(inv => ({
                        id: inv.id,
                        partnerName: inv.full_name,
                        partnerEmail: inv.email,
                        spotName: inv.spot_name,
                        status: inv.status,
                        timestamp: inv.created_at,
                        source: 'cloud'
                    }));
                }
            }
        } catch (err) {
            console.warn("Supabase load failed, using local fallback only:", err);
        }

        // 2. Load Local Invites
        const local = JSON.parse(localStorage.getItem('collaboration_invites') || '[]');
        const partnerLocal = local.filter(inv => inv.partnerEmail === partner?.email)
            .map(inv => ({ ...inv, source: 'local' }));

        // 3. Merge and set
        const combined = [...allInvites, ...partnerLocal].sort((a, b) =>
            new Date(b.timestamp) - new Date(a.timestamp)
        );
        setInvites(combined);
    };

    const sendInvite = async () => {
        setIsSending(true);
        const timestamp = new Date().toISOString();
        const newInviteData = {
            id: partner?.id || Date.now(),
            partnerName: partner?.fullName || 'Partner',
            partnerEmail: partner?.email || 'N/A',
            spotName: spot.name,
            category: spot.category,
            status: 'pending',
            timestamp: timestamp
        };

        let transmitted = false;

        // 1. Try Supabase
        try {
            // Use local supabase instance
            if (supabase) {
                const { data, error } = await supabase
                    .from('partner_applications')
                    .insert([{
                        user_id: partner?.id,
                        full_name: partner?.fullName || 'Partner',
                        email: partner?.email || 'N/A',
                        spot_name: spot.name,
                        category: spot.category,
                        status: 'pending'
                    }])
                    .select();

                if (!error && data && data[0]) {
                    transmitted = true;
                }
            }
        } catch (err) {
            console.error("Cloud transmission skipped/failed:", err);
        }

        const local = JSON.parse(localStorage.getItem('collaboration_invites') || '[]');
        localStorage.setItem('collaboration_invites', JSON.stringify([newInviteData, ...local]));

        setInvites(prev => [newInviteData, ...prev]);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setIsSending(false);
    };

    return (
        <div className="space-y-10">
            <div className="bg-black dark:bg-[#D4AF37] rounded-[2.5rem] p-12 text-white dark:text-black shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                    <h3 className="text-3xl font-serif mb-3">Partner with Sovereignty</h3>
                    <p className="opacity-80 font-medium mb-10 max-w-lg text-sm leading-relaxed">Send a formal collaboration invite to the Heritage Administration to request verification badges, curated placement, or royal features.</p>
                    <button
                        onClick={sendInvite}
                        disabled={isSending}
                        className={`bg-[#D4AF37] dark:bg-black text-black dark:text-[#D4AF37] px-10 py-5 rounded-2xl font-black flex items-center gap-4 hover:scale-105 transition-all shadow-xl text-xs uppercase tracking-widest ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSending ? (
                            <div className="w-5 h-5 border-2 border-black dark:border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <Send size={20} />
                        )}
                        <span>{isSending ? 'Transmitting...' : 'Request Heritage Collaboration'}</span>
                    </button>
                    {showSuccess && (
                        <div className="mt-6 bg-emerald-500 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest animate-bounce inline-block shadow-lg">
                            Invitation Transmitted
                        </div>
                    )}
                </div>
                <Send className="absolute -bottom-6 -right-6 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-700" />
            </div>

            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden">
                <div className="px-10 py-8 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="text-2xl font-serif text-black dark:text-white">Request Chronicle</h3>
                </div>
                <div className="divide-y divide-gray-50 dark:divide-gray-800">
                    {invites.length === 0 ? (
                        <div className="py-24 text-center">
                            <Inbox size={64} className="mx-auto text-gray-200 dark:text-gray-800 mb-6" />
                            <p className="text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest text-[10px]">No recent requests</p>
                        </div>
                    ) : (
                        invites.map(invite => (
                            <div key={invite.id} className="px-10 py-8 flex items-center justify-between transition-all hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                                        <Send size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">Collaboration Protocol</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-2">
                                            <Clock size={12} className="text-[#D4AF37]" />
                                            <span>{new Date(invite.timestamp).toLocaleDateString()} at {new Date(invite.timestamp).toLocaleTimeString()}</span>
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ${invite.status === 'pending' ? 'bg-amber-500/10 text-amber-600 ring-amber-500/20' :
                                    invite.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20' :
                                        'bg-red-500/10 text-red-600 ring-red-500/20'
                                    }`}>
                                    {invite.status}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export const PartnerStatCard = ({ icon, label, value, trend, bgColor, onClick }) => (
    <div
        onClick={onClick}
        className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group cursor-pointer transition-all hover:-translate-y-1"
    >
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${bgColor}`}>
                    {React.cloneElement(icon, { size: 24 })}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full ring-1 ring-green-100 dark:ring-green-900/50">
                    {trend}
                </span>
            </div>
            <h4 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">{value}</h4>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{label}</p>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gray-50 dark:bg-gray-800/50 rounded-full scale-0 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
    </div>
);


export const EventsTab = ({ partner, spot, setConfirmModal, showNotification }) => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        date: '',
        type: 'Festival',
        price: 'Free'
    });

    React.useEffect(() => {
        loadEvents();
    }, [partner]);

    const loadEvents = async () => {
        setIsLoading(true);
        try {
            // Use local supabase instance
            if (supabase && partner?.email) {
                const { data, error } = await supabase
                    .from('heritage_events')
                    .select('*')
                    .eq('partner_email', partner.email)
                    .order('event_date', { ascending: true });

                if (error) throw error;
                setEvents(data || []);
            }
        } catch (err) {
            console.error("Error loading events:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        setIsCreating(true);
        try {
            // Use local supabase instance
            if (supabase) {
                const eventData = {
                    partner_email: partner.email,
                    spot_name: spot.name,
                    title: newEvent.title,
                    description: newEvent.description,
                    event_date: newEvent.date,
                    event_type: newEvent.type,
                    price: newEvent.price,
                    status: 'active'
                };

                const { data, error } = await supabase
                    .from('heritage_events')
                    .insert([eventData])
                    .select();

                if (error) throw error;

                if (data) {
                    setEvents(prev => [...prev, data[0]]);
                    setShowForm(false);
                    setNewEvent({ title: '', description: '', date: '', type: 'Festival', price: 'Free' });
                    showNotification("Event chronicle created.");
                }
            }
        } catch (err) {
            console.error("Failed to create event:", err);
            showNotification("Protocol failed.", "error");
        } finally {
            setIsCreating(false);
        }
    };

    const deleteEvent = async (id) => {
        setConfirmModal({
            show: true,
            title: 'Retire Event',
            message: 'Are you sure you want to retire this event from the chronicle? This action is permanent.',
            type: 'danger',
            onConfirm: async () => {
                try {
                    // Use local supabase instance
                    if (supabase) {
                        const { error } = await supabase
                            .from('heritage_events')
                            .delete()
                            .eq('id', id);

                        if (error) throw error;
                        setEvents(events.filter(e => e.id !== id));
                        showNotification("Chronicle entry removed.");
                    }
                } catch (err) {
                    console.error("Error deleting event:", err);
                    showNotification("Protocol update failed.", "error");
                }
                setConfirmModal(prev => ({ ...prev, show: false }));
            }
        });
    };

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-center">
                <h3 className="text-3xl font-serif text-black dark:text-white">Heritage Chronicles</h3>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-black dark:bg-[#D4AF37] text-white dark:text-black px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl text-xs uppercase tracking-widest"
                >
                    {showForm ? <Inbox size={18} /> : <Plus size={18} />}
                    <span>{showForm ? 'View Events' : 'Promote Event'}</span>
                </button>
            </div>

            {showForm ? (
                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-[2.5rem] p-12 border border-gray-100 dark:border-gray-800 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h4 className="text-2xl font-serif text-black dark:text-white mb-10">New Event Protocol</h4>
                    <form onSubmit={handleCreateEvent} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Event Title</label>
                                <input
                                    required
                                    type="text"
                                    value={newEvent.title}
                                    onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                                    placeholder="e.g. Dasara Workshop Special"
                                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 text-black dark:text-white focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Event Type</label>
                                <select
                                    value={newEvent.type}
                                    onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 text-black dark:text-white focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all font-bold cursor-pointer"
                                >
                                    <option>Festival</option>
                                    <option>Workshop</option>
                                    <option>Special Offer</option>
                                    <option>Guided Tour</option>
                                    <option>Art Exhibition</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Soulful Description</label>
                            <textarea
                                required
                                rows="3"
                                value={newEvent.description}
                                onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                                placeholder="Describe the heritage experience..."
                                className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 text-black dark:text-white focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all font-medium resize-none"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Temporal Marker (Date)</label>
                                <input
                                    required
                                    type="date"
                                    value={newEvent.date}
                                    onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 text-black dark:text-white focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Energy Exchange (Price)</label>
                                <input
                                    type="text"
                                    value={newEvent.price}
                                    onChange={e => setNewEvent({ ...newEvent, price: e.target.value })}
                                    placeholder="Free or ₹‚¹ Amount"
                                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 text-black dark:text-white focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isCreating}
                            className={`w-full bg-black dark:bg-[#D4AF37] text-white dark:text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl transition-all ${isCreating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
                        >
                            {isCreating ? 'Archiving to History...' : 'Commence Event'}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {isLoading ? (
                        <div className="col-span-2 py-24 text-center">
                            <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Calling the Ancients...</p>
                        </div>
                    ) : events.length === 0 ? (
                        <div className="col-span-2 py-24 text-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-[2.5rem] border border-dashed border-gray-200 dark:border-gray-800">
                            <Calendar size={64} className="mx-auto text-gray-200 dark:text-gray-800 mb-6" />
                            <p className="text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest text-[10px]">The chronicles are currently silent</p>
                        </div>
                    ) : (
                        events.map(event => (
                            <div key={event.id} className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-xl group hover:translate-x-1 transition-all">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ${event.event_type === 'Festival' ? 'bg-amber-500/10 text-amber-600 ring-amber-500/20' :
                                        event.event_type === 'Workshop' ? 'bg-indigo-500/10 text-indigo-600 ring-indigo-500/20' :
                                            'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20'
                                        }`}>
                                        {event.event_type}
                                    </div>
                                    <button
                                        onClick={() => deleteEvent(event.id)}
                                        className="text-gray-300 hover:text-red-500 transition-colors"
                                    >
                                        <LogOut size={16} className="rotate-90" />
                                    </button>
                                </div>
                                <h4 className="text-xl font-serif text-black dark:text-white mb-3 group-hover:text-[#D4AF37] transition-colors">{event.title}</h4>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 line-clamp-2 font-medium leading-relaxed italic">"{event.description}"</p>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-gray-800">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <Clock size={14} className="text-[#D4AF37]" />
                                        <span>{new Date(event.event_date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <Ticket size={14} className="text-[#D4AF37]" />
                                        <span>{event.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};


export const ProfilePage = ({ onBack, isDarkMode, onToggleDarkMode, onLogout, userData, onUpdateProfile, savedPlaceIds, allPlaces }) => {
    const [currentView, setCurrentView] = useState('main');

    const renderView = () => {
        switch (currentView) {
            case 'settings':
                return <SettingsView onBack={() => setCurrentView('main')} isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} onUpdateProfile={onUpdateProfile} userData={userData} />;
            case 'privacy':
                return <PrivacyView onBack={() => setCurrentView('main')} onUpdateProfile={onUpdateProfile} userData={userData} />;
            case 'wishlist':
                return <WishlistView onBack={() => setCurrentView('main')} savedPlaceIds={savedPlaceIds} allPlaces={allPlaces} />;
            case 'help':
                return <HelpView onBack={() => setCurrentView('main')} />;
            case 'about':
                return <AboutView onBack={() => setCurrentView('main')} />;
            case 'feedback':
                return <FeedbackView onBack={() => setCurrentView('main')} userData={userData} />;
            default:
                return (
                    <MainProfileView
                        onBack={onBack}
                        onNavigate={setCurrentView}
                        onLogout={onLogout}
                        userData={userData}
                    />
                );
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-full pb-20 transition-colors duration-200">
            {renderView()}
        </div>
    );
};

export const MainProfileView = ({ onBack, onNavigate, onLogout, userData }) => (
    <>
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 px-4 py-4 flex items-center shadow-sm sticky top-0 z-10 border-b dark:border-gray-800 transition-colors duration-200">
            <button onClick={onBack} className="mr-4 text-gray-600 dark:text-gray-300">
                <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Profile</h1>
        </div>

        {/* User Info */}
        <div className="bg-white dark:bg-gray-900 mt-4 px-4 py-6 flex items-center transition-colors duration-200">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-500 mb-0 mr-4 font-bold text-2xl">
                {(userData?.fullName || userData?.full_name || 'G').charAt(0).toUpperCase()}
            </div>
            <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {userData?.fullName || userData?.full_name || 'Guest User'}
                </h2>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1">
                    <Mail className="w-3.5 h-3.5 mr-1.5" />
                    <span>{userData?.email || 'No email provided'}</span>
                </div>
                {userData?.phone && (
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1">
                        <Phone className="w-3.5 h-3.5 mr-1.5" />
                        <span>{userData?.phone}</span>
                    </div>
                )}
            </div>
        </div>

        {/* Menu Options */}
        <div className="mt-6 bg-white dark:bg-gray-900 transition-colors duration-200">
            <MenuItem icon={Settings} label="Settings" onClick={() => onNavigate('settings')} />
            <MenuItem icon={Shield} label="Privacy Settings" onClick={() => onNavigate('privacy')} />
            <MenuItem icon={Heart} label="Wishlist" onClick={() => onNavigate('wishlist')} />
            <MenuItem icon={HelpCircle} label="Help & Support" onClick={() => onNavigate('help')} />
            <MenuItem icon={Info} label="About App" onClick={() => onNavigate('about')} />
            <MenuItem icon={MessageSquare} label="Share Feedback" onClick={() => onNavigate('feedback')} />
        </div>

        <div className="px-4 mt-8">
            <button
                onClick={onLogout}
                className="w-full py-3 text-red-500 font-medium bg-white dark:bg-gray-800 rounded-lg border border-red-100 dark:border-red-900/30 shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
                Log Out
            </button>
            <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-4">Version 1.0.0</p>
        </div>
    </>
);

export const SettingsView = ({ onBack, isDarkMode, onToggleDarkMode, onUpdateProfile, userData }) => {

    const handleToggle = (key, value) => {
        if (onUpdateProfile) {
            onUpdateProfile({ [key]: value });
        }
    };

    return (
        <>
            <SubViewHeader title="Settings" onBack={onBack} />
            <div className="mt-4 bg-white dark:bg-gray-900 transition-colors duration-200">
                <ToggleItem
                    icon={Bell}
                    label="Notifications"
                    checked={userData?.notifications !== false}
                    onToggle={() => handleToggle('notifications', !userData?.notifications)}
                />
                <ToggleItem
                    icon={Moon}
                    label="Dark Mode"
                    checked={isDarkMode}
                    onToggle={onToggleDarkMode}
                />
                <ToggleItem
                    icon={MapPin}
                    label="Location Services"
                    checked={userData?.locationServices !== false}
                    onToggle={() => handleToggle('locationServices', !userData?.locationServices)}
                />
                <div className="h-px bg-gray-50 dark:bg-gray-800 my-2"></div>
                <MenuItem icon={Globe} label="Language" value="English" />
            </div>
        </>
    );
};

export const PrivacyView = ({ onBack, onUpdateProfile, userData }) => {
    const handleToggle = (key, value) => {
        if (onUpdateProfile) {
            onUpdateProfile({ [key]: value });
        }
    };

    return (
        <>
            <SubViewHeader title="Privacy Settings" onBack={onBack} />
            <div className="mt-4 bg-white dark:bg-gray-900 transition-colors duration-200">
                <ToggleItem
                    icon={Lock}
                    label="Profile Visibility"
                    checked={userData?.isProfilePublic || false}
                    onToggle={() => handleToggle('isProfilePublic', !userData?.isProfilePublic)}
                />
                <ToggleItem
                    icon={User}
                    label="Show Phone Number"
                    checked={userData?.showPhone || false}
                    onToggle={() => handleToggle('showPhone', !userData?.showPhone)}
                />
                <div className="h-px bg-gray-50 dark:bg-gray-800 my-2"></div>
                <MenuItem icon={FileText} label="Terms of Service" />
                <MenuItem icon={Shield} label="Privacy Policy" />
            </div>
        </>
    );
};

export const WishlistView = ({ onBack, savedPlaceIds, allPlaces }) => {
    const savedPlaces = allPlaces ? allPlaces.filter(p => savedPlaceIds && savedPlaceIds.includes(p.id)) : [];

    return (
        <>
            <SubViewHeader title="Wishlist" onBack={onBack} />
            {savedPlaces.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center mt-10">
                    <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                        <Heart className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Save places you want to visit by tapping the heart icon on any experience.
                    </p>
                </div>
            ) : (
                <div className="p-4 grid grid-cols-1 gap-4">
                    {savedPlaces.map(place => (
                        <div key={place.id} className="relative">
                            <PlaceCard place={place} onClick={() => { }} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export const HelpView = ({ onBack }) => (
    <>
        <SubViewHeader title="Help & Support" onBack={onBack} />
        <div className="mt-4 bg-white dark:bg-gray-900 transition-colors duration-200">
            <MenuItem icon={HelpCircle} label="FAQs" />
            <MenuItem icon={Phone} label="Contact Support" />
            <MenuItem icon={ExternalLink} label="Visit Website" />
        </div>
    </>
);

export const AboutView = ({ onBack }) => (
    <>
        <SubViewHeader title="About App" onBack={onBack} />
        <div className="p-6 text-center">
            <div className="w-20 h-20 bg-orange-500 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-orange-200 dark:shadow-none">
                <h1 className="text-3xl font-bold text-white">M</h1>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mysuru Marga</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Version 1.0.0</p>
            <p className="text-gray-600 dark:text-gray-300 mt-6 text-sm leading-relaxed">
                Mysuru Marga is your digital companion for exploring the heritage city of Mysore.
                Discover hidden gems, local artisans, and authentic culinary experiences curated just for you.
            </p>
            <div className="mt-8 text-xs text-gray-400 dark:text-gray-600">
                © 2025 Mysuru Marga. All rights reserved.
            </div>
        </div>
    </>
);

export const FeedbackView = ({ onBack, userData }) => (
    <>
        <SubViewHeader title="Feedback" onBack={onBack} />
        <div className="p-4">
            <FeedbackSection userEmail={userData?.email || 'Anonymous'} />
        </div>
    </>
);

// Helper Components

export const SubViewHeader = ({ title, onBack }) => (
    <div className="bg-white dark:bg-gray-900 px-4 py-4 flex items-center shadow-sm sticky top-0 z-10 border-b dark:border-gray-800 transition-colors duration-200">
        <button onClick={onBack} className="mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>
    </div>
);

export const MenuItem = ({ icon: _Icon, label, value, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center justify-between px-4 py-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-left transition-colors">
        <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3 text-gray-600 dark:text-gray-400">
                <_Icon className="w-4 h-4" />
            </div>
            <span className="text-gray-700 dark:text-gray-200 font-medium">{label}</span>
        </div>
        <div className="flex items-center">
            {value && <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">{value}</span>}
            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600" />
        </div>
    </button>
);

export const ToggleItem = ({ icon: _Icon, label, defaultChecked, checked, onToggle }) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked || false);

    // Use controlled state if checked/onToggle provided, else internal state
    const isChecked = onToggle ? checked : internalChecked;
    const toggleHandler = onToggle ? onToggle : () => setInternalChecked(!internalChecked);

    return (
        <div className="w-full flex items-center justify-between px-4 py-4 border-b border-gray-50 dark:border-gray-800 transition-colors">
            <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3 text-gray-600 dark:text-gray-400">
                    <_Icon className="w-4 h-4" />
                </div>
                <span className="text-gray-700 dark:text-gray-200 font-medium">{label}</span>
            </div>
            <button
                onClick={toggleHandler}
                className={`w-11 h-6 rounded-full relative transition-colors ${isChecked ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`}
            >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${isChecked ? 'translate-x-full left-0.5' : 'left-0.5'}`}></div>
            </button>
        </div>
    );
};


// --- STATIC DATA ---
export const featuredPlaces = [
    {
        id: 'karanji-lake',
        title: "Karanji Lake",
        category: "Nature",
        categoryColor: "bg-green-500",
        description: "Serene nature trail with butterfly park and panoramic palace views",
        location: "Siddhartha Layout",
        rating: 4.3,
        coords: [12.3021, 76.6715],
        image: "/karanji.jpg"
    }
];

export const popularPlaces = [
    {
        id: 'karanji-lake',
        title: "Karanji Lake",
        category: "Nature",
        categoryColor: "bg-green-500",
        description: "Serene nature trail with butterfly park and panoramic palace views",
        location: "Siddhartha Layout",
        rating: 4.3,
        coords: [12.3021, 76.6715],
        image: "/karanji.jpg"
    }
];

const allPlacesMap = new MapComponent();
[...featuredPlaces, ...popularPlaces].forEach(place => {
    allPlacesMap.set(place.id, place);
});
export const allPlaces = Array.from(allPlacesMap.values());



function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthRestoring, setIsAuthRestoring] = useState(true); // New state for initial check
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [userRole, setUserRole] = useState(() => {
        const saved = localStorage.getItem('userData');
        if (saved) {
            try {
                return JSON.parse(saved).role || 'user';
            } catch (e) { return 'user'; }
        }
        return 'user';
    });
    const [userData, setUserData] = useState(() => {
        const saved = localStorage.getItem('userData');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) { return null; }
        }
        return null;
    });
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem('activeTab') || 'home';
    });
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [mapDestination, setMapDestination] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });
    const [savedPlaceIds, setSavedPlaceIds] = useState(() => {
        const saved = localStorage.getItem('savedPlaces');
        return saved ? JSON.parse(saved) : [];
    });
    const [spots, setSpots] = useState(allPlaces);
    const [events, setEvents] = useState([]);

    // Fetch spots from Supabase
    const fetchSpots = async () => {
        try {
            if (!supabase) return;

            const { data, error } = await supabase
                .from('heritage_spots')
                .select('*');

            if (error) throw error;

            if (data && data.length > 0) {
                // MapComponent Supabase data to the application format
                const supabaseSpots = data.map(s => ({
                    id: s.id,
                    title: s.title,
                    category: s.category || 'Hidden Gem',
                    description: s.description,
                    location: s.address || 'Mysuru',
                    rating: 4.5, // Default for new spots
                    coords: [s.location_lat || 12.3021, s.location_long || 76.6715],
                    image: s.image_url || '/src/assets/mysore-palace-daytime.jpg',
                    isVerified: s.is_verified
                }));

                // Merge Supabase spots with hardcoded spots
                setSpots([...supabaseSpots, ...allPlaces.filter(p => !supabaseSpots.some(s => s.title === p.title))]);
            }
        } catch (err) {
            console.error("Error fetching heritage spots:", err);
        }
    };

    // Fetch events from Supabase
    const fetchEvents = async () => {
        try {
            if (!supabase) return;
            const { data, error } = await supabase
                .from('heritage_events')
                .select('*')
                .eq('status', 'active')
                .order('event_date', { ascending: true });

            if (error) throw error;
            if (data) setEvents(data);
        } catch (err) {
            console.error("Error fetching heritage events:", err);
        }
    };

    React.useEffect(() => {
        fetchSpots();
        fetchEvents();
    }, []);

    // Persist Tab
    React.useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    // Handle dark mode persistence
    React.useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    React.useEffect(() => {
        localStorage.setItem('savedPlaces', JSON.stringify(savedPlaceIds));
    }, [savedPlaceIds]);

    // Initial Auth Check
    React.useEffect(() => {
        setIsAuthRestoring(false); // Auth restoration attempt complete
    }, []);

    const [_session, setSession] = useState(null);

    const fetchProfile = async (userId, email) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.warn('Profile sync: using current details or defaults');
                return;
            }

            if (data) {
                const updatedUser = {
                    ...data,
                    fullName: data.full_name || data.fullName,
                    email: email || data.email,
                    phone: data.phone || 'N/A',
                    role: data.role || 'user'
                };
                setUserData(updatedUser);
                setUserRole(updatedUser.role);
                setIsAuthenticated(true);
                localStorage.setItem('userData', JSON.stringify(updatedUser));
            }
        } catch (err) {
            console.error('Profile sync failed', err);
        }
    };

    const fetchSavedPlaces = async (userId) => {
        try {
            if (!supabase) return;
            const { data, error } = await supabase
                .from('saved_places')
                .select('spot_id')
                .eq('user_id', userId);

            if (error) throw error;
            if (data) {
                setSavedPlaceIds(data.map(item => item.spot_id));
            }
        } catch (err) {
            console.error('Failed to fetch saved places', err);
        }
    };

    React.useEffect(() => {
        if (!supabase) return;

        // 1. Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setSession(session);
                fetchProfile(session.user.id, session.user.email);
            }
        });

        // 2. Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
            if (newSession) {
                setSession(newSession);
                fetchProfile(newSession.user.id, newSession.user.email);
                fetchSavedPlaces(newSession.user.id);
            } else if (event === 'SIGNED_OUT') {
                // Only clear if it's an explicit sign out event
                setIsAuthenticated(false);
                setUserData(null);
                setUserRole('user');
                localStorage.removeItem('userData');
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const toggleSave = async (e, id) => {
        e.stopPropagation(); // Prevent card click

        // Check if ID is a valid UUID (database entries) or a local string
        const isLocalId = !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

        if (isAuthenticated && userData?.id && !isLocalId) {
            const isAlreadySaved = savedPlaceIds.includes(id);
            try {
                if (isAlreadySaved) {
                    const { error } = await supabase
                        .from('saved_places')
                        .delete()
                        .eq('user_id', userData.id)
                        .eq('spot_id', id);
                    if (error) throw error;
                    setSavedPlaceIds(prev => prev.filter(pId => pId !== id));
                } else {
                    const { error } = await supabase
                        .from('saved_places')
                        .insert([{ user_id: userData.id, spot_id: id }]);
                    if (error) throw error;
                    setSavedPlaceIds(prev => [...prev, id]);
                }
            } catch (err) {
                console.error("Supabase toggle save failed:", err);
                // Fallback to local state if DB fails
                setSavedPlaceIds(prev =>
                    prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
                );
            }
        } else {
            // Local Guest fallback
            setSavedPlaceIds(prev =>
                prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
            );
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const handleLogout = async () => {
        if (supabase) {
            await supabase.auth.signOut();
        }
        // Always clear localStorage on logout
        localStorage.removeItem('userData');
        localStorage.removeItem('activeTab');
        localStorage.removeItem('theme');
        setIsAuthenticated(false);
        setUserData(null);
        setUserRole('user');
        setIsSignUp(false); // Ensure we return to login page, not signup
        setActiveTab('home');
    };

    const handleLogin = (role, userProfile) => {
        // Optimistic update if passed from LoginPage
        if (userProfile) {
            const normalizedProfile = {
                ...userProfile,
                fullName: userProfile.fullName || userProfile.full_name,
                role: role
            };
            setUserData(normalizedProfile);
            setUserRole(role);
            setIsLoading(true); // Trigger premium loader
            setIsAuthenticated(true);
            localStorage.setItem('userData', JSON.stringify(normalizedProfile));
        }
    };

    const handleSignUp = (role, userProfile) => {
        if (userProfile) {
            const normalizedProfile = {
                ...userProfile,
                fullName: userProfile.fullName || userProfile.full_name,
                role: role || userProfile.role || 'user'
            };
            setUserData(normalizedProfile);
            setUserRole(role || normalizedProfile.role || 'user');
            localStorage.setItem('userData', JSON.stringify(normalizedProfile));
        } else {
            setUserRole(role || 'user');
        }
        setIsLoading(true); // Trigger premium loader
        setIsAuthenticated(true);
    };

    const handlePlaceClick = (place) => {
        setSelectedPlace(place);
        setActiveTab('details');
    };

    const updateUserProfile = async (updates) => {
        try {
            if (supabase && userData?.id) {
                const { error } = await supabase
                    .from('profiles')
                    .update(updates)
                    .eq('id', userData.id);
                if (error) throw error;
            }

            // Update local state and storage
            const updatedUser = { ...userData, ...updates };
            setUserData(updatedUser);
            localStorage.setItem('userData', JSON.stringify(updatedUser));
            return { success: true };
        } catch (err) {
            console.error('Update profile failed', err);
            return { success: false, error: err.message };
        }
    };

    const handleFeaturedCardClick = (place) => {
        handlePlaceClick(place);
    };

    if (isLoading) {
        return <Loader onFinish={() => setIsLoading(false)} />;
    }

    if (!isAuthenticated) {
        return (
            <AuthPage
                onLogin={handleLogin}
                onSignUp={handleSignUp}
            />
        );
    }

    if (userRole === 'admin') {
        return <AdminDashboard onLogout={handleLogout} />;
    }

    if (userRole === 'partner') {
        return <PartnerDashboard onLogout={handleLogout} partnerData={userData} />;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'details':
                return (
                    <PlaceDetails
                        place={selectedPlace}
                        onBack={() => setActiveTab('home')}
                        isSaved={savedPlaceIds.includes(selectedPlace?.id)}
                        onToggleSave={toggleSave}
                        userEmail={userData?.email}
                        onGetDirections={(place) => {
                            setMapDestination(place);
                            setActiveTab('MapComponent');
                        }}
                    />
                );
            case 'home':
                return (
                    <>
                        <Hero onExploreClick={() => setActiveTab('explore')} />
                        <Categories onSeeAllClick={() => setActiveTab('explore')} />
                        <FeaturedSection
                            places={spots}
                            onCardClick={handleFeaturedCardClick}
                            savedPlaceIds={savedPlaceIds}
                            onToggleSave={toggleSave}
                            onSeeAllClick={() => setActiveTab('MapComponent')}
                        />
                        <EventsSection events={events} />
                    </>
                );
            case 'explore':
                return (
                    <Explore
                        places={spots}
                        savedPlaceIds={savedPlaceIds}
                        onToggleSave={toggleSave}
                        onCardClick={handlePlaceClick}
                    />
                );
            case 'MapComponent':
                return <MapComponent places={spots} destination={mapDestination} />;
            case 'saved':
                return (
                    <Saved
                        savedPlaceIds={savedPlaceIds}
                        allPlaces={spots}
                        onToggleSave={toggleSave}
                        onCardClick={handlePlaceClick}
                    />
                );
            case 'profile':
                return (
                    <ProfilePage
                        userData={userData}
                        onUpdateProfile={updateUserProfile}
                        savedPlaceIds={savedPlaceIds}
                        allPlaces={spots}
                        onBack={() => setActiveTab('home')}
                        isDarkMode={isDarkMode}
                        onToggleDarkMode={toggleDarkMode}
                        onLogout={handleLogout}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-mysore-light dark:bg-mysore-dark transition-colors duration-200 selection:bg-[#D4AF37]/30 flex flex-col">
            {!supabase && (
                <div className="bg-red-500 text-white text-[10px] py-1 px-4 text-center font-bold animate-pulse z-50">
                    DEMO MODE: Supabase not connected. Check your .env file!
                </div>
            )}

            {activeTab !== 'profile' && activeTab !== 'details' && (
                <div className="sticky top-0 z-40 bg-mysore-light/80 dark:bg-mysore-dark/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
                    <div className="max-w-7xl mx-auto w-full">
                        <Navbar
                            onProfileClick={() => setActiveTab('profile')}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    </div>
                </div>
            )}

            <div className={`flex-1 ${activeTab !== 'MapComponent' && activeTab !== 'details' ? 'overflow-y-auto pb-24 md:pb-0 custom-scrollbar' : 'overflow-hidden h-[calc(100vh-64px)]'}`}>
                <div className="max-w-7xl mx-auto w-full h-full">
                    {renderContent()}
                </div>
            </div>

            {activeTab !== 'profile' && activeTab !== 'details' && (
                <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
                    <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
            )}

            {/* ChatBot - Available on all user pages */}
            {isAuthenticated && userRole === 'user' && activeTab !== 'profile' && activeTab !== 'details' && (
                <ChatBot />
            )}
        </div>
    );
}

export default App;
