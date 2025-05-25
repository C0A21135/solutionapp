"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, QrCode, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import "./styles.css"; // Add necessary CSS for 3D effect

const departments = [
  {
    name: "部門A",
    progress: 25, // 部門Aの進捗
    teams: [
      {
        name: "部署A1",
        progress: 50, // 部署A1の進捗
        employees: [
          { name: "山田太郎", date: "2024/04/01", image: "/users/user_a.png", style: "gold" },
          { name: "佐藤小太郎", date: "2024/04/05", image: "/users/user_b.png", style: "blue" },
        ],
      },
      {
        name: "部署A2",
        progress: 0, // 部署A2の進捗
        employees: [
          { name: "小林洋一", date: "2024/04/10", image: "/users/user_c.png", style: "blue" },
          { name: "田中花子", date: "2024/04/15", image: "/users/user_d.png", style: "blue" },
        ],
      },
    ],
  },
  {
    name: "部門B",
    progress: 0, // 部門Bの進捗
    teams: [
      {
        name: "部署B1",
        progress: 0, // 部署B1の進捗
        employees: [
          { name: "森本一之介", date: "2024/05/01", image: "/users/user_e.png", style: "blue" },
        ],
      },
    ],
  },
];

function ProgressBar({ percent }) {
  return (
    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
      <div
        className="bg-green-500 h-2 rounded-full"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}

function RotatingMedal({ front, back, style }) {
    const [flipped, setFlipped] = useState(false);
  
    const handleFlip = () => {
      setFlipped(!flipped);
    };
  
    const baseClass =
      "absolute w-full h-full rounded-full border-4 flex items-center justify-center shadow-md overflow-hidden [backface-visibility:hidden]";
  
    const frontClass =
      style === "gold"
        ? `${baseClass} border-yellow-500 bg-yellow-600`
        : `${baseClass} border-blue-500 bg-blue-600`;
  
    const backClass =
      style === "gold"
        ? `${baseClass} rotate-y-180 border-yellow-500 bg-yellow-700 text-white text-sm`
        : `${baseClass} rotate-y-180 border-blue-500 bg-blue-700 text-white text-sm`;
  
    return (
      <div className="w-12 h-12 mr-2" onClick={handleFlip}>
        <motion.div
          className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          <div className={frontClass}>
            <img
              src={front}
              alt="medal front"
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <div className={backClass}>{back}</div>
        </motion.div>
      </div>
    );
  }
  

export default function CollectionPage() {
  const [openDept, setOpenDept] = useState(null);
  const [openTeam, setOpenTeam] = useState(null);
  const router = useRouter();

  return (
    <div className="min-h-screen pb-20 bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold mb-4">社員図鑑</h1>
      {departments.map((dept, deptIdx) => (
        <div key={deptIdx} className="mb-4">
          <div
            onClick={() =>
              setOpenDept(openDept === deptIdx ? null : deptIdx)
            }
            className="bg-gray-800 p-3 rounded-lg shadow mb-1 cursor-pointer"
          >
            <div className="font-semibold">{dept.name}</div>
            <ProgressBar percent={dept.progress} />
            <div className="text-xs mt-1">進捗 {dept.progress}%</div>
          </div>

          {openDept === deptIdx &&
            dept.teams.map((team, teamIdx) => (
              <div key={teamIdx} className="ml-4 mb-2">
                <div
                  onClick={() =>
                    setOpenTeam(openTeam === `${deptIdx}-${teamIdx}`
                      ? null
                      : `${deptIdx}-${teamIdx}`)
                  }
                  className="bg-gray-700 p-3 rounded-lg shadow cursor-pointer"
                >
                  <div className="font-medium">{team.name}</div>
                  <ProgressBar percent={team.progress} />
                  <div className="text-xs mt-1">進捗 {team.progress}%</div>
                </div>

                {openTeam === `${deptIdx}-${teamIdx}` && (
                  <div className="ml-4 mt-2 space-y-2">
                    {team.employees.map((emp, empIdx) => (
                      <div
                        key={empIdx}
                        className="flex items-center bg-gray-800 p-2 rounded-lg shadow cursor-pointer"
                      >
                        <RotatingMedal
                          front={emp.image}
                          back={emp.date}
                          style={emp.style}
                        />
                        <div className="ml-2 text-sm font-medium" onClick={() => router.push(`/profile/${emp.name}`)}>
                          {emp.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      ))}

      {/* メニューバー */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-gray-800 text-white shadow-md flex justify-around items-center">
        <button
          className="flex flex-col items-center text-xs"
          onClick={() => router.push("/home")}
        >
          <Home size={20} />ホーム
        </button>
        <button
          className="flex flex-col items-center text-xs"
          onClick={() => router.push("/qr")}
        >
          <QrCode size={20} />QR読み取り
        </button>
        <button
          className="flex flex-col items-center text-xs"
          onClick={() => router.push("/edit")}
        >
          <Pencil size={20} />プロフィール編集
        </button>
      </div>
    </div>
  );
}
