interface StatusBadgeProps {
  status: string;
  border: string;
}
const StatusBadges = ({ status, border }: StatusBadgeProps) => {
  return (
    <div
      className={`rounded-lg ${border} w-full max-w-[108px] text-center py-1 bg-white`}
    >
      {status}
    </div>
  );
};

export default StatusBadges;
