import React from "react";
import { ArrowRight, ShoppingBag, ShieldCheck, Truck } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useContext } from "react";
import { ProductContext } from "../utils/context/ProductApi.jsx";

import "swiper/css";
import "swiper/css/pagination";
import { NavLink } from "react-router-dom";

export default function EcommerceHero() {
  const { products } = useContext(ProductContext);
  

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* LEFT CONTENT */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <ShoppingBag size={14} />
              New Collection 2026
            </div>

            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white">
              Premium Products
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Built For Modern Life
              </span>
            </h1>

            <p className="mt-4 text-slate-400 text-base max-w-xl leading-relaxed">
              Discover premium products designed with quality, performance, and
              elegance. Elevate your lifestyle with carefully crafted essentials
              for work, travel, and everyday use.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl text-white font-semibold transition-all duration-300">
                Shop Now
                <ArrowRight size={16} />
              </button>

              <button className="border border-slate-800 hover:border-slate-700 px-5 py-3 rounded-xl text-slate-300 hover:text-white transition-all duration-300">
                Explore Products
              </button>
            </div>

            <div className="flex flex-wrap gap-6 mt-8 pt-5 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-blue-400" size={16} />
                <span className="text-slate-400 text-sm">
                  Secure Warranty
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Truck className="text-blue-400" size={16} />
                <span className="text-slate-400 text-sm">
                  Worldwide Shipping
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT CAROUSEL */}
          <div className="border border-slate-800 rounded-2xl overflow-hidden relative">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              loop
              className="rounded-2xl overflow-hidden"
            >
              {products.slice(0, 4).map((item, index) => (
                
                <SwiperSlide key={index}>
                  <div className="relative h-[320px] sm:h-[380px] md:h-[450px] lg:h-[500px]">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium">
                        Featured Product
                      </span>

                      <div className="mt-3 flex justify-between items-end gap-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-white">
                            {item.title}
                          </h3>

                          {/* <p className="text-slate-300 text-sm mt-2 max-w-sm">
                            {item.description}
                          </p> */}
                        </div>

                        <span className="text-xl md:text-2xl font-bold text-white">
                          {item.price}
                        </span>
                      </div>
                      <NavLink to={`/products/${item.id}`} key={index}>
                      <button className="mt-4 flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-200 px-4 py-2.5 rounded-lg font-semibold transition">
                        Buy Now
                        <ArrowRight size={15} />
                      </button>
                      </NavLink>
                    </div>
                  </div>
                  
                </SwiperSlide>
                
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <style>{`
        .swiper-pagination {
          bottom: 10px !important;
        }

        .swiper-pagination-bullet {
          background: #94a3b8;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          background: #3b82f6;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}