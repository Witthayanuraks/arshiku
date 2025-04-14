import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { FiEye, FiClock, FiArrowRight, FiBookmark, FiShare2 } from 'react-icons/fi';
import { RiFireFill, RiHistoryLine, RiLightbulbFlashLine } from 'react-icons/ri';
import { IoSearch } from 'react-icons/io5';

const articles = [
  {
    id: 1,
    title: 'Sejarah Kemerdekaan Indonesia',
    image: 'https://source.unsplash.com/800x400/?indonesia,history',
    excerpt: 'Bagaimana perjuangan bangsa menuju kemerdekaan...',
    category: 'history',
    readTime: '5 min',
    date: '2023-08-17',
    views: 1250,
    tags: ['indonesia', 'kemerdekaan', 'sejarah']
  },
  {
    id: 2,
    title: '10 Fakta Unik Dunia Teknologi',
    image: 'https://source.unsplash.com/800x400/?technology,facts',
    excerpt: 'Teknologi ternyata punya sisi unik yang jarang diketahui...',
    category: 'technology',
    readTime: '3 min',
    date: '2023-09-10',
    views: 3200,
    tags: ['teknologi', 'fakta', 'unik']
  },
    {
        id: 3,
        title: 'Tips Aman Menggunakan Internet',
        image: 'https://source.unsplash.com/800x400/?cyber,security',
        excerpt: 'Jangan sampai datamu bocor, ini tipsnya...',
        category: 'tips',
        readTime: '4 min',
        date: '2023-09-25',
        views: 1800,
        tags: ['internet', 'keamanan', 'tips']
    },
    {
        id: 4,
        title: 'Kerajaan Majapahit: Kebangkitan Nusantara',
        image: 'https://source.unsplash.com/800x400/?majapahit,history',
        excerpt: 'Mengupas kejayaan kerajaan terbesar di Nusantara...',
        category: 'history',
        readTime: '7 min',
        date: '2023-10-05',
        views: 950,
        tags: ['majapahit', 'sejarah', 'nusantara']
    },
    {
        id: 5,
        title: 'Revolusi Industri 4.0 di Indonesia',
        image: 'https://source.unsplash.com/800x400/?industry,digital',
        excerpt: 'Bagaimana Indonesia menyambut era digitalisasi...',
        category: 'technology',
        readTime: '6 min',
        date: '2023-10-12',
        views: 2100,
        tags: ['industri', 'teknologi', 'digital']
    },
];

