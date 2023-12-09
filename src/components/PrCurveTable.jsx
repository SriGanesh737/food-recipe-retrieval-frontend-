/* eslint-disable react/prop-types */

const PrCurveTable = ({ data }) => {
  return (
    <table className="table-auto w-full mb-8 border-gray-700 border">
      <thead>
        <tr>
          <th className="px-4 py-2 border-gray-700">Rank</th>
          <th className="px-4 py-2 border-gray-700">ID</th>
          <th className="px-4 py-2 border-gray-700">Relevant/Non-Relevant</th>
          <th className="px-4 py-2 border-gray-700">Recall Value</th>
          <th className="px-4 py-2 border-gray-700">Precision Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="border border-gray-700 px-4 py-2">{index + 1}</td>
            <td className="border border-gray-700 px-4 py-2">{item.id}</td>
            <td className={`border border-gray-700 px-4 py-2 ${item.relevant ? 'text-green-700' : 'text-red-600'}`}>
              {item.relevant ? 'Relevant' : 'Non-Relevant'}
            </td>
            <td className="border border-gray-700 px-4 py-2">{item.recall}</td> 
            <td className="border border-gray-700 px-4 py-2">{item.precision}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PrCurveTable;
