import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import { Check, RefreshCw, ArrowRight } from 'lucide-react';

const ConceptSelection = () => {
  const navigate = useNavigate();
  const creativeConcepts = useAppStore(state => state.creativeConcepts);
  const productCount = useAppStore(state => state.productCount);
  const selectConcepts = useAppStore(state => state.selectConcepts);
  const schoolName = useAppStore(state => state.schoolName);

  // Local state for selection before confirming
  const [localSelected, setLocalSelected] = React.useState([]);

  const toggleSelection = (index) => {
    if (localSelected.includes(index)) {
      setLocalSelected(localSelected.filter(i => i !== index));
    } else {
      if (localSelected.length < productCount) {
        setLocalSelected([...localSelected, index]);
      }
    }
  };

  const handleConfirm = () => {
    selectConcepts(localSelected);
    navigate('/design/0/style'); // Go to first series
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">为 {schoolName} 生成的创意灵感</h2>
          <p className="mt-2 text-slate-600">
            请选择 <span className="font-bold text-indigo-600">{productCount}</span> 个您心仪的设计方案以继续。
            ({localSelected.length}/{productCount})
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
            <RefreshCw className="w-4 h-4 mr-2" />
            重新生成
          </button>
          <button
            onClick={handleConfirm}
            disabled={localSelected.length !== productCount}
            className="flex items-center px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            进入设计循环
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creativeConcepts.map((concept, index) => {
          const isSelected = localSelected.includes(index);
          const isDisabled = !isSelected && localSelected.length >= productCount;

          return (
            <div
              key={concept.id}
              onClick={() => !isDisabled && toggleSelection(index)}
              className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/50'
                  : isDisabled
                  ? 'border-slate-100 opacity-50 cursor-not-allowed'
                  : 'border-slate-200 bg-white hover:border-indigo-300'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 bg-indigo-600 text-white p-1 rounded-full">
                  <Check className="w-4 h-4" />
                </div>
              )}
              
              <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${concept.color}`}>
                <span className="text-xl font-bold text-slate-700">{index + 1}</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">{concept.title}</h3>
              <p className="text-sm font-medium text-indigo-600 mb-4">{concept.slogan}</p>
              
              <div className="bg-white/60 p-3 rounded-lg border border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-900 block mb-1">设计价值主张：</span>
                  {concept.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConceptSelection;
