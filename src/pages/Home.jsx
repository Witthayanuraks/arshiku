import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import '../index.css';

const articles = [
  {
    id: 1,
    title: 'Sejarah Kemerdekaan Indonesia',
    image: 'https://source.unsplash.com/800x400/?indonesia,history',
    excerpt: 'Bagaimana perjuangan bangsa menuju kemerdekaan...',
  },
  {
    id: 2,
    title: '10 Fakta Unik Dunia Teknologi',
    image: 'https://source.unsplash.com/800x400/?technology,facts',
    excerpt: 'Teknologi ternyata punya sisi unik yang jarang diketahui...',
  },
  {
    id: 3,
    title: 'Tips Aman Menggunakan Internet',
    image: 'https://source.unsplash.com/800x400/?cyber,security',
    excerpt: 'Jangan sampai datamu bocor, ini tipsnya...',
  },
  {
    id: 4,
    title: 'Kerajaan Majapahit: Kebangkitan Nusantara',
    image: 'https://source.unsplash.com/800x400/?majapahit,history',
    excerpt: 'Mengupas kejayaan kerajaan terbesar di Nusantara...',
  },
];

const Home = () => {
  return (
    <div className="space-y-10 bg-lightGray text-darkGray">
      {/* Carousel Section */}
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        className="rounded-lg overflow-hidden"
      >
        {articles.map((article) => (
          <div key={article.id}>
            <img src={article.image} alt={article.title} className="h-80 object-cover w-full" />
            <div className="legend bg-darkGray bg-opacity-80 text-white p-4 text-left">
              <h3 className="text-xl font-bold">{article.title}</h3>
              <p className="text-sm">{article.excerpt}</p>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Grid Layout Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Item 1 */}
        <div className="md:col-span-3 bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold text-coral">{articles[0].title}</h2>
          <p className="text-sm text-darkGray">{articles[0].excerpt}</p>
        </div>

        {/* Item 2 & 3 */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold text-coral">{articles[1].title}</h2>
          <p className="text-sm text-darkGray">{articles[1].excerpt}</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold text-coral">{articles[2].title}</h2>
          <p className="text-sm text-darkGray">{articles[2].excerpt}</p>
        </div>

        {/* Item 4 */}
        <div className="md:col-span-3 bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold text-coral">{articles[3].title}</h2>
          <p className="text-sm text-darkGray">{articles[3].excerpt}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
