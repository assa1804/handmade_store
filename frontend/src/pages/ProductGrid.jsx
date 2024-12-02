import React, { useEffect, useState } from "react";
import "./ProductGrid.css";
import card1 from '../images/card 1.webp';
import card2 from '../images/card 2.webp';
import light1 from '../images/đèn 1.webp';
import candles from '../images/nến 1.webp';
import teddy from '../images/teddy.webp';
import vong from '../images/vòng 2.webp';
import bag1 from '../images/túi 1.webp';
import bag2 from '../images/túi 2.webp';
import bag3 from '../images/túi 3.webp';
import mu3 from '../images/mũ len 3.webp';
import khuyen from '../images/khuyên tai.webp';
import toy from '../images/toy.webp';
import khoa from '../images/móc khóa 1.webp';
import vong3 from '../images/vòng 3.webp';
import mu1 from '../images/mũ len 1.webp';
import dream from '../images/dream 1.webp';
import Jewelry from '../images/vòng 1.webp';
import hat from '../images/mũ len 2.webp';


function ProductGrid({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [currentTab, setCurrentTab] = useState("New Arrivals");

  // Sản phẩm mẫu
  const sampleProducts = [
    {
      _id: "1",
      LOAISP: "New Arrivals",
      TENSP: "Set thiệp Handmade",
      MOTA: "Set thiệp Handmade làm tặng người yêu, bạn bè",
      GIATIEN: 49000,
      SOLUONG: 64,
      HINHANH: card1,
    },
    {
      _id: "2",
      LOAISP: "New Arrivals",
      TENSP: "Đèn Mặt Trăng",
      MOTA: "Đèn Mặt Trăng DIY Hoa Hồng Bướm Handmade",
      GIATIEN: 53000,
      SOLUONG: 148,
      HINHANH: light1,
    },
    {
      _id: "3",
      LOAISP: "Popular",
      TENSP: "Thiệp sinh nhật",
      MOTA: "Thiệp sinh nhật bánh 3D",
      GIATIEN: 55222,
      SOLUONG: 13,
      HINHANH: card2,
    },
    {
      _id: "4",
      LOAISP: "On Sale",
      TENSP: "Nến thơm",
      MOTA: "Nến thơm Sò Biển tự làm, làm Quà Sinh Nhật, Quà tặng Người Yêu",
      GIATIEN: 70000,
      SOLUONG: 89,
      HINHANH: candles,
    },
    {
      _id: "5",
      LOAISP: "On Sale",
      TENSP: "Túi handmade",
      MOTA: "Túi handmade tự đan, túi đeo chéo pom pom thời trang Hàn Quốc",
      GIATIEN: 92000,
      SOLUONG: 56,
      HINHANH: bag1,
    },
    {
      _id: "6",
      LOAISP: "On Sale",
      TENSP: "đồ chơi",
      MOTA: "Bộ đồ chơi làm thú nhồi bông đáng yêu",
      GIATIEN: 86000,
      SOLUONG: 145,
      HINHANH: toy,
    },
    {
      _id: "7",
      LOAISP: "On Sale",
      TENSP: "Mũ dệt kim thu đông",
      MOTA: "Mũ dệt kim thu đông",
      GIATIEN: 61299,
      SOLUONG: 11,
      HINHANH: mu3,
    },
    {
      _id: "8",
      LOAISP: "Featured",
      TENSP: "móc khóa",
      MOTA: "Bộ dụng cụ tự làm móc khóa",
      GIATIEN: 138998,
      SOLUONG: 126,
      HINHANH: khoa,
    },
    {
      _id: "9",
      LOAISP: "Featured",
      TENSP: "Khuyên tai nữ",
      MOTA: "Khuyên tai nữ đất sét Handmade - Thỏ ngọc Trung thu",
      GIATIEN: 65000,
      SOLUONG: 16,
      HINHANH: khuyen,
    },
    {
      _id: "10",
      LOAISP: "Featured",
      TENSP: "Dreamcatcher",
      MOTA: "Dreamcatcher",
      GIATIEN: 120000,
      SOLUONG: 41,
      HINHANH: dream,
    },
    {
      _id: "11",
      LOAISP: "Featured",
      TENSP: "Túi tự đan",
      MOTA: "Túi tự đan da PU cao cấp xách tay, túi đeo chéo nữ bằng da tự làm",
      GIATIEN: 128000,
      SOLUONG: 42,
      HINHANH: bag2,
    },
    {
      _id: "12",
      LOAISP: "New Arrivals",
      TENSP: "Vòng tay pha lê",
      MOTA: "loại màu xanh",
      GIATIEN: 24000,
      SOLUONG: 123,
      HINHANH: vong,
    },
    {
      _id: "13",
      LOAISP: "Popular",
      TENSP: "Gấu Teddy",
      MOTA: "Gói chất liệu Gấu Teddy DIY Tự Làm",
      GIATIEN: 60997,
      SOLUONG: 28,
      HINHANH: teddy,
    },
    {
      _id: "14",
      LOAISP: "New Arrivals",
      TENSP: "Mũ len tai mèo",
      MOTA: "Mũ len tai mèo dễ thương dành cho nữ",
      GIATIEN: 54000,
      SOLUONG: 59,
      HINHANH: mu1,
    },
    {
      _id: "15",
      LOAISP: "New Arrivals",
      TENSP: "Vòng tay hoa cúc daisy",
      MOTA: "Vòng tay handmade đan hoa cúc daisy",
      GIATIEN: 29900,
      SOLUONG: 85,
      HINHANH: vong3,
    },
    {
      _id: "16",
      LOAISP: "New Arrivals",
      TENSP: "Túi tự đan da PU cao cấp",
      MOTA: "Túi tự đan da PU cao cấp xách tay, túi đeo chéo nữ bằng da tự làm",
      GIATIEN: 128000,
      SOLUONG: 65,
      HINHANH: bag3,
    },
    {
      _id: "17",
      LOAISP: "Popular",
      TENSP: "Vòng tay pha lê ",
      MOTA: "loại màu trắng",
      GIATIEN: 22000,
      SOLUONG: 350,
      HINHANH: Jewelry,
    },
    {
      _id: "18",
      LOAISP: "Popular",
      TENSP: "Mũ dệt kim thu đông",
      MOTA: "Mũ dệt kim thu đông Little Devil tai mèo sọc",
      GIATIEN: 58099,
      SOLUONG: 62,
      HINHANH: hat,
    },
  ];

  // Lấy dữ liệu sản phẩm từ API (hoặc dùng sản phẩm mẫu nếu lỗi)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products, using sample data:", error);
        setProducts(sampleProducts); // Sử dụng sản phẩm mẫu nếu API bị lỗi
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); // Gọi hàm addToCart từ props để cập nhật giỏ hàng
  };

  return (
    <div className="product-grid">
      <h2>PRODUCTS</h2>
      <div className="tabs">
        {["New Arrivals", "Popular", "Featured", "On Sale"].map((tab) => (
          <button
            key={tab}
            onClick={() => setCurrentTab(tab)}
            className={currentTab === tab ? "active" : ""}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="product-list">
        {products
          .filter((product) => product.LOAISP === currentTab) // Lọc theo loại sản phẩm
          .map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.HINHANH} alt={product.TENSP} /> {/* Hiển thị hình ảnh */}
              <h3>{product.TENSP}</h3>
              <p>{product.MOTA}</p>
              <p>Price: {(parseInt(product.GIATIEN) / 1000).toFixed(2)} VND</p>
              <p>Stock: {product.SOLUONG}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
      </div>
      <button className="load-more">Load More</button>
    </div>
  );
}

export default ProductGrid;
