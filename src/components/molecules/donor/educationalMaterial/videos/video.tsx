const EducationalMaterialArticleVideo = ({ url }: { url: string }) => {
  return (
    <video className="h-full w-full rounded-lg" controls autoPlay>
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default EducationalMaterialArticleVideo;
