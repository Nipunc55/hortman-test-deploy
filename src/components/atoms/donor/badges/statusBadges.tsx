interface StatusBadgeProps {
  status: string;
  border?: string;
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

const SuccessStatusBadges = ({ status, border }: StatusBadgeProps) => {
  return (
    <div
      className={`rounded-[30px] ${border} w-full max-w-[108px] text-white text-center py-1 bg-[#133419] text-xsxl`}
    >
      {status}
    </div>
  );
};

const FailedStatusBadges = ({ status, border }: StatusBadgeProps) => {
  return (
    <div
      className={`rounded-[30px] ${border} w-full max-w-[108px] text-center py-1 bg-red-300`}
    >
      {status}
    </div>
  );
};

export { StatusBadges, SuccessStatusBadges, FailedStatusBadges };
