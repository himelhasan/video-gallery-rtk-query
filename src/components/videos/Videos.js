import { useEffect } from "react";
import { useState } from "react";
import { useGetVideosQuery } from "../../redux/features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
  const [request, setRequest] = useState(false);

  const { isError, isLoading, data: videos } = useGetVideosQuery();

  let content = null;

  if (isLoading) {
    content = <VideoLoader />;
  }
  if (!isLoading && isError) {
    content = <Error message="There Was an error" />;
  }

  if (!isLoading && !isError && videos.length === 0) {
    content = <Error message="No video found" />;
  }

  if (!isLoading && !isError && videos.length > 0) {
    content = videos.map((video) => <Video key={video.id} video={video}></Video>);
  }

  return <>{content}</>;
}
