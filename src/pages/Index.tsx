import { useState, useEffect } from 'react';

interface Subject {
  id: string;
  name: string;
  fullName: string;
  description: string;
  color: string;
}

interface Post {
  id: string;
  title: string;
  subject: string;
  tags: string[];
  summary: string;
  date: string;
}

interface Video {
  id: string;
  title: string;
  subject: string;
  tags: string[];
  platform: string;
  url: string;
  notes: string;
}

interface Snippet {
  id: string;
  title: string;
  subject: string;
  language: string;
  code: string;
  tags: string[];
  runnable: boolean;
}

const subjects: Subject[] = [
  { id: 'java', name: 'Java', fullName: 'Java Programming', description: 'Object-oriented programming fundamentals', color: 'java' },
  { id: 'dapy', name: 'DAPY', fullName: 'Data Analysis with Python', description: 'Python for data science and analytics', color: 'dapy' },
  { id: 'dcn', name: 'DCN', fullName: 'Data Communication Networks', description: 'Network protocols and communication', color: 'dcn' },
  { id: 'dsa', name: 'DSA', fullName: 'Data Structures & Algorithms', description: 'Problem solving and optimization', color: 'dsa' },
  { id: 'ai', name: 'AI', fullName: 'Artificial Intelligence', description: 'Machine learning and intelligent systems', color: 'ai' },
  { id: 'wt', name: 'WT', fullName: 'Web Technologies', description: 'Frontend and backend web development', color: 'wt' }
];

// Sample data
const samplePosts: Post[] = [
  {
    id: 'java-oop-basics',
    title: 'Java OOP: Encapsulation, Inheritance, Polymorphism',
    subject: 'Java',
    tags: ['OOP', 'basics'],
    summary: 'Clean overview with tiny code examples.',
    date: '2025-08-20'
  },
  {
    id: 'python-pandas-intro',
    title: 'Getting Started with Pandas DataFrames',
    subject: 'DAPY',
    tags: ['pandas', 'basics'],
    summary: 'Essential operations for data manipulation.',
    date: '2025-08-18'
  },
  {
    id: 'sorting-algorithms',
    title: 'Sorting Algorithms: Quick vs Merge Sort',
    subject: 'DSA',
    tags: ['sorting', 'algorithms'],
    summary: 'Performance comparison and use cases.',
    date: '2025-08-15'
  }
];

const sampleVideos: Video[] = [
  {
    id: 'dsa-sorting-visual',
    title: 'Sorting Intuition (DSA)',
    subject: 'DSA',
    tags: ['sorting', 'visual'],
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    notes: 'Focus on stable vs unstable sorts.'
  },
  {
    id: 'java-streams',
    title: 'Java 8 Streams API Tutorial',
    subject: 'Java',
    tags: ['streams', 'functional'],
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=example',
    notes: 'Functional programming in Java.'
  }
];

const sampleSnippets: Snippet[] = [
  {
    id: 'python-pandas-read',
    title: 'Read CSV with pandas',
    subject: 'DAPY',
    language: 'python',
    code: `import pandas as pd
df = pd.read_csv('file.csv')
print(df.head())`,
    tags: ['pandas', 'io'],
    runnable: false
  },
  {
    id: 'js-two-sum',
    title: 'Two Sum (O(n))',
    subject: 'DSA',
    language: 'javascript',
    code: `function twoSum(arr, target) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const diff = target - arr[i];
    if (map.has(diff)) return [map.get(diff), i];
    map.set(arr[i], i);
  }
  return null;
}`,
    tags: ['hashmap', 'algorithms'],
    runnable: true
  }
];

