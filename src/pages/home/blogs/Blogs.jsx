import React from 'react';
import blogsData from '../../../../data/blogs.json';

const Blogs = () => {
  return (
    <section className="section__container blog__container">
      {/* 📌 Überschrift & Beschreibung */}
      <h2 className="section__header">Neueste Blog-Artikel</h2>
      <p className="section__subheader">
        Entdecken Sie die neuesten Artikel rund um Mode, Trends und mehr!
      </p>

      {/* 📌 Blog-Karten als Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {blogsData.map((blog) => (
          <div
            key={blog.id || blog.title} // ✅ Nutzt `id` als Key, falls vorhanden
            className="blog__card cursor-pointer hover:scale-105 transition-all duration-300 shadow-md rounded-lg overflow-hidden"
          >
            {/* 📌 Blog-Bild mit Platzhalter, falls kein Bild vorhanden ist */}
            <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
              <img
                src={blog.imageUrl || 'https://via.placeholder.com/300'} // ✅ Platzhalterbild
                alt={blog.title}
                className="object-cover w-full h-full"
              />
            </div>

            {/* 📌 Blog-Text */}
            <div className="blog__card__content p-4">
              <h6 className="text-gray-500 text-sm">{blog.subtitle}</h6>
              <h4 className="text-lg font-bold mt-2">{blog.title}</h4>
              <p className="text-gray-400 text-sm mt-1">{blog.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
