import React from "react";
import donation from "../../assets/pipp.svg";
import gambar from "../../assets/gambar.svg";

export const Home=()=> {
return (<>
  <div className="parent">
    <div className="div1">
      <h2>halo, selamat datang</h2>
      <p>Ayo Bagikan barang layak pakai kamu sekarang</p>
      <p>kamu bingung barang dirumah menumpuk dirumah?</p>
    </div>

    <div className="div2"> <img className="svgImg" src={ donation } alt="asd" /> </div>

    <div className="div3"> <img className="svgImg" src={ gambar } alt="" /> </div>

    <div className="div4">
      <h2>aplikasi barang laya pakai</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A pariatur odit veritatis exercitationem nihil
        laudantium rerum voluptatibus, necessitatibus culpa, laboriosam mollitia itaque reiciendis inventore eligendi
        ea? Inventore impedit quaerat dolor.</p>
    </div>
  </div>
</>)
}

;