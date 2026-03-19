import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Share2, Youtube, ExternalLink } from 'lucide-react';
import Comments from '@/components/Comments';
import { BLOG_POSTS } from '@/Fetch/articleData';

export function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({ slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-20">
      <Link 
        href="/blog" 
        className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors mb-12 group"
      >
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Master Guide
      </Link>

      <div className="space-y-6 mb-12">
        <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-blue-100">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-between py-6 border-y border-slate-100">
          <div className="flex items-center space-x-6 text-[10px] font-black text-slate-400 uppercase tracking-tight">
            <span className="flex items-center"><Calendar size={16} className="mr-2 text-blue-500" /> {post.date}</span>
            <span className="flex items-center"><Clock size={16} className="mr-2 text-blue-500" /> {post.readTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div 
        className="prose prose-slate prose-lg max-w-none 
          prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight
          prose-p:text-slate-600 prose-p:leading-relaxed
          prose-strong:text-slate-900 prose-strong:font-bold
          prose-li:text-slate-600
          prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="bg-red-50 rounded-3xl p-8 mb-20 border border-red-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm">
            <Youtube className="text-red-600 w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-900 leading-tight">Visual Guide</h4>
            <p className="text-sm text-slate-500 font-medium">Watch real-life demonstrations on YouTube</p>
          </div>
        </div>
        <a 
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(post.youtubeSearch)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl transition-all shadow-lg shadow-red-100 hover:scale-[1.02]"
        >
          <span>Search Guide</span>
          <ExternalLink size={16} />
        </a>
      </div>

      <div className="border-t border-slate-100 pt-12">
        <Comments />
      </div>
    </article>
  );
}
