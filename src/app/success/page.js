// IMPORTANT: Ensure this file is saved with UTF-8 encoding.
"use client"; // Next.js App Routerでクライアントコンポーネントとしてマーク

import React from 'react';
import { useRouter } from 'next/navigation'; // Next.js App Router用のuseRouterをインポート

// Tailwind CSSがプロジェクトに設定されていることを前提とします。

// Propsの型定義 (TypeScriptを使用する場合)
// interface SuccessPageProps {
//   awardedPoints?: number;
//   currentTotalPoints: number;
//   celebratedPersonName: string;
// }

function SuccessPage({
    awardedPoints = 2, // デフォルトで2ポイント付与
    currentTotalPoints = 12, // 仮の現在の総ポイント (propsやstateから渡す)
    celebratedPersonName = "山本 竣也", // 仮のお祝いされた人の名前 (propsやstateから渡す)
}) {
    const router = useRouter(); // useRouterフックを取得

    // ホームに戻るボタンの処理
    const handleReturn = () => {
        // Next.jsのルーターを使ってホーム (または指定のパス) に遷移
        router.push('/'); // ルートパスに戻る
    };

    return (
        // 背景をダークモード風のグラデーションに変更
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black p-4 font-['Inter',_sans-serif] text-gray-100">
            {/* カード部分の背景も調整 */}
            <div className="bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-md p-8 sm:p-12 rounded-xl shadow-2xl w-full max-w-lg text-center transform transition-all hover:scale-105 duration-300">
                {/* お祝いのアイコン */}
                <div className="text-6xl mb-6 animate-bounce">🎉</div>

                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                    おめでとうございます！
                </h1>

                <p className="text-xl sm:text-2xl mb-6 text-gray-200">
                    <span className="font-semibold text-yellow-400">{celebratedPersonName}</span> さんをお祝いしました！
                </p>

                {/* ポイント表示部分の背景とテキスト色を調整 */}
                <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg mb-8 shadow-inner">
                    <p className="text-2xl sm:text-3xl font-semibold text-green-400 mb-2">
                        +{awardedPoints}ポイント獲得！
                    </p>
                    <p className="text-lg sm:text-xl text-gray-300">
                        現在の総ポイント: <span className="font-bold text-yellow-400">{currentTotalPoints}</span> ポイント
                    </p>
                </div>

                <button
                    onClick={handleReturn}
                    className="w-full max-w-xs mx-auto py-3 px-6 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    ホームに戻る
                </button>
            </div>

            <footer className="absolute bottom-4 text-center w-full text-sm text-gray-400 text-opacity-80">
                <p>&copy; {new Date().getFullYear()} あなたのアプリ名. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default SuccessPage;
