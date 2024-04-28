import { Link } from "react-router-dom";
import { type EducationalMaterialVideoCardProps } from "../../../../../types/educationaMaterialVideoCardTypes";
import EducationalMaterilaArticleGridCard from "../../../../atoms/donor/cards/educationalMaterilaArticleGridCard";

const ArticleSection = ({
  data
}: {
  data: EducationalMaterialVideoCardProps[];
}) => {
  return (
    <div className="grid grid-cols-3 gap-x-gap18 gap-y-gap30 px-7">
      {data?.map((items) => (
        <div key={items.articleId}>
          <Link
            to={`/health-care/educational-material/educational-material-article/${items?.articleId}`}
          >
            <EducationalMaterilaArticleGridCard
              id={items.articleId}
              date={items.articleDate}
              title={items.title}
              description={items.articleImageDescription}
              imgPath={items.articleImage}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ArticleSection;