const Home = () => {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tags, setTags] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const allTags = [...new Set(articles.flatMap(article => article.tags))];
    setTags(allTags);
  }, []);

  useEffect(() => {
    const sorted = [...articles].sort((a, b) => {
      const dateCompare = new Date(b.date) - new Date(a.date);
      return dateCompare !== 0 ? dateCompare : b.views - a.views;
    });

    const filtered = selectedTag 
      ? sorted.filter(article => 
          article.tags.includes(selectedTag) || 
          article.category === selectedTag
        )
      : sorted;

    setFilteredArticles(filtered);
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const trending = [...articles]
      .filter(article => new Date(article.date) >= thirtyDaysAgo)
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);
      
    setTrendingArticles(trending);
  }, [selectedTag]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'history': return <RiHistoryLine className="text-lg" />;
      case 'technology': return <RiLightbulbFlashLine className="text-lg" />;
      default: return <IoSearch className="text-lg" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Carousel */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          interval={6000}
          className="w-full"
        >
          {trendingArticles.map((article) => (
            <div key={article.id} className="relative h-[70vh] min-h-[500px]">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-coral rounded-full">
                      {getCategoryIcon(article.category)}
                      {article.category.toUpperCase()}
                    </span>
                    <span className="flex items-center text-xs text-white bg-black/30 px-2 py-1 rounded">
                      <RiFireFill className="mr-1" /> TRENDING
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-gray-200 mb-6 text-lg">{article.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                    <span className="flex items-center">
                      <FiEye className="mr-1.5" /> {article.views.toLocaleString()}x dilihat
                    </span>
                    <span className="flex items-center">
                      <FiClock className="mr-1.5" /> {article.readTime}
                    </span>
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Link 
                      to={`/article/${article.id}`}
                      className="flex items-center px-5 py-3 bg-coral text-white font-medium rounded-lg hover:bg-coral-dark transition-colors"
                    >
                      Baca Selengkapnya <FiArrowRight className="ml-2" />
                    </Link>
                    <button className="p-3 text-white bg-black/30 rounded-lg hover:bg-black/40 transition-colors">
                      <FiBookmark />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
    {/* Tag Filters */}
    <div className="mb-8 sticky top-0 z-10 bg-gray-50 pt-4 pb-4 -mx-4 px-4 border-b border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            {selectedTag ? `Filter: #${selectedTag}` : 'Semua Artikel'}
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleTagClick(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !selectedTag 
                  ? 'bg-coral text-white shadow-md' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Semua
            </button>

    {tags.map((tag) => (
      <button
        key={tag}
        onClick={() => handleTagClick(tag)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selectedTag === tag 
            ? 'bg-coral text-white shadow-md' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        #{tag}
      </button>
    ))}
  </div>
</div>    
{/* Search Bar */}
        <div className="mb-8 flex items-center bg-white rounded-lg shadow-md p-4">
          <IoSearch className="text-gray-400 mr-3" />
          <input 
            type="text" 
            placeholder="Cari artikel..." 
            className="w-full border-none focus:outline-none"
          />
        </div>

        {/* Latest Articles */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
            {selectedTag ? `Artikel ${selectedTag}` : 'Artikel Terbaru'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article 
                key={article.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <Link to={`/article/${article.id}`} className="block group">
                  <div className="relative h-48 w-full">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 px-2 py-1 text-xs font-bold text-white bg-black/70 rounded flex items-center gap-1">
                      {getCategoryIcon(article.category)}
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs text-gray-500">
                        {formatDate(article.date)}
                      </span>
                      <span className="flex items-center text-xs text-gray-500">
                        <FiEye className="mr-1" /> {article.views.toLocaleString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag} 
                          onClick={(e) => {
                            e.preventDefault();
                            handleTagClick(tag);
                          }}
                          className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 flex items-center">
                        <FiClock className="mr-1.5" /> {article.readTime}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          // Add share functionality
                        }}
                        className="text-gray-500 hover:text-coral transition-colors"
                      >
                        <FiShare2 />
                      </button>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Category Highlights */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
            Kategori Populer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['history', 'technology'].map(category => {
              const categoryArticles = articles
                .filter(a => a.category === category)
                .sort((a, b) => b.views - a.views)
                .slice(0, isMobile ? 1 : 2);
              
              return (
                <div key={category} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-coral mb-2 flex items-center gap-2">
                      {getCategoryIcon(category)}
                      {category === 'history' ? 'Sejarah' : 'Teknologi'} Terpopuler
                    </h3>
                    <p className="text-gray-600">
                      Artikel dengan pembaca terbanyak dalam kategori ini
                    </p>
                  </div>
                  {categoryArticles.map(article => (
                    <div key={article.id} className="p-6 border-b border-gray-100 last:border-b-0 group">
                      <Link 
                        to={`/article/${article.id}`}
                        className="flex gap-4 items-start hover:opacity-90 transition-opacity"
                      >
                        <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-coral transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <div className="flex items-center text-xs text-gray-500 mt-2">
                            <span>{formatDate(article.date)}</span>
                            <span className="mx-2">•</span>
                            <span className="flex items-center">
                              <FiEye className="mr-1" /> {article.views.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;


// import React, { useState, useEffect } from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import { Link } from 'react-router-dom';
// import '../index.css';

// // Mock data with view counts and dates
// const articles = [
//   {
//     id: 1,
//     title: 'Sejarah Kemerdekaan Indonesia',
//     image: 'https://source.unsplash.com/800x400/?indonesia,history',
//     excerpt: 'Bagaimana perjuangan bangsa menuju kemerdekaan...',
//     category: 'history',
//     readTime: '5 min read',
//     date: '2023-08-17',
//     views: 1250,
//     tags: ['indonesia', 'kemerdekaan', 'sejarah']
//   },
//   {
//     id: 2,
//     title: '10 Fakta Unik Dunia Teknologi',
//     image: 'https://source.unsplash.com/800x400/?technology,facts',
//     excerpt: 'Teknologi ternyata punya sisi unik yang jarang diketahui...',
//     category: 'technology',
//     readTime: '3 min read',
//     date: '2023-09-10',
//     views: 3200,
//     tags: ['teknologi', 'fakta', 'unik']
//   },
//   {
//     id: 3,
//     title: 'Tips Aman Menggunakan Internet',
//     image: 'https://source.unsplash.com/800x400/?cyber,security',
//     excerpt: 'Jangan sampai datamu bocor, ini tipsnya...',
//     category: 'tips',
//     readTime: '4 min read',
//     date: '2023-09-25',
//     views: 1800,
//     tags: ['internet', 'keamanan', 'tips']
//   },
//   {
//     id: 4,
//     title: 'Kerajaan Majapahit: Kebangkitan Nusantara',
//     image: 'https://source.unsplash.com/800x400/?majapahit,history',
//     excerpt: 'Mengupas kejayaan kerajaan terbesar di Nusantara...',
//     category: 'history',
//     readTime: '7 min read',
//     date: '2023-10-05',
//     views: 950,
//     tags: ['majapahit', 'sejarah', 'nusantara']
//   },
//   {
//     id: 5,
//     title: 'Revolusi Industri 4.0 di Indonesia',
//     image: 'https://source.unsplash.com/800x400/?industry,digital',
//     excerpt: 'Bagaimana Indonesia menyambut era digitalisasi...',
//     category: 'technology',
//     readTime: '6 min read',
//     date: '2023-10-12',
//     views: 2100,
//     tags: ['industri', 'teknologi', 'digital']
//   },
// ];

// const Home = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [filteredArticles, setFilteredArticles] = useState([]);
//   const [trendingArticles, setTrendingArticles] = useState([]);
//   const [selectedTag, setSelectedTag] = useState(null);
//   const [tags, setTags] = useState([]);

//   // Extract all unique tags
//   useEffect(() => {
//     const allTags = articles.flatMap(article => article.tags);
//     const uniqueTags = [...new Set(allTags)];
//     setTags(uniqueTags);
//   }, []);

//   // Sort articles by date (newest first) and then by views (highest first)
//   useEffect(() => {
//     let sorted = [...articles].sort((a, b) => {
//       // First sort by date (newest first)
//       const dateCompare = new Date(b.date) - new Date(a.date);
//       if (dateCompare !== 0) return dateCompare;
      
//       // If dates are equal, sort by views (highest first)
//       return b.views - a.views;
//     });

//     // If tag is selected, filter by tag
//     if (selectedTag) {
//       sorted = sorted.filter(article => 
//         article.tags.includes(selectedTag) || 
//         article.category === selectedTag
//       );
//     }

//     setFilteredArticles(sorted);
    
//     // Get trending articles (most viewed in last 7 days)
//     const trending = [...articles]
//       .filter(article => {
//         const articleDate = new Date(article.date);
//         const sevenDaysAgo = new Date();
//         sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//         return articleDate >= sevenDaysAgo;
//       })
//       .sort((a, b) => b.views - a.views)
//       .slice(0, 3);
      
//     setTrendingArticles(trending);
//   }, [selectedTag]);

//   const handleSlideChange = (index) => {
//     setCurrentSlide(index);
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString('id-ID', options);
//   };

//   const handleTagClick = (tag) => {
//     setSelectedTag(selectedTag === tag ? null : tag);
//   };

//   return (
//     <div className="space-y-10 bg-gray-50 text-gray-800 p-4 md:p-8">
//       {/* Tag Filters */}
//       <div className="flex flex-wrap gap-2">
//         <button
//           onClick={() => setSelectedTag(null)}
//           className={`px-3 py-1 rounded-full text-sm font-medium ${
//             !selectedTag 
//               ? 'bg-coral text-white' 
//               : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//           }`}
//         >
//           Semua
//         </button>
//         {tags.map(tag => (
//           <button
//             key={tag}
//             onClick={() => handleTagClick(tag)}
//             className={`px-3 py-1 rounded-full text-sm font-medium ${
//               selectedTag === tag 
//                 ? 'bg-coral text-white' 
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             {tag}
//           </button>
//         ))}
//       </div>

//       {/* Hero Carousel - Show trending articles */}
//       <section aria-label="Trending articles">
//         <h2 className="text-2xl font-bold mb-4 text-gray-900">
//           {selectedTag ? `Trending dalam ${selectedTag}` : 'Artikel Trending'}
//         </h2>
//         <Carousel
//           showThumbs={false}
//           autoPlay
//           infiniteLoop
//           showStatus={false}
//           interval={5000}
//           onChange={handleSlideChange}
//           className="rounded-xl overflow-hidden shadow-lg"
//         >
//           {trendingArticles.map((article) => (
//             <div key={article.id} className="relative">
//               <img 
//                 src={article.image} 
//                 alt={article.title} 
//                 className="h-96 object-cover w-full"
//                 loading="lazy"
//               />
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
//                 <div className="max-w-3xl mx-auto">
//                   <div className="flex items-center gap-2 mb-2">
//                     <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-coral rounded-full">
//                       {article.category.toUpperCase()}
//                     </span>
//                     <span className="text-xs text-gray-300">
//                       {article.views.toLocaleString()} views
//                     </span>
//                   </div>
//                   <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{article.title}</h3>
//                   <p className="text-gray-200 mb-3">{article.excerpt}</p>
//                   <div className="flex items-center text-sm text-gray-300">
//                     <span>{article.readTime}</span>
//                     <span className="mx-2">•</span>
//                     <span>{formatDate(article.date)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Carousel>
//       </section>

//       {/* Latest Articles */}
//       <section aria-label="Latest articles">
//         <h2 className="text-2xl font-bold mb-6 text-gray-900">
//           {selectedTag ? `Artikel Terbaru tentang ${selectedTag}` : 'Artikel Terbaru'}
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredArticles.map((article) => (
//             <article 
//               key={article.id}
//               className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.01]"
//             >
//               <img 
//                 src={article.image} 
//                 alt={article.title} 
//                 className="w-full h-48 object-cover"
//                 loading="lazy"
//               />
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-2">
//                   <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded">
//                     {article.category}
//                   </span>
//                   <span className="text-xs text-gray-500 flex items-center">
//                     <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                     {article.views.toLocaleString()}
//                   </span>
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
//                 <p className="text-gray-600 mb-4">{article.excerpt}</p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {article.tags.map(tag => (
//                     <span 
//                       key={tag} 
//                       className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded cursor-pointer hover:bg-gray-200"
//                       onClick={() => handleTagClick(tag)}
//                     >
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex justify-between items-center text-sm text-gray-500">
//                   <span>{formatDate(article.date)}</span>
//                   <span>{article.readTime}</span>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       </section>

//       {/* Category Highlights */}
//       <section aria-label="Category highlights">
//         <h2 className="text-2xl font-bold mb-6 text-gray-900">Kategori Populer</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {['history', 'technology'].map(category => {
//             const categoryArticles = articles
//               .filter(a => a.category === category)
//               .sort((a, b) => b.views - a.views)
//               .slice(0, 2);
            
//             return (
//               <div key={category} className="bg-white rounded-xl shadow-md overflow-hidden">
//                 <div className="p-6 border-b border-gray-100">
//                   <h3 className="text-xl font-bold text-coral mb-2">
//                     {category === 'history' ? 'Sejarah' : 'Teknologi'} Terpopuler
//                   </h3>
//                   <p className="text-gray-600">
//                     Artikel dengan pembaca terbanyak dalam kategori ini
//                   </p>
//                 </div>
//                 {categoryArticles.map(article => (
//                   <div key={article.id} className="p-6 border-b border-gray-100 last:border-b-0">
//                     <div className="flex gap-4">
//                       <img 
//                         src={article.image} 
//                         alt={article.title} 
//                         className="w-20 h-20 object-cover rounded-lg"
//                       />
//                       <div>
//                         <h4 className="font-medium text-gray-900">{article.title}</h4>
//                         <div className="flex items-center text-xs text-gray-500 mt-1">
//                           <span>{formatDate(article.date)}</span>
//                           <span className="mx-2">•</span>
//                           <span>{article.views.toLocaleString()} views</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;