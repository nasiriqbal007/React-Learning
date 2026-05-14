import { useEffect, useState, useRef } from "react";
import "./index.css";
import useData from "./hooks/useData";
import { type CommentType, type PostType } from "./types/type";

function App() {
  const [tab, setTab] = useState<"post" | "comments">("post");
  const [postPage, setPostPage] = useState(0);
  const [commentPage, setCommentPage] = useState(0);
  const commentObserverTarget = useRef<HTMLDivElement>(null);

  const POSTS_PER_PAGE = 5;
  const COMMENTS_PER_LOAD = 6;

  const post = useData<PostType>();
  const comments = useData<CommentType>();

  const postOffset = postPage * POSTS_PER_PAGE;
  const commentOffset = commentPage * COMMENTS_PER_LOAD;
  const paginatedPosts = post.data.slice(
    postOffset,
    postOffset + POSTS_PER_PAGE,
  );
  const totalPostPages = Math.ceil(post.data.length / POSTS_PER_PAGE);

  const visibleComments = comments.data.slice(
    0,
    commentOffset + COMMENTS_PER_LOAD,
  );

  const commentsHasMore = visibleComments.length < comments.data.length;

  useEffect(() => {
    if (tab === "post") {
      post.fetchData("/posts");
    }
    if (tab === "comments") {
      comments.fetchData("/comments");
    }
  }, [tab, post, comments]);

  // Infinite scroll  comments
  useEffect(() => {
    if (tab !== "comments" || comments.loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && commentsHasMore) {
          setCommentPage((prev) => prev + 1);
        }
      },

      { threshold: 0.1 },
    );

    if (commentObserverTarget.current) {
      observer.observe(commentObserverTarget.current);
    }

    return () => observer.disconnect();
  }, [tab, comments.loading, commentsHasMore]);

  return (
    <div className="p-8 py-4">
      <div className="flex justify-center w-full gap-4 mb-2 ">
        <button
          onClick={() => setTab("post")}
          className={`px-6 py-2 rounded font-medium transition-all ${
            tab === "post"
              ? "bg-gray-900 text-white"
              : "border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setTab("comments")}
          className={`px-6 py-2 rounded font-medium transition-all ${
            tab === "comments"
              ? "bg-gray-900 text-white"
              : "border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          Comments
        </button>
      </div>

      {/* Posts Tab */}
      {tab === "post" && (
        <div className="bg-white shadow-md rounded-lg px-8 py-6">
          <h2 className="text-2xl font-bold mb-4">Posts</h2>

          {post.loading && post.data.length === 0 ? (
            <p className="text-gray-600">Loading posts...</p>
          ) : (
            <>
              <table className="w-full border-collapse mb-6">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left p-3 font-semibold">ID</th>
                    <th className="text-left p-3 font-semibold">User ID</th>
                    <th className="text-left p-3 font-semibold">Title</th>
                    <th className="text-left p-3 font-semibold">Body</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPosts.map((item: PostType) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-3 text-sm">{item.id}</td>
                      <td className="p-3 text-sm">{item.userId}</td>
                      <td className="p-3 font-medium text-sm">{item.title}</td>
                      <td className="p-3 text-sm text-gray-600 line-clamp-2">
                        {item.body}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-center gap-2 ">
                <button
                  onClick={() => setPostPage((prev) => Math.max(0, prev - 1))}
                  disabled={postPage === 0}
                  className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-100"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-600">
                  Page {postPage + 1} of {totalPostPages}
                </span>
                <button
                  onClick={() =>
                    setPostPage((prev) =>
                      Math.min(totalPostPages - 1, prev + 1),
                    )
                  }
                  disabled={postPage === totalPostPages - 1}
                  className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-100"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Comments Tab */}
      {tab === "comments" && (
        <div className="bg-white shadow-md rounded-lg px-8 py-6 max-h-150 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>

          {comments.loading && comments.data.length === 0 ? (
            <p className="text-gray-600">Loading comments...</p>
          ) : (
            <>
              <div className="space-y-4">
                {visibleComments.map((item: CommentType) => (
                  <div
                    key={item.id}
                    className="border border-gray-300 pl-4 py-2 "
                  >
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-gray-600 text-sm">{item.email}</p>
                    <p className="text-gray-700 mt-2">{item.body}</p>
                  </div>
                ))}
              </div>
              {!commentsHasMore && (
                <p className="text-center mt-4 text-gray-500">
                  No more comments
                </p>
              )}
              <div ref={commentObserverTarget} className="h-4 mt-4" />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
