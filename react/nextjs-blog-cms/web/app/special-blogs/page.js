import axios from "axios";
import { cookies, headers } from "next/headers";
import Link from "next/link";

const fetchSpecialBlogs = async () => {
  try {
    const url = process.env.STRAPI_BASE_URL + "/api/special-blogs";
    const token = (await cookies()).get("token");

    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token?.value,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export default async function Page() {
  const blogs = await fetchSpecialBlogs();
  const headerList = await headers();
  const user = JSON.parse(headerList.get("user"));

  return (
    <>
      <h1 className="text-4xl text-center mt-4">Special Blogs</h1>
      <h1 className="text-4xl text-center mt-4">{user.email}</h1>

      <div className="container mx-auto mt-4">
        <div className="grid grid-cols-4 gap-2">
          {blogs.map((blog, index) => (
            <div className="flex flex-col" key={index}>
              <div className="text-3xl">{blog.title}</div>
              <div>{blog.description}</div>
              <Link
                href={`blog/${blog.documentId}`}
                className="bg-orange-400 p-4"
              >
                See more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
