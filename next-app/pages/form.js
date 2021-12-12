export const Form = ({info}) => {

    console.log(info)
    return (
            <div>
                <h1>{info.data[1].title}</h1>
                <p>{info.data[1].content}</p>
                <img src={info.data[1].img_url}/>
            </div>
    )
}

export const getServerSideProps = async pageContext => {
    const apiResponse = await fetch (
        'https://frontend-case-api.sbdev.nl/api/posts?page=1&perPage=5',{
            headers: {'Content-Type': 'application/json', 'token' : 'pj11daaQRz7zUIH56B9Z'}}
    )

    const info = await apiResponse.json();

    return {
        props: {
            info
        }
    }
}


export default Form;
