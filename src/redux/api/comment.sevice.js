import reqAxios from "./request";

const postComment = (value) => {
  return reqAxios().post("/comment", value);
};

const getComment = (id) => {
  console.log(id);
  return reqAxios().get(`/comment?product_id=${id}`);
};

const deleteComment = (id) => {
  return reqAxios().delete(`/comment/${id}`);
};

const updateComment = (value) => {
  return reqAxios().put(`/comment/${value.id}`, {
    user_id: value.user_id,
    product_id: value.product_id,
    comment_content: value.comment_content,
  });
};
const commentService = {
  postComment,
  getComment,
  deleteComment,
  updateComment,
};

export default commentService;
