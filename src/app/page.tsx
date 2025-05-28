"use client";

import { useState, useEffect, ReactNode, SetStateAction } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Black_And_White_Picture } from "next/font/google";
import { DefaultColors } from "tailwindcss/types/generated/colors";
import { SpeedInsights } from "@vercel/speed-insights/next";

interface Post {
  [x: string]: ReactNode;
  status: string;
  id: string;
  message: string;
  location: string;
  category: string;
  userId: string;
  email: string;
  timestamp: string;
  statusColor: string;
  statusOptions: string[];

}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("Building A"); // Simulated location
  const [category, setCategory] = useState("Offer"); // Default category
  const [filterCategory, setFilterCategory] = useState("All"); // Filter for displaying posts
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("Available");
  const [statusColor, setStatusColor] = useState("text-green-600");
  const [statusOptions, setStatusOptions] = useState("");
  const router = useRouter();
  


  // Check if user is logged in
  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/login");
    }
  }, [router]);


  // Fetch posts from Firestore with real-time updates
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      try {
        const postData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Post));
        setPosts(postData.filter((post) => post.location === location && (filterCategory === "All" || post.category === filterCategory)));
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching posts');
      }
    }, (err) => {
      setError(err.message || 'An error occurred with Firestore connection');
    });

    return () => unsubscribe();
  }, [location, filterCategory]);

  // Post a new message
  const handlePost = async () => {
    if (!message) return;
    try {
      if (auth.currentUser) {
        await addDoc(collection(db, "posts"), {
          message,
          location,
          category,
          status,
          statusColor: statusColor,
          statusOptions: statusOptions,
          userId: auth.currentUser.uid,
          email: auth.currentUser.email,
          timestamp: new Date().toISOString(),
        });
        setMessage("");
        setError(null);
      } else {
        setError("User not authenticated");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred while posting');
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/login");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during logout');
    }
  };

  // Simulated geolocation filter (replace with Google Maps API later)
  const locations = ["Building A", "Building B", "Street 1"];
  const categories = ["Offer", "Request", "Announcement"];

  return (
    <div className="min-h-screen bg-background">
      <SpeedInsights />
      {/* Header */}
      <header className="bg-foreground text-white shadow-xl rounded-b-3xl">
        <div className="container mx-auto px-4 py-7 flex justify-between items-center">
          <div className="flex items-center gap-4 min-w-0">
            <NeighborlyLogo size={48} />
            <span className="text-4xl font-extrabold tracking-tight truncate font-logo drop-shadow-lg" style={{color:"black"}}>Neighborly<span className="ml-1 animate-heartbeatColorCycle">.</span></span>
          </div>
          <div>
            <span className="mr-6 text-base text-secondary font-medium" style={{color:"green"}}>Welcome, {auth.currentUser?.email || 'User'}</span>
            <button 
              onClick={handleLogout}
              className="bg-black text-white px-5 py-2 rounded-xl border border-primary font-semibold hover:bg-primary hover:text-white transition-colors shadow-md hover:shadow-xl animate-border-snake"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-card-bg rounded-3xl shadow-2xl p-8 border border-card-border mb-12">
          <h2 className="text-4xl font-extrabold mb-8 text-foreground font-logo drop-shadow-sm">Community Wall</h2>
          {/* Filters Section */}
          <div className="bg-card-bg rounded-2xl shadow p-6 mb-8 flex flex-col md:flex-row gap-6 border border-card-border">
            <div className="flex-1">
              <label className="block mb-2 text-base font-bold text-foreground">Select Location:</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border border-border rounded-lg p-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground bg-card-bg"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc} className="text-foreground">
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-base font-bold text-foreground">Filter by Category:</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-border rounded-lg p-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground bg-card-bg"
              >
                <option value="All" className="text-foreground">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="text-foreground">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Post Creation Form */}
          <div className="bg-card-bg rounded-2xl shadow-lg p-6 mb-10 border border-card-border">
            <h3 className="text-2xl font-bold mb-4 text-foreground font-logo">Share with Your Neighbors<span className="ml-1 animate-heartbeatColorCycle">.</span></h3>
            <div className="mb-4">
              <label className="block mb-2 text-base font-bold text-foreground">Post Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-border rounded-lg p-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground bg-card-bg"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="text-foreground">
                    {cat}
                  </option>
                ))}
                  </select>
                 
                 <label className="block mb-2 text-base font-bold text-foreground">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border border-border rounded-lg p-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground bg-card-bg"
                > 
                {Array.isArray(statusOptions) && statusOptions.map((status: string) => (
                    <option key={status}  value={status}  className="text-foreground">
                      {status}
                    </option>
                  ))}
                      <option value="Available" style={{color: "green"}} >Available</option>
                  <option value="Unavailable" style={{color: "red"}}>Unavailable</option>
                  <option value="Pending" style={{color: "yellow"}}>Pending</option>
                  <option value="Completed" style={{color: "blue"}}>Completed</option>

                </select>

          
            </div>
            <textarea
              placeholder="Post a message (e.g., Need a ladder, Free apples)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-border rounded-lg p-3 w-full h-28 mb-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground bg-card-bg resize-none"
            />
            <button
              onClick={handlePost}
              className="bg-primary text-white px-6 py-2 rounded-lg border border-primary-dark font-semibold hover:bg-primary-dark hover:text-white transition-colors w-full md:w-auto shadow hover:shadow-xl"
            >
              Post Message
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 bg-red-50 border border-red-300 rounded-md p-3 mb-8 text-center font-semibold">{error}</p>}

          {/* Posts Section */}
          <h3 className="text-2xl font-bold mb-6 text-foreground font-logo">Recent Posts</h3>
          {posts.length === 0 ? (
            <div className="bg-card-bg rounded-2xl shadow p-8 text-center text-secondary border border-card-border">

              <p className="text-lg font-medium">No posts yet. Be the first to share something with your community!</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {posts.map((post) => (
                
                <li key={post.id} className="bg-card-bg rounded-2xl shadow-lg p-6 border border-card-border hover:shadow-2xl transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${getCategoryStyle(post.category)} shadow-sm tracking-wide uppercase font-logo`}><span style={{color:"rgb(22 163 74 / var(--tw-text-opacity, 1))"}}>{post.category}</span></span>
                    <p className="text-xs text-secondary font-mono">
                      {new Date(post.timestamp).toISOString().slice(11, 19)} <span style={{color:"rgb(22 163 74 / var(--tw-text-opacity, 1))"}}>•</span> {new Date(post.timestamp).toISOString().slice(0, 10)}
                    </p>
                  </div>
                
                  <p className="text-foreground font-semibold mb-2 text-lg">{post.message}</p>
                  <p className="text-sm text-secondary">
                    Category: <span className="font-bold text-foreground">{post.category}</span>
                  </p>
                  <p className="text-sm text-secondary">
                    Location: <span className="font-bold text-foreground">{post.location}</span>
                  </p>
                  <p className="text-sm text-secondary"> 
                    Status: 
                    <span className={`font-bold text-foreground ${post.statusColor}`} style={{color: post.statusColor}}>{post.status}</span>
                  </p>
                  <p className="text-sm text-secondary">
                    Posted by <span className="font-bold text-foreground">{post.email}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <hr className="border-t border-border my-12" />

      {/* Footer */}
      <footer className="bg-foreground text-white py-10 border-t-0 rounded-t-3xl shadow-xl">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-center gap-8 text-base">
          {/* Terms and Privacy Policy */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="uppercase tracking-wide text-xs text-secondary font-semibold mb-1">Legal</span>
            <Link href="/terms-privacy" className="hover:text-primary-dark transition-colors font-bold underline underline-offset-4">Terms & Privacy Policy</Link>
          </div>
          {/* Support */}
          <div className="flex flex-col items-center gap-2">
            <span className="uppercase tracking-wide text-xs text-secondary font-semibold mb-1 flex items-center gap-1">
              <svg className="inline-block w-4 h-4 text-white" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24"><path d="M18.364 5.636l-1.414 1.414A9 9 0 015.636 18.364l-1.414-1.414A11 11 0 0012 1c2.97 0 5.74 1.16 7.778 3.222z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Support
            </span>
            <a href="mailto:support@neighborly.com" className="hover:text-primary-dark transition-colors font-bold underline underline-offset-4">support@neighborly.com</a>
            <a href="tel:+1234567890" className="hover:text-primary-dark transition-colors font-bold underline underline-offset-4">+1 (234) 567-890</a>
          </div>
          {/* Website Info */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="uppercase tracking-wide text-xs font-semibold mb-1 flex items-center gap-1" style={{color: '#ccc'}}>
              <svg className="inline-block w-4 h-4" fill="none" stroke="#ccc" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              Website Info
            </span>
            <span className="font-bold" style={{color: '#ccc'}}>Neighborly v1.0</span>
            <span className="text-secondary" style={{color: '#ccc'}}>&copy; {new Date().getFullYear()} Neighborly</span>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 text-center text-xs text-secondary tracking-wide">
          Building stronger communities together.
        </div>
      </footer>  
    </div>
  );
}

// --- Logo Component
function NeighborlyLogo({ className = "", size = 40, animated = false }: { className?: string; size?: number; animated?: boolean }) {
  const eyeHeight = 6;
  return (
    <div
      className={`flex flex-col items-center ${className} ${animated ? "transition-transform duration-700 ease-out" : ""}`}
      style={animated ? { willChange: "transform" } : undefined}
    >
      <div className="relative mb-0">
        <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="28" fill="black"/>
          <path
            d="M16 36V24.5C16 21.4624 18.4624 19 21.5 19H34.5C37.5376 19 40 21.4624 40 24.5V36"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          
          />
          <rect 
           x="21"
           y="31"
           width="4"
           height={eyeHeight}
           rx="1.5"
           fill="#86BC25"
           stroke="#fff"
           strokeWidth="0.5"
        />
          <rect 
          x="31"
          y="31"
          width="4"
          height={eyeHeight}
          rx="1.5"
          fill="#86BC25"
          stroke="#fff"
          strokeWidth="0.5"
           />
        </svg>
        <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-10 h-1 rounded-full bg-primary blur-sm opacity-70" style={{backgroundColor: "black"}}></div>
      </div>
    </div>
  );
}

// Helper function for category badge styling
function getCategoryStyle(category: string) {
  switch(category) {
    case 'Offer':
      return 'bg-primary/10 text-foreground border border-primary';
    case 'Request':
      return 'bg-accent/10 text-foreground border border-accent';
    case 'Announcement':
      return 'bg-secondary/10 text-foreground border border-secondary';
    default:
      return 'bg-card-bg text-foreground border border-card-border';
  }
}
