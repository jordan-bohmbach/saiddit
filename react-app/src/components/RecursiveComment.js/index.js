import { useState } from 'react'
import CreateCommentForm from '../Forms/CreateComment'
import './RecursiveComment.scss'

const RecursiveComment = ({ level, content, id, parent_id, children }) => {
    const [editing, setEditing] = useState(false)
    const hasChildren = children && children.length
    
    console.log('children = ', children)

    children?.forEach(child=>{

        if (!level) {
            child.level = 1
        } else {
            child.level = level + 1
        }
    })

    const handleReply= (e) => {
        e.preventDefault()
        setEditing(true)
    }

    return (
        <div className={`nested-comment-level-${level}`}>
            {content}
            <button value={id} onClick={handleReply}>Reply</button>
            {editing? <CreateCommentForm parentId={id} /> : ''}

            {hasChildren && children.map((child) => (
                <div>
                    <RecursiveComment key={child.id} {...child} />
                </div>
            ))}
        </div>
    )
}

export default RecursiveComment