const RelatedArticleCard = ({
  path,
  date,
  title,
  content
}: {
  path: string;
  date: string;
  title: string;
  content: string;
}) => {
  return (
    <div className="flex flex-col gap-px max-w-[330px] justify-between max-h-[415px] mb-4">
      <div className="w-[330px] h-[202px]">
        <img
          src={path}
          alt=""
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="text-sm font-normal">{date}</div>
      <div className="text-lg font-medium">{title}</div>
      <div className="text-base font-normal">{content}</div>
    </div>
  );
};

export default RelatedArticleCard;
