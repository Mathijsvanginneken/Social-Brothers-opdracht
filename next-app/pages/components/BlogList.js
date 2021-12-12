import Head from 'next/head'

const BlogList = (props) => {
    return (
        <>
        {props.Blogs.map((blog, index) => (
            <div>
                <img src={blog.image_url} alt='blogpost'></img>
            </div>
        ))}
        </>
    )
}