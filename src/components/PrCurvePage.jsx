import  { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useSearchResults } from '../SearchResultsContext';
import PrCurveTable from './PrCurveTable';
import { Link } from 'react-router-dom';

const PrCurvePage = () => {
  const { feedbackArray, searchResults } = useSearchResults();

  // Mock data for demonstration purposes
  const initialPrecisionRecallData = {
    recall: [0.1, 0.2, 0.3, 0.4, 0.5],
    precision: [0.8, 0.7, 0.6, 0.5, 0.4],
    type: 'scatter',
    mode: 'lines',
    line: { color: 'rgba(75,192,192,1)' },
  };

  const [precisionRecallData, setPrecisionRecallData] = useState(initialPrecisionRecallData);

  useEffect(() => {
    console.log(feedbackArray);
    let relevantRetrieved = 0;
    const totalRelevant = feedbackArray.filter((item) => item === 'like').length;
    const recallValues = [];
    const precisionValues = [];

    for (let i = 0; i < feedbackArray.length; i++) {
      if (feedbackArray[i] === 'like') relevantRetrieved += 1;
      recallValues.push(relevantRetrieved / totalRelevant);
      precisionValues.push(relevantRetrieved / (i + 1));
    }

    setPrecisionRecallData({
      ...precisionRecallData,
      precision: precisionValues,
      recall: recallValues,
    });
  }, [feedbackArray]);

  // Calculate interpolated points for an 11-point curve
  const interpolatedPoints = [];
  for (let i = 0; i <= 10; i++) {
    const targetRecall = i / 10;
    let maxPrecision = 0;

    for (let j = 0; j < precisionRecallData.recall.length; j++) {
      if (precisionRecallData.recall[j] >= targetRecall && precisionRecallData.precision[j] > maxPrecision) {
        maxPrecision = precisionRecallData.precision[j];
      }
    }

    interpolatedPoints.push({
      recall: targetRecall,
      precision: maxPrecision,
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 to-yellow-200 text-black">
      <div className="container mx-auto px-4 lg:px-8 py-14 text-center">
      <div className="mb-4 text-right">
      <Link to="/" className="text-blue-600 hover:underline font-bold">
            &#8592; Back to Search Results
          </Link>
        </div>
      <h1 className="text-4xl font-extrabold mb-14">Precision-Recall Curve</h1>
      <PrCurveTable 
      data={
        searchResults.map((item,i)=>{
          return {
            id: item.document_id,
            relevant: feedbackArray[i] === 'like',
            recall: precisionRecallData.recall[i],
            precision: precisionRecallData.precision[i]
          }
        })
      }
      />
        
        <div className="mb-8">
          <Plot
            data={[
              {
                x: precisionRecallData.recall,
                y: precisionRecallData.precision,
                type: 'scatter',
                mode: 'lines',
                line: { color: 'rgba(75,192,192,1)' },
                name: 'Actual Curve',
              },
              {
                x: interpolatedPoints.map((point) => point.recall),
                y: interpolatedPoints.map((point) => point.precision),
                type: 'scatter',
                mode: 'lines+markers',
                line: { color: 'red', dash: 'dot' },
                name: '11-point Interpolated',
              },
            ]}
            layout={{
              xaxis: {
                title: 'Recall',
                type: 'linear',
              },
              yaxis: {
                title: 'Precision',
              },
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default PrCurvePage;

