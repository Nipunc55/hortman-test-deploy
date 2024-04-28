import { Link } from "react-router-dom";
import EducationalMaterilaArticleGridCard from "../../../../atoms/donor/cards/educationalMaterilaArticleGridCard";

const ArticleHomeHealthCare = ({ data }: { data: any }) => {
  const getDateValue = (dateInput: string) => {
    const inputDate = new Date(dateInput);

    const options: any = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };

    return inputDate.toLocaleDateString("en-US", options);
  };

  const sanitizeHTML = (html: any) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="grid grid-cols-3 gap-x-gap18 gap-y-gap30 px-7">
      {data?.map((item: any) => (
        <div key={item._id} className="">
          <Link
            to={`/health-care/educational-material/educational-material-article/${item._id}`}
          >
            <EducationalMaterilaArticleGridCard
              id={item._id}
              date={getDateValue(item.created_at)}
              title={item?.title}
              description={
                sanitizeHTML(`${item?.content}`).length > 200
                  ? sanitizeHTML(`${item?.content}`).substring(0, 300) + "..."
                  : sanitizeHTML(`${item?.content}`)
              }
              imgPath={
                item?.thumbnail ||
                "https://firebasestorage.googleapis.com/v0/b/hortman-65ae0.appspot.com/o/files%2FarticleImage5.jpg?alt=media&token=6d73de24-c3f4-498d-a003-f1ff903b055a"
              }
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ArticleHomeHealthCare;
