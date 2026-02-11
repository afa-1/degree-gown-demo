import React, { useState, useEffect } from 'react';
import useAppStore from '../store/useAppStore';
import { FileText, Globe, Download, Share2, Play, CheckCircle } from 'lucide-react';

const Production = () => {
  const deliveryFormat = useAppStore(state => state.deliveryFormat);
  const setDeliveryFormat = useAppStore(state => state.setDeliveryFormat);
  const isRendering = useAppStore(state => state.isRendering);
  const renderingProgress = useAppStore(state => state.renderingProgress);
  const startRendering = useAppStore(state => state.startRendering);
  const updateRenderingProgress = useAppStore(state => state.updateRenderingProgress);
  const finishRendering = useAppStore(state => state.finishRendering);
  const seriesData = useAppStore(state => state.seriesData);

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isRendering) {
      const interval = setInterval(() => {
        updateRenderingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            finishRendering('https://example.com/video.mp4');
            setIsCompleted(true);
            return 100;
          }
          return prev + 5; // Faster progress
        });
      }, 50); // Faster interval
      return () => clearInterval(interval);
    }
  }, [isRendering, updateRenderingProgress, finishRendering]);

  const handleStart = () => {
    startRendering();
  };

  if (isCompleted) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-slate-900 mb-4">生产完成！</h2>
        <p className="text-slate-600 mb-10">您的学位服营销素材已准备就绪，包含 {seriesData.length} 个系列的高清视频与展示文档。</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center justify-center">
              <FileText className="w-5 h-5 mr-2 text-indigo-600" />
              演示文稿预览
            </h3>
            <div className="aspect-video bg-slate-100 rounded mb-4 overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800" alt="PPT Preview" className="w-full h-full object-cover" />
            </div>
            <button className="w-full py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50">
              在线预览 PPT
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center justify-center">
              <Play className="w-5 h-5 mr-2 text-indigo-600" />
              高清视频展示
            </h3>
            <div className="aspect-video bg-black rounded mb-4 overflow-hidden relative group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800" alt="Video Preview" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-12 h-12 text-white opacity-90" />
              </div>
            </div>
            <button className="w-full py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50">
              播放完整视频
            </button>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition-all">
            <Download className="w-5 h-5 mr-2" />
            下载全部文件包 (ZIP)
          </button>
          <button className="flex items-center px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm transition-all">
            <Share2 className="w-5 h-5 mr-2" />
            分享在线链接
          </button>
        </div>
      </div>
    );
  }

  if (isRendering) {
    return (
      <div className="max-w-2xl mx-auto text-center pt-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">正在批量渲染与排版...</h2>
        
        <div className="mb-2 flex justify-between text-sm font-medium text-slate-600">
          <span>Processing {seriesData.length} Series</span>
          <span>{Math.round(renderingProgress)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden mb-8">
          <div 
            className="bg-indigo-600 h-full rounded-full transition-all duration-200 ease-out"
            style={{ width: `${renderingProgress}%` }}
          />
        </div>

        <div className="space-y-4 text-left max-w-md mx-auto">
          <div className="flex items-center text-slate-500 text-sm">
            <div className={`w-2 h-2 rounded-full mr-3 ${renderingProgress > 10 ? 'bg-green-500' : 'bg-slate-300'}`} />
            启动 GPU 渲染实例...
          </div>
          <div className="flex items-center text-slate-500 text-sm">
            <div className={`w-2 h-2 rounded-full mr-3 ${renderingProgress > 30 ? 'bg-green-500' : 'bg-slate-300'}`} />
            生成高清实拍合成图...
          </div>
          <div className="flex items-center text-slate-500 text-sm">
            <div className={`w-2 h-2 rounded-full mr-3 ${renderingProgress > 60 ? 'bg-green-500' : 'bg-slate-300'}`} />
            渲染动态视频素材...
          </div>
          <div className="flex items-center text-slate-500 text-sm">
            <div className={`w-2 h-2 rounded-full mr-3 ${renderingProgress > 80 ? 'bg-green-500' : 'bg-slate-300'}`} />
            排版生成演示文档...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-8">3.1 交付物格式配置</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { id: 'ppt', label: '演示文稿 (PPT)', icon: FileText },
          { id: 'web', label: '在线网页', icon: Globe },
          { id: 'both', label: 'PPT + 网页', icon: Share2 },
        ].map((format) => {
          const Icon = format.icon;
          return (
            <div
              key={format.id}
              onClick={() => setDeliveryFormat(format.id)}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all text-center ${
                deliveryFormat === format.id
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 hover:border-indigo-300 bg-white'
              }`}
            >
              <div className="flex justify-center mb-4">
                <Icon className="w-8 h-8" />
              </div>
              <span className="font-bold">{format.label}</span>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
        <h3 className="font-bold text-slate-900 mb-4">即将生成的资产清单</h3>
        <ul className="space-y-3">
          {seriesData.map((series, idx) => (
            <li key={idx} className="flex items-start">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold mr-3 mt-0.5">
                {idx + 1}
              </span>
              <div>
                <span className="font-medium text-slate-900">系列 {idx + 1}: {series.concept?.title}</span>
                <p className="text-sm text-slate-500">
                  {series.selectedPhotos?.length} 张实拍图 + {series.videoPreset === 'cinematic' ? '电影级' : '动态'}视频 + 专属文案
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleStart}
          className="px-10 py-4 bg-indigo-600 text-white font-bold text-lg rounded-xl hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          开始批量生产
        </button>
      </div>
    </div>
  );
};

export default Production;
