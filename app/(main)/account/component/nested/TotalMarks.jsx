export default function TotalMarks({ totalMarks }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <p className="text-md md:text-sm font-medium text-slate-700">
        Total Marks
      </p>

      <p className="text-md md:text-sm font-medium text-slate-700">
        {totalMarks}
      </p>
    </div>
  );
}
