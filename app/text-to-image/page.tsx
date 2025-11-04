"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchModels,
  generateImage,
  setPrompt,
  setSelectedModel,
} from "@/lib/features/artSlice";
import { ArrowLeft, Loader2, Download } from "lucide-react";
import Image from "next/image";

export default function TextToImagePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    prompt,
    models,
    selectedModel,
    isLoadingModels: loading,
    error,
    generatedImage,
    isLoadingImage,
  } = useAppSelector((state) => state.art);
  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  const [localPrompt, setLocalPrompt] = useState(prompt);

  //  when prompt exists and model is selected
  useEffect(() => {
    if (prompt || selectedModel) {
      console.log("prompt is changed, and model is changed generate an image now");
      dispatch(generateImage({ prompt, model: selectedModel! }));
    }
  }, [prompt, selectedModel, dispatch]);

  const handleGenerate = async () => {
    if (!localPrompt.trim() || !selectedModel) {
      return;
    }
    dispatch(setPrompt(localPrompt));
    await dispatch(
      generateImage({ prompt: localPrompt, model: selectedModel })
    );
  };

  const handleModelSelect = (modelName: string) => {
    dispatch(setSelectedModel(modelName));
  };

  return (
    <>
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Inspirations</span>
      </button>
      <div className="min-h-screen bg-[#0e0e0e] text-white flex justify-center items-center p-6">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-linear-to-b from-gray-800 to-black rounded-2xl shadow-xl p-4 flex justify-center items-center">
            {generatedImage && (
              <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-purple-500/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Generated Image
                  </h3>
                  <a
                    href={generatedImage}
                    download
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                </div>
                <img
                  src={generatedImage}
                  alt="Generated artwork"
                  className="w-full rounded-lg"
                />
              </div>
            )}
            {error && (
              <div className="text-red-400 bg-red-900/30 border border-red-500/40 p-3 rounded-lg mt-4">
                {error}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <textarea
                value={localPrompt}
                onChange={(e) => setLocalPrompt(e.target.value)}
                placeholder="Describe what you want to create..."
                className="w-full bg-gray-900/60 border border-gray-700 focus:border-purple-500 focus:outline-none rounded-xl p-4 text-white text-base h-28 resize-none"
              />

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Models & Styles</h3>
                {loading ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {models.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => handleModelSelect(m.name)}
                        className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                          selectedModel === m.id
                            ? "border-purple-500 shadow-md shadow-purple-500/40"
                            : "border-gray-700 hover:border-purple-400"
                        }`}
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={m.image}
                            alt={m.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="bg-gray-800 text-center py-2 text-sm">
                          {m.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!localPrompt.trim() || !selectedModel}
              className={`mt-8 w-full py-4 rounded-xl text-lg font-semibold transition-all ${
                !localPrompt.trim() || !selectedModel
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-linear-to-r from-pink-500 to-orange-400 text-white hover:opacity-90 cursor-pointer"
              }`}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
