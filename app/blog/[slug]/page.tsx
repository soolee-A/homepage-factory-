import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Share2, Youtube, ExternalLink } from 'lucide-react';
import Comments from '@/components/Comments';
import { BLOG_POSTS } from '@/Fetch/articleData';

export const runtime = 'edge';

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

      {/* YouTube Timeline */}
      <div className="bg-slate-900 rounded-3xl overflow-hidden mb-8 border border-slate-800">
        <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-600/10 rounded-xl">
              <Youtube className="text-red-500 w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black text-white">영상 증거 타임라인</h4>
              <p className="text-xs text-slate-400 font-medium">Video Evidence Timeline — 실제 상황 기준</p>
            </div>
          </div>
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(post.youtubeSearch)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-black rounded-xl transition-all"
          >
            유튜브에서 보기 <ExternalLink size={14} />
          </a>
        </div>
        <div className="p-6 space-y-4">
          {post.youtubeTimeline.map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="text-blue-400 font-black text-xs tabular-nums bg-blue-500/10 px-2 py-1 rounded-lg shrink-0 min-w-[52px] text-center">{item.time}</span>
              <span className="text-slate-300 text-sm leading-relaxed">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-12">
        <Comments />
      </div>
    </article>
  );
}
