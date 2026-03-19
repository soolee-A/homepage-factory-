import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '@/Fetch/articleData';

export const metadata = {
  title: "Korea Travel Guide 2026 – 24 Essential Survival Tips | Korea OSO",
  description: "24 expert survival tips for visiting South Korea in 2026. Incheon Airport, K-ETA, money, transport, culture, and food — everything you need, verified and fact-checked.",
};

export default function BlogList() {
  const posts = Object.values(BLOG_POSTS);
  return (

    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-4">
          <BookOpen className="text-blue-600 w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Master Guide: Survival Tips for Korea 2026
        </h1>
        <p className="text-slate-500 mt-4 text-lg font-medium max-w-2xl mx-auto">
          24 essential tips for first-time visitors. Navigate Korea like a local with our comprehensive survival guide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <article className="h-full bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                {post.title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                {post.excerpt}
              </p>
              <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-4 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                  <span className="flex items-center"><Calendar size={12} className="mr-1" /> {post.date}</span>
                  <span className="flex items-center"><Clock size={12} className="mr-1" /> {post.readTime}</span>
                </div>
                <div className="p-2 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <ArrowRight size={14} />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