const StudyHub = () => {
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Simple router
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentView(hash);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (view: string) => {
    window.location.hash = view;
  };

  const filterContent = <T extends { subject: string; title: string; tags: string[] }>(
    items: T[], 
    query: string, 
    subject?: string
  ): T[] => {
    return items.filter(item => {
      const matchesSearch = !query || 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
      const matchesSubject = !subject || item.subject === subject;
      return matchesSearch && matchesSubject;
    });
  };

  const getStats = () => {
    const totalPosts = selectedSubject ? 
      samplePosts.filter(p => p.subject === selectedSubject).length : 
      samplePosts.length;
    const totalVideos = selectedSubject ?
      sampleVideos.filter(v => v.subject === selectedSubject).length :
      sampleVideos.length;
    const totalSnippets = selectedSubject ?
      sampleSnippets.filter(s => s.subject === selectedSubject).length :
      sampleSnippets.length;
    
    return { totalPosts, totalVideos, totalSnippets };
  };

  const stats = getStats();

  const renderHome = () => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12 fade-in">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
          Study Hub
        </h1>
        <p className="text-xl text-gray-400">
          Master Java · DAPY · DCN · DSA · AI · WT
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {subjects.map((subject, index) => (
          <div
            key={subject.id}
            className={`study-card subject-${subject.color} fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => navigate(`subject/${subject.id}`)}
          >
            <h3 className="text-xl font-semibold mb-2">{subject.fullName}</h3>
            <p className="text-gray-400 mb-4">{subject.description}</p>
            <div className="flex gap-2 text-sm">
              <span className="px-2 py-1 bg-black/20 rounded">
                {samplePosts.filter(p => p.subject === subject.name).length} posts
              </span>
              <span className="px-2 py-1 bg-black/20 rounded">
                {sampleSnippets.filter(s => s.subject === subject.name).length} snippets
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="study-card">
          <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
          <div className="space-y-3">
            {samplePosts.slice(0, 3).map(post => (
              <div key={post.id} className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors cursor-pointer">
                <h4 className="font-medium">{post.title}</h4>
                <p className="text-sm text-gray-400">{post.subject} • {post.date}</p>
              </div>
            ))}
          </div>
          <button 
            className="btn btn-primary mt-4 w-full"
            onClick={() => navigate('blog')}
          >
            View All Posts
          </button>
        </div>

        <div className="study-card">
          <h3 className="text-xl font-semibold mb-4">Quick Tools</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              className="p-3 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-lg transition-colors"
              onClick={() => navigate('snippets')}
            >
              <div className="font-medium">Code Snippets</div>
              <div className="text-sm text-gray-400">{stats.totalSnippets} available</div>
            </button>
            <button 
              className="p-3 bg-violet-500/10 hover:bg-violet-500/20 rounded-lg transition-colors"
              onClick={() => navigate('videos')}
            >
              <div className="font-medium">Videos</div>
              <div className="text-sm text-gray-400">{stats.totalVideos} tutorials</div>
            </button>
            <button 
              className="p-3 bg-pink-500/10 hover:bg-pink-500/20 rounded-lg transition-colors"
              onClick={() => navigate('map')}
            >
              <div className="font-medium">Concept Map</div>
              <div className="text-sm text-gray-400">Visual learning</div>
            </button>
            <button 
              className="p-3 bg-orange-500/10 hover:bg-orange-500/20 rounded-lg transition-colors"
              onClick={() => navigate('prompts')}
            >
              <div className="font-medium">AI Prompts</div>
              <div className="text-sm text-gray-400">Study helper</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBlog = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Blog Posts</h2>
      <div className="space-y-6">
        {filterContent(samplePosts, searchQuery, selectedSubject).map(post => (
          <div key={post.id} className="study-card">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <span className="text-sm text-gray-400">{post.date}</span>
            </div>
            <p className="text-gray-300 mb-3">{post.summary}</p>
            <div className="flex gap-2 flex-wrap">
              <span className={`px-2 py-1 text-xs rounded subject-${subjects.find(s => s.name === post.subject)?.color}`}>
                {post.subject}
              </span>
              {post.tags.map(tag => (
                <span key={tag} className="px-2 py-1 text-xs bg-gray-700 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVideos = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Video Tutorials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filterContent(sampleVideos, searchQuery, selectedSubject).map(video => (
          <div key={video.id} className="study-card">
            <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Video Player</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
            <p className="text-gray-400 text-sm mb-3">{video.notes}</p>
            <div className="flex gap-2 flex-wrap">
              <span className={`px-2 py-1 text-xs rounded subject-${subjects.find(s => s.name === video.subject)?.color}`}>
                {video.subject}
              </span>
              {video.tags.map(tag => (
                <span key={tag} className="px-2 py-1 text-xs bg-gray-700 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSnippets = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Code Snippets</h2>
      <div className="space-y-6">
        {filterContent(sampleSnippets, searchQuery, selectedSubject).map(snippet => (
          <div key={snippet.id} className="study-card">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold">{snippet.title}</h3>
              <button 
                className="btn btn-primary text-sm"
                onClick={() => navigator.clipboard.writeText(snippet.code)}
              >
                Copy
              </button>
            </div>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{snippet.code}</code>
            </pre>
            <div className="flex gap-2 flex-wrap mt-3">
              <span className={`px-2 py-1 text-xs rounded subject-${subjects.find(s => s.name === snippet.subject)?.color}`}>
                {snippet.subject}
              </span>
              <span className="px-2 py-1 text-xs bg-blue-600/20 rounded">
                {snippet.language}
              </span>
              {snippet.runnable && (
                <span className="px-2 py-1 text-xs bg-green-600/20 rounded">
                  Runnable
                </span>
              )}
              {snippet.tags.map(tag => (
                <span key={tag} className="px-2 py-1 text-xs bg-gray-700 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">Concept Map</h2>
      <div className="study-card">
        <div className="h-96 flex items-center justify-center">
          <div className="text-gray-500">
            <svg width="300" height="200" className="mx-auto mb-4">
              <circle cx="150" cy="100" r="40" fill="hsl(var(--primary))" opacity="0.2" />
              <text x="150" y="105" textAnchor="middle" fill="hsl(var(--foreground))" className="text-sm font-medium">
                Study Hub
              </text>
              {subjects.slice(0, 6).map((subject, i) => {
                const angle = (i * 60) * (Math.PI / 180);
                const x = 150 + Math.cos(angle) * 80;
                const y = 100 + Math.sin(angle) * 80;
                return (
                  <g key={subject.id}>
                    <line x1="150" y1="100" x2={x} y2={y} stroke="hsl(var(--card-border))" strokeWidth="1"/>
                    <circle cx={x} cy={y} r="20" fill={`hsl(var(--${subject.color}))`} opacity="0.3" />
                    <text x={x} y={y + 3} textAnchor="middle" fill="hsl(var(--foreground))" className="text-xs">
                      {subject.name}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p className="text-gray-400">Interactive concept map coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrompts = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">AI Prompt Generator</h2>
      <div className="study-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Task Type</label>
            <select className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg">
              <option>Explain concept</option>
              <option>Compare topics</option>
              <option>Make study plan</option>
              <option>Debug code</option>
              <option>Summarize content</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <select className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg">
              {subjects.map(subject => (
                <option key={subject.id} value={subject.name}>{subject.fullName}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Context</label>
          <textarea 
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg h-32"
            placeholder="Describe what you want help with..."
          />
        </div>
        <div className="flex gap-4 mb-6">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Outline
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Examples
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Follow-up questions
          </label>
        </div>
        <button className="btn btn-primary w-full">
          Generate Prompt
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'blog': return renderBlog();
      case 'videos': return renderVideos();
      case 'snippets': return renderSnippets();
      case 'map': return renderMap();
      case 'prompts': return renderPrompts();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 
              className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent"
              onClick={() => navigate('home')}
            >
              Study Hub
            </h1>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select 
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
                value={selectedSubject || ''}
                onChange={(e) => setSelectedSubject(e.target.value || null)}
              >
                <option value="">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.name}>{subject.name}</option>
                ))}
              </select>
            </div>
          </div>
          <nav className="flex gap-6 mt-4">
            {[
              { key: 'home', label: 'Home' },
              { key: 'blog', label: 'Blog' },
              { key: 'videos', label: 'Videos' },
              { key: 'snippets', label: 'Snippets' },
              { key: 'map', label: 'Map' },
              { key: 'prompts', label: 'Prompts' }
            ].map(item => (
              <button
                key={item.key}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === item.key 
                    ? 'bg-cyan-500/20 text-cyan-300' 
                    : 'hover:bg-gray-800 text-gray-400'
                }`}
                onClick={() => navigate(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default StudyHub;