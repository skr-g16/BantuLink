import React from "react";
import donation from "../../assets/pipp.svg";
import gambar from "../../assets/gambar.svg";

export const Home = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col justify-center p-4">
          <h2 className="text-2xl font-bold mb-2">Halo, Selamat Datang</h2>
          <p className="mb-2">Ayo Bagikan barang layak pakai kamu sekarang</p>
          <p>Kamu bingung barang dirumah menumpuk dirumah?</p>
        </div>

        <div className="flex justify-center items-center p-4">
          <img className="svgImg" src={donation} alt="Donation" />
        </div>

        <div className="flex justify-center items-center p-4">
          <img className="svgImg" src={gambar} alt="Image" />
        </div>

        <div className="flex flex-col justify-center p-4">
          <h2 className="text-2xl font-bold mb-2">Aplikasi Barang Layak Pakai</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A pariatur odit veritatis exercitationem nihil
            laudantium rerum voluptatibus, necessitatibus culpa, laboriosam mollitia itaque reiciendis inventore eligendi
            ea? Inventore impedit quaerat dolor.</p>
        </div>
      </div>
    </div>
  );
};