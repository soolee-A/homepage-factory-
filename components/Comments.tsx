'use client';

import React, { useState } from 'react';
import { Send, User, MessageSquare, AlertCircle } from 'lucide-react';

export default function Comments() {
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && name.trim()) {
      // In a real app, you would send this to a backend
      console.log('Comment submitted:', { name, comment });
      setSubmitted(true);
      setComment('');
      setName('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="bg-slate-50 rounded-3xl p-8 mt-12 border border-slate-100 shadow-sm">
      <div className="flex items-center space-x-3 mb-8 text-slate-900">
        <MessageSquare className="w-6 h-6 text-blue-600" />
        <h3 className="text-2xl font-black tracking-tight">Community Discussion</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-2">Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="How should we call you?"
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Share your thoughts or ask a question..."
            className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none text-slate-900 font-medium placeholder:text-slate-300 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center space-x-2 w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>Post Comment</span>
          <Send className="w-4 h-4" />
        </button>
      </form>

      {submitted && (
        <div className="mt-8 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center space-x-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-1 bg-emerald-500 rounded-full">
            <Send className="w-3 h-3 text-white" />
          </div>
          <p className="text-sm font-bold">Thank you! Your comment is awaiting moderation.</p>
        </div>
      )}

      <div className="mt-12 space-y-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-black">JS</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-black text-slate-900">Junho Son</span>
              <span className="text-xs font-medium text-slate-400">2 days ago</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              This guide was super helpful! I was worried about the curfew at Gimhae, but now I know what to expect.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 font-black">AM</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-black text-slate-900">Alice Miller</span>
              <span className="text-xs font-medium text-slate-400">1 week ago</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Does the K-ETA application really only take ₩10,000? I saw sites charging $50.
            </p>
            <div className="mt-3 pl-4 border-l-2 border-blue-200 space-y-3">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black">W</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-slate-900">Wtoko Team</span>
                    <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-black rounded uppercase tracking-tighter">Staff</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Yes, Alice! The official fee is exactly ₩10,000. Any site charging more is a third-party service or a potential scam. Always use the official link.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 font-medium leading-relaxed">
          To maintain a safe and helpful community, all comments are moderated before being published. Please follow our community guidelines.
        </p>
      </div>
    </div>
  );
}
