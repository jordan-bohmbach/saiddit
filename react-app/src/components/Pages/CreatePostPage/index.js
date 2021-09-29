import CreatePostForm from '../../Forms/CreatePost'
import './CreatePostPage.css'

const CreatePostPage = () => {
    return (
        <>
            <div className='create-post-page-container'>
                <CreatePostForm size={'big'}/>
            </div>
        </>
    )
}

export default CreatePostPage