export function SentimentCard({ type, percentage }: { type: string; percentage: number }) {
  const getColor = () => {
    switch (type) {
      case 'Positive':
        return 'bg-green-500';
      case 'Neutral':
        return 'bg-blue-500';
      case 'Negative':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="rounded-lg bg-muted/30 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium">{type}</span>
        <span className="text-sm">{percentage}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted">
        <div className={`${getColor()} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
