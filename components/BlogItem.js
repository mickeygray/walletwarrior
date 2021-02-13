import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/state.js";
const BlogItem = ({ blog }) => {
  const router = useRouter();
  const { addClick } = useAppContext();

  return (
    <div
      style={{ width: "400px", height: "250px" }}
      className='card bg-light grid-2'>
      <div
        onClick={() =>
          addClick({
            loc: `${blog.title}`,
            time: `${new Date().getTime()}`,
            btn: "Opened This blog",
          })
        }>
        {" "}
        <h3>
          <a
            onClick={() => {
              router.push({
                pathname: `/blogs/${blog.id}`,
                query: { data: blog.id },
              });
            }}>
            {blog.title}
          </a>
        </h3>{" "}
        <h5>
          <i>{blog.date}</i>
        </h5>
      </div>
      <div>
        <Image
          src={blog.img1}
          alt='professional tax help and advice'
          height='200px'
          width='200px'
        />{" "}
      </div>
    </div>
  );
};

export default BlogItem;
