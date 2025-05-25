"use client";

import React, { useState } from "react";
import { Home, QrCode, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import "./styles.css"; // Add necessary CSS for 3D effect
import { useParams } from "next/navigation";

const medals = [
  { front: "/hobbies/cat.png", back: "猫" },
  { front: "/hobbies/meat.png", back: "お肉" },
  { front: "/hobbies/mountain.png", back: "登山" }
];

const clubs = [
  { front: "/hobbies/mahjong.png", back: "麻雀" },
  { front: "/hobbies/pingpong.png", back: "卓球" }
];


function RotatingMedal({ front, back }) {
    const [flipped, setFlipped] = useState(false);
  
    const handleFlip = () => {
      setFlipped(!flipped);
    };
  
    return (
      <div className="w-20 h-20" onClick={handleFlip}>
        <motion.div
          className={`medal relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${flipped ? "rotate-y-180" : ""}`}
        >
          <div className="absolute w-full h-full backface-hidden rounded-full border-4 border-yellow-500 bg-yellow-600 flex items-center justify-center shadow-md overflow-hidden">
            <img src={front} alt="medal front" className="object-cover w-full h-full rounded-full" />
          </div>
          <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-full border-4 border-yellow-500 bg-yellow-700 text-white flex items-center justify-center text-sm shadow-md">
            {back}
          </div>
        </motion.div>
      </div>
    );
  }
  
  export default function EmployeeProfile() {
    const { name } = useParams();

    return (
      <div className="relative min-h-screen pb-20 bg-gray-900 text-white">
        {/* 戻るボタン */}
        <button className="absolute top-2 left-2 text-sm px-2 py-1 bg-gray-700 text-white rounded">← 戻る</button>
  
        <div className="p-4 max-w-sm mx-auto space-y-4 pt-10">
          {/* 上部セクション */}
          <div className="flex items-start space-x-4">
            {/* 左：アイコン */}
            <div className="w-16 h-16 rounded-full border-4 border-yellow-500 bg-yellow-600 flex-shrink-0">
                <img src="/users/user_a.png" alt="User Icon" className="w-full h-full rounded-full object-cover" />
            </div>
  
            {/* 中央：名前、部署、スキル・趣味 */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold"> {decodeURIComponent(name)} </h2>
              <p className="text-sm text-gray-300">人事部</p>
              <div className="mt-1 flex flex-wrap gap-1">
                <span className="text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded-full">#歌うこと</span>
                <span className="text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded-full">#麻雀</span>
              </div>
            </div>
  
            {/* 右：メモ欄 */}
            <textarea
              placeholder="メモ"
              className="w-30 h-24 p-1 text-sm border border-gray-600 bg-gray-800 text-white rounded resize-none"
            />
          </div>
  
          {/* 中央セクション：参加プロジェクト */}
          <div>
            <h3 className="text-sm font-semibold mb-2">参加プロジェクト</h3>
            <div className="flex flex-wrap gap-3">
              <div className="p-3 w-36 h-20 bg-gray-800 text-white rounded-lg shadow text-xs">プロジェクトX</div>
              <div className="p-3 w-36 h-20 bg-gray-800 text-white rounded-lg shadow text-xs">隣の芝生は青いPJ</div>
              <div className="p-3 w-36 h-20 bg-gray-800 text-white rounded-lg shadow text-xs">猫好き社員を増やすPJ</div>
            </div>
          </div>
  
          {/* 好きなもの */}
          <div>
            <h3 className="text-sm font-semibold mb-2">好きなもの</h3>
            <div className="flex flex-wrap gap-3">
              {medals.map((item, idx) => (
                <RotatingMedal key={idx} front={item.front} back={item.back} />
              ))}
            </div>
          </div>
  
          {/* 部活 */}
          <div>
            <h3 className="text-sm font-semibold mb-2">部活</h3>
            <div className="flex flex-wrap gap-3">
              {clubs.map((item, idx) => (
                <RotatingMedal key={idx} front={item.front} back={item.back} />
              ))}
            </div>
          </div>
        </div>
  
        {/* メニューバー */}
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-gray-800 text-white shadow-md flex justify-around items-center">
          <button className="flex flex-col items-center text-xs">
            <Home size={20} />ホーム
          </button>
          <button className="flex flex-col items-center text-xs">
            <QrCode size={20} />QR読み取り
          </button>
          <button className="flex flex-col items-center text-xs">
            <Pencil size={20} />プロフィール編集
          </button>
        </div>
      </div>
    );
  }
  