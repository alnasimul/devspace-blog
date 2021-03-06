import fs from 'fs';
import path from 'path';
import marked from 'marked';
import matter from 'gray-matter';
import Link from 'next/link';
import Layout from '@/components/Layout';
import CategoryLabel from '@/components/CategoryLabel';

const PostPage = ({frontmatter, content, slug}) => {
    const {title, category, date, cover_image, author, author_image} = frontmatter;
    return (
        <Layout title={title}>
            <Link href='/blog'>
                <a className='text-gray-900 hover:text-blue-600 ml-9 md:mx-0'>
                    Go Back
                </a></Link>
            <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
                <div className="flex justify-between items-center mt-4">
                    <h1 className="text-xl font-bold mb-7 md:text-5xl">{title}</h1>
                    <CategoryLabel>{category}</CategoryLabel>
                </div>
                <img src={cover_image} alt="" className='w-full rounded'/>

                <div className="flex justify-between items-center bg-gray-100 p-2 my-2">
                    <div className='flex items-center'>
                        <img src={author_image} alt="" className='mx-4 w-10 h-10 object-cover rounded-full hidden sm:block'/>
                        <h4>{author}</h4>
                    </div>
                    <div className="mr-4 font-bold text-gray-600">{date}</div>
                </div>
                <div className="blog-text mt-2">
                    <div dangerouslySetInnerHTML={{__html: marked(content)}}></div>
                </div>
            </div>
        </Layout>
    );
}

export const getStaticPaths = async () => {
    const files = fs.readdirSync(path.join('posts'));

    const paths = files.map( filename =>( {
        params: {
            slug: filename.replace('.md', '')
        }
        }))
        
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({params: {slug}}) => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', `${slug}.md`), 'utf-8');

    const {data:frontmatter, content} = matter(markdownWithMeta);
    return {
        props: {
            frontmatter,
            content,
            slug
        }
    }
}

export default PostPage;