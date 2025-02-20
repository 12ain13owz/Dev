import axios from "axios";

const fetchBlogs = async (id) => {
  try {
    const query = "?populate=thumbnail&populate=author";
    const url = process.env.STRAPI_BASE_URL + "/api/blogs/" + id + query;
    const response = await axios.get(url);

    return response.data.data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export default async function Page({ params }) {
  const { id } = await params;
  const blog = await fetchBlogs(id);

  return (
    <div>
      Blog Id : {blog.id}
      <img
        width="100px"
        src={`${process.env.STRAPI_BASE_URL}${blog.thumbnail.url}`}
      ></img>
      <div>Title: {blog.title}</div>
      <div>Author: {blog.author.name}</div>
    </div>
  );
}
