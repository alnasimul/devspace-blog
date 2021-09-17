import Link from "next/link";
import Image from "next/image";
import CategoryLabel from "./CategoryLabel";

const Post = ({ post }) => {
  const { slug, frontmatter } = post;
  return (
    <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
      <Image
        src={frontmatter.cover_image}
        alt=""
        height={420}
        width={600}
        className="mb-4 rounded"
      />
      <div className="flex justify-between items-center">
        <span className="forn-light text-gray-600">{frontmatter.date}</span>
        <CategoryLabel>{frontmatter.category}</CategoryLabel>
      </div>
      <div className="mt-2">
        <Link href={`/blog/${slug}`}>
          <a className="text-2xl text-gray-700 font-bold hover:underline">
            {frontmatter.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-600">{frontmatter.excerpt}</p>
      </div>
      <div className="flex justify-between items-center mt-6">
        <Link href={`/blog/${slug}`}>
          <a className="text-gray-900 hover:text-blue-600">Read More</a>
        </Link>
        <div className="flex items-center">
          <img
            src={frontmatter.author_image}
            alt=""
            className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
          />
          <h3 className="text-gray-700 font-bold">{post.frontmatter.author}</h3>
        </div>
      </div>
    </div>
  );
};

export default Post;
