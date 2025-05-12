// IMPORTANT: Ensure this file is saved with UTF-8 encoding.
"use client"; // If using in Next.js App Router context

import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation'; // Uncomment if using Next.js navigation

// Tailwind CSSがプロジェクトに設定されていることを前提とします。

const secretQuestionsData = [
    {
        id: 1,
        question: "好きな食べ物は？",
        answer: "ポテト" // 回答は実際のものに置き換えてください
    },
    {
        id: 2,
        question: "ペットの名前は？",
        answer: "ポチ" // 回答は実際のものに置き換えてください
    },
    {
        id: 3,
        question: "卒業した小学校の名前は？",
        answer: "さくら小学校" // 回答は実際のものに置き換えてください
    },
    {
        id: 4,
        question: "好きな映画のタイトルは？",
        answer: "ショーシャンクの空に" // 回答は実際のものに置き換えてください
    }
];

// 次のページへの遷移先URL (Next.jsの場合は useRouter を使用)
const SUCCESS_PAGE_URL = '/success'; // 例: '/thank-you' や '/dashboard' など

function SecretQuestionPage() { // Renamed from App to be more specific
    // const router = useRouter(); // Uncomment if using Next.js navigation
    const [selectedQuestionId, setSelectedQuestionId] = useState('');
    const [answer, setAnswer] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // コンポーネントマウント時に最初の質問を選択状態にする
    useEffect(() => {
        if (secretQuestionsData.length > 0) {
            setSelectedQuestionId(secretQuestionsData[0].id.toString());
        }
    }, []);

    const handleQuestionChange = (event) => {
        setSelectedQuestionId(event.target.value);
        setErrorMessage(''); // 質問を変更したらエラーメッセージをクリア
    };

    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
        setErrorMessage(''); // 回答を変更したらエラーメッセージをクリア
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage('');

        if (!answer.trim()) {
            setErrorMessage('回答を入力してください。');
            return;
        }

        const selectedSecret = secretQuestionsData.find(
            (item) => item.id.toString() === selectedQuestionId
        );

        if (selectedSecret) {
            if (answer.trim().toLowerCase() === selectedSecret.answer.toLowerCase()) { // Case-insensitive comparison
                alert('認証に成功しました。\n次のページに遷移します。');
                // Next.js navigation:
                // router.push(SUCCESS_PAGE_URL);
                // Standard browser navigation:
                window.location.href = SUCCESS_PAGE_URL;
            } else {
                setErrorMessage('質問または回答が一致しません。');
            }
        } else {
            setErrorMessage('選択された質問が見つかりません。システム管理者に連絡してください。');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black p-4 font-['Inter',_sans-serif] text-gray-100">
            <div className="bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-md p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-white">山本さんのおめでとう ありがとうページ！</h1>
                <p className="text-sm text-gray-300 mb-6 text-center">
                    おめでとうの確認のため、設定された質問の回答を入力してください。
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="questionSelect" className="block mb-2 font-semibold text-gray-200">
                            質問を選択してください:
                        </label>
                        <select
                            id="questionSelect"
                            name="question"
                            value={selectedQuestionId}
                            onChange={handleQuestionChange}
                            className="w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        >
                            {secretQuestionsData.map((item) => (
                                <option key={item.id} value={item.id.toString()} className="bg-gray-700 text-gray-100">
                                    {item.question}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="answerInput" className="block mb-2 font-semibold text-gray-200">
                            回答:
                        </label>
                        <input
                            type="text" // Consider type="password" if the answer should be masked
                            id="answerInput"
                            name="answer"
                            value={answer}
                            onChange={handleAnswerChange}
                            className="w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="回答を入力"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        次へ
                    </button>
                </form>

                {errorMessage && (
                    <div className="mt-5 p-3 bg-red-700 bg-opacity-50 border border-red-500 text-red-200 rounded-md text-center">
                        {errorMessage}
                    </div>
                )}
            </div>
             <footer className="absolute bottom-4 text-center w-full text-sm text-gray-400 text-opacity-80">
                <p>&copy; {new Date().getFullYear()} あなたのアプリ名. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default SecretQuestionPage; // Changed from App
