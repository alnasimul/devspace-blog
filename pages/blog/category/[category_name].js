import fs from 'fs';
import path from 'path';
import Layout from "@/components/Layout";
import Post from '@/components/Post';
import matter from 'gray-matter';
import { getPosts } from '@/lib/posts';

export default function CategoryBlogPage({posts, categoryName}) {
  //console.log(posts);
  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>Post in {categoryName}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {
            posts.map((post, index) => <Post key={post.slug} post={post}/>)
          }
      </div>
    </Layout>
  )
}

export const getStaticPaths = async () => {
    const files = fs.readdirSync(path.join('posts'));

    const categories = files.map( filename => {
        const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');

        const {data: frontmatter} = matter(markdownWithMeta);

        return frontmatter.category.toLowerCase()
    })

    const paths = categories.map( category => ({
        params: {category_name: category}
    }))

   // console.log(paths)

    return {
        paths,
        fallback: false
    }

 }

export const getStaticProps = async ({params: {category_name}}) => {

  const posts = getPosts();

  const categoryPosts = posts.filter( post => post.frontmatter.category.toLowerCase() === category_name);


  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,

    },
  }
}