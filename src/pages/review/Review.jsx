import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-hot-toast";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";

const Review = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [editingId, setEditingId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const [totalReviews, setTotalReviews] = useState(0);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/api/v1/productStore/reviews/${productId}`);

      setReviews(res.data.reviews || []);
      setAverage(res.data.average_rating || 0);
      setTotalReviews(res.data.total_reviews || 0);
    } catch (error) {
      toast.error("Failed to load reviews");
    }
  };

  const submitReview = async () => {
    try {
      if (editingId) {
        await API.put(`/api/v1/productStore/reviews/edit-review/${editingId}`, {
          rating,
          comment,
        });

        toast.success("Review updated successfully");
      } else {
        await API.post("/api/v1/productStore/reviews/create-review", {
          product_id: productId,
          rating,
          comment,
        });

        toast.success("Review submitted successfully");
      }

      setEditingId(null);
      setRating(5);
      setComment("");

      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await API.delete(
        `/api/v1/productStore/reviews/delete-review/${reviewId}`,
      );

      toast.success("Review deleted");

      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete review");
    }
  };

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-8">
        Customer <span className="text-cyan-400">Reviews</span>
      </h2>

      {/* Rating Summary */}

      <div className="bg-[#081120] border border-[#182235] rounded-2xl p-6 mb-10">
        <div className="flex items-center gap-3">
          <FaStar className="text-yellow-400 text-2xl" />
          <h3 className="text-2xl font-bold">{average || 0} / 5</h3>

          <span className="text-gray-400">({totalReviews} Reviews)</span>
        </div>
      </div>

      {/* Add Review */}
      <div className="bg-[#081120] border border-[#182235] rounded-2xl p-6 mb-10">
        <h3 className="text-xl font-semibold mb-5">Write a Review</h3>
        <div className="mb-5">
          <label className="block mb-3 font-medium">Rating</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <FaStar
                  className={`text-2xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-600"
                  }`}
                />
              </button>
            ))}
          </div>

          <p className="mt-2 text-sm text-gray-400">{rating} out of 5 stars</p>
        </div>
        <textarea
          rows={4}
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-[#030712] border border-[#182235] rounded-lg p-3 mb-5"
        />

        <button
          onClick={submitReview}
          className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-cyan-300"
        >
          {editingId ? "Update Review" : "Submit Review"}
        </button>
      </div>
      {/* Reviews */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="bg-[#081120] border border-[#182235] rounded-2xl p-8 text-center text-gray-400">
            No reviews yet.
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#081120] border border-[#182235] rounded-2xl p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{review.name}</h3>

                  <div className="flex mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={
                          star <= review.rating
                            ? "text-yellow-400"
                            : "text-gray-600"
                        }
                      />
                    ))}
                  </div>
                </div>

                {user && review.user_id === user.id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        console.log("Edit clicked", review);
                        setEditingId(review.id);
                        setRating(review.rating);
                        setComment(review.comment);
                      }}
                      className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => deleteReview(review.id)}
                      className="p-2 rounded-lg bg-red-500 hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>

              <p className="text-gray-300 mt-4">{review.comment}</p>

              <p className="text-gray-500 text-sm mt-3">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Review;
